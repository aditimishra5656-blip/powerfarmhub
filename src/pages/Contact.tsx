import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, TrendingUp, CheckCircle, Phone, Mail, Clock, Navigation } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { QuoteForm } from "@/components/CTAForms";

interface ContactInfo {
  phone: string;
  email: string;
  showroom_address: string;
  opening_hours: string;
}

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tractorModel: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setContactInfo(data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('quotes')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          email: '',
          tractor_model: formData.tractorModel,
          location: '',
          message: formData.message
        }]);

      if (error) throw error;

      toast({
        title: "Quote Request Sent!",
        description: "We'll contact you soon with the best pricing for your PowerTrac tractor.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        tractorModel: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Contact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-green text-white">Get In Touch</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Ready to Get Your PowerTrac Tractor?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contact us today for the best deals, expert advice, and personalized service. 
              Our team is ready to help you find the perfect tractor for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-powertrac-blue">Send Us Your Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    placeholder="Interested Tractor Model (Optional)"
                    name="tractorModel"
                    value={formData.tractorModel}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    placeholder="Tell us about your requirements..."
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-powertrac-orange hover:bg-powertrac-orange/90 text-white text-lg py-3"
                  >
                    {isLoading ? "Sending..." : "Get Free Quote & Demo"}
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">Or use our quick quote form</p>
                  <QuoteForm triggerText="Quick Quote Form" variant="outline" />
                </div>
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-powertrac-blue mb-6">Visit Our Showroom</h3>
                  
                  {contactInfo ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-powertrac-orange mt-1" />
                          <div>
                            <div className="font-medium">Phone</div>
                            <div className="text-muted-foreground">{contactInfo.phone}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-powertrac-orange mt-1" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-muted-foreground">{contactInfo.email}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-powertrac-orange mt-1" />
                        <div className="flex-1">
                          <div className="font-medium mb-1">Address</div>
                          <div className="text-muted-foreground mb-2">{contactInfo.showroom_address}</div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-powertrac-blue border-powertrac-blue hover:bg-powertrac-blue hover:text-white"
                            onClick={() => {
                              const encodedAddress = encodeURIComponent(contactInfo.showroom_address);
                              window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
                            }}
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            Get Directions
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-powertrac-orange mt-1" />
                        <div>
                          <div className="font-medium">Opening Hours</div>
                          <div className="text-muted-foreground whitespace-pre-line">{contactInfo.opening_hours}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-powertrac-orange mt-1" />
                        <div>
                          <div className="font-medium">Loading contact information...</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-0 shadow-card">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-powertrac-green mx-auto mb-3" />
                    <div className="font-semibold text-powertrac-blue">Best Price Guarantee</div>
                    <div className="text-sm text-muted-foreground">Competitive prices assured</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-card">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-powertrac-orange mx-auto mb-3" />
                    <div className="font-semibold text-powertrac-blue">Instant Approval</div>
                    <div className="text-sm text-muted-foreground">Quick finance processing</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;