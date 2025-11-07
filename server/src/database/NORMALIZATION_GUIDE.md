# Database Normalization to 3NF

## Overview

The database has been normalized to Third Normal Form (3NF) to eliminate redundancy, improve data integrity, and enhance maintainability.

## Normalization Forms Applied

### 1st Normal Form (1NF)

**Rule:** All columns contain atomic (indivisible) values

**Changes Made:**

- ✅ Converted `recipes.tags` (TEXT[]) → `recipe_tags` junction table
- ✅ Converted `recipes.allergens` (TEXT[]) → `recipe_allergens` junction table
- ✅ Converted `recipes.health_benefits` (TEXT[]) → `recipe_health_benefits` table
- ✅ Converted `recipes.suitable_for_conditions` (TEXT[]) → `recipe_conditions` junction table
- ✅ Converted `recipes.ingredients` (JSONB) → `recipe_ingredients` table
- ✅ Converted `recipes.instructions` (JSONB) → `recipe_instructions` table

### 2nd Normal Form (2NF)

**Rule:** All non-key attributes must depend on the entire primary key

**Changes Made:**

- ✅ Created `ingredients` table (ingredient data independent of recipes)
- ✅ Created `tags` table (tag data independent of recipes)
- ✅ Created `allergens` table (allergen data independent of recipes)
- ✅ Created `health_conditions` table (condition data independent of users/recipes)
- ✅ Created `dietary_types` table (dietary type data independent of recipes/users)
- ✅ Created `difficulty_levels` table (difficulty data independent of recipes)
- ✅ Separated `user_preferences` from `users` table (preferences depend only on user_id)

### 3rd Normal Form (3NF)

**Rule:** No transitive dependencies (non-key attributes depend only on primary key)

**Changes Made:**

- ✅ Removed transitive dependency: `recipes.dietary_type` now references `dietary_types.id`
- ✅ Removed transitive dependency: `recipes.difficulty` now references `difficulty_levels.id`
- ✅ Created `nutrition_profiles` table (nutrition data not dependent on entity type)
- ✅ Separated user goals from `daily_health_logs` to `user_preferences`

## New Database Structure

### Core Tables

#### Users & Preferences

```
users (unchanged)
  ├── user_preferences (1:1) - Goals, settings
  ├── user_dietary_restrictions (M:N) - User dietary types
  ├── user_allergens (M:N) - User allergen tracking
  └── user_health_conditions (M:N) - User health conditions
```

#### Recipes

```
recipes (normalized)
  ├── recipe_ingredients (1:N) - Ingredient list
  ├── recipe_instructions (1:N) - Step-by-step instructions
  ├── recipe_tags (M:N) - Recipe tags
  ├── recipe_allergens (M:N) - Recipe allergens
  ├── recipe_health_benefits (1:N) - Health benefits
  ├── recipe_conditions (M:N) - Suitable health conditions
  └── recipe_likes (M:N) - User likes
```

#### Lookup/Reference Tables

- `dietary_types` - Vegan, vegetarian, keto, etc.
- `difficulty_levels` - Easy, medium, hard
- `tags` - Centralized tag management with categories
- `allergens` - Common allergens with severity
- `health_conditions` - Health conditions with categories
- `ingredients` - Master ingredient database

#### Health Tracking

```
daily_health_logs (simplified)
  ├── meal_logs
  │   └── meal_ingredients (1:N)
  ├── water_logs
  └── mood_logs
```

## Benefits of Normalization

### 1. Data Integrity

- ✅ Foreign key constraints ensure referential integrity
- ✅ No duplicate data (e.g., "vegan" stored once, not in every recipe)
- ✅ Consistent spelling and naming (tags managed centrally)

### 2. Maintainability

- ✅ Add new dietary types in one place
- ✅ Update allergen severity globally
- ✅ Manage ingredient nutrition data centrally

### 3. Query Performance

- ✅ Indexed junction tables for fast lookups
- ✅ Efficient filtering by tags, allergens, conditions
- ✅ Optimized for common queries (find recipes by tag, allergen-free recipes)

### 4. Scalability

- ✅ Easy to add new attributes to lookup tables
- ✅ Can add new categories without schema changes
- ✅ Supports multi-language tags (future enhancement)

### 5. Data Consistency

- ✅ No "vegan" vs "Vegan" vs "VEGAN" issues
- ✅ Standardized ingredient names
- ✅ Consistent allergen tracking

## Migration Steps

### Step 1: Run Normalization Migration

```sql
-- Creates all new normalized tables
\i 011-normalize-database-to-3nf.sql
```

### Step 2: Run Data Migration

```sql
-- Migrates existing data to normalized tables
\i 012-migrate-data-to-normalized-schema.sql
```

### Step 3: Update Application Code

- Update recipe queries to use junction tables
- Update ingredient queries to use normalized tables
- Use `recipes_complete` view for backward compatibility

### Step 4: Test Thoroughly

- Verify all recipes display correctly
- Test filtering by tags, allergens, dietary types
- Ensure user preferences load properly

### Step 5: Cleanup (Optional)

Once everything is verified, remove old columns:

```sql
ALTER TABLE recipes DROP COLUMN tags;
ALTER TABLE recipes DROP COLUMN allergens;
ALTER TABLE recipes DROP COLUMN health_benefits;
ALTER TABLE recipes DROP COLUMN suitable_for_conditions;
ALTER TABLE recipes DROP COLUMN ingredients;
ALTER TABLE recipes DROP COLUMN instructions;
```

## Example Queries

### Get Recipe with All Data (Using View)

```sql
SELECT * FROM recipes_complete WHERE id = 'recipe-uuid';
```

### Find Recipes by Tag

```sql
SELECT r.*
FROM recipes r
JOIN recipe_tags rt ON r.id = rt.recipe_id
JOIN tags t ON rt.tag_id = t.id
WHERE t.name = 'vegan';
```

### Find Allergen-Free Recipes

```sql
SELECT r.*
FROM recipes r
WHERE NOT EXISTS (
    SELECT 1 FROM recipe_allergens ra
    JOIN allergens a ON ra.allergen_id = a.id
    WHERE ra.recipe_id = r.id AND a.name = 'peanuts'
);
```

### Get Recipe Ingredients

```sql
SELECT
    ri.display_order,
    ri.amount,
    ri.ingredient_name,
    i.calories_per_100g,
    i.protein_per_100g
FROM recipe_ingredients ri
LEFT JOIN ingredients i ON ri.ingredient_id = i.id
WHERE ri.recipe_id = 'recipe-uuid'
ORDER BY ri.display_order;
```

### Get User Dietary Restrictions

```sql
SELECT dt.name, dt.description
FROM user_dietary_restrictions udr
JOIN dietary_types dt ON udr.dietary_type_id = dt.id
WHERE udr.user_id = 'user-uuid';
```

## Schema Diagram

```
┌─────────────────────┐
│      users          │
└──────────┬──────────┘
           │ 1:1
┌──────────▼──────────┐       ┌──────────────────┐
│  user_preferences   │       │  dietary_types   │
└─────────────────────┘       └──────┬───────────┘
                                     │
        ┌────────────────────────────┴─────┐
        │                                  │
        │ M:N                              │ M:N
┌───────▼────────────┐           ┌─────────▼────────┐
│user_dietary_       │           │recipe_dietary    │
│restrictions        │           │(FK in recipes)   │
└────────────────────┘           └──────────────────┘

┌─────────────────────┐
│      recipes        │
└──────────┬──────────┘
           │ 1:N
    ┌──────┴───────┬──────────────┬─────────────┐
    │              │              │             │
┌───▼────┐  ┌──────▼──────┐  ┌───▼───────┐  ┌─▼──────┐
│recipe_ │  │recipe_      │  │recipe_    │  │recipe_ │
│tags    │  │ingredients  │  │allergens  │  │instruc │
│        │  │             │  │           │  │tions   │
└───┬────┘  └──────┬──────┘  └───┬───────┘  └────────┘
    │ M:N          │ M:N          │ M:N
┌───▼────┐  ┌──────▼──────┐  ┌───▼───────┐
│tags    │  │ingredients  │  │allergens  │
└────────┘  └─────────────┘  └───────────┘
```

## Performance Considerations

### Indexes Created

- All foreign keys are indexed
- Junction table primary keys (composite)
- Common query paths (user_id, recipe_id, tag_id, etc.)
- Date fields for time-based queries

### Query Optimization Tips

- Use the `recipes_complete` view for full recipe data in one query
- Filter by tag/allergen IDs rather than names when possible
- Use EXPLAIN ANALYZE to verify query performance
- Consider materialized views for complex aggregations

## Backward Compatibility

The `recipes_complete` view provides backward compatibility by aggregating all normalized data back into the original structure. This allows gradual migration of application code.

## Future Enhancements

With this normalized structure, we can easily add:

- 🔮 Multi-language support for tags/ingredients
- 🔮 Ingredient substitutions table
- 🔮 Meal planning with recipe scheduling
- 🔮 Shopping list generation from recipes
- 🔮 Nutritional goal tracking with recommendations
- 🔮 Recipe variations and modifications
- 🔮 User recipe collections/folders
- 🔮 Ingredient seasonality data
- 🔮 Recipe cost estimation
- 🔮 Cooking equipment requirements

## Conclusion

The database is now in 3NF, providing:

- ✅ No data redundancy
- ✅ Better data integrity
- ✅ Easier maintenance
- ✅ Better query performance
- ✅ Scalable architecture
- ✅ Consistent data
