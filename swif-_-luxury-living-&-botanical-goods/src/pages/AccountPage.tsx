import React, { useState } from 'react';
import { 
  Package, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { Address } from '../types/index.ts';
import { LuxuryImage } from '../components/LuxuryImage.tsx';

export const AccountPage: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    products, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    addresses, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress, 
    logoutUser, 
    navigate 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'security'>('orders');
  
  // New Address form modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostal, setNewPostal] = useState('');
  const [newCountry, setNewCountry] = useState('France');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#1C2620]">Authentication Required</h2>
        <p className="text-xs text-[#5C7764]">Please sign in to inspect your orders and atelier profile.</p>
        <button
          onClick={() => navigate('login')}
          className="bg-[#1C2620] text-[#FAF7F2] px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-medium"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Filter wishlisted products
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newStreet || !newCity || !newPostal) return;

    addAddress({
      fullName: newFullName,
      street: newStreet,
      city: newCity,
      state: newState,
      postalCode: newPostal,
      country: newCountry,
      isDefault: addresses.length === 0,
    });

    setShowAddressModal(false);
    setNewFullName('');
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPostal('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Account Overview Header */}
      <div className="bg-[#FDFCF7] border border-[#BAC7BE]/30 p-6 sm:p-8 rounded-xs shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A9382] block mb-1">
            Client Portfolio
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1C2620]">
            Welcome, {currentUser.fullName}
          </h1>
          <p className="text-xs text-[#5C7764] mt-0.5">
            {currentUser.email} • Patron since {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {currentUser.role === 'admin' && (
            <button
              onClick={() => navigate('admin-dashboard')}
              className="bg-[#E8EFE9] text-[#1C2620] hover:bg-[#D5E1D7] px-4 py-2 rounded-xs text-xs font-medium border border-[#BAC7BE]/60 transition-colors"
            >
              Staff Portal
            </button>
          )}
          <button
            onClick={logoutUser}
            className="flex items-center space-x-1.5 text-xs text-rose-700 hover:text-rose-900 border border-rose-200 px-3.5 py-2 rounded-xs bg-rose-50/50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-[#FDFCF7] border border-[#BAC7BE]/30 p-3 rounded-xs space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#1C2620] text-[#FAF7F2]'
                  : 'text-[#334338] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'orders' ? 'bg-[#334338]' : 'bg-[#E8EFE9] text-[#5C7764]'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-[#1C2620] text-[#FAF7F2]'
                  : 'text-[#334338] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'wishlist' ? 'bg-[#334338]' : 'bg-[#E8EFE9] text-[#5C7764]'}`}>
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#1C2620] text-[#FAF7F2]'
                  : 'text-[#334338] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4" />
                <span>Addresses</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'addresses' ? 'bg-[#334338]' : 'bg-[#E8EFE9] text-[#5C7764]'}`}>
                {addresses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'security'
                  ? 'bg-[#1C2620] text-[#FAF7F2]'
                  : 'text-[#334338] hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Security & Sessions</span>
              </div>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 bg-[#FDFCF7] border border-[#BAC7BE]/30 p-6 sm:p-8 rounded-xs shadow-xs">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#BAC7BE]/20 pb-4">
                <h3 className="font-serif text-xl text-[#1C2620]">Order History</h3>
                <span className="text-xs text-[#7A9382]">{orders.length} orders recorded</span>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7A9382]">
                  <p className="font-serif text-lg text-[#1C2620] mb-1">You haven't placed an order yet.</p>
                  <p className="mb-4">Explore our seasonal harvests and find something extraordinary.</p>
                  <button
                    onClick={() => navigate('shop')}
                    className="bg-[#1C2620] text-[#FAF7F2] px-5 py-2.5 rounded-xs uppercase tracking-wider font-medium"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#BAC7BE]/40 rounded-xs p-5 bg-[#FAF7F2]/50 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#BAC7BE]/20 pb-3 text-xs">
                        <div>
                          <span className="font-mono font-bold text-[#1C2620] mr-2">
                            {order.orderNumber}
                          </span>
                          <span className="text-[#7A9382]">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-[#E8EFE9] text-[#5C7764]">
                            {order.status}
                          </span>
                          <span className="font-serif text-base font-medium text-[#1C2620]">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((it) => (
                          <div key={it.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                              <LuxuryImage
                                src={it.mainImage}
                                alt={it.productName}
                                className="w-10 h-10 object-cover rounded-xs border"
                                containerClassName="w-10 h-10 rounded-xs flex-shrink-0"
                              />
                              <div>
                                <p className="font-medium text-[#1C2620]">{it.productName}</p>
                                <p className="text-[10px] text-[#7A9382]">Qty: {it.quantity} • SKU: {it.sku}</p>
                              </div>
                            </div>
                            <span className="font-serif text-[#1C2620]">${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#BAC7BE]/20 flex items-center justify-between text-[11px] text-[#7A9382]">
                        <span>Destination: {order.shippingAddress.city}, {order.shippingAddress.country}</span>
                        <span>Payment: {order.paymentMethod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#BAC7BE]/20 pb-4">
                <h3 className="font-serif text-xl text-[#1C2620]">Saved Formulations</h3>
                <span className="text-xs text-[#7A9382]">{wishlistedProducts.length} items</span>
              </div>

              {wishlistedProducts.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#7A9382]">
                  <p className="font-serif text-lg text-[#1C2620] mb-1">Your wishlist is currently empty.</p>
                  <p className="mb-4">Click the heart icon on any product to save it for your next order.</p>
                  <button
                    onClick={() => navigate('shop')}
                    className="bg-[#1C2620] text-[#FAF7F2] px-5 py-2.5 rounded-xs uppercase tracking-wider font-medium"
                  >
                    Browse Atelier
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="border border-[#BAC7BE]/40 rounded-xs p-4 bg-white flex space-x-4 items-center justify-between"
                    >
                      <div 
                        onClick={() => navigate('product-details', { productId: p.id })}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <LuxuryImage
                          src={p.mainImage}
                          alt={p.name}
                          className="w-16 h-16 object-cover rounded-xs border"
                          containerClassName="w-16 h-16 rounded-xs flex-shrink-0"
                        />
                        <div>
                          <p className="text-[10px] uppercase text-[#7A9382]">{p.brand}</p>
                          <h4 className="font-serif text-sm text-[#1C2620] line-clamp-1">{p.name}</h4>
                          <span className="font-serif text-sm font-medium text-[#1C2620]">${p.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => addToCart(p, 1)}
                          disabled={p.stockQuantity <= 0}
                          className="p-2 bg-[#1C2620] hover:bg-[#334338] text-[#FAF7F2] rounded-xs text-xs disabled:opacity-40"
                          title="Add to Bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-2 text-[#9AAEA0] hover:text-rose-700 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#BAC7BE]/20 pb-4">
                <h3 className="font-serif text-xl text-[#1C2620]">Delivery Addresses</h3>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#5C7764] hover:text-[#1C2620]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`border rounded-xs p-5 relative space-y-2 text-xs ${
                      addr.isDefault
                        ? 'border-[#5C7764] bg-[#E8EFE9]/40'
                        : 'border-[#BAC7BE]/40 bg-white'
                    }`}
                  >
                    {addr.isDefault && (
                      <span className="inline-block text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#5C7764] text-white">
                        Default Address
                      </span>
                    )}
                    <h4 className="font-semibold text-sm text-[#1C2620]">{addr.fullName}</h4>
                    <p className="text-[#5C7764]">
                      {addr.street} {addr.apartment && `, ${addr.apartment}`}
                    </p>
                    <p className="text-[#5C7764]">
                      {addr.postalCode} {addr.city}, {addr.country}
                    </p>
                    {addr.phone && <p className="text-[11px] text-[#7A9382]">{addr.phone}</p>}

                    <div className="pt-3 border-t border-[#BAC7BE]/20 flex items-center space-x-3 text-[11px]">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-[#5C7764] hover:underline font-medium"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-rose-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address Modal */}
              {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2620]/60 backdrop-blur-xs">
                  <div className="bg-[#FDFCF7] border border-[#BAC7BE]/50 p-6 rounded-xs max-w-md w-full space-y-4">
                    <h4 className="font-serif text-lg text-[#1C2620]">New Address</h4>
                    <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#7A9382] text-[10px] uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          value={newFullName}
                          onChange={(e) => setNewFullName(e.target.value)}
                          required
                          className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#7A9382] text-[10px] uppercase mb-1">Street Address</label>
                        <input
                          type="text"
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          required
                          className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#7A9382] text-[10px] uppercase mb-1">City</label>
                          <input
                            type="text"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            required
                            className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#7A9382] text-[10px] uppercase mb-1">Postal Code</label>
                          <input
                            type="text"
                            value={newPostal}
                            onChange={(e) => setNewPostal(e.target.value)}
                            required
                            className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddressModal(false)}
                          className="px-4 py-2 text-[#7A9382]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#1C2620] text-[#FAF7F2] px-5 py-2 rounded-xs uppercase tracking-wider font-medium"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="border-b border-[#BAC7BE]/20 pb-4">
                <h3 className="font-serif text-xl text-[#1C2620]">Security & Server Sessions</h3>
                <p className="text-xs text-[#5C7764] mt-0.5">Authoritative session management and account protection.</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] border border-[#BAC7BE]/30 rounded-xs space-y-2 text-xs text-[#5C7764]">
                <div className="flex items-center space-x-2 text-[#1C2620] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#5C7764]" />
                  <span>Encrypted Cryptographic Sessions</span>
                </div>
                <p>
                  Your session is protected with HttpOnly and SameSite cookie protocols. 
                  Passwords are salted and hashed via Argon2id / Bcrypt in PostgreSQL.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <h4 className="font-semibold uppercase tracking-wider text-[#7A9382]">Active Authentication</h4>
                <div className="p-3 bg-white border border-[#BAC7BE]/30 rounded-xs flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#1C2620]">{currentUser.email}</p>
                    <p className="text-[11px] text-[#7A9382]">Primary Authenticated Channel</p>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#5C7764] px-2 py-0.5 rounded font-medium">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
