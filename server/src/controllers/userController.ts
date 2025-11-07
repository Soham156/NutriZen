import { Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

interface HealthProfileRequest {
  age: string;
  gender: string;
  height: string;
  weight: string;
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lbs';
  healthConditions: string[];
  bloodPressure: string;
  cholesterolLevel: string;
  diabetesType: string;
  allergens: string[];
  dietaryRestrictions: string[];
  dietPreference: string;
  primaryGoal: string;
  activityLevel: string;
  caloriesGoal: string;
  waterGoal: string;
  mealsPerDay: string;
}

export const saveHealthProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const profileData: HealthProfileRequest = req.body;

    // Calculate BMI
    const calculateBMI = () => {
      const height = parseFloat(profileData.height);
      const weight = parseFloat(profileData.weight);
      
      if (!height || !weight) return null;
      
      const heightInMeters = profileData.heightUnit === 'cm' ? height / 100 : height * 0.3048;
      const weightInKg = profileData.weightUnit === 'kg' ? weight : weight * 0.453592;
      
      return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    };

    const bmi = calculateBMI();

    // Update users table with basic info
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({
        age: parseInt(profileData.age) || null,
        gender: profileData.gender || null,
        height: parseFloat(profileData.height) || null,
        weight: parseFloat(profileData.weight) || null,
        height_unit: profileData.heightUnit,
        weight_unit: profileData.weightUnit,
        bmi: bmi ? parseFloat(bmi) : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (userUpdateError) {
      console.error('Error updating user:', userUpdateError);
      return res.status(500).json({ error: 'Failed to update user profile' });
    }

    // Save user preferences
    const { error: preferencesError } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        dietary_restrictions: profileData.dietaryRestrictions,
        allergens: profileData.allergens,
        primary_goal: profileData.primaryGoal,
        activity_level: profileData.activityLevel,
        daily_calorie_goal: parseInt(profileData.caloriesGoal) || 2000,
        daily_water_goal: parseInt(profileData.waterGoal) || 2500,
        meals_per_day: parseInt(profileData.mealsPerDay) || 3,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
      });

    if (preferencesError) {
      console.error('Error saving preferences:', preferencesError);
      return res.status(500).json({ error: 'Failed to save user preferences' });
    }

    // Save health conditions to user_health_conditions table (normalized)
    if (profileData.healthConditions.length > 0) {
      // First, get or create health condition IDs
      const conditionNames = profileData.healthConditions;
      
      // Insert health conditions if they don't exist
      for (const conditionId of conditionNames) {
        // Map condition IDs to proper names
        const conditionNameMap: { [key: string]: string } = {
          'high-bp': 'High Blood Pressure',
          'cholesterol': 'High Cholesterol',
          'diabetes': 'Diabetes',
          'heart-disease': 'Heart Disease',
          'kidney-disease': 'Kidney Disease',
          'thyroid': 'Thyroid Issues',
          'celiac': 'Celiac Disease',
          'ibs': 'IBS',
        };

        const conditionName = conditionNameMap[conditionId] || conditionId;

        // Insert to health_conditions table if not exists
        const { data: existingCondition } = await supabase
          .from('health_conditions')
          .select('id')
          .eq('name', conditionName)
          .single();

        let healthConditionId;

        if (!existingCondition) {
          const { data: newCondition, error: conditionInsertError } = await supabase
            .from('health_conditions')
            .insert({ name: conditionName })
            .select('id')
            .single();

          if (conditionInsertError) {
            console.error('Error inserting health condition:', conditionInsertError);
            continue;
          }
          healthConditionId = newCondition.id;
        } else {
          healthConditionId = existingCondition.id;
        }

        // Link to user
        await supabase
          .from('user_health_conditions')
          .upsert({
            user_id: userId,
            health_condition_id: healthConditionId,
          }, {
            onConflict: 'user_id,health_condition_id',
            ignoreDuplicates: true,
          });
      }
    }

    // Save additional health metrics
    const { error: metricsError } = await supabase
      .from('daily_health_logs')
      .insert({
        user_id: userId,
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(profileData.weight) || null,
        blood_pressure_systolic: profileData.bloodPressure === 'high' ? 140 : profileData.bloodPressure === 'low' ? 90 : 120,
        blood_pressure_diastolic: profileData.bloodPressure === 'high' ? 90 : profileData.bloodPressure === 'low' ? 60 : 80,
        cholesterol_level: profileData.cholesterolLevel,
        diabetes_type: profileData.diabetesType !== 'none' ? profileData.diabetesType : null,
      });

    if (metricsError && metricsError.code !== '23505') { // Ignore duplicate error
      console.error('Error saving health metrics:', metricsError);
    }

    // Save allergens to normalized table
    if (profileData.allergens.length > 0) {
      const allergenNameMap: { [key: string]: string } = {
        'peanuts': 'Peanuts',
        'tree-nuts': 'Tree Nuts',
        'shellfish': 'Shellfish',
        'fish': 'Fish',
        'eggs': 'Eggs',
        'dairy': 'Dairy',
        'soy': 'Soy',
        'wheat': 'Wheat',
        'sesame': 'Sesame',
      };

      for (const allergenId of profileData.allergens) {
        const allergenName = allergenNameMap[allergenId] || allergenId;

        // Get or create allergen
        const { data: existingAllergen } = await supabase
          .from('allergens')
          .select('id')
          .eq('name', allergenName)
          .single();

        let allergenDbId;

        if (!existingAllergen) {
          const { data: newAllergen, error: allergenInsertError } = await supabase
            .from('allergens')
            .insert({ name: allergenName })
            .select('id')
            .single();

          if (allergenInsertError) {
            console.error('Error inserting allergen:', allergenInsertError);
            continue;
          }
          allergenDbId = newAllergen.id;
        } else {
          allergenDbId = existingAllergen.id;
        }

        // Link to user
        await supabase
          .from('user_allergens')
          .upsert({
            user_id: userId,
            allergen_id: allergenDbId,
          }, {
            onConflict: 'user_id,allergen_id',
            ignoreDuplicates: true,
          });
      }
    }

    // Save dietary restrictions to normalized table
    if (profileData.dietaryRestrictions.length > 0) {
      const dietTypeNameMap: { [key: string]: string } = {
        'vegan': 'Vegan',
        'vegetarian': 'Vegetarian',
        'pescatarian': 'Pescatarian',
        'keto': 'Keto',
        'paleo': 'Paleo',
        'mediterranean': 'Mediterranean',
        'halal': 'Halal',
        'kosher': 'Kosher',
      };

      for (const dietId of profileData.dietaryRestrictions) {
        const dietName = dietTypeNameMap[dietId] || dietId;

        // Get or create dietary type
        const { data: existingDiet } = await supabase
          .from('dietary_types')
          .select('id')
          .eq('name', dietName)
          .single();

        let dietDbId;

        if (!existingDiet) {
          const { data: newDiet, error: dietInsertError } = await supabase
            .from('dietary_types')
            .insert({ name: dietName })
            .select('id')
            .single();

          if (dietInsertError) {
            console.error('Error inserting dietary type:', dietInsertError);
            continue;
          }
          dietDbId = newDiet.id;
        } else {
          dietDbId = existingDiet.id;
        }

        // Link to user
        await supabase
          .from('user_dietary_restrictions')
          .upsert({
            user_id: userId,
            dietary_type_id: dietDbId,
          }, {
            onConflict: 'user_id,dietary_type_id',
            ignoreDuplicates: true,
          });
      }
    }

    return res.status(200).json({
      message: 'Health profile saved successfully',
      bmi,
    });
  } catch (error) {
    console.error('Error saving health profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHealthProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    // Get user basic info
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('age, gender, height, weight, height_unit, weight_unit, bmi')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    // Get preferences
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Get health conditions
    const { data: healthConditions } = await supabase
      .from('user_health_conditions')
      .select('health_condition_id, health_conditions(name)')
      .eq('user_id', userId);

    // Get allergens
    const { data: allergens } = await supabase
      .from('user_allergens')
      .select('allergen_id, allergens(name)')
      .eq('user_id', userId);

    // Get dietary restrictions
    const { data: dietaryRestrictions } = await supabase
      .from('user_dietary_restrictions')
      .select('dietary_type_id, dietary_types(name)')
      .eq('user_id', userId);

    return res.status(200).json({
      user,
      preferences: preferences || {},
      healthConditions: healthConditions?.map((hc: any) => hc.health_conditions?.name) || [],
      allergens: allergens?.map((a: any) => a.allergens?.name) || [],
      dietaryRestrictions: dietaryRestrictions?.map((dr: any) => dr.dietary_types?.name) || [],
    });
  } catch (error) {
    console.error('Error fetching health profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
