import React, { useState } from "react";
import { 
  MessageCircle, 
  ShoppingBag, 
  Eye, 
  Heart, 
  Star, 
  Check, 
  Sparkles,
  Layers
} from "lucide-react";
import { formatPrice, generateSingleProductWhatsAppUrl } from "../utils/helpers";

export default function ProductCard({ 
  product, 
  currency, 
  onQuickView, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist,
  isWholesaleMode
}) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ""
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl(product, selectedColor, 1, currency, isWholesaleMode);
    window.open(url, "_blank");
  };

  return (
    <div 
      className="rk-card group flex flex-col justify-between cursor-pointer border border-[#D4AF37]/25 hover:border-[#D4AF37]/80 transition-all duration-300"
      onClick={() => onQuickView(product)}
    >
      {/* Product Media Area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F3EBDD]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 max-w-[85%]">
          {product.badge && (
            <span className="rk-badge rk-badge-gold shadow-sm text-[8px] sm:text-[10px] py-0.5 px-1.5 truncate">
              👑 {product.badge}
            </span>
          )}
          {product.isSuratSpecial && (
            <span className="rk-badge rk-badge-maroon shadow-sm text-[8px] sm:text-[9px] py-0.5 px-1.5 truncate hidden sm:inline-flex">
              ✨ Surat Loom Special
            </span>
          )}
          {product.isBundle && (
            <span className="rk-badge rk-badge-emerald shadow-sm text-[8px] sm:text-[9px] py-0.5 px-1.5 truncate">
              📦 Set of {product.bundleCount}
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 ${
            isWishlisted 
              ? "bg-[#780016] text-white" 
              : "bg-white/85 text-gray-700 hover:bg-white hover:text-[#780016]"
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Floating Pill (On Hover & Touch) */}
        <div className="absolute inset-x-0 bottom-2.5 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-2 sm:px-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-1.5 sm:py-2 px-2 rounded-lg bg-[#2B0008]/95 hover:bg-[#780016] text-white text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 shadow-lg backdrop-blur-sm border border-[#D4AF37]/50 transition-all"
          >
            <Eye className="w-3 h-3 text-[#F3E5AB]" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Bottom Subtle Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
      </div>

      {/* Product Content Details */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Fabric & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-500 mb-1">
            <span className="font-semibold text-[#8C6B1B] uppercase tracking-wider truncate max-w-[65%]">
              {product.fabric}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-[#2B0008] line-clamp-2 leading-tight group-hover:text-[#780016] transition-colors">
            {product.name}
          </h3>

          {/* SKU & Craft */}
          <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 truncate">
            <span className="font-mono text-gray-700 font-semibold">{product.sku}</span> • {product.craft}
          </p>

          {/* Color Variants Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 4).map((c, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(c.name);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all ${
                      selectedColor === c.name 
                        ? "ring-2 ring-[#780016] scale-110 border-white shadow-sm" 
                        : "border-gray-300 hover:scale-105"
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Block */}
        <div className="mt-2.5 pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex items-baseline justify-between gap-1 flex-wrap">
            <div>
              <span className="text-sm sm:text-base md:text-lg font-serif font-extrabold text-[#780016]">
                {formatPrice(isWholesaleMode ? product.wholesalePriceINR : product.priceINR, currency)}
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-400 line-through ml-1 font-normal">
                {formatPrice(Math.round(product.priceINR * 1.4), currency)}
              </span>
            </div>

            {/* Wholesale Tag / Retail Tag */}
            <div className="text-right">
              {product.isBundle ? (
                <span className="text-[9px] sm:text-[10px] bg-[#FAF2D8] text-[#8C6B1B] font-bold px-1.5 py-0.5 rounded border border-[#D4AF37]/40">
                  Full Set
                </span>
              ) : (
                <span className="text-[9px] sm:text-[10px] text-gray-500 block leading-tight">
                  Bulk: <strong className="text-[#8C6B1B]">{formatPrice(product.wholesalePriceINR, currency)}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs: 1-Click WhatsApp & Add to Quotation */}
          <div className="grid grid-cols-2 gap-1.5 mt-2.5">
            <button
              onClick={handleWhatsApp}
              className="rk-btn-whatsapp py-1.5 sm:py-2 px-1 sm:px-2 text-[10px] sm:text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleAdd}
              className={`py-1.5 sm:py-2 px-1 sm:px-2 text-[10px] sm:text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95 border ${
                addedAnimation 
                  ? "bg-[#0B3B24] text-white border-[#0B3B24]" 
                  : "bg-[#FAF7F2] text-[#4A000E] border-[#D4AF37]/50 hover:bg-[#780016] hover:text-white"
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>+ Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
