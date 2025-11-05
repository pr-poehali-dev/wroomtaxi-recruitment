import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Header = () => {
  return (
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
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-secondary"
          onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Icon name="FileText" className="mr-2" size={20} />
          Submit Application
        </Button>
      </div>
    </header>
  );
};

export default Header;
