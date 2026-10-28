import React, { useState } from 'react';

export const InteractiveAmenities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const experiences = [
    {
      title: 'Heated Mountain Horizon Pool & Mist Deck',
      subtitle: 'Suspended above the emerald tea plantations',
      description: 'A 34°C heated mineral pool extending over the Doddabetta slopes, framed by ancient eucalyptus trees, mist-wrapped glass edges, and evening stone hearths.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
      tag: 'Sanctuary Pool',
      stats: ['Heated 34°C Water', 'Panoramic Tea Slopes', 'Fireside Loungers']
    },
    {
      title: 'The Nilgiri Tea Pavilion & Colonial Cellar',
      subtitle: 'Single-estate tea flights & highland gastronomy',
      description: 'Celebrating high-altitude Nilgiri botanicals, rare Silver Needle and Frost Tea harvests, artisanal local cheeses, and private reserve wine vault pairings.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
      tag: 'Tea & Gastronomy',
      stats: ['Private Tea Master', 'Fireside Dining', 'Rare Harvest Cellar']
    },
    {
      title: 'Cedarwood Sauna & Eucalyptus Herbal Spa',
      subtitle: 'Restorative indigenous mountain botanicals',
      description: 'Finnish cedarwood sauna, organic Nilgiri eucalyptus vapor chambers, and restorative deep-tissue hot basalt river stone therapies.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
      tag: 'Nilgiri Spa',
      stats: ['Eucalyptus Steam', 'Hot Stone Therapies', 'Private Pavilions']
    },
    {
      title: 'Nilgiri Mountain Railway Private Salon Excursion',
      subtitle: 'UNESCO World Heritage vintage steam train journey',
      description: 'Step aboard our private heritage wooden salon coach along the historic Nilgiri Mountain Railway, travelling through mountain mist, pine bridges, and waterfalls.',
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1600&q=80',
      tag: 'Heritage Excursion',
      stats: ['Vintage Steam Coach', 'Private Butler Onboard', 'Tea Estate Stops']
    }
  ];

  return (
    <section id="dining-wellness" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16 bg-[#F7F4EE]">
      <div className="max-w-2xl">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#A77D4B] font-semibold block mb-2 font-sans">
          Resort Life
        </span>
        <h2 className="text-4xl md:text-6xl font-normal font-serif-luxury text-[#29241F]">
          Experiences & Solitude
        </h2>
        <p className="text-xs md:text-sm text-[#777066] mt-3 font-light leading-relaxed">
          From swimming in cantilevered travertine pools to private sea excursions, each experience is tailored with quiet human care.
        </p>
      </div>

      {/* Editorial Experience Layout */}
      <div className="rounded-lg overflow-hidden border border-[#E7DED0] bg-white shadow-sm grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Left Column Tabs */}
        <div className="lg:col-span-4 p-8 bg-[#F7F4EE]/60 border-b lg:border-b-0 lg:border-r border-[#E7DED0] flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#777066] tracking-wider block mb-3">
              Index
            </span>
            {experiences.map((exp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-4 rounded transition-all border ${
                  activeTab === idx
                    ? 'bg-white border-[#29241F] shadow-sm text-[#29241F]'
                    : 'bg-transparent border-transparent text-[#777066] hover:text-[#29241F]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${activeTab === idx ? 'font-semibold text-[#29241F]' : 'font-medium'}`}>
                    {exp.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#A77D4B]">0{idx + 1}</span>
                </div>
                <p className="text-[11px] text-[#777066] mt-1 font-light truncate">
                  {exp.subtitle}
                </p>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E7DED0] text-[11px] text-[#777066] font-light">
            * Resident priority reservations apply for all hotel facilities.
          </div>
        </div>

        {/* Right Active Preview Content */}
        <div className="lg:col-span-8 relative min-h-[380px] overflow-hidden flex flex-col justify-end p-8 md:p-12 select-none">
          <img
            src={experiences[activeTab].image}
            alt={experiences[activeTab].title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#29241F]/80 via-[#29241F]/20 to-transparent" />

          <div className="relative z-10 space-y-3 max-w-xl text-white">
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#E7DED0] block">
              {experiences[activeTab].tag}
            </span>

            <h3 className="text-3xl md:text-4xl font-normal font-serif-luxury">
              {experiences[activeTab].title}
            </h3>

            <p className="text-xs md:text-sm text-[#E7DED0] leading-relaxed font-light">
              {experiences[activeTab].description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {experiences[activeTab].stats.map((stat, i) => (
                <div
                  key={i}
                  className="px-3 py-1 rounded bg-[#29241F]/60 backdrop-blur-sm border border-white/20 text-[#F7F4EE] text-xs font-light"
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
