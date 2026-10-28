import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Room } from '../types/hotel';
import { formatINR } from '../utils/formatters';
import {
  Compass,
  Sparkles,
  Calendar,
  Wine,
  Waves,
  Heart,
  Briefcase,
  Shield,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Printer
} from 'lucide-react';

interface CuratedDossier {
  matchedRoomId: string;
  matchScore: number;
  itineraryTitle: string;
  philosophy: string;
  days: {
    dayLabel: string;
    morning: string;
    afternoon: string;
    evening: string;
  }[];
  chefSelection: string;
  wineVaultPairing: string;
  recommendedAddOnIds: string[];
}

export const StayCurator: React.FC = () => {
  const { rooms, setSelectedRoomForBooking, setSelectedRoomFor3D } = useHotel();

  // Curator Quiz State
  const [intent, setIntent] = useState<'romance' | 'detox' | 'executive' | 'epicurean'>('romance');
  const [setting, setSetting] = useState<'high_altitude' | 'secluded_ground' | 'coastal_harbour'>('high_altitude');
  const [cadence, setCadence] = useState<'gastronomy' | 'hydrotherapy' | 'sailing'>('gastronomy');
  
  const [dossier, setDossier] = useState<CuratedDossier | null>(null);

  // Generate Personalized Dossier
  const handleCurateStay = () => {
    let matchedRoomId = 'benchmark-penthouse';
    let matchScore = 98;
    let itineraryTitle = 'The Nilgiri Cloud-Ridge Sanctuary';
    let philosophy = 'Curated for complete highland elevation, blending mountain solitude with wood-burning fireplaces and single-estate tea craftsmanship.';

    if (setting === 'secluded_ground') {
      matchedRoomId = 'emerald-sanctuary-villa';
      matchScore = 96;
      itineraryTitle = 'The Shola Tea Grove & Botanical Retreat';
      philosophy = 'Ground-level botanical privacy amidst wild eucalyptus and organic tea slopes near Charing Cross, with private heated plunge pool.';
    } else if (intent === 'executive') {
      matchedRoomId = 'azure-executive-residence';
      matchScore = 95;
      itineraryTitle = 'The Nilgiri Heritage Executive Residence';
      philosophy = 'Designed for effortless focus, featuring a brass fireplace, cedar meeting parlor, and discreet 24-hour butler assistance.';
    } else if (setting === 'coastal_harbour' || intent === 'epicurean') {
      matchedRoomId = 'celestial-ocean-suite';
      matchScore = 97;
      itineraryTitle = 'The Nilgiri Tea Valley Epicurean Journey';
      philosophy = 'Panoramic mountain orientation with deep marble soaking tub, rare single-estate tea flights, and fireside wine tastings.';
    }

    const newDossier: CuratedDossier = {
      matchedRoomId,
      matchScore,
      itineraryTitle,
      philosophy,
      days: [
        {
          dayLabel: 'Day 01 — Mountain Ascent & Hearth Stillness',
          morning: 'Private tarmac greeting at Coimbatore Airport. Scenic Rolls-Royce climb through Coonoor tea ghats to Charing Cross, Ooty. In-suite hearth welcome with chilled Dom Pérignon or warm Nilgiri Silver Needle tea.',
          afternoon: 'Cedarwood sauna circuit with fresh Nilgiri eucalyptus vapor infusion, followed by restorative basalt river stone therapy.',
          evening: 'Sunset high tea on your mist terrace, followed by a 5-course in-suite fireplace dining journey orchestrated by our executive chef.'
        },
        {
          dayLabel: 'Day 02 — The Misty Nilgiri Valleys',
          morning: 'Artisanal terrace breakfast featuring fresh Ooty strawberries, warm sourdough, Nilgiri honey, and estate pour-overs.',
          afternoon: 'Step aboard our private heritage salon coach on the UNESCO Nilgiri Mountain Railway through misty pine viaducts and waterfalls.',
          evening: 'Private cellar visit to our reserve vault with our head sommelier, paired with artisanal Nilgiri artisanal cheeses beside an open bonfire.'
        }
      ],
      chefSelection: 'Nilgiri herb-crusted mountain lamb with wild rosemary reduction, charred baby carrots, and truffle potato emulsion.',
      wineVaultPairing: '2016 Penfolds Grange & Rare First-Flush Nilgiri Golden Tips.',
      recommendedAddOnIds: ['vintage-champagne', 'rolls-royce-transfer', 'private-chef-dinner']
    };

    setDossier(newDossier);
  };

  const matchedRoom = rooms.find(r => r.id === (dossier?.matchedRoomId || 'benchmark-penthouse')) || rooms[0];

  return (
    <section id="curator" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16 bg-[#F7F4EE]">
      {/* Section Header */}
      <div className="max-w-2xl">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#A77D4B] font-semibold block mb-2 font-sans">
          Tailored Residential Matching
        </span>
        <h2 className="text-4xl md:text-6xl font-normal font-serif-luxury text-[#29241F]">
          The Bespoke Stay Curator
        </h2>
        <p className="text-xs md:text-sm text-[#777066] mt-3 font-light leading-relaxed">
          Select your travel purpose, spatial preference, and preferred daily cadence to formulate an individualized stay dossier.
        </p>
      </div>

      {!dossier ? (
        /* The Curator Questionnaire Interface */
        <div className="p-8 md:p-12 rounded-lg bg-white border border-[#E7DED0] shadow-sm space-y-10">
          {/* Question 1: Travel Intent */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#A77D4B] font-semibold">01</span>
              <h3 className="text-lg font-normal font-serif-luxury text-[#29241F]">
                What is the primary intention of your stay?
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'romance', label: 'Celebration & Romance', icon: Heart, desc: 'Anniversary, honeymoon, or intimate secluded escape.' },
                { id: 'detox', label: 'Restoration & Detox', icon: Waves, desc: 'Complete acoustic stillness, thermal baths, and bio-hacking.' },
                { id: 'executive', label: 'Executive Solitude', icon: Briefcase, desc: 'Discreet high-security delegation or creative focus.' },
                { id: 'epicurean', label: 'Gastronomy & Wine', icon: Wine, desc: 'Michelin tasting menus and rare vintage allocations.' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setIntent(item.id as any)}
                  className={`p-5 rounded text-left transition-all border ${
                    intent === item.id
                      ? 'bg-[#29241F] text-[#F7F4EE] border-[#29241F] shadow-sm'
                      : 'bg-white border-[#E7DED0] text-[#777066] hover:border-[#29241F] hover:text-[#29241F]'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mb-2 ${intent === item.id ? 'text-[#A77D4B]' : 'text-[#777066]'}`} />
                  <div className={`text-xs font-semibold ${intent === item.id ? 'text-white' : 'text-[#29241F]'}`}>
                    {item.label}
                  </div>
                  <p className={`text-[11px] mt-1 font-light leading-snug ${intent === item.id ? 'text-[#E7DED0]' : 'text-[#777066]'}`}>
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Setting */}
          <div className="space-y-4 pt-6 border-t border-[#E7DED0]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#A77D4B] font-semibold">02</span>
              <h3 className="text-lg font-normal font-serif-luxury text-[#29241F]">
                Which architectural setting resonates with your natural rhythm?
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'high_altitude', label: 'Cloud-Ridge Sky Duplex', desc: 'Floors 30 to 49 with suspended heated mountain pool and stone fireplace.' },
                { id: 'secluded_ground', label: 'Shola Tea Garden Villa', desc: 'Ground-level botanical privacy, wild eucalyptus, and heated plunge pool.' },
                { id: 'coastal_harbour', label: 'Tea Valley Panoramic Deck', desc: 'Wraparound teakwood deck with direct view of misty Doddabetta ridges.' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setSetting(item.id as any)}
                  className={`p-5 rounded text-left transition-all border ${
                    setting === item.id
                      ? 'bg-[#29241F] text-[#F7F4EE] border-[#29241F] shadow-sm'
                      : 'bg-white border-[#E7DED0] text-[#777066] hover:border-[#29241F] hover:text-[#29241F]'
                  }`}
                >
                  <div className={`text-xs font-semibold ${setting === item.id ? 'text-white' : 'text-[#29241F]'}`}>
                    {item.label}
                  </div>
                  <p className={`text-[11px] mt-1 font-light leading-snug ${setting === item.id ? 'text-[#E7DED0]' : 'text-[#777066]'}`}>
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Cadence */}
          <div className="space-y-4 pt-6 border-t border-[#E7DED0]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#A77D4B] font-semibold">03</span>
              <h3 className="text-lg font-normal font-serif-luxury text-[#29241F]">
                Select your preferred afternoon cadence:
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'gastronomy', label: 'Tea Sommelier & Chef Table', desc: 'Single-estate Silver Needle flights, Nilgiri cheese, and fireside menus.' },
                { id: 'hydrotherapy', label: 'Eucalyptus Steam & Cedar Sauna', desc: 'Ancient Nilgiri herbal hydrotherapy, hot river stones, and botanical soaks.' },
                { id: 'sailing', label: 'Heritage Mountain Train & Trails', desc: 'Private vintage salon coach on the UNESCO Nilgiri train & guided tea walks.' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCadence(item.id as any)}
                  className={`p-5 rounded text-left transition-all border ${
                    cadence === item.id
                      ? 'bg-[#29241F] text-[#F7F4EE] border-[#29241F] shadow-sm'
                      : 'bg-white border-[#E7DED0] text-[#777066] hover:border-[#29241F] hover:text-[#29241F]'
                  }`}
                >
                  <div className={`text-xs font-semibold ${cadence === item.id ? 'text-white' : 'text-[#29241F]'}`}>
                    {item.label}
                  </div>
                  <p className={`text-[11px] mt-1 font-light leading-snug ${cadence === item.id ? 'text-[#E7DED0]' : 'text-[#777066]'}`}>
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Formulate Button */}
          <div className="pt-6 border-t border-[#E7DED0] flex justify-end">
            <button
              onClick={handleCurateStay}
              className="btn-primary-espresso flex items-center gap-2"
            >
              <span>Formulate Bespoke Stay Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* The Generated Personalized Stay Dossier */
        <div className="rounded-lg bg-white border border-[#E7DED0] shadow-sm overflow-hidden animate-fadeIn space-y-8 p-8 md:p-12">
          {/* Header of Dossier */}
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 pb-6 border-b border-[#E7DED0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A77D4B] font-semibold">
                  Tailored Dossier • Benchmark Curation
                </span>
                <span className="px-2 py-0.5 rounded bg-[#F7F4EE] border border-[#E7DED0] text-[10px] font-mono text-[#29241F]">
                  {dossier.matchScore}% Resonance Match
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-normal font-serif-luxury text-[#29241F] mt-2">
                {dossier.itineraryTitle}
              </h3>
              <p className="text-xs md:text-sm text-[#777066] mt-2 font-light leading-relaxed max-w-2xl">
                {dossier.philosophy}
              </p>
            </div>

            <button
              onClick={() => setDossier(null)}
              className="btn-outline-espresso text-xs flex items-center gap-1.5 self-start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Preferences</span>
            </button>
          </div>

          {/* Matched Suite Spotlight */}
          <div className="p-6 rounded border border-[#E7DED0] bg-[#F7F4EE]/40 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <img
              src={matchedRoom.images[0]}
              alt={matchedRoom.name}
              className="md:col-span-4 h-48 w-full object-cover rounded border border-[#E7DED0]"
            />
            <div className="md:col-span-5 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A77D4B]">Recommended Residence</span>
              <h4 className="text-2xl font-normal font-serif-luxury text-[#29241F]">
                {matchedRoom.name}
              </h4>
              <p className="text-xs text-[#777066] font-light leading-relaxed">
                {matchedRoom.tagline} • {matchedRoom.sizeSqFt} sq ft • {matchedRoom.floor}
              </p>
            </div>
            <div className="md:col-span-3 text-right space-y-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#777066] block">Direct Rate</span>
                <span className="text-3xl font-normal font-serif-luxury text-[#29241F]">{formatINR(matchedRoom.pricePerNight)}</span>
                <span className="text-xs text-[#777066]"> / night</span>
              </div>
              <button
                onClick={() => setSelectedRoomFor3D(matchedRoom)}
                className="w-full btn-outline-bronze text-center"
              >
                Inspect in 3D Tour
              </button>
            </div>
          </div>

          {/* Day-by-Day Schedule */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#777066] block">
              Suggested Resident Itinerary
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dossier.days.map((day, idx) => (
                <div key={idx} className="p-6 rounded border border-[#E7DED0] bg-white space-y-4">
                  <h5 className="text-base font-normal font-serif-luxury text-[#29241F] pb-2 border-b border-[#E7DED0]">
                    {day.dayLabel}
                  </h5>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-[#A77D4B] uppercase block">Morning</span>
                      <p className="text-[#777066] font-light mt-0.5 leading-relaxed">{day.morning}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#A77D4B] uppercase block">Afternoon</span>
                      <p className="text-[#777066] font-light mt-0.5 leading-relaxed">{day.afternoon}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#A77D4B] uppercase block">Evening</span>
                      <p className="text-[#777066] font-light mt-0.5 leading-relaxed">{day.evening}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chef & Sommelier Pairing Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded border border-[#E7DED0] bg-[#F7F4EE]/50 text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono text-[#A77D4B] font-semibold block mb-1">
                Bespoke In-Suite Culinary Journey
              </span>
              <p className="text-[#29241F] font-light leading-relaxed italic font-serif text-sm">
                "{dossier.chefSelection}"
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#A77D4B] font-semibold block mb-1">
                Sommelier Vault Pairing
              </span>
              <p className="text-[#29241F] font-mono text-xs">
                {dossier.wineVaultPairing}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#E7DED0] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => window.print()}
              className="btn-outline-espresso flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>

            <button
              onClick={() => setSelectedRoomForBooking(matchedRoom)}
              className="btn-primary-espresso flex items-center gap-2"
            >
              <span>Reserve This Curated Stay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

