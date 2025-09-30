import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Phone } from "lucide-react";
import heroTractor from "@/assets/hero-tractor.jpg";
import { ServiceBookingForm } from "@/components/CTAForms";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
  badge_text: string;
  features: string[];
  cta_primary: string;
  cta_secondary: string;
  trust_indicators: {
    rating: string;
    experience: string;
    customers: string;
  };
}

const HeroSection = () => {
  const { t } = useLanguage();
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('content')
        .eq('section_name', 'hero_section')
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (data?.content) {
        setHeroContent(data.content as unknown as HeroContent);
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
      // Fallback to default content
      setHeroContent({
        title: "Premium Quality",
        subtitle: "Tractors for Modern Farming",
        description: "Discover our range of high-performance PowerTrac tractors designed for efficiency, durability, and maximum productivity on your farm.",
        background_image: heroTractor,
        badge_text: "⭐ #1 PowerTrac Dealer in the Region",
        features: ["Best Price Guarantee", "Expert After-Sales Service", "Easy Finance Options", "Free On-Site Demo"],
        cta_primary: "Book Free Demo",
        cta_secondary: "Call Now",
        trust_indicators: {
          rating: "4.8/5 Customer Rating",
          experience: "15+ Years of Trusted Service",
          customers: "5000+ Happy Farmers"
        }
      });
    }
  };

  if (!heroContent) {
    return <div className="min-h-[90vh] bg-gradient-hero"></div>;
  }
  return (
    <section id="home" className="relative min-h-[90vh] bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroContent.background_image}
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
            {heroContent.badge_text}
          </Badge>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {heroContent.title}
            <span className="text-powertrac-orange"> PowerTrac</span>
            <br />
            {heroContent.subtitle}
          </h1>

          {/* Description */}
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            {heroContent.description}
          </p>

          {/* Features List */}
          <div className="flex flex-wrap gap-4 mb-8">
            {heroContent.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <CheckCircle className="w-4 h-4 text-powertrac-orange" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <ServiceBookingForm 
              triggerText={heroContent.cta_primary}
              variant="default"
            />
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white bg-white/20 backdrop-blur-sm hover:bg-white hover:text-powertrac-blue font-bold text-lg px-8 py-4"
              onClick={() => window.location.href = 'tel:+919876543210'}
            >
              <Phone className="w-5 h-5 mr-2" />
              {heroContent.cta_secondary}
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
              <span className="text-sm">{heroContent.trust_indicators.rating}</span>
            </div>
            <div className="text-sm">
              <strong>{heroContent.trust_indicators.experience}</strong>
            </div>
            <div className="text-sm">
              <strong>{heroContent.trust_indicators.customers}</strong>
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