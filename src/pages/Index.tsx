import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DataVisualization from "@/components/DataVisualization";
import AIChatPreview from "@/components/AIChatPreview";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <DataVisualization />
      <AIChatPreview />
      <CTA />
    </div>
  );
};

export default Index;
