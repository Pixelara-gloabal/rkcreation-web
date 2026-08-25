import React, { useState } from "react";
import { 
  X, 
  Trash2, 
  MessageCircle, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  User, 
  MapPin, 
  Phone, 
  FileText,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatPrice, generateCartWhatsAppUrl } from "../utils/helpers";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  isWholesaleMode,
  setIsWholesaleMode
}) {
  if (!isOpen) return null;

  const [buyerDetails, setBuyerDetails] = useState({
    name: "",
    city: "",
    phone: "",
    notes: ""
  });

  const grandTotalINR = cartItems.reduce((acc, item) => {
    const unitPrice = isWholesaleMode 
      ? (item.wholesalePriceINR || item.priceINR) 
      : item.priceINR;
    return acc + (unitPrice * item.quantity);
  }, 0);

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    const url = generateCartWhatsAppUrl(cartItems, buyerDetails, currency, isWholesaleMode);
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-[#D4AF37] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#4A000E] via-[#780016] to-[#4A000E] text-white border-b border-[#D4AF37]/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF2D8] text-[#780016] flex items-center justify-center font-bold shadow">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-white">
                  Quotation & Order Bag
                </h3>
                <span className="text-xs text-[#F3E5AB]">
                  {cartItems.length} {cartItems.length === 1 ? "Product" : "Products"} Selected
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

          {/* Wholesale Mode Bar */}
          <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-gray-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Order Pricing Mode:</span>
            <button
              onClick={() => setIsWholesaleMode(!isWholesaleMode)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border transition-all ${
                isWholesaleMode
                  ? "bg-[#780016] text-white border-[#780016]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-[#780016]"
              }`}
            >
              {isWholesaleMode ? "✓ B2B Wholesale Rates" : "Retail Single Rates"}
            </button>
          </div>

          {/* Cart Items List */}
          <div className="overflow-y-auto p-4 sm:p-5 flex-1 space-y-3.5 divide-y divide-gray-100">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF2D8] mx-auto flex items-center justify-center border border-[#D4AF37]">
                  <ShoppingBag className="w-8 h-8 text-[#8C6B1B]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#4A000E]">
                  Your Quotation Bag is Empty
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our Surat sarees, bridal lehengas, and wholesale sets to add items to your WhatsApp order.
                </p>
                <button
                  onClick={onClose}
                  className="rk-btn-gold text-xs px-5 py-2.5 shadow"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const unitPrice = isWholesaleMode 
                  ? (item.wholesalePriceINR || item.priceINR) 
                  : item.priceINR;
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div key={`${item.id}-${item.selectedColor}-${index}`} className="pt-3.5 first:pt-0 flex gap-3">
                    <img
                      src={item.images && item.images[0]}
                      alt={item.name}
                      className="w-16 h-20 object-cover object-top rounded-xl border border-[#D4AF37]/30 flex-shrink-0 bg-gray-100"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-xs sm:text-sm font-bold text-[#2B0008] line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-gray-400 hover:text-red-600 p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-gray-500 space-x-2 mt-0.5">
                          <span className="font-mono text-gray-700">{item.sku}</span>
                          <span>• Color: <strong className="text-gray-800">{item.selectedColor}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Buttons */}
                        <div className="inline-flex items-center border border-gray-300 rounded-lg bg-[#FAF7F2] overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs font-bold text-gray-700 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-bold text-[#780016]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs font-bold text-gray-700 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-serif font-bold text-[#780016]">
                            {formatPrice(itemTotal, currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Buyer Contact Form */}
            {cartItems.length > 0 && (
              <div className="pt-5 border-t border-gray-200 space-y-3">
                <h4 className="font-serif text-xs font-bold text-[#4A000E] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Buyer Information (Included in WhatsApp Bill)</span>
                </h4>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Full Name (e.g. Anjali Sharma)"
                    value={buyerDetails.name}
                    onChange={(e) => setBuyerDetails({ ...buyerDetails, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016]"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City / Country (e.g. Mumbai, UK)"
                      value={buyerDetails.city}
                      onChange={(e) => setBuyerDetails({ ...buyerDetails, city: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016]"
                    />
                    <input
                      type="text"
                      placeholder="Phone / WhatsApp No."
                      value={buyerDetails.phone}
                      onChange={(e) => setBuyerDetails({ ...buyerDetails, phone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016]"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Special instructions (e.g. Fall/Pico stitching, express shipping date)"
                    value={buyerDetails.notes}
                    onChange={(e) => setBuyerDetails({ ...buyerDetails, notes: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#780016]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout & WhatsApp Dispatch */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#D4AF37]/40 space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Estimated Item Subtotal:</span>
                  <span className="font-semibold text-gray-800">{formatPrice(grandTotalINR, currency)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Worldwide Courier Dispatch:</span>
                  <span className="text-[#0B3B24] font-semibold">Calculated on WhatsApp</span>
                </div>
                <div className="flex items-center justify-between text-base font-serif font-bold text-[#4A000E] pt-2 border-t border-gray-200">
                  <span>Grand Total:</span>
                  <span className="text-xl font-extrabold text-[#780016]">
                    {formatPrice(grandTotalINR, currency)}
                  </span>
                </div>
              </div>

              {/* Send Order to WhatsApp Button */}
              <button
                onClick={handleSendWhatsAppOrder}
                className="rk-btn-whatsapp w-full py-3.5 text-sm font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Send Complete Order to WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-gray-500">
                🔒 Opens WhatsApp with pre-formatted invoice. No payment deducted on site.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
