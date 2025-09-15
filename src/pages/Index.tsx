import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, Wrench, CreditCard, HeadphonesIcon, Star, CheckCircle, Users, Award, Clock, Phone, MapPin } from "lucide-react";

// Components
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TractorCard from "@/components/TractorCard";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { QuoteForm, ServiceBookingForm } from "@/components/CTAForms";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [featuredTractors, setFeaturedTractors] = useState<any[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      const { data, error } = await supabase
        .from('tractors')
        .select('*')
        .eq('is_popular', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (!error) {
        setFeaturedTractors(data || []);
      }
      setLoadingFeatured(false);
    };
    loadFeatured();
  }, []);

  const keyServices = [
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

  const featuredTestimonials = [
    {
      name: "Ramesh Kumar",
      location: "Village Kharkhoda, Haryana", 
      rating: 5,
      text: "My PowerTrac 439 has been working perfectly for 3 years. Excellent fuel efficiency and the service team is very supportive. Highly recommended!",
      tractorModel: "PowerTrac 439 DS"
    },
    {
      name: "Suresh Patel",
      location: "Nashik, Maharashtra",
      rating: 5, 
      text: "Best investment for my farm! The tractor performance is outstanding and the dealership provided excellent after-sales service. Very satisfied with my purchase.",
      tractorModel: "PowerTrac 451 DS Plus"
    },
    {
      name: "Jatinder Singh",
      location: "Ludhiana, Punjab",
      rating: 4,
      text: "Reliable tractor with great power. The finance process was smooth and quick. The team helped me get the best deal possible. Thank you!",
      tractorModel: "PowerTrac 434 DS"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Featured Tractors Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-green text-white">Featured Models</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Popular PowerTrac Tractors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out our most popular tractor models loved by thousands of farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingFeatured ? (
              <div className="col-span-full text-center text-muted-foreground">Loading tractors...</div>
            ) : featuredTractors.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">No featured tractors yet.</div>
            ) : (
              featuredTractors.map((t) => (
                <TractorCard
                  key={t.id}
                  name={t.name}
                  image={t.image_url || "/placeholder.svg"}
                  hp={t.hp}
                  fuelEfficiency={t.fuel_efficiency}
                  liftingCapacity={t.lifting_capacity}
                  priceRange={t.price_range}
                  features={t.features || []}
                  isPopular={t.is_popular}
                />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <QuoteForm triggerText="View All Tractors & Get Quote" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-green text-white">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Your Trusted PowerTrac Partner
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              With years of experience and commitment to excellence, we're your reliable partner for all PowerTrac needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-powertrac-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-powertrac-blue/20 transition-colors">
                <Award className="w-8 h-8 text-powertrac-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authorized Dealer</h3>
              <p className="text-muted-foreground">Official PowerTrac dealership with genuine parts and warranty</p>
            </div>

            <div className="text-center group">
              <div className="bg-powertrac-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-powertrac-green/20 transition-colors">
                <Users className="w-8 h-8 text-powertrac-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">Trained technicians for sales, service, and maintenance support</p>
            </div>

            <div className="text-center group">
              <div className="bg-powertrac-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-powertrac-orange/20 transition-colors">
                <Clock className="w-8 h-8 text-powertrac-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
              <p className="text-muted-foreground">Fast delivery, immediate support, and prompt service response</p>
            </div>

            <div className="text-center group">
              <div className="bg-powertrac-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-powertrac-blue/20 transition-colors">
                <CheckCircle className="w-8 h-8 text-powertrac-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-muted-foreground">Competitive pricing with flexible financing options available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-orange text-white">Our Services</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Complete Support for Your Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive services beyond just selling tractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-hover transition-all duration-300 border-0 bg-gradient-card">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-powertrac-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-powertrac-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-powertrac-blue mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="bg-powertrac-blue hover:bg-powertrac-blue/90 text-white text-lg px-8 py-4">
                Learn More About Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-blue text-white">Customer Stories</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              What Our Farmers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from farmers who chose PowerTrac tractors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-hover transition-all duration-300 border-0 bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-powertrac-blue rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-powertrac-blue">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-powertrac-orange text-powertrac-orange"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button className="bg-powertrac-green hover:bg-powertrac-green/90 text-white text-lg px-8 py-4">
                Read More Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-powertrac-blue to-powertrac-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Power Your Farm?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with us today for the best deals on PowerTrac tractors, expert advice, and comprehensive support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <QuoteForm triggerText="Get Best Quote" variant="secondary" />
            <ServiceBookingForm triggerText="Book Service" variant="outline" />
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-powertrac-blue"
              onClick={() => window.location.href = 'tel:+919876543210'}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now: +91 98765 43210
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;