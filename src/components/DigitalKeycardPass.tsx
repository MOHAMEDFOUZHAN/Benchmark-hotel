import React, { useState, useRef } from 'react';
import { Booking } from '../types/hotel';
import { 
  Wifi, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  Smartphone, 
  Shield,
  QrCode
} from 'lucide-react';

interface DigitalKeycardPassProps {
  booking: Booking;
  onClose?: () => void;
}

export const DigitalKeycardPass: React.FC<DigitalKeycardPassProps> = ({ booking }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isNfcActive, setIsNfcActive] = useState(false);
  const [copiedWifi, setCopiedWifi] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleSimulateUnlock = () => {
    setIsNfcActive(true);
    setTimeout(() => {
      setIsNfcActive(false);
    }, 2200);
  };

  const copyWifi = () => {
    navigator.clipboard?.writeText('BMH_Guest_2026!');
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full select-none">
      <div 
        className="w-full perspective-1000 py-3"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y + (isFlipped ? 180 : 0)}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          className="relative w-full aspect-[1.586/1] rounded-lg cursor-pointer shadow-[0_12px_40px_rgba(41,36,31,0.18)] transition-all duration-300"
        >
          {/* FRONT OF KEYCARD — BESPOKE ESPRESSO & BRONZE */}
          <div 
            style={{ backfaceVisibility: 'hidden' }}
            className={`absolute inset-0 rounded-lg p-7 bg-[#29241F] border border-[#A77D4B]/40 flex flex-col justify-between overflow-hidden ${
              isFlipped ? 'pointer-events-none' : ''
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm tracking-[0.25em] uppercase text-[#F7F4EE] font-serif-luxury block">
                  BENCHMARK
                </span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#A77D4B] font-mono">
                  RESIDENTIAL PASS
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#A77D4B]/40 bg-[#302820]">
                <span className={`w-1.5 h-1.5 rounded-full ${isNfcActive ? 'bg-[#A77D4B] animate-ping' : 'bg-[#A77D4B]'}`} />
                <span className="text-[9px] font-mono text-[#E7DED0]">NFC KEYLESS</span>
              </div>
            </div>

            {/* Middle: Room Number */}
            <div className="my-auto">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#777066] font-mono block">
                Suite Number
              </span>
              <span className="text-4xl font-normal tracking-wide text-[#F7F4EE] font-serif-luxury">
                {booking.roomNumberAssigned || 'PH-4501'}
              </span>
              <p className="text-xs text-[#E7DED0] font-light mt-0.5">
                {booking.roomName}
              </p>
            </div>

            {/* Bottom: Guest Name, Code & Dates */}
            <div className="flex items-end justify-between pt-3 border-t border-[#A77D4B]/20 text-[10px]">
              <div>
                <span className="text-[8px] uppercase tracking-wider text-[#777066] block font-mono">Guest</span>
                <span className="text-xs text-[#F7F4EE] font-medium">{booking.guestName}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] uppercase tracking-wider text-[#777066] block font-mono">Ref</span>
                <span className="font-mono text-[#A77D4B]">{booking.bookingCode}</span>
              </div>
            </div>
          </div>

          {/* BACK OF KEYCARD */}
          <div 
            style={{ 
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
            className={`absolute inset-0 rounded-lg p-7 bg-[#302820] border border-[#A77D4B]/40 flex flex-col justify-between overflow-hidden ${
              !isFlipped ? 'pointer-events-none' : ''
            }`}
          >
            <div className="flex items-center justify-between text-[9px] font-mono text-[#777066] uppercase tracking-wider pb-2 border-b border-[#A77D4B]/20">
              <span>Benchmark Keyless Protocol</span>
              <span>Pass ID: {booking.digitalKeycardId}</span>
            </div>

            {/* Middle QR Code & Wi-Fi Details */}
            <div className="flex items-center justify-between gap-5 my-auto">
              <div className="bg-white p-2.5 rounded shadow shrink-0 flex flex-col items-center">
                <QrCode className="w-14 h-14 text-[#29241F]" />
                <span className="text-[7px] font-mono text-[#777066] mt-1">TOUCH SCANNER</span>
              </div>

              <div className="flex-1 space-y-2 text-xs">
                <div className="p-2.5 rounded bg-[#29241F] border border-[#A77D4B]/20">
                  <div className="flex items-center justify-between text-[9px] text-[#A77D4B] mb-0.5">
                    <span className="flex items-center gap-1 font-mono">
                      <Wifi className="w-3 h-3" />
                      Guest Wi-Fi 7
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyWifi();
                      }}
                      className="text-[#E7DED0] hover:text-white"
                    >
                      {copiedWifi ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="text-[10px] font-mono text-[#F7F4EE]">
                    BMH_Suite_Private
                  </div>
                </div>

                <div className="text-[9px] text-[#777066] leading-tight">
                  Concierge Dial: 0 from in-room telephone.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#A77D4B]/20 text-[9px] text-[#777066]">
              <span>Authorized Resident</span>
              <span className="text-[#A77D4B] flex items-center gap-1">
                <Shield className="w-3 h-3" /> Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2 text-[11px] text-[#777066]">
        <RotateCcw className="w-3 h-3 text-[#A77D4B]" />
        <span>Click card to flip face</span>
      </div>

      <div className="w-full grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={handleSimulateUnlock}
          className={`py-3 px-4 rounded text-xs tracking-wider uppercase transition-all border ${
            isNfcActive 
              ? 'bg-[#A77D4B] text-white border-[#A77D4B]' 
              : 'bg-white hover:bg-[#E7DED0]/50 text-[#29241F] border-[#E7DED0]'
          }`}
        >
          {isNfcActive ? (
            <span className="flex items-center justify-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Door Unlocked
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5 font-medium">
              <Smartphone className="w-3.5 h-3.5 text-[#A77D4B]" /> Tap NFC Door Key
            </span>
          )}
        </button>

        <button
          onClick={() => window.print()}
          className="btn-outline-espresso text-center"
        >
          Print Stay Pass
        </button>
      </div>
    </div>
  );
};
