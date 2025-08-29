-- Create tractors table
CREATE TABLE public.tractors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  hp TEXT NOT NULL,
  fuel_efficiency TEXT NOT NULL,
  lifting_capacity TEXT NOT NULL,
  price_range TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quotes table
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  tractor_model TEXT NOT NULL,
  location TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service_bookings table
CREATE TABLE public.service_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_type TEXT NOT NULL,
  tractor_model TEXT,
  location TEXT,
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to tractors
CREATE POLICY "Tractors are viewable by everyone" 
ON public.tractors 
FOR SELECT 
USING (true);

-- Create policies for public insert access to quotes and service bookings
CREATE POLICY "Anyone can submit quotes" 
ON public.quotes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit service bookings" 
ON public.service_bookings 
FOR INSERT 
WITH CHECK (true);

-- For admin access (you'll need to implement authentication later)
-- For now, allowing full access - you should restrict this to admin users only
CREATE POLICY "Admin can manage tractors" 
ON public.tractors 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin can view quotes" 
ON public.quotes 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can update quotes" 
ON public.quotes 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can view service bookings" 
ON public.service_bookings 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can update service bookings" 
ON public.service_bookings 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_tractors_updated_at
  BEFORE UPDATE ON public.tractors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_bookings_updated_at
  BEFORE UPDATE ON public.service_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER TABLE public.tractors REPLICA IDENTITY FULL;
ALTER TABLE public.quotes REPLICA IDENTITY FULL;
ALTER TABLE public.service_bookings REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.tractors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quotes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_bookings;