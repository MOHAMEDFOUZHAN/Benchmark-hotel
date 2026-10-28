import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import {
  MapPin,
  PhoneCall,
  Mail,
  SlidersHorizontal,
  Key
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsLookupModalOpen, setSelectedRoomFor3D, rooms } = useHotel();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#E7DED0]/50 border-t border-[#E7DED0] text-[#777066] text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-16">
        {/* Newsletter / Bulletin */}
        <div className="p-8 md:p-12 rounded-lg bg-white border border-[#E7DED0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#A77D4B] block font-semibold">
              The Benchmark Journal
            </span>
            <h3 className="text-2xl md:text-3xl font-normal font-serif-luxury text-[#29241F]">
              Seasonal Letters & Private Allotments
            </h3>
            <p className="text-xs text-[#777066] max-w-md font-light">
              Receive rare vintage release announcements and seasonal coastal journal entries.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-2.5 rounded border border-[#E7DED0] bg-[#F7F4EE] text-[#29241F] text-xs focus:outline-none focus:border-[#29241F] w-full sm:w-72"
            />
            <button
              type="submit"
              className="btn-primary-espresso shrink-0"
            >
              {newsletterSuccess ? 'Subscribed' : 'Join'}
            </button>
          </form>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-xl font-normal tracking-[0.22em] uppercase text-[#29241F] font-serif-luxury leading-none">
                BENCHMARK
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#777066] font-sans mt-1">
                CHARING CROSS • OOTY
              </span>
            </div>

            <p className="text-xs text-[#777066] font-light leading-relaxed max-w-sm">
              Thirty-three high-altitude suites suspended above the Nilgiri hills near Charing Cross. Designed around teakwood fireplaces, misty pine forests, and bespoke highland care.
            </p>

            <div className="text-[11px] text-[#777066] pt-1 font-mono">
              Charing Cross, Ooty (Udhagamandalam) • 2,240m Elevation
            </div>
          </div>

          {/* Col 2: The Suites */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#29241F]">
              Suites
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    const r = rooms.find(room => room.category === 'Penthouse') || rooms[0];
                    setSelectedRoomFor3D(r);
                  }}
                  className="hover:text-[#29241F] transition-colors"
                >
                  Royal Penthouse (3D)
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#29241F] transition-colors"
                >
                  Ocean Horizon Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#29241F] transition-colors"
                >
                  Cliffside Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('suites')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#29241F] transition-colors"
                >
                  Deluxe Horizon
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resident Portal */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#29241F]">
              Resident Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setIsLookupModalOpen(true)}
                  className="hover:text-[#29241F] transition-colors flex items-center gap-1.5 text-[#29241F] font-medium"
                >
                  <Key className="w-3.5 h-3.5 text-[#A77D4B]" />
                  <span>My Stay / Room Pass</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('dining-wellness')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#29241F] transition-colors"
                >
                  Dining Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#29241F] transition-colors"
                >
                  Location & Transfers
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('privileges')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#29241F] transition-colors"
                >
                  Resident Privileges
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Ops */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#29241F]">
              Inquiries
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A77D4B] shrink-0 mt-0.5" />
                <span>One Benchmark Promenade, Costa del Sol</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#A77D4B] shrink-0" />
                <span>+1 (800) 555-BENCHMARK</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A77D4B] shrink-0" />
                <span>concierge@benchmarkhotel.com</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-1.5 px-3 rounded text-[11px] font-mono text-[#777066] border border-[#E7DED0] bg-white hover:text-[#29241F] hover:border-[#29241F] transition-all flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Hotel Operations Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#E7DED0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#777066]">
          <div>
            © {new Date().getFullYear()} Benchmark Hotel & Luxury Residences.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#29241F] cursor-pointer">Privacy Charter</span>
            <span>•</span>
            <span className="hover:text-[#29241F] cursor-pointer">Terms of Stay</span>
            <span>•</span>
            <span className="hover:text-[#29241F] cursor-pointer">Environmental Commitments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
