import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from '../components/ProductCard.tsx';

interface ShopPageProps {
  initialCategorySlug?: string;
  isNewArrivalsOnly?: boolean;
  isBestSellersOnly?: boolean;
  initialSearchQuery?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategorySlug,
  isNewArrivalsOnly,
  isBestSellersOnly,
  initialSearchQuery
}) => {
  const { products, categories, currentParams } = useStore();

  // Active filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategorySlug || currentParams.categorySlug || 'all'
  );
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const searchQuery = initialSearchQuery || currentParams.q || '';

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return Array.from(set);
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (cat && p.categoryId !== cat.id) return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }

      // Price filter
      if (priceRange === 'under-100' && p.price >= 100) return false;
      if (priceRange === '100-200' && (p.price < 100 || p.price > 200)) return false;
      if (priceRange === 'over-200' && p.price <= 200) return false;

      // In stock
      if (onlyInStock && p.stockQuantity <= 0) return false;

      // Special flags
      if (isNewArrivalsOnly && !p.newArrival) return false;
      if (isBestSellersOnly && !p.bestSeller) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [
    products,
    categories,
    selectedCategory,
    selectedBrand,
    priceRange,
    onlyInStock,
    isNewArrivalsOnly,
    isBestSellersOnly,
    searchQuery
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange('all');
    setOnlyInStock(false);
    setSortBy('newest');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedBrand !== 'all' || 
    priceRange !== 'all' || 
    onlyInStock;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Breadcrumb Header */}
      <div className="border-b border-[#BAC7BE]/30 pb-6 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block mb-1">
            {isNewArrivalsOnly ? 'Fresh Distillations' : isBestSellersOnly ? 'Heirloom Classics' : searchQuery ? `Search: "${searchQuery}"` : 'The Curated Catalog'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
            {isNewArrivalsOnly 
              ? 'New Arrivals' 
              : isBestSellersOnly 
              ? 'Best Sellers' 
              : searchQuery 
              ? `Results for "${searchQuery}"` 
              : 'All Formulations & Objects'}
          </h1>
          <p className="text-xs text-[#5C7764] mt-2">
            Showing {sortedProducts.length} authentic {sortedProducts.length === 1 ? 'item' : 'items'} in current catalogue
          </p>
        </div>

        {/* Sorting Dropdown & Mobile Filter Toggle */}
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center space-x-2 px-3.5 py-2 bg-[#FDFCF7] border border-[#BAC7BE]/50 rounded-xs text-xs font-medium text-[#1C2620]"
          >
            <Filter className="w-3.5 h-3.5 text-[#5C7764]" />
            <span>Filters</span>
          </button>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#7A9382] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FDFCF7] border border-[#BAC7BE]/50 rounded-xs px-3 py-2 text-xs text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
            >
              <option value="newest">Newest Distillations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filters Sidebar */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-[#FDFCF7] border border-[#BAC7BE]/30 p-5 rounded-xs space-y-6 shadow-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#BAC7BE]/20">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C2620]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#5C7764]" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#5C7764] hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#7A9382] block">
                Category
              </label>
              <div className="space-y-1.5 text-xs text-[#334338]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="text-[#5C7764] focus:ring-[#5C7764]"
                  />
                  <span>All Disciplines</span>
                </label>
                {categories.map((c) => (
                  <label key={c.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === c.slug}
                      onChange={() => setSelectedCategory(c.slug)}
                      className="text-[#5C7764] focus:ring-[#5C7764]"
                    />
                    <span className="truncate">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#BAC7BE]/20">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#7A9382] block">
                Atelier Line
              </label>
              <div className="space-y-1.5 text-xs text-[#334338]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === 'all'}
                    onChange={() => setSelectedBrand('all')}
                    className="text-[#5C7764] focus:ring-[#5C7764]"
                  />
                  <span>All Lines</span>
                </label>
                {brands.map((b) => (
                  <label key={b} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === b}
                      onChange={() => setSelectedBrand(b)}
                      className="text-[#5C7764] focus:ring-[#5C7764]"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2.5 pt-4 border-t border-[#BAC7BE]/20">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#7A9382] block">
                Price Interval
              </label>
              <div className="space-y-1.5 text-xs text-[#334338]">
                {[
                  { id: 'all', label: 'Any Price' },
                  { id: 'under-100', label: 'Under $100' },
                  { id: '100-200', label: '$100 — $200' },
                  { id: 'over-200', label: '$200 and Above' },
                ].map((p) => (
                  <label key={p.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === p.id}
                      onChange={() => setPriceRange(p.id)}
                      className="text-[#5C7764] focus:ring-[#5C7764]"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="pt-4 border-t border-[#BAC7BE]/20">
              <label className="flex items-center space-x-2 cursor-pointer text-xs text-[#334338]">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-[#5C7764] focus:ring-[#5C7764]"
                />
                <span>In Stock Only</span>
              </label>
            </div>

          </div>
        </aside>

        {/* Products Grid Area */}
        <main className="lg:col-span-9">
          
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
              <span className="text-[#7A9382]">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center bg-[#E8EFE9] text-[#1C2620] px-2.5 py-1 rounded-xs border border-[#BAC7BE]/40">
                  {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="ml-1.5 hover:text-rose-700">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center bg-[#E8EFE9] text-[#1C2620] px-2.5 py-1 rounded-xs border border-[#BAC7BE]/40">
                  {selectedBrand}
                  <button onClick={() => setSelectedBrand('all')} className="ml-1.5 hover:text-rose-700">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="inline-flex items-center bg-[#E8EFE9] text-[#1C2620] px-2.5 py-1 rounded-xs border border-[#BAC7BE]/40">
                  {priceRange}
                  <button onClick={() => setPriceRange('all')} className="ml-1.5 hover:text-rose-700">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {onlyInStock && (
                <span className="inline-flex items-center bg-[#E8EFE9] text-[#1C2620] px-2.5 py-1 rounded-xs border border-[#BAC7BE]/40">
                  In Stock Only
                  <button onClick={() => setOnlyInStock(false)} className="ml-1.5 hover:text-rose-700">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs p-16 text-center space-y-4 shadow-xs">
              <h3 className="font-serif text-2xl text-[#1C2620]">
                No products matched your criteria
              </h3>
              <p className="text-xs text-[#5C7764] max-w-sm mx-auto leading-relaxed">
                Adjust or reset your filters to explore our full collection of botanicals, stoneware, and textiles.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center space-x-2 bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-5 py-2.5 rounded-xs text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
