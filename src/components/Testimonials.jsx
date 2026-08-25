import React from "react";
import { Star, Quote, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "../data/products";

export default function Testimonials() {
  return (
    <section className="py-14 md:py-20 bg-[#FAF6F0] border-b border-[#D4AF37]/25">
      <div className="rk-container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2D8] border border-[#D4AF37]/50 text-[#8C6B1B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#4A000E]">
            Trusted by Boutiques & Brides Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Over 5,000+ parcels dispatched from our Surat textile looms to homes and boutiques across the globe.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/30 absolute top-5 right-5" />

              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{review.content}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#4A000E]">
                    {review.name}
                  </h4>
                  <span className="text-[11px] text-[#8C6B1B] font-semibold block">
                    {review.role}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
