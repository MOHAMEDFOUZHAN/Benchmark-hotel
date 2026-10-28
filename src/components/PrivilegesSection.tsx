import React from 'react';
import {
  Crown,
  Sparkles,
  Shield,
  Plane,
  Wine,
  Clock
} from 'lucide-react';

export const PrivilegesSection: React.FC = () => {
  const perks = [
    {
      icon: Crown,
      title: 'Dedicated Royal Butler 24/7',
      desc: 'Trained at the British Butler Institute, your private butler attends to unpacking, reservations, and private in-suite banquet services.'
    },
    {
      icon: Plane,
      title: 'Private Helipad & Tarmac Clearance',
      desc: 'Fly directly onto Tower Deck 50 or enjoy Rolls-Royce Ghost meet-and-greet on the private aviation tarmac.'
    },
    {
      icon: Wine,
      title: 'Grand Sommelier Reserve Vault',
      desc: 'Complimentary access to vintage Grand Cru Bordeaux, champagne tastings, and custom climate-controlled in-suite wine wall.'
    },
    {
      icon: Clock,
      title: 'Flexible VIP 24-Hour Stay',
      desc: 'Check in and check out on your terms. Arrive at 8:00 AM, depart at 8:00 PM without rigid scheduling restrictions.'
    }
  ];

  return (
    <section id="privileges" className="py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-[#C6A76B]">
            <Sparkles className="w-4 h-4 text-[#C6A76B]" />
            The Benchmark Standard
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-serif-luxury text-[#F6F1E7] leading-tight">
            Unrivaled Privileges For The Discerning Few
          </h2>
          <p className="text-xs md:text-sm text-[#F6F1E7]/80 leading-relaxed">
            True luxury is not merely opulent decor — it is the effortless anticipation of your every desire. Our sovereign services redefine the boundaries of global hospitality.
          </p>

          <div className="p-5 rounded-2xl bg-[#193B32] border border-[#C6A76B]/40 space-y-2">
            <div className="flex items-center gap-2 text-[#C6A76B] font-bold text-sm">
              <Shield className="w-4 h-4 text-[#C6A76B]" />
              <span>Benchmark Sovereign Membership</span>
            </div>
            <p className="text-xs text-[#F6F1E7]/80 leading-relaxed">
              Every guest reserving via our direct website is automatically accorded Sapphire Tier status with guaranteed upgrades, late checkouts, and priority dining.
            </p>
          </div>
        </div>

        {/* Right Column Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#193B32] border border-[#C6A76B]/30 hover:border-[#C6A76B]/70 transition-all space-y-3 group shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#102A26] border border-[#C6A76B]/40 flex items-center justify-center text-[#C6A76B] group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-serif-luxury text-white group-hover:text-[#C6A76B] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#F6F1E7]/70 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
