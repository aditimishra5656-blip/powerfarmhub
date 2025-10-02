import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";

interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  showroom_address: string;
  opening_hours: string;
}

const ContactInfoManagement = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    showroom_address: '',
    opening_hours: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      // Fetch English version for editing
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .eq('language', 'en')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setContactInfo(data);
        setFormData({
          phone: data.phone,
          email: data.email,
          showroom_address: data.showroom_address,
          opening_hours: data.opening_hours
        });
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      toast({
        title: "Error",
        description: "Failed to load contact information",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (contactInfo) {
        // Update existing contact info for both languages
        const { error: enError } = await supabase
          .from('contact_info')
          .update(formData)
          .eq('id', contactInfo.id);

        if (enError) throw enError;

        // Also update Hindi version if it exists
        const { error: hiError } = await supabase
          .from('contact_info')
          .update(formData)
          .eq('language', 'hi');

        // Don't throw error if Hindi version doesn't exist yet
        if (hiError && hiError.code !== 'PGRST116') {
          console.log('Hindi contact info not found, will be created on first use');
        }
      } else {
        // Create new contact info for both languages
        const { error: enError } = await supabase
          .from('contact_info')
          .insert([{ ...formData, language: 'en' }]);

        if (enError) throw enError;

        const { error: hiError } = await supabase
          .from('contact_info')
          .insert([{ ...formData, language: 'hi' }]);

        if (hiError) throw hiError;
      }

      toast({
        title: "Success",
        description: "Contact information updated for both English and Hindi",
      });

      setEditing(false);
      fetchContactInfo();
      
      // Trigger storage event to refresh Header and Footer
      localStorage.setItem('contact_info_updated', Date.now().toString());
      localStorage.removeItem('contact_info_updated');
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast({
        title: "Error",
        description: "Failed to save contact information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!editing && contactInfo) {
    return (
      <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-powertrac-blue">Contact Information</CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800 mt-2">
              🌐 Synced: English & Hindi
            </Badge>
          </div>
          <Button onClick={() => setEditing(true)} variant="outline">
            Edit Contact Info
          </Button>
        </div>
      </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-powertrac-orange mt-1" />
                <div>
                  <Label className="font-medium">Phone Number</Label>
                  <p className="text-muted-foreground">{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-powertrac-orange mt-1" />
                <div>
                  <Label className="font-medium">Email Address</Label>
                  <p className="text-muted-foreground">{contactInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-powertrac-orange mt-1" />
                <div>
                  <Label className="font-medium">Showroom Address</Label>
                  <p className="text-muted-foreground">{contactInfo.showroom_address}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-powertrac-blue"
                    onClick={() => {
                      const encodedAddress = encodeURIComponent(contactInfo.showroom_address);
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
                    }}
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    Get Directions
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-powertrac-orange mt-1" />
                <div>
                  <Label className="font-medium">Opening Hours</Label>
                  <p className="text-muted-foreground">{contactInfo.opening_hours}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-powertrac-blue">
          {contactInfo ? 'Edit Contact Information' : 'Add Contact Information'}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Changes will be applied to both English and Hindi versions
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="sales@powertrac.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="showroom_address">Showroom Address *</Label>
            <Textarea
              id="showroom_address"
              name="showroom_address"
              value={formData.showroom_address}
              onChange={handleInputChange}
              placeholder="Complete showroom address with city, state and pincode"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="opening_hours">Opening Hours *</Label>
            <Textarea
              id="opening_hours"
              name="opening_hours"
              value={formData.opening_hours}
              onChange={handleInputChange}
              placeholder="Monday to Saturday: 9:00 AM - 7:00 PM, Sunday: 10:00 AM - 5:00 PM"
              required
              rows={2}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Contact Info'}
            </Button>
            {editing && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setEditing(false);
                  if (contactInfo) {
                    setFormData({
                      phone: contactInfo.phone,
                      email: contactInfo.email,
                      showroom_address: contactInfo.showroom_address,
                      opening_hours: contactInfo.opening_hours
                    });
                  }
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactInfoManagement;