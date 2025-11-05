import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    age: "",
    hasOwnCar: "no",
    licenseFront: null as File | null,
    licenseBack: null as File | null
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.licenseFront || !formData.licenseBack) {
      toast({
        title: "Error",
        description: "Please upload both sides of your driver's license",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const frontBase64 = await convertToBase64(formData.licenseFront);
      const backBase64 = await convertToBase64(formData.licenseBack);
      
      const uploadResponse = await fetch('https://functions.poehali.dev/c1de79f0-295c-4f46-bf1b-ca937db89013', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licenseFront: frontBase64,
          licenseBack: backBase64
        }),
      });
      
      const uploadData = await uploadResponse.json();
      
      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Failed to upload license photos');
      }
      
      const response = await fetch('https://functions.poehali.dev/26636b11-737a-4ef0-9242-70a4fcf6f062', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          licenseFrontUrl: uploadData.frontUrl,
          licenseBackUrl: uploadData.backUrl
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast({
          title: "Application submitted!",
          description: "We will contact you shortly.",
        });
        
        setFormData({
          firstName: "",
          lastName: "",
          middleName: "",
          phone: "",
          email: "",
          age: "",
          hasOwnCar: "no",
          licenseFront: null,
          licenseBack: null
        });
        
        const frontInput = document.getElementById('licenseFront') as HTMLInputElement;
        const backInput = document.getElementById('licenseBack') as HTMLInputElement;
        if (frontInput) frontInput.value = '';
        if (backInput) backInput.value = '';
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to submit application",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
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
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="licenseFront">Driver's License - Front Side *</Label>
                  <Input 
                    id="licenseFront" 
                    type="file" 
                    accept="image/*" 
                    required 
                    onChange={(e) => setFormData({...formData, licenseFront: e.target.files?.[0] || null})}
                    className="border-primary/30 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Upload front side photo</p>
                </div>
                <div>
                  <Label htmlFor="licenseBack">Driver's License - Back Side *</Label>
                  <Input 
                    id="licenseBack" 
                    type="file" 
                    accept="image/*" 
                    required 
                    onChange={(e) => setFormData({...formData, licenseBack: e.target.files?.[0] || null})}
                    className="border-primary/30 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Upload back side photo</p>
                </div>
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
  );
};

export default ApplicationForm;
