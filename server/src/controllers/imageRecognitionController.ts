import { Request, Response, NextFunction } from 'express';
import { geminiModel } from '../config/gemini.js';
import { supabase } from '../config/supabase.js';

interface AnalyzedFood {
  foodItems: string[];
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    servingSize: string;
  };
  healthBenefits: string[];
  dietaryInfo: string[];
  portionEstimate: string;
  cuisineType: string;
  mealType: string;
}

export const analyzeFoodImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get image from multer upload
    const file = (req as any).file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No image file uploaded'
      });
    }

    // Convert buffer to base64
    const image = file.buffer.toString('base64');
    const mimeType = file.mimetype;

    const prompt = `Analyze this food image in detail and provide the following information in JSON format:

{
  "foodItems": ["list of identified foods on the plate"],
  "ingredients": ["estimated ingredients used"],
  "nutrition": {
    "calories": estimated_total_calories_number,
    "protein": grams,
    "carbs": grams,
    "fats": grams,
    "fiber": grams,
    "servingSize": "description of portion"
  },
  "healthBenefits": ["health benefit 1", "health benefit 2"],
  "dietaryInfo": ["dietary tags like vegan, gluten-free, etc"],
  "portionEstimate": "description of portion size",
  "cuisineType": "type of cuisine",
  "mealType": "breakfast/lunch/dinner/snack"
}

Be specific and realistic with nutritional estimates. If the image is not food or unclear, return an error message.
Respond with ONLY valid JSON, no markdown or code blocks.`;

    const result = await geminiModel.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: image
        }
      }
    ]);

    const responseText = result.response.text();

    // Parse JSON response
    let analysisData: AnalyzedFood;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      analysisData = JSON.parse(jsonMatch[0]);

      // Validate that we have the required fields
      if (!analysisData.foodItems || !analysisData.nutrition) {
        throw new Error('Invalid response format');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
      return res.status(500).json({
        success: false,
        error: 'Failed to analyze image. Please try with a clearer food image.'
      });
    }

    // Optionally save to database for history
    const userId = (req as any).user?.userId;
    if (userId) {
      try {
        await supabase
          .from('food_analysis_history')
          .insert({
            user_id: userId,
            analysis_data: analysisData,
            image_url: null // Could upload to storage if needed
          });
      } catch (historyError) {
        console.error('Failed to save analysis history:', historyError);
      }
    }

    return res.json({
      success: true,
      data: analysisData
    });

  } catch (error) {
    console.error('Food image analysis error:', error);
    return next(error);
  }
};

export const getSimilarRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ingredients, foodItems } = req.body;

    if (!ingredients && !foodItems) {
      return res.status(400).json({
        success: false,
        error: 'Ingredients or food items are required'
      });
    }

    const itemsList = ingredients || foodItems;
    const prompt = `Based on these identified food items/ingredients: ${itemsList.join(', ')}

Generate 3 similar healthy recipes that use these or similar ingredients.

For each recipe, provide the following in JSON format:
{
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "Brief appetizing description",
      "prepTime": 15,
      "cookTime": 30,
      "servings": 4,
      "difficulty": "easy",
      "ingredients": [
        {"item": "ingredient name", "amount": "quantity"}
      ],
      "instructions": [
        {"step": 1, "instruction": "detailed instruction"}
      ],
      "nutrition": {
        "calories": 350,
        "protein": 25,
        "carbs": 40,
        "fats": 12,
        "fiber": 8
      },
      "tags": ["healthy", "quick", "high-protein"],
      "dietaryType": "vegetarian",
      "cuisineType": "Asian",
      "healthBenefits": ["Supports muscle growth", "High in fiber"],
      "matchPercentage": 85
    }
  ]
}

Respond with ONLY valid JSON, no markdown or code blocks.`;

    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();

    let recipesData;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      recipesData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse recipes response:', responseText);
      return res.status(500).json({
        success: false,
        error: 'Failed to generate recipes'
      });
    }

    return res.json({
      success: true,
      data: recipesData
    });

  } catch (error) {
    console.error('Similar recipes error:', error);
    return next(error);
  }
};
