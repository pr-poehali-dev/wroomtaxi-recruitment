import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-secondary via-accent to-secondary py-20 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Become a <span className="text-primary">WroomTaxi</span> Driver
            </h2>
            <p className="text-xl text-white/90">
              Earn up to ₹50,000 per month with flexible working hours. 
              Start today!
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-secondary text-lg px-8 py-6"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply Now
              <Icon name="ArrowRight" className="ml-2" size={24} />
            </Button>
          </div>
          <div className="relative">
            <img 
              src="https://cdn.poehali.dev/files/3b00b4e2-f2b6-4e65-8d07-b46a2db9e21f.png" 
              alt="Happy Taxi Driver" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
