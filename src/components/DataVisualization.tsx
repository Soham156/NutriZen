import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Apple, Flame, Droplets } from "lucide-react";

const DataVisualization = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Data-Driven Insights</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Track Your Progress
              <span className="block text-primary mt-2">Watch Yourself Grow</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Beautiful, intuitive visualizations that make understanding your nutrition simple. 
              See patterns, celebrate wins, and stay motivated with real-time insights.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">2,150</div>
                <div className="text-sm text-muted-foreground">Calories Today</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-accent">85%</div>
                <div className="text-sm text-muted-foreground">Weekly Goal</div>
              </div>
            </div>
          </div>

          {/* Right: Stats Cards */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Macros Card */}
            <Card className="shadow-medium border-border/50 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Apple className="w-5 h-5 text-primary" />
                  Daily Macros
                </CardTitle>
                <CardDescription>Your nutritional balance today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="font-medium">68g / 100g</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Carbs</span>
                    <span className="font-medium">180g / 250g</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fats</span>
                    <span className="font-medium">45g / 65g</span>
                  </div>
                  <Progress value={69} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-soft border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-highlight/10 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-highlight" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2,150</div>
                      <div className="text-xs text-muted-foreground">Calories</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2.1L</div>
                      <div className="text-xs text-muted-foreground">Water</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
