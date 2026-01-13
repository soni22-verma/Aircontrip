import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/endpoint';

const AllBookings = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeType, setActiveType] = useState('all');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showFilters, setShowFilters] = useState(false);
    const [showBookingList, setShowBookingList] = useState(true);

    // Detect screen size changes
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setShowFilters(false);
                setShowBookingList(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to get unique bookings based on a unique identifier
    const getUniqueBookings = (bookings) => {
        if (!bookings || !Array.isArray(bookings)) return [];
        
        const uniqueMap = new Map();
        
        bookings.forEach(item => {
            const uniqueKey = item._id || 
                             `${item.bookingId}_${item.flightNumber}_${item.journeyDate}_${item.firstName}_${item.lastName}`;
            
            if (!uniqueMap.has(uniqueKey)) {
                uniqueMap.set(uniqueKey, item);
            }
        });
        
        return Array.from(uniqueMap.values());
    };

    // Function to filter only valid bookings with status
    const filterValidBookings = (bookings) => {
        return bookings.filter(item => {
            if (!item || typeof item !== 'object') return false;
            
            const hasRequiredFields = (
                item.firstName || 
                item.passengerName || 
                item.bookingId || 
                item._id ||
                item.flightNumber
            );
            
            const hasValidStatus = item.status && 
                ['confirmed', 'pending', 'completed', 'cancelled'].includes(item.status);
            
            return hasRequiredFields && hasValidStatus;
        });
    };

    const AllBookingDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(api.booking.bookingdetails);
            
            const rawBookings = res?.data?.booking || res?.data || [];
            
            const validBookings = filterValidBookings(rawBookings);
            const uniqueBookings = getUniqueBookings(validBookings);
            
            const sortedBookings = uniqueBookings.sort((a, b) => {
                const dateA = new Date(a.createdAt || a.bookingDate || 0);
                const dateB = new Date(b.createdAt || b.bookingDate || 0);
                return dateB - dateA;
            });
            
            setBooking(sortedBookings);
            
            if (sortedBookings.length > 0) {
                setSelectedBooking(sortedBookings[0]);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AllBookingDetails();
    }, []);

    // Filter bookings based on status and type
    const filteredBookings = useMemo(() => {
        return booking.filter(item => {
            if (!item || !item.status) return false;
            
            const statusMatch = activeFilter === 'all' || 
                              (activeFilter === 'confirmed' && item.status === 'confirmed') ||
                              (activeFilter === 'pending' && item.status === 'pending') ||
                              (activeFilter === 'completed' && item.status === 'completed') ||
                              (activeFilter === 'cancelled' && item.status === 'cancelled');
            
            const typeMatch = activeType === 'all' || 
                             (activeType === 'flight' && item.airline) ||
                             (activeType === 'hotel' && item.hotelName) ||
                             (activeType === 'bus' && item.busName) ||
                             (activeType === 'train' && item.trainName) ||
                             true;
            
            return statusMatch && typeMatch;
        });
    }, [booking, activeFilter, activeType]);

    // Calculate statistics
    const stats = useMemo(() => {
        return {
            totalBookings: booking.length,
            totalSpent: booking.reduce((sum, item) => sum + (parseFloat(item.totalPrice) || 0), 0),
            upcomingBookings: booking.filter(b => 
                b.status === 'confirmed' || b.status === 'pending'
            ).length,
            completedBookings: booking.filter(b => b.status === 'completed').length
        };
    }, [booking]);

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Get type icon
    const getTypeIcon = (item) => {
        if (item.airline || item.flightNumber) {
            return '✈️';
        }
        return '🎫';
    };

    // Get status text
    const getStatusText = (status) => {
        switch (status) {
            case 'confirmed': return 'Confirmed';
            case 'pending': return 'Pending';
            case 'completed': return 'Completed';
            case 'cancelled': return 'Cancelled';
            default: return status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';
        }
    };

    // Format date
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };

    // Generate booking ID
    const generateBookingId = (item, index) => {
        if (item.bookingId) return item.bookingId;
        if (item._id) return item._id.substring(0, 8).toUpperCase();
        return `BK${new Date().getFullYear()}${String(index + 1).padStart(3, '0')}`;
    };

    // Get booking type
    const getBookingType = (item) => {
        if (item.airline) return 'flight';
        if (item.hotelName) return 'hotel';
        if (item.busName) return 'bus';
        if (item.trainName) return 'train';
        return 'other';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6 mt-16 sm:mt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-sm sm:text-base text-gray-600">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    if (booking.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6 mt-16 sm:mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-6 sm:p-8 text-center">
                        <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">📋</div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">No Bookings Found</h2>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">You haven't made any bookings yet.</p>
                        <button
                            onClick={() => navigate('/flightdetails')}
                            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            + Make Your First Booking
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6 mt-20 sm:mt-20">
            <div className="max-w-7xl mx-auto">

                {/* Mobile Header Controls */}
                {isMobile && (
                    <div className="flex gap-2 mb-4 sticky top-16 z-10 bg-white p-2 rounded-lg shadow-sm">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-lg font-medium text-sm"
                        >
                            {showFilters ? 'Hide Filters ✕' : 'Show Filters ☰'}
                        </button>
                        <button
                            onClick={() => setShowBookingList(!showBookingList)}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm"
                        >
                            {showBookingList ? 'Hide List' : 'Show List'}
                        </button>
                    </div>
                )}

                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">📋 All Bookings</h1>
                            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">View and manage all your bookings</p>
                        </div>
                        <button
                            onClick={() => navigate('/flightdetails')}
                            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            + New Booking
                        </button>
                    </div>
                </div>

                {/* Stats Cards - Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {[
                        { label: 'Total Bookings', value: stats.totalBookings, icon: '🎫', color: 'blue' },
                        { label: 'Total Spent', value: `₹${stats.totalSpent.toLocaleString()}`, icon: '💰', color: 'green' },
                        { label: 'Upcoming', value: stats.upcomingBookings, icon: '📅', color: 'yellow' },
                        { label: 'Completed', value: stats.completedBookings, icon: '✅', color: 'purple' }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow p-3 sm:p-4 md:p-6">
                            <div className="flex items-center">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 md:mr-4`}>
                                    <span className="text-lg sm:text-xl md:text-2xl">{stat.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 ${isMobile ? (showFilters || showBookingList ? 'flex-col' : 'flex-col-reverse') : ''}`}>
                    {/* Left Column - Filters and List */}
                    <div className={`lg:col-span-1 ${isMobile && !showFilters && !showBookingList ? 'hidden' : ''} ${isMobile && showFilters ? 'order-1' : ''}`}>
                        {/* Filters - Show on mobile when toggled or always on desktop */}
                        {(isMobile ? showFilters : true) && (
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-5 mb-4 sm:mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">Filters</h2>
                                    {isMobile && (
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                {/* Status Filter */}
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Status</h3>
                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => setActiveFilter(status)}
                                                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium capitalize ${activeFilter === status
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {status === 'all' ? 'All' : getStatusText(status)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Type Filter */}
                                <div>
                                    <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Type</h3>
                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {['all', 'flight', 'hotel', 'bus', 'train'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setActiveType(type)}
                                                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium capitalize ${activeType === type
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {type === 'all' ? 'All' : 
                                                 type === 'flight' ? '✈️ Flight' : 
                                                 type === 'hotel' ? '🏨 Hotel' : 
                                                 type === 'bus' ? '🚌 Bus' : '🚆 Train'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bookings List - Show on mobile when toggled or always on desktop */}
                        {(isMobile ? showBookingList : true) && (
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                                        Bookings <span className="text-gray-500">({filteredBookings.length})</span>
                                    </h2>
                                    {isMobile && (
                                        <button
                                            onClick={() => setShowBookingList(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2">
                                    {filteredBookings.map((item, index) => (
                                        <div
                                            key={`${item._id || item.bookingId || index}_${item.createdAt}`}
                                            className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedBooking?._id === item._id
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            onClick={() => {
                                                setSelectedBooking(item);
                                                if (isMobile) setShowBookingList(false);
                                            }}
                                        >
                                            {/* Top Section */}
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center min-w-0">
                                                    <span className="text-lg sm:text-xl mr-2">{getTypeIcon(item)}</span>
                                                    <div className="min-w-0">
                                                        <h3 className="font-medium text-gray-800 truncate text-sm sm:text-base">
                                                            {item?.firstName} {item?.lastName}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {item.airline ? `${item.airline} ${item.flightNumber}` : 
                                                             item.hotelName ? `${item.hotelName}` :
                                                             item.busName ? `${item.busName}` :
                                                             item.trainName ? `${item.trainName}` : 'Booking'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} flex-shrink-0 ml-2`}
                                                >
                                                    {isMobile ? getStatusText(item.status).charAt(0) : getStatusText(item.status)}
                                                </span>
                                            </div>

                                            {/* Route/Details */}
                                            <div className="mb-2 sm:mb-3">
                                                <p className="text-xs sm:text-sm text-gray-800 truncate">
                                                    {item.from} → {item.to}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    📅 {formatDate(item.journeyDate || item.date || item.createdAt)}
                                                </p>
                                            </div>

                                            {/* Bottom */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    ₹{item.totalPrice || item.amount || 0}
                                                </span>
                                                <span className="text-xs text-gray-500 truncate ml-2">
                                                    {formatDate(item.createdAt || item.bookingDate)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Booking Details */}
                    <div className="lg:col-span-2">
                        {selectedBooking ? (
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
                                {/* Mobile back button */}
                                {isMobile && (showFilters || showBookingList) && (
                                    <button
                                        onClick={() => {
                                            setShowFilters(false);
                                            setShowBookingList(false);
                                        }}
                                        className="mb-4 text-blue-600 hover:text-blue-800 flex items-center text-sm"
                                    >
                                        ← Back to Details
                                    </button>
                                )}

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
                                    <div className="min-w-0">
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 truncate">Booking Details</h2>
                                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                                            ID: {selectedBooking._id || generateBookingId(selectedBooking, booking.indexOf(selectedBooking))}
                                        </p>
                                    </div>
                                    <div className="text-right min-w-0">
                                        <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-sm sm:text-base ${getStatusColor(selectedBooking.status)}`}>
                                            {getStatusText(selectedBooking.status)}
                                        </span>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Booked: {formatDate(selectedBooking.bookedon)}
                                        </p>
                                    </div>
                                </div>

                                {/* Booking Summary Card */}
                                <div
                                    className={`rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 ${selectedBooking.status === "confirmed"
                                        ? "bg-green-50 border border-green-200"
                                        : selectedBooking.status === "completed"
                                        ? "bg-blue-50 border border-blue-200"
                                        : "bg-gray-50 border border-gray-200"
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
                                        <div className="flex items-center min-w-0">
                                            <span className="text-2xl sm:text-3xl md:text-4xl mr-3 sm:mr-4">{getTypeIcon(selectedBooking)}</span>
                                            <div className="min-w-0">
                                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate capitalize">
                                                    {getBookingType(selectedBooking)} Booking
                                                </h3>
                                                <p className="text-sm sm:text-base text-gray-600 truncate">
                                                    {selectedBooking.from} → {selectedBooking.to}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right min-w-0">
                                            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                                                ₹{selectedBooking.totalPrice}
                                            </p>
                                            <p className="text-sm text-gray-600">Total Amount</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-600">Passenger Name</p>
                                            <p className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                                                {selectedBooking.firstName} {selectedBooking.lastName}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-600">Journey Date</p>
                                            <p className="text-base sm:text-lg font-semibold text-gray-800">
                                                {formatDate(selectedBooking.journeyDate || selectedBooking.date)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Information */}
                                <div className="mb-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                                        Booking Details
                                    </h3>

                                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            {/* Flight specific details */}
                                            {selectedBooking.airline && (
                                                <>
                                                    <div>
                                                        <p className="text-xs sm:text-sm text-gray-600">Airline</p>
                                                        <p className="text-sm sm:text-base font-medium text-gray-800 truncate">
                                                            {selectedBooking.airline}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-xs sm:text-sm text-gray-600">Flight Number</p>
                                                        <p className="text-sm sm:text-base font-medium text-gray-800">
                                                            {selectedBooking.flightNumber}
                                                        </p>
                                                    </div>

                                                    {selectedBooking.seatPreference && (
                                                        <div>
                                                            <p className="text-xs sm:text-sm text-gray-600">Seat Preference</p>
                                                            <p className="text-sm sm:text-base font-medium text-gray-800">
                                                                {selectedBooking.seatPreference}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {selectedBooking.mealPreference && (
                                                        <div>
                                                            <p className="text-xs sm:text-sm text-gray-600">Meal Preference</p>
                                                            <p className="text-sm sm:text-base font-medium text-gray-800">
                                                                {selectedBooking.mealPreference}
                                                            </p>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {/* Common details */}
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Booking Status</p>
                                                <p className={`text-sm sm:text-base font-medium capitalize ${getStatusColor(selectedBooking.status)} inline-block px-2 py-1 rounded-full`}>
                                                    {selectedBooking.status}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Booked On</p>
                                                <p className="text-sm sm:text-base font-medium text-gray-800">
                                                    {selectedBooking.bookedon}
                                                </p>
                                            </div>

                                            {selectedBooking.email && (
                                                <div>
                                                    <p className="text-xs sm:text-sm text-gray-600">Email</p>
                                                    <p className="text-sm sm:text-base font-medium text-gray-800 truncate">
                                                        {selectedBooking.email}
                                                    </p>
                                                </div>
                                            )}

                                            {selectedBooking.phone && (
                                                <div>
                                                    <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                                                    <p className="text-sm sm:text-base font-medium text-gray-800">
                                                        {selectedBooking.phone}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions - Responsive */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                                    <button className="flex-1 bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base flex items-center justify-center">
                                        <span className="mr-2">📄</span>
                                        Download Ticket
                                    </button>

                                    {selectedBooking.status === 'confirmed' || selectedBooking.status === 'pending' ? (
                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                                            <button className="flex-1 border border-yellow-600 text-yellow-600 py-2 sm:py-3 rounded-lg font-medium hover:bg-yellow-50 transition-colors text-sm sm:text-base">
                                                ✏️ Modify
                                            </button>
                                            <button className="flex-1 border border-red-600 text-red-600 py-2 sm:py-3 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm sm:text-base">
                                                ❌ Cancel
                                            </button>
                                        </div>
                                    ) : selectedBooking.status === 'completed' ? (
                                        <button className="flex-1 border border-green-600 text-green-600 py-2 sm:py-3 rounded-lg font-medium hover:bg-green-50 transition-colors text-sm sm:text-base">
                                            ⭐ Rate Experience
                                        </button>
                                    ) : selectedBooking.status === 'cancelled' ? (
                                        <button className="flex-1 border border-gray-600 text-gray-600 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base">
                                            📋 View Refund Status
                                        </button>
                                    ) : null}
                                </div>

                                {/* Timeline - Responsive */}
                                <div className="mt-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Booking Timeline</h3>
                                    <div className="relative pl-6 sm:pl-8">
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-0.5 bg-blue-200"></div>

                                        <div className="relative mb-6 sm:mb-8">
                                            <div className="absolute -left-4 sm:-left-9 w-4 h-4 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                                <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                            </div>
                                            <div className="pl-2 sm:pl-4">
                                                <p className="text-sm sm:text-base font-medium text-gray-800">Booking Created</p>
                                                <p className="text-xs text-gray-600">
                                                    {formatDate(selectedBooking.createdAt)}
                                                </p>
                                            </div>
                                        </div>

                                        {selectedBooking.status === 'confirmed' && (
                                            <div className="relative mb-6 sm:mb-8">
                                                <div className="absolute -left-4 sm:-left-9 w-4 h-4 sm:w-6 sm:h-6 bg-green-600 rounded-full flex items-center justify-center">
                                                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                                </div>
                                                <div className="pl-2 sm:pl-4">
                                                    <p className="text-sm sm:text-base font-medium text-gray-800">Booking Confirmed</p>
                                                    <p className="text-xs text-gray-600">
                                                        Shortly after booking
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {selectedBooking.status === 'completed' && (
                                            <div className="relative mb-6 sm:mb-8">
                                                <div className="absolute -left-4 sm:-left-9 w-4 h-4 sm:w-6 sm:h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                                </div>
                                                <div className="pl-2 sm:pl-4">
                                                    <p className="text-sm sm:text-base font-medium text-gray-800">Journey Completed</p>
                                                    <p className="text-xs text-gray-600">
                                                        After travel date
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {selectedBooking.status === 'cancelled' && (
                                            <div className="relative">
                                                <div className="absolute -left-4 sm:-left-9 w-4 h-4 sm:w-6 sm:h-6 bg-red-600 rounded-full flex items-center justify-center">
                                                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                                </div>
                                                <div className="pl-2 sm:pl-4">
                                                    <p className="text-sm sm:text-base font-medium text-gray-800">Booking Cancelled</p>
                                                    <p className="text-xs text-gray-600">
                                                        After cancellation
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-6 sm:p-8 text-center">
                                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">📋</div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Select a Booking</h2>
                                <p className="text-sm sm:text-base text-gray-600 mb-4">
                                    {isMobile ? 'Tap on a booking from the list' : 'Click on a booking from the list'} to view details
                                </p>
                                {isMobile && (
                                    <button
                                        onClick={() => setShowBookingList(true)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        Show Booking List
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllBookings;