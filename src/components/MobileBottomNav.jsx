import React from "react";
import { Sparkles, ShoppingBag, Flame, MessageCircle, Crown } from "lucide-react";
import { generateGeneralInquiryWhatsAppUrl } from "../utils/helpers";

export default function MobileBottomNav({
  cartCount,
  setIsCartOpen,
  onExploreClick,
  onNavratriClick,
  onWholesaleClick,
  isWholesaleMode
}) {
  const handleWhatsApp = () => {
    const url = generateGeneralInquiryWhatsAppUrl("Mobile App Bottom Bar Quick Inquiry");
    window.open(url, "_blank");
  };

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t-2 border-[#D4AF37]/50 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] pb-safe"
    >
      <div className="grid grid-cols-5 items-center justify-around py-1 px-1">
        
        {/* 1. Explore Catalog */}
        <button
          onClick={onExploreClick}
          className="flex flex-col items-center justify-center py-1.5 text-gray-700 hover:text-[#780016] active:scale-95 transition-all"
        >
          <Sparkles className="w-5 h-5 text-[#8C6B1B]" />
          <span className="text-[10px] font-semibold mt-0.5">Catalog</span>
        </button>

        {/* 2. Navratri 2026 Special */}
        <button
          onClick={onNavratriClick}
          className="flex flex-col items-center justify-center py-1.5 text-[#D81B60] active:scale-95 transition-all relative"
        >
          <div className="relative">
            <Flame className="w-5 h-5 text-[#E91E63] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E91E63] animate-ping" />
          </div>
          <span className="text-[10px] font-bold mt-0.5 text-[#C2185B]">Navratri</span>
        </button>

        {/* 3. WhatsApp Center Action Button */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center -mt-4 active:scale-90 transition-all"
          title="Direct WhatsApp Order"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-[#25D366]/40">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <span className="text-[10px] font-bold text-[#128C7E] mt-0.5">WhatsApp</span>
        </button>

        {/* 4. Wholesale Mode Toggle */}
        <button
          onClick={onWholesaleClick}
          className={`flex flex-col items-center justify-center py-1.5 active:scale-95 transition-all ${
            isWholesaleMode ? "text-[#780016] font-bold" : "text-gray-700"
          }`}
        >
          <Crown className={`w-5 h-5 ${isWholesaleMode ? "text-[#D4AF37]" : "text-gray-600"}`} />
          <span className="text-[10px] font-semibold mt-0.5">
            {isWholesaleMode ? "Wholesale ✓" : "Wholesale"}
          </span>
        </button>

        {/* 5. Quotation Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1.5 text-gray-700 hover:text-[#780016] active:scale-95 transition-all relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#780016]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#25D366] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Bag</span>
        </button>

      </div>
    </nav>
  );
}
