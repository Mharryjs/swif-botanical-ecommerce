import React, { useState, useRef } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types/index.ts';
import { useStore } from '../context/StoreContext.tsx';
import { LuxuryImage } from './LuxuryImage.tsx';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart, isInWishlist, toggleWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stockQuantity <= 0;

  // 3D Perspective Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7.5; // Max 7.5 deg tilt
    const rotateY = ((x - centerX) / centerX) * 7.5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02) translateZ(8px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      onClick={() => navigate('product-details', { productId: product.id })}
      className="group relative bg-[#FDFCF7]/85 backdrop-blur-md border border-[#BAC7BE]/40 hover:border-[#D8BD7E]/70 rounded-xs transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl preserve-3d"
    >
      {/* Top Image Stage with 3D Depth */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#F4EFE6]/50 p-4 flex items-center justify-center">
        {/* Luxury Image with Fallback and Shimmer */}
        <LuxuryImage
          src={product.mainImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center rounded-xs transition-transform duration-700 ease-out group-hover:scale-108"
          containerClassName="w-full h-full rounded-xs shadow-inner"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.newArrival && (
            <span className="bg-[#FAF7F2]/95 backdrop-blur-md text-[#5C7764] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-xs border border-[#BAC7BE]/50 shadow-xs">
              New Batch
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="bg-[#FAF7F2]/95 backdrop-blur-md text-[#B7903D] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-xs border border-[#D8BD7E]/50 shadow-xs">
              Atelier Archive
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-[#1C2620]/95 text-[#FAF7F2] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-xs shadow-xs">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isWishlisted 
              ? 'bg-[#1C2620] text-[#FAF7F2] shadow-md' 
              : 'bg-[#FDFCF7]/90 text-[#1C2620] hover:text-[#5C7764] hover:bg-white shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#D8BD7E]' : ''}`} />
        </button>

        {/* Subtle Quick Hover Action Drawer */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hidden sm:flex items-center gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`flex-1 py-2.5 px-3 rounded-xs text-xs font-medium tracking-wider uppercase transition-colors shadow-md flex items-center justify-center space-x-1.5 ${
              isOutOfStock 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Quick Add'}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('product-details', { productId: product.id });
            }}
            className="p-2.5 bg-[#FDFCF7] hover:bg-white text-[#1C2620] rounded-xs border border-[#BAC7BE]/50 shadow-md transition-colors"
            title="Inspect Specifications"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Section with Frosted Glass Look */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white/70 backdrop-blur-sm">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#7A9382] mb-1">
            <span className="uppercase tracking-wider font-medium">{product.brand}</span>
            <span className="font-mono text-[10px]">{product.sku}</span>
          </div>

          <h3 className="font-serif text-base text-[#1C2620] group-hover:text-[#5C7764] transition-colors line-clamp-1 font-medium">
            {product.name}
          </h3>

          <p className="text-xs text-[#5C7764] line-clamp-2 mt-1 mb-3 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Rating (Truthful: only show if genuine) */}
        <div className="pt-2 border-t border-[#BAC7BE]/25 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="font-serif text-lg font-medium text-[#1C2620]">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#9AAEA0] line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Genuine Reviews Only */}
          <div className="text-[11px] text-[#7A9382]">
            {product.reviewCount > 0 ? (
              <span className="flex items-center text-[#B7903D] font-medium">
                ★ {product.rating?.toFixed(1)} <span className="text-[#9AAEA0] ml-1">({product.reviewCount})</span>
              </span>
            ) : (
              <span className="text-[#9AAEA0] italic text-[10px]">No reviews yet</span>
            )}
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className={`sm:hidden mt-3 w-full py-2.5 px-3 rounded-xs text-xs font-medium tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5 shadow-sm ${
            isOutOfStock 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-[#1C2620] text-[#FAF7F2]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
        </button>
      </div>
    </div>
  );
};
