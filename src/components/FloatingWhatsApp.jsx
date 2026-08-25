import React, { useState } from "react";
import { MessageCircle, X, Sparkles, Video, FileText, MapPin, ChevronRight } from "lucide-react";
import { STORE_CONFIG } from "../data/config";
import { generateGeneralInquiryWhatsAppUrl } from "../utils/helpers";

export default function FloatingWhatsApp({ setIsVideoCallOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#4A000E] via-[#780016] to-[#4A000E] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h4 className="font-serif text-xs font-bold text-white">
                  RK Creation Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#F3E5AB]">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Online • Surat Showroom</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Options */}
          <div className="p-3 space-y-2 bg-[#FAF7F2]">
            <p className="text-[11px] text-gray-600 px-1">
              Namaste! How can we assist you with our Surat silk & bridal catalog today?
            </p>

            <a
              href={generateGeneralInquiryWhatsAppUrl("Live Saree & Bridal Inquiry")}
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 rounded-xl bg-white border border-[#D4AF37]/40 hover:border-[#780016] text-left flex items-center justify-between text-xs font-semibold text-[#4A000E] shadow-sm hover:shadow transition-all group"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat with Surat Sales Team</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#780016]" />
            </a>

            <a
              href={generateGeneralInquiryWhatsAppUrl("Request 2026 Wholesale PDF Catalog")}
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 rounded-xl bg-white border border-[#D4AF37]/40 hover:border-[#780016] text-left flex items-center justify-between text-xs font-semibold text-[#4A000E] shadow-sm hover:shadow transition-all group"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>Get 2026 Wholesale PDF Catalog</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#780016]" />
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                setIsVideoCallOpen(true);
              }}
              className="w-full p-2.5 rounded-xl bg-white border border-[#D4AF37]/40 hover:border-[#780016] text-left flex items-center justify-between text-xs font-semibold text-[#4A000E] shadow-sm hover:shadow transition-all group"
            >
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#780016]" />
                <span>Book Live Video Call Session</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#780016]" />
            </button>

            <a
              href={STORE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 rounded-xl bg-white border border-[#D4AF37]/40 hover:border-[#780016] text-left flex items-center justify-between text-xs font-semibold text-[#4A000E] shadow-sm hover:shadow transition-all group"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8C6B1B]" />
                <span>Showroom Location & Directions</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#780016]" />
            </a>
          </div>

        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 border-2 border-white transition-all animate-pulse-glow"
        title="WhatsApp Assistant"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">Order via WhatsApp</span>
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
      </button>

    </div>
  );
}
