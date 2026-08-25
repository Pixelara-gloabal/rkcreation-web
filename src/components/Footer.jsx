import React from "react";
import { 
  Crown, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Video, 
  ArrowUp,
  Heart
} from "lucide-react";
import { InstagramIcon } from "./Icons";
import { STORE_CONFIG } from "../data/config";
import { CATEGORIES } from "../data/products";
import { generateGeneralInquiryWhatsAppUrl } from "../utils/helpers";

export default function Footer({ onCategoryClick, setIsVideoCallOpen, onWholesaleClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-[#250007] via-[#1A0005] to-[#100003] text-white pt-16 pb-12 border-t-4 border-[#D4AF37]">
      <div className="rk-container space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Heritage (Col 1 - Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#780016] to-[#3F000B] border border-[#D4AF37] flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  RK CREATION
                </span>
                <span className="text-[11px] text-[#F3E5AB] uppercase tracking-wider font-semibold">
                  Surat's Silk & Bridal Capital
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Established in the heart of Tirupati Market, Surat, RK Creation specializes in luxury Banarasi Katan silk sarees, heavy bridal lehengas, and designer ethnic wear for wholesale boutiques and retail patrons across 45+ countries.
            </p>

            {/* Social & Contact Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#780016] border border-[#D4AF37]/40 flex items-center justify-center text-[#F3E5AB] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={generateGeneralInquiryWhatsAppUrl("Footer WhatsApp Contact")}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] border border-[#25D366]/50 flex items-center justify-center text-white transition-colors"
                title="WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={STORE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#780016] border border-[#D4AF37]/40 flex items-center justify-center text-[#F3E5AB] transition-colors"
                title="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories (Col 2 - Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider border-b border-[#D4AF37]/30 pb-2">
              Loom Collections
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onCategoryClick(cat.id)}
                    className="hover:text-[#F3E5AB] transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span className="text-[#D4AF37]">•</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Wholesale & Showroom Services (Col 3 - Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider border-b border-[#D4AF37]/30 pb-2">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  onClick={onWholesaleClick}
                  className="hover:text-[#F3E5AB] transition-colors text-left"
                >
                  B2B Wholesale Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsVideoCallOpen(true)}
                  className="hover:text-[#F3E5AB] transition-colors text-left"
                >
                  Live Video Call Shopping
                </button>
              </li>
              <li>
                <a
                  href={STORE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F3E5AB] transition-colors block"
                >
                  Surat Showroom Directions
                </a>
              </li>
              <li>
                <a
                  href={generateGeneralInquiryWhatsAppUrl("Inquire about custom stitching")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F3E5AB] transition-colors block"
                >
                  Fall / Pico / Blouse Stitching
                </a>
              </li>
            </ul>
          </div>

          {/* Surat Showroom Address & Hours (Col 4 - Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider border-b border-[#D4AF37]/30 pb-2">
              Surat Flagship Hub
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{STORE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{STORE_CONFIG.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-[#F3E5AB] block font-semibold">
                Timings: {STORE_CONFIG.timing}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} RK Creation Surat. All Rights Reserved. Direct Surat Textile Manufacturer.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-[11px]">Crafted with authentic Surat handlooms</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-[#780016] border border-[#D4AF37]/40 text-[#F3E5AB] transition-all flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[10px]">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
