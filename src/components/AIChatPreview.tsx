import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, User, Send } from "lucide-react";

const messages = [
  {
    role: "user",
    content: "What's a healthy breakfast option for tomorrow?",
  },
  {
    role: "assistant",
    content: "Based on your profile, I'd recommend a protein-rich smoothie bowl! Try blending Greek yogurt with mixed berries, topped with granola and chia seeds. This gives you 25g protein and keeps you full until lunch. 🥣",
  },
  {
    role: "user",
    content: "That sounds great! Can you add it to my meal plan?",
  },
  {
    role: "assistant",
    content: "Done! I've added the Berry Protein Smoothie Bowl to tomorrow's breakfast. It's 380 calories and fits perfectly within your daily goals. Would you like recipe details? ✨",
  },
];

const AIChatPreview = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Chat Interface */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <Card className="shadow-strong border-border/50 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-hero p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-primary-foreground">NutriZen AI</div>
                  <div className="text-xs text-primary-foreground/80">Your wellness assistant</div>
                </div>
              </div>

              {/* Messages */}
              <CardContent className="p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto bg-gradient-card">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 animate-fade-in ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-card-foreground border border-border"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything about nutrition..."
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    disabled
                  />
                  <Button size="icon" variant="default" disabled>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-6 order-1 lg:order-2 animate-slide-in-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Bot className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm font-medium text-foreground">AI Assistant</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Your Personal
              <span className="block text-primary mt-2">Nutrition Expert</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Get instant answers, personalized meal suggestions, and expert guidance 24/7. 
              Our AI learns from your preferences and adapts to your unique wellness journey.
            </p>

            <ul className="space-y-3">
              {[
                "Instant nutritional advice and meal recommendations",
                "Personalized based on your goals and dietary needs",
                "Natural conversation, just like chatting with a friend",
                "Always learning and improving with each interaction",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" className="mt-4">
              Try the AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatPreview;
