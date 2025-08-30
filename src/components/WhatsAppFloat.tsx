import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
  const message = "Hi! I'm interested in PowerTrac tractors. Can you help me?";
  
  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`transition-all duration-300 ${isOpen ? 'mb-4' : ''}`}>
          {isOpen && (
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 max-w-xs border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">PowerTrac Support</p>
                    <p className="text-xs text-green-500">Online</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Hi! How can we help you with PowerTrac tractors today?
              </p>
              <button 
                onClick={openWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-lg transition-colors"
              >
                Start Chat
              </button>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </>
  );
};

export default WhatsAppFloat;