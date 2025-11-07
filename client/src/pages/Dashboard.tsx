import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Calendar,
  Droplets,
  Flame,
  Smile,
  Meh,
  Frown,
  Plus,
  TrendingUp,
  Apple,
  Coffee,
  Sandwich,
  Pizza,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mood, setMood] = useState<"happy" | "neutral" | "sad" | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addMealOpen, setAddMealOpen] = useState(false);
  const [mealForm, setMealForm] = useState({
    meal_type: 'breakfast',
    meal_name: '',
    calories: '',
    protein_g: '',
    carbs_g: '',
    fats_g: ''
  });

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch dashboard data');

      const data = await response.json();
      setDashboardData(data.data);
      setMood(data.data.currentMood);
    } catch (error) {
      console.error('Dashboard error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSaveMood = async () => {
    if (!mood) return;

    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/mood', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mood })
      });

      if (!response.ok) throw new Error('Failed to save mood');

      toast({
        title: "Success",
        description: "Mood logged successfully"
      });
      fetchDashboardData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save mood"
      });
    }
  };

  const handleLogWater = async () => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/water', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount_ml: 250 }) // One glass = 250ml
      });

      if (!response.ok) throw new Error('Failed to log water');

      toast({
        title: "Success",
        description: "Water logged successfully"
      });
      fetchDashboardData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log water"
      });
    }
  };

  const handleAddMeal = async () => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/dashboard/meal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...mealForm,
          calories: parseInt(mealForm.calories),
          protein_g: parseFloat(mealForm.protein_g) || 0,
          carbs_g: parseFloat(mealForm.carbs_g) || 0,
          fats_g: parseFloat(mealForm.fats_g) || 0
        })
      });

      if (!response.ok) throw new Error('Failed to add meal');

      toast({
        title: "Success",
        description: "Meal added successfully"
      });
      setAddMealOpen(false);
      setMealForm({
        meal_type: 'breakfast',
        meal_name: '',
        calories: '',
        protein_g: '',
        carbs_g: '',
        fats_g: ''
      });
      fetchDashboardData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add meal"
      });
    }
  };

  const handleDeleteMeal = async (mealId: number) => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/dashboard/meal/${mealId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete meal');

      toast({
        title: "Success",
        description: "Meal deleted successfully"
      });
      fetchDashboardData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete meal"
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const healthLog = dashboardData?.healthLog || {};
  const meals = dashboardData?.meals || [];
  const waterIntake = dashboardData?.waterIntake || 0;
  const streak = dashboardData?.streak || 0;
  const macros = dashboardData?.macros || { protein: 0, carbs: 0, fats: 0 };

  const caloriesPercent = (healthLog.calories_consumed / healthLog.calories_goal) * 100;
  const waterPercent = (waterIntake / healthLog.water_goal_ml) * 100;
  const waterGlasses = Math.floor(waterIntake / 250); // 250ml per glass

  const mealTypeIcons: Record<string, any> = {
    breakfast: Coffee,
    lunch: Sandwich,
    dinner: Pizza,
    snack: Apple
  };

  const todaysMeals = [
    {
      time: "Breakfast",
      meal: "Berry Protein Smoothie Bowl",
      calories: 380,
      icon: Coffee,
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&auto=format&fit=crop",
    },
    {
      time: "Lunch",
      meal: "Grilled Chicken Salad",
      calories: 450,
      icon: Sandwich,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&auto=format&fit=crop",
    },
    {
      time: "Dinner",
      meal: "Salmon with Quinoa",
      calories: 520,
      icon: Pizza,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&auto=format&fit=crop",
    },
  ];

  return (
    <DashboardLayout>
      <main className="container mx-auto px-4 md:px-6 pt-6 pb-16">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user?.fullName || 'there'}! 👋</h1>
          <p className="text-muted-foreground">Here's your wellness overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft border-border/50 animate-fade-in-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-highlight" />
                </div>
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{healthLog.calories_consumed || 0}</div>
                <div className="text-sm text-muted-foreground">of {healthLog.calories_goal || 2000} cal</div>
              </div>
              <Progress value={caloriesPercent || 0} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/50 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{(waterIntake / 1000).toFixed(1)}L</div>
                <div className="text-sm text-muted-foreground">of {(healthLog.water_goal_ml / 1000).toFixed(1)}L water</div>
              </div>
              <Progress value={waterPercent || 0} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/50 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Apple className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Meals</span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{meals.length}</div>
                <div className="text-sm text-muted-foreground">logged today</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/50 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Streak</span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{streak} days</div>
                <div className="text-sm text-muted-foreground">Keep it up!</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Meals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Meal Plan */}
            <Card className="shadow-medium border-border/50 animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Today's Meal Plan
                  </CardTitle>
                  <CardDescription>Your personalized nutrition schedule</CardDescription>
                </div>
                <Dialog open={addMealOpen} onOpenChange={setAddMealOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Meal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Meal</DialogTitle>
                      <DialogDescription>Log your meal with nutritional information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="meal_type">Meal Type</Label>
                        <Select
                          value={mealForm.meal_type}
                          onValueChange={(value) => setMealForm({ ...mealForm, meal_type: value })}
                        >
                          <SelectTrigger id="meal_type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                            <SelectItem value="snack">Snack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meal_name">Meal Name</Label>
                        <Input
                          id="meal_name"
                          value={mealForm.meal_name}
                          onChange={(e) => setMealForm({ ...mealForm, meal_name: e.target.value })}
                          placeholder="e.g., Chicken Salad"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="calories">Calories</Label>
                          <Input
                            id="calories"
                            type="number"
                            value={mealForm.calories}
                            onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })}
                            placeholder="500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="protein">Protein (g)</Label>
                          <Input
                            id="protein"
                            type="number"
                            value={mealForm.protein_g}
                            onChange={(e) => setMealForm({ ...mealForm, protein_g: e.target.value })}
                            placeholder="25"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="carbs">Carbs (g)</Label>
                          <Input
                            id="carbs"
                            type="number"
                            value={mealForm.carbs_g}
                            onChange={(e) => setMealForm({ ...mealForm, carbs_g: e.target.value })}
                            placeholder="45"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fats">Fats (g)</Label>
                          <Input
                            id="fats"
                            type="number"
                            value={mealForm.fats_g}
                            onChange={(e) => setMealForm({ ...mealForm, fats_g: e.target.value })}
                            placeholder="15"
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddMeal} className="w-full">Add Meal</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-4">
                {meals.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Apple className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No meals logged yet. Start by adding your first meal!</p>
                  </div>
                ) : (
                  meals.map((meal: any, index: number) => {
                    const MealIcon = mealTypeIcons[meal.meal_type] || Apple;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-card border border-border/50 hover:shadow-soft transition-shadow"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MealIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-muted-foreground capitalize">
                              {meal.meal_type}
                            </span>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">{meal.meal_name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {meal.calories} cal • P: {meal.protein_g}g • C: {meal.carbs_g}g • F: {meal.fats_g}g
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMeal(meal.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>

            {/* Macros */}
            <Card className="shadow-medium border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-primary" />
                  Daily Macros
                </CardTitle>
                <CardDescription>Nutritional balance today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="font-medium">{macros.protein.toFixed(1)}g / 100g</span>
                  </div>
                  <Progress value={(macros.protein / 100) * 100} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Carbs</span>
                    <span className="font-medium">{macros.carbs.toFixed(1)}g / 250g</span>
                  </div>
                  <Progress value={(macros.carbs / 250) * 100} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fats</span>
                    <span className="font-medium">{macros.fats.toFixed(1)}g / 65g</span>
                  </div>
                  <Progress value={(macros.fats / 65) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            {/* Mood Tracker */}
            <Card className="shadow-medium border-border/50 animate-slide-in-right">
              <CardHeader>
                <CardTitle>How are you feeling?</CardTitle>
                <CardDescription>Log your mood to track patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setMood("happy")}
                    className={`p-4 rounded-xl border-2 transition-all ${mood === "happy"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                      }`}
                  >
                    <Smile
                      className={`w-8 h-8 mx-auto mb-2 ${mood === "happy" ? "text-primary" : "text-muted-foreground"
                        }`}
                    />
                    <div className="text-xs font-medium text-center">Great</div>
                  </button>
                  <button
                    onClick={() => setMood("neutral")}
                    className={`p-4 rounded-xl border-2 transition-all ${mood === "neutral"
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50"
                      }`}
                  >
                    <Meh
                      className={`w-8 h-8 mx-auto mb-2 ${mood === "neutral" ? "text-accent" : "text-muted-foreground"
                        }`}
                    />
                    <div className="text-xs font-medium text-center">Okay</div>
                  </button>
                  <button
                    onClick={() => setMood("sad")}
                    className={`p-4 rounded-xl border-2 transition-all ${mood === "sad"
                      ? "border-highlight bg-highlight/10"
                      : "border-border hover:border-highlight/50"
                      }`}
                  >
                    <Frown
                      className={`w-8 h-8 mx-auto mb-2 ${mood === "sad" ? "text-highlight" : "text-muted-foreground"
                        }`}
                    />
                    <div className="text-xs font-medium text-center">Low</div>
                  </button>
                </div>
                {mood && (
                  <Button variant="default" className="w-full" onClick={handleSaveMood}>
                    Save Mood
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Hydration Tracker */}
            <Card className="shadow-medium border-border/50 animate-slide-in-right" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-accent" />
                  Hydration
                </CardTitle>
                <CardDescription>Track your daily water intake</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((glass) => (
                    <button
                      key={glass}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all ${glass <= waterGlasses
                          ? "border-accent bg-accent/20 hover:bg-accent/30"
                          : "border-border hover:border-accent/50"
                        }`}
                    >
                      <Droplets
                        className={`w-5 h-5 ${glass <= waterGlasses ? "text-accent" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
                <Button variant="outline" className="w-full" onClick={handleLogWater}>
                  <Plus className="w-4 h-4 mr-2" />
                  Log Water (250ml)
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-medium border-border/50 animate-slide-in-right" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Plan Tomorrow
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Apple className="w-4 h-4 mr-2" />
                  Browse Recipes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
