import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icon from "@/components/ui/icon";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    age: "",
    hasOwnCar: "no",
    document: null as File | null
  });

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application submitted!",
      description: "We will contact you shortly.",
    });
  };

  const stats = [
    { value: "5,000+", label: "Active Drivers", icon: "Users" },
    { value: "250,000+", label: "Happy Customers", icon: "Heart" },
    { value: "8+", label: "Years in Business", icon: "Calendar" },
    { value: "15", label: "Indian Cities", icon: "MapPin" }
  ];

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

  const cars = [
    { name: "Tata Indica / Indica Vista", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Maruti Suzuki Alto 800 / Wagon R", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Hyundai Santro / Eon", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Tata Tiago / Maruti Celerio", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Maruti Suzuki Dzire", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Toyota Etios / Etios Liva", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Honda Amaze", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Hyundai Aura / Xcent", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Maruti Ertiga", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" },
    { name: "Toyota Innova Crysta", image: "https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d4a9671c-de2d-49ea-a299-06d0cfa814f4.jpg" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/d78e8a34-6124-484e-b3af-64bc10ae9a2d.jpg" 
              alt="WroomTaxi Logo" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <h1 className="text-3xl font-bold text-secondary">
              Wroom<span className="text-primary">Taxi</span>
            </h1>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-secondary">
            <Icon name="Phone" className="mr-2" size={20} />
            Call Us
          </Button>
        </div>
      </header>

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
                src="https://cdn.poehali.dev/files/b8297ea4-49ab-497a-9fe5-098dd4fa6ea2.png" 
                alt="Happy Driver" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-primary/20 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <Icon name={stat.icon as any} className="mx-auto mb-4 text-primary" size={40} />
                  <p className="text-4xl font-bold text-secondary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-4 text-secondary">
            Why Choose <span className="text-primary">WroomTaxi</span>?
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Best conditions for drivers in India
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={benefit.icon as any} className="text-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-secondary">{benefit.title}</h4>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
        </div>
      </section>

      <section id="application-form" className="py-20 bg-gradient-to-b from-muted to-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-2xl border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-3xl font-bold text-center mb-2 text-secondary">
                Driver Application Form
              </h3>
              <p className="text-center text-muted-foreground mb-8">
                Fill out the form and we will contact you within 2 hours
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input 
                    id="middleName" 
                    value={formData.middleName}
                    onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 " 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input 
                      id="age" 
                      type="number" 
                      min="18" 
                      max="65" 
                      required 
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="document">Passport Scan *</Label>
                  <Input 
                    id="document" 
                    type="file" 
                    accept="image/*,.pdf" 
                    required 
                    onChange={(e) => setFormData({...formData, document: e.target.files?.[0] || null})}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <Label>Do you have your own car? *</Label>
                  <RadioGroup 
                    value={formData.hasOwnCar} 
                    onValueChange={(value) => setFormData({...formData, hasOwnCar: value})}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-secondary text-lg py-6">
                  Submit Application
                  <Icon name="Send" className="ml-2" size={20} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-primary">WroomTaxi</h4>
              <p className="text-white/80">
                Leading taxi company in India since 2016
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Contact</h5>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +91 98765 43210
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@wroomtaxi.in
                </p>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4">Office</h5>
              <p className="text-white/80">
                123, MG Road<br />
                Mumbai, Maharashtra<br />
                400001, India
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Operating Cities</h5>
              <div className="text-white/80 space-y-1">
                <p>Mumbai • Delhi • Bangalore</p>
                <p>Chennai • Hyderabad • Pune</p>
                <p>Kolkata • Ahmedabad • Jaipur</p>
                <p>Lucknow • Surat • Chandigarh</p>
                <p>Indore • Kochi • Goa</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 WroomTaxi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;