import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Utensils, LineChart, MessageSquare, Calendar, Heart } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Meal Planning",
    description: "Get personalized meal plans based on your preferences, dietary needs, and health goals.",
  },
  {
    icon: Utensils,
    title: "Smart Nutrition Tracking",
    description: "Effortlessly track your meals with AI-powered food recognition and detailed nutritional insights.",
  },
  {
    icon: LineChart,
    title: "Progress Analytics",
    description: "Visualize your health journey with beautiful, actionable data and trend analysis.",
  },
  {
    icon: MessageSquare,
    title: "AI Wellness Coach",
    description: "24/7 access to your personal AI nutrition assistant for guidance and support.",
  },
  {
    icon: Calendar,
    title: "Meal Scheduling",
    description: "Plan ahead with intelligent meal scheduling that fits your lifestyle and routine.",
  },
  {
    icon: Heart,
    title: "Holistic Wellness",
    description: "Beyond nutrition - integrate fitness, sleep, and mindfulness into your wellness plan.",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Everything You Need to
            <span className="block text-primary mt-2">Thrive & Flourish</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powered by advanced AI, designed for real people with real goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-medium transition-all duration-300 border-border/50 bg-gradient-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
