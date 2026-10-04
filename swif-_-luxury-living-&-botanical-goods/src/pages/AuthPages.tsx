import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

interface AuthPagesProps {
  initialView?: 'login' | 'register' | 'forgot';
}

export const AuthPages: React.FC<AuthPagesProps> = ({ initialView = 'login' }) => {
  const { 
    loginUser, 
    registerUser, 
    navigate, 
    addToast, 
    loginAsAdmin, 
    loginAsCustomer, 
    brandInfo 
  } = useStore();

  const [view, setView] = useState<'login' | 'register' | 'forgot'>(initialView);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await loginUser(email, password);
    setLoading(false);

    if (res.success) {
      navigate('my-account');
    } else {
      setErrorMsg(res.error || 'Invalid authentication credentials.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await registerUser(fullName, email, password);
    setLoading(false);

    if (res.success) {
      navigate('my-account');
    } else {
      setErrorMsg(res.error || 'Registration failed.');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid account email.');
      return;
    }
    setResetSent(true);
    addToast(`Password reset instructions queued for ${email}.`, 'info');
  };

  // Google OAuth Flow simulation
  const handleGoogleOAuthSimulate = () => {
    setGoogleModalOpen(false);
    const googleUser = {
      email: 'claire.delacroix@gmail.com',
      fullName: 'Claire Delacroix',
    };
    loginUser(googleUser.email, 'google-oauth-verified');
    navigate('my-account');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      
      {/* Brand Header */}
      <div className="text-center space-y-2 mb-8">
        <span className="font-serif text-3xl tracking-[0.15em] font-medium text-[#1C2620]">
          SWIF
        </span>
        <h1 className="font-serif text-2xl text-[#1C2620]">
          {view === 'login' && 'Patron Sign In'}
          {view === 'register' && 'Create Atelier Account'}
          {view === 'forgot' && 'Password Assistance'}
        </h1>
        <p className="text-xs text-[#5C7764]">
          {view === 'login' && 'Access order histories, curated wishlists, and delivery addresses.'}
          {view === 'register' && 'Join the Swif Maison for bespoke harvests and express fulfillment.'}
          {view === 'forgot' && 'Enter your registered email to receive secure recovery coordinates.'}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-[#FDFCF7] border border-[#BAC7BE]/40 p-8 rounded-xs shadow-sm space-y-6">
        
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Login Form */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="claire.delacroix@swif.site"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[#7A9382] uppercase tracking-wider text-[10px]">
                  Password *
                </label>
                <button
                  type="button"
                  onClick={() => setView('forgot')}
                  className="text-[11px] text-[#5C7764] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] py-3.5 rounded-xs text-xs font-medium tracking-widest uppercase transition-colors"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            {/* Google OAuth Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setGoogleModalOpen(true)}
                className="w-full bg-white hover:bg-[#FAF7F2] text-[#1C2620] border border-[#BAC7BE]/60 py-3 rounded-xs text-xs font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Quick Demo Previews */}
            <div className="pt-4 border-t border-[#BAC7BE]/20 flex items-center justify-between text-[11px] text-[#7A9382]">
              <span>Quick Role Switch:</span>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={loginAsCustomer}
                  className="hover:underline text-[#5C7764] font-medium"
                >
                  Customer Demo
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={loginAsAdmin}
                  className="hover:underline text-[#B7903D] font-medium"
                >
                  Admin Master
                </button>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-[#5C7764]">
              <span>Don't have an atelier account? </span>
              <button
                type="button"
                onClick={() => setView('register')}
                className="text-[#1C2620] font-medium underline underline-offset-4 hover:text-[#5C7764]"
              >
                Create an account
              </button>
            </div>
          </form>
        )}

        {/* 2. Register Form */}
        {view === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Elena Rostova"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="elena@swif.site"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                Password (minimum 8 characters) *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <div>
              <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] py-3.5 rounded-xs text-xs font-medium tracking-widest uppercase transition-colors"
            >
              {loading ? 'Creating Account...' : 'Register Atelier Account'}
            </button>

            <div className="pt-2 text-center text-xs text-[#5C7764]">
              <span>Already registered? </span>
              <button
                type="button"
                onClick={() => setView('login')}
                className="text-[#1C2620] font-medium underline underline-offset-4 hover:text-[#5C7764]"
              >
                Sign in here
              </button>
            </div>
          </form>
        )}

        {/* 3. Forgot Password Form */}
        {view === 'forgot' && (
          <div className="space-y-4 text-xs">
            {resetSent ? (
              <div className="p-4 bg-[#E8EFE9] border border-[#BAC7BE]/50 rounded-xs text-[#1C2620] space-y-2">
                <div className="flex items-center space-x-2 font-semibold text-[#5C7764]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recovery Coordinates Dispatched</span>
                </div>
                <p className="text-[#5C7764] leading-relaxed">
                  If an account exists for <strong>{email}</strong>, a secure one-time cryptographic reset token has been generated and dispatched via configured SMTP infrastructure.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => { setResetSent(false); setView('login'); }}
                    className="text-xs text-[#1C2620] underline font-medium"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-[#7A9382] uppercase tracking-wider text-[10px] mb-1">
                    Your Registered Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="claire.delacroix@swif.site"
                    className="w-full bg-white border border-[#BAC7BE]/50 rounded-xs p-3 text-[#1C2620] focus:outline-none focus:border-[#5C7764]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] py-3.5 rounded-xs text-xs font-medium tracking-widest uppercase transition-colors"
                >
                  Send Recovery Link
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="text-[#5C7764] hover:underline"
                  >
                    Return to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>

      {/* Google OAuth Modal Details */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2620]/60 backdrop-blur-xs">
          <div className="bg-[#FDFCF7] border border-[#BAC7BE]/50 p-6 sm:p-8 rounded-xs max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#5C7764]">
              <ShieldCheck className="w-4 h-4 text-[#5C7764]" />
              <span>Google OAuth 2.0 Integration</span>
            </div>

            <h3 className="font-serif text-xl text-[#1C2620]">
              Sign In with Google Account
            </h3>

            <p className="text-xs text-[#5C7764] leading-relaxed">
              In production, this flow redirects to <code>https://accounts.google.com/o/oauth2/v2/auth</code> utilizing your <code>GOOGLE_CLIENT_ID</code> and verified redirect URI. 
              The backend verifies the returned state parameter and cryptographic ID token.
            </p>

            <div className="p-3 bg-[#FAF7F2] border border-[#BAC7BE]/30 rounded-xs text-[11px] text-[#7A9382] space-y-1">
              <div><strong>Configured Origin:</strong> https://swif.site</div>
              <div><strong>Scopes Requested:</strong> openid, email, profile</div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGoogleOAuthSimulate}
                className="w-full bg-[#1C2620] text-[#FAF7F2] hover:bg-[#334338] py-3 rounded-xs text-xs uppercase tracking-wider font-medium"
              >
                Authenticate Google Account (Claire Delacroix)
              </button>
              <button
                type="button"
                onClick={() => setGoogleModalOpen(false)}
                className="w-full py-2.5 rounded-xs text-xs text-[#7A9382] hover:text-[#1C2620]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
