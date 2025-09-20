import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import TractorForm from "./TractorForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Tractor {
  id: string;
  name: string;
  model: string;
  hp: string;
  fuel_efficiency: string;
  lifting_capacity: string;
  price_range: string;
  features: string[];
  labels: string[];
  image_url?: string;
  is_popular: boolean;
  created_at: string;
  updated_at: string;
}

const TractorManagement = () => {
  const [tractors, setTractors] = useState<Tractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTractors();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('tractor-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tractors'
        },
        () => {
          fetchTractors();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTractors = async () => {
    try {
      const { data, error } = await supabase
        .from('tractors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTractors(data || []);
    } catch (error) {
      console.error('Error fetching tractors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tractors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tractors')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Tractor deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting tractor:', error);
      toast({
        title: "Error",
        description: "Failed to delete tractor",
        variant: "destructive",
      });
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedTractor(null);
    fetchTractors();
  };

  if (loading) {
    return <div className="text-center py-8">Loading tractors...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tractor Management</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-powertrac-green hover:bg-powertrac-green/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Tractor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedTractor ? 'Edit Tractor' : 'Add New Tractor'}
              </DialogTitle>
            </DialogHeader>
            <TractorForm 
              tractor={selectedTractor} 
              onSuccess={handleFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tractors.map((tractor) => (
          <Card key={tractor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{tractor.name}</CardTitle>
                {tractor.is_popular && (
                  <Badge className="bg-powertrac-orange text-white">Popular</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tractor.image_url && (
                <img 
                  src={tractor.image_url} 
                  alt={tractor.name}
                  className="w-full h-32 object-cover rounded-md"
                />
              )}
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Model:</span> {tractor.model}</p>
                <p><span className="font-medium">HP:</span> {tractor.hp}</p>
                <p><span className="font-medium">Fuel Efficiency:</span> {tractor.fuel_efficiency}</p>
                <p><span className="font-medium">Price:</span> {tractor.price_range}</p>
              </div>
              {tractor.labels && tractor.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {tractor.labels.map((label, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedTractor(tractor);
                    setIsFormOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Tractor</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {tractor.name}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(tractor.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tractors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No tractors found</p>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-powertrac-green hover:bg-powertrac-green/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Tractor
          </Button>
        </div>
      )}
    </div>
  );
};

export default TractorManagement;