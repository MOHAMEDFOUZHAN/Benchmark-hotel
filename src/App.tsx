import React from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TowerExplorer } from './components/TowerExplorer';
import { RoomsShowcase } from './components/RoomsShowcase';
import { StayCurator } from './components/StayCurator';
import { InteractiveAmenities } from './components/InteractiveAmenities';
import { PrivilegesSection } from './components/PrivilegesSection';
import { LocationAndContact } from './components/LocationAndContact';
import { Footer } from './components/Footer';
import { Room3DViewer } from './components/Room3DViewer';
import { BookingModal } from './components/BookingModal';
import { ReservationLookupModal } from './components/ReservationLookupModal';
import { AdminPortal } from './components/AdminPortal';
import { SensorySoundscape } from './components/SensorySoundscape';

const HotelAppContent: React.FC = () => {
  const {
    currentView,
    selectedRoomFor3D,
    setSelectedRoomFor3D,
    selectedRoomForBooking,
    setSelectedRoomForBooking,
    isLookupModalOpen,
    setIsLookupModalOpen
  } = useHotel();

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#29241F] flex flex-col font-sans selection:bg-[#E7DED0] selection:text-[#29241F]">
      {/* Top Fixed Navbar */}
      <Navbar />

      {/* Main View: Guest Luxury Site or Admin Operations Portal */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          <div className="pt-20">
            <AdminPortal />
          </div>
        ) : (
          <div className="space-y-4">
            <HeroSection />
            <TowerExplorer />
            <RoomsShowcase />
            <StayCurator />
            <InteractiveAmenities />
            <PrivilegesSection />
            <LocationAndContact />
            <Footer />
          </div>
        )}
      </main>

      {/* Ambient Sensory Soundscape Floating Widget */}
      {currentView === 'guest' && <SensorySoundscape />}

      {/* 3D Virtual Room Explorer Modal */}
      {selectedRoomFor3D && (
        <Room3DViewer
          room={selectedRoomFor3D}
          onClose={() => setSelectedRoomFor3D(null)}
          onBookNow={(room) => {
            setSelectedRoomFor3D(null);
            setSelectedRoomForBooking(room);
          }}
        />
      )}

      {/* Customer Booking Flow Modal */}
      {selectedRoomForBooking && (
        <BookingModal
          room={selectedRoomForBooking}
          onClose={() => setSelectedRoomForBooking(null)}
        />
      )}

      {/* Reservation & Keycard Lookup Modal */}
      <ReservationLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <HotelProvider>
      <HotelAppContent />
    </HotelProvider>
  );
}

export default App;
