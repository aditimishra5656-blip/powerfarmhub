-- Seed default tractors if they don't already exist
INSERT INTO public.tractors (
  name, model, hp, fuel_efficiency, lifting_capacity, price_range, features, image_url, is_popular
)
SELECT 'PowerTrac 439 DS', '439 DS', '42 HP', '3.8 L/hr', '1500 kg', '₹6.25 - ₹6.85 Lakh',
  ARRAY['Power Steering Standard','Advanced Hydraulic System','Heavy Duty Transmission','Superior Fuel Economy'],
  '/images/tractor-439.jpg', true
WHERE NOT EXISTS (
  SELECT 1 FROM public.tractors t WHERE t.name = 'PowerTrac 439 DS'
);

INSERT INTO public.tractors (
  name, model, hp, fuel_efficiency, lifting_capacity, price_range, features, image_url, is_popular
)
SELECT 'PowerTrac 451 DS Plus', '451 DS Plus', '50 HP', '4.2 L/hr', '1800 kg', '₹7.15 - ₹7.95 Lakh',
  ARRAY['Digital Display Panel','Advanced PTO System','Premium Comfort Seat','Enhanced Hydraulics'],
  '/images/tractor-451.jpg', false
WHERE NOT EXISTS (
  SELECT 1 FROM public.tractors t WHERE t.name = 'PowerTrac 451 DS Plus'
);

INSERT INTO public.tractors (
  name, model, hp, fuel_efficiency, lifting_capacity, price_range, features, image_url, is_popular
)
SELECT 'PowerTrac 434 DS', '434 DS', '38 HP', '3.5 L/hr', '1200 kg', '₹5.65 - ₹6.25 Lakh',
  ARRAY['Compact Design','Easy Maneuverability','Cost Effective','Reliable Performance'],
  '/images/tractor-434.jpg', false
WHERE NOT EXISTS (
  SELECT 1 FROM public.tractors t WHERE t.name = 'PowerTrac 434 DS'
);