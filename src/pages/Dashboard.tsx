import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
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
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [mood, setMood] = useState<"happy" | "neutral" | "sad" | null>(null);

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
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
                <div className="text-2xl font-bold">1,350</div>
                <div className="text-sm text-muted-foreground">of 2,000 cal</div>
              </div>
              <Progress value={67.5} className="h-2 mt-3" />
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
                <div className="text-2xl font-bold">1.8L</div>
                <div className="text-sm text-muted-foreground">of 2.5L water</div>
              </div>
              <Progress value={72} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/50 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Apple className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">This Week</span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground">Goal adherence</div>
              </div>
              <Progress value={85} className="h-2 mt-3" />
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
                <div className="text-2xl font-bold">12 days</div>
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
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Meal
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysMeals.map((meal, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-card border border-border/50 hover:shadow-soft transition-shadow"
                  >
                    <img
                      src={meal.image}
                      alt={meal.meal}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <meal.icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">{meal.time}</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{meal.meal}</h4>
                      <p className="text-sm text-muted-foreground">{meal.calories} calories</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
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
                    <span className="font-medium">68g / 100g</span>
                  </div>
                  <Progress value={68} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Carbs</span>
                    <span className="font-medium">145g / 250g</span>
                  </div>
                  <Progress value={58} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fats</span>
                    <span className="font-medium">32g / 65g</span>
                  </div>
                  <Progress value={49} className="h-3" />
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
                    className={`p-4 rounded-xl border-2 transition-all ${
                      mood === "happy"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Smile
                      className={`w-8 h-8 mx-auto mb-2 ${
                        mood === "happy" ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <div className="text-xs font-medium text-center">Great</div>
                  </button>
                  <button
                    onClick={() => setMood("neutral")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      mood === "neutral"
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <Meh
                      className={`w-8 h-8 mx-auto mb-2 ${
                        mood === "neutral" ? "text-accent" : "text-muted-foreground"
                      }`}
                    />
                    <div className="text-xs font-medium text-center">Okay</div>
                  </button>
                  <button
                    onClick={() => setMood("sad")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      mood === "sad"
                        ? "border-highlight bg-highlight/10"
                        : "border-border hover:border-highlight/50"
                    }`}
                  >
                    <Frown
                      className={`w-8 h-8 mx-auto mb-2 ${
                        mood === "sad" ? "text-highlight" : "text-muted-foreground"
                      }`}
                    />
                    <div className="text-xs font-medium text-center">Low</div>
                  </button>
                </div>
                {mood && (
                  <Button variant="default" className="w-full">
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
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all ${
                        glass <= 7
                          ? "border-accent bg-accent/20 hover:bg-accent/30"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <Droplets
                        className={`w-5 h-5 ${glass <= 7 ? "text-accent" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Water
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
    </div>
  );
};

export default Dashboard;
