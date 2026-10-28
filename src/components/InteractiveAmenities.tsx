import React, { useState } from 'react';
import {
  ShieldCheck
} from 'lucide-react';

export const InteractiveAmenities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const experiences = [
    {
      title: 'Cantilevered Sky Infinity Pool',
      subtitle: 'Suspended 45 Floors Above The Emerald Horizon',
      description: 'Heated salt-water horizon pool with transparent glass bottom extension, in-water sun loungers, and underwater acoustic sound system.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
      tag: 'Architectural Icon',
      stats: ['400 ft Elevation', 'Glass Bottom Edge', 'Moët & Chandon Bar']
    },
    {
      title: 'Le Benchmark: 3-Star Michelin Fine Dining',
      subtitle: 'Culinary Poetry by Master Chef Antoine Moreau',
      description: 'An immersive 9-course gastronomic odyssey combining modern French precision with hyper-seasonal coastal seafood and private sommelier cellar.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
      tag: 'Gastronomy',
      stats: ['3 Michelin Stars', '4,500 Bottle Vault', 'Private Chef Tables']
    },
    {
      title: 'Saphir Imperial Diamond Spa & Cryo',
      subtitle: 'Ancient Thermal Alchemy & Bio-Hacking',
      description: 'Thermal hydrotherapy circuits, Swiss Himalayan salt caves, -110°C whole-body cryotherapy, and customized cellular rejuvenation treatments.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
      tag: 'Wellness Sanctuary',
      stats: ['Sub-Zero Cryo', 'Couples Suites', 'Organic Botanicals']
    },
    {
      title: 'Helipad & Riva Superyacht Charters',
      subtitle: 'Seamless High-Altitude and Oceanic Mobility',
      description: 'Private rooftop helipad with direct transfers to international airports, and custom day charters aboard our 88-foot private Benchmark Riva yacht.',
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=80',
      tag: 'VIP Mobility',
      stats: ['Deck 50 Helipad', '88ft Riva Yacht', '24/7 Captain']
    }
  ];

  return (
    <section id="dining-wellness" className="py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-mono tracking-widest text-[#C6A76B] block mb-2 font-bold">
          Beyond Accommodation
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-serif-luxury text-[#F6F1E7]">
          Curated Haute Experiences
        </h2>
        <p className="text-xs md:text-sm text-[#F6F1E7]/75 mt-3 leading-relaxed">
          From suspended glass-bottom swimming to Michelin-starred dining, every moment at Benchmark is orchestrated to exceed imagination.
        </p>
      </div>

      {/* Experience Showcase Card */}
      <div className="glass-panel-emerald rounded-3xl overflow-hidden border border-[#C6A76B]/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Navigation Buttons */}
        <div className="lg:col-span-4 p-6 bg-[#102A26] border-b lg:border-b-0 lg:border-r border-[#C6A76B]/25 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#C6A76B] tracking-wider block mb-2 font-bold">
              Select Experience
            </span>
            {experiences.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                  activeTab === idx
                    ? 'bg-[#193B32] border-[#C6A76B] text-white shadow-lg'
                    : 'bg-[#102A26] border-[#C6A76B]/20 text-[#F6F1E7]/70 hover:text-white hover:border-[#C6A76B]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${activeTab === idx ? 'text-[#C6A76B]' : 'text-white'}`}>
                    {exp.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#C6A76B]">0{idx + 1}</span>
                </div>
                <p className="text-[11px] text-[#F6F1E7]/60 mt-1 truncate">
                  {exp.subtitle}
                </p>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#C6A76B]/20 text-[11px] text-[#F6F1E7]/70 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C6A76B]" />
            <span>Reserved exclusively for Benchmark resident guests</span>
          </div>
        </div>

        {/* Right Active Preview Content */}
        <div className="lg:col-span-8 relative min-h-[360px] overflow-hidden flex flex-col justify-end p-6 md:p-10 select-none">
          {/* Background image */}
          <img
            src={experiences[activeTab].image}
            alt={experiences[activeTab].title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A26] via-[#102A26]/60 to-black/30" />

          {/* Foreground text */}
          <div className="relative z-10 space-y-4 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#C6A76B] text-[#102A26] inline-block shadow-lg font-mono">
              {experiences[activeTab].tag}
            </span>

            <h3 className="text-2xl md:text-4xl font-bold font-serif-luxury text-white">
              {experiences[activeTab].title}
            </h3>

            <p className="text-xs md:text-sm text-[#F6F1E7]/90 leading-relaxed drop-shadow">
              {experiences[activeTab].description}
            </p>

            {/* Feature stats */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {experiences[activeTab].stats.map((stat, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-[#102A26]/90 backdrop-blur-md border border-[#C6A76B]/40 text-[#C6A76B] text-xs font-semibold font-mono"
                >
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
