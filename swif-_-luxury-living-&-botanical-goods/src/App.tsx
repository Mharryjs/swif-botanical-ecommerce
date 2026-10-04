/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { ToastContainer } from './components/ToastContainer.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ProductDetailsPage } from './pages/ProductDetailsPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { AuthPages } from './pages/AuthPages.tsx';
import { AccountPage } from './pages/AccountPage.tsx';
import { AdminPortal } from './pages/AdminPortal.tsx';
import { 
  AboutPage, 
  FAQPage, 
  ShippingPolicyPage, 
  ReturnsPolicyPage, 
  PrivacyPolicyPage, 
  TermsPage, 
  NotFoundPage 
} from './pages/StaticPages.tsx';

const AppContent: React.FC = () => {
  const { currentPage, currentParams } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'category':
        return <ShopPage initialCategorySlug={currentParams.categorySlug} />;
      case 'search':
        return <ShopPage initialSearchQuery={currentParams.q} />;
      case 'new-arrivals':
        return <ShopPage isNewArrivalsOnly={true} />;
      case 'best-sellers':
        return <ShopPage isBestSellersOnly={true} />;
      case 'product-details':
        return <ProductDetailsPage productId={currentParams.productId || 'prod-01'} />;
      case 'checkout':
        return <CheckoutPage />;
      case 'login':
        return <AuthPages initialView="login" />;
      case 'register':
        return <AuthPages initialView="register" />;
      case 'forgot-password':
        return <AuthPages initialView="forgot" />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
      case 'shipping':
        return <ShippingPolicyPage />;
      case 'returns':
        return <ReturnsPolicyPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'my-account':
      case 'profile':
      case 'my-orders':
      case 'order-details':
      case 'wishlist':
      case 'addresses':
      case 'security':
        return <AccountPage />;
      case 'admin-login':
      case 'admin-dashboard':
      case 'admin-products':
      case 'admin-add-product':
      case 'admin-categories':
      case 'admin-orders':
      case 'admin-customers':
      case 'admin-inventory':
      case 'admin-inbox':
      case 'admin-settings':
        return <AdminPortal />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C2620]">
      {/* Navigation Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Official Luxury Footer */}
      <Footer />

      {/* Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
