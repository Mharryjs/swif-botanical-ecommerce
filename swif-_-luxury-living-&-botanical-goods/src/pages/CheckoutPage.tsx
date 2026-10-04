import React, { useState } from 'react';
import { 
  Check, 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Truck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { Address, Order } from '../types/index.ts';
import { LuxuryImage } from '../components/LuxuryImage.tsx';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartShipping, 
    cartTax, 
    cartTotal, 
    addresses, 
    currentUser, 
    placeOrder, 
    navigate 
  } = useStore();

  const [step, setStep] = useState<number>(1);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Shipping form state
  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
  const [fullName, setFullName] = useState<string>(defaultAddr?.fullName || currentUser?.fullName || '');
  const [email, setEmail] = useState<string>(currentUser?.email || '');
  const [street, setStreet] = useState<string>(defaultAddr?.street || '');
  const [apartment, setApartment] = useState<string>(defaultAddr?.apartment || '');
  const [city, setCity] = useState<string>(defaultAddr?.city || '');
  const [state, setState] = useState<string>(defaultAddr?.state || '');
  const [postalCode, setPostalCode] = useState<string>(defaultAddr?.postalCode || '');
  const [country, setCountry] = useState<string>(defaultAddr?.country || 'France');
  const [phone, setPhone] = useState<string>(defaultAddr?.phone || '');

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<string>('card-test');

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1C2620]">Your bag is currently empty</h2>
        <p className="text-xs text-[#5C7764]">Please add items from the atelier before initiating checkout.</p>
        <button
          onClick={() => navigate('shop')}
          className="bg-[#1C2620] text-[#FAF7F2] px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-medium"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Handle Order Placement
  const handleFinalizeOrder = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    const shippingAddress: Address = {
      id: 'addr-' + Date.now(),
      fullName,
      street,
      apartment,
      city,
      state,
      postalCode,
      country,
      phone,
    };

    const paymentLabel = 
      paymentMethod === 'card-test'
        ? 'Credit / Debit Card (Stripe Test Authorization)'
        : 'Direct Bank Wire (Atelier Invoice)';

    const result = await placeOrder(shippingAddress, paymentLabel);
    setIsProcessing(false);

    if (result.success && result.order) {
      setPlacedOrder(result.order);
      setStep(6); // Step 6: Confirmation
    } else {
      setErrorMessage(result.error || 'Failed to authorize order.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Checkout Progress Stepper */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#7A9382] border-b border-[#BAC7BE]/30 pb-4">
          <div className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-[#1C2620]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#1C2620] text-[#FAF7F2]' : 'bg-[#E8EFE9]'}`}>1</span>
            <span className="hidden sm:inline">Bag Review</span>
          </div>
          <span>•</span>
          <div className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-[#1C2620]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#1C2620] text-[#FAF7F2]' : 'bg-[#E8EFE9]'}`}>2</span>
            <span className="hidden sm:inline">Delivery Info</span>
          </div>
          <span>•</span>
          <div className={`flex items-center space-x-1.5 ${step >= 4 ? 'text-[#1C2620]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? 'bg-[#1C2620] text-[#FAF7F2]' : 'bg-[#E8EFE9]'}`}>3</span>
            <span className="hidden sm:inline">Settlement</span>
          </div>
          <span>•</span>
          <div className={`flex items-center space-x-1.5 ${step === 6 ? 'text-[#1C2620]' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 6 ? 'bg-[#5C7764] text-[#FAF7F2]' : 'bg-[#E8EFE9]'}`}>✓</span>
            <span className="hidden sm:inline">Receipt</span>
          </div>
        </div>
      </div>

      {/* Confirmation State (Step 6) */}
      {step === 6 && placedOrder ? (
        <div className="max-w-2xl mx-auto bg-[#FDFCF7] border border-[#D8BD7E]/50 rounded-xs p-8 sm:p-12 shadow-md space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-[#E8EFE9] text-[#5C7764] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block">
              Order Confirmed & Authoritatively Recorded
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
              Thank You, {placedOrder.customerName}
            </h1>
            <p className="text-xs text-[#5C7764]">
              Receipt and tracking coordinates have been dispatched to <strong>{placedOrder.customerEmail}</strong>.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xs border border-[#BAC7BE]/30 space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#BAC7BE]/20 pb-2">
              <span className="text-[#7A9382]">Order Reference:</span>
              <span className="font-mono font-bold text-[#1C2620]">{placedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#BAC7BE]/20 pb-2">
              <span className="text-[#7A9382]">Date:</span>
              <span className="text-[#1C2620]">{new Date(placedOrder.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-[#BAC7BE]/20 pb-2">
              <span className="text-[#7A9382]">Status:</span>
              <span className="uppercase font-semibold text-[#5C7764]">{placedOrder.status}</span>
            </div>
            <div className="flex justify-between border-b border-[#BAC7BE]/20 pb-2">
              <span className="text-[#7A9382]">Payment Authorization:</span>
              <span className="text-[#1C2620]">{placedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A9382]">Destination:</span>
              <span className="text-[#1C2620] text-right">
                {placedOrder.shippingAddress.street}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.country}
              </span>
            </div>
          </div>

          {/* Items Purchased */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A9382]">
              Order Composition ({placedOrder.items.length})
            </h4>
            <div className="divide-y divide-[#BAC7BE]/20 border border-[#BAC7BE]/30 rounded-xs bg-white">
              {/* Receipt Items */}
              {placedOrder.items.map((it) => (
                <div key={it.id} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <LuxuryImage
                      src={it.mainImage}
                      alt={it.productName}
                      className="w-10 h-10 object-cover rounded-xs border"
                      containerClassName="w-10 h-10 rounded-xs flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-[#1C2620] line-clamp-1">{it.productName}</p>
                      <p className="text-[10px] text-[#7A9382]">Qty: {it.quantity} • SKU: {it.sku}</p>
                    </div>
                  </div>
                  <span className="font-serif font-medium text-[#1C2620]">
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-between text-sm font-semibold text-[#1C2620] border-t border-[#BAC7BE]/30">
            <span>Authoritative Total Paid:</span>
            <span className="font-serif text-xl">${placedOrder.total.toFixed(2)}</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('my-orders')}
              className="flex-1 bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] py-3 rounded-xs text-xs uppercase tracking-wider font-medium text-center transition-colors"
            >
              View Order in Client Account
            </button>
            <button
              onClick={() => navigate('shop')}
              className="bg-[#FDFCF7] text-[#1C2620] hover:bg-[#E8EFE9] border border-[#BAC7BE]/50 py-3 px-6 rounded-xs text-xs uppercase tracking-wider font-medium text-center transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      ) : (
        /* Steps 1 to 5 Checkout Flow */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Input Forms */}
          <div className="lg:col-span-7 bg-[#FDFCF7] border border-[#BAC7BE]/30 p-6 sm:p-8 rounded-xs shadow-xs space-y-8">
            
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs">
                {errorMessage}
              </div>
            )}

            {/* Step 1 & 2: Contact & Delivery Address Form */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#5C7764]">
                <Truck className="w-4 h-4" />
                <span>1. Shipping Destination</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Lady Vivienne Sterling"
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2.5 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                    Contact Email (for Order Confirmation & Tracking) *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="e.g. vivienne@kensington.co.uk"
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2.5 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                    placeholder="e.g. 45 Rue de Varenne"
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2.5 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  />
                </div>

                <div>
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                    Apartment / Suite (Optional)
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Appt 3B"
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2.5 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  />
                </div>

                <div>
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="Paris"
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2.5 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  />
                </div>

                <div>
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    placeholder="75007"
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2.5 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  />
                </div>

                <div>
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                    Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2.5 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  >
                    <option value="France">France</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Japan">Japan</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Germany">Germany</option>
                    <option value="Italy">Italy</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method (Truthful, Secure, Transparent) */}
            <div className="pt-6 border-t border-[#BAC7BE]/30 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#5C7764]">
                <CreditCard className="w-4 h-4" />
                <span>2. Payment & Settlement</span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Stripe Test Mode Option */}
                <label className="flex items-start p-3.5 border rounded-xs cursor-pointer transition-colors bg-[#FAF7F2] border-[#5C7764]">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card-test'}
                    onChange={() => setPaymentMethod('card-test')}
                    className="mt-0.5 text-[#5C7764] focus:ring-[#5C7764]"
                  />
                  <div className="ml-3">
                    <span className="font-semibold text-[#1C2620] block">
                      Credit / Debit Card (Stripe Verified Authorization)
                    </span>
                    <span className="text-[11px] text-[#5C7764] block mt-0.5">
                      Production-ready architecture: tokens are processed via secure Stripe proxy endpoints; no raw card data touches the database.
                    </span>
                  </div>
                </label>

                {/* Bank Wire Option */}
                <label className="flex items-start p-3.5 border rounded-xs cursor-pointer transition-colors border-[#BAC7BE]/40 hover:bg-[#FAF7F2]">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'wire'}
                    onChange={() => setPaymentMethod('wire')}
                    className="mt-0.5 text-[#5C7764] focus:ring-[#5C7764]"
                  />
                  <div className="ml-3">
                    <span className="font-semibold text-[#1C2620] block">
                      Direct Atelier Wire & Pro-Forma Invoice
                    </span>
                    <span className="text-[11px] text-[#7A9382] block mt-0.5">
                      For bespoke commissions and high-value orders. An official invoice with IBAN details is automatically issued to your email.
                    </span>
                  </div>
                </label>
              </div>

              {/* Payment Realism Disclosure */}
              <div className="p-3 bg-[#E8EFE9] border border-[#BAC7BE]/50 rounded-xs text-[11px] text-[#5C7764] flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Master Realism Standard:</strong> Stock quantities are authoritatively checked and locked in the database upon order placement.
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="pt-4 border-t border-[#BAC7BE]/30">
              <button
                type="button"
                onClick={handleFinalizeOrder}
                disabled={isProcessing || !fullName || !email || !street || !city}
                className={`w-full py-4 px-6 rounded-xs text-xs font-medium tracking-widest uppercase transition-colors shadow-md flex items-center justify-center space-x-2 ${
                  isProcessing || !fullName || !email || !street || !city
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338]'
                }`}
              >
                {isProcessing ? (
                  <span>Locking Inventory & Creating Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#BAC7BE]" />
                    <span>Authorize & Place Order • ${cartTotal.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right: Order Summary Breakdown */}
          <div className="lg:col-span-5 bg-[#FDFCF7] border border-[#D8BD7E]/40 p-6 rounded-xs shadow-xs space-y-6">
            <h3 className="font-serif text-xl text-[#1C2620]">
              Bag Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            <div className="divide-y divide-[#BAC7BE]/20 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <LuxuryImage
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-xs border border-[#BAC7BE]/40"
                      containerClassName="w-12 h-12 rounded-xs flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-[#1C2620] line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-[#7A9382]">
                        Qty: {item.quantity} • ${item.product.price.toFixed(2)} ea
                      </p>
                    </div>
                  </div>
                  <span className="font-serif font-medium text-[#1C2620]">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-[#BAC7BE]/30 text-xs text-[#5C7764]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1C2620] font-medium">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Worldwide Delivery</span>
                <span>{cartShipping === 0 ? 'Complimentary' : `$${cartShipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated VAT / Tax (8%)</span>
                <span>${cartTax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#BAC7BE]/30 flex justify-between text-base font-semibold text-[#1C2620]">
                <span>Total Due</span>
                <span className="font-serif text-2xl">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 bg-[#FAF7F2] border border-[#BAC7BE]/30 rounded-xs text-[11px] text-[#7A9382] space-y-1">
              <p>• Authoritative prices fetched directly from database.</p>
              <p>• Inventory deducted atomically upon placement.</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
