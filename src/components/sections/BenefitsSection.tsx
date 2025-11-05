import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "Zap",
      title: "Start Earning Today",
      description: "Register in the morning — start working in the evening"
    },
    {
      icon: "UserCheck",
      title: "Easy Registration",
      description: "Minimum documents, quick verification in 2 hours"
    },
    {
      icon: "Car",
      title: "Car Rental Available",
      description: "We provide quality vehicles at competitive rates"
    },
    {
      icon: "TrendingUp",
      title: "High Income",
      description: "Earn up to ₹50,000 per month"
    },
    {
      icon: "Clock",
      title: "Flexible Schedule",
      description: "Work whenever it suits you"
    },
    {
      icon: "Shield",
      title: "Full Support",
      description: "24/7 driver support service"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-4 text-secondary">
          Why Join WroomTaxi?
        </h3>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Start earning with India's fastest growing taxi service
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-xl transition-all border-primary/10 hover:border-primary/30">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name={benefit.icon as any} size={32} className="text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-secondary">{benefit.title}</h4>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            Submit your application and our operator will contact you within 2 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
