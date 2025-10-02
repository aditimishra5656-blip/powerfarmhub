import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube,
  MessageCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactInfo {
  phone: string;
  email: string;
  showroom_address: string;
  opening_hours: string;
}

interface FooterContent {
  company_description?: string;
  social_links?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

const Footer = () => {
  const { t, language } = useLanguage();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [footerContent, setFooterContent] = useState<FooterContent>({ company_description: '', social_links: {} });

  useEffect(() => {
    fetchContactInfo();
    fetchFooterContent();
    
    // Listen for storage events to refresh content when admin updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'footer_updated') {
        fetchFooterContent();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [language]);

  const fetchContactInfo = async () => {
    try {
      // Always fetch English version - contact details are same for all languages
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .eq('language', 'en')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setContactInfo(data);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const fetchFooterContent = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('content')
        .eq('section_name', 'footer_content')
        .eq('language', language)
        .eq('is_active', true)
        .maybeSingle();

      if (!error && data?.content && typeof data.content === 'object') {
        setFooterContent(prev => ({ ...prev, ...(data.content as Partial<FooterContent>) }));
      }
    } catch (error) {
      console.error('Error fetching footer content:', error);
    }
  };
  return (
    <footer className="bg-powertrac-gray text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              Power<span className="text-powertrac-orange">Trac</span>
              <div className="text-sm font-normal opacity-80">Authorized Dealer</div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              {footerContent.company_description || t('footer.aboutText')}
            </p>
            <div className="flex gap-4">
              <Button asChild size="icon" variant="outline" className="border-white/20 text-white hover:bg-powertrac-orange hover:border-powertrac-orange">
                <a href={footerContent.social_links?.facebook || "#"} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild size="icon" variant="outline" className="border-white/20 text-white hover:bg-powertrac-orange hover:border-powertrac-orange">
                <a href={footerContent.social_links?.instagram || "#"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild size="icon" variant="outline" className="border-white/20 text-white hover:bg-powertrac-orange hover:border-powertrac-orange">
                <a href={footerContent.social_links?.youtube || "#"} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('homepage.contactUs')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-powertrac-orange mt-0.5" />
                <div>
                  <div className="font-medium">{contactInfo?.phone || "+91 98765 43210"}</div>
                  <div className="text-sm text-white/70">Sales & Support</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-powertrac-orange mt-0.5" />
                <div>
                  <div className="font-medium">{contactInfo?.email || "info@powertracdealer.com"}</div>
                  <div className="text-sm text-white/70">Email Us Anytime</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-powertrac-orange mt-0.5" />
                <div>
                  <div className="font-medium">{contactInfo?.showroom_address || "123 Industrial Road"}</div>
                  <div className="text-sm text-white/70">{!contactInfo?.showroom_address && "Sector 15, Agricultural Hub, City - 110001"}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-powertrac-orange mt-0.5" />
                <div>
                  <div className="font-medium whitespace-pre-line">{contactInfo?.opening_hours || "Mon - Sat: 9:00 AM - 7:00 PM"}</div>
                  <div className="text-sm text-white/70">{!contactInfo?.opening_hours && "Sunday: 10:00 AM - 5:00 PM"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "#about" },
                { name: "Tractor Models", href: "#tractors" },
                { name: "Our Services", href: "#services" },
                { name: "Customer Reviews", href: "#testimonials" },
                { name: "Finance Options", href: "#finance" },
                { name: "Spare Parts", href: "#parts" },
                { name: "Service Booking", href: "#service" },
                { name: "Contact Us", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-powertrac-orange transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('homepage.ourServices')}</h3>
            <ul className="space-y-2 mb-6">
              {[
                "Tractor Sales & Demo",
                "After-Sales Service", 
                "Genuine Spare Parts",
                "Finance Assistance",
                "Insurance Support",
                "Maintenance Training"
              ].map((service) => (
                <li key={service} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 bg-powertrac-orange rounded-full"></div>
                  {service}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-powertrac-orange hover:bg-powertrac-orange/90 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              {t('homepage.whatsappUs')}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/70">
              © 2024 PowerTrac Authorized Dealer. {t('footer.rights')} | Proudly serving farmers across the region.
            </div>
            <div className="flex gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-powertrac-orange transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-powertrac-orange transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-powertrac-orange transition-colors">Warranty Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;