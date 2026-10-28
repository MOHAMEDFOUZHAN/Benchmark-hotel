import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { Booking } from '../types/hotel';
import { formatINR } from '../utils/formatters';
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
    if (window.confirm('Are you sure you wish to cancel this reservation?')) {
      updateBookingStatus(bookingId, 'Cancelled');
      setMessage('Your reservation has been cancelled.');
      const updated = lookupBooking(query);
      if (updated) setResult(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#29241F]/80 backdrop-blur-sm overflow-y-auto animate-fadeIn text-[#29241F]">
      <div className="relative w-full max-w-2xl bg-white border border-[#E7DED0] rounded-lg overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="p-6 md:p-8 bg-[#F7F4EE] border-b border-[#E7DED0] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A77D4B] block">
              Guest Services
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-serif-luxury text-[#29241F] mt-1">
              Find My Reservation
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded bg-white hover:bg-[#E7DED0]/50 text-[#29241F] border border-[#E7DED0] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#777066] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Booking Code (e.g. BMH-89410) or Email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-[#29241F] text-xs focus:outline-none focus:border-[#29241F]"
              />
            </div>
            <button
              type="submit"
              className="btn-primary-espresso shrink-0"
            >
              Retrieve Stay
            </button>
          </form>

          <div className="text-[11px] text-[#777066] flex items-center gap-2">
            <span className="text-[#A77D4B] font-mono font-medium">Demo Codes:</span>
            <span><code className="text-[#29241F] font-mono bg-[#E7DED0]/60 px-1.5 py-0.5 rounded">BMH-89410</code> or <code className="text-[#29241F] font-mono bg-[#E7DED0]/60 px-1.5 py-0.5 rounded">BMH-64291</code></span>
          </div>

          {message && (
            <div className="p-3 rounded border border-[#E7DED0] bg-[#F7F4EE] text-xs text-[#A77D4B]">
              {message}
            </div>
          )}

          {/* RESULT FOUND */}
          {hasSearched && result && (
            <div className="space-y-6 border-t border-[#E7DED0] pt-6 animate-fadeIn">
              <div className="p-5 rounded border border-[#E7DED0] bg-[#F7F4EE]/40 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#A77D4B] block tracking-wider">
                      Reference: {result.bookingCode}
                    </span>
                    <h3 className="text-xl font-normal font-serif-luxury text-[#29241F]">
                      {result.roomName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white border border-[#E7DED0] text-[#29241F]">
                      {result.bookingStatus}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white border border-[#E7DED0] text-[#A77D4B]">
                      {result.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-[#E7DED0]">
                  <div>
                    <span className="text-[10px] text-[#777066] uppercase block font-mono">Guest</span>
                    <span className="text-[#29241F] font-medium">{result.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777066] uppercase block font-mono">Dates</span>
                    <span className="text-[#29241F]">{result.checkInDate} → {result.checkOutDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777066] uppercase block font-mono">Suite</span>
                    <span className="text-[#A77D4B] font-mono">{result.roomNumberAssigned || 'TBD'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777066] uppercase block font-mono">Total Rate</span>
                    <span className="font-mono text-[#29241F] font-medium">{formatINR(result.totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Keycard Pass */}
              <div className="pt-2">
                <DigitalKeycardPass booking={result} />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E7DED0]">
                <button
                  onClick={() => window.print()}
                  className="btn-outline-espresso"
                >
                  Print Folio
                </button>

                {result.bookingStatus !== 'Cancelled' && (
                  <button
                    onClick={() => handleCancelStay(result.id)}
                    className="text-xs text-rose-700 hover:underline py-2 px-3"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          )}

          {/* NOT FOUND */}
          {hasSearched && !result && (
            <div className="p-8 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-[#A77D4B] mx-auto" />
              <h4 className="text-base font-normal font-serif-luxury text-[#29241F]">No record located</h4>
              <p className="text-xs text-[#777066] max-w-sm mx-auto font-light">
                We could not locate an active stay matching "{query}". Please check your booking reference or contact concierge desk.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
