-- Create storage bucket for tractor images
INSERT INTO storage.buckets (id, name, public) VALUES ('tractor-images', 'tractor-images', true);

-- Create RLS policies for tractor images bucket
CREATE POLICY "Admin can upload tractor images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'tractor-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can update tractor images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'tractor-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete tractor images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'tractor-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Tractor images are publicly viewable" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tractor-images');

-- Create contact_info table for admin to manage contact details
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  showroom_address TEXT NOT NULL,
  opening_hours TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contact_info table
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_info
CREATE POLICY "Contact info is viewable by everyone" 
ON public.contact_info 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage contact info" 
ON public.contact_info 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Add trigger for updating timestamps
CREATE TRIGGER update_contact_info_updated_at
BEFORE UPDATE ON public.contact_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default contact info
INSERT INTO public.contact_info (phone, email, showroom_address, opening_hours) 
VALUES (
  '+91 9876543210',
  'sales@powertrac.com',
  '123 Tractor Showroom, Industrial Area, Delhi, India - 110001',
  'Monday to Saturday: 9:00 AM - 7:00 PM, Sunday: 10:00 AM - 5:00 PM'
);