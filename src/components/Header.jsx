import React, { useState } from "react";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Search, 
  ShoppingBag, 
  Heart, 
  Video, 
  Globe, 
  Menu, 
  X, 
  Crown,
  ChevronDown,
  Mic,
  MicOff
} from "lucide-react";
import { InstagramIcon } from "./Icons";
import { STORE_CONFIG } from "../data/config";
import { formatPrice } from "../utils/helpers";

export default function Header({ 
  currency, 
  setCurrency, 
  cartCount, 
  cartTotalINR, 
  setIsCartOpen, 
  wishlistCount, 
  setIsVideoCallOpen, 
  searchTerm, 
  setSearchTerm,
  onWholesaleClick,
  onStoreClick
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please try using Google Chrome, Edge, or Safari!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      setVoiceStatus("");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatus("🎙️ Listening... Speak now (e.g. Navratri Choli, Patola Saree, Lehenga)");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearchTerm(transcript);
          setVoiceStatus(`✓ Found: "${transcript}"`);
          setTimeout(() => setVoiceStatus(""), 3500);
          
          // Smooth jump to catalog
          const elem = document.getElementById("catalog-section");
          if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
          }
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition notice:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          alert("Microphone permission was denied. Please enable microphone access in your browser to use voice search.");
        }
        setVoiceStatus("");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Speech recognition error:", err);
      setIsListening(false);
      setVoiceStatus("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#D4AF37]/30 transition-all">
      {/* Top Royal Announcement Bar */}
      <div className="bg-gradient-to-r from-[#38000A] via-[#680516] to-[#38000A] text-white py-1.5 px-3 border-b border-[#D4AF37]/40 text-xs">
        <div className="rk-container flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium tracking-wide truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#FFE082] animate-pulse flex-shrink-0" />
            <span className="hidden sm:inline font-bold text-[#FFF0A8]">Surat Wholesale Hub:</span>
            <span className="text-[#FFF0A8] sm:text-white truncate">Direct Factory Rates • Worldwide Air Shipping</span>
          </div>

          <div className="flex items-center gap-3 text-xs flex-shrink-0">
            <a 
              href={STORE_CONFIG.instagramUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex items-center gap-1 hover:text-[#FFF0A8] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden lg:inline">@{STORE_CONFIG.instagramHandle}</span>
            </a>

            <a 
              href={`tel:${STORE_CONFIG.phone}`} 
              className="flex items-center gap-1 text-[#FFF0A8] hover:text-white transition-colors font-bold text-[11px] sm:text-xs"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFE082]" />
              <span className="hidden sm:inline">{STORE_CONFIG.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <div className="rk-container py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo & Brand Crest */}
          <a href="#" className="flex items-center gap-2.5 text-decoration-none group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#780016] to-[#3F000B] border border-[#D4AF37] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Crown className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#4A000E]">
                  RK CREATION
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-[#FAF2D8] text-[#8C6B1B] border border-[#D4AF37]/50">
                  SURAT
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#7A5B0B] font-medium tracking-wide">
                Luxury Ethnic & Silk Couture
              </p>
            </div>
          </a>

          {/* Search Bar with Integrated Voice Search Button (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={isListening ? "Listening... Speak your search" : "Search Navratri, Lehengas, Patola, SKUs..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-20 py-2 text-sm bg-[#FAF7F2] border rounded-full focus:outline-none focus:bg-white transition-all shadow-inner ${
                  isListening 
                    ? "border-[#E91E63] ring-2 ring-[#E91E63]/30 bg-rose-50/50" 
                    : "border-[#D4AF37]/40 focus:border-[#780016]"
                }`}
              />
              <Search className="w-4 h-4 text-[#7A5B0B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              
              {/* Right Side Buttons: Clear + Voice Search Mic */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="p-1 text-xs text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Voice Search Mic Button */}
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  title={isListening ? "Stop Voice Search" : "Search by Voice"}
                  className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
                    isListening 
                      ? "bg-rose-600 text-white animate-pulse shadow-md ring-2 ring-rose-300 scale-110" 
                      : "bg-[#FAF2D8] text-[#780016] hover:bg-[#780016] hover:text-white border border-[#D4AF37]/50 active:scale-95"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-3.5 h-3.5" />
                  ) : (
                    <Mic className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Hub & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/40 bg-[#FAF7F2] hover:bg-white text-[#4A000E] transition-all"
                title="Change Currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currency} ({STORE_CONFIG.currencies[currency].symbol.trim()})</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-[#D4AF37]/30 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Select Currency
                  </div>
                  {Object.entries(STORE_CONFIG.currencies).map(([code, info]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#FAF2D8] transition-colors ${
                        currency === code ? "font-bold text-[#780016] bg-[#FAF2D8]/60" : "text-gray-700"
                      }`}
                    >
                      <span>{code} — {info.name}</span>
                      <span className="font-semibold">{info.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Video Call Shopping CTA */}
            <button
              onClick={() => setIsVideoCallOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-[#780016] bg-gradient-to-r from-[#FFF6D6] to-[#F5DEB3] hover:from-[#F5DEB3] hover:to-[#E5C358] border border-[#D4AF37] px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <Video className="w-3.5 h-3.5 text-[#780016]" />
              <span>Live Video Call</span>
            </button>

            {/* Quotation Bag / Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#780016] to-[#4A000E] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#D4AF37]/60 shadow-md hover:shadow-lg hover:from-[#8E0A20] hover:to-[#680516] transition-all relative group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3E5AB]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#25D366] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-[#F3E5AB] block leading-none font-semibold uppercase tracking-wider">
                  Quotation Bag
                </span>
                <span className="text-xs font-bold leading-tight">
                  {cartCount === 0 ? "0 Items" : formatPrice(cartTotalINR, currency)}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#4A000E] hover:bg-[#FAF7F2] rounded-lg border border-gray-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Voice Search Live Status Banner (when recording) */}
        {voiceStatus && (
          <div className="mt-2 text-xs font-medium text-center py-1.5 px-3 rounded-xl bg-[#FAF2D8] border border-[#D4AF37] text-[#780016] animate-in fade-in flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span>{voiceStatus}</span>
          </div>
        )}

        {/* Mobile Search Bar with Voice Search Mic Button */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={isListening ? "Listening... Speak now" : "Search Navratri, Lehengas, Kurtis..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-16 py-2 text-xs bg-[#FAF7F2] border rounded-full focus:outline-none focus:bg-white ${
                isListening 
                  ? "border-[#E91E63] ring-2 ring-[#E91E63]/30 bg-rose-50/50" 
                  : "border-[#D4AF37]/30 focus:border-[#780016]"
              }`}
            />
            <Search className="w-3.5 h-3.5 text-[#7A5B0B] absolute left-3 top-1/2 -translate-y-1/2" />
            
            {/* Mobile Clear & Voice Search Mic */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="p-1 text-[10px] text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              <button
                type="button"
                onClick={handleVoiceSearch}
                title={isListening ? "Stop Listening" : "Search by Voice"}
                className={`p-1.5 rounded-full transition-all flex items-center justify-center ${
                  isListening 
                    ? "bg-rose-600 text-white animate-pulse ring-2 ring-rose-300 scale-105" 
                    : "bg-[#FAF2D8] text-[#780016] border border-[#D4AF37]/50 active:scale-95"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-3 h-3" />
                ) : (
                  <Mic className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 pt-3 border-t border-[#D4AF37]/20 flex flex-col gap-2.5 md:hidden animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => {
                setIsVideoCallOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left font-semibold text-xs text-[#780016] bg-[#FAF2D8] rounded-lg border border-[#D4AF37]/40 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Book Live Showroom Video Call
              </span>
              <span className="text-[10px] bg-[#780016] text-white px-2 py-0.5 rounded-full">Free</span>
            </button>

            <button
              onClick={() => {
                onWholesaleClick && onWholesaleClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left font-semibold text-xs text-[#1A1A1A] hover:bg-[#FAF7F2] rounded-lg flex items-center justify-between"
            >
              <span>👑 Wholesale B2B & Reseller Portal</span>
              <span className="text-[#8C6B1B]">→</span>
            </button>

            <button
              onClick={() => {
                onStoreClick && onStoreClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left font-semibold text-xs text-[#1A1A1A] hover:bg-[#FAF7F2] rounded-lg flex items-center justify-between"
            >
              <span>📍 Visit Tirupati Market Surat Showroom</span>
              <span className="text-[#8C6B1B]">→</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
