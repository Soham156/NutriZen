import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Heart, Clock, Flame, Users, Filter, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const recipes = [
  {
    id: 1,
    title: "Protein-Packed Buddha Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop",
    author: "Sarah M.",
    time: "25 min",
    calories: 450,
    likes: 234,
    tags: ["High Protein", "Vegan", "Meal Prep"],
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Salad",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop",
    author: "Alex K.",
    time: "15 min",
    calories: 380,
    likes: 189,
    tags: ["Gluten Free", "Quick", "Fresh"],
  },
  {
    id: 3,
    title: "Grilled Salmon with Asparagus",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop",
    author: "Jamie L.",
    time: "30 min",
    calories: 520,
    likes: 312,
    tags: ["High Protein", "Omega-3", "Keto"],
  },
  {
    id: 4,
    title: "Berry Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&auto=format&fit=crop",
    author: "Emma R.",
    time: "10 min",
    calories: 320,
    likes: 456,
    tags: ["Breakfast", "Antioxidants", "Quick"],
  },
  {
    id: 5,
    title: "Chicken Stir-Fry Noodles",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop",
    author: "David C.",
    time: "20 min",
    calories: 490,
    likes: 278,
    tags: ["High Protein", "Asian", "Quick"],
  },
  {
    id: 6,
    title: "Avocado Toast Deluxe",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&auto=format&fit=crop",
    author: "Lisa W.",
    time: "8 min",
    calories: 340,
    likes: 521,
    tags: ["Breakfast", "Healthy Fats", "Quick"],
  },
  {
    id: 7,
    title: "Lentil & Veggie Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&auto=format&fit=crop",
    author: "Priya S.",
    time: "35 min",
    calories: 410,
    likes: 195,
    tags: ["Vegan", "Comfort", "High Fiber"],
  },
  {
    id: 8,
    title: "Greek Yogurt Parfait",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop",
    author: "Tom H.",
    time: "5 min",
    calories: 280,
    likes: 387,
    tags: ["Breakfast", "High Protein", "Quick"],
  },
  {
    id: 9,
    title: "Roasted Veggie Medley",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop",
    author: "Nina B.",
    time: "40 min",
    calories: 220,
    likes: 156,
    tags: ["Vegan", "Side Dish", "Low Cal"],
  },
];

const Recipes = () => {
  const [likedRecipes, setLikedRecipes] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedRecipes((prev) =>
      prev.includes(id) ? prev.filter((recipeId) => recipeId !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <main className="container mx-auto px-4 md:px-6 pt-6 pb-16">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Recipes</h1>
          <p className="text-muted-foreground">
            Discover and share healthy, delicious meals from our wellness community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search recipes, ingredients, or authors..."
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" size="lg" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="hero" size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            Share Recipe
          </Button>
        </div>

        {/* Popular Tags */}
        <div className="mb-8 flex flex-wrap gap-2 animate-fade-in">
          {["All", "High Protein", "Vegan", "Quick", "Keto", "Breakfast", "Meal Prep"].map((tag) => (
            <Badge
              key={tag}
              variant={tag === "All" ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Pinterest-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {recipes.map((recipe, index) => (
            <Card
              key={recipe.id}
              className="break-inside-avoid shadow-medium border-border/50 hover:shadow-strong transition-all group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleLike(recipe.id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${likedRecipes.includes(recipe.id)
                        ? "fill-highlight text-highlight"
                        : "text-muted-foreground"
                      } transition-colors`}
                  />
                </button>
              </div>

              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-highlight">
                    <Flame className="w-4 h-4" />
                    <span className="font-medium">{recipe.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{recipe.likes + (likedRecipes.includes(recipe.id) ? 1 : 0)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-2">
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Recipes
          </Button>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Recipes;
