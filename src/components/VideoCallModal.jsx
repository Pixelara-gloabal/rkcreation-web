import React, { useState } from "react";
import { 
  X, 
  Video, 
  Calendar, 
  Clock, 
  Globe2, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2 
} from "lucide-react";
import { generateVideoCallWhatsAppUrl } from "../utils/helpers";

export default function VideoCallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [bookingData, setBookingData] = useState({
    name: "",
    city: "",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: "03:00 PM - 04:00 PM IST",
    language: "Hindi / Gujarati",
    category: "Banarasi & Kanjivaram Silk Sarees",
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = generateVideoCallWhatsAppUrl(bookingData);
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl md:rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#4A000E] via-[#780016] to-[#4A000E] text-white border-b border-[#D4AF37]/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2D8] text-[#780016] flex items-center justify-center font-bold shadow">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Live Video Call Shopping
              </h3>
              <span className="text-xs text-[#F3E5AB]">
                Direct from our Tirupati Market Showroom, Surat
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          <div className="p-3 bg-[#FAF2D8]/60 rounded-xl border border-[#D4AF37]/40 text-xs text-[#7A5B0B] flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#8C6B1B] flex-shrink-0 mt-0.5" />
            <p>
              Experience our fabrics, zari luster, pleat falls & borders live on WhatsApp Video before placing your order. Free service with no purchase obligation!
            </p>
          </div>

          {/* Name & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4A000E] uppercase mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Meenakshi Roy"
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A000E] uppercase mb-1">
                Your City / Country *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. London, UK / Delhi, India"
                value={bookingData.city}
                onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016]"
              />
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4A000E] uppercase mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Preferred Date *</span>
              </label>
              <input
                type="date"
                required
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A000E] uppercase mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Time Slot (IST) *</span>
              </label>
              <select
                value={bookingData.timeSlot}
                onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016] bg-white font-medium"
              >
                <option value="11:30 AM - 12:30 PM IST">11:30 AM - 12:30 PM IST</option>
                <option value="02:00 PM - 03:00 PM IST">02:00 PM - 03:00 PM IST</option>
                <option value="04:00 PM - 05:00 PM IST">04:00 PM - 05:00 PM IST</option>
                <option value="06:30 PM - 07:30 PM IST">06:30 PM - 07:30 PM IST</option>
                <option value="08:00 PM - 09:00 PM IST (NRI Friendly)">08:00 PM - 09:00 PM IST (NRI Friendly)</option>
              </select>
            </div>
          </div>

          {/* Collection & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4A000E] uppercase mb-1">
                Items of Interest *
              </label>
              <select
                value={bookingData.category}
                onChange={(e) => setBookingData({ ...bookingData, category: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016] bg-white font-medium"
              >
                <option value="Banarasi & Kanjivaram Silk Sarees">Banarasi & Kanjivaram Silk Sarees</option>
                <option value="Bridal & Wedding Heavy Lehengas">Bridal & Wedding Heavy Lehengas</option>
                <option value="Organza & Tissue Sarees">Organza & Tissue Sarees</option>
                <option value="Designer Kurtis & Anarkalis">Designer Kurtis & Anarkalis</option>
                <option value="Wholesale Boutique Full Catalog Sets">Wholesale Boutique Full Catalog Sets</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A000E] uppercase mb-1 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Preferred Language</span>
              </label>
              <select
                value={bookingData.language}
                onChange={(e) => setBookingData({ ...bookingData, language: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016] bg-white font-medium"
              >
                <option value="Hindi / Gujarati">Hindi / Gujarati</option>
                <option value="English">English</option>
                <option value="Hindi / English">Hindi / English Mix</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#4A000E] uppercase mb-1">
              Specific Requirements (Color, Budget, Event Date)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Looking for Red/Crimson bridal saree for December wedding, budget approx ₹5,000 - ₹15,000"
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="rk-btn-whatsapp w-full py-3.5 text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Confirm & Send Video Appointment on WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-gray-500 mt-2">
              Our Surat showroom executive will verify the slot on WhatsApp and send the video call invite link.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
