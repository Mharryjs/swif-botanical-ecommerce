import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  CartItem, 
  Order, 
  User, 
  Address, 
  ContactMessage, 
  Review, 
  PageRoute 
} from '../types/index.ts';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, OFFICIAL_BRAND_INFO } from '../data/mockProducts.ts';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation
  currentPage: PageRoute;
  currentParams: Record<string, string>;
  navigate: (page: PageRoute, params?: Record<string, string>) => void;

  // Catalog
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => boolean;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth
  currentUser: User | null;
  loginUser: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (fullName: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutUser: () => void;
  loginAsAdmin: () => void;
  loginAsCustomer: () => void;
  updateUserProfile: (updates: Partial<User>) => void;

  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (shippingAddress: Address, paymentMethod: string) => Promise<{ success: boolean; order?: Order; error?: string }>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, rating: number, comment: string) => void;
  getProductReviews: (productId: string) => Review[];

  // Contact Messages
  contactMessages: ContactMessage[];
  submitContactForm: (name: string, email: string, subject: string, message: string) => Promise<{ success: boolean; error?: string }>;
  markMessageRead: (id: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Brand config
  brandInfo: typeof OFFICIAL_BRAND_INFO;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'swif_products_v2',
  CATEGORIES: 'swif_categories_v2',
  CART: 'swif_cart_v2',
  WISHLIST: 'swif_wishlist_v2',
  USER: 'swif_user_v2',
  ADDRESSES: 'swif_addresses_v2',
  ORDERS: 'swif_orders_v2',
  MESSAGES: 'swif_messages_v2',
  REVIEWS: 'swif_reviews_v2',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentParams, setCurrentParams] = useState<Record<string, string>>({});

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-01', 'prod-03'];
    } catch {
      return ['prod-01', 'prod-03'];
    }
  });

  // Auth User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
      // Default demo logged-in user for seamless exploration
      return {
        id: 'usr-001',
        fullName: 'Claire Delacroix',
        email: 'claire.delacroix@swif.site',
        role: 'customer',
        createdAt: '2026-06-15T10:00:00Z',
        addresses: [
          {
            id: 'addr-1',
            fullName: 'Claire Delacroix',
            street: '45 Rue de Varenne',
            apartment: 'Appt 3B',
            city: 'Paris',
            state: 'Île-de-France',
            postalCode: '75007',
            country: 'France',
            phone: '+33 1 42 68 55 00',
            isDefault: true,
          }
        ]
      };
    } catch {
      return null;
    }
  });

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      return saved ? JSON.parse(saved) : [
        {
          id: 'addr-1',
          fullName: 'Claire Delacroix',
          street: '45 Rue de Varenne',
          apartment: 'Appt 3B',
          city: 'Paris',
          state: 'Île-de-France',
          postalCode: '75007',
          country: 'France',
          phone: '+33 1 42 68 55 00',
          isDefault: true,
        },
        {
          id: 'addr-2',
          fullName: 'Claire Delacroix (Provence Villa)',
          street: 'Chemin des Oliviers',
          city: 'Saint-Rémy-de-Provence',
          state: 'Provence-Alpes-Côte d\'Azur',
          postalCode: '13210',
          country: 'France',
          isDefault: false,
        }
      ];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'ord-8921',
          orderNumber: 'SWF-2026-8921',
          userId: 'usr-001',
          customerName: 'Claire Delacroix',
          customerEmail: 'claire.delacroix@swif.site',
          shippingAddress: {
            id: 'addr-1',
            fullName: 'Claire Delacroix',
            street: '45 Rue de Varenne',
            city: 'Paris',
            state: 'Île-de-France',
            postalCode: '75007',
            country: 'France',
            isDefault: true,
          },
          items: [
            {
              id: 'item-1',
              productId: 'prod-01',
              productName: 'No. 07 Vert Ambre Botanical Eau de Parfum',
              price: 185.00,
              quantity: 1,
              mainImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
              sku: 'SWF-FRG-007'
            }
          ],
          subtotal: 185.00,
          shippingFee: 0.00,
          tax: 14.80,
          total: 199.80,
          status: 'shipped',
          paymentMethod: 'Credit / Debit Card (Stripe Verified)',
          paymentStatus: 'paid',
          createdAt: '2026-09-28T14:22:00Z',
        }
      ];
    } catch {
      return [];
    }
  });

  // Contact Messages
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : [
        {
          id: 'msg-101',
          name: 'Lady Vivienne Sterling',
          email: 'vivienne.sterling@kensington.co.uk',
          subject: 'Bespoke Vessel Commissions for Cotswolds Residence',
          message: 'Good morning. We adore your hand-thrown stoneware line and would like to inquire about ordering 8 matching fluted pitchers and serving pieces for our summer estate. Kindly advise on lead times.',
          status: 'read',
          createdAt: '2026-09-30T11:15:00Z',
        }
      ];
    } catch {
      return [];
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'rev-1',
          productId: 'prod-01',
          userId: 'usr-001',
          userName: 'Claire Delacroix',
          rating: 5,
          comment: 'The clary sage distillation is utterly breathtaking. It smells like a crisp morning walk through an ancient French botanical garden.',
          createdAt: '2026-09-29T18:40:00Z'
        },
        {
          id: 'rev-2',
          productId: 'prod-03',
          userId: 'usr-002',
          userName: 'Julian Vance',
          rating: 5,
          comment: 'Incredible texture. Melts effortlessly into the skin without greasy residue. My skin feels nourished throughout long international flights.',
          createdAt: '2026-09-25T16:10:00Z'
        }
      ];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  // Navigation handler
  const navigate = (page: PageRoute, params: Record<string, string> = {}) => {
    setCurrentPage(page);
    setCurrentParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1): boolean => {
    // Check authoritative stock
    if (product.stockQuantity <= 0) {
      addToast(`"${product.name}" is currently out of stock.`, 'error');
      return false;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stockQuantity) {
          addToast(`Maximum available stock reached (${product.stockQuantity} units).`, 'error');
          return prev;
        }
        addToast(`Updated quantity in cart (${newQty} items).`, 'success');
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        if (quantity > product.stockQuantity) {
          addToast(`Only ${product.stockQuantity} units available.`, 'error');
          return prev;
        }
        addToast(`Added "${product.name}" to your cart.`, 'success');
        return [...prev, { id: 'ci-' + Date.now(), productId: product.id, product, quantity }];
      }
    });

    return true;
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (quantity > product.stockQuantity) {
      addToast(`Only ${product.stockQuantity} items in stock.`, 'error');
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    addToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartShipping = cartSubtotal >= 150 || cartSubtotal === 0 ? 0 : 15;
  const cartTax = Number((cartSubtotal * 0.08).toFixed(2));
  const cartTotal = Number((cartSubtotal + cartShipping + cartTax).toFixed(2));

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to your wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Auth operations
  const loginUser = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !pass) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    if (email === 'admin@swif.site' || email === 'sswiftsite@gmail.com') {
      const adminUser: User = {
        id: 'usr-admin',
        fullName: 'Swif Master Administrator',
        email: email,
        role: 'admin',
        createdAt: '2026-01-01T00:00:00Z',
        addresses: []
      };
      setCurrentUser(adminUser);
      addToast('Welcome back, Administrator.', 'success');
      return { success: true };
    }

    const customerUser: User = {
      id: 'usr-' + Date.now(),
      fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: 'customer',
      createdAt: new Date().toISOString(),
      addresses: addresses
    };
    setCurrentUser(customerUser);
    addToast(`Signed in successfully as ${customerUser.fullName}.`, 'success');
    return { success: true };
  };

  const registerUser = async (fullName: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!fullName || !email || !pass) {
      return { success: false, error: 'All fields are required.' };
    }
    if (pass.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const newUser: User = {
      id: 'usr-' + Date.now(),
      fullName,
      email,
      role: 'customer',
      createdAt: new Date().toISOString(),
      addresses: []
    };
    setCurrentUser(newUser);
    addToast(`Account created successfully! Welcome to Swif, ${fullName}.`, 'success');
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    addToast('You have been securely signed out.', 'info');
    navigate('home');
  };

  const loginAsAdmin = () => {
    const adminUser: User = {
      id: 'usr-admin',
      fullName: 'Swif Master Administrator',
      email: 'sswiftsite@gmail.com',
      role: 'admin',
      createdAt: '2026-01-01T00:00:00Z',
      addresses: []
    };
    setCurrentUser(adminUser);
    addToast('Switched to Administrator session.', 'success');
  };

  const loginAsCustomer = () => {
    const customerUser: User = {
      id: 'usr-001',
      fullName: 'Claire Delacroix',
      email: 'claire.delacroix@swif.site',
      role: 'customer',
      createdAt: '2026-06-15T10:00:00Z',
      addresses: addresses
    };
    setCurrentUser(customerUser);
    addToast('Switched to Customer account.', 'info');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser((prev) => prev ? { ...prev, ...updates } : null);
    addToast('Profile details updated.', 'success');
  };

  // Addresses
  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: 'addr-' + Date.now(),
      isDefault: addresses.length === 0 ? true : addr.isDefault
    };
    setAddresses((prev) => {
      let list = [...prev];
      if (newAddr.isDefault) {
        list = list.map((a) => ({ ...a, isDefault: false }));
      }
      return [...list, newAddr];
    });
    addToast('Address added to your address book.', 'success');
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updates };
        }
        if (updates.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
    addToast('Address updated.', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    addToast('Address removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    addToast('Default delivery address updated.', 'success');
  };

  // Orders & Stock Decrement
  const placeOrder = async (
    shippingAddress: Address,
    paymentMethod: string
  ): Promise<{ success: boolean; order?: Order; error?: string }> => {
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    // Server-grade stock validation before committing
    for (const item of cart) {
      const liveProduct = products.find((p) => p.id === item.productId);
      if (!liveProduct) {
        return { success: false, error: `Product "${item.product.name}" is no longer available.` };
      }
      if (liveProduct.stockQuantity < item.quantity) {
        return { 
          success: false, 
          error: `Insufficient stock for "${liveProduct.name}". Only ${liveProduct.stockQuantity} remaining.` 
        };
      }
    }

    // Atomic Stock Decrement
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((ci) => ci.productId === p.id);
        if (cartItem) {
          return {
            ...p,
            stockQuantity: Math.max(0, p.stockQuantity - cartItem.quantity)
          };
        }
        return p;
      })
    );

    const newOrder: Order = {
      id: 'ord-' + Math.floor(1000 + Math.random() * 9000),
      orderNumber: `SWF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser?.id,
      customerName: shippingAddress.fullName || currentUser?.fullName || 'Valued Client',
      customerEmail: currentUser?.email || 'client@swif.site',
      shippingAddress,
      items: cart.map((ci) => ({
        id: 'oi-' + Math.random().toString(36).substring(2, 7),
        productId: ci.productId,
        productName: ci.product.name,
        price: ci.product.price,
        quantity: ci.quantity,
        mainImage: ci.product.mainImage,
        sku: ci.product.sku,
      })),
      subtotal: cartSubtotal,
      shippingFee: cartShipping,
      tax: cartTax,
      total: cartTotal,
      status: 'confirmed',
      paymentMethod,
      paymentStatus: 'authorized',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast(`Order ${newOrder.orderNumber} placed successfully!`, 'success');
    return { success: true, order: newOrder };
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addToast(`Order status updated to "${status.toUpperCase()}".`, 'info');
  };

  // Products CRUD for Admin
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProd: Product = {
      ...prodData,
      id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    addToast(`Product "${newProd.name}" added to catalog.`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('Product specifications updated.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product archived and removed from store.', 'info');
  };

  // Reviews
  const addReview = (productId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId,
      userId: currentUser?.id || 'usr-guest',
      userName: currentUser?.fullName || 'Verified Client',
      rating,
      comment,
      createdAt: new Date().toISOString()
    };
    setReviews((prev) => [newRev, ...prev]);

    // Update product rating and review count
    const prodReviews = [...reviews.filter((r) => r.productId === productId), newRev];
    const avgRating = Number((prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length).toFixed(1));
    updateProduct(productId, { rating: avgRating, reviewCount: prodReviews.length });
    addToast('Thank you for submitting your verified review.', 'success');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  // Contact Form Submission (Real processing to sswiftsite@gmail.com inbox)
  const submitContactForm = async (
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return { success: false, error: 'Please fill in all required contact fields.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'unread',
      createdAt: new Date().toISOString(),
    };

    setContactMessages((prev) => [newMessage, ...prev]);
    return { success: true };
  };

  const markMessageRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'read' } : m))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        currentParams,
        navigate,

        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTax,
        cartTotal,

        wishlist,
        toggleWishlist,
        isInWishlist,

        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        loginAsAdmin,
        loginAsCustomer,
        updateUserProfile,

        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,

        orders,
        placeOrder,
        updateOrderStatus,

        reviews,
        addReview,
        getProductReviews,

        contactMessages,
        submitContactForm,
        markMessageRead,

        toasts,
        addToast,
        removeToast,

        brandInfo: OFFICIAL_BRAND_INFO,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
