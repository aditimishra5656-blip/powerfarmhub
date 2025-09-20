-- Add labels column to tractors table
ALTER TABLE public.tractors 
ADD COLUMN labels text[] DEFAULT '{}';

-- Add index for better performance when filtering by labels
CREATE INDEX idx_tractors_labels ON public.tractors USING GIN(labels);