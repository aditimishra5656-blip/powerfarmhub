import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Wrench, CreditCard, HeadphonesIcon, Calendar, Phone, User, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServiceBookingForm } from "@/components/CTAForms";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  const services = [
    {
      icon: Shield,
      title: "Genuine Parts & Warranty",
      description: "All PowerTrac tractors come with comprehensive warranty and access to genuine spare parts."
    },
    {
      icon: Wrench,
      title: "Expert Service Support",
      description: "Our certified technicians provide professional maintenance and repair services at your location."
    },
    {
      icon: CreditCard,
      title: "Easy Finance Options", 
      description: "Get instant loan approvals with attractive interest rates through our banking partnerships."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Customer Care",
      description: "Round-the-clock customer support for all your queries, service requests, and emergencies."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-orange text-white">Our Services</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Complete Support for Your Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive services beyond just selling tractors. From finance assistance 
              to after-sales support, we're your complete farming partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-hover transition-all duration-300 border-0 bg-gradient-card">
                <CardHeader>
                  <div className="w-16 h-16 bg-powertrac-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-powertrac-blue" />
                  </div>
                  <CardTitle className="text-xl text-powertrac-blue">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Online Service Booking Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-green text-white">Book Service Online</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Schedule Your Tractor Service
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Book professional tractor service at your convenience. Our certified technicians 
              will visit your location with genuine parts and equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="bg-gradient-card border-0 p-8">
                <CardContent>
                  <h3 className="text-2xl font-bold text-powertrac-blue mb-6">Why Choose Our Service?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="w-6 h-6 text-powertrac-orange mt-1" />
                      <div>
                        <h4 className="font-semibold text-powertrac-blue">Certified Technicians</h4>
                        <p className="text-muted-foreground">Expert technicians trained on PowerTrac systems</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-6 h-6 text-powertrac-orange mt-1" />
                      <div>
                        <h4 className="font-semibold text-powertrac-blue">Flexible Scheduling</h4>
                        <p className="text-muted-foreground">Book service at your preferred date and time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-6 h-6 text-powertrac-orange mt-1" />
                      <div>
                        <h4 className="font-semibold text-powertrac-blue">On-Site Service</h4>
                        <p className="text-muted-foreground">Service at your farm or location</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-6 h-6 text-powertrac-orange mt-1" />
                      <div>
                        <h4 className="font-semibold text-powertrac-blue">Custom Solutions</h4>
                        <p className="text-muted-foreground">Tailored service based on your specific needs</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Card className="bg-white border-2 border-powertrac-blue/20 p-8">
                <CardContent>
                  <h3 className="text-2xl font-bold text-powertrac-blue mb-4">Book Your Service Now</h3>
                  <p className="text-muted-foreground mb-6">
                    Fill in your details and we'll contact you to confirm your service appointment
                  </p>
                  <ServiceBookingForm 
                    triggerText="Schedule Service Appointment" 
                    variant="default"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;