import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Room, BookingAddOn, PaymentMethod } from '../types/hotel';
import { LUXURY_ADD_ONS } from '../data/mockData';
import { useHotel } from '../context/HotelContext';
import { formatINR } from '../utils/formatters';
import { DigitalKeycardPass } from './DigitalKeycardPass';
import {
  X,
  Calendar,
  Users,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
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

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [checkIn, setCheckIn] = useState(searchFilter.checkIn);
  const [checkOut, setCheckOut] = useState(searchFilter.checkOut);
  const [adults, setAdults] = useState(searchFilter.adults || 2);
  const [children, setChildren] = useState(searchFilter.children || 0);

  const [selectedAddOns, setSelectedAddOns] = useState<BookingAddOn[]>([
    LUXURY_ADD_ONS[1]
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

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A77D4B', '#29241F', '#E7DED0', '#F7F4EE']
        });
      } catch {
        // ignore
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#29241F]/80 backdrop-blur-sm overflow-y-auto animate-fadeIn text-[#29241F]">
      <div className="relative w-full max-w-4xl bg-white border border-[#E7DED0] rounded-lg overflow-hidden shadow-2xl my-auto">
        {/* Modal Header */}
        <div className="p-6 md:p-8 bg-[#F7F4EE] border-b border-[#E7DED0] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A77D4B] block">
              Reservation Procedure • Step 0{step} of 04
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-serif-luxury text-[#29241F] mt-1">
              {step === 4 ? 'Reservation Confirmed' : `Reserve ${room.name}`}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-2 rounded bg-white hover:bg-[#E7DED0]/50 text-[#29241F] border border-[#E7DED0] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 border-b border-[#E7DED0] text-[11px] font-medium text-center bg-[#F7F4EE]/50">
          <div className={`py-3 border-b-2 transition-all ${step >= 1 ? 'border-[#29241F] text-[#29241F] font-semibold' : 'border-transparent text-[#777066]'}`}>
            01. Dates & Add-ons
          </div>
          <div className={`py-3 border-b-2 transition-all ${step >= 2 ? 'border-[#29241F] text-[#29241F] font-semibold' : 'border-transparent text-[#777066]'}`}>
            02. Guest Details
          </div>
          <div className={`py-3 border-b-2 transition-all ${step >= 3 ? 'border-[#29241F] text-[#29241F] font-semibold' : 'border-transparent text-[#777066]'}`}>
            03. Payment Method
          </div>
          <div className={`py-3 border-b-2 transition-all ${step === 4 ? 'border-[#29241F] text-[#29241F] font-semibold' : 'border-transparent text-[#777066]'}`}>
            04. Keycard & Pass
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {/* STEP 1: DATES & ADD-ONS */}
          {step === 1 && (
            <form onSubmit={handleNextStep1} className="space-y-6">
              {/* Room Snapshot */}
              <div className="flex flex-col sm:flex-row gap-5 p-4 rounded border border-[#E7DED0] bg-[#F7F4EE]/40 items-center">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full sm:w-36 h-24 object-cover rounded border border-[#E7DED0] shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A77D4B] font-semibold">{room.category} • {room.floor}</span>
                  <h3 className="text-xl font-normal text-[#29241F] font-serif-luxury">{room.name}</h3>
                  <p className="text-xs text-[#777066] mt-0.5">{room.view} • {room.sizeSqFt} sq ft</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-normal font-serif-luxury text-[#29241F]">{formatINR(room.pricePerNight)}</span>
                  <span className="text-xs text-[#777066]"> / night</span>
                </div>
              </div>

              {/* Date & Guest Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1">
                    Check-In
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    className="w-full bg-transparent text-[#29241F] text-xs font-medium focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    className="w-full bg-transparent text-[#29241F] text-xs font-medium focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-transparent text-[#29241F] text-xs font-medium focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30">
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1">
                    Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-transparent text-[#29241F] text-xs font-medium focus:outline-none cursor-pointer"
                  >
                    {[0, 1, 2, 3].map(num => (
                      <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bespoke Add-ons */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A77D4B] block mb-3">
                  Tailored Privileges & Services
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {LUXURY_ADD_ONS.map((addon) => {
                    const isSelected = selectedAddOns.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon)}
                        className={`p-4 rounded border cursor-pointer transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-[#E7DED0]/50 border-[#A77D4B]'
                            : 'bg-white border-[#E7DED0] hover:border-[#A77D4B]/50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-sm mt-0.5 flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-[#29241F] border-[#29241F] text-white' : 'border-[#E7DED0] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[#29241F]">{addon.name}</span>
                            <span className="text-xs font-mono text-[#A77D4B]">+{formatINR(addon.price)}</span>
                          </div>
                          <p className="text-[11px] text-[#777066] mt-1 font-light leading-snug">{addon.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="p-5 rounded border border-[#E7DED0] bg-[#F7F4EE]/50 space-y-2 text-xs">
                <div className="flex justify-between text-[#777066]">
                  <span>Room rate ({nights} night{nights > 1 ? 's' : ''} × {formatINR(room.pricePerNight)})</span>
                  <span className="font-mono text-[#29241F]">{formatINR(roomSubtotal)}</span>
                </div>
                {addOnsSubtotal > 0 && (
                  <div className="flex justify-between text-[#777066]">
                    <span>Selected Add-ons</span>
                    <span className="font-mono text-[#29241F]">+{formatINR(addOnsSubtotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#777066] text-[11px]">
                  <span>Hospitality & Tourism Tax (12%)</span>
                  <span className="font-mono">{formatINR(taxesAndFees)}</span>
                </div>
                <div className="pt-3 border-t border-[#E7DED0] flex justify-between items-baseline">
                  <span className="text-sm uppercase tracking-wider text-[#29241F] font-medium">Total Rate</span>
                  <div className="text-right">
                    <span className="text-3xl font-normal font-serif-luxury text-[#29241F]">{formatINR(grandTotal)}</span>
                    <span className="text-[10px] text-[#777066] block">All taxes & resident privileges included</span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary-espresso flex items-center gap-2"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {step === 2 && (
            <form onSubmit={handleNextStep2} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. a.vance@benchmark-luxury.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 392-8812"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                    Guest Allocation Tier
                  </label>
                  <div className="px-4 py-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#A77D4B] text-xs flex items-center justify-between font-medium">
                    <span>Sovereign Resident</span>
                    <span className="text-[10px] text-[#777066]">Complimentary</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#777066] mb-1.5">
                  Special Notes & Concierge Inquiries
                </label>
                <textarea
                  rows={3}
                  placeholder="Estimated arrival time, dietary considerations, preferred room temperature..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-4 py-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F] resize-none"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline-espresso"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary-espresso flex items-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#E7DED0]/50 border-[#29241F]'
                      : 'bg-white border-[#E7DED0] hover:border-[#777066]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-2 text-[#29241F]" />
                  <div className="text-xs font-medium text-[#29241F]">Credit Card</div>
                  <div className="text-[10px] text-[#777066] mt-0.5">Amex, Visa, Mastercard</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded border text-left transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-[#E7DED0]/50 border-[#29241F]'
                      : 'bg-white border-[#E7DED0] hover:border-[#777066]'
                  }`}
                >
                  <QrCode className="w-5 h-5 mb-2 text-[#29241F]" />
                  <div className="text-xs font-medium text-[#29241F]">Instant Transfer</div>
                  <div className="text-[10px] text-[#777066] mt-0.5">UPI / Apple Pay</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pay_at_hotel')}
                  className={`p-4 rounded border text-left transition-all ${
                    paymentMethod === 'pay_at_hotel'
                      ? 'bg-[#E7DED0]/50 border-[#29241F]'
                      : 'bg-white border-[#E7DED0] hover:border-[#777066]'
                  }`}
                >
                  <Building className="w-5 h-5 mb-2 text-[#29241F]" />
                  <div className="text-xs font-medium text-[#29241F]">Pay on Arrival</div>
                  <div className="text-[10px] text-[#777066] mt-0.5">Zero charge today</div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-5 rounded border border-[#E7DED0] bg-[#F7F4EE]/40 space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#777066] mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardHolder || guestName}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E7DED0] bg-white text-[#29241F] text-xs focus:outline-none focus:border-[#29241F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#777066] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E7DED0] bg-white text-[#29241F] text-xs focus:outline-none focus:border-[#29241F] font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#777066] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E7DED0] bg-white text-[#29241F] text-xs focus:outline-none focus:border-[#29241F] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#777066] mb-1">
                        CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded border border-[#E7DED0] bg-white text-[#29241F] text-xs focus:outline-none focus:border-[#29241F] font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-6 rounded border border-[#E7DED0] bg-[#F7F4EE]/40 text-center space-y-3">
                  <div className="inline-block p-3 rounded bg-white shadow-sm border border-[#E7DED0]">
                    <QrCode className="w-24 h-24 text-[#29241F]" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#29241F] block">Scan with banking or UPI app</span>
                    <span className="text-[11px] font-mono text-[#A77D4B]">benchmark@luxuryicici</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'pay_at_hotel' && (
                <div className="p-5 rounded border border-[#E7DED0] bg-[#F7F4EE]/40 text-xs text-[#29241F] space-y-2">
                  <div className="flex items-center gap-2 text-[#A77D4B] font-medium text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reserve Now, Settle Upon Check-In</span>
                  </div>
                  <p className="leading-relaxed text-[#777066] font-light">
                    Your suite is fully guaranteed. No charge will be placed today. Settle upon arrival at reception.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between p-4 rounded border border-[#E7DED0] bg-[#F7F4EE]/50">
                <div className="flex items-center gap-2 text-xs text-[#777066]">
                  <Lock className="w-3.5 h-3.5 text-[#A77D4B]" />
                  <span>256-bit Encrypted Reservation</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#777066] block">Total:</span>
                  <span className="text-2xl font-normal font-serif-luxury text-[#29241F]">{formatINR(grandTotal)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-outline-espresso"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-espresso disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming...' : 'Complete Reservation'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION & KEYCARD */}
          {step === 4 && (confirmedBookingData || latestConfirmedBooking) && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="max-w-md mx-auto space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A77D4B] font-semibold block font-sans">
                  Confirmed Residence
                </span>
                <h3 className="text-3xl font-normal font-serif-luxury text-[#29241F]">
                  We look forward to your stay.
                </h3>
                <p className="text-xs text-[#777066] font-light">
                  A reservation package has been dispatched to {guestEmail}. Below is your digital mobile room pass.
                </p>
              </div>

              <DigitalKeycardPass booking={confirmedBookingData || latestConfirmedBooking!} />

              <div className="flex items-center justify-center gap-4 pt-6 border-t border-[#E7DED0]">
                <button
                  onClick={onClose}
                  className="btn-outline-espresso"
                >
                  Return to Home
                </button>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentView('admin');
                  }}
                  className="btn-bronze"
                >
                  View in Admin Portal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
