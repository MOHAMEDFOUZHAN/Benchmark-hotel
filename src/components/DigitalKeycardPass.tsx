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
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  // 3D Parallax Tilt Effect on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    setRotation({ x: rotateX, y: rotateY });
    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.65,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setShine({ x: 50, y: 50, opacity: 0 });
  };

  const handleSimulateUnlock = () => {
    setIsNfcActive(true);
    setTimeout(() => {
      setIsNfcActive(false);
    }, 2500);
  };

  const copyWifi = () => {
    navigator.clipboard?.writeText('BMH_Guest_Luxe_2026!');
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full select-none">
      {/* Interactive 3D Perspective Card Wrapper */}
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
          className="relative w-full aspect-[1.586/1] rounded-3xl cursor-pointer shadow-2xl transition-all duration-300"
        >
          {/* Holographic dynamic shine overlay */}
          <div
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(246,241,231,0.35) 0%, rgba(198,167,107,0.3) 35%, transparent 70%)`,
              opacity: shine.opacity,
            }}
            className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-300 mix-blend-overlay"
          />

          {/* FRONT OF KEYCARD */}
          <div 
            style={{ backfaceVisibility: 'hidden' }}
            className={`absolute inset-0 rounded-3xl p-6 bg-gradient-to-br from-[#193B32] via-[#102A26] to-[#0b1d1a] border border-[#C6A76B]/60 flex flex-col justify-between overflow-hidden shadow-2xl ${
              isFlipped ? 'pointer-events-none' : ''
            }`}
          >
            {/* Background geometric watermark */}
            <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full border border-[#C6A76B]/15 pointer-events-none" />
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full border border-[#C6A76B]/20 pointer-events-none" />
            
            {/* Top row */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#A38244] via-[#C6A76B] to-[#F6F1E7] flex items-center justify-center shadow-lg text-[#102A26] font-black text-sm">
                  👑
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-[0.2em] uppercase text-[#F6F1E7] font-heading">
                    BENCHMARK
                  </h4>
                  <span className="text-[9px] tracking-widest text-[#C6A76B] uppercase block font-mono font-bold">
                    VIP Digital Keycard
                  </span>
                </div>
              </div>

              {/* Glowing NFC Indicator */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#102A26]/90 border border-[#C6A76B]/40">
                <span className={`w-2 h-2 rounded-full ${isNfcActive ? 'bg-[#C6A76B] animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-[10px] font-mono text-[#F6F1E7]">NFC Active</span>
              </div>
            </div>

            {/* Middle: Room Number & NFC Chip Graphic */}
            <div className="flex items-center justify-between z-10 my-auto">
              <div>
                <span className="text-[10px] text-[#C6A76B] uppercase tracking-widest block font-mono font-semibold">
                  Assigned Suite
                </span>
                <span className="text-3xl font-extrabold tracking-tight gold-gradient-text font-serif-luxury">
                  {booking.roomNumberAssigned || 'PH-4501'}
                </span>
                <p className="text-xs text-[#F6F1E7] font-medium truncate max-w-[210px] mt-0.5">
                  {booking.roomName}
                </p>
              </div>

              {/* Gold Chip Artwork */}
              <div className="w-12 h-10 rounded-lg bg-gradient-to-br from-[#DFCA9B] via-[#C6A76B] to-[#A38244] p-1 shadow-md border border-[#F6F1E7]/40 flex flex-col justify-between">
                <div className="flex justify-between h-2">
                  <div className="w-2 border-b border-[#102A26]/50" />
                  <div className="w-2 border-b border-[#102A26]/50" />
                </div>
                <div className="w-full border-t border-b border-[#102A26]/40 h-2" />
                <div className="flex justify-between h-2">
                  <div className="w-2 border-t border-[#102A26]/50" />
                  <div className="w-2 border-t border-[#102A26]/50" />
                </div>
              </div>
            </div>

            {/* Bottom: Guest Name, Code & Dates */}
            <div className="flex items-end justify-between z-10 pt-2 border-t border-[#C6A76B]/25">
              <div>
                <span className="text-[9px] text-[#C6A76B] uppercase tracking-wider block font-mono">Privileged Guest</span>
                <span className="text-xs font-bold text-[#F6F1E7] tracking-wide">{booking.guestName}</span>
              </div>
              <div className="text-center">
                <span className="text-[9px] text-[#C6A76B] uppercase tracking-wider block font-mono">Duration</span>
                <span className="text-[11px] font-semibold text-[#F6F1E7] font-mono">
                  {booking.checkInDate.slice(5)} → {booking.checkOutDate.slice(5)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-[#C6A76B] uppercase tracking-wider block font-mono">Booking Ref</span>
                <span className="text-xs font-mono font-bold text-[#C6A76B]">{booking.bookingCode}</span>
              </div>
            </div>
          </div>

          {/* BACK OF KEYCARD */}
          <div 
            style={{ 
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
            className={`absolute inset-0 rounded-3xl p-6 bg-gradient-to-br from-[#102A26] via-[#193B32] to-[#0c1f1c] border border-[#C6A76B]/50 flex flex-col justify-between overflow-hidden shadow-2xl ${
              !isFlipped ? 'pointer-events-none' : ''
            }`}
          >
            {/* Magnetic Stripe Graphic at top */}
            <div className="w-[calc(100%+3rem)] -mx-6 h-9 bg-[#0b1d1a] border-y border-[#C6A76B]/30 flex items-center justify-end px-6">
              <span className="text-[9px] font-mono text-[#C6A76B]">BENCHMARK ENCRYPTED NFC PROTOCOL</span>
            </div>

            {/* Middle QR Code & Wi-Fi Details */}
            <div className="flex items-center justify-between gap-4 my-auto">
              {/* QR Code Canvas Representation */}
              <div className="bg-[#F6F1E7] p-2 rounded-xl shadow-lg shrink-0 flex flex-col items-center">
                <QrCode className="w-16 h-16 text-[#102A26]" />
                <span className="text-[8px] font-mono text-[#102A26] mt-0.5 font-bold">TAP AT DOOR</span>
              </div>

              {/* Suite Wi-Fi Credentials */}
              <div className="flex-1 space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-[#102A26] border border-[#C6A76B]/30">
                  <div className="flex items-center justify-between text-[10px] text-[#C6A76B] mb-0.5">
                    <span className="flex items-center gap-1 font-mono">
                      <Wifi className="w-3 h-3 text-[#C6A76B]" />
                      Ultra Wi-Fi 7 (1 Gbps)
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyWifi();
                      }}
                      className="text-[#C6A76B] hover:text-[#DFCA9B] font-semibold"
                    >
                      {copiedWifi ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="text-[11px] font-mono text-white font-semibold truncate">
                    Network: BMH_Suite_Private
                  </div>
                  <div className="text-[10px] font-mono text-[#DFCA9B]">
                    Pass: BMH_Guest_Luxe_2026!
                  </div>
                </div>

                <div className="text-[10px] text-[#F6F1E7]/70 leading-tight">
                  <span className="text-[#C6A76B] font-semibold">24/7 Royal Concierge:</span> Dial 0 from suite phone.
                </div>
              </div>
            </div>

            {/* Bottom Bar: Access Privileges */}
            <div className="flex items-center justify-between pt-2 border-t border-[#C6A76B]/25 text-[10px] text-[#F6F1E7]/70 font-mono">
              <span>Card ID: {booking.digitalKeycardId}</span>
              <span className="text-[#C6A76B] font-semibold flex items-center gap-1">
                <Shield className="w-3 h-3" /> Fully Authorized
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Instruction Hint */}
      <div className="flex items-center gap-2 mt-2 text-xs text-[#F6F1E7]/70">
        <RotateCcw className="w-3.5 h-3.5 text-[#C6A76B] animate-spin" style={{ animationDuration: '10s' }} />
        <span>Click card to flip • Tilt cursor for 3D holographic sheen</span>
      </div>

      {/* Action Buttons below keycard */}
      <div className="w-full grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={handleSimulateUnlock}
          className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border transition-all ${
            isNfcActive 
              ? 'bg-[#C6A76B] text-[#102A26] border-[#C6A76B] shadow-lg' 
              : 'bg-[#193B32] hover:bg-[#1f473c] text-[#F6F1E7] border-[#C6A76B]/40 hover:border-[#C6A76B]'
          }`}
        >
          {isNfcActive ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#102A26] animate-bounce" />
              <span>Door Unlocked!</span>
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4 text-[#C6A76B]" />
              <span>Tap NFC Door Key</span>
            </>
          )}
        </button>

        <button
          onClick={() => window.print()}
          className="py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 bg-[#C6A76B]/20 hover:bg-[#C6A76B]/30 text-[#C6A76B] border border-[#C6A76B]/50 transition-all shadow-md"
        >
          <Download className="w-4 h-4 text-[#C6A76B]" />
          <span>Save / Print Pass</span>
        </button>
      </div>
    </div>
  );
};
