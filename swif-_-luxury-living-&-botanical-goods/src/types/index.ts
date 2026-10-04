export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  stockQuantity: number;
  categoryId: string;
  categoryName: string;
  status: 'active' | 'draft' | 'archived';
  mainImage: string;
  galleryImages: ProductImage[];
  specifications: Record<string, string>;
  featured: boolean;
  newArrival: boolean;
  bestSeller?: boolean;
  rating?: number;
  reviewCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Address {
  id: string;
  userId?: string;
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
  addresses: Address[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  mainImage: string;
  sku: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: 'pending' | 'authorized' | 'paid';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export type PageRoute = 
  | 'home'
  | 'shop'
  | 'category'
  | 'search'
  | 'product-details'
  | 'new-arrivals'
  | 'best-sellers'
  | 'cart'
  | 'checkout'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'shipping'
  | 'returns'
  | 'my-account'
  | 'profile'
  | 'my-orders'
  | 'order-details'
  | 'wishlist'
  | 'addresses'
  | 'security'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-add-product'
  | 'admin-categories'
  | 'admin-orders'
  | 'admin-customers'
  | 'admin-inventory'
  | 'admin-inbox'
  | 'admin-settings'
  | '404';
