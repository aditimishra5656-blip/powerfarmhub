import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      tractors: "Tractors",
      services: "Services",
      finance: "Finance",
      testimonials: "Testimonials",
      contact: "Contact"
    },
    header: {
      phone: "+91 98765 43210",
      visitShowroom: "Visit our showroom today!",
      authorizedDealer: "Authorized PowerTrac Dealer | Best Prices Guaranteed",
      adminLogin: "Admin Login",
      getQuote: "Get Quote Now"
    },
    hero: {
      title: "Premium PowerTrac Tractors",
      subtitle: "Authorized Dealer with Best Prices",
      description: "Discover our range of reliable, efficient PowerTrac tractors. From compact utility models to heavy-duty farming solutions, we have the perfect tractor for your agricultural needs.",
      bookDemo: "Book Free Demo Today",
      callNow: "Call Now: +91 98765 43210",
      stats: {
        tractorsDelivered: "Tractors Delivered",
        happyFarmers: "Happy Farmers",
        serviceStations: "Service Stations",
        warrantySupport: "Warranty Support"
      }
    },
    tractors: {
      title: "Our Featured Tractors",
      subtitle: "Choose from our premium collection",
      mostPopular: "Most Popular",
      horsepower: "Horsepower",
      fuelEfficiency: "Fuel Efficiency",
      liftingCapacity: "Lifting Capacity",
      keyFeatures: "Key Features:",
      getQuote: "Get Quote",
      callForSupport: "Call for instant support"
    },
    features: {
      title: "Why Choose Our PowerTrac Tractors?",
      powerEfficiency: {
        title: "Power & Efficiency",
        description: "Advanced engine technology delivering optimal power-to-fuel ratio for maximum productivity and cost savings."
      },
      reliability: {
        title: "Proven Reliability",
        description: "Built to last with robust construction and rigorous testing. Our tractors work as hard as you do."
      },
      support: {
        title: "24/7 Support",
        description: "Comprehensive after-sales service with nationwide network. We're here when you need us most."
      },
      finance: {
        title: "Easy Financing",
        description: "Flexible payment options and attractive loan schemes to make your tractor purchase affordable."
      }
    },
    cta: {
      title: "Ready to Transform Your Farming?",
      subtitle: "Get in touch with our experts today",
      bookDemo: "Book Free Demo",
      callNow: "Call Now: +91 98765 43210"
    },
    forms: {
      quote: {
        title: "Get Quote",
        name: "Full Name",
        phone: "Phone Number",
        email: "Email (Optional)",
        tractorModel: "Tractor Model",
        location: "Your Location",
        message: "Additional Requirements",
        submit: "Submit Quote Request",
        success: "Quote request submitted successfully!",
        error: "Failed to submit quote request"
      },
      demo: {
        title: "Book Free Demo",
        serviceType: "Service Type",
        tractorModel: "Tractor Model (Optional)",
        preferredDate: "Preferred Date",
        submit: "Book Demo",
        success: "Demo booked successfully!",
        error: "Failed to book demo"
      },
      contact: {
        title: "Contact Us",
        submit: "Send Message",
        success: "Message sent successfully!",
        error: "Failed to send message"
      }
    },
    footer: {
      aboutUs: "About Us",
      aboutText: "Your trusted PowerTrac dealer with years of experience in providing quality tractors and exceptional service to farmers across the region.",
      quickLinks: "Quick Links",
      contactInfo: "Contact Info",
      followUs: "Follow Us",
      rights: "All rights reserved."
    }
  },
  hi: {
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      tractors: "ट्रैक्टर",
      services: "सेवाएं",
      finance: "वित्त",
      testimonials: "प्रशंसापत्र",
      contact: "संपर्क"
    },
    header: {
      phone: "+91 98765 43210",
      visitShowroom: "आज ही हमारे शोरूम में आएं!",
      authorizedDealer: "अधिकृत पावरट्रैक डीलर | सर्वोत्तम मूल्य की गारंटी",
      adminLogin: "व्यवस्थापक लॉगिन",
      getQuote: "अभी कोटेशन पाएं"
    },
    hero: {
      title: "प्रीमियम पावरट्रैक ट्रैक्टर",
      subtitle: "सर्वोत्तम मूल्यों के साथ अधिकृत डीलर",
      description: "हमारे विश्वसनीय, कुशल पावरट्रैक ट्रैक्टरों की श्रृंखला की खोज करें। कॉम्पैक्ट उपयोगिता मॉडल से लेकर भारी-शुल्क कृषि समाधान तक, हमारे पास आपकी कृषि आवश्यकताओं के लिए सही ट्रैक्टर है।",
      bookDemo: "आज ही मुफ्त डेमो बुक करें",
      callNow: "अभी कॉल करें: +91 98765 43210",
      stats: {
        tractorsDelivered: "ट्रैक्टर डिलीवर किए गए",
        happyFarmers: "खुश किसान",
        serviceStations: "सेवा केंद्र",
        warrantySupport: "वारंटी सहायता"
      }
    },
    tractors: {
      title: "हमारे फीचर्ड ट्रैक्टर",
      subtitle: "हमारे प्रीमियम संग्रह से चुनें",
      mostPopular: "सबसे लोकप्रिय",
      horsepower: "हॉर्सपावर",
      fuelEfficiency: "ईंधन दक्षता",
      liftingCapacity: "उठाने की क्षमता",
      keyFeatures: "मुख्य विशेषताएं:",
      getQuote: "कोटेशन पाएं",
      callForSupport: "तत्काल सहायता के लिए कॉल करें"
    },
    features: {
      title: "हमारे पावरट्रैक ट्रैक्टर क्यों चुनें?",
      powerEfficiency: {
        title: "शक्ति और दक्षता",
        description: "अधिकतम उत्पादकता और लागत बचत के लिए इष्टतम पावर-टू-फ्यूल अनुपात देने वाली उन्नत इंजन तकनीक।"
      },
      reliability: {
        title: "सिद्ध विश्वसनीयता",
        description: "मजबूत निर्माण और कठोर परीक्षण के साथ टिकाऊ। हमारे ट्रैक्टर उतनी ही मेहनत करते हैं जितनी आप करते हैं।"
      },
      support: {
        title: "24/7 सहायता",
        description: "राष्ट्रव्यापी नेटवर्क के साथ व्यापक बिक्री-पश्चात सेवा। जब आपको हमारी सबसे ज्यादा जरूरत है, तब हम यहां हैं।"
      },
      finance: {
        title: "आसान वित्तपोषण",
        description: "आपकी ट्रैक्टर खरीदारी को किफायती बनाने के लिए लचीले भुगतान विकल्प और आकर्षक ऋण योजनाएं।"
      }
    },
    cta: {
      title: "अपनी खेती को बदलने के लिए तैयार हैं?",
      subtitle: "आज ही हमारे विशेषज्ञों से संपर्क करें",
      bookDemo: "मुफ्त डेमो बुक करें",
      callNow: "अभी कॉल करें: +91 98765 43210"
    },
    forms: {
      quote: {
        title: "कोटेशन पाएं",
        name: "पूरा नाम",
        phone: "फोन नंबर",
        email: "ईमेल (वैकल्पिक)",
        tractorModel: "ट्रैक्टर मॉडल",
        location: "आपका स्थान",
        message: "अतिरिक्त आवश्यकताएं",
        submit: "कोटेशन अनुरोध भेजें",
        success: "कोटेशन अनुरोध सफलतापूर्वक भेजा गया!",
        error: "कोटेशन अनुरोध भेजने में विफल"
      },
      demo: {
        title: "मुफ्त डेमो बुक करें",
        serviceType: "सेवा प्रकार",
        tractorModel: "ट्रैक्टर मॉडल (वैकल्पिक)",
        preferredDate: "पसंदीदा तारीख",
        submit: "डेमो बुक करें",
        success: "डेमो सफलतापूर्वक बुक किया गया!",
        error: "डेमो बुक करने में विफल"
      },
      contact: {
        title: "हमसे संपर्क करें",
        submit: "संदेश भेजें",
        success: "संदेश सफलतापूर्वक भेजा गया!",
        error: "संदेश भेजने में विफल"
      }
    },
    footer: {
      aboutUs: "हमारे बारे में",
      aboutText: "पूरे क्षेत्र के किसानों को गुणवत्तापूर्ण ट्रैक्टर और असाधारण सेवा प्रदान करने में वर्षों के अनुभव के साथ आपका विश्वसनीय पावरट्रैक डीलर।",
      quickLinks: "त्वरित लिंक",
      contactInfo: "संपर्क जानकारी",
      followUs: "हमें फॉलो करें",
      rights: "सभी अधिकार सुरक्षित।"
    }
  }
};