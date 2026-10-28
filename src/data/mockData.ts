import { Room, BookingAddOn, Booking } from '../types/hotel';

export const LUXURY_ADD_ONS: BookingAddOn[] = [
  {
    id: 'rolls-royce-transfer',
    name: 'Chauffeur Airport Transfer (Rolls-Royce Ghost)',
    price: 180,
    icon: 'Car',
    description: 'Complimentary iced towel, champagne, and meet-and-greet at arrivals tarmac.'
  },
  {
    id: 'vintage-champagne',
    name: 'Dom Pérignon 2013 & Beluga Caviar Welcome',
    price: 260,
    icon: 'Wine',
    description: 'Chilled bottle waiting in your suite with traditional blinis & accoutrements.'
  },
  {
    id: 'signature-spa',
    name: 'Couples Diamond Radiance 90-Min Spa',
    price: 320,
    icon: 'Sparkles',
    description: 'Holistic deep-tissue treatment with rare botanical oils & private thermal bath.'
  },
  {
    id: 'private-chef-dinner',
    name: 'Private In-Suite Michelin-Starred 5-Course Dinner',
    price: 450,
    icon: 'UtensilsCrossed',
    description: 'Master chef culinary journey paired with reserve vintage sommelier selections.'
  },
  {
    id: 'late-checkout-vip',
    name: 'Guaranteed 4:00 PM Late VIP Check-Out',
    price: 120,
    icon: 'Clock',
    description: 'Extended relaxation and afternoon tea in the Executive Sky Lounge.'
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'benchmark-penthouse',
    name: 'The Benchmark Royal Penthouse',
    tagline: 'The Pinnacle of Haute Living & Private Sky Terrace',
    category: 'Penthouse',
    pricePerNight: 1850,
    originalPrice: 2200,
    capacity: { adults: 4, children: 2, maxGuests: 6 },
    sizeSqFt: 2800,
    view: '360° Ocean Coastline & Metropolis Skyline',
    floor: 'Floor 45 (Private Key Access)',
    bedType: 'Custom 8x8 Emperor Bed + 1 King Guest Room',
    rating: 4.99,
    reviewsCount: 84,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Private Heated Infinity Pool on Balcony',
      '24/7 Dedicated Royal Butler & Concierge',
      'Heliport VIP Arrival Clearance',
      'Hermès Paris Bath Amenities',
      'Sonance Architectural 3D Spatial Audio',
      'Temperature-Controlled Grand Wine Wall'
    ],
    highlights: ['Private Elevator', 'Wine Vault', 'Jacuzzi with View', 'Dedicated Chauffeur'],
    totalInventory: 2,
    availableInventory: 1,
    isFeatured: true,
    threeDConfig: {
      theme: 'royal-amber',
      floorTextureColor: '#1c1917',
      wallColor: '#292524',
      ambientLightColor: '#ffedd5',
      accentLightColor: '#d4af37',
      bedModel: 'penthouse-circular',
      hasBalconyView: true,
      hasMarbleJacuzzi: true,
      hasLoungeSofa: true,
      hasExecutiveDesk: true,
      hotspots: [
        { id: 'h1', title: 'Cantilevered Sky Pool', description: 'Suspended 45 floors above the coast with glass edge', position: [2.5, 0.4, -1.8] },
        { id: 'h2', title: 'Emperor Silk Bed', description: 'Handcrafted Italian silk linens with pillow menu', position: [-1.2, 0.6, -0.5] },
        { id: 'h3', title: 'Carrara Marble Jacuzzi', description: 'Direct ocean vistas with aerated jet massage', position: [-2.2, 0.5, 1.8] }
      ]
    }
  },
  {
    id: 'celestial-ocean-suite',
    name: 'Celestial Panoramic Ocean Suite',
    tagline: 'Infinite Pacific Vistas & Golden Sunset Horizons',
    category: 'Suite',
    pricePerNight: 780,
    originalPrice: 950,
    capacity: { adults: 2, children: 1, maxGuests: 3 },
    sizeSqFt: 1150,
    view: 'Panoramic Unobstructed Oceanfront',
    floor: 'Floors 28 - 34',
    bedType: 'Plush King Bed with Down Duvet',
    rating: 4.96,
    reviewsCount: 162,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Wraparound Teakwood Sunset Terrace',
      'Freestanding Soaking Tub with Ocean Panorama',
      'Bang & Olufsen Bluetooth Entertainment',
      'Nespresso Vertuo & Artisan Tea Bar',
      'Dyson Supersonic Hair Care Kit',
      'Executive Club Lounge Access'
    ],
    highlights: ['Oceanfront Terrace', 'Deep Soaking Tub', 'Daily High Tea', 'Custom Scents'],
    totalInventory: 6,
    availableInventory: 4,
    isFeatured: true,
    threeDConfig: {
      theme: 'ocean-azure',
      floorTextureColor: '#0f172a',
      wallColor: '#1e293b',
      ambientLightColor: '#e0f2fe',
      accentLightColor: '#38bdf8',
      bedModel: 'emperor-king',
      hasBalconyView: true,
      hasMarbleJacuzzi: true,
      hasLoungeSofa: true,
      hasExecutiveDesk: false,
      hotspots: [
        { id: 'h1', title: 'Teakwood Balcony', description: 'Dual sun-loungers overlooking the private coastline', position: [2.0, 0.3, -1.5] },
        { id: 'h2', title: 'Deep Ocean Tub', description: 'Floor-to-ceiling glass wall bath with sunset orientation', position: [-2.0, 0.4, 1.2] }
      ]
    }
  },
  {
    id: 'emerald-sanctuary-villa',
    name: 'Sanctuary Lagoon Private Villa',
    tagline: 'Secluded Tropical Paradise with Private Heated Plunge Pool',
    category: 'Villa',
    pricePerNight: 1250,
    originalPrice: 1450,
    capacity: { adults: 4, children: 2, maxGuests: 6 },
    sizeSqFt: 1950,
    view: 'Private Zen Botanical Lagoon',
    floor: 'Sanctuary Reserve Ground Level',
    bedType: '2 King Master Pavilions',
    rating: 4.98,
    reviewsCount: 97,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Private 40ft Heated Turquoise Plunge Pool',
      'Outdoor Rainforest Shower & Stone Bath',
      'Private Meditation Gazebo & Garden',
      'Personal Golf Cart for Property Transit',
      'Complimentary Sunset Cocktails in Garden',
      'Luxury In-Villa Breakfast Buffet'
    ],
    highlights: ['Private Pool', 'Outdoor Rain Shower', 'Exclusive Gazebo', 'Zero Footprint'],
    totalInventory: 4,
    availableInventory: 2,
    isFeatured: true,
    threeDConfig: {
      theme: 'emerald-sanctuary',
      floorTextureColor: '#14231b',
      wallColor: '#1e3327',
      ambientLightColor: '#dcfce7',
      accentLightColor: '#34d399',
      bedModel: 'canopy-luxe',
      hasBalconyView: true,
      hasMarbleJacuzzi: true,
      hasLoungeSofa: true,
      hasExecutiveDesk: false,
      hotspots: [
        { id: 'h1', title: 'Botanical Plunge Pool', description: 'Surrounded by lush orchids and travertine stone', position: [2.3, 0.2, -1.2] },
        { id: 'h2', title: 'Canopy Teak Bed', description: 'Bespoke hand-carved mahogany bed frame with sheer drapes', position: [-0.9, 0.6, -0.6] }
      ]
    }
  },
  {
    id: 'deluxe-horizon-king',
    name: 'Grand Horizon Deluxe King',
    tagline: 'Timeless Elegance & Contemporary City Sophistication',
    category: 'Deluxe',
    pricePerNight: 420,
    originalPrice: 490,
    capacity: { adults: 2, children: 1, maxGuests: 3 },
    sizeSqFt: 680,
    view: 'Metropolitan City Lights & Harbour',
    floor: 'Floors 12 - 25',
    bedType: 'Signature Benchmark Plush King',
    rating: 4.93,
    reviewsCount: 240,
    images: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Smart Mood Lighting & Climate Tablet',
      'Italian Rainforest Shower with Aromatherapy',
      'Curated Artisanal Minibar',
      'High-Speed 1Gbps Fiber Wi-Fi',
      'Fine Egyptian Cotton 800-Thread Sheets',
      'Evening Turn-Down Service with Artisan Chocolates'
    ],
    highlights: ['Smart Tablet', 'Rain Shower', 'City Skyline', 'Superfast Fiber'],
    totalInventory: 12,
    availableInventory: 8,
    isFeatured: false,
    threeDConfig: {
      theme: 'gold-minimal',
      floorTextureColor: '#171923',
      wallColor: '#232733',
      ambientLightColor: '#fef3c7',
      accentLightColor: '#f59e0b',
      bedModel: 'emperor-king',
      hasBalconyView: false,
      hasMarbleJacuzzi: false,
      hasLoungeSofa: true,
      hasExecutiveDesk: true,
      hotspots: [
        { id: 'h1', title: 'Work & Inspiration Desk', description: 'Solid oak desk with ergonomic leather chair and wireless hub', position: [1.8, 0.5, 1.2] },
        { id: 'h2', title: 'King Comfort Bed', description: 'Memory-foam pillow top with customizable firmness', position: [-0.8, 0.5, -0.6] }
      ]
    }
  },
  {
    id: 'azure-executive-residence',
    name: 'Azure Executive Residence Suite',
    tagline: 'Refined Comfort Designed for Discerning Travellers',
    category: 'Suite',
    pricePerNight: 620,
    originalPrice: 750,
    capacity: { adults: 3, children: 1, maxGuests: 4 },
    sizeSqFt: 920,
    view: 'Panoramic Bay Marina & City Vista',
    floor: 'Floors 22 - 30',
    bedType: '1 King Bed + Separate Living Parlor',
    rating: 4.95,
    reviewsCount: 114,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Separate Dining Area & Living Room',
      'Complimentary Executive Club Breakfast & Canapés',
      'Walk-In Marble Closet & Dressing Room',
      'Smart 75" 4K OLED Cinema TV',
      'Dual Vanity Sinks with Heated Mirrors',
      'Priority Restaurant Reservations'
    ],
    highlights: ['Separate Living Area', 'VIP Lounge', 'Walk-in Wardrobe', 'Marina Views'],
    totalInventory: 8,
    availableInventory: 5,
    isFeatured: false,
    threeDConfig: {
      theme: 'gold-minimal',
      floorTextureColor: '#181b24',
      wallColor: '#262a36',
      ambientLightColor: '#f1f5f9',
      accentLightColor: '#e2b342',
      bedModel: 'emperor-king',
      hasBalconyView: true,
      hasMarbleJacuzzi: true,
      hasLoungeSofa: true,
      hasExecutiveDesk: true,
      hotspots: [
        { id: 'h1', title: 'Executive Parlor', description: 'Italian velvet sofa and wine cooler for private meetings', position: [1.6, 0.4, 0.8] },
        { id: 'h2', title: 'Private King Bedroom', description: 'Acoustic-insulated suite ensuring deep uninterrupted sleep', position: [-1.4, 0.5, -0.6] }
      ]
    }
  },
  {
    id: 'emperor-duplex-suite',
    name: 'The Emperor Two-Story Duplex',
    tagline: 'Double-Height Architectural Marvel with Private Helipad Service',
    category: 'Penthouse',
    pricePerNight: 2400,
    originalPrice: 2800,
    capacity: { adults: 6, children: 3, maxGuests: 8 },
    sizeSqFt: 3400,
    view: 'Unrivaled 360° Skyline, Coast & Sunset Arc',
    floor: 'Floors 48 & 49 (Top Sky Deck)',
    bedType: '2 Emperor Master Suites + 1 Twin Bedroom',
    rating: 5.0,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Double-Height 24ft Glass Grand Atrium',
      'Private Floating Spiral Staircase',
      'Full Gourmet Bulthaup Kitchen with Private Chef',
      'In-Suite Spa Sanctuary & Finnish Cedar Sauna',
      'Private Cinema Room with Dolby Atmos Sound',
      'Chauffeured Bentley at Your Disposal 24/7'
    ],
    highlights: ['2-Story Duplex', 'Private Sauna', 'Private Cinema', 'Chauffeured Bentley'],
    totalInventory: 1,
    availableInventory: 1,
    isFeatured: true,
    threeDConfig: {
      theme: 'royal-amber',
      floorTextureColor: '#12141a',
      wallColor: '#1f232e',
      ambientLightColor: '#ffedd5',
      accentLightColor: '#f59e0b',
      bedModel: 'penthouse-circular',
      hasBalconyView: true,
      hasMarbleJacuzzi: true,
      hasLoungeSofa: true,
      hasExecutiveDesk: true,
      hotspots: [
        { id: 'h1', title: 'Atrium Sky Lounge', description: 'Soaring 24ft ceilings overlooking the twilight coastline', position: [2.2, 0.8, -0.5] },
        { id: 'h2', title: 'Private Cedar Sauna', description: 'Nordic timber sauna with eucalyptus vapor infusion', position: [-2.2, 0.4, 1.4] }
      ]
    }
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-101',
    bookingCode: 'BMH-89410',
    guestName: 'Lord Alexander Vance',
    guestEmail: 'a.vance@benchmark-luxury.com',
    guestPhone: '+1 (555) 392-8812',
    roomId: 'benchmark-penthouse',
    roomName: 'The Benchmark Royal Penthouse',
    roomCategory: 'Penthouse',
    roomImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-11-04',
    checkOutDate: '2026-11-08',
    nights: 4,
    guests: { adults: 2, children: 0 },
    addOns: [
      LUXURY_ADD_ONS[0], // Rolls Royce transfer
      LUXURY_ADD_ONS[1]  // Dom Perignon welcome
    ],
    roomRateTotal: 7400,
    addOnsTotal: 440,
    taxesAndFees: 784,
    totalPrice: 8624,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    paymentMethod: 'card',
    paymentTransactionId: 'TXN-BMH-9923847',
    specialRequests: 'Prefers 20°C room temperature on arrival, chilled sparkling mineral water.',
    createdAt: '2026-10-24T14:32:00Z',
    digitalKeycardId: 'NFC-BMH-001-PENT',
    roomNumberAssigned: 'PH-4501'
  },
  {
    id: 'bkg-102',
    bookingCode: 'BMH-64291',
    guestName: 'Dr. Sophia Sterling',
    guestEmail: 'sophia.sterling@vanguard.ch',
    guestPhone: '+41 79 482 1099',
    roomId: 'celestial-ocean-suite',
    roomName: 'Celestial Panoramic Ocean Suite',
    roomCategory: 'Suite',
    roomImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-10-29',
    checkOutDate: '2026-11-02',
    nights: 4,
    guests: { adults: 2, children: 1 },
    addOns: [
      LUXURY_ADD_ONS[2], // Couples Spa
      LUXURY_ADD_ONS[4]  // Late checkout
    ],
    roomRateTotal: 3120,
    addOnsTotal: 440,
    taxesAndFees: 356,
    totalPrice: 3916,
    paymentStatus: 'Paid',
    bookingStatus: 'Checked-In',
    paymentMethod: 'card',
    paymentTransactionId: 'TXN-BMH-8827110',
    specialRequests: 'Allergic to feathers, requested hypoallergenic bamboo pillows.',
    createdAt: '2026-10-22T09:15:00Z',
    digitalKeycardId: 'NFC-BMH-028-OCN',
    roomNumberAssigned: 'STE-3204'
  },
  {
    id: 'bkg-103',
    bookingCode: 'BMH-33827',
    guestName: 'Marcus & Elena Beaumont',
    guestEmail: 'beaumont.ventures@m-invest.com',
    guestPhone: '+44 20 7946 0912',
    roomId: 'emerald-sanctuary-villa',
    roomName: 'Sanctuary Lagoon Private Villa',
    roomCategory: 'Villa',
    roomImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-11-12',
    checkOutDate: '2026-11-17',
    nights: 5,
    guests: { adults: 2, children: 0 },
    addOns: [
      LUXURY_ADD_ONS[3] // Private chef
    ],
    roomRateTotal: 6250,
    addOnsTotal: 450,
    taxesAndFees: 670,
    totalPrice: 7370,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    paymentMethod: 'upi',
    paymentTransactionId: 'UPI-BMH-665129',
    specialRequests: 'Celebrating 10th wedding anniversary. Rose petals and jazz music please.',
    createdAt: '2026-10-26T18:40:00Z',
    digitalKeycardId: 'NFC-BMH-VIL-02',
    roomNumberAssigned: 'VIL-002'
  },
  {
    id: 'bkg-104',
    bookingCode: 'BMH-19482',
    guestName: 'Kenji Takahashi',
    guestEmail: 'takahashi.k@tokyo-design.jp',
    guestPhone: '+81 90 5552 4190',
    roomId: 'deluxe-horizon-king',
    roomName: 'Grand Horizon Deluxe King',
    roomCategory: 'Deluxe',
    roomImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-11-01',
    checkOutDate: '2026-11-03',
    nights: 2,
    guests: { adults: 1, children: 0 },
    addOns: [],
    roomRateTotal: 840,
    addOnsTotal: 0,
    taxesAndFees: 84,
    totalPrice: 924,
    paymentStatus: 'Pay at Hotel',
    bookingStatus: 'Confirmed',
    paymentMethod: 'pay_at_hotel',
    specialRequests: 'High floor preferred away from elevators.',
    createdAt: '2026-10-27T11:05:00Z',
    digitalKeycardId: 'NFC-BMH-1808',
    roomNumberAssigned: 'RM-1808'
  },
  {
    id: 'bkg-105',
    bookingCode: 'BMH-55201',
    guestName: 'Camilla Valente',
    guestEmail: 'camilla@valente-couture.it',
    guestPhone: '+39 02 8941 2309',
    roomId: 'azure-executive-residence',
    roomName: 'Azure Executive Residence Suite',
    roomCategory: 'Suite',
    roomImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-10-18',
    checkOutDate: '2026-10-22',
    nights: 4,
    guests: { adults: 2, children: 0 },
    addOns: [LUXURY_ADD_ONS[1]],
    roomRateTotal: 2480,
    addOnsTotal: 260,
    taxesAndFees: 274,
    totalPrice: 3014,
    paymentStatus: 'Paid',
    bookingStatus: 'Completed',
    paymentMethod: 'card',
    paymentTransactionId: 'TXN-BMH-7719284',
    createdAt: '2026-10-12T16:20:00Z',
    digitalKeycardId: 'NFC-BMH-2402',
    roomNumberAssigned: 'STE-2402'
  }
];

