import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DataVisualization from "@/components/DataVisualization";
import AIChatPreview from "@/components/AIChatPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <DataVisualization />
      <AIChatPreview />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
