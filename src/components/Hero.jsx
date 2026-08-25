import React, { useState } from "react";
import { Sparkles, MessageCircle, Video, ArrowRight, ShieldCheck, Flame, ChevronRight } from "lucide-react";
import { STORE_CONFIG } from "../data/config";
import { generateGeneralInquiryWhatsAppUrl } from "../utils/helpers";

const HERO_SHOWCASES = [
  {
    title: "Navratri Royal Kutchi Mirror-Work Chaniya Choli",
    tag: "🪘 Navratri & Garba 2026 Special",
    sku: "RK-NAVRATRI-901",
    price: "₹5,450",
    originalPrice: "₹8,999",
    category: "navratri-chaniya-choli",
    image: "/images/navratri_chaniya_choli_hero.jpg",
    accent: "Full 6M Flare • Real Mirror Work"
  },
  {
    title: "Noor-e-Dulhan Royal Velvet Heritage Bridal Lehenga",
    tag: "👑 Masterpiece Bridal Couture",
    sku: "RK-LEH-901",
    price: "₹16,500",
    originalPrice: "₹25,000",
    category: "bridal-lehenga",
    image: "/images/traditional_bridal_lehenga.jpg",
    accent: "4.5M Kalidar • Real Gold Zardozi"
  },
  {
    title: "Rajkot Heritage Patola Double Ikkat Pure Silk Saree",
    tag: "✨ Gujarat Heritage Handloom",
    sku: "RK-PATOLA-801",
    price: "₹6,850",
    originalPrice: "₹11,500",
    category: "patola-bandhani",
    image: "/images/patola_bandhani_saree.jpg",
    accent: "Pure Silk Mark • Double Ikkat"
  }
];

export default function Hero({ onExploreClick, setIsVideoCallOpen, onSelectCategory }) {
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0);
  const activeShowcase = HERO_SHOWCASES[activeShowcaseIdx];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1C0005] via-[#3B010C] to-[#5C0515] text-white py-10 md:py-16 border-b-2 border-[#D4AF37]/50 shadow-2xl">
      {/* Background Decorative Pattern & Glow */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8E0A20]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="rk-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Royal Copy & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Navratri & Factory Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#FFE082] text-[#FFF0A8] text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                <Flame className="w-3.5 h-3.5 text-[#FFE082] animate-bounce" />
                <span>Navratri & Festive 2026 Collection Live</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#FFE082]" />
                <span>Direct Surat Factory • Tirupati Market</span>
              </div>
            </div>

            {/* Regal Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
              Traditional <span className="text-gold-gradient">Navratri Chaniya Choli</span> & Royal Bridal Couture
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-[#F9F3EA] max-w-2xl font-normal leading-relaxed">
              Direct-from-loom manufacturer pricing on authentic <strong className="font-bold text-[#FFF3B0]">Kutchi Mirror-Work Chaniya Choli</strong>, <strong className="font-bold text-[#FFF3B0]">Pure Patola & Bandhani Sarees</strong>, and <strong className="font-bold text-[#FFF3B0]">Heavy Bridal Lehengas</strong>. Single pieces at wholesale rates or full sets for worldwide boutiques.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="rk-btn-gold text-xs sm:text-sm font-bold px-5 py-3 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Traditional Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={generateGeneralInquiryWhatsAppUrl("New Customer Traditional & Navratri Collection Inquiry")}
                target="_blank"
                rel="noreferrer"
                className="rk-btn-whatsapp text-xs sm:text-sm font-bold px-5 py-3 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={() => setIsVideoCallOpen(true)}
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold px-4 py-3 rounded-lg border border-[#FFE082]/60 text-[#FFF0A8] bg-black/30 hover:bg-black/50 active:scale-95 transition-all backdrop-blur-md"
              >
                <Video className="w-4 h-4 text-[#FFE082]" />
                <span>Live Video Call Shopping</span>
              </button>
            </div>

            {/* Showcase Quick Selector Tabs */}
            <div className="pt-2">
              <span className="text-xs text-gray-300 font-medium block mb-2 text-center lg:text-left">
                Featured Highlights (Click to preview):
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                {HERO_SHOWCASES.map((item, idx) => (
                  <button
                    key={item.sku}
                    onClick={() => setActiveShowcaseIdx(idx)}
                    className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 border active:scale-95 ${
                      activeShowcaseIdx === idx
                        ? "bg-[#D4AF37] text-black font-bold border-[#FFF0A8] shadow-md scale-105"
                        : "bg-white/10 text-gray-200 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <span>{idx === 0 ? "🪘 Navratri Choli" : idx === 1 ? "👑 Bridal Lehenga" : "✨ Patola Saree"}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Micro Trust Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 sm:pt-4 border-t border-[#D4AF37]/30 text-left">
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="text-lg sm:text-2xl font-serif font-bold text-[#FFF0A8] block">12+</span>
                <span className="text-[10px] sm:text-[11px] text-gray-200">Years in Surat Hub</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="text-lg sm:text-2xl font-serif font-bold text-[#FFF0A8] block">100%</span>
                <span className="text-[10px] sm:text-[11px] text-gray-200">Authentic Craft</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="text-lg sm:text-2xl font-serif font-bold text-[#FFF0A8] block">45+</span>
                <span className="text-[10px] sm:text-[11px] text-gray-200">Countries Shipped</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="text-lg sm:text-2xl font-serif font-bold text-[#FFF0A8] block">1-to-1</span>
                <span className="text-[10px] sm:text-[11px] text-gray-200">Video Shopping</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Gold Border Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-[#2B0008] group transition-all duration-500">
                <img
                  key={activeShowcase.image}
                  src={activeShowcase.image}
                  alt={activeShowcase.title}
                  className="w-full h-[360px] sm:h-[480px] object-cover object-top transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay for Text Clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                {/* Floating Product Tag */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-black/80 border border-[#D4AF37]/80 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-black font-bold text-[9px] sm:text-[10px] tracking-wide uppercase truncate">
                      {activeShowcase.tag}
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-[#FFF0A8] font-bold">
                      {activeShowcase.sku}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-white line-clamp-1">
                    {activeShowcase.title}
                  </h3>
                  
                  <p className="text-[10px] sm:text-[11px] text-[#FFF3B0] font-medium mt-0.5">
                    {activeShowcase.accent}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-gray-300 block uppercase tracking-wider font-semibold">Surat Factory Price:</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl font-serif font-extrabold text-[#FFF0A8]">{activeShowcase.price}</span>
                        <span className="text-[11px] sm:text-xs text-gray-400 line-through">{activeShowcase.originalPrice}</span>
                      </div>
                    </div>
                    <button
                      onClick={onExploreClick}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[#D4AF37] hover:bg-[#FFF0A8] text-black font-bold text-xs flex items-center gap-1 shadow-lg transition-all active:scale-95"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Trust Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-[#4A000E] p-3 rounded-xl border border-[#D4AF37] shadow-2xl hidden sm:flex items-center gap-2.5 z-20">
                <div className="w-9 h-9 rounded-full bg-[#FAF2D8] flex items-center justify-center border border-[#D4AF37]">
                  <ShieldCheck className="w-5 h-5 text-[#8C6B1B]" />
                </div>
                <div>
                  <span className="text-xs font-bold block leading-tight text-[#4A000E]">100% Quality Inspected</span>
                  <span className="text-[10px] text-gray-600 font-medium">From Tirupati Market, Surat</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
