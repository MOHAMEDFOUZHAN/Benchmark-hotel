export type RoomCategory = 'All' | 'Deluxe' | 'Suite' | 'Penthouse' | 'Villa';

export interface RoomHotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number]; // [x, y, z] for 3D positioning
  icon?: string;
}

export interface Room3DConfig {
  theme: 'gold-minimal' | 'ocean-azure' | 'royal-amber' | 'emerald-sanctuary';
  floorTextureColor: string;
  wallColor: string;
  ambientLightColor: string;
  accentLightColor: string;
  bedModel: 'emperor-king' | 'canopy-luxe' | 'penthouse-circular';
  hasBalconyView: boolean;
  hasMarbleJacuzzi: boolean;
  hasLoungeSofa: boolean;
  hasExecutiveDesk: boolean;
  hotspots: RoomHotspot[];
}

export interface Room {
  id: string;
  name: string;
  tagline: string;
  category: 'Deluxe' | 'Suite' | 'Penthouse' | 'Villa';
  pricePerNight: number;
  originalPrice?: number;
  capacity: {
    adults: number;
    children: number;
    maxGuests: number;
  };
  sizeSqFt: number;
  view: string;
  floor: string;
  bedType: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  amenities: string[];
  highlights: string[];
  totalInventory: number;
  availableInventory: number;
  isFeatured?: boolean;
  threeDConfig: Room3DConfig;
}

export interface BookingAddOn {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Pay at Hotel' | 'Refunded';
export type BookingStatus = 'Confirmed' | 'Checked-In' | 'Completed' | 'Cancelled';
export type PaymentMethod = 'card' | 'upi' | 'pay_at_hotel';

export interface Booking {
  id: string;
  bookingCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  roomCategory: string;
  roomImage: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  addOns: BookingAddOn[];
  roomRateTotal: number;
  addOnsTotal: number;
  taxesAndFees: number;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  paymentMethod: PaymentMethod;
  paymentTransactionId?: string;
  specialRequests?: string;
  createdAt: string;
  digitalKeycardId: string;
  roomNumberAssigned?: string;
}

export interface SearchFilterState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  category: RoomCategory;
  priceRange: [number, number];
}

