import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Package, 
  ShoppingBag, 
  Users, 
  Mail, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Layers,
  Search,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { Product, OrderStatus } from '../types/index.ts';
import { LuxuryImage } from '../components/LuxuryImage.tsx';

export const AdminPortal: React.FC = () => {
  const { 
    currentUser, 
    products, 
    categories, 
    orders, 
    contactMessages, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    markMessageRead, 
    navigate,
    brandInfo,
    addToast
  } = useStore();

  const [activeSection, setActiveSection] = useState<'dashboard' | 'products' | 'orders' | 'inbox' | 'inventory'>('dashboard');
  
  // Product Form Modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formBrand, setFormBrand] = useState('Swif Botanicals');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState<number>(120);
  const [formComparePrice, setFormComparePrice] = useState<number | undefined>(undefined);
  const [formStock, setFormStock] = useState<number>(20);
  const [formCategory, setFormCategory] = useState<string>('cat-fragrance');
  const [formMainImage, setFormMainImage] = useState<string>('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85');

  // Real KPI calculations from state
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalUnitsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const lowStockCount = products.filter((p) => p.stockQuantity <= 5).length;
  const unreadMessagesCount = contactMessages.filter((m) => m.status === 'unread').length;

  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormName('');
    setFormSku('SWF-' + Math.floor(100 + Math.random() * 900));
    setFormBrand('Swif Botanicals');
    setFormShortDesc('');
    setFormDesc('');
    setFormPrice(120);
    setFormComparePrice(undefined);
    setFormStock(20);
    setFormCategory(categories[0]?.id || 'cat-fragrance');
    setFormMainImage('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85');
    setShowAddProductModal(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setFormName(p.name);
    setFormSku(p.sku);
    setFormBrand(p.brand);
    setFormShortDesc(p.shortDescription);
    setFormDesc(p.description);
    setFormPrice(p.price);
    setFormComparePrice(p.compareAtPrice);
    setFormStock(p.stockQuantity);
    setFormCategory(p.categoryId);
    setFormMainImage(p.mainImage);
    setShowAddProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === formCategory);

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: formName,
        sku: formSku,
        brand: formBrand,
        shortDescription: formShortDesc,
        description: formDesc,
        price: formPrice,
        compareAtPrice: formComparePrice,
        stockQuantity: formStock,
        categoryId: formCategory,
        categoryName: cat?.name || 'Curated Goods',
        mainImage: formMainImage,
      });
    } else {
      addProduct({
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        sku: formSku,
        brand: formBrand,
        shortDescription: formShortDesc,
        description: formDesc,
        price: formPrice,
        compareAtPrice: formComparePrice,
        currency: 'USD',
        stockQuantity: formStock,
        categoryId: formCategory,
        categoryName: cat?.name || 'Curated Goods',
        status: 'active',
        mainImage: formMainImage,
        galleryImages: [
          { id: 'img-' + Date.now(), url: formMainImage, alt: formName, sortOrder: 1 }
        ],
        specifications: {
          'Origin': 'Distilled & Handcrafted',
          'Batch': '2026 Harvest',
          'Care': 'Store in cool ambient conditions'
        },
        featured: false,
        newArrival: true,
        reviewCount: 0,
      });
    }

    setShowAddProductModal(false);
  };

  const handleRestock = (productId: string, amount: number) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    updateProduct(productId, { stockQuantity: prod.stockQuantity + amount });
    addToast(`Restocked ${prod.name} with +${amount} units.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header */}
      <div className="bg-[#1C2620] text-[#FAF7F2] p-6 rounded-xs shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#D8BD7E] uppercase tracking-wider font-semibold">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Master Atelier Administration</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mt-1">
            Swif Production Operations
          </h1>
          <p className="text-xs text-[#BAC7BE] mt-0.5">
            Configured Contact Inbox: <strong>{brandInfo.email}</strong> • Instagram: <strong>{brandInfo.instagram.handle}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('shop')}
            className="text-xs bg-[#334338] hover:bg-[#465B4D] text-[#FAF7F2] px-4 py-2 rounded-xs transition-colors flex items-center space-x-1.5"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto border-b border-[#BAC7BE]/30 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveSection('dashboard')}
          className={`px-4 py-2 rounded-xs transition-colors ${
            activeSection === 'dashboard'
              ? 'bg-[#1C2620] text-[#FAF7F2]'
              : 'text-[#334338] hover:bg-[#E8EFE9]'
          }`}
        >
          Dashboard KPI
        </button>

        <button
          onClick={() => setActiveSection('products')}
          className={`px-4 py-2 rounded-xs transition-colors flex items-center space-x-1.5 ${
            activeSection === 'products'
              ? 'bg-[#1C2620] text-[#FAF7F2]'
              : 'text-[#334338] hover:bg-[#E8EFE9]'
          }`}
        >
          <span>Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('orders')}
          className={`px-4 py-2 rounded-xs transition-colors flex items-center space-x-1.5 ${
            activeSection === 'orders'
              ? 'bg-[#1C2620] text-[#FAF7F2]'
              : 'text-[#334338] hover:bg-[#E8EFE9]'
          }`}
        >
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('inbox')}
          className={`px-4 py-2 rounded-xs transition-colors flex items-center space-x-1.5 ${
            activeSection === 'inbox'
              ? 'bg-[#1C2620] text-[#FAF7F2]'
              : 'text-[#334338] hover:bg-[#E8EFE9]'
          }`}
        >
          <span>Inquiries ({contactMessages.length})</span>
          {unreadMessagesCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          )}
        </button>

        <button
          onClick={() => setActiveSection('inventory')}
          className={`px-4 py-2 rounded-xs transition-colors flex items-center space-x-1.5 ${
            activeSection === 'inventory'
              ? 'bg-[#1C2620] text-[#FAF7F2]'
              : 'text-[#334338] hover:bg-[#E8EFE9]'
          }`}
        >
          <span>Stock & Alerts ({lowStockCount})</span>
        </button>
      </div>

      {/* SECTION 1: DASHBOARD OVERVIEW */}
      {activeSection === 'dashboard' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-5 rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7A9382]">
                <span className="uppercase tracking-wider font-semibold">Authoritative Gross</span>
                <DollarSign className="w-4 h-4 text-[#5C7764]" />
              </div>
              <p className="font-serif text-3xl font-medium text-[#1C2620]">
                ${totalRevenue.toFixed(2)}
              </p>
              <p className="text-[11px] text-[#5C7764]">Sum of actual client orders</p>
            </div>

            <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-5 rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7A9382]">
                <span className="uppercase tracking-wider font-semibold">Orders Processed</span>
                <ShoppingBag className="w-4 h-4 text-[#5C7764]" />
              </div>
              <p className="font-serif text-3xl font-medium text-[#1C2620]">
                {orders.length}
              </p>
              <p className="text-[11px] text-[#5C7764]">{totalUnitsSold} total items allocated</p>
            </div>

            <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-5 rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7A9382]">
                <span className="uppercase tracking-wider font-semibold">Active Formulations</span>
                <Package className="w-4 h-4 text-[#5C7764]" />
              </div>
              <p className="font-serif text-3xl font-medium text-[#1C2620]">
                {products.length}
              </p>
              <p className="text-[11px] text-[#5C7764]">Across {categories.length} disciplines</p>
            </div>

            <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-5 rounded-xs shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7A9382]">
                <span className="uppercase tracking-wider font-semibold">Low Stock Alerts</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="font-serif text-3xl font-medium text-amber-700">
                {lowStockCount}
              </p>
              <p className="text-[11px] text-[#7A9382]">Items with ≤ 5 units in harvest</p>
            </div>
          </div>

          {/* Recent Orders Preview */}
          <div className="bg-[#FDFCF7] border border-[#BAC7BE]/30 p-6 rounded-xs shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#1C2620]">Recent Order Pipeline</h3>
              <button
                onClick={() => setActiveSection('orders')}
                className="text-xs text-[#5C7764] hover:underline"
              >
                View all orders
              </button>
            </div>

            <div className="divide-y divide-[#BAC7BE]/20 text-xs">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-[#1C2620] mr-2">{order.orderNumber}</span>
                    <span className="text-[#5C7764]">{order.customerName} ({order.customerEmail})</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="uppercase font-semibold text-[10px] px-2 py-0.5 rounded bg-[#E8EFE9] text-[#5C7764]">
                      {order.status}
                    </span>
                    <span className="font-serif font-medium text-[#1C2620]">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PRODUCTS CRUD */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl text-[#1C2620]">Product Catalog</h3>
              <p className="text-xs text-[#5C7764]">Create, update pricing, or alter formulation inventory.</p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center space-x-2 bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-4 py-2.5 rounded-xs text-xs font-medium tracking-wider uppercase transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Formulation</span>
            </button>
          </div>

          <div className="bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#7A9382] uppercase tracking-wider border-b border-[#BAC7BE]/20">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Discipline</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#BAC7BE]/20">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                      <td className="py-3 px-4 flex items-center space-x-3">
                        <LuxuryImage
                          src={p.mainImage}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-xs border"
                          containerClassName="w-10 h-10 rounded-xs flex-shrink-0"
                        />
                        <div>
                          <p className="font-serif font-medium text-[#1C2620]">{p.name}</p>
                          <p className="text-[10px] text-[#7A9382]">{p.brand}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[#5C7764]">{p.sku}</td>
                      <td className="py-3 px-4 text-[#5C7764]">{p.categoryName}</td>
                      <td className="py-3 px-4 font-serif font-medium text-[#1C2620]">${p.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          p.stockQuantity <= 0 
                            ? 'bg-rose-100 text-rose-800' 
                            : p.stockQuantity <= 5 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.stockQuantity} in stock
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1 text-[#5C7764] hover:text-[#1C2620]"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1 text-[#9AAEA0] hover:text-rose-700"
                          title="Archive product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ORDERS MANAGEMENT */}
      {activeSection === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#1C2620]">Order Fulfillment</h3>
            <span className="text-xs text-[#5C7764]">{orders.length} orders on file</span>
          </div>

          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-5 rounded-xs shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#BAC7BE]/20 pb-3 gap-2 text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#1C2620] text-sm mr-2">{o.orderNumber}</span>
                    <span className="text-[#7A9382]">
                      Placed on {new Date(o.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[#7A9382]">Status:</span>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                      className="bg-white border border-[#BAC7BE]/50 rounded-xs px-2.5 py-1 text-xs font-semibold text-[#1C2620]"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-[#7A9382] uppercase text-[10px] font-semibold">Client Coordinates</p>
                    <p className="font-medium text-[#1C2620] mt-1">{o.customerName}</p>
                    <p className="text-[#5C7764]">{o.customerEmail}</p>
                    <p className="text-[11px] text-[#7A9382]">{o.shippingAddress.phone}</p>
                  </div>

                  <div>
                    <p className="text-[#7A9382] uppercase text-[10px] font-semibold">Destination Address</p>
                    <p className="text-[#1C2620] mt-1">{o.shippingAddress.street}</p>
                    <p className="text-[#5C7764]">
                      {o.shippingAddress.postalCode} {o.shippingAddress.city}, {o.shippingAddress.country}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#7A9382] uppercase text-[10px] font-semibold">Financial Settlement</p>
                    <p className="font-serif text-lg font-medium text-[#1C2620] mt-1">${o.total.toFixed(2)}</p>
                    <p className="text-[11px] text-[#5C7764]">{o.paymentMethod}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#BAC7BE]/20 space-y-1 text-xs">
                  <p className="text-[10px] text-[#7A9382] uppercase font-semibold">Items in Manifest</p>
                  {o.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-xs text-[#334338]">
                      <span>{it.quantity}x {it.productName} ({it.sku})</span>
                      <span className="font-serif">${(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: CONTACT INBOX */}
      {activeSection === 'inbox' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl text-[#1C2620]">Client Inquiries Inbox</h3>
              <p className="text-xs text-[#5C7764]">
                Dispatched to <strong>{brandInfo.email}</strong> and saved in database.
              </p>
            </div>
            <span className="text-xs text-[#7A9382]">{contactMessages.length} total inquiries</span>
          </div>

          <div className="space-y-4">
            {contactMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`border rounded-xs p-5 transition-colors ${
                  msg.status === 'unread' ? 'bg-[#FDFCF7] border-[#D8BD7E]/50' : 'bg-white border-[#BAC7BE]/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-xs text-[#1C2620]">{msg.name}</span>
                      <span className="text-xs text-[#7A9382]">({msg.email})</span>
                      {msg.status === 'unread' && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-base text-[#1C2620] mt-1 font-medium">{msg.subject}</h4>
                  </div>
                  <span className="text-[10px] text-[#7A9382]">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-[#5C7764] leading-relaxed mt-3 p-3 bg-[#FAF7F2] rounded-xs border border-[#BAC7BE]/20">
                  {msg.message}
                </p>

                <div className="pt-3 flex items-center justify-between text-xs">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="text-[#5C7764] hover:underline font-medium flex items-center space-x-1"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1" />
                    <span>Reply via {brandInfo.email}</span>
                  </a>

                  {msg.status === 'unread' && (
                    <button
                      onClick={() => markMessageRead(msg.id)}
                      className="text-xs text-[#7A9382] hover:text-[#1C2620]"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: INVENTORY & STOCK */}
      {activeSection === 'inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl text-[#1C2620]">Live Inventory Management</h3>
              <p className="text-xs text-[#5C7764]">Monitor and restock seasonal harvests.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-[#FDFCF7] border border-[#BAC7BE]/30 p-4 rounded-xs shadow-xs space-y-3">
                <div className="flex items-center space-x-3">
                  <LuxuryImage
                    src={p.mainImage}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-xs border"
                    containerClassName="w-12 h-12 rounded-xs flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-serif text-sm text-[#1C2620] font-medium line-clamp-1">{p.name}</h4>
                    <p className="text-[10px] font-mono text-[#7A9382]">{p.sku}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#BAC7BE]/20">
                  <span className="text-[#5C7764]">Units Available:</span>
                  <span className={`font-serif text-base font-bold ${p.stockQuantity <= 0 ? 'text-rose-700' : p.stockQuantity <= 5 ? 'text-amber-700' : 'text-[#1C2620]'}`}>
                    {p.stockQuantity}
                  </span>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => handleRestock(p.id, 10)}
                    className="flex-1 bg-[#E8EFE9] text-[#1C2620] hover:bg-[#D5E1D7] py-1.5 rounded-xs text-[11px] font-medium transition-colors"
                  >
                    +10 Units
                  </button>
                  <button
                    onClick={() => handleRestock(p.id, 25)}
                    className="flex-1 bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] py-1.5 rounded-xs text-[11px] font-medium transition-colors"
                  >
                    +25 Units
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2620]/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FDFCF7] border border-[#BAC7BE]/50 p-6 sm:p-8 rounded-xs max-w-xl w-full my-8 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl text-[#1C2620]">
              {editingProductId ? 'Edit Atelier Formulation' : 'New Catalog Formulation'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Product Title</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#7A9382] uppercase text-[10px] mb-1">SKU</label>
                  <input
                    type="text"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    required
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                  />
                </div>
                <div>
                  <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Atelier Line / Brand</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                  >
                    <option value="Swif Botanicals">Swif Botanicals</option>
                    <option value="Swif Atelier">Swif Atelier</option>
                    <option value="Swif Maison">Swif Maison</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    required
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                  />
                </div>
                <div>
                  <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Compare Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formComparePrice || ''}
                    onChange={(e) => setFormComparePrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                  />
                </div>
                <div>
                  <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    required
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Discipline Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Main Editorial Image URL</label>
                <input
                  type="url"
                  value={formMainImage}
                  onChange={(e) => setFormMainImage(e.target.value)}
                  required
                  className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                />
              </div>

              <div>
                <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Short Description</label>
                <input
                  type="text"
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  required
                  className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                />
              </div>

              <div>
                <label className="block text-[#7A9382] uppercase text-[10px] mb-1">Full Description & Distillation Notes</label>
                <textarea
                  rows={4}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  required
                  className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-2 text-[#1C2620]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-[#BAC7BE]/20">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 text-[#7A9382] hover:text-[#1C2620]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-6 py-2 rounded-xs uppercase tracking-wider font-medium text-xs"
                >
                  Save to PostgreSQL Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
