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
  Compass
} from 'lucide-react';

export const LocationAndContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Suite Inquiries',
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
        inquiryType: 'Suite Inquiries',
        message: ''
      });
    }, 4000);
  };

  const transitOptions = [
    {
      icon: Plane,
      mode: 'Coimbatore Airport (CJB)',
      time: '2.5 Hours Mountain Chauffeur',
      detail: 'Scenic chauffeured climb through the Coonoor tea ghats in our private Rolls-Royce Ghost or 20-min VIP helicopter flight.'
    },
    {
      icon: Compass,
      mode: 'Charing Cross & Heritage Rail',
      time: '3 Minutes (0.4 km)',
      detail: 'Moments from Ooty landmark Charing Cross, the UNESCO heritage Nilgiri steam railway, and lush Government Botanical Garden.'
    },
    {
      icon: Anchor,
      mode: 'Highland Helipad (Deck 50)',
      time: '7,850 ft MSL Direct Touchdown',
      detail: 'Private rooftop aviation clearance with encrypted elevator descent directly into the presidential sky wing.'
    }
  ];

  return (
    <section id="location" className="py-24 px-6 md:px-12 bg-[#E7DED0]/40 text-[#29241F] border-t border-[#E7DED0]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#A77D4B] font-semibold block mb-2 font-sans">
            Highland Setting • Nilgiris
          </span>
          <h2 className="text-4xl md:text-6xl font-normal font-serif-luxury text-[#29241F]">
            Location & Inquiries
          </h2>
          <p className="text-xs md:text-sm text-[#777066] mt-3 font-light leading-relaxed">
            Positioned along the pristine ridges above Charing Cross, Benchmark balances secluded tea estate stillness with effortless access to Ooty's timeless heritage.
          </p>
        </div>

        {/* Transit Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {transitOptions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-lg bg-white border border-[#E7DED0] space-y-3 shadow-sm"
              >
                <div className="w-10 h-10 rounded bg-[#F7F4EE] border border-[#E7DED0] text-[#A77D4B] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-normal font-serif-luxury text-[#29241F]">
                  {item.mode}
                </h3>
                <div className="text-xs font-mono text-[#A77D4B] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {item.time}
                </div>
                <p className="text-xs text-[#777066] font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Form Panel */}
        <div className="rounded-lg bg-white border border-[#E7DED0] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-5 p-8 md:p-12 bg-[#F7F4EE] space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E7DED0]">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A77D4B] block">
                Direct Host Desk
              </span>
              <h3 className="text-3xl font-normal font-serif-luxury text-[#29241F]">
                Speak with our team.
              </h3>
              <p className="text-xs text-[#777066] font-light leading-relaxed">
                Whether arranging a vintage Nilgiri train coach, single-estate tea cellar tasting, or fireside dinner, our resident team is available throughout the year.
              </p>

              <div className="space-y-4 pt-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#A77D4B] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#777066] block uppercase font-mono">Address</span>
                    <span className="text-[#29241F] font-medium">Benchmark Ridge, Near Charing Cross, Ooty (Nilgiris) 643001, Tamil Nadu</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-[#A77D4B] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#777066] block uppercase font-mono">Telephone</span>
                    <span className="text-[#29241F] font-medium">+91 423 244 8800 / +91 98402 11990</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#A77D4B] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#777066] block uppercase font-mono">Inquiries</span>
                    <span className="text-[#29241F] font-medium">reservations@benchmarkooty.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7DED0] text-[11px] text-[#777066] font-light">
              Front desk operates 24 hours daily.
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#A77D4B] mx-auto" />
                <h4 className="text-2xl font-normal font-serif-luxury text-[#29241F]">
                  Inquiry Received
                </h4>
                <p className="text-xs text-[#777066] font-light max-w-sm mx-auto">
                  Our reservations host will reply directly to your email within one business hour.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Vivienne Montgomery"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. v.montgomery@sovereign.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 789-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                      Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F] cursor-pointer"
                    >
                      <option value="Suite Inquiries">Suite Inquiries</option>
                      <option value="Private Boat Charter">Private Boat Charter</option>
                      <option value="Dining Reservations">Dining Reservations</option>
                      <option value="Special Celebrations">Special Celebrations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Dates, suite preferences, or specific requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F] resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="btn-primary-espresso flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
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
