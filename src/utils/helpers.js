import { STORE_CONFIG } from "../data/config";

/**
 * Format price based on selected currency
 */
export function formatPrice(priceINR, currencyCode = "INR") {
  const curr = STORE_CONFIG.currencies[currencyCode] || STORE_CONFIG.currencies.INR;
  const converted = Math.round(priceINR * curr.rate);
  
  if (currencyCode === "INR") {
    return `₹${converted.toLocaleString("en-IN")}`;
  }
  return `${curr.symbol}${converted.toLocaleString("en-US")}`;
}

/**
 * Generate 1-Click WhatsApp Order Link for a single product
 */
export function generateSingleProductWhatsAppUrl(product, selectedColor, selectedQuantity = 1, currencyCode = "INR", isWholesale = false) {
  const price = isWholesale ? product.wholesalePriceINR : product.priceINR;
  const formattedPrice = formatPrice(price, currencyCode);
  const totalFormatted = formatPrice(price * selectedQuantity, currencyCode);
  
  const text = 
`🌸 *NEW ORDER ENQUIRY — RK CREATION SURAT* 🌸

Namaste RK Creation Team,
I would like to order this item from your catalog:

🛍️ *Product:* ${product.name}
🏷️ *SKU:* ${product.sku}
🧵 *Fabric:* ${product.fabric}
✨ *Craft:* ${product.craft}
🎨 *Selected Color:* ${selectedColor || (product.colors && product.colors[0]?.name) || "Standard"}
📦 *Quantity:* ${selectedQuantity} ${isWholesale ? "Wholesale Sets" : "Pcs"}
💰 *Price:* ${formattedPrice} / pc
💵 *Total Estimated:* ${totalFormatted}

📍 *Store Location:* Tirupati Market, Surat
🌐 *Catalog Link:* ${window.location.origin}/#${product.id}

Please confirm availability, dispatch time & payment details. Thank you!`;

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate WhatsApp Order Link for Quotation Cart (Multi-item)
 */
export function generateCartWhatsAppUrl(cartItems, buyerDetails, currencyCode = "INR", isWholesaleMode = false) {
  let itemsSummary = "";
  let grandTotalINR = 0;

  cartItems.forEach((item, index) => {
    const unitPrice = isWholesaleMode ? (item.wholesalePriceINR || item.priceINR) : item.priceINR;
    const itemTotal = unitPrice * item.quantity;
    grandTotalINR += itemTotal;

    itemsSummary += `
${index + 1}. *${item.name}*
   • SKU: ${item.sku}
   • Color/Option: ${item.selectedColor || "Standard"}
   • Qty: ${item.quantity} ${isWholesaleMode ? "Set(s)" : "Pc(s)"}
   • Rate: ${formatPrice(unitPrice, currencyCode)} | Item Total: ${formatPrice(itemTotal, currencyCode)}
`;
  });

  const grandTotalFormatted = formatPrice(grandTotalINR, currencyCode);

  const text = 
`👑 *COMPLETE ORDER / QUOTATION — RK CREATION SURAT* 👑

Namaste RK Creation Team,
I have compiled the following catalog order:

📋 *ORDER SUMMARY (${cartItems.length} Items):*
${itemsSummary}
━━━━━━━━━━━━━━━━━━━━
💰 *GRAND TOTAL ESTIMATE: ${grandTotalFormatted}*
📦 *Order Mode:* ${isWholesaleMode ? "B2B Wholesale / Bulk Order" : "Retail Single Order"}
━━━━━━━━━━━━━━━━━━━━

👤 *BUYER DETAILS:*
• *Name:* ${buyerDetails.name || "Valued Customer"}
• *City / Country:* ${buyerDetails.city || "Not Specified"}
• *Phone / WhatsApp:* ${buyerDetails.phone || "Same as this WhatsApp"}
• *Special Notes / Instructions:* ${buyerDetails.notes || "None"}

Please confirm product availability, shipping charges to my address, and final invoice.`;

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate WhatsApp Video Call Booking URL
 */
export function generateVideoCallWhatsAppUrl(bookingData) {
  const text = 
`📹 *LIVE VIDEO CALL SHOPPING REQUEST — RK CREATION SURAT* 📹

Namaste RK Creation Showroom!
I want to book a live video shopping consultation to inspect your sarees & collections live from your Surat showroom.

🗓️ *Requested Date:* ${bookingData.date}
⏰ *Time Slot:* ${bookingData.timeSlot}
🗣️ *Preferred Language:* ${bookingData.language}
👗 *Collections of Interest:* ${bookingData.category}
👤 *My Name:* ${bookingData.name}
📍 *My City / Country:* ${bookingData.city}
📝 *Special Preferences:* ${bookingData.notes || "Show top trending festive & bridal pieces"}

Please confirm my appointment slot. Looking forward to the video call!`;

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate WhatsApp General Inquiry Link
 */
export function generateGeneralInquiryWhatsAppUrl(topic = "General Inquiry") {
  const text = `Namaste RK Creation Surat! 🌸\nI am contacting you regarding: *${topic}* from your online catalog website.\nPlease assist me with your latest wholesale & retail collections.`;
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
