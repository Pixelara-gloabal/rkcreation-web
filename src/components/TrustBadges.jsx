import React from "react";
import { Factory, Video, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";
import { STORE_CONFIG } from "../data/config";

const iconsMap = {
  Factory: Factory,
  Video: Video,
  Globe: Globe,
  ShieldCheck: ShieldCheck
};

export default function TrustBadges({ setIsVideoCallOpen }) {
  return (
    <section className="bg-[#FAF6F0] py-6 sm:py-8 border-b border-[#D4AF37]/25">
      <div className="rk-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
          {STORE_CONFIG.trustFeatures.map((feat, idx) => {
            const IconComponent = iconsMap[feat.icon] || ShieldCheck;
            const isVideo = feat.icon === "Video";

            return (
              <div 
                key={idx}
                onClick={isVideo ? () => setIsVideoCallOpen(true) : undefined}
                className={`p-3 sm:p-5 rounded-xl bg-white border border-[#D4AF37]/30 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 group ${
                  isVideo ? "cursor-pointer hover:border-[#780016]" : ""
                }`}
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#780016] to-[#4A000E] flex-shrink-0 flex items-center justify-center border border-[#D4AF37]/60 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFF0A8]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-[#4A000E] group-hover:text-[#780016] transition-colors leading-tight">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1 leading-normal line-clamp-2 sm:line-clamp-none">
                    {feat.desc}
                  </p>
                  {isVideo && (
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#780016] mt-1.5 underline">
                      Video Call →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
