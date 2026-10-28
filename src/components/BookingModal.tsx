import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Room, BookingAddOn, PaymentMethod } from '../types/hotel';
import { LUXURY_ADD_ONS } from '../data/mockData';
import { useHotel } from '../context/HotelContext';
import { DigitalKeycardPass } from './DigitalKeycardPass';
import {
  X,
  Calendar,
  Users,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  Check
} from 'lucide-react';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ room, onClose }) => {
  const { searchFilter, createBooking, latestConfirmedBooking, setCurrentView } = useHotel();

  // Wizard Steps: 1: Dates & Add-ons | 2: Guest Details | 3: Payment | 4: Confirmation & Keycard
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [checkIn, setCheckIn] = useState(searchFilter.checkIn);
  const [checkOut, setCheckOut] = useState(searchFilter.checkOut);
  const [adults, setAdults] = useState(searchFilter.adults || 2);
  const [children, setChildren] = useState(searchFilter.children || 0);

  const [selectedAddOns, setSelectedAddOns] = useState<BookingAddOn[]>([
    LUXURY_ADD_ONS[1] // Default include champagne welcome
  ]);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<any>(null);

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays || 1);
  };

  const nights = calculateNights();
  const roomSubtotal = room.pricePerNight * nights;
  const addOnsSubtotal = selectedAddOns.reduce((acc, item) => acc + item.price, 0);
  const taxesAndFees = Math.round((roomSubtotal + addOnsSubtotal) * 0.10);
  const grandTotal = roomSubtotal + addOnsSubtotal + taxesAndFees;

  const toggleAddOn = (addon: BookingAddOn) => {
    if (selectedAddOns.some(a => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      alert('Please fill in your name and email address to proceed.');
      return;
    }
    setStep(3);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = createBooking({
        room,
        guestName,
        guestEmail,
        guestPhone: guestPhone || '+1 (555) 839-2041',
        checkIn,
        checkOut,
        nights,
        guests: { adults, children },
        selectedAddOns,
        paymentMethod,
        specialRequests,
      });

      setConfirmedBookingData(created);
      setIsSubmitting(false);
      setStep(4);

      // Launch Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C6A76B', '#DFCA9B', '#193B32', '#102A26', '#F6F1E7']
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#102A26] border border-[#C6A76B]/40 rounded-3xl overflow-hidden shadow-2xl my-auto text-[#F6F1E7]">
        {/* Modal Header */}
        <div className="p-5 md:p-6 bg-gradient-to-r from-[#193B32] to-[#102A26] border-b border-[#C6A76B]/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#102A26] border border-[#C6A76B]/50 flex items-center justify-center text-[#C6A76B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C6A76B] font-mono">
                  Benchmark Signature Reservation
                </span>
                <span className="text-[10px] bg-[#102A26] text-[#F6F1E7] px-2 py-0.5 rounded-full border border-[#C6A76B]/30 font-mono">
                  Step {step} of 4
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-serif-luxury text-white">
                {step === 4 ? 'Reservation Confirmed & Keycard Issued' : `Reserve ${room.name}`}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-2.5 rounded-full bg-[#193B32] hover:bg-[#1f473c] text-[#F6F1E7] border border-[#C6A76B]/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 border-b border-[#C6A76B]/25 text-[11px] font-medium text-center bg-[#102A26]/80">
          <div className={`py-2.5 border-b-2 transition-all ${step >= 1 ? 'border-[#C6A76B] text-[#C6A76B] font-bold' : 'border-transparent text-[#F6F1E7]/50'}`}>
            1. Dates & Add-ons
          </div>
          <div className={`py-2.5 border-b-2 transition-all ${step >= 2 ? 'border-[#C6A76B] text-[#C6A76B] font-bold' : 'border-transparent text-[#F6F1E7]/50'}`}>
            2. Guest Details
          </div>
          <div className={`py-2.5 border-b-2 transition-all ${step >= 3 ? 'border-[#C6A76B] text-[#C6A76B] font-bold' : 'border-transparent text-[#F6F1E7]/50'}`}>
            3. Payment Guarantee
          </div>
          <div className={`py-2.5 border-b-2 transition-all ${step === 4 ? 'border-[#C6A76B] text-[#C6A76B] font-bold' : 'border-transparent text-[#F6F1E7]/50'}`}>
            4. 3D Keycard & Pass
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-8">
          {/* STEP 1: DATES & ADD-ONS */}
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-6">
              {/* Room Snapshot Card */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#193B32] border border-[#C6A76B]/30 items-center">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full sm:w-36 h-24 object-cover rounded-xl border border-[#C6A76B]/30 shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#C6A76B] font-semibold font-mono">{room.category} Class • {room.floor}</span>
                  <h3 className="text-lg font-bold text-white font-serif-luxury">{room.name}</h3>
                  <p className="text-xs text-[#F6F1E7]/70 mt-0.5">{room.view} • {room.sizeSqFt} sq ft • {room.bedType}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-black text-[#C6A76B] font-mono">${room.pricePerNight}</span>
                  <span className="text-xs text-[#F6F1E7]/70"> / night</span>
                </div>
              </div>

              {/* Date & Guest Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> Check-In
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> Check-Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 flex items-center gap-1 font-mono">
                    <Users className="w-3.5 h-3.5" /> Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num} className="bg-[#102A26]">{num} Adult{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 flex items-center gap-1 font-mono">
                    <Users className="w-3.5 h-3.5" /> Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B] cursor-pointer"
                  >
                    {[0, 1, 2, 3].map(num => (
                      <option key={num} value={num} className="bg-[#102A26]">{num} Child{num !== 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bespoke Add-ons */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C6A76B] mb-3 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-4 h-4" /> Enhance Your Stay (Bespoke Add-Ons)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {LUXURY_ADD_ONS.map((addon) => {
                    const isSelected = selectedAddOns.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#193B32] border-[#C6A76B] shadow-lg'
                            : 'bg-[#102A26] border-[#C6A76B]/25 hover:border-[#C6A76B]/60'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-[#C6A76B] border-[#C6A76B] text-[#102A26]' : 'border-[#C6A76B]/40 bg-[#193B32]'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 font-bold" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{addon.name}</span>
                            <span className="text-xs font-bold text-[#C6A76B] font-mono">+${addon.price}</span>
                          </div>
                          <p className="text-[11px] text-[#F6F1E7]/70 mt-1 leading-snug">{addon.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pricing Breakdown Card */}
              <div className="p-4 rounded-2xl bg-[#193B32] border border-[#C6A76B]/30 space-y-2 text-xs">
                <div className="flex justify-between text-[#F6F1E7]/80">
                  <span>Room rate ({nights} night{nights > 1 ? 's' : ''} × ${room.pricePerNight})</span>
                  <span className="font-semibold text-white font-mono">${roomSubtotal.toLocaleString()}</span>
                </div>
                {addOnsSubtotal > 0 && (
                  <div className="flex justify-between text-[#F6F1E7]/80">
                    <span>Selected Luxury Add-Ons</span>
                    <span className="font-semibold text-white font-mono">+${addOnsSubtotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#F6F1E7]/60 text-[11px]">
                  <span>Resort Fees & Luxury Hospitality Tax (10%)</span>
                  <span className="font-mono">${taxesAndFees.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-[#C6A76B]/25 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Total Investment</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#C6A76B] font-mono">${grandTotal.toLocaleString()}</span>
                    <span className="text-[10px] text-[#F6F1E7]/70 block">Includes all privileges & taxes</span>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-3.5 px-8 rounded-xl gold-gradient-btn font-bold text-sm tracking-wider uppercase flex items-center gap-2 group shadow-xl"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {step === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 font-mono">
                    Primary Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 font-mono">
                    VIP Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. a.vance@benchmark-luxury.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 font-mono">
                    Mobile Phone (For Keycard & Concierge SMS)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 392-8812"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 font-mono">
                    Benchmark Club Membership Status
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#C6A76B] text-sm flex items-center justify-between font-mono">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C6A76B]" /> Sovereign Sapphire VIP
                    </span>
                    <span className="text-[10px] text-[#F6F1E7]/70">Complimentary</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1.5 font-mono">
                  Bespoke Requests & Dietary / Concierge Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Preferred pillow firmness, late arrival timing, champagne preference, anniversary notes..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B] resize-none"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-5 rounded-xl border border-[#C6A76B]/40 text-[#F6F1E7] hover:border-[#C6A76B] text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Dates
                </button>
                <button
                  type="submit"
                  className="py-3.5 px-8 rounded-xl gold-gradient-btn font-bold text-sm tracking-wider uppercase flex items-center gap-2 group shadow-xl"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              {/* Payment Option Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'bg-[#193B32] border-[#C6A76B] shadow-lg'
                      : 'bg-[#102A26] border-[#C6A76B]/30 hover:border-[#C6A76B]/60'
                  }`}
                >
                  <CreditCard className={`w-6 h-6 mb-2 ${paymentMethod === 'card' ? 'text-[#C6A76B]' : 'text-[#F6F1E7]/50'}`} />
                  <div>
                    <div className="text-xs font-bold text-white">Credit / Black Card</div>
                    <div className="text-[10px] text-[#F6F1E7]/70 mt-0.5">Amex Centurion, Visa, MC</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'upi'
                      ? 'bg-[#193B32] border-[#C6A76B] shadow-lg'
                      : 'bg-[#102A26] border-[#C6A76B]/30 hover:border-[#C6A76B]/60'
                  }`}
                >
                  <QrCode className={`w-6 h-6 mb-2 ${paymentMethod === 'upi' ? 'text-[#C6A76B]' : 'text-[#F6F1E7]/50'}`} />
                  <div>
                    <div className="text-xs font-bold text-white">UPI / Instant Pay</div>
                    <div className="text-[10px] text-[#F6F1E7]/70 mt-0.5">Instant QR / Apple Pay</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pay_at_hotel')}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'pay_at_hotel'
                      ? 'bg-[#193B32] border-[#C6A76B] shadow-lg'
                      : 'bg-[#102A26] border-[#C6A76B]/30 hover:border-[#C6A76B]/60'
                  }`}
                >
                  <Building className={`w-6 h-6 mb-2 ${paymentMethod === 'pay_at_hotel' ? 'text-[#C6A76B]' : 'text-[#F6F1E7]/50'}`} />
                  <div>
                    <div className="text-xs font-bold text-white">Pay at Concierge</div>
                    <div className="text-[10px] text-[#F6F1E7]/70 mt-0.5">Zero payment today</div>
                  </div>
                </button>
              </div>

              {/* Payment Details Form */}
              {paymentMethod === 'card' && (
                <div className="p-5 rounded-2xl bg-[#193B32] border border-[#C6A76B]/30 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1 font-mono">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardHolder || guestName}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1 font-mono">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1 font-mono">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#C6A76B] mb-1 font-mono">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B] font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-6 rounded-2xl bg-[#193B32] border border-[#C6A76B]/30 text-center space-y-3">
                  <div className="inline-block p-3 rounded-2xl bg-[#F6F1E7] shadow-xl">
                    <QrCode className="w-28 h-28 text-[#102A26]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Scan to Authorize with any UPI App</span>
                    <span className="text-[11px] font-mono text-[#C6A76B]">benchmarkhotel@luxuryicici</span>
                  </div>
                  <p className="text-xs text-[#F6F1E7]/70 max-w-sm mx-auto">
                    Instant 256-bit encrypted transfer with instant authorization receipt.
                  </p>
                </div>
              )}

              {paymentMethod === 'pay_at_hotel' && (
                <div className="p-5 rounded-2xl bg-[#193B32] border border-[#C6A76B]/40 text-xs text-[#F6F1E7] space-y-2">
                  <div className="flex items-center gap-2 text-[#C6A76B] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Reserve Now, Settle Upon Arrival</span>
                  </div>
                  <p className="leading-relaxed text-[#F6F1E7]/80">
                    Your suite will be held guaranteed. No deposit will be charged to your card today. You may pay using cash, credit card, or bank transfer during your personal check-in at the Executive Reception desk.
                  </p>
                </div>
              )}

              {/* Total & Confirmation Security Note */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-[#193B32] border border-[#C6A76B]/30 gap-3">
                <div className="flex items-center gap-2 text-xs text-[#F6F1E7]/70">
                  <Lock className="w-4 h-4 text-[#C6A76B]" />
                  <span>256-Bit Bank Grade SSL Encryption • Free Cancellation</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#F6F1E7]/70 block font-mono">Total Due:</span>
                  <span className="text-2xl font-black text-[#C6A76B] font-mono">${grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-5 rounded-xl border border-[#C6A76B]/40 text-[#F6F1E7] hover:border-[#C6A76B] text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Details
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3.5 px-8 rounded-xl gold-gradient-btn font-bold text-sm tracking-wider uppercase flex items-center gap-2 group shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Reservation...</span>
                  ) : (
                    <>
                      <span>Complete VIP Booking</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION & 3D KEYCARD */}
          {step === 4 && (confirmedBookingData || latestConfirmedBooking) && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="max-w-md mx-auto space-y-2">
                <div className="w-14 h-14 rounded-full bg-[#193B32] border border-[#C6A76B]/60 text-[#C6A76B] mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-serif-luxury text-white">
                  Welcome to The Benchmark Experience
                </h3>
                <p className="text-xs text-[#F6F1E7]/80 leading-relaxed">
                  Your reservation is confirmed. Your personalized 3D Digital Keycard is ready. We have dispatched a confirmation package to <span className="text-[#C6A76B] font-semibold">{guestEmail}</span>.
                </p>
              </div>

              {/* Render 3D Digital Keycard */}
              <DigitalKeycardPass booking={confirmedBookingData || latestConfirmedBooking!} />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#C6A76B]/25">
                <button
                  onClick={onClose}
                  className="py-3 px-6 rounded-xl bg-[#193B32] hover:bg-[#1f473c] text-white text-xs font-semibold tracking-wider uppercase transition-all border border-[#C6A76B]/30"
                >
                  Return to Main Sanctuary
                </button>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentView('admin');
                  }}
                  className="py-3 px-6 rounded-xl bg-[#C6A76B]/20 hover:bg-[#C6A76B]/30 text-[#C6A76B] border border-[#C6A76B]/60 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>View in Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
