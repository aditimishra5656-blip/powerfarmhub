import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  Star, 
  Shield, 
  Wrench, 
  CreditCard, 
  HeadphonesIcon,
  MapPin,
  Calendar,
  Award,
  TrendingUp
} from "lucide-react";

// Components
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TractorCard from "@/components/TractorCard";
import Footer from "@/components/Footer";

// Assets
import tractor439 from "@/assets/tractor-439.jpg";
import tractor451 from "@/assets/tractor-451.jpg";
import tractor434 from "@/assets/tractor-434.jpg";
import showroomImage from "@/assets/showroom.jpg";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tractorModel: "",
    message: ""
  });

  const tractors = [
    {
      name: "PowerTrac 439 DS",
      image: tractor439,
      hp: "42 HP",
      fuelEfficiency: "3.8 L/hr",
      liftingCapacity: "1500 kg",
      priceRange: "₹6.25 - ₹6.85 Lakh",
      features: [
        "Power Steering Standard",
        "Advanced Hydraulic System", 
        "Heavy Duty Transmission",
        "Superior Fuel Economy"
      ],
      isPopular: true
    },
    {
      name: "PowerTrac 451 DS Plus",
      image: tractor451,
      hp: "50 HP", 
      fuelEfficiency: "4.2 L/hr",
      liftingCapacity: "1800 kg",
      priceRange: "₹7.15 - ₹7.95 Lakh",
      features: [
        "Digital Display Panel",
        "Advanced PTO System",
        "Premium Comfort Seat",
        "Enhanced Hydraulics"
      ]
    },
    {
      name: "PowerTrac 434 DS",
      image: tractor434,
      hp: "38 HP",
      fuelEfficiency: "3.5 L/hr", 
      liftingCapacity: "1200 kg",
      priceRange: "₹5.65 - ₹6.25 Lakh",
      features: [
        "Compact Design",
        "Easy Maneuverability",
        "Cost Effective",
        "Reliable Performance"
      ]
    }
  ];

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

  const testimonials = [
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
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

      {/* Tractors Section */}
      <section id="tractors" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-green text-white">Our Tractor Range</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Choose Your Perfect PowerTrac Tractor
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our extensive range of PowerTrac tractors designed for every farming need. 
              From compact models to heavy-duty machines, find the perfect match for your requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tractors.map((tractor, index) => (
              <TractorCard key={index} {...tractor} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-powertrac-orange hover:bg-powertrac-orange/90 text-white text-lg px-8 py-4">
              View All Models
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/30">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-blue text-white">Customer Stories</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              What Our Farmers Say About Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from real farmers who have transformed their agricultural operations 
              with PowerTrac tractors and our exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-hover transition-all duration-300 border-0 bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-powertrac-blue rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-powertrac-blue">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
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
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.tractorModel}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
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

export default Index;