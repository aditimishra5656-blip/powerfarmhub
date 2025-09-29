import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Upload, Save, X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HomepageContent {
  id: string;
  section_name: string;
  content: any;
  is_active: boolean;
}

const HomepageManagement = () => {
  const [content, setContent] = useState<HomepageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHomepageContent();
  }, []);

  const fetchHomepageContent = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .order('section_name');

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch homepage content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (sectionName: string, newContent: any) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('homepage_content')
        .update({ content: newContent })
        .eq('section_name', sectionName);

      if (error) throw error;

      // Trigger refresh in other components
      if (sectionName === 'footer_content') {
        localStorage.setItem('footer_updated', Date.now().toString());
        window.dispatchEvent(new StorageEvent('storage', { key: 'footer_updated' }));
      }

      setContent(prev => prev.map(item => 
        item.section_name === sectionName 
          ? { ...item, content: newContent }
          : item
      ));

      toast({
        title: "Success",
        description: "Homepage content updated successfully",
      });
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update homepage content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file: File, sectionName: string, field: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `homepage/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tractor-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('tractor-images')
        .getPublicUrl(filePath);

      const section = content.find(c => c.section_name === sectionName);
      if (section) {
        const updatedContent = {
          ...section.content,
          [field]: data.publicUrl
        };
        await updateContent(sectionName, updatedContent);
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const renderHeroSectionEditor = () => {
    const heroContent = content.find(c => c.section_name === 'hero_section');
    if (!heroContent) return null;

    const updateHeroContent = (field: string, value: any) => {
      const updatedContent = {
        ...heroContent.content,
        [field]: value
      };
      updateContent('hero_section', updatedContent);
    };

    const updateTrustIndicator = (field: string, value: string) => {
      const updatedContent = {
        ...heroContent.content,
        trust_indicators: {
          ...heroContent.content.trust_indicators,
          [field]: value
        }
      };
      updateContent('hero_section', updatedContent);
    };

    const updateFeature = (index: number, value: string) => {
      const updatedFeatures = [...heroContent.content.features];
      updatedFeatures[index] = value;
      updateHeroContent('features', updatedFeatures);
    };

    const addFeature = () => {
      const updatedFeatures = [...heroContent.content.features, 'New Feature'];
      updateHeroContent('features', updatedFeatures);
    };

    const removeFeature = (index: number) => {
      const updatedFeatures = heroContent.content.features.filter((_: any, i: number) => i !== index);
      updateHeroContent('features', updatedFeatures);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hero-title">Title</Label>
            <Input
              id="hero-title"
              value={heroContent.content.title || ''}
              onChange={(e) => updateHeroContent('title', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">Subtitle</Label>
            <Input
              id="hero-subtitle"
              value={heroContent.content.subtitle || ''}
              onChange={(e) => updateHeroContent('subtitle', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="hero-description">Description</Label>
          <Textarea
            id="hero-description"
            value={heroContent.content.description || ''}
            onChange={(e) => updateHeroContent('description', e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="hero-badge">Badge Text</Label>
          <Input
            id="hero-badge"
            value={heroContent.content.badge_text || ''}
            onChange={(e) => updateHeroContent('badge_text', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cta-primary">Primary CTA</Label>
            <Input
              id="cta-primary"
              value={heroContent.content.cta_primary || ''}
              onChange={(e) => updateHeroContent('cta_primary', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="cta-secondary">Secondary CTA</Label>
            <Input
              id="cta-secondary"
              value={heroContent.content.cta_secondary || ''}
              onChange={(e) => updateHeroContent('cta_secondary', e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Features</Label>
            <Button size="sm" onClick={addFeature}>
              <Plus className="w-4 h-4 mr-1" />
              Add Feature
            </Button>
          </div>
          <div className="space-y-2">
            {heroContent.content.features?.map((feature: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFeature(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold">Trust Indicators</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                value={heroContent.content.trust_indicators?.rating || ''}
                onChange={(e) => updateTrustIndicator('rating', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={heroContent.content.trust_indicators?.experience || ''}
                onChange={(e) => updateTrustIndicator('experience', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="customers">Customers</Label>
              <Input
                id="customers"
                value={heroContent.content.trust_indicators?.customers || ''}
                onChange={(e) => updateTrustIndicator('customers', e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold">Background Image</Label>
          <div className="mt-2">
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file, 'hero_section', 'background_image');
                  }
                }}
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-1" />
                Upload
              </Button>
            </div>
            {heroContent.content.background_image && (
              <img
                src={heroContent.content.background_image}
                alt="Background"
                className="mt-2 h-32 w-48 object-cover rounded border"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderHeaderEditor = () => {
    const headerContent = content.find(c => c.section_name === 'header_content');
    if (!headerContent) return null;

    const updateHeaderContent = (field: string, value: string) => {
      const updatedContent = {
        ...headerContent.content,
        [field]: value
      };
      updateContent('header_content', updatedContent);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              value={headerContent.content.company_name || ''}
              onChange={(e) => updateHeaderContent('company_name', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="logo-text">Logo Text</Label>
            <Input
              id="logo-text"
              value={headerContent.content.logo_text || ''}
              onChange={(e) => updateHeaderContent('logo_text', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contact-phone">Contact Phone</Label>
            <Input
              id="contact-phone"
              value={headerContent.content.contact_phone || ''}
              onChange={(e) => updateHeaderContent('contact_phone', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={headerContent.content.contact_email || ''}
              onChange={(e) => updateHeaderContent('contact_email', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="top-bar-message">Top Bar Message</Label>
          <Input
            id="top-bar-message"
            value={headerContent.content.top_bar_message || ''}
            onChange={(e) => updateHeaderContent('top_bar_message', e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderFooterEditor = () => {
    const footerContent = content.find(c => c.section_name === 'footer_content');
    if (!footerContent) return null;

    const updateFooterContent = (field: string, value: any) => {
      const updatedContent = {
        ...footerContent.content,
        [field]: value
      };
      updateContent('footer_content', updatedContent);
    };

    const updateSocialLink = (platform: string, url: string) => {
      const updatedContent = {
        ...footerContent.content,
        social_links: {
          ...footerContent.content.social_links,
          [platform]: url
        }
      };
      updateContent('footer_content', updatedContent);
    };

    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="company-description">Company Description</Label>
          <Textarea
            id="company-description"
            value={footerContent.content.company_description || ''}
            onChange={(e) => updateFooterContent('company_description', e.target.value)}
            rows={3}
          />
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold">Social Media Links</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={footerContent.content.social_links?.facebook || ''}
                onChange={(e) => updateSocialLink('facebook', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={footerContent.content.social_links?.instagram || ''}
                onChange={(e) => updateSocialLink('instagram', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                value={footerContent.content.social_links?.youtube || ''}
                onChange={(e) => updateSocialLink('youtube', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Homepage Management</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Homepage Management</CardTitle>
        <CardDescription>
          Customize your homepage content, images, and layout
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Hero Section Content</h3>
              <Badge variant="secondary">Dynamic Content</Badge>
            </div>
            {renderHeroSectionEditor()}
          </TabsContent>

          <TabsContent value="header" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Header Content</h3>
              <Badge variant="secondary">Dynamic Content</Badge>
            </div>
            {renderHeaderEditor()}
          </TabsContent>

          <TabsContent value="footer" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Footer Content</h3>
              <Badge variant="secondary">Dynamic Content</Badge>
            </div>
            {renderFooterEditor()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HomepageManagement;