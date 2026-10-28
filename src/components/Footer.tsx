import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  Crown,
  Sparkles,
  Key,
  ShieldAlert,
  PhoneCall,
  Mail,
  MapPin,
  Globe,
  Share2,
  MessageCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsLookupModalOpen, setSelectedRoomFor3D, rooms } = useHotel();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0b1d1a] border-t border-[#C6A76B]/25 text-[#F6F1E7]/70 text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-12">
        {/* Top Newsletter & VIP invitation */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#102A26] via-[#193B32] to-[#102A26] border border-[#C6A76B]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C6A76B] block font-bold">
              Private Salon Invitation
            </span>
            <h3 className="text-xl md:text-2xl font-bold font-serif-luxury text-white">
              Join The Benchmark Sovereign Circle
            </h3>
            <p className="text-xs text-[#F6F1E7]/70 max-w-md">
              Receive private tasting invitations, rare penthouse previews, and seasonal champagne allocation privileges.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Enter your private email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B] w-full sm:w-72"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-xl gold-gradient-btn font-bold text-xs uppercase tracking-wider shrink-0"
            >
              {newsletterSuccess ? 'Invited!' : 'Request Entry'}
            </button>
          </form>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#193B32] border border-[#C6A76B]/40 flex items-center justify-center text-[#C6A76B]">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-extrabold tracking-[0.25em] uppercase text-white font-heading">
                  BENCHMARK
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#C6A76B] font-mono block font-bold">
                  HOTEL & RESIDENCES
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F6F1E7]/70 leading-relaxed max-w-sm">
              The international gold standard in ultra-luxury living. 45 stories of seaside majesty, three-star Michelin gastronomy, and 3D architectural living.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span title="Global Reach" className="w-8 h-8 rounded-xl bg-[#102A26] border border-[#C6A76B]/30 flex items-center justify-center text-[#C6A76B] hover:scale-105 transition-transform cursor-pointer">
                <Globe className="w-4 h-4" />
              </span>
              <span title="Share" className="w-8 h-8 rounded-xl bg-[#102A26] border border-[#C6A76B]/30 flex items-center justify-center text-[#C6A76B] hover:scale-105 transition-transform cursor-pointer">
                <Share2 className="w-4 h-4" />
              </span>
              <span title="VIP Concierge Messaging" className="w-8 h-8 rounded-xl bg-[#102A26] border border-[#C6A76B]/30 flex items-center justify-center text-[#C6A76B] hover:scale-105 transition-transform cursor-pointer">
                <MessageCircle className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Col 2: Accommodations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">The Suites</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    const r = rooms.find(room => room.category === 'Penthouse') || rooms[0];
                    setSelectedRoomFor3D(r);
                  }}
                  className="hover:text-[#C6A76B] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#C6A76B]" />
                  Royal Penthouses (3D)
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#C6A76B] transition-colors"
                >
                  Celestial Ocean Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#C6A76B] transition-colors"
                >
                  Sanctuary Lagoon Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#C6A76B] transition-colors"
                >
                  Grand Horizon Deluxe
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Guest Portal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsLookupModalOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#C6A76B] font-semibold"
                >
                  <Key className="w-3.5 h-3.5 text-[#C6A76B]" />
                  Find My Reservation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLookupModalOpen(true)}
                  className="hover:text-[#C6A76B] transition-colors"
                >
                  Mobile NFC Keycard
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('dining-wellness')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#C6A76B] transition-colors"
                >
                  Michelin Dining Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#C6A76B] transition-colors"
                >
                  Location & Transit Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Hotel Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Direct Concierge</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#F6F1E7]/80">
                <MapPin className="w-3.5 h-3.5 text-[#C6A76B] shrink-0 mt-0.5" />
                <span>One Benchmark Promenade, Marina Tower</span>
              </div>
              <div className="flex items-center gap-2 text-[#F6F1E7]/80">
                <PhoneCall className="w-3.5 h-3.5 text-[#C6A76B] shrink-0" />
                <span>+1 (800) 555-BENCHMARK</span>
              </div>
              <div className="flex items-center gap-2 text-[#F6F1E7]/80">
                <Mail className="w-3.5 h-3.5 text-[#C6A76B] shrink-0" />
                <span>concierge@benchmarkhotel.com</span>
              </div>

              {/* Admin Portal Button */}
              <div className="pt-3">
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-2 px-3 rounded-xl bg-[#193B32] hover:bg-[#1f473c] text-[#C6A76B] border border-[#C6A76B]/40 text-[11px] font-mono font-semibold flex items-center gap-1.5 transition-all"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Hotel Admin Management</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#C6A76B]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F6F1E7]/50">
          <div>
            © {new Date().getFullYear()} Benchmark Hotel & Luxury Residences. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Charter</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Stay</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
