import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  ArrowUpRight,
  SlidersHorizontal
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenCart }) => {
  const { 
    currentPage, 
    navigate, 
    cartCount, 
    wishlist, 
    currentUser, 
    categories,
    logoutUser,
    loginAsAdmin,
    loginAsCustomer,
    brandInfo 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Transparent / Solid Navigation Bar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#D8BD7E]/30 py-3.5' 
            : 'bg-[#FAF7F2]/80 backdrop-blur-xs border-b border-[#E8EFE9] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-[#1C2620] hover:text-[#5C7764] focus:outline-none"
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Desktop Left Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm tracking-wide text-[#334338]">
              <button 
                onClick={() => navigate('shop')}
                className={`transition-colors hover:text-[#5C7764] ${currentPage === 'shop' ? 'text-[#1C2620] font-medium underline underline-offset-8 decoration-[#D8BD7E]' : ''}`}
              >
                Shop All
              </button>
              
              <div className="relative group">
                <button 
                  onClick={() => navigate('shop')}
                  className="inline-flex items-center space-x-1 hover:text-[#5C7764] transition-colors"
                >
                  <span>Collections</span>
                </button>
                {/* Mega / Dropdown */}
                <div className="absolute left-0 mt-3 w-64 p-3 bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="text-[11px] font-semibold text-[#7A9382] uppercase tracking-wider px-2 py-1 mb-1">
                    Curated Categories
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navigate('category', { categorySlug: cat.slug })}
                      className="w-full text-left px-2 py-2 text-xs text-[#1C2620] hover:bg-[#E8EFE9]/60 rounded-xs transition-colors flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-[#7A9382]">{cat.itemCount} items</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => navigate('new-arrivals')}
                className={`transition-colors hover:text-[#5C7764] ${currentPage === 'new-arrivals' ? 'text-[#1C2620] font-medium underline underline-offset-8 decoration-[#D8BD7E]' : ''}`}
              >
                New Arrivals
              </button>

              <button 
                onClick={() => navigate('best-sellers')}
                className={`transition-colors hover:text-[#5C7764] ${currentPage === 'best-sellers' ? 'text-[#1C2620] font-medium underline underline-offset-8 decoration-[#D8BD7E]' : ''}`}
              >
                Best Sellers
              </button>

              <button 
                onClick={() => navigate('about')}
                className={`transition-colors hover:text-[#5C7764] ${currentPage === 'about' ? 'text-[#1C2620] font-medium underline underline-offset-8 decoration-[#D8BD7E]' : ''}`}
              >
                Atelier
              </button>
            </nav>

            {/* Central Luxury Brand Identity */}
            <div className="text-center cursor-pointer" onClick={() => navigate('home')}>
              <span className="block font-serif text-2xl sm:text-3xl tracking-[0.2em] font-medium text-[#1C2620]">
                SWIF
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-[#7A9382] uppercase -mt-0.5">
                Atelier & Botanique
              </span>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-[#1C2620]">
              {/* Search Icon */}
              <button 
                onClick={onOpenSearch}
                className="p-1 hover:text-[#5C7764] transition-colors"
                title="Search products"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button 
                onClick={() => navigate('wishlist')}
                className="relative p-1 hover:text-[#5C7764] transition-colors hidden sm:block"
                title="Saved to Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E8EFE9] border border-[#BAC7BE] text-[#1C2620] text-[10px] font-semibold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* User Account / Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (currentUser) {
                      setUserMenuOpen(!userMenuOpen);
                    } else {
                      navigate('login');
                    }
                  }}
                  className="p-1 hover:text-[#5C7764] transition-colors flex items-center space-x-1"
                  title={currentUser ? `Account: ${currentUser.fullName}` : 'Sign In'}
                  aria-label="User Account"
                >
                  <UserIcon className="w-5 h-5" />
                  {currentUser && (
                    <span className="text-xs hidden md:inline font-medium text-[#5C7764] max-w-[85px] truncate">
                      {currentUser.fullName.split(' ')[0]}
                    </span>
                  )}
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && currentUser && (
                  <div className="absolute right-0 mt-3 w-56 p-2 bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs shadow-xl z-50">
                    <div className="px-3 py-2 border-b border-[#E8EFE9]">
                      <p className="text-xs font-semibold text-[#1C2620] truncate">{currentUser.fullName}</p>
                      <p className="text-[11px] text-[#7A9382] truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E8EFE9] text-[#5C7764]">
                        {currentUser.role === 'admin' ? 'Administrator' : 'Client Account'}
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'admin' ? (
                        <>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate('admin-dashboard');
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#1C2620] hover:bg-[#E8EFE9]/60 rounded-xs flex items-center space-x-2 font-medium"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5C7764]" />
                            <span>Admin Dashboard</span>
                          </button>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate('admin-products');
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#1C2620] hover:bg-[#E8EFE9]/60 rounded-xs"
                          >
                            Product Catalog CRUD
                          </button>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate('admin-orders');
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#1C2620] hover:bg-[#E8EFE9]/60 rounded-xs"
                          >
                            Order Management
                          </button>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate('admin-inbox');
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#1C2620] hover:bg-[#E8EFE9]/60 rounded-xs"
                          >
                            Contact Messages Inbox
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate('my-account');
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#1C2620] hover:bg-[#E8EFE9]/60 rounded-xs"
                          >
                            My Account Overview
                          </button>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate('my-orders');
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#1C2620] hover:bg-[#E8EFE9]/60 rounded-xs"
                          >
                            My Orders & History
                          </button>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate('addresses');
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#1C2620] hover:bg-[#E8EFE9]/60 rounded-xs"
                          >
                            Shipping Addresses
                          </button>
                        </>
                      )}
                    </div>

                    <div className="pt-1 border-t border-[#E8EFE9]">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logoutUser();
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-red-700 hover:bg-red-50 rounded-xs"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Bag Icon with Drawer Trigger */}
              <button 
                onClick={onOpenCart}
                className="relative p-1 hover:text-[#5C7764] transition-colors flex items-center space-x-1"
                title="View Bag"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1C2620] text-[#FAF7F2] text-[10px] font-medium flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#BAC7BE]/30 bg-[#FDFCF7] px-6 pt-5 pb-8 space-y-4">
            <nav className="flex flex-col space-y-3 text-base text-[#1C2620]">
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('home'); }}
                className="text-left font-serif text-lg py-1 border-b border-[#E8EFE9]"
              >
                Home
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('shop'); }}
                className="text-left py-1"
              >
                All Products
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('new-arrivals'); }}
                className="text-left py-1"
              >
                New Arrivals
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('best-sellers'); }}
                className="text-left py-1"
              >
                Best Sellers
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('about'); }}
                className="text-left py-1"
              >
                Atelier Philosophy
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('contact'); }}
                className="text-left py-1"
              >
                Contact & Support
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate('wishlist'); }}
                className="text-left py-1 flex items-center justify-between"
              >
                <span>Saved Items</span>
                <span className="text-xs text-[#5C7764]">{wishlist.length}</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-[#E8EFE9] space-y-3">
              <a 
                href={brandInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#5C7764] flex items-center justify-between"
              >
                <span>Instagram: {brandInfo.instagram.handle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <p className="text-xs text-[#7A9382]">Support: {brandInfo.email}</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
