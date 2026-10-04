import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { LuxuryImage } from './LuxuryImage.tsx';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products, navigate } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const searchResults = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.sku.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed) ||
          p.categoryName.toLowerCase().includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed)
      )
    : [];

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate('product-details', { productId });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmed) {
      onClose();
      navigate('search', { q: query });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#1C2620]/60 backdrop-blur-xs transition-opacity">
      <div 
        className="w-full max-w-2xl bg-[#FDFCF7] border border-[#BAC7BE]/50 shadow-2xl rounded-xs overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-[#BAC7BE]/30 px-5 py-4">
          <Search className="w-5 h-5 text-[#7A9382] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by botanical, note, SKU, artisan category..."
            className="w-full bg-transparent text-sm text-[#1C2620] placeholder-[#9AAEA0] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#9AAEA0] hover:text-[#1C2620] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs tracking-wider uppercase text-[#7A9382] hover:text-[#1C2620] font-medium"
          >
            Esc
          </button>
        </form>

        {/* Popular searches suggestions */}
        {!trimmed && (
          <div className="p-6">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#7A9382] mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Suggested Inquiries</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Clary Sage', 'Kyoto Stoneware', 'Sea Buckthorn', 'Belgian Linen', 'Unlacquered Brass', 'Room Spray'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="text-xs px-3 py-1.5 rounded-xs bg-[#E8EFE9] text-[#334338] hover:bg-[#D5E1D7] transition-colors border border-[#BAC7BE]/40"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {trimmed && (
          <div className="max-h-96 overflow-y-auto divide-y divide-[#E8EFE9]">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center justify-between p-4 hover:bg-[#FAF7F2] cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <LuxuryImage
                      src={product.mainImage}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-xs border border-[#BAC7BE]/40"
                      containerClassName="w-12 h-12 rounded-xs flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-2 text-[11px] text-[#7A9382]">
                        <span className="uppercase tracking-wider">{product.categoryName}</span>
                        <span>•</span>
                        <span>{product.sku}</span>
                      </div>
                      <h4 className="font-serif text-sm text-[#1C2620] font-medium">
                        {product.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-sm font-medium text-[#1C2620]">
                      ${product.price.toFixed(2)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#7A9382]" />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#7A9382]">
                <p className="font-serif text-base text-[#1C2620] mb-1">
                  No products matched "{query}"
                </p>
                <p>Verify spelling or explore our catalog categories.</p>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="bg-[#FAF7F2] px-5 py-2.5 border-t border-[#BAC7BE]/20 flex items-center justify-between text-[11px] text-[#7A9382]">
          <span>Authoritative catalog search</span>
          <span>Press Enter to view all results</span>
        </div>
      </div>
    </div>
  );
};
