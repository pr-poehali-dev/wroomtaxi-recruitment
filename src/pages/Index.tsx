import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import CarsSection from "@/components/sections/CarsSection";
import ApplicationForm from "@/components/sections/ApplicationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <Header />
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <CarsSection />
      <ApplicationForm />
    </div>
  );
};

export default Index;
