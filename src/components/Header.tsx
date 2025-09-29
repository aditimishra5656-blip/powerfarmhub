import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QuoteForm } from "@/components/CTAForms";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";

interface HeaderContent {
  company_name: string;
  logo_text: string;
  contact_phone: string;
  contact_email: string;
  top_bar_message: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerContent, setHeaderContent] = useState<HeaderContent>({
    company_name: "PowerTrac",
    logo_text: "PowerTrac",
    contact_phone: "+91 98765 43210",
    contact_email: "info@powertracdealer.com",
    top_bar_message: "Authorized PowerTrac Dealer",
  });
  const { t } = useLanguage();

  useEffect(() => {
    const fetchHeaderContent = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_content')
          .select('content')
          .eq('section_name', 'header_content')
          .eq('is_active', true)
          .maybeSingle();
        if (!error && data?.content) {
          setHeaderContent(prev => ({ ...prev, ...data.content }));
        }
      } catch (err) {
        console.error('Error fetching header content:', err);
      }
    };
    fetchHeaderContent();
  }, []);

  const navItems = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.tractors'), href: "/tractors" },
    { name: t('nav.services'), href: "/services" },
    { name: t('nav.finance'), href: "/finance" },
    { name: t('nav.testimonials'), href: "/testimonials" },
    { name: t('nav.contact'), href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-powertrac-blue text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{t('header.phone')}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{t('header.visitShowroom')}</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>{headerContent.top_bar_message}</span>
            <LanguageSwitcher />
            <Button asChild variant="outline" size="sm" className="text-powertrac-blue border-white hover:bg-white hover:text-powertrac-blue">
              <Link to="/auth">{t('header.adminLogin')}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-powertrac-blue">
                {headerContent.logo_text}
                <div className="text-sm font-normal text-powertrac-gray">Authorized Dealer</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-powertrac-gray hover:text-powertrac-blue font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <QuoteForm triggerText={t('header.getQuote')} />
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-powertrac-gray hover:text-powertrac-blue"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t bg-white py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-powertrac-gray hover:text-powertrac-blue font-medium px-4 py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mx-4 flex flex-col gap-2">
                  <QuoteForm triggerText={t('header.getQuote')} />
                  <LanguageSwitcher />
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;