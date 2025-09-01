import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Phone } from "lucide-react";
import heroTractor from "@/assets/hero-tractor.jpg";
import { ServiceBookingForm } from "@/components/CTAForms";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroTractor}
          alt="PowerTrac Tractor in Agricultural Field"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-powertrac-blue/80 via-powertrac-blue/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 flex items-center min-h-[90vh]">
        <div className="max-w-2xl text-white">
          {/* Badge */}
          <Badge className="mb-6 bg-powertrac-orange text-white border-none">
            ⭐ #1 PowerTrac Dealer in the Region
          </Badge>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Premium
            <span className="text-powertrac-orange"> PowerTrac</span>
            <br />
            Tractors for Every Farm
          </h1>

          {/* Description */}
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Discover India's most trusted tractor brand with unmatched power, 
            efficiency, and reliability. Get the best deals, expert service, 
            and financing options at our authorized dealership.
          </p>

          {/* Features List */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              "Best Price Guarantee",
              "Expert After-Sales Service", 
              "Easy Finance Options",
              "Free On-Site Demo"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 text-powertrac-orange" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <ServiceBookingForm 
              triggerText="Book Free Demo Today"
              variant="default"
            />
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-powertrac-blue font-bold text-lg px-8 py-4"
              onClick={() => window.open('tel:+919876543210', '_self')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: +91 98765 43210
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-powertrac-orange text-powertrac-orange" />
                ))}
              </div>
              <span className="text-sm">4.8/5 Customer Rating</span>
            </div>
            <div className="text-sm">
              <strong>15+ Years</strong> of Trusted Service
            </div>
            <div className="text-sm">
              <strong>5000+</strong> Happy Farmers
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;