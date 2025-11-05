import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  phone: string;
  email: string;
  age: number;
  hasOwnCar: boolean;
  licenseFrontUrl: string | null;
  licenseBackUrl: string | null;
  createdAt: string;
  status: string;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchApplications = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/b903531b-3a4a-43b8-81b3-8be0f41e2429');
      const data = await response.json();
      
      if (response.ok) {
        setApplications(data.applications || []);
      } else {
        toast({
          title: "Error",
          description: "Failed to load applications",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN') + ' ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
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
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            <Icon name="Home" className="mr-2" size={20} />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-secondary">Driver Applications</h2>
          <Button onClick={fetchApplications} disabled={loading}>
            <Icon name="RefreshCw" className="mr-2" size={20} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Icon name="Loader2" size={48} className="animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No applications yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-secondary">
                      {app.firstName} {app.middleName} {app.lastName}
                    </CardTitle>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      app.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Icon name="Phone" size={20} className="text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <a href={`tel:${app.phone}`} className="font-semibold hover:text-primary">
                            {app.phone}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Icon name="Mail" size={20} className="text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <a href={`mailto:${app.email}`} className="font-semibold hover:text-primary">
                            {app.email}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Icon name="Calendar" size={20} className="text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Age</p>
                          <p className="font-semibold">{app.age} years</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Icon name="Car" size={20} className="text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Has Own Car</p>
                          <p className="font-semibold">{app.hasOwnCar ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Icon name="Clock" size={20} className="text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Submitted At</p>
                          <p className="font-semibold">{formatDate(app.createdAt)}</p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  
                  {(app.licenseFrontUrl || app.licenseBackUrl) && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Icon name="CreditCard" size={20} className="text-primary" />
                        Driver's License Photos
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {app.licenseFrontUrl && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2 font-semibold">Front Side</p>
                            <a 
                              href={app.licenseFrontUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block border-2 border-primary/20 rounded-lg overflow-hidden hover:border-primary transition-colors"
                            >
                              <img 
                                src={app.licenseFrontUrl} 
                                alt="License Front" 
                                className="w-full h-48 object-cover"
                              />
                              <div className="bg-primary/5 p-2 text-center text-sm flex items-center justify-center gap-2">
                                <Icon name="ZoomIn" size={16} />
                                Click to view full size
                              </div>
                            </a>
                          </div>
                        )}
                        {app.licenseBackUrl && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2 font-semibold">Back Side</p>
                            <a 
                              href={app.licenseBackUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block border-2 border-primary/20 rounded-lg overflow-hidden hover:border-primary transition-colors"
                            >
                              <img 
                                src={app.licenseBackUrl} 
                                alt="License Back" 
                                className="w-full h-48 object-cover"
                              />
                              <div className="bg-primary/5 p-2 text-center text-sm flex items-center justify-center gap-2">
                                <Icon name="ZoomIn" size={16} />
                                Click to view full size
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 pt-6 border-t flex gap-3">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Icon name="Phone" className="mr-2" size={18} />
                      Call Applicant
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Mail" className="mr-2" size={18} />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;