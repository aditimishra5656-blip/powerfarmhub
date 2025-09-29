import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TractorCard from "@/components/TractorCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const Tractors = () => {
  const { t } = useLanguage();
  const [tractors, setTractors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTractors = async () => {
      const { data, error } = await supabase
        .from('tractors')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) {
        setTractors(data || []);
      }
      setLoading(false);
    };
    fetchTractors();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Tractors Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-powertrac-green text-white">{t('tractors.title')}</Badge>
            <h2 className="text-4xl font-bold text-powertrac-blue mb-4">
              Choose Your Perfect PowerTrac Tractor
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our extensive range of PowerTrac tractors designed for every farming need. 
              From compact models to heavy-duty machines, find the perfect match for your requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground">Loading tractors...</div>
            ) : tractors.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">No tractors available yet.</div>
            ) : (
              tractors.map((t) => (
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