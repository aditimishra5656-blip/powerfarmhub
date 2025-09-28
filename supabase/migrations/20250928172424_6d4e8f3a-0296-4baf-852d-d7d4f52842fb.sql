-- Create an enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy for user_roles table - users can only see their own roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Admins can manage all roles
CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Drop existing insecure policies for quotes table
DROP POLICY IF EXISTS "Admin can view quotes" ON public.quotes;
DROP POLICY IF EXISTS "Admin can update quotes" ON public.quotes;

-- Create new secure admin-only policies for quotes
CREATE POLICY "Admin can view quotes" 
ON public.quotes 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin can update quotes" 
ON public.quotes 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Drop existing insecure policies for service_bookings table
DROP POLICY IF EXISTS "Admin can view service bookings" ON public.service_bookings;
DROP POLICY IF EXISTS "Admin can update service bookings" ON public.service_bookings;

-- Create new secure admin-only policies for service_bookings
CREATE POLICY "Admin can view service bookings" 
ON public.service_bookings 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin can update service bookings" 
ON public.service_bookings 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Insert admin role for existing users (assuming current users should be admins)
INSERT INTO public.user_roles (user_id, role)
SELECT DISTINCT user_id, 'admin'::app_role
FROM public.profiles
WHERE user_id IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;