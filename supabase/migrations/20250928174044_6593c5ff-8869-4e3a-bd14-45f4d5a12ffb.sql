-- Create homepage content management table
CREATE TABLE public.homepage_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  section_name TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;

-- Create policies for homepage content
CREATE POLICY "Homepage content is viewable by everyone" 
ON public.homepage_content 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admin can manage homepage content" 
ON public.homepage_content 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_homepage_content_updated_at
BEFORE UPDATE ON public.homepage_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default homepage content
INSERT INTO public.homepage_content (section_name, content) VALUES 
('hero_section', '{
  "title": "Premium Quality",
  "subtitle": "Tractors for Modern Farming",
  "description": "Discover our range of high-performance PowerTrac tractors designed for efficiency, durability, and maximum productivity on your farm.",
  "background_image": "/src/assets/hero-tractor.jpg",
  "badge_text": "⭐ #1 PowerTrac Dealer in the Region",
  "features": ["Best Price Guarantee", "Expert After-Sales Service", "Easy Finance Options", "Free On-Site Demo"],
  "cta_primary": "Book Free Demo",
  "cta_secondary": "Call Now",
  "trust_indicators": {
    "rating": "4.8/5 Customer Rating",
    "experience": "15+ Years of Trusted Service", 
    "customers": "5000+ Happy Farmers"
  }
}'::jsonb),
('header_content', '{
  "company_name": "PowerTrac Dealers",
  "logo_text": "PowerTrac",
  "contact_phone": "+919876543210",
  "contact_email": "info@powertracdealer.com",
  "top_bar_message": "Call us for the best deals on PowerTrac tractors!"
}'::jsonb),
('footer_content', '{
  "company_description": "Your trusted PowerTrac dealer offering premium tractors, expert service, and financing solutions for modern farming needs.",
  "social_links": {
    "facebook": "https://facebook.com/powertracdealer",
    "instagram": "https://instagram.com/powertracdealer", 
    "youtube": "https://youtube.com/@powertracdealer"
  },
  "quick_links": ["Home", "About", "Tractors", "Services", "Finance", "Contact"],
  "services": ["Tractor Sales", "After-Sales Service", "Spare Parts", "Finance Options", "Insurance"]
}'::jsonb);