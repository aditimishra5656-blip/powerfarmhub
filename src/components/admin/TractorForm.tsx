import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Upload, Image } from "lucide-react";

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
}

interface TractorFormProps {
  tractor?: Tractor | null;
  onSuccess: () => void;
}

const TractorForm = ({ tractor, onSuccess }: TractorFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    hp: '',
    fuel_efficiency: '',
    lifting_capacity: '',
    price_range: '',
    image_url: '',
    is_popular: false,
  });
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (tractor) {
      setFormData({
        name: tractor.name,
        model: tractor.model,
        hp: tractor.hp,
        fuel_efficiency: tractor.fuel_efficiency,
        lifting_capacity: tractor.lifting_capacity,
        price_range: tractor.price_range,
        image_url: tractor.image_url || '',
        is_popular: tractor.is_popular,
      });
      setFeatures(tractor.features || []);
      setLabels(tractor.labels || []);
    }
  }, [tractor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures(prev => [...prev, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('tractor-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('tractor-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    try {
      const imageUrl = await uploadImage(selectedFile);
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
      setSelectedFile(null);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const addLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      setLabels(prev => [...prev, newLabel.trim()]);
      setNewLabel('');
    }
  };

  const removeLabel = (index: number) => {
    setLabels(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        features,
        labels,
      };

      if (tractor?.id) {
        // Update existing tractor
        const { error } = await supabase
          .from('tractors')
          .update(data)
          .eq('id', tractor.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Tractor updated successfully",
        });
      } else {
        // Create new tractor
        const { error } = await supabase
          .from('tractors')
          .insert([data]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Tractor created successfully",
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving tractor:', error);
      toast({
        title: "Error",
        description: "Failed to save tractor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tractor Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="e.g., PowerTrac 439 DS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model *</Label>
          <Input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            required
            placeholder="e.g., 439 DS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hp">Horsepower *</Label>
          <Input
            id="hp"
            name="hp"
            value={formData.hp}
            onChange={handleInputChange}
            required
            placeholder="e.g., 42 HP"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuel_efficiency">Fuel Efficiency *</Label>
          <Input
            id="fuel_efficiency"
            name="fuel_efficiency"
            value={formData.fuel_efficiency}
            onChange={handleInputChange}
            required
            placeholder="e.g., 3.8 L/hr"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lifting_capacity">Lifting Capacity *</Label>
          <Input
            id="lifting_capacity"
            name="lifting_capacity"
            value={formData.lifting_capacity}
            onChange={handleInputChange}
            required
            placeholder="e.g., 1500 kg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price_range">Price Range *</Label>
          <Input
            id="price_range"
            name="price_range"
            value={formData.price_range}
            onChange={handleInputChange}
            required
            placeholder="e.g., ₹6.25 - ₹6.85 Lakh"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Tractor Image</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
          {formData.image_url ? (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={formData.image_url} 
                  alt="Tractor preview" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">Image uploaded successfully</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Image className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-sm font-medium">Upload tractor image</p>
                <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <Label 
                  htmlFor="image-upload" 
                  className="cursor-pointer inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md text-sm"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </Label>
                {selectedFile && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{selectedFile.name}</span>
                    <Button
                      type="button"
                      onClick={handleImageUpload}
                      disabled={uploading}
                      size="sm"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Features</Label>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {feature}
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Labels</Label>
        <div className="flex gap-2">
          <Input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Add a label (e.g., In Stock, Out of Stock, Popular)"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLabel())}
          />
          <Button type="button" onClick={addLabel} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {labels.map((label, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {label}
              <button
                type="button"
                onClick={() => removeLabel(index)}
                className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Common labels: In Stock, Out of Stock, Popular, New Arrival, Limited Edition, Best Seller
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_popular"
          checked={formData.is_popular}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_popular: checked }))}
        />
        <Label htmlFor="is_popular">Mark as Popular</Label>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Saving...' : (tractor ? 'Update Tractor' : 'Create Tractor')}
      </Button>
    </form>
  );
};

export default TractorForm;