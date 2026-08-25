import React, { useState, useMemo } from "react";
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Layers, 
  Check, 
  RefreshCcw,
  Tag,
  Search
} from "lucide-react";
import { CATEGORIES, FABRICS, CRAFTS, OCCASIONS, PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";
import { formatPrice } from "../utils/helpers";

export default function Catalog({
  currency,
  searchTerm,
  setSearchTerm,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  isWholesaleMode,
  setIsWholesaleMode,
  activeCategory,
  setActiveCategory
}) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedCrafts, setSelectedCrafts] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sortBy, setSortBy] = useState("featured");

  // Toggle helpers
  const toggleFabric = (f) => {
    setSelectedFabrics(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };
  const toggleCraft = (c) => {
    setSelectedCrafts(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };
  const toggleOccasion = (o) => {
    setSelectedOccasions(prev => prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]);
  };

  const resetAllFilters = () => {
    setActiveCategory("all");
    setSelectedFabrics([]);
    setSelectedCrafts([]);
    setSelectedOccasions([]);
    setMaxPrice(25000);
    setSearchTerm("");
    setSortBy("featured");
  };

  const activeFiltersCount = 
    (activeCategory !== "all" ? 1 : 0) +
    selectedFabrics.length +
    selectedCrafts.length +
    selectedOccasions.length +
    (maxPrice < 25000 ? 1 : 0) +
    (searchTerm ? 1 : 0);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (activeCategory !== "all" && product.category !== activeCategory) {
        return false;
      }
      // Fabric filter
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(product.fabric)) {
        return false;
      }
      // Craft filter
      if (selectedCrafts.length > 0 && !selectedCrafts.includes(product.craft)) {
        return false;
      }
      // Occasion filter
      if (selectedOccasions.length > 0 && !selectedOccasions.includes(product.occasion)) {
        return false;
      }
      // Price filter (INR based)
      const currentPrice = isWholesaleMode ? product.wholesalePriceINR : product.priceINR;
      if (currentPrice > maxPrice) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSKU = product.sku.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesCraft = product.craft.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesSKU && !matchesFabric && !matchesCraft && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const priceA = isWholesaleMode ? a.wholesalePriceINR : a.priceINR;
      const priceB = isWholesaleMode ? b.wholesalePriceINR : b.priceINR;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0; // featured default
    });
  }, [activeCategory, selectedFabrics, selectedCrafts, selectedOccasions, maxPrice, searchTerm, sortBy, isWholesaleMode]);

  return (
    <section id="catalog-section" className="py-12 md:py-16 bg-[#FAF6F0]">
      <div className="rk-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2D8] border border-[#D4AF37]/50 text-[#8C6B1B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surat Direct Loom Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#4A000E]">
            Exquisite Ethnic Collections
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Browse our curated handlooms, zari brocades, bridal ensembles, and wholesale master packs.
          </p>
        </div>

        {/* Wholesale vs Retail Toggle Banner */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#3F000B] via-[#680516] to-[#3F000B] border border-[#D4AF37] text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-bold flex-shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="font-serif font-bold text-sm sm:text-base text-[#F3E5AB]">
                  {isWholesaleMode ? "Wholesale B2B Pricing Active" : "Retail Single Piece Pricing Active"}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-white">
                  {isWholesaleMode ? "Surat Factory Rates" : "Single Piece"}
                </span>
              </div>
              <p className="text-xs text-[#FAF5EE]/80 mt-0.5">
                {isWholesaleMode 
                  ? "Showing set-wise wholesale rates for boutiques, showrooms & resellers." 
                  : "Switch to Wholesale Mode to view factory bulk pricing per set."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWholesaleMode(!isWholesaleMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
              isWholesaleMode 
                ? "bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#F3E5AB]" 
                : "bg-white/15 hover:bg-white/25 text-[#F3E5AB] border border-[#D4AF37]/50"
            }`}
          >
            <span>{isWholesaleMode ? "✓ Wholesale Mode Active" : "Switch to Wholesale Rates"}</span>
          </button>
        </div>

        {/* Category Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 flex-shrink-0 ${
                  isActive
                    ? "bg-[#780016] text-white border border-[#D4AF37] shadow-md scale-105"
                    : "bg-white text-gray-700 hover:bg-[#FAF2D8] border border-gray-200"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-[#D4AF37] text-[#1A1A1A]" : "bg-gray-100 text-gray-500"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls Bar: Filter Toggle & Sort Dropdown */}
        <div className="bg-white p-3 rounded-xl border border-[#D4AF37]/30 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/40 text-xs font-bold text-[#4A000E]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 bg-[#780016] text-white rounded-full text-[10px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <span className="text-xs text-gray-600 font-medium">
              Showing <strong className="text-[#780016] font-bold">{filteredProducts.length}</strong> items
            </span>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="hidden md:flex items-center gap-1.5 flex-wrap">
              {selectedFabrics.map(f => (
                <span key={f} className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#FAF2D8] text-[#8C6B1B] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                  {f}
                  <button onClick={() => toggleFabric(f)} className="hover:text-red-700">✕</button>
                </span>
              ))}
              {selectedCrafts.map(c => (
                <span key={c} className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#FAF2D8] text-[#8C6B1B] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                  {c}
                  <button onClick={() => toggleCraft(c)} className="hover:text-red-700">✕</button>
                </span>
              ))}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#FAF2D8] text-[#8C6B1B] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-red-700">✕</button>
                </span>
              )}
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-[#780016] hover:underline font-bold ml-1 flex items-center gap-1"
              >
                <RefreshCcw className="w-3 h-3" />
                Reset All
              </button>
            </div>
          )}

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg px-2.5 py-1.5 text-[#4A000E] font-semibold focus:outline-none focus:border-[#780016]"
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

        </div>

        {/* Catalog Main Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-base font-bold text-[#4A000E] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                  <span>Refine Catalog</span>
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs text-[#780016] hover:underline font-bold"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
                  <span>Max Price:</span>
                  <span className="text-[#780016] font-serif text-sm">
                    {formatPrice(maxPrice, currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="25000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#780016] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>{formatPrice(1500, currency)}</span>
                  <span>{formatPrice(25000, currency)}</span>
                </div>
              </div>

              {/* Fabric Filter */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-serif text-xs font-bold text-[#4A000E] uppercase tracking-wider mb-2.5">
                  Surat Fabric Weave
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {FABRICS.map(fab => {
                    const checked = selectedFabrics.includes(fab);
                    return (
                      <label 
                        key={fab}
                        className="flex items-center gap-2 text-xs text-gray-700 hover:text-[#780016] cursor-pointer py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleFabric(fab)}
                          className="rounded text-[#780016] focus:ring-[#780016] accent-[#780016]"
                        />
                        <span>{fab}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Craft / Work Filter */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-serif text-xs font-bold text-[#4A000E] uppercase tracking-wider mb-2.5">
                  Craft & Embroidery
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {CRAFTS.map(craft => {
                    const checked = selectedCrafts.includes(craft);
                    return (
                      <label 
                        key={craft}
                        className="flex items-center gap-2 text-xs text-gray-700 hover:text-[#780016] cursor-pointer py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCraft(craft)}
                          className="rounded text-[#780016] focus:ring-[#780016] accent-[#780016]"
                        />
                        <span>{craft}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Occasion Filter */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-serif text-xs font-bold text-[#4A000E] uppercase tracking-wider mb-2.5">
                  Occasion
                </h4>
                <div className="space-y-1.5">
                  {OCCASIONS.map(occ => {
                    const checked = selectedOccasions.includes(occ);
                    return (
                      <label 
                        key={occ}
                        className="flex items-center gap-2 text-xs text-gray-700 hover:text-[#780016] cursor-pointer py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleOccasion(occ)}
                          className="rounded text-[#780016] focus:ring-[#780016] accent-[#780016]"
                        />
                        <span>{occ}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-dashed border-[#D4AF37] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF2D8] mx-auto flex items-center justify-center border border-[#D4AF37]">
                  <Search className="w-8 h-8 text-[#8C6B1B]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#4A000E]">
                  No matching sarees or outfits found
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try adjusting your fabric, price range, or category filter to discover more handcrafted pieces.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="rk-btn-gold text-xs px-5 py-2.5"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    isWholesaleMode={isWholesaleMode}
                  />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-serif text-lg font-bold text-[#4A000E] flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
                  <span>Filter Catalog</span>
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 mb-2">
                  <span>Max Price:</span>
                  <span className="text-[#780016] font-serif text-sm">
                    {formatPrice(maxPrice, currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="25000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#780016]"
                />
              </div>

              {/* Fabrics */}
              <div>
                <h4 className="font-serif text-xs font-bold text-[#4A000E] uppercase mb-2">
                  Fabrics
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {FABRICS.map(f => (
                    <label key={f} className="flex items-center gap-2 text-xs text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedFabrics.includes(f)}
                        onChange={() => toggleFabric(f)}
                        className="accent-[#780016]"
                      />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Crafts */}
              <div>
                <h4 className="font-serif text-xs font-bold text-[#4A000E] uppercase mb-2">
                  Work Type
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {CRAFTS.map(c => (
                    <label key={c} className="flex items-center gap-2 text-xs text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedCrafts.includes(c)}
                        onChange={() => toggleCraft(c)}
                        className="accent-[#780016]"
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="rk-btn-primary w-full text-xs font-bold py-3"
              >
                View {filteredProducts.length} Results
              </button>
              <button
                onClick={() => {
                  resetAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 text-xs text-gray-500 hover:text-[#780016]"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
