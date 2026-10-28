import React from 'react';
import {
  Compass,
  Clock,
  Wine,
  Sparkles
} from 'lucide-react';

export const PrivilegesSection: React.FC = () => {
  const perks = [
    {
      icon: Clock,
      title: 'Bespoke Private Butler Care',
      desc: 'Discreet and attentive unpacking, in-suite hearth lighting, tea ceremonies, and personalized Nilgiri mountain itineraries arranged effortlessly.'
    },
    {
      icon: Compass,
      title: 'Chauffeured Mountain Transfers',
      desc: 'Scenic luxury transfers from Coimbatore Airport or Bangalore direct to our highland sanctuary near Charing Cross, Ooty.'
    },
    {
      icon: Wine,
      title: 'Curated Cellar & Tea Vault Allotment',
      desc: 'Access to rare single-estate Nilgiri first-flush teas, vintage wine vault allocations, and private fireside sommelier tastings.'
    },
    {
      icon: Sparkles,
      title: 'Flexible Arrival & Departure',
      desc: 'Check-in and check-out tailored to your natural travel rhythm, with private lounge hospitality and hot Nilgiri tea whenever you arrive.'
    }
  ];

  return (
    <section id="privileges" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16 bg-[#F7F4EE]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A77D4B] font-semibold block font-sans">
            The Benchmark Standard
          </span>
          <h2 className="text-4xl md:text-6xl font-normal font-serif-luxury text-[#29241F] leading-tight">
            Quiet luxury in every detail.
          </h2>
          <p className="text-xs md:text-sm text-[#777066] font-light leading-relaxed">
            True hospitality is felt rather than announced. At Benchmark Ooty, our hosts anticipate your daily rhythms before you need to ask.
          </p>

          <div className="p-6 rounded-lg bg-white border border-[#E7DED0] space-y-2">
            <span className="text-xs font-medium text-[#29241F] block">
              Resident Privileges
            </span>
            <p className="text-xs text-[#777066] font-light leading-relaxed">
              All direct website reservations include daily breakfast on the mist tea terrace, complimentary pressing on arrival, and eucalyptus herbal spa access.
            </p>
          </div>
        </div>

        {/* Right Column Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-lg bg-white border border-[#E7DED0] hover:border-[#A77D4B] transition-all space-y-3 shadow-sm"
              >
                <div className="w-10 h-10 rounded bg-[#F7F4EE] border border-[#E7DED0] flex items-center justify-center text-[#A77D4B]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-normal font-serif-luxury text-[#29241F]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#777066] font-light leading-relaxed">
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
