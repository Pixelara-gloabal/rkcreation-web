import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import Catalog from "./components/Catalog";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import VideoCallModal from "./components/VideoCallModal";
import WholesaleSection from "./components/WholesaleSection";
import StoreLocation from "./components/StoreLocation";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import MobileBottomNav from "./components/MobileBottomNav";
import { PRODUCTS } from "./data/products";

export default function App() {
  // State: Currency
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("rk_currency") || "INR";
  });

  // State: Cart / Quotation Bag
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("rk_quotation_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State: Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("rk_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State: UI Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isWholesaleMode, setIsWholesaleMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem("rk_currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("rk_quotation_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("rk_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product, selectedColor, quantity = 1, isWholesale = false) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.id === product.id && item.selectedColor === selectedColor
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedColor: selectedColor || "Standard",
            quantity: quantity,
            isWholesaleItem: isWholesale
          }
        ];
      }
    });
    showToast(`✨ Added "${product.name}" to Quotation Bag!`);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    showToast("Item removed from Quotation Bag");
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast("Removed from Wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("❤️ Saved to your Wishlist!");
        return [...prev, productId];
      }
    });
  };

  // Calculation helpers
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalINR = cartItems.reduce((acc, item) => {
    const price = isWholesaleMode 
      ? (item.wholesalePriceINR || item.priceINR) 
      : item.priceINR;
    return acc + (price * item.quantity);
  }, 0);

  // Smooth scroll jumps
  const scrollToCatalog = () => {
    const elem = document.getElementById("catalog-section");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWholesale = () => {
    const elem = document.getElementById("wholesale-section");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStore = () => {
    const elem = document.getElementById("store-section");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryJump = (categoryId) => {
    setActiveCategory(categoryId);
    scrollToCatalog();
  };

  const handleBrowseWholesaleSets = () => {
    setActiveCategory("wholesale-sets");
    setIsWholesaleMode(true);
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#1A1A1A]">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-[#780016] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-2xl border border-[#D4AF37] flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Luxury Navigation Header */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartCount}
        cartTotalINR={cartTotalINR}
        setIsCartOpen={setIsCartOpen}
        wishlistCount={wishlist.length}
        setIsVideoCallOpen={setIsVideoCallOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onWholesaleClick={scrollToWholesale}
        onStoreClick={scrollToStore}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Majestic Hero Banner */}
        <Hero
          onExploreClick={scrollToCatalog}
          setIsVideoCallOpen={setIsVideoCallOpen}
          onSelectCategory={handleCategoryJump}
        />

        {/* Surat Hub Trust Badges */}
        <TrustBadges
          setIsVideoCallOpen={setIsVideoCallOpen}
        />

        {/* Interactive Product Catalog */}
        <Catalog
          currency={currency}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onQuickView={setSelectedProduct}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          isWholesaleMode={isWholesaleMode}
          setIsWholesaleMode={setIsWholesaleMode}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Dedicated Wholesale / Reseller B2B Portal */}
        <WholesaleSection
          onBrowseWholesaleSets={handleBrowseWholesaleSets}
        />

        {/* Surat Showroom & Instagram Lookbook */}
        <StoreLocation />

        {/* Customer Testimonials */}
        <Testimonials />
      </main>

      {/* Royal Footer (with safe padding for mobile bottom bar) */}
      <div className="pb-16 md:pb-0">
        <Footer
          onCategoryClick={handleCategoryJump}
          setIsVideoCallOpen={setIsVideoCallOpen}
          onWholesaleClick={scrollToWholesale}
        />
      </div>

      {/* Floating Interactive WhatsApp Concierge (Hidden on mobile where bottom nav has WhatsApp) */}
      <div className="hidden md:block">
        <FloatingWhatsApp
          setIsVideoCallOpen={setIsVideoCallOpen}
        />
      </div>

      {/* Mobile App-Style Bottom Navigation Bar */}
      <MobileBottomNav
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        onExploreClick={scrollToCatalog}
        onNavratriClick={() => handleCategoryJump("navratri-chaniya-choli")}
        onWholesaleClick={() => setIsWholesaleMode(!isWholesaleMode)}
        isWholesaleMode={isWholesaleMode}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          currency={currency}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          setIsVideoCallOpen={setIsVideoCallOpen}
          isWholesaleMode={isWholesaleMode}
        />
      )}

      {/* Multi-Item Quotation / Cart Slide Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
        isWholesaleMode={isWholesaleMode}
        setIsWholesaleMode={setIsWholesaleMode}
      />

      {/* Live Video Shopping Appointment Modal */}
      <VideoCallModal
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
      />

    </div>
  );
}
