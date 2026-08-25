import React from "react";
import { 
  Building2, 
  Sparkles, 
  Package, 
  TrendingUp, 
  MessageCircle, 
  Download, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import { STORE_CONFIG } from "../data/config";
import { generateGeneralInquiryWhatsAppUrl } from "../utils/helpers";

export default function WholesaleSection({ onBrowseWholesaleSets }) {
  return (
    <section id="wholesale-section" className="py-14 md:py-20 bg-gradient-to-b from-[#2B0008] via-[#3F000B] to-[#4A000E] text-white relative overflow-hidden border-t-2 border-b-2 border-[#D4AF37]">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="rk-container relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF2D8]/10 border border-[#D4AF37]/50 text-[#F3E5AB] text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>B2B Wholesale & Reseller Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
            Direct Surat Loom Supply for <br className="hidden sm:inline" />
            <span className="text-gold-gradient">Boutique Owners & Resellers</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#FAF5EE]/80 max-w-2xl mx-auto font-light">
            Skip the middle agents in wholesale markets. Partner directly with RK Creation in Tirupati Market, Surat for high-margin Banarasi sarees, wedding lehengas, and trending ethnic catalogs.
          </p>
        </div>

        {/* 4 Core B2B Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-10 sm:mb-12">
          
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-sm hover:border-[#D4AF37] transition-all space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif text-xs sm:text-base font-bold text-[#FFF0A8] leading-tight">
              35-45% Margins
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-300 leading-normal line-clamp-3 sm:line-clamp-none">
              Factory wholesale pricing ensures high profit margins for your physical store or boutique.
            </p>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-sm hover:border-[#D4AF37] transition-all space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-bold">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif text-xs sm:text-base font-bold text-[#FFF0A8] leading-tight">
              Low MOQ (Sets)
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-300 leading-normal line-clamp-3 sm:line-clamp-none">
              Start with just 1 catalog bundle (4 to 6 colors) without heavy inventory risk.
            </p>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-sm hover:border-[#D4AF37] transition-all space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-bold">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif text-xs sm:text-base font-bold text-[#FFF0A8] leading-tight">
              Daily Broadcasts
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-300 leading-normal line-clamp-3 sm:line-clamp-none">
              Get unedited HD videos, photos & wholesale rates directly on WhatsApp reseller broadcast.
            </p>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-sm hover:border-[#D4AF37] transition-all space-y-2 sm:space-y-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-serif text-xs sm:text-base font-bold text-[#FFF0A8] leading-tight">
              GST Invoicing
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-300 leading-normal line-clamp-3 sm:line-clamp-none">
              Proper B2B GST tax invoices and insured transport cargo across India & 45+ countries.
            </p>
          </div>

        </div>

        {/* Interactive B2B Action Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#4A000E] via-[#5A0010] to-[#780016] border-2 border-[#D4AF37] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <span className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider">
              Ready to Upgrade Your Saree & Lehenga Inventory?
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
              Join 1,200+ Active Resellers & Boutiques
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF5EE]/80">
              Contact our wholesale desk on WhatsApp to receive our complete 2026 digital PDF catalog with volume pricing slabs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <a
              href={generateGeneralInquiryWhatsAppUrl("Join Wholesale Reseller Broadcast Group")}
              target="_blank"
              rel="noreferrer"
              className="rk-btn-whatsapp w-full sm:w-auto text-xs sm:text-sm font-bold px-6 py-3.5 shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Join Reseller WhatsApp Broadcast</span>
            </a>

            <button
              onClick={onBrowseWholesaleSets}
              className="rk-btn-gold w-full sm:w-auto text-xs sm:text-sm font-bold px-5 py-3.5 shadow-xl flex items-center justify-center gap-2"
            >
              <span>View Wholesale Sets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
