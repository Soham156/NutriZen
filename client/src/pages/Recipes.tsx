import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { Search, Heart, Clock, Flame, Users, Filter, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { GenerateRecipeDialog } from "@/components/GenerateRecipeDialog";
import { RecipeDetailDialog } from "@/components/RecipeDetailDialog";
import { useToast } from "@/hooks/use-toast";
import { defaultRecipes } from "@/data/defaultRecipes";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  tags: string[];
  dietary_type: string;
  likes_count: number;
  is_ai_generated: boolean;
  ingredients: Array<{
    item: string;
    amount: string;
    notes?: string;
  }>;
  instructions: Array<{
    step: number;
    instruction: string;
  }>;
  allergens?: string[];
  health_benefits?: string[];
}

const API_URL = import.meta.env.VITE_API_URL || 'https://nutri-zen-server.vercel.app/api';

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}/recipes`);
      const data = await response.json();

      if (data.success && data.data.recipes.length > 0) {
        // Combine API recipes with default recipes
        const allRecipes = [...data.data.recipes, ...(defaultRecipes as Recipe[])];
        setRecipes(allRecipes);
      } else {
        // Use default recipes if no recipes from API
        setRecipes(defaultRecipes as Recipe[]);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      // Use default recipes on error
      setRecipes(defaultRecipes as Recipe[]);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id: string) => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');

    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to like recipes",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/recipes/${id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        if (data.data.liked) {
          setLikedRecipes([...likedRecipes, id]);
        } else {
          setLikedRecipes(likedRecipes.filter((recipeId) => recipeId !== id));
        }

        setRecipes(recipes.map(recipe =>
          recipe.id === id
            ? { ...recipe, likes_count: recipe.likes_count + (data.data.liked ? 1 : -1) }
            : recipe
        ));
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleRecipeGenerated = (newRecipe: Recipe) => {
    setRecipes([newRecipe, ...recipes]);
    toast({
      title: "Success",
      description: "Your recipe has been generated and saved!",
    });
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailDialog(true);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <main className="container mx-auto px-4 md:px-6 pt-6 pb-16">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Recipe Collection</h1>
          <p className="text-muted-foreground">
            Discover personalized healthy recipes generated just for you
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search recipes, ingredients, or tags..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="lg" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button
            variant="hero"
            size="lg"
            className="gap-2"
            onClick={() => setShowGenerateDialog(true)}
          >
            <Sparkles className="w-4 h-4" />
            Generate Recipe
          </Button>
        </div>

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

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading delicious recipes...</p>
          </div>
        )}

        {!loading && filteredRecipes.length === 0 && (
          <Card className="p-12 text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to generate an AI-powered recipe!
            </p>
            <Button
              variant="hero"
              size="lg"
              className="gap-2"
              onClick={() => setShowGenerateDialog(true)}
            >
              <Sparkles className="w-4 h-4" />
              Generate Your First Recipe
            </Button>
          </Card>
        )}

        {!loading && filteredRecipes.length > 0 && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredRecipes.map((recipe, index) => (
              <Card
                key={recipe.id}
                className="break-inside-avoid shadow-medium border-border/50 hover:shadow-strong transition-all group overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image_url}
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
                  {recipe.is_ai_generated && (
                    <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Generated
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>

                  {recipe.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {recipe.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{(recipe.prep_time || 0) + (recipe.cook_time || 0)} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-highlight">
                      <Flame className="w-4 h-4" />
                      <span className="font-medium">{recipe.calories} cal</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">{recipe.protein}g</span> protein
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground ml-auto">
                      <Heart className="w-4 h-4" />
                      <span>{recipe.likes_count}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {recipe.dietary_type && (
                      <Badge variant="outline" className="text-xs">
                        {recipe.dietary_type}
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => handleViewRecipe(recipe)}
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredRecipes.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Recipes
            </Button>
          </div>
        )}
      </main>

      <GenerateRecipeDialog
        open={showGenerateDialog}
        onOpenChange={setShowGenerateDialog}
        onRecipeGenerated={handleRecipeGenerated}
      />

      <RecipeDetailDialog
        recipe={selectedRecipe}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
      />
    </DashboardLayout>
  );
};

export default Recipes;
