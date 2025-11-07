import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Clock,
    Users,
    Flame,
    ChefHat,
    Heart,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    TrendingUp
} from "lucide-react";

interface RecipeDetailDialogProps {
    recipe: {
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
        is_ai_generated: boolean;
    } | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RecipeDetailDialog({ recipe, open, onOpenChange }: RecipeDetailDialogProps) {
    if (!recipe) return null;

    const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'text-green-600 dark:text-green-400';
            case 'medium': return 'text-yellow-600 dark:text-yellow-400';
            case 'hard': return 'text-red-600 dark:text-red-400';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                <ScrollArea className="h-[90vh]">
                    {/* Hero Image */}
                    <div className="relative w-full h-64 md:h-80 overflow-hidden">
                        <img
                            src={recipe.image_url}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <DialogHeader>
                                <DialogTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {recipe.title}
                                </DialogTitle>
                            </DialogHeader>
                            <p className="text-sm md:text-base text-white/90">
                                {recipe.description}
                            </p>
                            {recipe.is_ai_generated && (
                                <Badge className="mt-2 bg-primary/90 backdrop-blur-sm gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    AI Generated
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                <Clock className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Total Time</p>
                                    <p className="font-semibold">{totalTime} min</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                <Users className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Servings</p>
                                    <p className="font-semibold">{recipe.servings}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                <Flame className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Calories</p>
                                    <p className="font-semibold">{recipe.calories} cal</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                <ChefHat className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Difficulty</p>
                                    <p className={`font-semibold capitalize ${getDifficultyColor(recipe.difficulty)}`}>
                                        {recipe.difficulty}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Nutrition Facts */}
                        <div className="bg-gradient-card p-5 rounded-lg border border-border">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Nutrition Facts (per serving)
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{recipe.protein}g</div>
                                    <div className="text-xs text-muted-foreground">Protein</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{recipe.carbs}g</div>
                                    <div className="text-xs text-muted-foreground">Carbs</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{recipe.fats}g</div>
                                    <div className="text-xs text-muted-foreground">Fats</div>
                                </div>
                                {recipe.fiber && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">{recipe.fiber}g</div>
                                        <div className="text-xs text-muted-foreground">Fiber</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags & Dietary Info */}
                        <div className="flex flex-wrap gap-2">
                            {recipe.dietary_type && (
                                <Badge variant="default" className="gap-1">
                                    <Heart className="w-3 h-3" />
                                    {recipe.dietary_type}
                                </Badge>
                            )}
                            {recipe.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Health Benefits */}
                        {recipe.health_benefits && recipe.health_benefits.length > 0 && (
                            <div className="bg-green-50 dark:bg-green-950/20 p-5 rounded-lg border border-green-200 dark:border-green-900">
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Health Benefits
                                </h3>
                                <ul className="space-y-2">
                                    {recipe.health_benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300">
                                            <span className="text-green-500 mt-0.5">✓</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Allergens Warning */}
                        {recipe.allergens && recipe.allergens.length > 0 && (
                            <div className="bg-orange-50 dark:bg-orange-950/20 p-5 rounded-lg border border-orange-200 dark:border-orange-900">
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-orange-700 dark:text-orange-400">
                                    <AlertCircle className="w-5 h-5" />
                                    Contains Allergens
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {recipe.allergens.map((allergen, index) => (
                                        <Badge key={index} variant="destructive">
                                            {allergen}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Separator />

                        {/* Ingredients */}
                        <div>
                            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                                <ChefHat className="w-5 h-5 text-primary" />
                                Ingredients
                            </h3>
                            <div className="space-y-3">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-semibold text-primary">{index + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-medium">{ingredient.amount}</span>
                                                <span className="text-muted-foreground">{ingredient.item}</span>
                                            </div>
                                            {ingredient.notes && (
                                                <p className="text-xs text-muted-foreground mt-1 italic">{ingredient.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Instructions */}
                        <div>
                            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                Instructions
                            </h3>
                            <div className="space-y-4">
                                {recipe.instructions.map((instruction, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 bg-gradient-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-bold text-primary-foreground">{instruction.step}</span>
                                        </div>
                                        <p className="flex-1 text-sm leading-relaxed pt-1">
                                            {instruction.instruction}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" className="flex-1">
                                <Heart className="w-4 h-4 mr-2" />
                                Save Recipe
                            </Button>
                            <Button variant="hero" className="flex-1">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Start Cooking
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
