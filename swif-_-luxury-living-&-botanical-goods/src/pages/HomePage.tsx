import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  Compass, 
  Instagram, 
  Mail, 
  ArrowUpRight,
  Rotate3d,
  Layers,
  Droplets,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import { LuxuryImage } from '../components/LuxuryImage.tsx';

export const HomePage: React.FC = () => {
  const { products, categories, navigate, brandInfo } = useStore();

  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller || p.featured).slice(0, 4);
  const heroProduct = products.find((p) => p.id === 'prod-01') || products[0];

  // 1. Scroll-Driven 3D Parallax Calculation
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Interactive 360° 3D Studio Stage State
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const currentAngleRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    currentAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    setRotationAngle(currentAngleRef.current + deltaX * 0.4);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="space-y-24 sm:space-y-36"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC 3D SCROLLING HERO SECTION (Transparent Luxury System)        */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-20 sm:pt-14 sm:pb-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6]/60 to-[#FAF7F2] border-b border-[#D8BD7E]/30">
        
        {/* Subtle Ambient Parallax Background Floating Elements */}
        <div 
          className="absolute -top-24 left-1/4 w-96 h-96 bg-[#D8BD7E]/15 rounded-full blur-3xl pointer-events-none transition-transform duration-75"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute top-1/3 -right-24 w-96 h-96 bg-[#BAC7BE]/20 rounded-full blur-3xl pointer-events-none transition-transform duration-75"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Editorial Copy */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#D8BD7E]/40 text-[#5C7764] text-xs tracking-wider uppercase font-medium shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B7903D]" />
                <span>Autumn Botanical Harvest 2026</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#1C2620] tracking-tight leading-[1.06]">
                Botanical Form & <br />
                <span className="italic font-normal text-[#5C7764]">Quiet Luxury</span>
              </h1>

              <p className="text-sm sm:text-base text-[#5C7764] leading-relaxed max-w-lg">
                Crafted in limited seasonal distillations. We marry cold-pressed Mediterranean botanicals with 
                wheel-thrown Kyoto stoneware and unbleached Belgian linen for understated living.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('shop')}
                  className="bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-8 py-3.5 text-xs font-medium tracking-widest uppercase rounded-xs transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 group hover:shadow-xl"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('about')}
                  className="bg-white/80 backdrop-blur-md text-[#1C2620] hover:bg-[#E8EFE9] px-7 py-3.5 text-xs font-medium tracking-widest uppercase rounded-xs border border-[#BAC7BE]/60 transition-colors flex items-center justify-center shadow-xs"
                >
                  The Atelier Story
                </button>
              </div>

              {/* Trust Indicators in Transparent Frosted Card */}
              <div className="grid grid-cols-3 gap-4 pt-6 p-4 rounded-xs bg-white/50 backdrop-blur-md border border-[#BAC7BE]/30 text-xs text-[#5C7764]">
                <div>
                  <span className="block font-serif text-lg font-medium text-[#1C2620]">100% Pure</span>
                  <span className="text-[11px] text-[#7A9382]">Wild Botanicals</span>
                </div>
                <div>
                  <span className="block font-serif text-lg font-medium text-[#1C2620]">Small-Batch</span>
                  <span className="text-[11px] text-[#7A9382]">Atelier Crafted</span>
                </div>
                <div>
                  <span className="block font-serif text-lg font-medium text-[#1C2620]">Carbon-Neutral</span>
                  <span className="text-[11px] text-[#7A9382]">Express Delivery</span>
                </div>
              </div>

            </div>

            {/* Right 3D Visual Stage with Real-Time Parallax Scroll */}
            <div className="lg:col-span-6 relative flex justify-center perspective-container py-8">
              
              {/* Main 3D Interactive Floating Card */}
              <div
                onClick={() => navigate('product-details', { productId: heroProduct.id })}
                className="relative w-full max-w-md bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-xs border border-[#D8BD7E]/50 shadow-2xl card-3d cursor-pointer group z-10 preserve-3d"
                style={{
                  transform: `perspective(1200px) translateY(${scrollY * 0.05}px) rotateY(${Math.sin(scrollY * 0.003) * 6}deg) rotateX(${Math.cos(scrollY * 0.003) * 3}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <div className="relative aspect-4/5 overflow-hidden rounded-xs bg-gradient-to-b from-[#FAF7F2] to-[#F4EFE6]/60 shadow-inner">
                  <LuxuryImage
                    src={heroProduct.mainImage}
                    alt={heroProduct.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2620]/75 via-transparent to-transparent opacity-90" />

                  <div className="absolute bottom-5 inset-x-5 text-white">
                    <p className="text-xs text-[#E8EFE9] tracking-wider uppercase mb-1">
                      {heroProduct.brand} • {heroProduct.categoryName}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-medium leading-tight">
                      {heroProduct.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-serif text-lg font-medium">${heroProduct.price.toFixed(2)}</span>
                      <span className="underline underline-offset-4 flex items-center space-x-1 text-[#E8EFE9] group-hover:text-white transition-colors">
                        <span>Discover Formulation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle Reflection Glass Base */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#7A9382] px-1">
                  <span>Limited Seasonal Batch</span>
                  <span className="text-[#5C7764] font-medium">18 Units Available</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 3D INTERACTIVE ATELIER 360° STUDIO VIEWER                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#FAF7F2] via-[#F4EFE6]/70 to-[#FAF7F2] border border-[#D8BD7E]/40 rounded-xs p-8 sm:p-12 shadow-md relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382]">
                <Rotate3d className="w-4 h-4 text-[#B7903D]" />
                <span>Spatial Formulation Study</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
                3D Interactive Artifact Studio
              </h2>

              <p className="text-xs sm:text-sm text-[#5C7764] leading-relaxed">
                Click and drag horizontally or choose an angle to inspect the light refraction, 
                fluted glass contours, and brushed brass collar of <strong>No. 07 Vert Ambre</strong>.
              </p>

              {/* Preset Angle Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                {[
                  { label: 'Front View (0°)', deg: 0 },
                  { label: 'Quarter Profile (45°)', deg: 45 },
                  { label: 'Side Angle (90°)', deg: 90 },
                  { label: 'Contour (135°)', deg: 135 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setRotationAngle(item.deg)}
                    className={`text-xs px-3 py-1.5 rounded-xs border transition-colors ${
                      Math.abs(rotationAngle % 360 - item.deg) < 10
                        ? 'bg-[#1C2620] text-white border-[#1C2620]'
                        : 'bg-white/80 text-[#334338] border-[#BAC7BE]/50 hover:bg-[#E8EFE9]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-2 text-xs text-[#7A9382] flex items-center space-x-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#5C7764] animate-ping" />
                <span>Interactive 3D Stage • Drag mouse across stage</span>
              </div>
            </div>

            {/* 3D Rotator Stage */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center perspective-container select-none">
              <div
                onMouseDown={handleMouseDown}
                className="relative w-72 h-80 sm:w-88 sm:h-96 cursor-grab active:cursor-grabbing flex items-center justify-center preserve-3d"
                style={{
                  transform: `perspective(1000px) rotateY(${rotationAngle}deg) rotateX(${Math.sin(rotationAngle * 0.05) * 5}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.4s ease-out',
                }}
              >
                {/* 3D Glass Pedestal */}
                <div 
                  className="absolute bottom-2 inset-x-6 h-12 bg-white/60 backdrop-blur-md rounded-full border border-[#D8BD7E]/50 shadow-2xl pointer-events-none"
                  style={{ transform: 'rotateX(80deg) translateZ(-40px)' }}
                />

                {/* 3D Product Box/Bottle Visual */}
                <div className="relative w-64 h-80 rounded-xs overflow-hidden shadow-2xl border border-[#D8BD7E]/60 bg-white/90 p-3 preserve-3d">
                  <LuxuryImage
                    src={heroProduct.mainImage}
                    alt={heroProduct.name}
                    className="w-full h-full object-cover rounded-xs"
                    containerClassName="w-full h-full rounded-xs shadow-inner"
                  />
                  {/* Subtle dynamic light sheen reacting to angle */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-tr from-transparent via-white to-transparent"
                    style={{
                      transform: `translateX(${(rotationAngle % 180) - 90}px)`,
                      transition: isDragging ? 'none' : 'transform 0.2s',
                    }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-[#7A9382] mt-4 uppercase tracking-widest font-mono">
                Current Orientation: {Math.round(rotationAngle % 360)}°
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED DISCIPLINES & CATEGORIES (Transparent Cards)                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block mb-2">
              Curated Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
              Maison Categories
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-medium tracking-wider uppercase text-[#5C7764] hover:text-[#1C2620] transition-colors"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate('category', { categorySlug: cat.slug })}
              className="group relative bg-white/70 backdrop-blur-md border border-[#BAC7BE]/40 hover:border-[#D8BD7E]/70 rounded-xs overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 card-3d"
            >
              <div className="aspect-4/5 overflow-hidden bg-[#FAF7F2]">
                <LuxuryImage
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-5 bg-white/60 backdrop-blur-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#7A9382] block mb-1">
                  {cat.itemCount} Formulations
                </span>
                <h3 className="font-serif text-lg text-[#1C2620] group-hover:text-[#5C7764] transition-colors font-medium">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#5C7764] line-clamp-2 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RECENT DISTILLATIONS / NEW ARRIVALS                                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block mb-2">
              Recent Distillations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => navigate('new-arrivals')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-medium tracking-wider uppercase text-[#5C7764] hover:text-[#1C2620] transition-colors"
          >
            <span>Explore All New</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ATELIER BRAND EDITORIAL STORY                                          */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6]/50 to-[#FAF7F2] py-20 border-y border-[#BAC7BE]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-xs overflow-hidden border border-[#D8BD7E]/50 shadow-xl">
                <LuxuryImage
                  src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=85"
                  alt="Swif Atelier ceramic and botanical studio"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-xl border border-[#BAC7BE]/40 p-6 rounded-xs shadow-xl hidden sm:block max-w-xs">
                <p className="font-serif text-sm text-[#1C2620] italic leading-relaxed">
                  "We do not accelerate nature. Each batch cures until mineral harmony is met."
                </p>
                <span className="block text-[10px] text-[#7A9382] uppercase tracking-wider mt-2">
                  — Master Distiller, Grasse
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block">
                The Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1C2620] leading-tight">
                Formulations Born from Patience
              </h2>
              <p className="text-sm text-[#5C7764] leading-relaxed">
                Swif was founded on the belief that everyday objects carry profound emotional weight. 
                Rather than mass-producing disposable goods, we collaborate with multigenerational Japanese potters, 
                French master perfumers, and Flemish flax weavers to create heirloom items designed to outlive trends.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#1C2620] font-medium">
                    <Leaf className="w-4 h-4 text-[#5C7764]" />
                    <span>Bio-Dynamic Harvest</span>
                  </div>
                  <p className="text-[#7A9382] leading-normal">
                    Cultivated without pesticides in alpine microclimates.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[#1C2620] font-medium">
                    <Compass className="w-4 h-4 text-[#B7903D]" />
                    <span>Honest Provenance</span>
                  </div>
                  <p className="text-[#7A9382] leading-normal">
                    Every batch records its origin, artisan, and distillation date.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('about')}
                  className="inline-flex items-center space-x-2 text-xs font-medium tracking-wider uppercase text-[#1C2620] hover:text-[#5C7764] underline underline-offset-8 transition-colors"
                >
                  <span>Read Our Full Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HEIRLOOM BEST SELLERS                                                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block mb-2">
              Heirloom Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => navigate('best-sellers')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-medium tracking-wider uppercase text-[#5C7764] hover:text-[#1C2620] transition-colors"
          >
            <span>View All Classics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CUSTOMER SUPPORT CONCIERGE (Strict Contact Requirements)               */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl border border-[#D8BD7E]/40 rounded-xs p-8 sm:p-10 shadow-sm text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1C2620]">
            Need help?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C7764] max-w-lg mx-auto leading-relaxed">
            Have a question? Reach us by email or message us on Instagram.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {/* Email Button */}
            <a
              href={`mailto:${brandInfo.email}`}
              className="w-full sm:w-auto bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-5 py-3 text-xs font-medium tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-3.5 h-3.5 text-[#BAC7BE]" />
              <span>Email: {brandInfo.email}</span>
            </a>

            {/* Instagram Button */}
            <a
              href={brandInfo.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-[#FAF7F2] text-[#1C2620] border border-[#BAC7BE]/60 px-5 py-3 text-xs font-medium tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Instagram className="w-3.5 h-3.5 text-[#B7903D]" />
              <span>Instagram: {brandInfo.instagram.handle}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
