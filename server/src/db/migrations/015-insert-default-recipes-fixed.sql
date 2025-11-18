-- Migration: Insert 25 Default Recipes
-- Description: Add default recipe collection to the database

-- Recipe 1: Grilled Chicken Quinoa Bowl
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url, is_public, is_ai_generated
) VALUES (
    NULL,
    'Grilled Chicken Quinoa Bowl',
    'Protein-packed bowl with grilled chicken, fluffy quinoa, roasted vegetables, and a zesty lemon tahini dressing.',
    'Gluten-Free',
    'Easy',
    15, 25, 2,
    450, 38, 42, 14, 8,
    '[{"item":"Chicken breast","amount":"300g","notes":"boneless, skinless"},{"item":"Quinoa","amount":"1 cup","notes":"uncooked"},{"item":"Bell peppers","amount":"2","notes":"mixed colors"},{"item":"Cherry tomatoes","amount":"1 cup"},{"item":"Tahini","amount":"2 tbsp"},{"item":"Lemon juice","amount":"2 tbsp"},{"item":"Olive oil","amount":"1 tbsp"}]',
    '[{"step":1,"instruction":"Cook quinoa according to package instructions."},{"step":2,"instruction":"Season chicken with salt, pepper, and herbs. Grill for 6-7 minutes per side."},{"step":3,"instruction":"Roast bell peppers and tomatoes at 400°F for 15 minutes."},{"step":4,"instruction":"Mix tahini, lemon juice, and water to make dressing."},{"step":5,"instruction":"Assemble bowls with quinoa, sliced chicken, vegetables, and drizzle with dressing."}]',
    '["High Protein","Gluten-Free","Meal Prep"]',
    '["sesame"]',
    '["High in protein","Rich in fiber","Complete amino acids"]',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    true,
    false
);

-- Recipe 2: Avocado Toast with Poached Eggs
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Avocado Toast with Poached Eggs',
    'Classic breakfast with creamy avocado, perfectly poached eggs, and a sprinkle of chili flakes on whole grain toast.',
    'Vegetarian',
    'Easy',
    5, 10, 15, 2,
    320, 15, 28, 18, 10,
    '[{"item":"Whole grain bread","amount":"4 slices"},{"item":"Avocado","amount":"2","notes":"ripe"},{"item":"Eggs","amount":"4","notes":"fresh"},{"item":"Cherry tomatoes","amount":"1 cup","notes":"halved"},{"item":"Chili flakes","amount":"1 tsp"},{"item":"Salt and pepper","amount":"to taste"}]',
    '[{"step":1,"instruction":"Toast bread slices until golden brown."},{"step":2,"instruction":"Mash avocados with salt, pepper, and lemon juice."},{"step":3,"instruction":"Poach eggs in simmering water with vinegar for 3-4 minutes."},{"step":4,"instruction":"Spread avocado on toast, top with poached eggs."},{"step":5,"instruction":"Garnish with cherry tomatoes, chili flakes, and black pepper."}]',
    '["Breakfast","Quick","Vegetarian"]',
    '["eggs","gluten"]',
    '["Healthy fats","Rich in vitamins","Good fiber source"]',
    'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80'
);

-- Recipe 3: Mediterranean Chickpea Salad
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Mediterranean Chickpea Salad',
    'Refreshing salad with chickpeas, cucumber, tomatoes, feta cheese, and olives in a lemon herb dressing.',
    'Vegetarian',
    'Easy',
    15, 0, 15, 4,
    280, 12, 32, 12, 9,
    '[{"item":"Chickpeas","amount":"2 cans","notes":"drained and rinsed"},{"item":"Cucumber","amount":"2","notes":"diced"},{"item":"Cherry tomatoes","amount":"2 cups","notes":"halved"},{"item":"Feta cheese","amount":"150g","notes":"crumbled"},{"item":"Kalamata olives","amount":"1/2 cup"},{"item":"Red onion","amount":"1/2","notes":"thinly sliced"},{"item":"Olive oil","amount":"3 tbsp"},{"item":"Lemon juice","amount":"2 tbsp"},{"item":"Fresh herbs","amount":"1/4 cup","notes":"parsley and mint"}]',
    '[{"step":1,"instruction":"Combine chickpeas, cucumber, tomatoes, and onion in a large bowl."},{"step":2,"instruction":"Add olives and feta cheese."},{"step":3,"instruction":"Whisk together olive oil, lemon juice, salt, and pepper."},{"step":4,"instruction":"Pour dressing over salad and toss gently."},{"step":5,"instruction":"Garnish with fresh herbs and serve chilled."}]',
    '["Vegan Option","No Cook","Mediterranean"]',
    '["dairy"]',
    '["Plant-based protein","Heart-healthy fats","Rich in antioxidants"]',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'
);

-- Recipe 4: Salmon Teriyaki with Broccoli
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Salmon Teriyaki with Broccoli',
    'Glazed salmon fillet with homemade teriyaki sauce, served with steamed broccoli and sesame seeds.',
    'Pescatarian',
    'Medium',
    10, 20, 30, 2,
    380, 42, 18, 16, 4,
    '[{"item":"Salmon fillets","amount":"2","notes":"150g each"},{"item":"Broccoli","amount":"2 cups","notes":"florets"},{"item":"Soy sauce","amount":"3 tbsp"},{"item":"Honey","amount":"2 tbsp"},{"item":"Ginger","amount":"1 tbsp","notes":"grated"},{"item":"Garlic","amount":"2 cloves","notes":"minced"},{"item":"Sesame seeds","amount":"1 tbsp"}]',
    '[{"step":1,"instruction":"Mix soy sauce, honey, ginger, and garlic for teriyaki sauce."},{"step":2,"instruction":"Marinate salmon in half the sauce for 10 minutes."},{"step":3,"instruction":"Pan-sear salmon for 4-5 minutes per side."},{"step":4,"instruction":"Steam broccoli for 5-6 minutes until tender-crisp."},{"step":5,"instruction":"Brush salmon with remaining sauce and garnish with sesame seeds."}]',
    '["High Protein","Omega-3","Asian"]',
    '["fish","soy","sesame"]',
    '["Rich in Omega-3","High quality protein","Vitamin D"]',
    'https://images.unsplash.com/photo-1580959375944-0b80a7a8b6da?w=800&q=80'
);

-- Recipe 5: Greek Yogurt Parfait
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Greek Yogurt Parfait',
    'Layered parfait with Greek yogurt, fresh berries, granola, and a drizzle of honey.',
    'Vegetarian',
    'Easy',
    5, 0, 5, 2,
    250, 18, 35, 6, 5,
    '[{"item":"Greek yogurt","amount":"2 cups","notes":"plain, low-fat"},{"item":"Mixed berries","amount":"1.5 cups","notes":"strawberries, blueberries, raspberries"},{"item":"Granola","amount":"1/2 cup"},{"item":"Honey","amount":"2 tbsp"},{"item":"Chia seeds","amount":"1 tbsp","notes":"optional"}]',
    '[{"step":1,"instruction":"Layer Greek yogurt in glasses or bowls."},{"step":2,"instruction":"Add a layer of mixed berries."},{"step":3,"instruction":"Sprinkle granola over berries."},{"step":4,"instruction":"Repeat layers until glasses are filled."},{"step":5,"instruction":"Drizzle with honey and top with chia seeds."}]',
    '["Breakfast","Quick","No Cook"]',
    '["dairy","gluten"]',
    '["Probiotics","Antioxidants","High in protein"]',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80'
);

-- Recipe 6: Vegetable Stir Fry with Tofu
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Vegetable Stir Fry with Tofu',
    'Colorful mix of vegetables and crispy tofu in a savory ginger-garlic sauce over brown rice.',
    'Vegan',
    'Easy',
    15, 15, 30, 3,
    320, 16, 42, 10, 8,
    '[{"item":"Extra firm tofu","amount":"400g","notes":"pressed and cubed"},{"item":"Mixed vegetables","amount":"4 cups","notes":"broccoli, bell peppers, carrots, snap peas"},{"item":"Brown rice","amount":"1.5 cups","notes":"cooked"},{"item":"Soy sauce","amount":"3 tbsp"},{"item":"Garlic","amount":"4 cloves","notes":"minced"},{"item":"Ginger","amount":"1 tbsp","notes":"grated"},{"item":"Sesame oil","amount":"1 tbsp"}]',
    '[{"step":1,"instruction":"Press tofu and cut into cubes. Pan-fry until crispy."},{"step":2,"instruction":"Heat sesame oil in a wok over high heat."},{"step":3,"instruction":"Stir-fry vegetables for 5-6 minutes until tender-crisp."},{"step":4,"instruction":"Add garlic, ginger, and soy sauce. Toss well."},{"step":5,"instruction":"Add crispy tofu and serve over brown rice."}]',
    '["Vegan","High Fiber","Asian"]',
    '["soy","sesame"]',
    '["Plant-based protein","Rich in vitamins","Low in saturated fat"]',
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80'
);

-- Recipe 7: Turkey and Veggie Lettuce Wraps
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Turkey and Veggie Lettuce Wraps',
    'Light and healthy lettuce wraps filled with seasoned ground turkey and crunchy vegetables.',
    'Low-Carb',
    'Easy',
    10, 12, 22, 4,
    220, 26, 12, 8, 3,
    '[{"item":"Ground turkey","amount":"500g","notes":"lean"},{"item":"Iceberg lettuce","amount":"1 head","notes":"leaves separated"},{"item":"Water chestnuts","amount":"1 can","notes":"diced"},{"item":"Carrots","amount":"2","notes":"shredded"},{"item":"Green onions","amount":"4","notes":"chopped"},{"item":"Hoisin sauce","amount":"2 tbsp"},{"item":"Soy sauce","amount":"2 tbsp"}]',
    '[{"step":1,"instruction":"Brown ground turkey in a large skillet."},{"step":2,"instruction":"Add water chestnuts, carrots, and green onions."},{"step":3,"instruction":"Stir in hoisin sauce and soy sauce. Cook for 3-4 minutes."},{"step":4,"instruction":"Wash and separate lettuce leaves."},{"step":5,"instruction":"Spoon turkey mixture into lettuce cups and serve."}]',
    '["Low Carb","High Protein","Quick"]',
    '["soy"]',
    '["Lean protein","Low in calories","Vitamin A rich"]',
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80'
);

-- Recipe 8: Overnight Oats with Berries
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Overnight Oats with Berries',
    'Creamy overnight oats with rolled oats, almond milk, chia seeds, and fresh mixed berries.',
    'Vegan',
    'Easy',
    5, 0, 5, 2,
    290, 10, 48, 8, 10,
    '[{"item":"Rolled oats","amount":"1 cup"},{"item":"Almond milk","amount":"1.5 cups"},{"item":"Chia seeds","amount":"2 tbsp"},{"item":"Maple syrup","amount":"2 tbsp"},{"item":"Vanilla extract","amount":"1 tsp"},{"item":"Mixed berries","amount":"1 cup","notes":"fresh or frozen"},{"item":"Almonds","amount":"2 tbsp","notes":"sliced"}]',
    '[{"step":1,"instruction":"Combine oats, almond milk, chia seeds, maple syrup, and vanilla in jars."},{"step":2,"instruction":"Stir well to ensure even mixing."},{"step":3,"instruction":"Cover and refrigerate overnight (or minimum 4 hours)."},{"step":4,"instruction":"In the morning, stir the oats and add more milk if needed."},{"step":5,"instruction":"Top with fresh berries and sliced almonds before serving."}]',
    '["Breakfast","Meal Prep","Vegan"]',
    '["tree nuts"]',
    '["High fiber","Heart-healthy","Sustained energy"]',
    'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&q=80'
);

-- Recipe 9: Shrimp Taco Bowl
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Shrimp Taco Bowl',
    'Spicy seasoned shrimp served over cilantro lime rice with black beans, corn, and avocado.',
    'Pescatarian',
    'Medium',
    15, 15, 30, 3,
    420, 32, 48, 12, 10,
    '[{"item":"Large shrimp","amount":"500g","notes":"peeled and deveined"},{"item":"Brown rice","amount":"1.5 cups","notes":"cooked"},{"item":"Black beans","amount":"1 can","notes":"drained"},{"item":"Corn","amount":"1 cup","notes":"fresh or frozen"},{"item":"Avocado","amount":"2","notes":"sliced"},{"item":"Lime","amount":"2","notes":"juiced"},{"item":"Chili powder","amount":"1 tbsp"},{"item":"Cilantro","amount":"1/4 cup","notes":"chopped"}]',
    '[{"step":1,"instruction":"Season shrimp with chili powder, cumin, salt, and pepper."},{"step":2,"instruction":"Sauté shrimp in olive oil for 2-3 minutes per side."},{"step":3,"instruction":"Mix cooked rice with lime juice and cilantro."},{"step":4,"instruction":"Warm black beans and corn together."},{"step":5,"instruction":"Assemble bowls with rice, beans, corn, shrimp, and avocado."}]',
    '["High Protein","Mexican","Gluten-Free"]',
    '["shellfish"]',
    '["Lean protein","Healthy fats","High in vitamins"]',
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80'
);

-- Recipe 10: Caprese Stuffed Chicken
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Caprese Stuffed Chicken',
    'Juicy chicken breast stuffed with mozzarella, tomatoes, and fresh basil, drizzled with balsamic glaze.',
    'Keto-Friendly',
    'Medium',
    15, 30, 45, 4,
    340, 42, 8, 16, 2,
    '[{"item":"Chicken breasts","amount":"4","notes":"large, boneless"},{"item":"Fresh mozzarella","amount":"200g","notes":"sliced"},{"item":"Tomatoes","amount":"3","notes":"sliced"},{"item":"Fresh basil","amount":"1 cup","notes":"leaves"},{"item":"Balsamic glaze","amount":"3 tbsp"},{"item":"Olive oil","amount":"2 tbsp"},{"item":"Italian seasoning","amount":"1 tbsp"}]',
    '[{"step":1,"instruction":"Cut a pocket into each chicken breast horizontally."},{"step":2,"instruction":"Stuff with mozzarella, tomato slices, and basil leaves."},{"step":3,"instruction":"Secure with toothpicks and season with Italian herbs."},{"step":4,"instruction":"Sear in olive oil for 3-4 minutes per side."},{"step":5,"instruction":"Bake at 375°F for 20 minutes. Drizzle with balsamic glaze."}]',
    '["High Protein","Italian","Keto"]',
    '["dairy"]',
    '["High protein","Low carb","Rich in calcium"]',
    'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80'
);

-- Recipe 11: Sweet Potato Buddha Bowl
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Sweet Potato Buddha Bowl',
    'Nourishing bowl with roasted sweet potatoes, chickpeas, kale, and creamy tahini dressing.',
    'Vegan',
    'Easy',
    15, 30, 45, 2,
    380, 14, 58, 12, 14,
    '[{"item":"Sweet potatoes","amount":"2","notes":"cubed"},{"item":"Chickpeas","amount":"1 can","notes":"drained"},{"item":"Kale","amount":"2 cups","notes":"chopped"},{"item":"Quinoa","amount":"1 cup","notes":"cooked"},{"item":"Tahini","amount":"3 tbsp"},{"item":"Lemon juice","amount":"2 tbsp"},{"item":"Maple syrup","amount":"1 tbsp"}]',
    '[{"step":1,"instruction":"Roast sweet potato cubes at 400°F for 25 minutes."},{"step":2,"instruction":"Toss chickpeas with spices and roast for 20 minutes until crispy."},{"step":3,"instruction":"Massage kale with a bit of olive oil and lemon."},{"step":4,"instruction":"Make tahini dressing by mixing tahini, lemon juice, and water."},{"step":5,"instruction":"Assemble bowls with quinoa, sweet potatoes, chickpeas, kale, and dressing."}]',
    '["Vegan","High Fiber","Meal Prep"]',
    '["sesame"]',
    '["Rich in beta-carotene","Plant-based protein","High in iron"]',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'
);

-- Recipe 12: Egg White Spinach Omelet
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Egg White Spinach Omelet',
    'Fluffy egg white omelet filled with sautéed spinach, mushrooms, and a sprinkle of feta cheese.',
    'Vegetarian',
    'Easy',
    5, 10, 15, 1,
    180, 22, 8, 6, 3,
    '[{"item":"Egg whites","amount":"4","notes":"or 1/2 cup liquid"},{"item":"Fresh spinach","amount":"1 cup"},{"item":"Mushrooms","amount":"1/2 cup","notes":"sliced"},{"item":"Feta cheese","amount":"2 tbsp","notes":"crumbled"},{"item":"Cherry tomatoes","amount":"4","notes":"halved"},{"item":"Olive oil spray","amount":"1 spray"}]',
    '[{"step":1,"instruction":"Sauté mushrooms and spinach in a non-stick pan until wilted."},{"step":2,"instruction":"Remove vegetables and set aside."},{"step":3,"instruction":"Whisk egg whites and pour into the same pan."},{"step":4,"instruction":"When eggs start to set, add vegetables and feta on one half."},{"step":5,"instruction":"Fold omelet in half and cook for 1 more minute."}]',
    '["Breakfast","Low Carb","Quick"]',
    '["eggs","dairy"]',
    '["High protein","Low calorie","Rich in iron"]',
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80'
);

-- Recipe 13: Lentil Curry with Coconut
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Lentil Curry with Coconut',
    'Creamy red lentil curry cooked in coconut milk with aromatic spices, served with brown rice.',
    'Vegan',
    'Easy',
    10, 30, 40, 4,
    340, 16, 52, 10, 12,
    '[{"item":"Red lentils","amount":"1.5 cups","notes":"rinsed"},{"item":"Coconut milk","amount":"1 can","notes":"full-fat"},{"item":"Tomatoes","amount":"2 cans","notes":"diced"},{"item":"Onion","amount":"1","notes":"chopped"},{"item":"Garlic","amount":"4 cloves","notes":"minced"},{"item":"Curry powder","amount":"2 tbsp"},{"item":"Ginger","amount":"1 tbsp","notes":"grated"},{"item":"Spinach","amount":"2 cups"}]',
    '[{"step":1,"instruction":"Sauté onion, garlic, and ginger in oil until fragrant."},{"step":2,"instruction":"Add curry powder and cook for 1 minute."},{"step":3,"instruction":"Add lentils, tomatoes, and coconut milk. Bring to boil."},{"step":4,"instruction":"Simmer for 20-25 minutes until lentils are tender."},{"step":5,"instruction":"Stir in spinach and cook until wilted. Serve with rice."}]',
    '["Vegan","Indian","High Fiber"]',
    '[]',
    '["Plant-based protein","High in fiber","Anti-inflammatory"]',
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80'
);

-- Recipe 14: Baked Cod with Lemon Herbs
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Baked Cod with Lemon Herbs',
    'Tender baked cod fillet seasoned with fresh herbs, lemon zest, and olive oil.',
    'Pescatarian',
    'Easy',
    10, 20, 30, 2,
    220, 38, 4, 6, 1,
    '[{"item":"Cod fillets","amount":"2","notes":"150g each"},{"item":"Lemon","amount":"1","notes":"zested and juiced"},{"item":"Fresh parsley","amount":"2 tbsp","notes":"chopped"},{"item":"Fresh dill","amount":"1 tbsp","notes":"chopped"},{"item":"Olive oil","amount":"1 tbsp"},{"item":"Garlic","amount":"2 cloves","notes":"minced"}]',
    '[{"step":1,"instruction":"Preheat oven to 400°F. Line baking sheet with parchment."},{"step":2,"instruction":"Place cod fillets on baking sheet."},{"step":3,"instruction":"Mix olive oil, lemon zest, juice, garlic, and herbs."},{"step":4,"instruction":"Brush mixture over cod fillets generously."},{"step":5,"instruction":"Bake for 15-18 minutes until fish flakes easily."}]',
    '["High Protein","Low Carb","Quick"]',
    '["fish"]',
    '["Lean protein","Omega-3 fatty acids","Low in calories"]',
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80'
);

-- Recipe 15: Protein Pancakes with Berries
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Protein Pancakes with Berries',
    'Fluffy protein-packed pancakes made with oats and topped with fresh berries and maple syrup.',
    'Vegetarian',
    'Easy',
    10, 15, 25, 3,
    320, 24, 42, 8, 6,
    '[{"item":"Oats","amount":"1 cup","notes":"ground into flour"},{"item":"Protein powder","amount":"2 scoops","notes":"vanilla"},{"item":"Eggs","amount":"2"},{"item":"Banana","amount":"1","notes":"mashed"},{"item":"Almond milk","amount":"1/2 cup"},{"item":"Baking powder","amount":"1 tsp"},{"item":"Mixed berries","amount":"1 cup"},{"item":"Maple syrup","amount":"2 tbsp"}]',
    '[{"step":1,"instruction":"Blend oats into flour consistency."},{"step":2,"instruction":"Mix oat flour, protein powder, and baking powder."},{"step":3,"instruction":"Whisk eggs, banana, and almond milk separately."},{"step":4,"instruction":"Combine wet and dry ingredients. Cook pancakes on griddle."},{"step":5,"instruction":"Top with fresh berries and maple syrup."}]',
    '["Breakfast","High Protein","Post-Workout"]',
    '["eggs","dairy","tree nuts"]',
    '["High protein","Complex carbs","Sustained energy"]',
    'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80'
);

-- Recipe 16: Zucchini Noodles with Pesto
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Zucchini Noodles with Pesto',
    'Light and fresh zucchini noodles tossed in homemade basil pesto with cherry tomatoes and pine nuts.',
    'Vegetarian',
    'Easy',
    15, 5, 20, 2,
    240, 8, 14, 18, 4,
    '[{"item":"Zucchini","amount":"4","notes":"spiralized"},{"item":"Fresh basil","amount":"2 cups","notes":"packed"},{"item":"Parmesan cheese","amount":"1/2 cup","notes":"grated"},{"item":"Pine nuts","amount":"1/4 cup"},{"item":"Garlic","amount":"3 cloves"},{"item":"Olive oil","amount":"1/2 cup"},{"item":"Cherry tomatoes","amount":"1 cup","notes":"halved"}]',
    '[{"step":1,"instruction":"Spiralize zucchini into noodles and set aside."},{"step":2,"instruction":"Blend basil, parmesan, pine nuts, garlic, and olive oil for pesto."},{"step":3,"instruction":"Lightly sauté zucchini noodles for 2-3 minutes."},{"step":4,"instruction":"Toss warm noodles with pesto sauce."},{"step":5,"instruction":"Top with cherry tomatoes and extra parmesan."}]',
    '["Low Carb","Vegetarian","Quick"]',
    '["dairy","tree nuts"]',
    '["Low in carbs","Rich in vitamins","Heart-healthy fats"]',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80'
);

-- Recipe 17: Thai Peanut Chicken Bowl
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Thai Peanut Chicken Bowl',
    'Asian-inspired bowl with grilled chicken, crunchy vegetables, and creamy peanut sauce over jasmine rice.',
    'Gluten-Free',
    'Medium',
    20, 20, 40, 3,
    480, 36, 52, 16, 6,
    '[{"item":"Chicken breast","amount":"400g","notes":"sliced"},{"item":"Jasmine rice","amount":"1.5 cups","notes":"cooked"},{"item":"Peanut butter","amount":"3 tbsp","notes":"natural"},{"item":"Soy sauce","amount":"2 tbsp"},{"item":"Red cabbage","amount":"2 cups","notes":"shredded"},{"item":"Carrots","amount":"2","notes":"julienned"},{"item":"Cucumber","amount":"1","notes":"sliced"},{"item":"Lime juice","amount":"2 tbsp"},{"item":"Cilantro","amount":"1/4 cup"}]',
    '[{"step":1,"instruction":"Grill or pan-sear chicken slices until cooked through."},{"step":2,"instruction":"Make peanut sauce by mixing peanut butter, soy sauce, lime juice, and water."},{"step":3,"instruction":"Prepare vegetables and arrange in bowls."},{"step":4,"instruction":"Add jasmine rice and sliced chicken to bowls."},{"step":5,"instruction":"Drizzle with peanut sauce and garnish with cilantro."}]',
    '["High Protein","Asian","Meal Prep"]',
    '["peanuts","soy"]',
    '["High in protein","Rich in vitamins","Balanced macros"]',
    'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80'
);

-- Recipe 18: Chia Seed Pudding
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Chia Seed Pudding',
    'Creamy overnight chia pudding with vanilla, topped with mango, coconut, and almonds.',
    'Vegan',
    'Easy',
    5, 0, 5, 2,
    210, 6, 28, 10, 12,
    '[{"item":"Chia seeds","amount":"1/4 cup"},{"item":"Coconut milk","amount":"1 cup"},{"item":"Maple syrup","amount":"1 tbsp"},{"item":"Vanilla extract","amount":"1/2 tsp"},{"item":"Mango","amount":"1","notes":"diced"},{"item":"Shredded coconut","amount":"2 tbsp"},{"item":"Sliced almonds","amount":"2 tbsp"}]',
    '[{"step":1,"instruction":"Mix chia seeds, coconut milk, maple syrup, and vanilla in jars."},{"step":2,"instruction":"Stir well and refrigerate for at least 4 hours or overnight."},{"step":3,"instruction":"Stir pudding before serving to break up any clumps."},{"step":4,"instruction":"Top with fresh mango, shredded coconut, and almonds."},{"step":5,"instruction":"Add more milk if too thick."}]',
    '["Breakfast","Vegan","Meal Prep"]',
    '["tree nuts"]',
    '["High in omega-3","Rich in fiber","Antioxidants"]',
    'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&q=80'
);

-- Recipe 19: Turkey Meatballs with Marinara
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Turkey Meatballs with Marinara',
    'Lean turkey meatballs simmered in homemade marinara sauce, served with whole wheat spaghetti.',
    'Balanced',
    'Medium',
    20, 30, 50, 4,
    420, 34, 46, 12, 8,
    '[{"item":"Ground turkey","amount":"600g","notes":"lean"},{"item":"Whole wheat spaghetti","amount":"300g"},{"item":"Crushed tomatoes","amount":"2 cans"},{"item":"Breadcrumbs","amount":"1/2 cup"},{"item":"Egg","amount":"1"},{"item":"Garlic","amount":"4 cloves","notes":"minced"},{"item":"Fresh basil","amount":"1/4 cup"},{"item":"Parmesan","amount":"1/4 cup","notes":"grated"}]',
    '[{"step":1,"instruction":"Mix ground turkey, breadcrumbs, egg, garlic, and parmesan for meatballs."},{"step":2,"instruction":"Form into 16-20 meatballs and bake at 400°F for 20 minutes."},{"step":3,"instruction":"Simmer crushed tomatoes with garlic and basil for marinara."},{"step":4,"instruction":"Add baked meatballs to sauce and simmer for 10 minutes."},{"step":5,"instruction":"Cook spaghetti and serve with meatballs and sauce."}]',
    '["High Protein","Italian","Family-Friendly"]',
    '["eggs","gluten","dairy"]',
    '["Lean protein","Whole grains","Lycopene"]',
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80'
);

-- Recipe 20: Cauliflower Rice Burrito Bowl
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Cauliflower Rice Burrito Bowl',
    'Low-carb burrito bowl with cauliflower rice, seasoned black beans, grilled peppers, and guacamole.',
    'Vegan',
    'Easy',
    15, 15, 30, 2,
    310, 14, 38, 14, 16,
    '[{"item":"Cauliflower","amount":"1 head","notes":"riced"},{"item":"Black beans","amount":"1 can","notes":"drained"},{"item":"Bell peppers","amount":"2","notes":"sliced"},{"item":"Avocado","amount":"2","notes":"for guacamole"},{"item":"Corn","amount":"1 cup"},{"item":"Lime","amount":"2","notes":"juiced"},{"item":"Cumin","amount":"1 tsp"},{"item":"Chili powder","amount":"1 tsp"}]',
    '[{"step":1,"instruction":"Pulse cauliflower in food processor to rice-like texture."},{"step":2,"instruction":"Sauté cauliflower rice with lime juice for 5 minutes."},{"step":3,"instruction":"Season black beans with cumin and chili powder. Heat through."},{"step":4,"instruction":"Grill bell peppers until charred and tender."},{"step":5,"instruction":"Make guacamole and assemble bowls with all ingredients."}]',
    '["Low Carb","Vegan","Mexican"]',
    '[]',
    '["Low in carbs","High in fiber","Vitamin C rich"]',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80'
);

-- Recipe 21: Baked Falafel with Tzatziki
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Baked Falafel with Tzatziki',
    'Crispy baked chickpea falafel served with cooling tzatziki sauce and fresh vegetables.',
    'Vegetarian',
    'Medium',
    20, 25, 45, 4,
    320, 14, 42, 12, 10,
    '[{"item":"Chickpeas","amount":"2 cans","notes":"drained"},{"item":"Fresh parsley","amount":"1 cup"},{"item":"Onion","amount":"1","notes":"chopped"},{"item":"Garlic","amount":"4 cloves"},{"item":"Cumin","amount":"2 tsp"},{"item":"Greek yogurt","amount":"1 cup"},{"item":"Cucumber","amount":"1","notes":"grated"},{"item":"Lemon juice","amount":"2 tbsp"}]',
    '[{"step":1,"instruction":"Blend chickpeas, parsley, onion, garlic, and spices in food processor."},{"step":2,"instruction":"Form mixture into 16 small patties."},{"step":3,"instruction":"Bake at 375°F for 25 minutes, flipping halfway."},{"step":4,"instruction":"Make tzatziki by mixing yogurt, cucumber, lemon, and garlic."},{"step":5,"instruction":"Serve falafel with tzatziki and fresh vegetables."}]',
    '["Vegetarian","Mediterranean","High Fiber"]',
    '["dairy"]',
    '["Plant-based protein","Probiotics","High in iron"]',
    'https://images.unsplash.com/photo-1593252719533-6abca6c49bc4?w=800&q=80'
);

-- Recipe 22: Grilled Veggie Skewers
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Grilled Veggie Skewers',
    'Colorful vegetable kebabs with bell peppers, zucchini, mushrooms, and cherry tomatoes, grilled to perfection.',
    'Vegan',
    'Easy',
    15, 15, 30, 4,
    140, 6, 22, 6, 6,
    '[{"item":"Bell peppers","amount":"3","notes":"cut into chunks"},{"item":"Zucchini","amount":"2","notes":"sliced thick"},{"item":"Mushrooms","amount":"12","notes":"whole"},{"item":"Cherry tomatoes","amount":"12"},{"item":"Red onion","amount":"1","notes":"cut into chunks"},{"item":"Olive oil","amount":"2 tbsp"},{"item":"Italian herbs","amount":"1 tbsp"},{"item":"Balsamic vinegar","amount":"1 tbsp"}]',
    '[{"step":1,"instruction":"Cut all vegetables into similar-sized pieces."},{"step":2,"instruction":"Marinate vegetables in olive oil, herbs, and balsamic for 10 minutes."},{"step":3,"instruction":"Thread vegetables onto skewers, alternating varieties."},{"step":4,"instruction":"Grill over medium-high heat for 12-15 minutes, turning often."},{"step":5,"instruction":"Serve hot with your choice of dipping sauce or over rice."}]',
    '["Vegan","Low Calorie","BBQ"]',
    '[]',
    '["Low in calories","Rich in vitamins","Antioxidants"]',
    'https://images.unsplash.com/photo-1603073789556-281c0c06d973?w=800&q=80'
);

-- Recipe 23: Tuna Poke Bowl
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Tuna Poke Bowl',
    'Fresh Hawaiian-style poke bowl with sushi-grade tuna, edamame, seaweed salad, and sesame dressing.',
    'Pescatarian',
    'Medium',
    20, 15, 35, 2,
    420, 38, 46, 12, 6,
    '[{"item":"Sushi-grade tuna","amount":"300g","notes":"cubed"},{"item":"Sushi rice","amount":"1.5 cups","notes":"cooked"},{"item":"Edamame","amount":"1 cup","notes":"shelled"},{"item":"Seaweed salad","amount":"1 cup"},{"item":"Avocado","amount":"1","notes":"sliced"},{"item":"Soy sauce","amount":"2 tbsp"},{"item":"Sesame oil","amount":"1 tsp"},{"item":"Sesame seeds","amount":"1 tbsp"},{"item":"Green onions","amount":"2","notes":"sliced"}]',
    '[{"step":1,"instruction":"Marinate tuna cubes in soy sauce and sesame oil for 10 minutes."},{"step":2,"instruction":"Cook sushi rice and season with rice vinegar."},{"step":3,"instruction":"Arrange rice in bowls as the base."},{"step":4,"instruction":"Top with marinated tuna, edamame, seaweed salad, and avocado."},{"step":5,"instruction":"Garnish with sesame seeds and green onions."}]',
    '["High Protein","Asian","Low Fat"]',
    '["fish","soy","sesame"]',
    '["High in omega-3","Lean protein","Rich in iodine"]',
    'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=800&q=80'
);

-- Recipe 24: Spinach and Feta Stuffed Portobello
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Spinach and Feta Stuffed Portobello',
    'Meaty portobello mushrooms stuffed with spinach, feta cheese, sun-dried tomatoes, and breadcrumbs.',
    'Vegetarian',
    'Easy',
    15, 25, 40, 2,
    240, 14, 22, 12, 6,
    '[{"item":"Portobello mushrooms","amount":"4","notes":"large, stems removed"},{"item":"Fresh spinach","amount":"3 cups","notes":"chopped"},{"item":"Feta cheese","amount":"150g","notes":"crumbled"},{"item":"Sun-dried tomatoes","amount":"1/2 cup","notes":"chopped"},{"item":"Breadcrumbs","amount":"1/4 cup"},{"item":"Garlic","amount":"3 cloves","notes":"minced"},{"item":"Olive oil","amount":"2 tbsp"}]',
    '[{"step":1,"instruction":"Remove stems and gills from portobello mushrooms."},{"step":2,"instruction":"Sauté spinach and garlic until wilted."},{"step":3,"instruction":"Mix spinach with feta, sun-dried tomatoes, and breadcrumbs."},{"step":4,"instruction":"Stuff mushroom caps with the mixture."},{"step":5,"instruction":"Bake at 375°F for 20-25 minutes until mushrooms are tender."}]',
    '["Vegetarian","Low Carb","Mediterranean"]',
    '["dairy","gluten"]',
    '["Low in calories","Rich in iron","High in B vitamins"]',
    'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80'
);

-- Recipe 25: Acai Smoothie Bowl
INSERT INTO recipes (
    user_id, title, description, dietary_type, difficulty,
    prep_time, cook_time, servings,
    calories, protein, carbs, fats, fiber,
    ingredients, instructions, tags, allergens,
    health_benefits, image_url
) VALUES (
    NULL,
    'Acai Smoothie Bowl',
    'Antioxidant-rich acai bowl topped with granola, fresh berries, coconut, and nut butter.',
    'Vegan',
    'Easy',
    10, 0, 10, 2,
    340, 8, 58, 12, 10,
    '[{"item":"Frozen acai puree","amount":"200g","notes":"unsweetened"},{"item":"Banana","amount":"2","notes":"frozen"},{"item":"Almond milk","amount":"1/2 cup"},{"item":"Mixed berries","amount":"1 cup","notes":"fresh"},{"item":"Granola","amount":"1/2 cup"},{"item":"Shredded coconut","amount":"2 tbsp"},{"item":"Almond butter","amount":"2 tbsp"},{"item":"Chia seeds","amount":"1 tbsp"}]',
    '[{"step":1,"instruction":"Blend frozen acai, banana, and almond milk until thick and smooth."},{"step":2,"instruction":"Pour into bowls, keeping mixture thick."},{"step":3,"instruction":"Arrange fresh berries on top."},{"step":4,"instruction":"Add granola, shredded coconut, and drizzle with almond butter."},{"step":5,"instruction":"Sprinkle with chia seeds and serve immediately."}]',
    '["Breakfast","Vegan","Antioxidant-Rich"]',
    '["tree nuts"]',
    '["Antioxidant-rich","Heart-healthy","Boosts energy"]',
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80'
);
