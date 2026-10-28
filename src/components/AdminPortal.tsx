import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import { BookingStatus, PaymentStatus } from '../types/hotel';
import {
  CalendarCheck,
  BedDouble,
  DollarSign,
  TrendingUp,
  Search,
  Eye,
  Trash2,
  FileSpreadsheet,
  ArrowLeft,
  Plus,
  Minus,
  Sparkles,
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

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | BookingStatus>('All');
  const [paymentFilter, setPaymentFilter] = useState<'All' | PaymentStatus>('All');
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<any | null>(null);

  // 1. Calculate Core Admin Metrics
  const totalBookingsCount = bookings.length;
  
  // Total payment collected (only 'Paid')
  const totalPaymentCollected = bookings
    .filter(b => b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  // Pending payments (e.g. 'Pay at Hotel' or 'Pending')
  const totalPendingPayment = bookings
    .filter(b => b.paymentStatus === 'Pending' || b.paymentStatus === 'Pay at Hotel')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  // Room Inventory Stats
  const totalRoomsCount = rooms.reduce((sum, r) => sum + r.totalInventory, 0);
  const totalAvailableRooms = rooms.reduce((sum, r) => sum + r.availableInventory, 0);
  const totalOccupiedRooms = Math.max(0, totalRoomsCount - totalAvailableRooms);
  const occupancyPercentage = Math.round((totalOccupiedRooms / totalRoomsCount) * 100);

  // Active checked in or confirmed count
  const activeBookingsCount = bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Checked-In').length;

  // Filter Bookings List
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

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Booking ID', 'Guest Name', 'Email', 'Room', 'Category', 'Check-In', 'Check-Out', 'Nights', 'Total Amount', 'Payment Status', 'Booking Status'];
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
    <div className="min-h-screen bg-[#102A26] text-[#F6F1E7] p-4 md:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#C6A76B]/25">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('guest')}
                className="p-2 rounded-xl bg-[#193B32] hover:bg-[#1f473c] text-[#C6A76B] border border-[#C6A76B]/40 transition-all flex items-center gap-1.5 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Guest Website</span>
              </button>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#193B32] text-[#C6A76B] border border-[#C6A76B]/40">
                EXECUTIVE MANAGEMENT SYSTEM
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-serif-luxury text-white mt-2">
              Benchmark Hotel Operations & Revenue Portal
            </h1>
            <p className="text-xs text-[#F6F1E7]/70 mt-1">
              Live suite inventory, financial metrics, reservations ledger & guest keycard management.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="py-2.5 px-4 rounded-xl bg-[#193B32] hover:bg-[#1f473c] text-white border border-[#C6A76B]/40 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#C6A76B]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setCurrentView('guest')}
              className="py-2.5 px-5 rounded-xl gold-gradient-btn text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>New Guest Booking</span>
            </button>
          </div>
        </div>

        {/* 4 HIGH-IMPACT KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* 1. Total Revenue Collected */}
          <div className="p-5 rounded-3xl bg-[#193B32] border border-[#C6A76B]/40 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider text-[#C6A76B] font-bold">Total Payments</span>
              <div className="w-10 h-10 rounded-2xl bg-[#102A26] border border-[#C6A76B]/40 flex items-center justify-center text-[#C6A76B]">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-[#C6A76B] font-serif-luxury tracking-tight">
                ${totalPaymentCollected.toLocaleString()}
              </span>
              <div className="flex items-center justify-between text-[11px] text-[#F6F1E7]/70 mt-2 pt-2 border-t border-[#C6A76B]/20">
                <span>Pending Settlement:</span>
                <span className="text-[#C6A76B] font-mono font-semibold">${totalPendingPayment.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 2. Total Bookings */}
          <div className="p-5 rounded-3xl bg-[#193B32] border border-[#C6A76B]/30 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider text-[#C6A76B] font-bold">Total Bookings</span>
              <div className="w-10 h-10 rounded-2xl bg-[#102A26] border border-[#C6A76B]/40 flex items-center justify-center text-[#C6A76B]">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-white font-serif-luxury tracking-tight">
                {totalBookingsCount}
              </span>
              <div className="flex items-center justify-between text-[11px] text-[#F6F1E7]/70 mt-2 pt-2 border-t border-[#C6A76B]/20">
                <span>Active / Confirmed:</span>
                <span className="text-white font-mono font-semibold">{activeBookingsCount} active</span>
              </div>
            </div>
          </div>

          {/* 3. Rooms Available vs Total */}
          <div className="p-5 rounded-3xl bg-[#193B32] border border-[#C6A76B]/30 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider text-[#C6A76B] font-bold">Rooms Available</span>
              <div className="w-10 h-10 rounded-2xl bg-[#102A26] border border-[#C6A76B]/40 flex items-center justify-center text-emerald-400">
                <BedDouble className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400 font-serif-luxury tracking-tight">
                  {totalAvailableRooms}
                </span>
                <span className="text-xs text-[#F6F1E7]/70">/ {totalRoomsCount} Suites</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#F6F1E7]/70 mt-2 pt-2 border-t border-[#C6A76B]/20">
                <span>Occupied / Reserved:</span>
                <span className="text-white font-mono font-semibold">{totalOccupiedRooms} occupied</span>
              </div>
            </div>
          </div>

          {/* 4. Occupancy Rate */}
          <div className="p-5 rounded-3xl bg-[#193B32] border border-[#C6A76B]/30 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider text-[#C6A76B] font-bold">Occupancy Rate</span>
              <div className="w-10 h-10 rounded-2xl bg-[#102A26] border border-[#C6A76B]/40 flex items-center justify-center text-[#C6A76B]">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-white font-serif-luxury tracking-tight">
                {occupancyPercentage}%
              </span>
              <div className="w-full bg-[#102A26] h-1.5 rounded-full overflow-hidden mt-2.5">
                <div 
                  className="bg-gradient-to-r from-[#C6A76B] to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${occupancyPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LIVE ROOM INVENTORY & AVAILABILITY MANAGER */}
        <div className="p-6 rounded-3xl bg-[#193B32] border border-[#C6A76B]/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h2 className="text-lg font-bold font-serif-luxury text-white flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-[#C6A76B]" />
                Live Room Inventory & Availability Controls
              </h2>
              <p className="text-xs text-[#F6F1E7]/70">
                Manage room capacities, adjust available inventory in real time, and monitor category occupancy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {rooms.map((room) => {
              const isLow = room.availableInventory <= 1;
              return (
                <div
                  key={room.id}
                  className="p-4 rounded-2xl bg-[#102A26] border border-[#C6A76B]/30 flex flex-col justify-between hover:border-[#C6A76B]/60 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#C6A76B]/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono text-[#C6A76B] font-semibold">{room.category}</span>
                        <span className="text-xs font-black text-[#F6F1E7] font-mono">${room.pricePerNight}/n</span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate mt-0.5">{room.name}</h4>
                      <p className="text-[11px] text-[#F6F1E7]/60 truncate">{room.floor}</p>
                    </div>
                  </div>

                  {/* Availability Counter Controller */}
                  <div className="mt-4 pt-3 border-t border-[#C6A76B]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#C6A76B] block uppercase font-mono">Available</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-base font-black font-mono ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {room.availableInventory}
                        </span>
                        <span className="text-xs text-[#F6F1E7]/60 font-mono">/ {room.totalInventory}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-[#193B32] rounded-xl p-1 border border-[#C6A76B]/30">
                      <button
                        onClick={() => updateRoomAvailability(room.id, room.availableInventory - 1)}
                        disabled={room.availableInventory <= 0}
                        title="Decrease available rooms"
                        className="p-1 rounded-lg hover:bg-[#102A26] text-white disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateRoomAvailability(room.id, room.availableInventory + 1)}
                        disabled={room.availableInventory >= room.totalInventory}
                        title="Increase available rooms"
                        className="p-1 rounded-lg hover:bg-[#102A26] text-white disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOOKINGS & RESERVATIONS LEDGER TABLE */}
        <div className="p-6 rounded-3xl bg-[#193B32] border border-[#C6A76B]/30 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold font-serif-luxury text-white flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-[#C6A76B]" />
                Reservations & Payment Status Ledger
              </h2>
              <p className="text-xs text-[#F6F1E7]/70">
                View customer bookings, update stay status, manage payments, and inspect folios.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-[#C6A76B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search guest, code, room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B]"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B]"
              >
                <option value="All">All Booking Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked-In">Checked-In</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* Payment Filter */}
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-[#102A26] border border-[#C6A76B]/40 text-[#F6F1E7] text-xs focus:outline-none focus:border-[#C6A76B]"
              >
                <option value="All">All Payment Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Pay at Hotel">Pay at Hotel</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-[#C6A76B]/25">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#102A26] text-[#C6A76B] font-mono uppercase tracking-wider text-[10px] border-b border-[#C6A76B]/25">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Guest Details</th>
                  <th className="py-3 px-4">Reserved Suite</th>
                  <th className="py-3 px-4">Dates & Nights</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4">Stay Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C6A76B]/15 bg-[#102A26]/40">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-[#F6F1E7]/50 text-xs">
                      No reservations match your search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#102A26]/80 transition-colors">
                      {/* Booking Code & Room Number */}
                      <td className="py-3.5 px-4 font-mono font-bold text-[#C6A76B]">
                        {b.bookingCode}
                        <span className="block text-[10px] text-[#F6F1E7]/60 font-normal">
                          {b.roomNumberAssigned || 'Auto-Assign'}
                        </span>
                      </td>

                      {/* Guest Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{b.guestName}</div>
                        <div className="text-[11px] text-[#F6F1E7]/70 truncate max-w-[180px]">{b.guestEmail}</div>
                      </td>

                      {/* Suite Name */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-white block truncate max-w-[160px]">{b.roomName}</span>
                        <span className="text-[10px] text-[#C6A76B] uppercase font-mono">{b.roomCategory}</span>
                      </td>

                      {/* Dates */}
                      <td className="py-3.5 px-4 text-[#F6F1E7]/80">
                        <div className="font-mono text-[11px]">{b.checkInDate} → {b.checkOutDate}</div>
                        <div className="text-[10px] text-[#F6F1E7]/60">{b.nights} night{b.nights > 1 ? 's' : ''}</div>
                      </td>

                      {/* Total Price */}
                      <td className="py-3.5 px-4">
                        <span className="font-black text-[#C6A76B] font-mono text-sm">
                          ${b.totalPrice.toLocaleString()}
                        </span>
                        <span className="block text-[10px] text-[#F6F1E7]/60 capitalize">{b.paymentMethod.replace('_', ' ')}</span>
                      </td>

                      {/* Payment Status Dropdown Selector */}
                      <td className="py-3.5 px-4">
                        <select
                          value={b.paymentStatus}
                          onChange={(e) => updatePaymentStatus(b.id, e.target.value as PaymentStatus)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-none transition-all cursor-pointer font-mono ${
                            b.paymentStatus === 'Paid'
                              ? 'bg-[#102A26] text-emerald-400 border-emerald-600'
                              : b.paymentStatus === 'Pay at Hotel'
                              ? 'bg-[#102A26] text-[#C6A76B] border-[#C6A76B]/60'
                              : b.paymentStatus === 'Pending'
                              ? 'bg-[#102A26] text-amber-400 border-amber-600'
                              : 'bg-[#102A26] text-rose-300 border-rose-600'
                          }`}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pay at Hotel">Pay at Hotel</option>
                          <option value="Pending">Pending</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>

                      {/* Stay Status Dropdown Selector */}
                      <td className="py-3.5 px-4">
                        <select
                          value={b.bookingStatus}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-none transition-all cursor-pointer font-mono ${
                            b.bookingStatus === 'Confirmed'
                              ? 'bg-[#102A26] text-[#C6A76B] border-[#C6A76B]/60'
                              : b.bookingStatus === 'Checked-In'
                              ? 'bg-[#102A26] text-sky-300 border-sky-600'
                              : b.bookingStatus === 'Completed'
                              ? 'bg-[#102A26] text-emerald-400 border-emerald-600'
                              : 'bg-[#102A26] text-rose-300 border-rose-600'
                          }`}
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
                            title="Inspect Booking Folio"
                            className="p-1.5 rounded-lg bg-[#102A26] hover:bg-[#14332c] text-[#C6A76B] border border-[#C6A76B]/30"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete reservation ${b.bookingCode}?`)) {
                                deleteBooking(b.id);
                              }
                            }}
                            title="Delete record"
                            className="p-1.5 rounded-lg bg-[#102A26] hover:bg-rose-950 text-[#F6F1E7]/60 hover:text-rose-300 border border-[#C6A76B]/20"
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

        {/* DETAILS MODAL FOR SELECTED BOOKING */}
        {selectedBookingForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-lg bg-[#102A26] border border-[#C6A76B]/50 rounded-3xl p-6 shadow-2xl space-y-5 text-[#F6F1E7]">
              <div className="flex justify-between items-center pb-3 border-b border-[#C6A76B]/20">
                <div>
                  <span className="text-[10px] font-mono text-[#C6A76B] uppercase tracking-widest font-bold">
                    Reservation Detail Folio
                  </span>
                  <h3 className="text-lg font-bold font-serif-luxury text-white">
                    {selectedBookingForDetails.bookingCode}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBookingForDetails(null)}
                  className="p-1.5 rounded-lg bg-[#193B32] text-white hover:text-[#C6A76B]"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-[#C6A76B]/15">
                  <span className="text-[#F6F1E7]/70">Guest Name</span>
                  <span className="font-semibold text-white">{selectedBookingForDetails.guestName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C6A76B]/15">
                  <span className="text-[#F6F1E7]/70">Contact Email</span>
                  <span className="text-white">{selectedBookingForDetails.guestEmail}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C6A76B]/15">
                  <span className="text-[#F6F1E7]/70">Reserved Suite</span>
                  <span className="font-semibold text-[#C6A76B]">{selectedBookingForDetails.roomName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C6A76B]/15">
                  <span className="text-[#F6F1E7]/70">Assigned Room</span>
                  <span className="font-mono text-white">{selectedBookingForDetails.roomNumberAssigned}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C6A76B]/15">
                  <span className="text-[#F6F1E7]/70">Stay Duration</span>
                  <span className="font-mono text-white">{selectedBookingForDetails.checkInDate} to {selectedBookingForDetails.checkOutDate} ({selectedBookingForDetails.nights} nights)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C6A76B]/15">
                  <span className="text-[#F6F1E7]/70">Total Charged</span>
                  <span className="font-black text-[#C6A76B] font-mono text-sm">${selectedBookingForDetails.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#C6A76B]/15">
                  <span className="text-[#F6F1E7]/70">Payment Status</span>
                  <span className="font-semibold text-emerald-400 font-mono">{selectedBookingForDetails.paymentStatus}</span>
                </div>
                {selectedBookingForDetails.specialRequests && (
                  <div className="pt-2">
                    <span className="text-[#C6A76B] block mb-1 font-mono uppercase text-[10px]">Guest Special Requests:</span>
                    <p className="p-3 rounded-xl bg-[#193B32] border border-[#C6A76B]/30 text-white italic text-[11px]">
                      "{selectedBookingForDetails.specialRequests}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#C6A76B]/20 flex justify-end">
                <button
                  onClick={() => setSelectedBookingForDetails(null)}
                  className="py-2.5 px-6 rounded-xl bg-[#193B32] hover:bg-[#1f473c] text-white text-xs font-semibold border border-[#C6A76B]/30"
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
