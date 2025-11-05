import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useRef } from "react";

const CarsSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const cars = [
    { name: "Tata Indica / Indica Vista", image: "https://cdn.poehali.dev/files/a63e29d0-2503-4883-b7c8-9be376401167.png" },
    { name: "Maruti Suzuki Alto 800", image: "https://cdn.poehali.dev/files/7ca5a0ab-f576-40ed-bbc5-00850aaf22c2.png" },
    { name: "Hyundai Santro", image: "https://cdn.poehali.dev/files/fa0174ba-2a1f-4d1e-8ed1-037aaa82abb8.png" },
    { name: "Tata Tiago", image: "https://cdn.poehali.dev/files/f5e2156b-a68a-4314-bac9-66f8f8379893.png" },
    { name: "Maruti Suzire", image: "https://cdn.poehali.dev/files/7b1565b0-ee78-40a2-93bc-2ec234828f24.png" },
    { name: "Maruti Ertiga", image: "https://cdn.poehali.dev/files/da831f52-7170-46fc-88fb-b211c8c2b6ef.png" },
    { name: "Hyundai Aura", image: "https://cdn.poehali.dev/files/85d087ba-1ee3-4bf0-a8de-f802972b812a.png" },
    { name: "Toyota Innova Crysta", image: "https://cdn.poehali.dev/files/20658303-d323-4123-af52-f3f044ab4de5.png" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-4 text-secondary">
          Available for Rent
        </h3>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Choose a vehicle that suits your preferences
        </p>
        <div className="relative px-12">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary hover:text-white shadow-lg"
            onClick={() => scrollCarousel('left')}
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {cars.map((car, index) => (
              <Card key={index} className="min-w-[300px] snap-center hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <p className="font-semibold text-center text-secondary">{car.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary hover:text-white shadow-lg"
            onClick={() => scrollCarousel('right')}
          >
            <Icon name="ChevronRight" size={24} />
          </Button>
        </div>
        <div className="mt-16 text-center">
          <div className="bg-primary/20 border-4 border-primary rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl font-extrabold text-secondary">
              If you don't have a car and can't rent one, our company will provide you a vehicle to work with FOR FREE!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
