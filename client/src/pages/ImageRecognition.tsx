import { useState } from 'react';
import { Upload, Loader2, Camera, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardLayout from '@/components/DashboardLayout';

const API_URL = import.meta.env.VITE_API_URL || 'https://nutri-zen-server.vercel.app/api';

interface FoodItem {
    name: string;
    confidence: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
}

interface AnalysisResult {
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

interface Recipe {
    title: string;
    description: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: string;
    ingredients: Array<{ item: string; amount: string }>;
    instructions: Array<{ step: number; instruction: string }>;
    nutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
        fiber: number;
    };
    tags: string[];
    dietaryType: string;
    cuisineType: string;
    healthBenefits: string[];
    matchPercentage: number;
}

export default function ImageRecognition() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setError('Image size must be less than 10MB');
                return;
            }

            setSelectedImage(file);
            setError(null);
            setAnalysisResult(null);
            setSimilarRecipes([]);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
            if (!token) {
                setError('Please login to use this feature');
                return;
            }

            const response = await fetch(`${API_URL}/image-recognition/analyze`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to analyze image');
            }

            const data = await response.json();
            console.log('Analysis response:', data); // Debug log
            setAnalysisResult(data.data);

            // Get similar recipes
            if (data.data && data.data.ingredients && data.data.ingredients.length > 0) {
                const recipesResponse = await fetch(`${API_URL}/image-recognition/similar-recipes`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ingredients: data.data.ingredients }),
                });

                if (recipesResponse.ok) {
                    const recipesData = await recipesResponse.json();
                    console.log('Recipes response:', recipesData); // Debug log
                    setSimilarRecipes(recipesData.data?.recipes || []);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to analyze image');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Camera className="h-8 w-8 text-primary" />
                    <div>
                        <h1 className="text-3xl font-bold">Food Image Recognition</h1>
                        <p className="text-muted-foreground">
                            Upload a photo of your meal to get nutrition info and recipe suggestions
                        </p>
                    </div>
                </div>

                {/* Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Food Image</CardTitle>
                        <CardDescription>
                            Take a photo or upload an image of your food to analyze its nutritional content
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Image Preview */}
                        {imagePreview ? (
                            <div className="relative w-full max-w-2xl mx-auto">
                                <img
                                    src={imagePreview}
                                    alt="Food preview"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => {
                                        setSelectedImage(null);
                                        setImagePreview(null);
                                        setAnalysisResult(null);
                                        setSimilarRecipes([]);
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors">
                                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <div className="space-y-2">
                                    <p className="text-lg font-medium">Drop your image here or click to browse</p>
                                    <p className="text-sm text-muted-foreground">Supports: JPG, PNG, WebP (max 10MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Analyze Button */}
                        {selectedImage && (
                            <div className="flex justify-center">
                                <Button
                                    size="lg"
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className="min-w-[200px]"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Camera className="mr-2 h-4 w-4" />
                                            Analyze Image
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Analysis Results */}
                {analysisResult && (
                    <>
                        {/* Foods Identified */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Foods Identified</CardTitle>
                                <CardDescription>
                                    {analysisResult.portionEstimate} • {analysisResult.cuisineType} • {analysisResult.mealType}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-3">
                                    {analysisResult.foodItems.map((food, index) => (
                                        <Badge key={index} variant="secondary" className="text-base px-4 py-2">
                                            {food}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Total Nutrition */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Nutritional Information</CardTitle>
                                <CardDescription>{analysisResult.nutrition.servingSize}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                                        <div className="text-3xl font-bold text-primary">
                                            {analysisResult.nutrition.calories}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Calories</div>
                                    </div>
                                    <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                                        <div className="text-3xl font-bold text-blue-600">
                                            {analysisResult.nutrition.protein}g
                                        </div>
                                        <div className="text-sm text-muted-foreground">Protein</div>
                                    </div>
                                    <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                                        <div className="text-3xl font-bold text-yellow-600">
                                            {analysisResult.nutrition.carbs}g
                                        </div>
                                        <div className="text-sm text-muted-foreground">Carbs</div>
                                    </div>
                                    <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                                        <div className="text-3xl font-bold text-orange-600">
                                            {analysisResult.nutrition.fats}g
                                        </div>
                                        <div className="text-sm text-muted-foreground">Fats</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                                        <div className="text-3xl font-bold text-green-600">
                                            {analysisResult.nutrition.fiber}g
                                        </div>
                                        <div className="text-sm text-muted-foreground">Fiber</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ingredients */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Identified Ingredients</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {analysisResult.ingredients.map((ingredient, index) => (
                                        <Badge key={index} variant="secondary" className="text-sm">
                                            {ingredient}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Health Benefits & Dietary Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Health Benefits</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {analysisResult.healthBenefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <span className="text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Dietary Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {analysisResult.dietaryInfo.map((info, index) => (
                                            <Badge key={index} variant="outline">
                                                {info}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Similar Recipes */}
                        {similarRecipes.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Utensils className="h-5 w-5" />
                                        Similar Recipes You Might Like
                                    </CardTitle>
                                    <CardDescription>
                                        Based on the ingredients identified in your food
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {similarRecipes.map((recipe, index) => (
                                            <div key={index} className="border rounded-lg p-4 space-y-3">
                                                <div className="space-y-1">
                                                    <h3 className="font-semibold text-lg">{recipe.title}</h3>
                                                    <p className="text-xs text-muted-foreground">{recipe.description}</p>
                                                </div>
                                                <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
                                                    <Badge variant="outline">{recipe.difficulty}</Badge>
                                                    <span>⏱️ {recipe.prepTime}min</span>
                                                    <span>🍳 {recipe.cookTime}min</span>
                                                    <span>🍽️ {recipe.servings}</span>
                                                    <Badge variant="secondary">{recipe.matchPercentage}% match</Badge>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium">Ingredients:</p>
                                                    <ul className="text-sm text-muted-foreground space-y-1">
                                                        {recipe.ingredients.slice(0, 5).map((ing, idx) => (
                                                            <li key={idx} className="line-clamp-1">
                                                                • {ing.amount} {ing.item}
                                                            </li>
                                                        ))}
                                                        {recipe.ingredients.length > 5 && (
                                                            <li className="text-xs italic">
                                                                +{recipe.ingredients.length - 5} more
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-xs text-center pt-2 border-t">
                                                    <div>
                                                        <div className="font-semibold">{recipe.nutrition.calories}</div>
                                                        <div className="text-muted-foreground">cal</div>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{recipe.nutrition.protein}g</div>
                                                        <div className="text-muted-foreground">protein</div>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{recipe.nutrition.fiber}g</div>
                                                        <div className="text-muted-foreground">fiber</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {recipe.tags.slice(0, 3).map((tag, idx) => (
                                                        <Badge key={idx} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
