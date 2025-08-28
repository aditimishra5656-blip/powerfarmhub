import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TractorCard from "@/components/TractorCard";
import tractor439 from "@/assets/tractor-439.jpg";
import tractor451 from "@/assets/tractor-451.jpg";
import tractor434 from "@/assets/tractor-434.jpg";

const Tractors = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Tractors Section */}
      <section className="py-20">
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

      <Footer />
    </div>
  );
};

export default Tractors;