import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const StatsSection = () => {
  const stats = [
    { value: "5,000+", label: "Active Drivers", icon: "Users" },
    { value: "250,000+", label: "Happy Customers", icon: "Heart" },
    { value: "8+", label: "Years in Business", icon: "Calendar" },
    { value: "15", label: "Indian Cities", icon: "MapPin" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-primary/20 hover:border-primary transition-colors hover:shadow-lg">
              <CardContent className="pt-6">
                <Icon name={stat.icon as any} size={40} className="mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold text-secondary mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
