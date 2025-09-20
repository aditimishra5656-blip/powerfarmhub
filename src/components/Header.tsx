import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QuoteForm } from "@/components/CTAForms";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

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
    <>
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
            <span>{t('header.authorizedDealer')}</span>
            <LanguageSwitcher />
            <Button asChild variant="outline" size="sm" className="text-powertrac-blue border-white hover:bg-white hover:text-powertrac-blue">
              <Link to="/auth">{t('header.adminLogin')}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-powertrac-blue">
                Power<span className="text-powertrac-orange">Trac</span>
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
      </header>
    </>
  );
};

export default Header;