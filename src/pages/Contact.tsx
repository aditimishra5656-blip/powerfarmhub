import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, TrendingUp, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tractorModel: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
              <CardContent className="space-y-4">
                <Input
                  placeholder="Your Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Input
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
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
                <Button className="w-full bg-powertrac-orange hover:bg-powertrac-orange/90 text-white text-lg py-3">
                  Get Free Quote & Demo
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info & Map Placeholder */}
            <div className="space-y-8">
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-powertrac-blue mb-4">Visit Our Showroom</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-powertrac-orange mt-1" />
                      <div>
                        <div className="font-medium">123 Industrial Road, Sector 15</div>
                        <div className="text-muted-foreground">Agricultural Hub, City - 110001</div>
                      </div>
                    </div>
                    <div className="bg-muted/50 h-32 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-sm">Interactive Map Coming Soon</div>
                      </div>
                    </div>
                  </div>
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