import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Activity, Heart, Brain, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const moodVsFoodData = [
  { day: "Mon", mood: 7, calories: 1850, protein: 95 },
  { day: "Tue", mood: 8, calories: 2100, protein: 110 },
  { day: "Wed", mood: 6, calories: 1700, protein: 85 },
  { day: "Thu", mood: 9, calories: 2000, protein: 105 },
  { day: "Fri", mood: 8, calories: 1950, protein: 98 },
  { day: "Sat", mood: 7, calories: 2200, protein: 115 },
  { day: "Sun", mood: 9, calories: 1900, protein: 100 },
];

const macroTrendsData = [
  { week: "Week 1", protein: 85, carbs: 220, fats: 55 },
  { week: "Week 2", protein: 92, carbs: 210, fats: 58 },
  { week: "Week 3", protein: 88, carbs: 230, fats: 62 },
  { week: "Week 4", protein: 95, carbs: 215, fats: 60 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Wellness Analytics</h1>
          <p className="text-muted-foreground">Discover patterns and insights about your nutrition journey</p>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-medium border-border/50 bg-gradient-card animate-fade-in-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">+15%</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">8.2/10</h3>
              <p className="text-sm text-muted-foreground">Average Mood Score</p>
              <p className="text-xs text-muted-foreground mt-2">↑ Improved from last week</p>
            </CardContent>
          </Card>

          <Card className="shadow-medium border-border/50 bg-gradient-card animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm font-medium text-accent">Stable</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">1,950</h3>
              <p className="text-sm text-muted-foreground">Avg Daily Calories</p>
              <p className="text-xs text-muted-foreground mt-2">Within target range</p>
            </CardContent>
          </Card>

          <Card className="shadow-medium border-border/50 bg-gradient-card animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-highlight" />
                </div>
                <span className="text-sm font-medium text-highlight">Strong</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">92%</h3>
              <p className="text-sm text-muted-foreground">Correlation Score</p>
              <p className="text-xs text-muted-foreground mt-2">Food impacts mood positively</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="mood" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="mood">
              <Brain className="w-4 h-4 mr-2" />
              Mood Analysis
            </TabsTrigger>
            <TabsTrigger value="macros">
              <Activity className="w-4 h-4 mr-2" />
              Macro Trends
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-6">
            {/* Mood vs Calories Chart */}
            <Card className="shadow-medium border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Mood vs. Nutrition Correlation
                </CardTitle>
                <CardDescription>
                  Discover how your diet affects your emotional well-being
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={moodVsFoodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="mood"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      name="Mood Score"
                      dot={{ fill: "hsl(var(--primary))", r: 5 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="calories"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      name="Calories"
                      dot={{ fill: "hsl(var(--accent))", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Insights Card */}
            <Card className="shadow-medium border-border/50 bg-gradient-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">High Protein = Better Mood</h4>
                      <p className="text-sm text-muted-foreground">
                        Your mood scores are 23% higher on days when you consume 100g+ of protein.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Activity className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Consistent Timing Works</h4>
                      <p className="text-sm text-muted-foreground">
                        Eating meals at regular times correlates with more stable mood throughout the day.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="macros" className="space-y-6">
            <Card className="shadow-medium border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle>Monthly Macro Trends</CardTitle>
                <CardDescription>Your nutritional balance over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={macroTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="protein" fill="hsl(var(--primary))" name="Protein (g)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="carbs" fill="hsl(var(--accent))" name="Carbs (g)" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="fats" fill="hsl(var(--highlight))" name="Fats (g)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="shadow-medium border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle>Weekly Snapshot</CardTitle>
                <CardDescription>Your nutrition adherence this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                    const score = [95, 88, 78, 92, 90, 85, 98][index];
                    const color =
                      score >= 90 ? "bg-primary" : score >= 80 ? "bg-accent" : "bg-muted";
                    return (
                      <div key={day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-2">{day}</div>
                        <div
                          className={`aspect-square rounded-lg ${color} flex items-center justify-center text-sm font-bold ${
                            score >= 80 ? "text-primary-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {score}%
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary" />
                    <span className="text-muted-foreground">Excellent (90%+)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-accent" />
                    <span className="text-muted-foreground">Good (80-89%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted" />
                    <span className="text-muted-foreground">Needs Work (&lt;80%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
