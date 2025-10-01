-- Add language support to homepage_content table
ALTER TABLE public.homepage_content DROP CONSTRAINT IF EXISTS homepage_content_section_name_key;
ALTER TABLE public.homepage_content ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';
CREATE UNIQUE INDEX IF NOT EXISTS homepage_content_section_language_idx ON public.homepage_content(section_name, language);

-- Add language support to contact_info table
ALTER TABLE public.contact_info ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';

-- Insert Hindi versions of homepage content
INSERT INTO public.homepage_content (section_name, content, language, is_active) VALUES 
('hero_section', '{
  "title": "प्रीमियम गुणवत्ता",
  "subtitle": "आधुनिक खेती के लिए ट्रैक्टर",
  "description": "अपने खेत में दक्षता, स्थायित्व और अधिकतम उत्पादकता के लिए डिज़ाइन किए गए हमारे उच्च-प्रदर्शन पावरट्रैक ट्रैक्टरों की श्रृंखला की खोज करें।",
  "background_image": "/src/assets/hero-tractor.jpg",
  "badge_text": "⭐ क्षेत्र में #1 पावरट्रैक डीलर",
  "features": ["सर्वोत्तम मूल्य गारंटी", "विशेषज्ञ बिक्री-पश्चात सेवा", "आसान वित्त विकल्प", "मुफ्त ऑन-साइट डेमो"],
  "cta_primary": "मुफ्त डेमो बुक करें",
  "cta_secondary": "अभी कॉल करें",
  "trust_indicators": {
    "rating": "4.8/5 ग्राहक रेटिंग",
    "experience": "15+ वर्षों की विश्वसनीय सेवा",
    "customers": "5000+ खुश किसान"
  }
}'::jsonb, 'hi', true),
('header_content', '{
  "company_name": "पावरट्रैक डीलर्स",
  "logo_text": "पावरट्रैक",
  "contact_phone": "+919876543210",
  "contact_email": "info@powertracdealer.com",
  "top_bar_message": "पावरट्रैक ट्रैक्टरों पर सर्वोत्तम सौदों के लिए हमें कॉल करें!"
}'::jsonb, 'hi', true),
('footer_content', '{
  "company_description": "आधुनिक कृषि आवश्यकताओं के लिए प्रीमियम ट्रैक्टर, विशेषज्ञ सेवा और वित्तपोषण समाधान प्रदान करने वाला आपका विश्वसनीय पावरट्रैक डीलर।",
  "social_links": {
    "facebook": "https://facebook.com",
    "instagram": "https://instagram.com",
    "youtube": "https://youtube.com"
  }
}'::jsonb, 'hi', true)
ON CONFLICT (section_name, language) DO UPDATE SET content = EXCLUDED.content;