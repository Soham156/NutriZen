import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-16 shadow-strong">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight">
              Start Your Transformation Today
            </h2>

            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
              Join thousands who've already transformed their health with NutriZen's AI-powered platform.
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-primary-foreground/90 text-sm">
              {["Free 14-day trial", "No credit card required", "Cancel anytime"].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0 group shadow-medium"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
              >
                Book a Demo
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/70 pt-4">
              🎉 Special offer: First 100 users get lifetime 50% discount
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
