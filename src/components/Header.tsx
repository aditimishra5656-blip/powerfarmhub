import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Tractors", href: "#tractors" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-powertrac-blue text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Visit our showroom today!</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Authorized PowerTrac Dealer | Best Prices Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-powertrac-blue">
                Power<span className="text-powertrac-orange">Trac</span>
                <div className="text-sm font-normal text-powertrac-gray">Authorized Dealer</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-powertrac-gray hover:text-powertrac-blue font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Button className="hidden md:flex bg-powertrac-orange hover:bg-powertrac-orange/90 text-white font-semibold">
                Get Quote Now
              </Button>
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
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-powertrac-gray hover:text-powertrac-blue font-medium px-4 py-2"
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="mx-4 bg-powertrac-orange hover:bg-powertrac-orange/90 text-white font-semibold">
                  Get Quote Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;