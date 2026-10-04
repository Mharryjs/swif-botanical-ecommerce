import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  Check, 
  ArrowLeft,
  Share2
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import { LuxuryImage } from '../components/LuxuryImage.tsx';

interface ProductDetailsPageProps {
  productId: string;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ productId }) => {
  const { 
    products, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    navigate, 
    getProductReviews, 
    addReview,
    currentUser,
    addToast
  } = useStore();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl text-[#1C2620] mb-3">Product Unavailable</h2>
        <p className="text-xs text-[#5C7764] mb-6">This item may have been archived or removed from the atelier catalog.</p>
        <button
          onClick={() => navigate('shop')}
          className="bg-[#1C2620] text-[#FAF7F2] px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-medium"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review form state
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);

  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stockQuantity <= 0;
  const reviews = getProductReviews(product.id);

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      const added = addToCart(product, quantity);
      if (added) {
        navigate('checkout');
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard.', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      addToast('Please write a comment for your review.', 'error');
      return;
    }
    setIsSubmittingReview(true);
    addReview(product.id, reviewRating, reviewComment.trim());
    setReviewComment('');
    setIsSubmittingReview(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#7A9382]">
        <button onClick={() => navigate('home')} className="hover:text-[#1C2620]">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigate('shop')} className="hover:text-[#1C2620]">
          Shop
        </button>
        <span>/</span>
        <button 
          onClick={() => navigate('category', { categorySlug: product.categoryId })}
          className="hover:text-[#1C2620]"
        >
          {product.categoryName}
        </button>
        <span>/</span>
        <span className="text-[#1C2620] font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Layout: Gallery + Purchasing Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Multi-Image Editorial Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Stage */}
          <div className="relative aspect-square w-full bg-[#FAF7F2] rounded-xs border border-[#D8BD7E]/30 overflow-hidden shadow-md">
            <LuxuryImage
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              containerClassName="w-full h-full"
            />
            {isOutOfStock && (
              <div className="absolute top-4 left-4 bg-[#1C2620]/90 text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-xs">
                Out of Stock
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {product.galleryImages && product.galleryImages.length > 0 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => setActiveImage(product.mainImage)}
                className={`relative w-20 h-20 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 ${
                  activeImage === product.mainImage
                    ? 'border-[#5C7764] ring-1 ring-[#5C7764]'
                    : 'border-[#BAC7BE]/50 hover:border-[#BAC7BE]'
                }`}
              >
                <LuxuryImage
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </button>

              {product.galleryImages.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImage(img.url)}
                  className={`relative w-20 h-20 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === img.url
                      ? 'border-[#5C7764] ring-1 ring-[#5C7764]'
                      : 'border-[#BAC7BE]/50 hover:border-[#BAC7BE]'
                  }`}
                >
                  <LuxuryImage
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Purchasing Actions & Metadata */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between text-xs text-[#7A9382] mb-1">
              <span className="uppercase tracking-[0.2em] font-semibold text-[#5C7764]">
                {product.brand}
              </span>
              <span>SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2620] leading-tight">
              {product.name}
            </h1>

            {/* Ratings Summary (Truthful) */}
            <div className="mt-2 flex items-center space-x-3 text-xs">
              {product.reviewCount > 0 ? (
                <div className="flex items-center text-[#B7903D]">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span className="font-medium text-[#1C2620]">{product.rating?.toFixed(1)}</span>
                  <span className="text-[#7A9382] ml-1">
                    ({product.reviewCount} verified {product.reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              ) : (
                <span className="text-[#9AAEA0] italic">No reviews yet</span>
              )}

              <span className="text-[#BAC7BE]">•</span>
              <button 
                onClick={handleShare}
                className="text-[#7A9382] hover:text-[#1C2620] flex items-center space-x-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs flex items-baseline space-x-3">
            <span className="font-serif text-3xl font-medium text-[#1C2620]">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-sm text-[#9AAEA0] line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
                <span className="text-xs text-[#B7903D] font-medium uppercase tracking-wider">
                  Save ${(product.compareAtPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Short Description */}
          <p className="text-sm text-[#5C7764] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Real Stock Status */}
          <div className="text-xs">
            {isOutOfStock ? (
              <div className="p-3 bg-stone-100 text-stone-700 rounded-xs border border-stone-200">
                <span className="font-semibold block">Sold Out in Current Harvest</span>
                <span className="text-[11px] text-stone-500">
                  This batch has been fully reserved. Our atelier is curing the next distillation.
                </span>
              </div>
            ) : product.stockQuantity <= 5 ? (
              <div className="p-3 bg-amber-50 text-amber-800 rounded-xs border border-amber-200">
                <span className="font-semibold block">Limited Batch Remaining</span>
                <span className="text-[11px] text-amber-700">
                  Only {product.stockQuantity} units available before harvest closure.
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-[#5C7764]">
                <Check className="w-4 h-4 text-[#5C7764]" />
                <span className="font-medium">In Stock ({product.stockQuantity} available in current batch)</span>
              </div>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          {!isOutOfStock && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-[#BAC7BE]/50 rounded-xs bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#5C7764] hover:text-[#1C2620] text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-[#1C2620]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    disabled={quantity >= product.stockQuantity}
                    className="px-3 py-2 text-[#5C7764] hover:text-[#1C2620] text-sm disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] py-3 px-6 rounded-xs text-xs font-medium tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xs border transition-colors ${
                    isWishlisted
                      ? 'bg-[#1C2620] text-[#FAF7F2] border-[#1C2620]'
                      : 'bg-[#FDFCF7] text-[#1C2620] border-[#BAC7BE]/50 hover:bg-[#E8EFE9]'
                  }`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#E8EFE9] text-[#1C2620] hover:bg-[#D5E1D7] border border-[#BAC7BE]/60 py-3 px-6 rounded-xs text-xs font-medium tracking-wider uppercase transition-colors"
              >
                Instant Checkout
              </button>
            </div>
          )}

          {/* Atelier Commitments */}
          <div className="pt-6 border-t border-[#BAC7BE]/30 space-y-3 text-xs text-[#5C7764]">
            <div className="flex items-center space-x-3">
              <Truck className="w-4 h-4 text-[#7A9382]" />
              <span>Complimentary climate-neutral delivery on orders over $150</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 text-[#7A9382]" />
              <span>Authentic batch verification code provided on every presentation box</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-4 h-4 text-[#7A9382]" />
              <span>30-day effortless returns on unopened formulations</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Detailed Description, Specifications, Reviews */}
      <div className="border-t border-[#BAC7BE]/30 pt-10">
        <div className="flex space-x-8 border-b border-[#BAC7BE]/30 pb-4 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-4 -mb-4 transition-colors ${
              activeTab === 'details'
                ? 'text-[#1C2620] border-b-2 border-[#1C2620]'
                : 'text-[#7A9382] hover:text-[#1C2620]'
            }`}
          >
            Formulation & Story
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 -mb-4 transition-colors ${
              activeTab === 'specs'
                ? 'text-[#1C2620] border-b-2 border-[#1C2620]'
                : 'text-[#7A9382] hover:text-[#1C2620]'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 -mb-4 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'reviews'
                ? 'text-[#1C2620] border-b-2 border-[#1C2620]'
                : 'text-[#7A9382] hover:text-[#1C2620]'
            }`}
          >
            <span>Verified Reviews</span>
            <span className="text-[10px] bg-[#E8EFE9] text-[#5C7764] px-1.5 py-0.5 rounded">
              {reviews.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Story / Full description */}
        {activeTab === 'details' && (
          <div className="py-8 max-w-3xl space-y-4 text-sm text-[#334338] leading-relaxed">
            <p>{product.description}</p>
          </div>
        )}

        {/* Tab 2: Technical Specifications */}
        {activeTab === 'specs' && (
          <div className="py-8 max-w-2xl">
            <div className="divide-y divide-[#BAC7BE]/20 border border-[#BAC7BE]/30 rounded-xs bg-[#FDFCF7]">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 p-3.5 text-xs">
                  <span className="font-semibold text-[#5C7764]">{key}</span>
                  <span className="text-[#1C2620]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Verified Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-8 space-y-8 max-w-3xl">
            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className="space-y-4 divide-y divide-[#BAC7BE]/20">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1C2620]">{rev.userName}</span>
                      <span className="text-[#7A9382]">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex text-[#B7903D] text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#5C7764] leading-relaxed pt-1">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs text-center text-xs text-[#7A9382]">
                <p className="font-serif text-lg text-[#1C2620] mb-1">No reviews yet.</p>
                <p>Be the first verified patron to record your impressions of this formulation.</p>
              </div>
            )}

            {/* Submit a Review Form */}
            <div className="bg-[#FDFCF7] border border-[#BAC7BE]/30 p-6 rounded-xs space-y-4">
              <h4 className="font-serif text-lg text-[#1C2620]">
                Write a Verified Impression
              </h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[11px] mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="bg-white border border-[#BAC7BE]/50 rounded-xs px-3 py-2 text-xs text-[#1C2620]"
                  >
                    <option value={5}>★★★★★ (5 Stars — Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars — Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars — Average)</option>
                    <option value={2}>★★☆☆☆ (2 Stars — Below Expectations)</option>
                    <option value={1}>★☆☆☆☆ (1 Star — Unsatisfactory)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[11px] mb-1">
                    Your Commentary
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe the tactile texture, scent development, or craftsmanship..."
                    required
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-xs text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-5 py-2.5 rounded-xs uppercase tracking-wider font-medium text-xs transition-colors"
                >
                  Publish Impression
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Related Formulations Carousel */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#BAC7BE]/30">
          <h3 className="font-serif text-2xl text-[#1C2620] mb-6">
            Complementary Formulations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
