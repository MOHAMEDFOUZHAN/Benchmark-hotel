import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { BookingStatus, PaymentStatus } from '../types/hotel';
import { formatINR } from '../utils/formatters';
import {
  CalendarCheck,
  BedDouble,
  IndianRupee,
  TrendingUp,
  Search,
  Eye,
  Trash2,
  FileSpreadsheet,
  ArrowLeft,
  Plus,
  Minus,
  XCircle
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    rooms,
    bookings,
    updateBookingStatus,
    updatePaymentStatus,
    updateRoomAvailability,
    deleteBooking,
    setCurrentView
  } = useHotel();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | BookingStatus>('All');
  const [paymentFilter, setPaymentFilter] = useState<'All' | PaymentStatus>('All');
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<any | null>(null);

  const totalBookingsCount = bookings.length;
  
  const totalPaymentCollected = bookings
    .filter(b => b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const totalPendingPayment = bookings
    .filter(b => b.paymentStatus === 'Pending' || b.paymentStatus === 'Pay at Hotel')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const totalRoomsCount = rooms.reduce((sum, r) => sum + r.totalInventory, 0);
  const totalAvailableRooms = rooms.reduce((sum, r) => sum + r.availableInventory, 0);
  const totalOccupiedRooms = Math.max(0, totalRoomsCount - totalAvailableRooms);
  const occupancyPercentage = Math.round((totalOccupiedRooms / totalRoomsCount) * 100);

  const activeBookingsCount = bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Checked-In').length;

  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || b.bookingStatus === statusFilter;
    const matchesPayment = paymentFilter === 'All' || b.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleExportCSV = () => {
    const headers = ['Booking ID', 'Guest Name', 'Email', 'Room', 'Category', 'Check-In', 'Check-Out', 'Nights', 'Total Amount (INR)', 'Payment Status', 'Booking Status'];
    const rows = bookings.map(b => [
      b.bookingCode,
      `"${b.guestName}"`,
      b.guestEmail,
      `"${b.roomName}"`,
      b.roomCategory,
      b.checkInDate,
      b.checkOutDate,
      b.nights,
      b.totalPrice,
      b.paymentStatus,
      b.bookingStatus,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `benchmark_hotel_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#29241F] p-6 md:p-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E7DED0]">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('guest')}
                className="py-1.5 px-3 rounded bg-white hover:bg-[#E7DED0]/50 text-[#29241F] border border-[#E7DED0] transition-all flex items-center gap-1.5 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Guest View</span>
              </button>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#A77D4B] font-semibold">
                Operations & Reservations Management
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-normal font-serif-luxury text-[#29241F] mt-2">
              Benchmark Hotel Executive Operations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="btn-outline-espresso flex items-center gap-2"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setCurrentView('guest')}
              className="btn-primary-espresso"
            >
              New Reservation
            </button>
          </div>
        </div>

        {/* 4 REFINED KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Total Revenue Collected */}
          <div className="p-6 rounded-lg bg-white border border-[#E7DED0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#777066]">Total Payments</span>
              <IndianRupee className="w-4 h-4 text-[#A77D4B]" />
            </div>
            <div>
              <span className="text-3xl font-normal font-serif-luxury text-[#29241F]">
                {formatINR(totalPaymentCollected)}
              </span>
              <div className="flex items-center justify-between text-[11px] text-[#777066] mt-2 pt-2 border-t border-[#E7DED0]">
                <span>Pending Settlement:</span>
                <span className="font-mono text-[#29241F]">{formatINR(totalPendingPayment)}</span>
              </div>
            </div>
          </div>

          {/* 2. Total Bookings */}
          <div className="p-6 rounded-lg bg-white border border-[#E7DED0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#777066]">Total Bookings</span>
              <CalendarCheck className="w-4 h-4 text-[#A77D4B]" />
            </div>
            <div>
              <span className="text-3xl font-normal font-serif-luxury text-[#29241F]">
                {totalBookingsCount}
              </span>
              <div className="flex items-center justify-between text-[11px] text-[#777066] mt-2 pt-2 border-t border-[#E7DED0]">
                <span>Active Stays:</span>
                <span className="font-mono text-[#29241F]">{activeBookingsCount} active</span>
              </div>
            </div>
          </div>

          {/* 3. Rooms Available vs Total */}
          <div className="p-6 rounded-lg bg-white border border-[#E7DED0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#777066]">Available Suites</span>
              <BedDouble className="w-4 h-4 text-[#A77D4B]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-normal font-serif-luxury text-[#29241F]">
                  {totalAvailableRooms}
                </span>
                <span className="text-xs text-[#777066]">/ {totalRoomsCount} Total</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#777066] mt-2 pt-2 border-t border-[#E7DED0]">
                <span>Occupied:</span>
                <span className="font-mono text-[#29241F]">{totalOccupiedRooms} suites</span>
              </div>
            </div>
          </div>

          {/* 4. Occupancy Rate */}
          <div className="p-6 rounded-lg bg-white border border-[#E7DED0] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#777066]">Occupancy Rate</span>
              <TrendingUp className="w-4 h-4 text-[#A77D4B]" />
            </div>
            <div>
              <span className="text-3xl font-normal font-serif-luxury text-[#29241F]">
                {occupancyPercentage}%
              </span>
              <div className="w-full bg-[#E7DED0] h-1.5 rounded-full overflow-hidden mt-2.5">
                <div 
                  className="bg-[#29241F] h-full rounded-full transition-all duration-500"
                  style={{ width: `${occupancyPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LIVE SUITE INVENTORY & AVAILABILITY */}
        <div className="p-6 md:p-8 rounded-lg bg-white border border-[#E7DED0] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h2 className="text-xl font-normal font-serif-luxury text-[#29241F]">
                Suite Inventory Management
              </h2>
              <p className="text-xs text-[#777066] mt-0.5">
                Adjust available suites and inventory in real time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="p-4 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-16 h-16 rounded object-cover border border-[#E7DED0] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase font-mono text-[#A77D4B] font-semibold">{room.category}</span>
                      <span className="text-xs font-mono text-[#29241F] font-medium">{formatINR(room.pricePerNight)}/n</span>
                    </div>
                    <h4 className="text-xs font-medium text-[#29241F] truncate mt-0.5">{room.name}</h4>
                    <p className="text-[11px] text-[#777066] truncate">{room.floor}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E7DED0] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-[#777066] block uppercase font-mono">Available</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-base font-mono font-bold text-[#29241F]">
                        {room.availableInventory}
                      </span>
                      <span className="text-xs text-[#777066] font-mono">/ {room.totalInventory}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-white rounded p-1 border border-[#E7DED0]">
                    <button
                      onClick={() => updateRoomAvailability(room.id, room.availableInventory - 1)}
                      disabled={room.availableInventory <= 0}
                      title="Decrease available rooms"
                      className="p-1 rounded hover:bg-[#E7DED0]/50 text-[#29241F] disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => updateRoomAvailability(room.id, room.availableInventory + 1)}
                      disabled={room.availableInventory >= room.totalInventory}
                      title="Increase available rooms"
                      className="p-1 rounded hover:bg-[#E7DED0]/50 text-[#29241F] disabled:opacity-30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RESERVATIONS TABLE */}
        <div className="p-6 md:p-8 rounded-lg bg-white border border-[#E7DED0] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-normal font-serif-luxury text-[#29241F]">
                Reservations & Payment Ledger
              </h2>
              <p className="text-xs text-[#777066] mt-0.5">
                Review guest folios, modify stay status, and record payments.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-60">
                <Search className="w-3.5 h-3.5 text-[#777066] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search guest, code, room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-xs focus:outline-none focus:border-[#29241F]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-xs focus:outline-none focus:border-[#29241F]"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked-In">Checked-In</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as any)}
                className="px-3 py-2 rounded border border-[#E7DED0] bg-[#F7F4EE]/30 text-xs focus:outline-none focus:border-[#29241F]"
              >
                <option value="All">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Pay at Hotel">Pay at Hotel</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded border border-[#E7DED0]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F4EE] text-[#777066] font-mono uppercase tracking-wider text-[10px] border-b border-[#E7DED0]">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Suite</th>
                  <th className="py-3 px-4">Dates & Nights</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DED0] bg-white">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-[#777066] text-xs">
                      No reservations match the specified filters.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#F7F4EE]/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-[#29241F]">
                        {b.bookingCode}
                        <span className="block text-[10px] text-[#777066]">
                          {b.roomNumberAssigned || 'Auto-Assign'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#29241F]">{b.guestName}</div>
                        <div className="text-[11px] text-[#777066] truncate max-w-[180px]">{b.guestEmail}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-[#29241F] block truncate max-w-[160px]">{b.roomName}</span>
                        <span className="text-[10px] text-[#A77D4B] uppercase font-mono">{b.roomCategory}</span>
                      </td>

                      <td className="py-3.5 px-4 text-[#777066]">
                        <div className="font-mono text-[11px] text-[#29241F]">{b.checkInDate} → {b.checkOutDate}</div>
                        <div className="text-[10px]">{b.nights} night{b.nights > 1 ? 's' : ''}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-[#29241F] font-mono text-sm">
                          {formatINR(b.totalPrice)}
                        </span>
                        <span className="block text-[10px] text-[#777066] capitalize">{b.paymentMethod.replace('_', ' ')}</span>
                      </td>

                      {/* Payment Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={b.paymentStatus}
                          onChange={(e) => updatePaymentStatus(b.id, e.target.value as PaymentStatus)}
                          className="px-2.5 py-1 rounded text-[11px] font-mono border border-[#E7DED0] bg-white text-[#29241F] focus:outline-none cursor-pointer"
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pay at Hotel">Pay at Hotel</option>
                          <option value="Pending">Pending</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>

                      {/* Stay Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={b.bookingStatus}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className="px-2.5 py-1 rounded text-[11px] font-mono border border-[#E7DED0] bg-white text-[#29241F] focus:outline-none cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Checked-In">Checked-In</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedBookingForDetails(b)}
                            title="Inspect Folio"
                            className="p-1.5 rounded hover:bg-[#E7DED0]/50 text-[#777066] hover:text-[#29241F]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete reservation ${b.bookingCode}?`)) {
                                deleteBooking(b.id);
                              }
                            }}
                            title="Delete"
                            className="p-1.5 rounded hover:bg-rose-50 text-[#777066] hover:text-rose-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAILS MODAL */}
        {selectedBookingForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29241F]/80 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white border border-[#E7DED0] rounded-lg p-6 shadow-2xl space-y-5 text-[#29241F]">
              <div className="flex justify-between items-center pb-3 border-b border-[#E7DED0]">
                <div>
                  <span className="text-[10px] font-mono text-[#A77D4B] uppercase tracking-wider">
                    Reservation Detail Folio
                  </span>
                  <h3 className="text-xl font-normal font-serif-luxury text-[#29241F]">
                    {selectedBookingForDetails.bookingCode}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBookingForDetails(null)}
                  className="p-1.5 rounded hover:bg-[#E7DED0]/50 text-[#777066]"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-[#E7DED0]/60">
                  <span className="text-[#777066]">Guest Name</span>
                  <span className="font-medium text-[#29241F]">{selectedBookingForDetails.guestName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7DED0]/60">
                  <span className="text-[#777066]">Contact Email</span>
                  <span>{selectedBookingForDetails.guestEmail}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7DED0]/60">
                  <span className="text-[#777066]">Reserved Suite</span>
                  <span className="font-medium text-[#A77D4B]">{selectedBookingForDetails.roomName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7DED0]/60">
                  <span className="text-[#777066]">Assigned Room</span>
                  <span className="font-mono">{selectedBookingForDetails.roomNumberAssigned}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7DED0]/60">
                  <span className="text-[#777066]">Stay Duration</span>
                  <span className="font-mono">{selectedBookingForDetails.checkInDate} to {selectedBookingForDetails.checkOutDate} ({selectedBookingForDetails.nights} nights)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7DED0]/60">
                  <span className="text-[#777066]">Total Charged</span>
                  <span className="font-medium font-mono text-sm">{formatINR(selectedBookingForDetails.totalPrice)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7DED0]/60">
                  <span className="text-[#777066]">Payment Status</span>
                  <span className="font-mono">{selectedBookingForDetails.paymentStatus}</span>
                </div>
                {selectedBookingForDetails.specialRequests && (
                  <div className="pt-2">
                    <span className="text-[#777066] block mb-1 uppercase text-[10px] font-mono">Special Requests:</span>
                    <p className="p-3 rounded bg-[#F7F4EE] border border-[#E7DED0] text-[#29241F] italic text-[11px]">
                      "{selectedBookingForDetails.specialRequests}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E7DED0] flex justify-end">
                <button
                  onClick={() => setSelectedBookingForDetails(null)}
                  className="btn-outline-espresso"
                >
                  Close Folio
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
