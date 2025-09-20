import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MessageSquare, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  tractor_model: string;
  location: string;
  message: string;
}

interface ServiceFormData {
  name: string;
  phone: string;
  email: string;
  service_type: string;
  tractor_model: string;
  location: string;
  preferred_date: string;
  message: string;
}

export const QuoteForm = ({ triggerText = "Get Quote Now", variant = "default" as any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    tractor_model: '',
    location: '',
    message: ''
  });
  const { toast } = useToast();

  const tractorModels = [
    "PowerTrac 439 DS",
    "PowerTrac 451 DS Plus", 
    "PowerTrac 434 DS",
    "PowerTrac 445 DS",
    "PowerTrac 460 DS"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('quotes')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: t('forms.quote.success'),
        description: "We'll contact you soon with the best pricing for your PowerTrac tractor.",
      });

      // Reset form and close dialog
      setFormData({
        name: '',
        phone: '',
        email: '',
        tractor_model: '',
        location: '',
        message: ''
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Error",
        description: t('forms.quote.error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          className={
            variant === "default" 
              ? "bg-powertrac-orange hover:bg-powertrac-orange/90 text-white w-full" 
              : "w-full"
          }
        >
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-powertrac-blue">{t('forms.quote.title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('forms.quote.name')} *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('forms.quote.phone')} *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t('forms.quote.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tractor_model">{t('forms.quote.tractorModel')} *</Label>
            <Select name="tractor_model" value={formData.tractor_model} onValueChange={(value) => setFormData(prev => ({ ...prev, tractor_model: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a tractor model" />
              </SelectTrigger>
              <SelectContent>
                {tractorModels.map((model) => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{t('forms.quote.location')}</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, State"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t('forms.quote.message')}</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any specific requirements or questions?"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-powertrac-orange hover:bg-powertrac-orange/90">
            {loading ? 'Submitting...' : t('forms.quote.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const ServiceBookingForm = ({ triggerText = "Book Service", variant = "outline" as any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    phone: '',
    email: '',
    service_type: '',
    tractor_model: '',
    location: '',
    preferred_date: '',
    message: ''
  });
  const { toast } = useToast();

  const serviceTypes = [
    "Regular Maintenance",
    "Engine Repair",
    "Hydraulic Service",
    "Transmission Repair",
    "Parts Replacement",
    "Emergency Repair",
    "Annual Service"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('service_bookings')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: t('forms.demo.success'),
        description: "Your service request has been submitted. We'll contact you to confirm the appointment.",
      });

      // Reset form and close dialog
      setFormData({
        name: '',
        phone: '',
        email: '',
        service_type: '',
        tractor_model: '',
        location: '',
        preferred_date: '',
        message: ''
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error booking service:', error);
      toast({
        title: "Error",
        description: t('forms.demo.error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant}
          className={
            variant === "default" 
              ? "bg-powertrac-orange hover:bg-powertrac-orange/90 text-white font-bold text-lg px-8 py-4 shadow-hover"
              : variant === "outline"
              ? "border-white text-white hover:bg-white hover:text-powertrac-blue font-bold text-lg px-8 py-4"
              : ""
          }
        >
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-powertrac-blue">{t('forms.demo.title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Full Name *</Label>
              <Input
                id="service-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-phone">Phone *</Label>
              <Input
                id="service-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service-email">Email</Label>
            <Input
              id="service-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_type">Service Type *</Label>
            <Select name="service_type" value={formData.service_type} onValueChange={(value) => setFormData(prev => ({ ...prev, service_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-tractor_model">Tractor Model</Label>
            <Input
              id="service-tractor_model"
              name="tractor_model"
              value={formData.tractor_model}
              onChange={handleInputChange}
              placeholder="e.g., PowerTrac 439 DS"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-location">Location</Label>
            <Input
              id="service-location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, State"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_date">Preferred Date</Label>
            <Input
              id="preferred_date"
              name="preferred_date"
              type="date"
              value={formData.preferred_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-message">Problem Description</Label>
            <Textarea
              id="service-message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Describe the issue or service needed"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-powertrac-green hover:bg-powertrac-green/90">
            {loading ? 'Booking...' : 'Book Service'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};