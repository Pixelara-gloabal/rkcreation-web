import React from "react";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Navigation,
  Heart,
  MessageSquare
} from "lucide-react";
import { InstagramIcon } from "./Icons";
import { STORE_CONFIG } from "../data/config";
import { INSTAGRAM_POSTS } from "../data/products";

export default function StoreLocation() {
  return (
    <section id="store-section" className="py-14 md:py-20 bg-white border-b border-[#D4AF37]/30">
      <div className="rk-container space-y-16">
        
        {/* Surat Store Showroom Showcase */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2D8] border border-[#D4AF37]/50 text-[#8C6B1B] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Surat Textile Market Showroom</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#4A000E]">
              Visit Us in Tirupati Market, Surat
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              When visiting the world-famous Surat textile market, step into our showroom to touch and feel our pure weaves.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Store Information Card */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF6F0] border-2 border-[#D4AF37] shadow-lg space-y-5">
                
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#4A000E] mb-1">
                    RK Creation Surat
                  </h3>
                  <span className="text-xs font-semibold text-[#8C6B1B] uppercase tracking-wide block">
                    Loom Manufacturer & Wholesale Flagship
                  </span>
                </div>

                <div className="space-y-3.5 text-xs text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF2D8] text-[#780016] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#D4AF37]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-gray-900 font-bold">Physical Address:</strong>
                      <span>{STORE_CONFIG.address}</span>
                      <span className="block text-[11px] text-gray-500 mt-0.5">Landmark: Moti Begumwadi, Ring Road Textile Market</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF2D8] text-[#780016] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#D4AF37]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-gray-900 font-bold">Showroom Timings:</strong>
                      <span>{STORE_CONFIG.timing}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF2D8] text-[#780016] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#D4AF37]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-gray-900 font-bold">Showroom Contact:</strong>
                      <a href={`tel:${STORE_CONFIG.phone}`} className="text-[#780016] font-bold hover:underline">
                        {STORE_CONFIG.phone}
                      </a>
                      <span className="text-gray-500 block text-[11px]">Direct WhatsApp Concierge available 24x7</span>
                    </div>
                  </div>
                </div>

                {/* Google Maps Directions Action Button */}
                <div className="pt-2">
                  <a
                    href={STORE_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rk-btn-primary w-full text-xs font-bold py-3 shadow-md flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-[#D4AF37]" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300" />
                  </a>
                </div>

              </div>
            </div>

            {/* Google Maps Interactive Viewer */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-xl bg-gray-100 relative h-[360px] sm:h-[420px]">
                <iframe
                  title="RK Creation Surat Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.088673891461!2d72.8458900758784!3d21.188730982260655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f006b5b06c1%3A0xc4abe60b67cae1d9!2sTirupati%20Market!5e0!3m2!1sen!2sin!4v1708860000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Map Floating Card */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#D4AF37] shadow-lg max-w-xs hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-[#4A000E]">Surat Showroom Open</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Tirupati Market, Ring Road, Surat
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Instagram Lookbook Showcase */}
        <div className="pt-10 border-t border-[#D4AF37]/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-5 h-5 text-[#780016]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A000E]">
                  Official Instagram Lookbook & Reels
                </h3>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Live from Surat looms: Follow <strong className="text-[#780016] font-bold">@{STORE_CONFIG.instagramHandle}</strong> for daily wholesale dispatches, customer unboxing, and bridal lehengas.
              </p>
            </div>

            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rk-btn-outline text-xs font-bold px-4 py-2.5 flex items-center gap-2 shadow-sm hover:scale-105 transition-all"
            >
              <InstagramIcon className="w-4 h-4 text-[#780016]" />
              <span>Visit @{STORE_CONFIG.instagramHandle}</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>
          </div>

          {/* Instagram Posts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href={post.postUrl || STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className={`group relative aspect-square rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-900 block ${
                  post.isClientPost 
                    ? "border-2 border-[#D4AF37] ring-2 ring-[#780016]/20 scale-[1.02]" 
                    : "border-[#D4AF37]/30 hover:border-[#D4AF37]"
                }`}
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Top Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                    post.isClientPost 
                      ? "bg-[#D4AF37] text-black font-extrabold" 
                      : "bg-black/60 text-white border border-white/20"
                  }`}>
                    {post.tag || "Instagram Post"}
                  </span>
                </div>

                {/* Hover Overlay with Likes/Comments & Direct Link */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white z-10">
                  <div className="flex items-center justify-end gap-2 text-xs font-bold text-[#FFF0A8] pt-6">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 fill-current text-blue-300" />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-200 line-clamp-3 leading-snug font-normal">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#FFF0A8] font-bold uppercase tracking-wider pt-2 border-t border-white/20">
                    <span className="flex items-center gap-1">
                      <InstagramIcon className="w-3 h-3 text-[#D4AF37]" />
                      <span>View Post</span>
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
