import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Wrench, CreditCard, HeadphonesIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Services = () => {
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

      <Footer />
    </div>
  );
};

export default Services;