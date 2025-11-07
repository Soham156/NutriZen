import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase.js';

// Get dashboard overview data
export const getDashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;
    const today = new Date().toISOString().split('T')[0];

    // Get or create today's health log
    let { data: healthLog, error: healthError } = await supabase
      .from('daily_health_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (healthError && healthError.code !== 'PGRST116') {
      throw healthError;
    }

    // Create today's log if it doesn't exist
    if (!healthLog) {
      const { data: newLog, error: createError } = await supabase
        .from('daily_health_logs')
        .insert({
          user_id: userId,
          date: today,
          calories_goal: 2000,
          water_goal_ml: 2500
        })
        .select()
        .single();

      if (createError) throw createError;
      healthLog = newLog;
    }

    // Get today's meals
    const { data: meals, error: mealsError } = await supabase
      .from('meal_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .order('created_at', { ascending: true });

    if (mealsError) throw mealsError;

    // Get today's water logs
    const { data: waterLogs, error: waterError } = await supabase
      .from('water_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('logged_at', `${today}T00:00:00`)
      .lte('logged_at', `${today}T23:59:59`);

    if (waterError) throw waterError;

    // Calculate total water intake
    const totalWater = waterLogs?.reduce((sum, log) => sum + log.amount_ml, 0) || 0;

    // Calculate streak (consecutive days with logs)
    const { data: recentLogs, error: streakError } = await supabase
      .from('daily_health_logs')
      .select('date')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(30);

    if (streakError) throw streakError;

    let streak = 0;
    if (recentLogs && recentLogs.length > 0) {
      const dates = recentLogs.map(log => new Date(log.date));
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      for (const logDate of dates) {
        const logDay = new Date(logDate);
        logDay.setHours(0, 0, 0, 0);
        
        if (logDay.getTime() === currentDate.getTime()) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate macros from meals
    const macros = meals?.reduce((acc, meal) => ({
      protein: acc.protein + (parseFloat(meal.protein_g) || 0),
      carbs: acc.carbs + (parseFloat(meal.carbs_g) || 0),
      fats: acc.fats + (parseFloat(meal.fats_g) || 0)
    }), { protein: 0, carbs: 0, fats: 0 }) || { protein: 0, carbs: 0, fats: 0 };

    // Get latest mood
    const { data: latestMood } = await supabase
      .from('mood_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('logged_at', `${today}T00:00:00`)
      .order('logged_at', { ascending: false })
      .limit(1)
      .single();

    return res.json({
      success: true,
      data: {
        healthLog,
        meals: meals || [],
        waterIntake: totalWater,
        streak,
        macros,
        currentMood: latestMood?.mood || null
      }
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    return next(error);
  }
};

// Log mood
export const logMood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;
    const { mood, note } = req.body;

    if (!mood || !['happy', 'neutral', 'sad'].includes(mood)) {
      return res.status(400).json({
        success: false,
        error: 'Valid mood is required (happy, neutral, sad)'
      });
    }

    const { data, error } = await supabase
      .from('mood_logs')
      .insert({
        user_id: userId,
        mood,
        note: note || null
      })
      .select()
      .single();

    if (error) throw error;

    return res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Log mood error:', error);
    return next(error);
  }
};

// Log water intake
export const logWater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;
    const { amount_ml } = req.body;

    if (!amount_ml || amount_ml <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid water amount in ml is required'
      });
    }

    const { data, error } = await supabase
      .from('water_logs')
      .insert({
        user_id: userId,
        amount_ml
      })
      .select()
      .single();

    if (error) throw error;

    // Update daily health log
    const today = new Date().toISOString().split('T')[0];
    const { data: waterLogs, error: waterError } = await supabase
      .from('water_logs')
      .select('amount_ml')
      .eq('user_id', userId)
      .gte('logged_at', `${today}T00:00:00`)
      .lte('logged_at', `${today}T23:59:59`);

    if (!waterError && waterLogs) {
      const totalWater = waterLogs.reduce((sum, log) => sum + log.amount_ml, 0);
      
      await supabase
        .from('daily_health_logs')
        .upsert({
          user_id: userId,
          date: today,
          water_intake_ml: totalWater
        }, {
          onConflict: 'user_id,date'
        });
    }

    return res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Log water error:', error);
    return next(error);
  }
};

// Log meal
export const logMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;
    const { meal_type, meal_name, calories, protein_g, carbs_g, fats_g, fiber_g, image_url } = req.body;

    if (!meal_type || !meal_name || !calories) {
      return res.status(400).json({
        success: false,
        error: 'meal_type, meal_name, and calories are required'
      });
    }

    if (!['breakfast', 'lunch', 'dinner', 'snack'].includes(meal_type)) {
      return res.status(400).json({
        success: false,
        error: 'meal_type must be breakfast, lunch, dinner, or snack'
      });
    }

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('meal_logs')
      .insert({
        user_id: userId,
        meal_type,
        meal_name,
        calories,
        protein_g: protein_g || 0,
        carbs_g: carbs_g || 0,
        fats_g: fats_g || 0,
        fiber_g: fiber_g || 0,
        image_url: image_url || null,
        date: today
      })
      .select()
      .single();

    if (error) throw error;

    // Update daily health log
    const { data: meals, error: mealsError } = await supabase
      .from('meal_logs')
      .select('calories, protein_g, carbs_g, fats_g, fiber_g')
      .eq('user_id', userId)
      .eq('date', today);

    if (!mealsError && meals) {
      const totals = meals.reduce((acc, meal) => ({
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (parseFloat(meal.protein_g) || 0),
        carbs: acc.carbs + (parseFloat(meal.carbs_g) || 0),
        fats: acc.fats + (parseFloat(meal.fats_g) || 0),
        fiber: acc.fiber + (parseFloat(meal.fiber_g) || 0)
      }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });

      await supabase
        .from('daily_health_logs')
        .upsert({
          user_id: userId,
          date: today,
          calories_consumed: totals.calories,
          protein_g: totals.protein,
          carbs_g: totals.carbs,
          fats_g: totals.fats,
          fiber_g: totals.fiber
        }, {
          onConflict: 'user_id,date'
        });
    }

    return res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Log meal error:', error);
    return next(error);
  }
};

// Delete meal
export const deleteMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;
    const { mealId } = req.params;

    const { error } = await supabase
      .from('meal_logs')
      .delete()
      .eq('id', mealId)
      .eq('user_id', userId);

    if (error) throw error;

    return res.json({
      success: true,
      message: 'Meal deleted successfully'
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    return next(error);
  }
};
