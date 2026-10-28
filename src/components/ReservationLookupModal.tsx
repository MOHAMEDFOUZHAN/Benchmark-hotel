import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Booking } from '../types/hotel';
import { DigitalKeycardPass } from './DigitalKeycardPass';
import {
  X,
  Search,
  Key,
  AlertCircle,
  Printer,
  XCircle,
  PhoneCall
} from 'lucide-react';

interface ReservationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationLookupModal: React.FC<ReservationLookupModalProps> = ({ isOpen, onClose }) => {
  const { lookupBooking, updateBookingStatus } = useHotel();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const booking = lookupBooking(query);
    setResult(booking || null);
    setHasSearched(true);
    setMessage(null);
  };

  const handleCancelStay = (bookingId: string) => {
    if (window.confirm('Are you sure you wish to cancel this luxury reservation? Free cancellation applies per hotel policy.')) {
      updateBookingStatus(bookingId, 'Cancelled');
      setMessage('Your reservation has been cancelled. Confirmation sent to your registered email.');
      const updated = lookupBooking(query);
      if (updated) setResult(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#102A26] border border-[#C6A76B]/40 rounded-3xl overflow-hidden shadow-2xl my-auto text-[#F6F1E7]">
        {/* Header */}
        <div className="p-5 md:p-6 bg-gradient-to-r from-[#193B32] to-[#102A26] border-b border-[#C6A76B]/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#102A26] border border-[#C6A76B]/50 flex items-center justify-center text-[#C6A76B]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6A76B] font-mono">
                Guest Services & Digital Key
              </span>
              <h2 className="text-xl font-bold font-serif-luxury text-white">
                Find My Reservation
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-[#193B32] hover:bg-[#1f473c] text-[#F6F1E7] border border-[#C6A76B]/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-8 space-y-6">
          {/* Search Bar Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#C6A76B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Booking Code (e.g. BMH-89410) or Email Address..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#193B32] border border-[#C6A76B]/40 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C6A76B] font-medium"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 rounded-xl gold-gradient-btn font-bold text-xs uppercase tracking-wider shrink-0"
            >
              Retrieve Stay
            </button>
          </form>

          {/* Quick Demo hint */}
          <div className="text-[11px] text-[#F6F1E7]/70 flex items-center gap-2">
            <span className="text-[#C6A76B] font-semibold font-mono">Demo Hint:</span>
            <span>Try code <code className="text-[#C6A76B] font-mono bg-[#193B32] px-1.5 py-0.5 rounded border border-[#C6A76B]/30">BMH-89410</code> or <code className="text-[#C6A76B] font-mono bg-[#193B32] px-1.5 py-0.5 rounded border border-[#C6A76B]/30">BMH-64291</code></span>
          </div>

          {message && (
            <div className="p-3 rounded-xl bg-[#193B32] border border-[#C6A76B]/50 text-xs text-[#C6A76B]">
              {message}
            </div>
          )}

          {/* RESULT FOUND */}
          {hasSearched && result && (
            <div className="space-y-6 border-t border-[#C6A76B]/25 pt-6 animate-fadeIn">
              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-[#193B32] border border-[#C6A76B]/30 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#C6A76B] block tracking-widest font-bold">
                      Reservation ID: {result.bookingCode}
                    </span>
                    <h3 className="text-xl font-bold font-serif-luxury text-white">
                      {result.roomName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono ${
                      result.bookingStatus === 'Confirmed'
                        ? 'bg-[#102A26] text-[#C6A76B] border border-[#C6A76B]/50'
                        : result.bookingStatus === 'Checked-In'
                        ? 'bg-[#102A26] text-sky-300 border border-sky-600'
                        : 'bg-[#102A26] text-rose-300 border border-rose-600'
                    }`}>
                      {result.bookingStatus}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono ${
                      result.paymentStatus === 'Paid'
                        ? 'bg-[#102A26] text-emerald-400 border border-emerald-600'
                        : 'bg-[#102A26] text-[#C6A76B] border border-[#C6A76B]/50'
                    }`}>
                      {result.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-[#C6A76B]/20">
                  <div>
                    <span className="text-[10px] text-[#C6A76B] uppercase block font-mono">Guest Name</span>
                    <span className="font-semibold text-white">{result.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#C6A76B] uppercase block font-mono">Check-In / Out</span>
                    <span className="font-semibold text-white">{result.checkInDate} → {result.checkOutDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#C6A76B] uppercase block font-mono">Assigned Suite</span>
                    <span className="font-semibold text-[#C6A76B] font-mono">{result.roomNumberAssigned || 'TBD at arrival'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#C6A76B] uppercase block font-mono">Total Rate</span>
                    <span className="font-bold text-[#C6A76B] font-mono text-sm">${result.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* 3D Digital Pass Render */}
              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-wider text-[#C6A76B] font-semibold mb-2 text-center font-mono">
                  Your Active Digital Mobile Keycard
                </h4>
                <DigitalKeycardPass booking={result} />
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#C6A76B]/25">
                <button
                  onClick={() => window.print()}
                  className="py-2.5 px-4 rounded-xl bg-[#193B32] hover:bg-[#1f473c] text-white text-xs font-semibold flex items-center gap-1.5 border border-[#C6A76B]/30"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C6A76B]" />
                  Print Folio Statement
                </button>

                {result.bookingStatus !== 'Cancelled' && (
                  <button
                    onClick={() => handleCancelStay(result.id)}
                    className="py-2.5 px-4 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-600/50 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          )}

          {/* NOT FOUND */}
          {hasSearched && !result && (
            <div className="p-8 rounded-2xl bg-[#193B32] border border-[#C6A76B]/30 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-[#C6A76B] mx-auto" />
              <h4 className="text-base font-bold text-white">No Reservation Found</h4>
              <p className="text-xs text-[#F6F1E7]/70 max-w-sm mx-auto leading-relaxed">
                We couldn't locate any stay under "{query}". Please verify the booking reference number in your confirmation email or speak with our concierge.
              </p>
              <div className="pt-2">
                <a
                  href="tel:+18005558888"
                  className="inline-flex items-center gap-1.5 text-xs text-[#C6A76B] hover:underline font-semibold"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call Concierge Desk: +1 (800) 555-BENCHMARK
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
