import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  CheckCircle2, 
  Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const Footer: React.FC = () => {
  const { navigate, categories, brandInfo, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    addToast('Thank you for subscribing to Swif Atelier gazette.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#FAF7F2] text-[#1C2620] border-t border-[#BAC7BE]/35 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Atelier Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#BAC7BE]/30">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-medium block">
              SWIF
            </span>
            <p className="text-sm text-[#5C7764] leading-relaxed max-w-md">
              A contemporary house of slow botanical distillations and artisanal living objects. 
              Grounded in organic highland botanicals, pure linen, and wheel-thrown stoneware.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-[#7A9382]">
              <Lock className="w-3.5 h-3.5 text-[#5C7764]" />
              <span>Transparent Luxury • Authoritative Inventory • Worldwide Express Delivery</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#FDFCF7] p-6 sm:p-8 rounded-xs border border-[#D8BD7E]/30 shadow-xs">
              <h3 className="font-serif text-lg tracking-wide text-[#1C2620] mb-2">
                The Atelier Gazette
              </h3>
              <p className="text-xs text-[#5C7764] mb-4">
                Receive private notices on limited botanical harvests, small-batch ceramic firings, and seasonal scents.
              </p>

              {newsletterSubscribed ? (
                <div className="flex items-center space-x-2 text-xs text-[#5C7764] bg-[#E8EFE9] p-3 rounded-xs border border-[#BAC7BE]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#5C7764] flex-shrink-0" />
                  <span>You are subscribed. We honor your privacy with thoughtful quarterly correspondence.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 bg-white border border-[#BAC7BE]/50 rounded-xs px-3.5 py-2.5 text-xs text-[#1C2620] placeholder-[#9AAEA0] focus:outline-none focus:border-[#5C7764] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-5 py-2.5 text-xs tracking-wider uppercase font-medium rounded-xs transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Multi-column Directory & Official Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-[#BAC7BE]/30">
          
          {/* Column 1: Curated Collections */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5C7764]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#334338]">
              {categories.map((c) => (
                <li key={c.id}>
                  <button 
                    onClick={() => navigate('category', { categorySlug: c.slug })}
                    className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => navigate('new-arrivals')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  New Seasonal Arrivals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('best-sellers')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Heirloom Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Assistance */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5C7764]">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-[#334338]">
              <li>
                <button 
                  onClick={() => navigate('contact')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Contact Atelier
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('shipping')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('returns')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('faq')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('my-orders')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Track Order Status
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Maison */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5C7764]">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-[#334338]">
              <li>
                <button 
                  onClick={() => navigate('about')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('privacy')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('terms')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('admin-login')}
                  className="hover:text-[#1C2620] hover:underline underline-offset-4 transition-colors text-[#7A9382]"
                >
                  Staff & Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 & 5: Official Contact & Social Networks */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5C7764] mb-3">
                Official Contact & Support
              </h4>
              <p className="text-xs text-[#5C7764] mb-3">
                Have a question? Reach us by email or message us on Instagram.
              </p>
              
              <div className="space-y-2">
                {/* Official Email */}
                <div className="flex items-center space-x-2 text-xs">
                  <Mail className="w-4 h-4 text-[#5C7764]" />
                  <span className="text-[#7A9382]">Email:</span>
                  <a 
                    href={`mailto:${brandInfo.email}`}
                    className="font-medium text-[#1C2620] hover:text-[#5C7764] hover:underline transition-colors"
                  >
                    {brandInfo.email}
                  </a>
                </div>

                {/* Official Instagram */}
                <div className="flex items-center space-x-2 text-xs">
                  <Instagram className="w-4 h-4 text-[#B7903D]" />
                  <span className="text-[#7A9382]">Instagram:</span>
                  <a 
                    href={brandInfo.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1C2620] hover:text-[#5C7764] inline-flex items-center space-x-1 hover:underline transition-colors"
                  >
                    <span>{brandInfo.instagram.handle}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#B7903D]" />
                  </a>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#E8EFE9] text-[#5C7764] font-medium border border-[#BAC7BE]/50">
                    Official
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Channels (Active vs Coming Soon) */}
            <div>
              <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#7A9382] mb-2.5">
                Social Networks Availability
              </h5>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Instagram (Available) */}
                <a 
                  href={brandInfo.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xs bg-[#FDFCF7] border border-[#D8BD7E]/50 text-[#1C2620] hover:bg-[#FAF7F2] transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <Instagram className="w-3.5 h-3.5 text-[#B7903D]" />
                    <span className="font-medium">Instagram</span>
                  </div>
                  <span className="text-[10px] text-[#5C7764] font-medium flex items-center">
                    @swif.site <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
                  </span>
                </a>

                {/* Facebook (Coming Soon) */}
                <div 
                  className="flex items-center justify-between p-2 rounded-xs bg-[#FAF7F2]/50 border border-[#BAC7BE]/30 text-[#9AAEA0] cursor-not-allowed opacity-75"
                  title="Official account not yet launched"
                >
                  <div className="flex items-center space-x-2">
                    <Facebook className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#7A9382] px-1.5 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>

                {/* TikTok (Coming Soon) */}
                <div 
                  className="flex items-center justify-between p-2 rounded-xs bg-[#FAF7F2]/50 border border-[#BAC7BE]/30 text-[#9AAEA0] cursor-not-allowed opacity-75"
                  title="Official account not yet launched"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[11px] leading-none">TT</span>
                    <span>TikTok</span>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#7A9382] px-1.5 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>

                {/* YouTube (Coming Soon) */}
                <div 
                  className="flex items-center justify-between p-2 rounded-xs bg-[#FAF7F2]/50 border border-[#BAC7BE]/30 text-[#9AAEA0] cursor-not-allowed opacity-75"
                  title="Official account not yet launched"
                >
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#7A9382] px-1.5 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>

                {/* X / Twitter (Coming Soon) */}
                <div 
                  className="flex items-center justify-between p-2 rounded-xs bg-[#FAF7F2]/50 border border-[#BAC7BE]/30 text-[#9AAEA0] cursor-not-allowed opacity-75"
                  title="Official account not yet launched"
                >
                  <div className="flex items-center space-x-2">
                    <Twitter className="w-3.5 h-3.5" />
                    <span>X</span>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#7A9382] px-1.5 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>

                {/* Pinterest (Coming Soon) */}
                <div 
                  className="flex items-center justify-between p-2 rounded-xs bg-[#FAF7F2]/50 border border-[#BAC7BE]/30 text-[#9AAEA0] cursor-not-allowed opacity-75"
                  title="Official account not yet launched"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[11px] leading-none">P</span>
                    <span>Pinterest</span>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#7A9382] px-1.5 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>

                {/* LinkedIn (Coming Soon) */}
                <div 
                  className="flex items-center justify-between p-2 rounded-xs bg-[#FAF7F2]/50 border border-[#BAC7BE]/30 text-[#9AAEA0] cursor-not-allowed opacity-75 col-span-2"
                  title="Official account not yet launched"
                >
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#7A9382] px-1.5 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Disclosure */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A9382] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Swif Atelier. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={() => navigate('privacy')} className="hover:text-[#1C2620]">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => navigate('terms')} className="hover:text-[#1C2620]">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => navigate('shipping')} className="hover:text-[#1C2620]">
              Global Shipping
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
