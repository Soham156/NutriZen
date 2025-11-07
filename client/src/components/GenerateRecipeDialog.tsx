import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Loader2, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface GenerateRecipeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRecipeGenerated: (recipe: any) => void;
}

const recipeTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Dessert",
    "Appetizer",
    "Salad",
    "Soup",
    "Smoothie",
    "Any",
];

const commonAllergies = [
    "Peanuts",
    "Tree Nuts",
    "Milk/Dairy",
    "Eggs",
    "Soy",
    "Wheat/Gluten",
    "Fish",
    "Shellfish",
    "Sesame",
];

const healthConditions = [
    "High Blood Pressure",
    "High Cholesterol",
    "Diabetes",
    "Heart Disease",
    "PCOS",
    "Thyroid Issues",
    "Acid Reflux",
    "IBS",
    "Obesity",
    "Anemia",
];

const dietaryPreferences = [
    "Vegetarian",
    "Vegan",
    "Keto",
    "Paleo",
    "Low Carb",
    "High Protein",
    "Gluten Free",
    "Dairy Free",
    "Mediterranean",
    "None",
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function GenerateRecipeDialog({ open, onOpenChange, onRecipeGenerated }: GenerateRecipeDialogProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form state
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [recipeType, setRecipeType] = useState("Any");
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
    const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>([]);
    const [selectedDietaryPrefs, setSelectedDietaryPrefs] = useState<string[]>([]);
    const [servings, setServings] = useState(2);
    const [maxCookTime, setMaxCookTime] = useState("");

    const handleAddIngredient = () => {
        if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient("");
        }
    };

    const handleRemoveIngredient = (ingredient: string) => {
        setIngredients(ingredients.filter((i) => i !== ingredient));
    };

    const toggleAllergy = (allergy: string) => {
        setSelectedAllergies((prev) =>
            prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
        );
    };

    const toggleHealthCondition = (condition: string) => {
        setSelectedHealthConditions((prev) =>
            prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition]
        );
    };

    const toggleDietaryPref = (pref: string) => {
        setSelectedDietaryPrefs((prev) =>
            prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
        );
    };

    const handleGenerateRecipe = async () => {
        setLoading(true);
        setError("");

        try {
            // Check for token in localStorage (stored as 'accessToken' by authService)
            const token = localStorage.getItem('accessToken') || localStorage.getItem('token');

            if (!token) {
                setError('Please login to generate recipes');
                return;
            }

            const response = await fetch(`${API_URL}/recipes/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ingredients: ingredients.length > 0 ? ingredients : undefined,
                    recipeType: recipeType !== "Any" ? recipeType : undefined,
                    allergies: selectedAllergies,
                    healthConditions: selectedHealthConditions,
                    dietaryPreferences: selectedDietaryPrefs,
                    servings,
                    maxCookTime: maxCookTime ? parseInt(maxCookTime) : undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // If token is invalid, clear it and ask user to login
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('accessToken');
                    setError('Your session has expired. Please logout and login again.');
                    return;
                }
                throw new Error(data.error || 'Failed to generate recipe');
            }

            onRecipeGenerated(data.data);
            handleClose();
        } catch (err: any) {
            console.error('Recipe generation error:', err);
            setError(err.message || 'Failed to generate recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setIngredients([]);
        setCurrentIngredient("");
        setRecipeType("Any");
        setSelectedAllergies([]);
        setSelectedHealthConditions([]);
        setSelectedDietaryPrefs([]);
        setServings(2);
        setMaxCookTime("");
        setError("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Sparkles className="w-6 h-6 text-primary" />
                        Generate AI Recipe
                    </DialogTitle>
                    <DialogDescription>
                        Let AI create a personalized healthy recipe based on your preferences and health needs
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`w-12 h-1 mx-1 ${step > s ? "bg-primary" : "bg-muted"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Ingredients & Type */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="space-y-3">
                                <Label htmlFor="ingredients">Available Ingredients (Optional)</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="ingredients"
                                        placeholder="e.g., chicken, broccoli, rice"
                                        value={currentIngredient}
                                        onChange={(e) => setCurrentIngredient(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleAddIngredient()}
                                    />
                                    <Button type="button" onClick={handleAddIngredient} size="icon">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                {ingredients.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {ingredients.map((ingredient) => (
                                            <Badge key={ingredient} variant="secondary" className="gap-1 px-3 py-1">
                                                {ingredient}
                                                <button
                                                    onClick={() => handleRemoveIngredient(ingredient)}
                                                    className="ml-1 hover:text-destructive"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="recipe-type">Recipe Type</Label>
                                <Select value={recipeType} onValueChange={setRecipeType}>
                                    <SelectTrigger id="recipe-type">
                                        <SelectValue placeholder="Select recipe type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {recipeTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <Label htmlFor="servings">Servings</Label>
                                    <Input
                                        id="servings"
                                        type="number"
                                        min="1"
                                        max="12"
                                        value={servings}
                                        onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="cook-time">Max Cook Time (minutes)</Label>
                                    <Input
                                        id="cook-time"
                                        type="number"
                                        placeholder="Optional"
                                        value={maxCookTime}
                                        onChange={(e) => setMaxCookTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Allergies & Health */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="space-y-3">
                                <Label>Allergies & Food Intolerances</Label>
                                <p className="text-sm text-muted-foreground">
                                    Select any allergies or foods you need to avoid
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {commonAllergies.map((allergy) => (
                                        <div key={allergy} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`allergy-${allergy}`}
                                                checked={selectedAllergies.includes(allergy)}
                                                onCheckedChange={() => toggleAllergy(allergy)}
                                            />
                                            <label
                                                htmlFor={`allergy-${allergy}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {allergy}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label>Health Conditions</Label>
                                <p className="text-sm text-muted-foreground">
                                    Help us create recipes suitable for your health needs
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {healthConditions.map((condition) => (
                                        <div key={condition} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`condition-${condition}`}
                                                checked={selectedHealthConditions.includes(condition)}
                                                onCheckedChange={() => toggleHealthCondition(condition)}
                                            />
                                            <label
                                                htmlFor={`condition-${condition}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {condition}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Dietary Preferences */}
                    {step === 3 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="space-y-3">
                                <Label>Dietary Preferences</Label>
                                <p className="text-sm text-muted-foreground">
                                    Select your dietary preferences (optional)
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {dietaryPreferences.map((pref) => (
                                        <div key={pref} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`pref-${pref}`}
                                                checked={selectedDietaryPrefs.includes(pref)}
                                                onCheckedChange={() => toggleDietaryPref(pref)}
                                            />
                                            <label
                                                htmlFor={`pref-${pref}`}
                                                className="text-sm cursor-pointer"
                                            >
                                                {pref}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={() => (step > 1 ? setStep(step - 1) : handleClose())}
                            disabled={loading}
                        >
                            {step === 1 ? "Cancel" : "Back"}
                        </Button>

                        {step < 3 ? (
                            <Button onClick={() => setStep(step + 1)}>
                                Next
                            </Button>
                        ) : (
                            <Button
                                onClick={handleGenerateRecipe}
                                disabled={loading}
                                className="gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Generate Recipe
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
