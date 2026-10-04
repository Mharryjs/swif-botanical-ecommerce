import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { LuxuryImage } from './LuxuryImage.tsx';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    cart, 
    cartSubtotal, 
    cartShipping, 
    cartTax, 
    cartTotal, 
    updateCartQuantity, 
    removeFromCart, 
    navigate 
  } = useStore();

  if (!isOpen) return null;

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleProceedToCheckout = () => {
    onClose();
    navigate('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1C2620]/50 backdrop-blur-xs transition-opacity">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#FDFCF7] border-l border-[#BAC7BE]/40 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#BAC7BE]/30 flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#5C7764]" />
              <h2 className="font-serif text-lg tracking-wide text-[#1C2620]">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A9382] hover:text-[#1C2620] rounded-xs transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          {cart.length > 0 && (
            <div className="px-6 py-3 bg-[#E8EFE9]/50 border-b border-[#BAC7BE]/30">
              <div className="flex justify-between text-xs text-[#334338] mb-1.5">
                <span>
                  {remainingForFreeShipping > 0
                    ? `Add $${remainingForFreeShipping.toFixed(2)} more for complimentary shipping`
                    : 'You have qualified for complimentary worldwide delivery'}
                </span>
                <span className="font-medium">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-[#BAC7BE]/40 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-[#5C7764] h-full transition-all duration-300" 
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#BAC7BE]/20">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#E8EFE9] flex items-center justify-center text-[#7A9382] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-xl text-[#1C2620] mb-2">
                  Your cart is waiting for something special.
                </h3>
                <p className="text-xs text-[#5C7764] max-w-xs mb-6 leading-relaxed">
                  Explore our seasonal botanical harvests, fluted perfumes, and hand-thrown Kyoto ceramics.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('shop');
                  }}
                  className="bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-6 py-2.5 text-xs font-medium tracking-wider uppercase rounded-xs transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  <LuxuryImage
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xs border border-[#BAC7BE]/40 bg-[#FAF7F2]"
                    containerClassName="w-20 h-20 rounded-xs flex-shrink-0"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm text-[#1C2620] font-medium leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-[#9AAEA0] hover:text-rose-700 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7A9382]">SKU: {item.product.sku}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#BAC7BE]/50 rounded-xs bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="p-1 text-[#5C7764] hover:text-[#1C2620] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-[#1C2620]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockQuantity}
                          className={`p-1 text-[#5C7764] hover:text-[#1C2620] transition-colors ${
                            item.quantity >= item.product.stockQuantity ? 'opacity-40 cursor-not-allowed' : ''
                          }`}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-medium text-[#1C2620]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FAF7F2] border-t border-[#BAC7BE]/30 space-y-3">
              <div className="space-y-1.5 text-xs text-[#5C7764]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1C2620]">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{cartShipping === 0 ? 'Complimentary' : `$${cartShipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${cartTax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#BAC7BE]/30 flex justify-between text-sm font-semibold text-[#1C2620]">
                  <span>Total</span>
                  <span className="font-serif text-lg">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] py-3 px-4 rounded-xs text-xs font-medium tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-[#7A9382] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5C7764]" />
                <span>Authoritative inventory lock at checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
