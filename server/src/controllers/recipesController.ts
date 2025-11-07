import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase.js';
import { geminiModel } from '../config/gemini.js';

interface GenerateRecipeRequest {
  ingredients?: string[];
  recipeType?: string;
  allergies?: string[];
  healthConditions?: string[];
  dietaryPreferences?: string[];
  servings?: number;
  maxCookTime?: number;
}

export const getRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = 50, offset = 0, tags, dietaryType } = req.query;

    let query = supabase
      .from('recipes')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    // Filter by tags if provided
    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      query = query.overlaps('tags', tagsArray);
    }

    // Filter by dietary type if provided
    if (dietaryType) {
      query = query.eq('dietary_type', dietaryType);
    }

    const { data: recipes, error } = await query;

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    res.json({
      success: true,
      data: { recipes },
    });
  } catch (error) {
    return next(error);
  }
};

export const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { data: recipe, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found',
      });
    }

    // Increment views count
    await supabase
      .from('recipes')
      .update({ views_count: (recipe.views_count || 0) + 1 })
      .eq('id', id);

    return res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    return next(error);
  }
};

export const generateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    const {
      ingredients = [],
      recipeType = 'any',
      allergies = [],
      healthConditions = [],
      dietaryPreferences = [],
      servings = 2,
      maxCookTime,
    }: GenerateRecipeRequest = req.body;

    // Build the prompt for Gemini
    let prompt = `Generate a detailed, healthy recipe with the following requirements:\n\n`;

    if (ingredients.length > 0) {
      prompt += `Available Ingredients: ${ingredients.join(', ')}\n`;
    }

    if (recipeType && recipeType !== 'any') {
      prompt += `Recipe Type: ${recipeType}\n`;
    }

    if (dietaryPreferences.length > 0) {
      prompt += `Dietary Preferences: ${dietaryPreferences.join(', ')}\n`;
    }

    if (allergies.length > 0) {
      prompt += `IMPORTANT - Must avoid these allergens: ${allergies.join(', ')}\n`;
    }

    if (healthConditions.length > 0) {
      prompt += `Health Conditions to consider: ${healthConditions.join(', ')}\n`;
    }

    prompt += `Servings: ${servings}\n`;

    if (maxCookTime) {
      prompt += `Maximum cooking time: ${maxCookTime} minutes\n`;
    }

    prompt += `\nPlease provide the recipe in the following EXACT JSON format (no markdown, no code blocks, just pure JSON):
{
  "title": "Recipe name",
  "description": "Brief appetizing description (2-3 sentences)",
  "prepTime": 15,
  "cookTime": 30,
  "servings": ${servings},
  "difficulty": "easy",
  "dietaryType": "vegetarian",
  "ingredients": [
    {"item": "ingredient name", "amount": "quantity", "notes": "optional preparation notes"}
  ],
  "instructions": [
    {"step": 1, "instruction": "Detailed step description"},
    {"step": 2, "instruction": "Next step"}
  ],
  "nutritionalInfo": {
    "calories": 450,
    "protein": 25,
    "carbs": 45,
    "fats": 15,
    "fiber": 8
  },
  "tags": ["healthy", "quick", "high-protein"],
  "healthBenefits": ["Supports heart health", "High in protein"],
  "allergens": ["nuts", "dairy"],
  "imageSearchTerm": "specific food photography search term for Unsplash"
}

Make sure the recipe:
1. Is nutritionally balanced and healthy
2. Avoids all specified allergens completely
3. Considers the health conditions mentioned
4. Uses realistic cooking times and techniques
5. Provides clear, step-by-step instructions
6. Includes accurate nutritional information per serving
7. The imageSearchTerm should be specific and descriptive for finding a good food photo`;

    // Call Gemini API
    const result = await geminiModel.generateContent(prompt);
    const response = result.response.text();

    // Parse the JSON response
    let recipeData;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      recipeData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse AI response:', response);
      throw new Error('Failed to parse recipe data from AI response');
    }

    // Generate image URL using Unsplash
    // Note: In production, you'd want to actually search Unsplash API or use AI image generation
    const imageUrl = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80`;

    // Save recipe to database
    const { data: savedRecipe, error: dbError } = await supabase
      .from('recipes')
      .insert({
        user_id: userId,
        title: recipeData.title,
        description: recipeData.description,
        image_url: imageUrl,
        prep_time: recipeData.prepTime,
        cook_time: recipeData.cookTime,
        servings: recipeData.servings,
        difficulty: recipeData.difficulty,
        calories: recipeData.nutritionalInfo?.calories,
        protein: recipeData.nutritionalInfo?.protein,
        carbs: recipeData.nutritionalInfo?.carbs,
        fats: recipeData.nutritionalInfo?.fats,
        fiber: recipeData.nutritionalInfo?.fiber,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        tags: recipeData.tags,
        dietary_type: recipeData.dietaryType,
        allergens: recipeData.allergens,
        health_benefits: recipeData.healthBenefits,
        suitable_for_conditions: healthConditions,
        is_ai_generated: true,
        generation_prompt: prompt,
        is_public: true,
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Failed to save recipe: ${dbError.message}`);
    }

    return res.status(201).json({
      success: true,
      data: savedRecipe,
      message: 'Recipe generated successfully!',
    });
  } catch (error) {
    console.error('Recipe generation error:', error);
    return next(error);
  }
};

export const toggleLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;
    const { id: recipeId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('recipe_likes')
      .select('id')
      .eq('recipe_id', recipeId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // Unlike
      await supabase
        .from('recipe_likes')
        .delete()
        .eq('recipe_id', recipeId)
        .eq('user_id', userId);

      return res.json({
        success: true,
        data: { liked: false },
      });
    } else {
      // Like
      await supabase
        .from('recipe_likes')
        .insert({ recipe_id: recipeId, user_id: userId });

      return res.json({
        success: true,
        data: { liked: true },
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const getUserRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return res.json({
      success: true,
      data: { recipes },
    });
  } catch (error) {
    return next(error);
  }
};
