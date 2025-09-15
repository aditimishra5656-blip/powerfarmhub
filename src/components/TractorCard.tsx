import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fuel, Gauge, Weight, Eye, Phone } from "lucide-react";
import { QuoteForm } from "@/components/CTAForms";

interface TractorCardProps {
  name: string;
  image: string;
  hp: string;
  fuelEfficiency: string;
  liftingCapacity: string;
  priceRange: string;
  features: string[];
  isPopular?: boolean;
}

const TractorCard = ({ 
  name, 
  image, 
  hp, 
  fuelEfficiency, 
  liftingCapacity, 
  priceRange, 
  features,
  isPopular = false 
}: TractorCardProps) => {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card border-0">
      {isPopular && (
        <div className="relative">
          <Badge className="absolute -top-2 left-4 bg-powertrac-orange text-white z-10">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={`${name} Tractor`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <Button variant="secondary" size="sm" className="text-xs">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-powertrac-blue mb-2">{name}</h3>
          <div className="text-lg font-semibold text-powertrac-green">{priceRange}</div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Gauge className="w-5 h-5 text-powertrac-blue" />
            </div>
            <div className="text-sm font-semibold text-powertrac-blue">{hp}</div>
            <div className="text-xs text-muted-foreground">Horsepower</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Fuel className="w-5 h-5 text-powertrac-green" />
            </div>
            <div className="text-sm font-semibold text-powertrac-green">{fuelEfficiency}</div>
            <div className="text-xs text-muted-foreground">Fuel Efficiency</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Weight className="w-5 h-5 text-powertrac-orange" />
            </div>
            <div className="text-sm font-semibold text-powertrac-orange">{liftingCapacity}</div>
            <div className="text-xs text-muted-foreground">Lifting Capacity</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-powertrac-gray">Key Features:</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-powertrac-orange rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <div className="flex-1">
          <QuoteForm 
            triggerText="Get Quote" 
            variant="default"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="border-powertrac-green text-powertrac-green hover:bg-powertrac-green hover:text-white shrink-0"
          onClick={() => window.location.href = 'tel:+919876543210'}
          title="Call for instant support"
        >
          <Phone className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TractorCard;