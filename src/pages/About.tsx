import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import showroomImage from "@/assets/showroom.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
            <Badge className="mb-4 bg-powertrac-blue text-white">About Our Dealership</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-6">
              15+ Years of Trusted Service in Agricultural Excellence
            </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                As an authorized PowerTrac dealer, we have been serving farmers across the region 
                with premium quality tractors, exceptional service, and comprehensive support. 
                Our commitment to excellence has made us the preferred choice for thousands of farmers.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-powertrac-orange mb-2">5000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-powertrac-green mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-powertrac-blue mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Tractor Models</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-powertrac-orange mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Service Support</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-powertrac-blue hover:bg-powertrac-blue/90">
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Showroom
                </Button>
                <Button variant="outline" className="border-powertrac-green text-powertrac-green hover:bg-powertrac-green hover:text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={showroomImage}
                alt="PowerTrac Showroom"
                className="rounded-lg shadow-hover w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-powertrac-orange" />
                  <div>
                    <div className="font-bold text-powertrac-blue">Authorized Dealer</div>
                    <div className="text-sm text-muted-foreground">Certified Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;