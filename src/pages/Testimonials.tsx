import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Testimonials = () => {
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
    },
    {
      name: "Vijay Sharma",
      location: "Jaipur, Rajasthan",
      rating: 5,
      text: "Excellent service and support. The tractor has increased my farm productivity significantly. The fuel efficiency is amazing and maintenance is very low.",
      tractorModel: "PowerTrac 439 DS"
    },
    {
      name: "Mahesh Yadav",
      location: "Indore, Madhya Pradesh",
      rating: 5,
      text: "Very happy with my PowerTrac tractor. The build quality is excellent and it handles all types of farming work efficiently. Great value for money!",
      tractorModel: "PowerTrac 451 DS Plus"
    },
    {
      name: "Ravi Reddy",
      location: "Warangal, Telangana",
      rating: 4,
      text: "Good tractor with reliable performance. The dealer team was very helpful during purchase and the after-sales service is prompt. Satisfied with the quality.",
      tractorModel: "PowerTrac 434 DS"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Testimonials Section */}
      <section className="py-20">
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

      <Footer />
    </div>
  );
};

export default Testimonials;