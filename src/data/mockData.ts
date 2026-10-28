import { Room, BookingAddOn, Booking } from '../types/hotel';

export const LUXURY_ADD_ONS: BookingAddOn[] = [
  {
    id: 'rolls-royce-transfer',
    name: 'Chauffeur Mountain Transfer (Rolls-Royce Ghost)',
    price: 18500,
    icon: 'Car',
    description: 'Scenic Coimbatore Airport climb through Coonoor tea ghats to Charing Cross.'
  },
  {
    id: 'vintage-champagne',
    name: 'Dom Pérignon 2013 & Ooty Truffle Welcome',
    price: 26000,
    icon: 'Wine',
    description: 'Chilled champagne or warm single-estate silver needle tea with artisan Ooty chocolates.'
  },
  {
    id: 'signature-spa',
    name: 'Couples Nilgiri Eucalyptus & Basalt Hot Stone Spa (90-Min)',
    price: 16000,
    icon: 'Sparkles',
    description: 'Restorative herbal deep-tissue massage with wild eucalyptus oils & private cedar bath.'
  },
  {
    id: 'private-chef-dinner',
    name: 'Private Fireside 5-Course In-Suite Dinner',
    price: 35000,
    icon: 'UtensilsCrossed',
    description: 'Master chef Nilgiri mountain harvest menu paired with reserve cellar vintages.'
  },
  {
    id: 'late-checkout-vip',
    name: 'Guaranteed 4:00 PM Late VIP Check-Out',
    price: 12000,
    icon: 'Clock',
    description: 'Extended relaxation and afternoon tea in the High-Altitude Cloud Lounge.'
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'benchmark-penthouse',
    name: 'The Nilgiri Royal Penthouse',
    tagline: 'Suspended Above the Cloud Inversion & Doddabetta Tea Valleys',
    category: 'Penthouse',
    pricePerNight: 175000,
    originalPrice: 210000,
    capacity: { adults: 4, children: 2, maxGuests: 6 },
    sizeSqFt: 2800,
    view: '360° Nilgiri Hills, Doddabetta Peak & Tea Valley Mist',
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
      'Private 34°C Heated Infinity Pool on Balcony',
      'Handcrafted Italian Stone Wood-Burning Fireplace',
      '24/7 Dedicated Nilgiri Butler & Tea Master',
      'Helipad VIP Direct Touchdown Clearance',
      'Hermès Paris Bath Amenities & Cashmere Throws',
      'Single-Estate Nilgiri Grand Tea & Wine Cellar'
    ],
    highlights: ['Wood Fireplace', 'Heated Cloud Pool', 'Private Elevator', 'Chauffeured Rolls-Royce'],
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
        { id: 'h1', title: 'Heated Cloud Pool', description: 'Suspended 45 floors above Doddabetta tea slopes', position: [2.5, 0.4, -1.8] },
        { id: 'h2', title: 'Emperor Silk Bed', description: 'Handcrafted Italian silk linens with pillow menu & cashmere throws', position: [-1.2, 0.6, -0.5] },
        { id: 'h3', title: 'Stone Fireplace', description: 'Wood-burning fireplace with hearth seating looking onto the mist', position: [-2.2, 0.5, 1.8] }
      ]
    }
  },
  {
    id: 'celestial-ocean-suite',
    name: 'Celestial Panoramic Nilgiri Suite',
    tagline: 'Infinite Mountain Vistas & Golden Sunset Cloud Inversions',
    category: 'Suite',
    pricePerNight: 72000,
    originalPrice: 85000,
    capacity: { adults: 2, children: 1, maxGuests: 3 },
    sizeSqFt: 1150,
    view: 'Panoramic Unobstructed Nilgiri Valley & Tea Slopes',
    floor: 'Floors 28 - 34',
    bedType: 'Plush King Bed with Down Duvet & Cashmere Blanket',
    rating: 4.96,
    reviewsCount: 162,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Wraparound Teakwood Mountain Sunset Terrace',
      'Freestanding Soaking Tub with Tea Valley Panorama',
      'In-Suite Stone Fireplace with Hearth Attendant',
      'Artisanal Nilgiri Single-Estate Tea Bar',
      'Dyson Supersonic & Organic Eucalyptus Toiletries',
      'Highland Club Lounge Access'
    ],
    highlights: ['Mountain Terrace', 'Deep Soaking Tub', 'Hearth Fireplace', 'Estate Teas'],
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
        { id: 'h1', title: 'Teakwood Terrace', description: 'Dual loungers overlooking the mist-filled tea valleys', position: [2.0, 0.3, -1.5] },
        { id: 'h2', title: 'Deep Valley Tub', description: 'Floor-to-ceiling glass wall bath with sunset orientation', position: [-2.0, 0.4, 1.2] }
      ]
    }
  },
  {
    id: 'emerald-sanctuary-villa',
    name: 'Sanctuary Shola Forest & Tea Villa',
    tagline: 'Secluded Highland Sanctuary with Private Heated Plunge Pool',
    category: 'Villa',
    pricePerNight: 115000,
    originalPrice: 135000,
    capacity: { adults: 4, children: 2, maxGuests: 6 },
    sizeSqFt: 1950,
    view: 'Private Shola Forest & Organic Tea Bushes',
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
      'Private 40ft Heated Turquoise Plunge Pool (32°C)',
      'Outdoor Rainforest Shower & Basalt Hot Tub',
      'Private Meditation Gazebo in Tea Garden',
      'Personal Golf Cart for Property & Charing Cross Transit',
      'Complimentary Sunset High Tea & Bonfire',
      'Luxury In-Villa Highland Breakfast Buffet'
    ],
    highlights: ['Private Heated Pool', 'Shola Forest', 'Outdoor Hearth', 'Organic Tea Garden'],
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
        { id: 'h1', title: 'Heated Tea Garden Pool', description: 'Surrounded by lush rhododendrons and wild eucalyptus', position: [2.3, 0.2, -1.2] },
        { id: 'h2', title: 'Canopy Teak Bed', description: 'Bespoke hand-carved mahogany bed frame with cashmere throws', position: [-0.9, 0.6, -0.6] }
      ]
    }
  },
  {
    id: 'deluxe-horizon-king',
    name: 'Grand Nilgiri Mountain Deluxe King',
    tagline: 'Timeless Colonial Sophistication & Contemporary Hilltop Comfort',
    category: 'Deluxe',
    pricePerNight: 34000,
    originalPrice: 42000,
    capacity: { adults: 2, children: 1, maxGuests: 3 },
    sizeSqFt: 680,
    view: 'Highland Pine Ridges & Valley Lights',
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
      'Smart Mood Lighting & Mountain Climate Tablet',
      'Rainfall Shower with Organic Nilgiri Eucalyptus Aromatherapy',
      'Curated Artisanal Mountain Minibar & Estate Tea',
      'High-Speed 1Gbps Fiber Wi-Fi',
      'Fine Egyptian Cotton 800-Thread Sheets & Cashmere Quilts',
      'Evening Turn-Down with Spiced Ooty Chocolates'
    ],
    highlights: ['Eucalyptus Shower', 'Valley Panorama', 'Smart Tablet', 'Artisan Tea'],
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
    name: 'Heritage Colonial Executive Residence',
    tagline: 'Refined Comfort Designed for Discerning Highland Travellers',
    category: 'Suite',
    pricePerNight: 58000,
    originalPrice: 68000,
    capacity: { adults: 3, children: 1, maxGuests: 4 },
    sizeSqFt: 920,
    view: 'Charing Cross Skyline & Rolling Pine Hills',
    floor: 'Floors 22 - 30',
    bedType: '1 King Bed + Separate Living Parlor & Fireplace',
    rating: 4.95,
    reviewsCount: 114,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=80'
    ],
    amenities: [
      'Separate Dining Area, Library & Fireplace Living Room',
      'Complimentary Executive Club Breakfast & High Tea',
      'Walk-In Marble Closet & Dressing Room',
      'Smart 75" 4K OLED Cinema TV with Spatial Sound',
      'Dual Vanity Sinks with Heated Italian Stone Floors',
      'Priority Restaurant & Heritage Train Reservations'
    ],
    highlights: ['Brass Fireplace', 'Separate Living Area', 'VIP Lounge', 'Heated Floors'],
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
    name: 'The Viceroy Two-Story Duplex',
    tagline: 'Double-Height Architectural Marvel with Private Helipad Service',
    category: 'Penthouse',
    pricePerNight: 240000,
    originalPrice: 290000,
    capacity: { adults: 6, children: 3, maxGuests: 8 },
    sizeSqFt: 3400,
    view: 'Unrivaled 360° Nilgiri Skyline, Doddabetta Peak & Cloud Ocean',
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
      'Double-Height 24ft Glass Grand Atrium with Valley Views',
      'Italian Stone Fireplace & Floating Teak Spiral Staircase',
      'Full Gourmet Bulthaup Kitchen with Private Chef',
      'In-Suite Spa Sanctuary & Finnish Cedar Sauna',
      'Private Cinema Room with Dolby Atmos Sound',
      'Chauffeured Rolls-Royce Ghost at Your Disposal 24/7'
    ],
    highlights: ['2-Story Duplex', 'Stone Fireplace', 'Private Cedar Sauna', 'Private Helipad'],
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
        { id: 'h1', title: 'Atrium Sky Lounge', description: 'Soaring 24ft ceilings overlooking the twilight cloud sea', position: [2.2, 0.8, -0.5] },
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
    guestPhone: '+91 98201 44812',
    roomId: 'benchmark-penthouse',
    roomName: 'The Nilgiri Royal Penthouse',
    roomCategory: 'Penthouse',
    roomImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-11-04',
    checkOutDate: '2026-11-08',
    nights: 4,
    guests: { adults: 2, children: 0 },
    addOns: [
      LUXURY_ADD_ONS[0], // Rolls Royce mountain transfer
      LUXURY_ADD_ONS[1]  // Dom Perignon welcome
    ],
    roomRateTotal: 700000,
    addOnsTotal: 44500,
    taxesAndFees: 89340,
    totalPrice: 833840,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    paymentMethod: 'card',
    paymentTransactionId: 'TXN-BMH-9923847',
    specialRequests: 'Prefers cedarwood fireplace lit on arrival, hot spiced Nilgiri tea ready.',
    createdAt: '2026-10-24T14:32:00Z',
    digitalKeycardId: 'NFC-BMH-001-PENT',
    roomNumberAssigned: 'PH-4501'
  },
  {
    id: 'bkg-102',
    bookingCode: 'BMH-64291',
    guestName: 'Dr. Sophia Sterling',
    guestEmail: 'sophia.sterling@vanguard.ch',
    guestPhone: '+91 97112 55901',
    roomId: 'celestial-ocean-suite',
    roomName: 'Celestial Panoramic Nilgiri Suite',
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
    roomRateTotal: 288000,
    addOnsTotal: 28000,
    taxesAndFees: 37920,
    totalPrice: 353920,
    paymentStatus: 'Paid',
    bookingStatus: 'Checked-In',
    paymentMethod: 'card',
    paymentTransactionId: 'TXN-BMH-8827110',
    specialRequests: 'Requested extra cashmere throws and hypoallergenic eucalyptus pillows.',
    createdAt: '2026-10-22T09:15:00Z',
    digitalKeycardId: 'NFC-BMH-028-OCN',
    roomNumberAssigned: 'STE-3204'
  },
  {
    id: 'bkg-103',
    bookingCode: 'BMH-33827',
    guestName: 'Marcus & Elena Beaumont',
    guestEmail: 'beaumont.ventures@m-invest.com',
    guestPhone: '+91 98199 03412',
    roomId: 'emerald-sanctuary-villa',
    roomName: 'Sanctuary Shola Forest & Tea Villa',
    roomCategory: 'Villa',
    roomImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-11-12',
    checkOutDate: '2026-11-17',
    nights: 5,
    guests: { adults: 2, children: 0 },
    addOns: [
      LUXURY_ADD_ONS[3] // Private chef
    ],
    roomRateTotal: 575000,
    addOnsTotal: 35000,
    taxesAndFees: 73200,
    totalPrice: 683200,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    paymentMethod: 'upi',
    paymentTransactionId: 'UPI-BMH-665129',
    specialRequests: 'Celebrating 10th wedding anniversary. Fireside bonfire and acoustic music please.',
    createdAt: '2026-10-26T18:40:00Z',
    digitalKeycardId: 'NFC-BMH-VIL-02',
    roomNumberAssigned: 'VIL-002'
  },
  {
    id: 'bkg-104',
    bookingCode: 'BMH-19482',
    guestName: 'Kenji Takahashi',
    guestEmail: 'takahashi.k@tokyo-design.jp',
    guestPhone: '+91 99304 88192',
    roomId: 'deluxe-horizon-king',
    roomName: 'Grand Nilgiri Mountain Deluxe King',
    roomCategory: 'Deluxe',
    roomImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-11-01',
    checkOutDate: '2026-11-03',
    nights: 2,
    guests: { adults: 1, children: 0 },
    addOns: [],
    roomRateTotal: 68000,
    addOnsTotal: 0,
    taxesAndFees: 8160,
    totalPrice: 76160,
    paymentStatus: 'Pay at Hotel',
    bookingStatus: 'Confirmed',
    paymentMethod: 'pay_at_hotel',
    specialRequests: 'High floor preferred overlooking Doddabetta tea ridges.',
    createdAt: '2026-10-27T11:05:00Z',
    digitalKeycardId: 'NFC-BMH-1808',
    roomNumberAssigned: 'RM-1808'
  },
  {
    id: 'bkg-105',
    bookingCode: 'BMH-55201',
    guestName: 'Camilla Valente',
    guestEmail: 'camilla@valente-couture.it',
    guestPhone: '+91 98402 77123',
    roomId: 'azure-executive-residence',
    roomName: 'Heritage Colonial Executive Residence',
    roomCategory: 'Suite',
    roomImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    checkInDate: '2026-10-18',
    checkOutDate: '2026-10-22',
    nights: 4,
    guests: { adults: 2, children: 0 },
    addOns: [LUXURY_ADD_ONS[1]],
    roomRateTotal: 232000,
    addOnsTotal: 26000,
    taxesAndFees: 30960,
    totalPrice: 288960,
    paymentStatus: 'Paid',
    bookingStatus: 'Completed',
    paymentMethod: 'card',
    paymentTransactionId: 'TXN-BMH-7719284',
    createdAt: '2026-10-12T16:20:00Z',
    digitalKeycardId: 'NFC-BMH-2402',
    roomNumberAssigned: 'STE-2402'
  }
];

