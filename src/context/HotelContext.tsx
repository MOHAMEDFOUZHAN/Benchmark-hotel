import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, Booking, SearchFilterState, BookingStatus, PaymentStatus, BookingAddOn, PaymentMethod } from '../types/hotel';
import { INITIAL_ROOMS, INITIAL_BOOKINGS } from '../data/mockData';

interface HotelContextType {
  rooms: Room[];
  bookings: Booking[];
  searchFilter: SearchFilterState;
  setSearchFilter: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  selectedRoomFor3D: Room | null;
  setSelectedRoomFor3D: (room: Room | null) => void;
  selectedRoomForBooking: Room | null;
  setSelectedRoomForBooking: (room: Room | null) => void;
  isLookupModalOpen: boolean;
  setIsLookupModalOpen: (open: boolean) => void;
  currentView: 'guest' | 'admin';
  setCurrentView: (view: 'guest' | 'admin') => void;
  latestConfirmedBooking: Booking | null;
  setLatestConfirmedBooking: (booking: Booking | null) => void;
  createBooking: (bookingData: {
    room: Room;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: { adults: number; children: number };
    selectedAddOns: BookingAddOn[];
    paymentMethod: PaymentMethod;
    specialRequests?: string;
  }) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  updatePaymentStatus: (bookingId: string, status: PaymentStatus) => void;
  updateRoomAvailability: (roomId: string, newAvailableCount: number) => void;
  deleteBooking: (bookingId: string) => void;
  lookupBooking: (codeOrEmail: string) => Booking | undefined;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROOMS: 'benchmark_hotel_rooms_v1',
  BOOKINGS: 'benchmark_hotel_bookings_v1',
};

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial rooms
  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ROOMS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_ROOMS;
  });

  // Load initial bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_BOOKINGS;
  });

  // Default dates: tomorrow to +4 days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const checkoutDefault = new Date(tomorrow);
  checkoutDefault.setDate(tomorrow.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [searchFilter, setSearchFilter] = useState<SearchFilterState>({
    checkIn: formatDate(tomorrow),
    checkOut: formatDate(checkoutDefault),
    adults: 2,
    children: 0,
    category: 'All',
    priceRange: [200, 3000],
  });

  const [selectedRoomFor3D, setSelectedRoomFor3D] = useState<Room | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');
  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<Booking | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    } catch {
      // ignore
    }
  }, [rooms]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  const createBooking = (data: {
    room: Room;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: { adults: number; children: number };
    selectedAddOns: BookingAddOn[];
    paymentMethod: PaymentMethod;
    specialRequests?: string;
  }): Booking => {
    const roomRateTotal = data.room.pricePerNight * data.nights;
    const addOnsTotal = data.selectedAddOns.reduce((sum, item) => sum + item.price, 0);
    const taxesAndFees = Math.round((roomRateTotal + addOnsTotal) * 0.10);
    const totalPrice = roomRateTotal + addOnsTotal + taxesAndFees;

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = `BMH-${randomSuffix}`;
    const keycardId = `NFC-BMH-${Math.floor(100 + Math.random() * 900)}-${data.room.category.slice(0, 3).toUpperCase()}`;

    // Assigned room number based on floor
    const floorNumber = data.room.floor.match(/\d+/)?.[0] || '12';
    const roomNumberAssigned = `RM-${floorNumber}${Math.floor(10 + Math.random() * 89)}`;

    const newBooking: Booking = {
      id: `bkg-${Date.now()}`,
      bookingCode,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      roomId: data.room.id,
      roomName: data.room.name,
      roomCategory: data.room.category,
      roomImage: data.room.images[0],
      checkInDate: data.checkIn,
      checkOutDate: data.checkOut,
      nights: data.nights,
      guests: data.guests,
      addOns: data.selectedAddOns,
      roomRateTotal,
      addOnsTotal,
      taxesAndFees,
      totalPrice,
      paymentStatus: data.paymentMethod === 'pay_at_hotel' ? 'Pay at Hotel' : 'Paid',
      bookingStatus: 'Confirmed',
      paymentMethod: data.paymentMethod,
      paymentTransactionId: data.paymentMethod !== 'pay_at_hotel' ? `TXN-BMH-${Date.now().toString().slice(-7)}` : undefined,
      specialRequests: data.specialRequests,
      createdAt: new Date().toISOString(),
      digitalKeycardId: keycardId,
      roomNumberAssigned,
    };

    // Update room inventory
    setRooms(prevRooms =>
      prevRooms.map(r =>
        r.id === data.room.id
          ? { ...r, availableInventory: Math.max(0, r.availableInventory - 1) }
          : r
      )
    );

    // Add to bookings list
    setBookings(prev => [newBooking, ...prev]);
    setLatestConfirmedBooking(newBooking);

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, bookingStatus: status } : b))
    );
  };

  const updatePaymentStatus = (bookingId: string, status: PaymentStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, paymentStatus: status } : b))
    );
  };

  const updateRoomAvailability = (roomId: string, newAvailableCount: number) => {
    setRooms(prev =>
      prev.map(r =>
        r.id === roomId
          ? {
              ...r,
              availableInventory: Math.max(0, Math.min(r.totalInventory, newAvailableCount)),
            }
          : r
      )
    );
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const lookupBooking = (codeOrEmail: string): Booking | undefined => {
    const query = codeOrEmail.trim().toLowerCase();
    return bookings.find(
      b =>
        b.bookingCode.toLowerCase() === query ||
        b.guestEmail.toLowerCase() === query ||
        b.guestPhone.toLowerCase().includes(query)
    );
  };

  return (
    <HotelContext.Provider
      value={{
        rooms,
        bookings,
        searchFilter,
        setSearchFilter,
        selectedRoomFor3D,
        setSelectedRoomFor3D,
        selectedRoomForBooking,
        setSelectedRoomForBooking,
        isLookupModalOpen,
        setIsLookupModalOpen,
        currentView,
        setCurrentView,
        latestConfirmedBooking,
        setLatestConfirmedBooking,
        createBooking,
        updateBookingStatus,
        updatePaymentStatus,
        updateRoomAvailability,
        deleteBooking,
        lookupBooking,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

