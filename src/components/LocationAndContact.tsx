import React, { useState } from 'react';
import {
  MapPin,
  PhoneCall,
  Mail,
  Plane,
  Anchor,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Compass
} from 'lucide-react';

export const LocationAndContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Concierge & Suite Inquiries',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Concierge & Suite Inquiries',
        message: ''
      });
    }, 4000);
  };

  const transitOptions = [
    {
      icon: Plane,
      mode: 'International Airport (SFO/LAX Hub)',
      time: '25 Mins via Chauffeur / 7 Mins via Helicopter',
      detail: 'Complimentary tarmac greet & Rolls-Royce Ghost private transfer for Penthouse & Suite guests.'
    },
    {
      icon: Anchor,
      mode: 'Benchmark Superyacht Marina',
      time: 'Direct Marina Berthing at Promenade Dock A',
      detail: 'Deep-water slips accommodating vessels up to 220 feet with shore power and concierge provisioning.'
    },
    {
      icon: Compass,
      mode: 'Rooftop Helipad (Deck 50)',
      time: 'Direct Touchdown (ICAO Code: WBBM)',
      detail: 'Private VIP security clearance and direct express elevator to the Royal Penthouse corridor.'
    }
  ];

  return (
    <section id="location" className="py-20 px-4 md:px-8 bg-[#F7F4ED] text-[#252A27]">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A26]/10 text-[#102A26] border border-[#C6A76B]/40 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A76B]" />
            Prime Coastal Sanctuary
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-serif-luxury text-[#102A26]">
            Location & Concierge Salon
          </h2>
          <p className="text-xs md:text-sm text-[#252A27]/80 leading-relaxed">
            Situated on an exclusive seaside promontory, Benchmark combines absolute secluded sanctuary living with effortless high-speed access.
          </p>
        </div>

        {/* Transit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transitOptions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-[#C6A76B]/30 shadow-md hover:shadow-xl transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#102A26] text-[#C6A76B] flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-serif-luxury text-[#102A26]">
                  {item.mode}
                </h3>
                <div className="text-xs font-semibold text-[#C6A76B] font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </div>
                <p className="text-xs text-[#252A27]/75 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Form & Map Interactive Panel */}
        <div className="rounded-3xl bg-[#102A26] text-[#F6F1E7] border border-[#C6A76B]/40 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Direct Concierge Hotline Info */}
          <div className="lg:col-span-5 p-8 md:p-10 bg-gradient-to-br from-[#102A26] to-[#193B32] space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#C6A76B]/25">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A76B] block">
                24/7 Global Liaison Desk
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-serif-luxury text-[#F6F1E7]">
                Connect with Private Concierge
              </h3>
              <p className="text-xs text-[#F6F1E7]/80 leading-relaxed">
                Whether arranging a discreet arrival, bespoke chef tasting, or private yacht charter, our head concierge is at your service.
              </p>

              <div className="space-y-3.5 pt-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#193B32] border border-[#C6A76B]/30 flex items-center justify-center text-[#C6A76B] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#C6A76B] block uppercase font-mono">Location</span>
                    <span className="text-white font-medium">One Benchmark Promenade, Marina Coastline Blvd</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#193B32] border border-[#C6A76B]/30 flex items-center justify-center text-[#C6A76B] shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#C6A76B] block uppercase font-mono">Direct Line</span>
                    <span className="text-white font-medium">+1 (800) 555-BENCHMARK • Ext. 1</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#193B32] border border-[#C6A76B]/30 flex items-center justify-center text-[#C6A76B] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#C6A76B] block uppercase font-mono">Private Inquiries</span>
                    <span className="text-white font-medium">concierge@benchmarkhotel.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C6A76B]/20 text-[11px] text-[#F6F1E7]/70">
              * Dedicated encrypted communications available for heads of state & sovereign delegations.
            </div>
          </div>

          {/* Right Column: Direct Request Form */}
          <div className="lg:col-span-7 p-8 md:p-10 bg-[#14332c] flex flex-col justify-center">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#193B32] border border-[#C6A76B]/50 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-[#C6A76B] mx-auto animate-bounce" />
                <h4 className="text-xl font-bold font-serif-luxury text-white">
                  Message Delivered to Royal Concierge
                </h4>
                <p className="text-xs text-[#F6F1E7]/80 max-w-sm mx-auto">
                  A personal concierge officer will review your request and connect with you within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Vivienne Montgomery"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5">
                      VIP Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. v.montgomery@sovereign.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 789-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B] cursor-pointer"
                    >
                      <option value="Concierge & Suite Inquiries">Concierge & Suite Inquiries</option>
                      <option value="Private Helicopter / Yacht Charter">Private Helicopter / Yacht Charter</option>
                      <option value="Michelin Private Dining Booking">Michelin Private Dining Booking</option>
                      <option value="Corporate / Sovereign Delegation">Corporate / Sovereign Delegation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5">
                    Concierge Message & Specifications
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide details about dates, group size, special champagne or dietary preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B] resize-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="py-3 px-8 rounded-xl gold-gradient-btn font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit to Concierge</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

