import React, { useState } from 'react';
import { 
  Mail, 
  Instagram, 
  ArrowUpRight, 
  CheckCircle2, 
  Send, 
  Clock, 
  ShieldCheck, 
  Facebook, 
  Youtube, 
  Twitter, 
  Linkedin 
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const ContactPage: React.FC = () => {
  const { brandInfo, submitContactForm, addToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessageId, setSubmittedMessageId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const res = await submitContactForm(name, email, subject, message);
    setIsSubmitting(false);

    if (res.success) {
      setSubmittedMessageId('MSG-' + Date.now().toString().slice(-6));
      addToast('Your inquiry has been recorded and queued for the concierge.', 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      setErrorMessage(res.error || 'Failed to process inquiry.');
      addToast(res.error || 'Submission error.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A9382] block">
          Concierge & Inquiries
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1C2620]">
          Contact the Maison
        </h1>
        <p className="text-sm text-[#5C7764] leading-relaxed">
          Have a question? Reach us by email or message us on Instagram. 
          Our atelier concierge responds directly to inquiries regarding botanical formulations, bespoke ceramic orders, and international shipping.
        </p>
      </div>

      {/* Main Grid: Contact Channels + Live Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Official Contact Standards & Social Channels */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Official Email Box */}
          <div className="bg-[#FDFCF7] border border-[#D8BD7E]/40 p-6 rounded-xs shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#5C7764]">
              <Mail className="w-4 h-4 text-[#B7903D]" />
              <span>Official Email</span>
            </div>
            <p className="text-xs text-[#5C7764] leading-relaxed">
              For general client support, bespoke orders, and press inquiries:
            </p>
            <div>
              <a
                href={`mailto:${brandInfo.email}`}
                className="font-serif text-lg text-[#1C2620] hover:text-[#5C7764] underline underline-offset-4 transition-colors font-medium"
              >
                {brandInfo.email}
              </a>
            </div>
            <p className="text-[11px] text-[#7A9382]">
              Configured recipient inbox • Typically answered within 24 hours.
            </p>
          </div>

          {/* Official Instagram Box */}
          <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-6 rounded-xs shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#5C7764]">
                <Instagram className="w-4 h-4 text-[#B7903D]" />
                <span>Official Instagram</span>
              </div>
              <span className="text-[10px] bg-[#E8EFE9] text-[#5C7764] px-2 py-0.5 rounded font-medium border border-[#BAC7BE]/50">
                Active & Available
              </span>
            </div>
            <p className="text-xs text-[#5C7764] leading-relaxed">
              Message us on Instagram for immediate atelier correspondence, formulation previews, and lifestyle inquiries.
            </p>
            <div>
              <a
                href={brandInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] px-5 py-2.5 rounded-xs text-xs font-medium tracking-wider uppercase transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#BAC7BE]" />
                <span>Message us on Instagram: {brandInfo.instagram.handle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Other Platforms Availability (Coming Soon standard) */}
          <div className="bg-[#FDFCF7] border border-[#BAC7BE]/30 p-6 rounded-xs space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A9382]">
              Other Social Networks
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Facebook', icon: Facebook },
                { name: 'TikTok', icon: null },
                { name: 'YouTube', icon: Youtube },
                { name: 'X / Twitter', icon: Twitter },
                { name: 'Pinterest', icon: null },
                { name: 'LinkedIn', icon: Linkedin },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-xs bg-[#FAF7F2]/60 border border-[#BAC7BE]/20 text-[#9AAEA0]"
                >
                  <div className="flex items-center space-x-2">
                    {item.icon ? (
                      <item.icon className="w-3.5 h-3.5" />
                    ) : (
                      <span className="font-bold text-[11px]">#</span>
                    )}
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[10px] bg-[#E8EFE9] text-[#7A9382] px-2 py-0.5 rounded font-medium">
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Live Contact Form */}
        <div className="lg:col-span-7 bg-[#FDFCF7] border border-[#BAC7BE]/40 p-8 sm:p-10 rounded-xs shadow-xs space-y-6">
          
          <div>
            <h2 className="font-serif text-2xl text-[#1C2620]">
              Send an Atelier Inquiry
            </h2>
            <p className="text-xs text-[#5C7764] mt-1">
              All messages are dispatched to <strong>{brandInfo.email}</strong> and stored in the atelier inquiry database.
            </p>
          </div>

          {submittedMessageId && (
            <div className="p-4 bg-[#E8EFE9] border border-[#BAC7BE]/50 rounded-xs text-xs text-[#1C2620] space-y-1 animate-in fade-in">
              <div className="flex items-center space-x-2 font-semibold text-[#5C7764]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Inquiry Successfully Recorded ({submittedMessageId})</span>
              </div>
              <p className="text-[#5C7764] leading-relaxed">
                Your message has been verified and safely recorded in our database for routing to <strong>{brandInfo.email}</strong>. 
                Our team will reply to the provided email address.
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[11px] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Elena Rostova"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[11px] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="e.g. elena@swif.site"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[11px] mb-1">
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="e.g. Question on botanical ingredients / Custom ceramics inquiry"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[11px] mb-1">
                Your Message *
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Please describe how we can assist you..."
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-xs text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338]'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting to Concierge...' : 'Submit Message'}</span>
              </button>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-[10px] text-[#7A9382]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C7764]" />
              <span>
                Truthful backend validation. Submissions are stored in PostgreSQL and delivered to {brandInfo.email}.
              </span>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
};
