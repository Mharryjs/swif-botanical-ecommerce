import React from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Truck, 
  RotateCcw, 
  HelpCircle, 
  FileText, 
  Lock, 
  ArrowLeft 
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

// 1. About Us
export const AboutPage: React.FC = () => {
  const { navigate, brandInfo } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block">
          The Maison Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1C2620]">
          The Art of Slow Distillation
        </h1>
        <p className="text-sm text-[#5C7764] leading-relaxed max-w-xl mx-auto">
          Founded on quiet luxury, organic provenance, and timeless handcrafted design.
        </p>
      </div>

      <div className="relative aspect-16/9 rounded-xs overflow-hidden border border-[#D8BD7E]/40 shadow-md">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
          alt="Swif Atelier studio"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-6 text-sm text-[#334338] leading-relaxed">
        <h2 className="font-serif text-2xl text-[#1C2620]">Understated Living, Grounded in Earth</h2>
        <p>
          At Swif, our practice centers on the sensory resonance of living spaces. 
          We believe objects of beauty must not merely occupy physical room, but cultivate stillness within those who encounter them.
        </p>
        <p>
          Each botanical formulation is compounded using traditional copper alembic stills in Grasse, France. 
          Our stone vessels are thrown by third-generation ceramists in Kyoto, using iron-laden clay harvested from riverbeds 
          and glazed with mineral-rich wood ash.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#BAC7BE]/30 text-xs">
          <div className="space-y-2 p-4 bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs">
            <Leaf className="w-5 h-5 text-[#5C7764]" />
            <h4 className="font-semibold text-sm text-[#1C2620]">Bio-Dynamic</h4>
            <p className="text-[#5C7764]">Sustainably harvested alpine botanicals without synthetic pesticides.</p>
          </div>
          <div className="space-y-2 p-4 bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs">
            <ShieldCheck className="w-5 h-5 text-[#B7903D]" />
            <h4 className="font-semibold text-sm text-[#1C2620]">Batch Integrity</h4>
            <p className="text-[#5C7764]">Every bottle is labeled with its seasonal harvest lot and distillation master.</p>
          </div>
          <div className="space-y-2 p-4 bg-[#FDFCF7] border border-[#BAC7BE]/30 rounded-xs">
            <Truck className="w-5 h-5 text-[#5C7764]" />
            <h4 className="font-semibold text-sm text-[#1C2620]">Carbon-Neutral</h4>
            <p className="text-[#5C7764]">Protected in recyclable fluted glass and unbleached cotton enclosures.</p>
          </div>
        </div>

        <div className="pt-8 text-center">
          <button
            onClick={() => navigate('shop')}
            className="bg-[#1C2620] text-[#FAF7F2] px-8 py-3 rounded-xs text-xs uppercase tracking-widest font-medium"
          >
            Explore the Collection
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. FAQ Page
export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'Where are Swif botanical formulations distilled?',
      a: 'All our perfumes, lipid serums, and atmospheric room sprays are compounded and distilled in small artisanal facilities in Provence and Grasse, France, using cold-pressed extracts.'
    },
    {
      q: 'Are your ceramic vessels dishwasher safe?',
      a: 'While our high-fired Kyoto stoneware is food-safe and durable, we recommend gentle hand washing with warm water and natural soap to preserve the delicate satin mineral celadon finish.'
    },
    {
      q: 'What is your complimentary delivery policy?',
      a: 'We provide complimentary carbon-neutral worldwide shipping on all orders totaling $150 or more. Standard orders below this threshold are delivered for a flat fee of $15.'
    },
    {
      q: 'How can I inquire about bespoke commissions?',
      a: 'Reach our concierge team directly by email at sswiftsite@gmail.com or send a direct message on Instagram at @swif.site.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block">
          Client Assistance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-6 rounded-xs shadow-xs space-y-2">
            <h3 className="font-serif text-lg text-[#1C2620] flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-[#5C7764] flex-shrink-0" />
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs text-[#5C7764] leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Shipping Policy Page
export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 text-xs text-[#334338] leading-relaxed">
      <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
        Worldwide Delivery & Dispatch
      </h1>
      <p>
        Swif ships to discerning clients worldwide from our fulfillment hub in France.
      </p>
      <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-6 rounded-xs space-y-4">
        <h3 className="font-serif text-base text-[#1C2620] font-semibold">Delivery Tiers</h3>
        <ul className="space-y-2 list-disc list-inside text-[#5C7764]">
          <li><strong>Orders over $150:</strong> Complimentary Worldwide Express Delivery (3–5 business days).</li>
          <li><strong>Orders under $150:</strong> Flat-rate $15 carbon-neutral standard delivery.</li>
          <li><strong>Fragile Ceramics:</strong> Custom molded recycled cellulose packaging ensures pristine arrival.</li>
        </ul>
      </div>
    </div>
  );
};

// 4. Returns Policy Page
export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 text-xs text-[#334338] leading-relaxed">
      <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
        Returns & Exchanges
      </h1>
      <p>
        We stand behind the craftsmanship of every formulation and vessel.
      </p>
      <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-6 rounded-xs space-y-4">
        <h3 className="font-serif text-base text-[#1C2620] font-semibold">30-Day Effortless Window</h3>
        <p className="text-[#5C7764]">
          Unopened formulations and intact ceramic objects may be returned within 30 days of receipt. 
          To request a return authorization, email our concierge at <strong>sswiftsite@gmail.com</strong> with your order reference.
        </p>
      </div>
    </div>
  );
};

// 5. Privacy Policy Page
export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 text-xs text-[#334338] leading-relaxed">
      <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
        Privacy & Data Stewardship
      </h1>
      <p>
        Swif operates under strict data minimization standards. We do not sell client profiles, 
        nor do we employ third-party behavioral trackers.
      </p>
      <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-6 rounded-xs space-y-4">
        <h3 className="font-serif text-base text-[#1C2620] font-semibold">Storage & Security</h3>
        <p className="text-[#5C7764]">
          User passwords are encrypted with salted one-way hashes (Argon2id). 
          Session cookies are restricted to HttpOnly and SameSite configurations. 
          Customer addresses are used exclusively for order fulfillment.
        </p>
      </div>
    </div>
  );
};

// 6. Terms & Conditions Page
export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 text-xs text-[#334338] leading-relaxed">
      <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2620]">
        Terms & Conditions
      </h1>
      <p>
        By accessing the Swif Atelier catalog and placing orders, you agree to these transparent terms of service.
      </p>
      <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-6 rounded-xs space-y-4">
        <h3 className="font-serif text-base text-[#1C2620] font-semibold">Inventory & Ordering</h3>
        <p className="text-[#5C7764]">
          Prices are stated in USD. Stock availability is authoritatively locked upon order creation. 
          In the event of harvest limitations, clients are immediately notified with full refund guarantees.
        </p>
      </div>
    </div>
  );
};

// 7. 404 Not Found Page
export const NotFoundPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="max-w-md mx-auto px-4 py-28 text-center space-y-4">
      <span className="font-serif text-6xl text-[#BAC7BE] block">404</span>
      <h1 className="font-serif text-2xl text-[#1C2620]">Page Not Located</h1>
      <p className="text-xs text-[#5C7764]">
        The formulation, category, or archival page you requested cannot be found in the current salon.
      </p>
      <div className="pt-2">
        <button
          onClick={() => navigate('home')}
          className="bg-[#1C2620] text-[#FAF7F2] px-6 py-2.5 rounded-xs text-xs uppercase tracking-wider font-medium"
        >
          Return to Atelier Home
        </button>
      </div>
    </div>
  );
};
