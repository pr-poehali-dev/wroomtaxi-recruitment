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
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
  };

  const stats = [
    { value: "5,000+", label: "Активных водителей", icon: "Users" },
    { value: "250,000+", label: "Довольных клиентов", icon: "Heart" },
    { value: "8+", label: "Лет на рынке", icon: "Calendar" },
    { value: "15", label: "Городов Индии", icon: "MapPin" }
  ];

  const benefits = [
    {
      icon: "Zap",
      title: "Начните зарабатывать сегодня",
      description: "Зарегистрируйтесь утром — начните работать вечером"
    },
    {
      icon: "UserCheck",
      title: "Легкое трудоустройство",
      description: "Минимум документов, быстрая проверка за 2 часа"
    },
    {
      icon: "Car",
      title: "Аренда автомобиля",
      description: "Мы предоставляем качественные автомобили по выгодным тарифам"
    },
    {
      icon: "TrendingUp",
      title: "Высокий доход",
      description: "Зарабатывайте до ₹50,000 в месяц"
    },
    {
      icon: "Clock",
      title: "Гибкий график",
      description: "Работайте когда вам удобно"
    },
    {
      icon: "Shield",
      title: "Полная поддержка",
      description: "24/7 служба поддержки водителей"
    }
  ];

  const cars = [
    { name: "Tata Indica / Indica Vista", image: "https://cdn.poehali.dev/files/a63e29d0-2503-4883-b7c8-9be376401167.png" },
    { name: "Maruti Suzuki Alto 800", image: "https://cdn.poehali.dev/files/7ca5a0ab-f576-40ed-bbc5-00850aaf22c2.png" },
    { name: "Hyundai Santro", image: "https://cdn.poehali.dev/files/fa0174ba-2a1f-4d1e-8ed1-037aaa82abb8.png" },
    { name: "Tata Tiago", image: "https://cdn.poehali.dev/files/f5e2156b-a68a-4314-bac9-66f8f8379893.png" },
    { name: "Maruti Suzuki Dzire", image: "https://cdn.poehali.dev/files/7b1565b0-ee78-40a2-93bc-2ec234828f24.png" },
    { name: "Maruti Ertiga", image: "https://cdn.poehali.dev/files/da831f52-7170-46fc-88fb-b211c8c2b6ef.png" },
    { name: "Hyundai Aura", image: "https://cdn.poehali.dev/files/85d087ba-1ee3-4bf0-a8de-f802972b812a.png" },
    { name: "Toyota Innova Crysta", image: "https://cdn.poehali.dev/files/20658303-d323-4123-af52-f3f044ab4de5.png" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/8f7bd737-77b8-4120-a370-f500f9ef113e.jpg" 
              alt="WroomTaxi Logo" 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <h1 className="text-3xl font-bold text-secondary">
              Wroom<span className="text-primary">Taxi</span>
            </h1>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-secondary">
            <Icon name="Phone" className="mr-2" size={20} />
            Позвонить
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
                Станьте водителем <span className="text-primary">WroomTaxi</span>
              </h2>
              <p className="text-xl text-white/90">
                Зарабатывайте до ₹50,000 в месяц с гибким графиком работы. 
                Начните сегодня!
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-secondary text-lg px-8 py-6"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Подать заявку
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
            Почему выбирают <span className="text-primary">WroomTaxi</span>?
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Лучшие условия для водителей в Индии
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
            Предоставляем в аренду для работы
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Выберите автомобиль, который подходит вам
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
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cars.map((car, index) => (
                <Card key={index} className="flex-shrink-0 w-80 snap-center hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-secondary text-center">{car.name}</h4>
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

      <section id="application-form" className="py-20 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="text-4xl font-bold text-center mb-4 text-secondary">
            Заявка на работу водителем
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Заполните форму и мы свяжемся с вами в течение 2 часов
          </p>
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Введите имя"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Введите фамилию"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="middleName">Отчество</Label>
                  <Input 
                    id="middleName" 
                    placeholder="Введите отчество"
                    value={formData.middleName}
                    onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Номер телефона *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Возраст (полных лет) *</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    min="21"
                    max="65"
                    placeholder="Введите возраст"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document">Скан паспорта *</Label>
                  <Input 
                    id="document" 
                    type="file" 
                    accept="image/*,.pdf"
                    onChange={(e) => setFormData({...formData, document: e.target.files?.[0] || null})}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Загрузите скан или фото паспорта</p>
                </div>

                <div className="space-y-3">
                  <Label>Есть ли у вас своя машина? *</Label>
                  <RadioGroup 
                    value={formData.hasOwnCar}
                    onValueChange={(value) => setFormData({...formData, hasOwnCar: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="font-normal cursor-pointer">Да</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="font-normal cursor-pointer">Нет</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-secondary text-lg">
                  Отправить заявку
                  <Icon name="Send" className="ml-2" size={20} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://cdn.poehali.dev/projects/b267464d-47a3-4f81-91d7-a73e9e72c75d/files/8f7bd737-77b8-4120-a370-f500f9ef113e.jpg" 
                  alt="WroomTaxi Logo" 
                  className="w-10 h-10 rounded-lg"
                />
                <h3 className="text-2xl font-bold">
                  Wroom<span className="text-primary">Taxi</span>
                </h3>
              </div>
              <p className="text-white/80">
                Ваш надежный партнер в такси-бизнесе по всей Индии
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <span>info@wroomtaxi.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  <span>Mumbai, Maharashtra 400001</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Офисы</h4>
              <ul className="space-y-2 text-white/80">
                <li>Mumbai</li>
                <li>Delhi</li>
                <li>Bangalore</li>
                <li>Hyderabad</li>
                <li>Chennai</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Работаем в городах</h4>
              <ul className="space-y-2 text-white/80">
                <li>Pune</li>
                <li>Kolkata</li>
                <li>Jaipur</li>
                <li>Ahmedabad</li>
                <li>Surat</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 WroomTaxi. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
