import React, { useState } from "react";
import { 
  X, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  Video, 
  Check, 
  Layers, 
  Sparkles,
  Info,
  ChevronDown
} from "lucide-react";
import { formatPrice, generateSingleProductWhatsAppUrl } from "../utils/helpers";

export default function ProductModal({
  product,
  currency,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  setIsVideoCallOpen,
  isWholesaleMode
}) {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [isWholesaleSelected, setIsWholesaleSelected] = useState(isWholesaleMode);
  const [isMsgPreviewOpen, setIsMsgPreviewOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const pricePerUnit = isWholesaleSelected ? product.wholesalePriceINR : product.priceINR;
  const totalPriceFormatted = formatPrice(pricePerUnit * quantity, currency);

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, quantity, isWholesaleSelected);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const url = generateSingleProductWhatsAppUrl(
      product, 
      selectedColor, 
      quantity, 
      currency, 
      isWholesaleSelected
    );
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#4A000E] via-[#780016] to-[#4A000E] text-white border-b border-[#D4AF37]/50">
          <div className="flex items-center gap-2">
            <span className="rk-badge rk-badge-gold text-[10px]">
              👑 {product.badge || "Surat Authentic"}
            </span>
            <span className="text-xs font-mono text-[#F3E5AB]">
              SKU: {product.sku}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* Left: Product Images Gallery */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Active Image with Zoom */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F3EBDD] border border-[#D4AF37]/30 shadow-inner group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />

                {/* Live Video Call Floating Badge */}
                <button
                  onClick={() => setIsVideoCallOpen(true)}
                  className="absolute bottom-3 left-3 right-3 py-2 px-3 rounded-xl bg-black/80 hover:bg-[#780016] text-[#F3E5AB] text-xs font-bold flex items-center justify-center gap-2 backdrop-blur-md border border-[#D4AF37]/40 shadow-lg transition-all"
                >
                  <Video className="w-4 h-4 text-[#D4AF37]" />
                  <span>Inspect on Live Video Call</span>
                </button>
              </div>

              {/* Thumbnail Selector */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx 
                          ? "border-[#780016] ring-2 ring-[#D4AF37] scale-105" 
                          : "border-gray-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Specifications & Ordering Details */}
            <div className="md:col-span-6 space-y-5 flex flex-col justify-between">
              <div>
                
                {/* Rating & Fabric */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span className="font-bold text-[#8C6B1B] uppercase tracking-wider">
                    {product.fabric} • {product.craft}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400">({product.reviewsCount} verified reviews)</span>
                  </div>
                </div>

                {/* Product Name */}
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B0008] leading-tight">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="mt-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-500 uppercase font-semibold">
                      {isWholesaleSelected ? "Wholesale Price per Pc:" : "Direct Surat Factory Price:"}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-serif font-extrabold text-[#780016]">
                        {formatPrice(pricePerUnit, currency)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(Math.round(product.priceINR * 1.45), currency)}
                      </span>
                    </div>
                  </div>

                  {/* Wholesale Toggle in Modal */}
                  <button
                    onClick={() => setIsWholesaleSelected(!isWholesaleSelected)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                      isWholesaleSelected 
                        ? "bg-[#780016] text-white border-[#780016]" 
                        : "bg-white text-[#780016] border-[#D4AF37]"
                    }`}
                  >
                    {isWholesaleSelected ? "✓ Wholesale Mode" : "View Wholesale Rate"}
                  </button>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Color Variants */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-xs font-bold text-[#4A000E] uppercase tracking-wider mb-2">
                      Select Color Shade: <span className="text-[#8C6B1B] font-semibold">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            selectedColor === c.name 
                              ? "border-[#780016] bg-[#FAF2D8] text-[#780016] shadow-sm ring-1 ring-[#780016]" 
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-black/20" 
                            style={{ backgroundColor: c.hex }} 
                          />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mt-4 flex items-center gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4A000E] uppercase tracking-wider mb-1.5">
                      Quantity {isWholesaleSelected && "(Wholesale Sets)"}:
                    </label>
                    <div className="inline-flex items-center border border-[#D4AF37]/50 rounded-xl bg-white overflow-hidden shadow-inner">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-[#FAF2D8]"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-xs font-bold text-[#780016] min-w-[2.5rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-sm font-bold text-gray-700 hover:bg-[#FAF2D8]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-5">
                    <span className="text-[11px] text-gray-500 block">Total Estimate:</span>
                    <span className="text-base font-serif font-bold text-[#780016]">
                      {totalPriceFormatted}
                    </span>
                  </div>
                </div>

                {/* Garment Specifications Table */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-bold font-serif text-[#4A000E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Garment & Weave Specifications</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#FAF7F2] p-3 rounded-xl border border-gray-200">
                    {product.specs && Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="space-y-0.5">
                        <span className="font-bold text-gray-500 block">{key}:</span>
                        <span className="text-gray-800 font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons Hub */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                
                {/* Main 1-Click WhatsApp CTA */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="rk-btn-whatsapp w-full py-3.5 text-sm font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Order Now via WhatsApp ({totalPriceFormatted})</span>
                </button>

                {/* Add to Quotation Bag */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border transition-all ${
                    addedAnimation 
                      ? "bg-[#0B3B24] text-white border-[#0B3B24]" 
                      : "bg-[#FAF7F2] text-[#4A000E] border-[#D4AF37] hover:bg-[#780016] hover:text-white"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Quotation Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Multi-Item Quotation Bag</span>
                    </>
                  )}
                </button>

                {/* Live Message Preview Dropdown */}
                <div className="pt-1">
                  <button
                    onClick={() => setIsMsgPreviewOpen(!isMsgPreviewOpen)}
                    className="w-full text-[11px] text-[#780016] hover:underline font-semibold flex items-center justify-center gap-1"
                  >
                    <span>View auto-generated WhatsApp message preview</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isMsgPreviewOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isMsgPreviewOpen && (
                    <div className="mt-2 p-3 bg-gray-900 text-gray-200 rounded-xl text-[10px] font-mono whitespace-pre-line border border-gray-700 leading-relaxed shadow-inner">
                      {`🌸 *NEW ORDER ENQUIRY — RK CREATION SURAT* 🌸
Namaste RK Creation Team,
I would like to order:
• Product: ${product.name}
• SKU: ${product.sku}
• Fabric: ${product.fabric}
• Color: ${selectedColor}
• Quantity: ${quantity} ${isWholesaleSelected ? "Wholesale Sets" : "Pcs"}
• Price: ${formatPrice(pricePerUnit, currency)} / pc
• Total: ${totalPriceFormatted}
📍 Store: Tirupati Market, Surat`}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
