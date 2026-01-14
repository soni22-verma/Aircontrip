import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Hotel, Bus, Train, Calendar, Clock, 
  MapPin, User, CreditCard, CheckCircle, XCircle,
  AlertCircle, TrendingUp, Filter, Menu, X,
  Download, Edit2, Star, ArrowLeft, ChevronRight
} from 'lucide-react';
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
    const [hoveredBooking, setHoveredBooking] = useState(null);

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

    // Function to get unique bookings
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

    // Get status color and icon
    const getStatusConfig = (status) => {
        switch (status) {
            case 'confirmed':
                return {
                    color: 'bg-gradient-to-r from-green-500 to-emerald-600',
                    text: 'Confirmed',
                    icon: <CheckCircle className="w-4 h-4" />,
                    bg: 'bg-green-50',
                    textColor: 'text-green-800'
                };
            case 'pending':
                return {
                    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
                    text: 'Pending',
                    icon: <Clock className="w-4 h-4" />,
                    bg: 'bg-yellow-50',
                    textColor: 'text-yellow-800'
                };
            case 'completed':
                return {
                    color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
                    text: 'Completed',
                    icon: <CheckCircle className="w-4 h-4" />,
                    bg: 'bg-blue-50',
                    textColor: 'text-blue-800'
                };
            case 'cancelled':
                return {
                    color: 'bg-gradient-to-r from-red-500 to-rose-600',
                    text: 'Cancelled',
                    icon: <XCircle className="w-4 h-4" />,
                    bg: 'bg-red-50',
                    textColor: 'text-red-800'
                };
            default:
                return {
                    color: 'bg-gradient-to-r from-gray-500 to-gray-600',
                    text: 'Unknown',
                    icon: <AlertCircle className="w-4 h-4" />,
                    bg: 'bg-gray-50',
                    textColor: 'text-gray-800'
                };
        }
    };

    // Get type icon
    const getTypeIcon = (item) => {
        if (item.airline || item.flightNumber) {
            return <Plane className="w-5 h-5" />;
        } else if (item.hotelName) {
            return <Hotel className="w-5 h-5" />;
        } else if (item.busName) {
            return <Bus className="w-5 h-5" />;
        } else if (item.trainName) {
            return <Train className="w-5 h-5" />;
        }
        return <CreditCard className="w-5 h-5" />;
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
        if (item.airline) return 'Flight';
        if (item.hotelName) return 'Hotel';
        if (item.busName) return 'Bus';
        if (item.trainName) return 'Train';
        return 'Other';
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const cardVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        hover: {
            y: -5,
            scale: 1.02,
            transition: {
                duration: 0.2
            }
        }
    };

    const filterVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const loadingVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    if (loading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-6 mt-20 flex items-center justify-center"
            >
                <div className="text-center">
                    <motion.div
                        variants={loadingVariants}
                        animate="animate"
                        className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg font-medium text-gray-700"
                    >
                        Loading your bookings...
                    </motion.p>
                </div>
            </motion.div>
        );
    }

    if (booking.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-6 mt-20"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 md:p-12 text-center border border-blue-100"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="text-6xl md:text-7xl mb-6"
                        >
                            📋
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            No Bookings Found
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start your journey by making your first booking
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/flightdetails')}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                        >
                            Make Your First Booking
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-6 mt-20"
        >
            <div className="max-w-7xl mx-auto">
                {/* Mobile Header Controls */}
                {isMobile && (
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex gap-2 mb-4 sticky top-16 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg"
                    >
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                        >
                            <Filter className="w-4 h-4" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowBookingList(!showBookingList)}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                            {showBookingList ? 'Hide List' : 'Show List'}
                        </motion.button>
                    </motion.div>
                )}

                {/* Header */}
                <motion.div 
                    variants={itemVariants}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                All Bookings
                            </h1>
                            <p className="text-gray-600">
                                View and manage all your travel arrangements
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/flightdetails')}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 w-full md:w-auto"
                        >
                            + New Booking
                        </motion.button>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                    {[
                        { 
                            label: 'Total Bookings', 
                            value: stats.totalBookings, 
                            icon: '🎫', 
                            color: 'from-blue-500 to-cyan-500',
                            gradient: 'bg-gradient-to-br'
                        },
                        { 
                            label: 'Total Spent', 
                            value: `₹${stats.totalSpent.toLocaleString()}`, 
                            icon: '💰', 
                            color: 'from-green-500 to-emerald-600',
                            gradient: 'bg-gradient-to-br'
                        },
                        { 
                            label: 'Upcoming', 
                            value: stats.upcomingBookings, 
                            icon: <Calendar className="w-6 h-6" />, 
                            color: 'from-orange-500 to-amber-500',
                            gradient: 'bg-gradient-to-br'
                        },
                        { 
                            label: 'Completed', 
                            value: stats.completedBookings, 
                            icon: <CheckCircle className="w-6 h-6" />, 
                            color: 'from-purple-500 to-violet-600',
                            gradient: 'bg-gradient-to-br'
                        }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className={`${stat.gradient} ${stat.color} rounded-2xl shadow-lg p-6 text-white`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm opacity-90">{stat.label}</p>
                                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                </div>
                                <div className="text-3xl">
                                    {stat.icon}
                                </div>
                            </div>
                            <motion.div 
                                className="h-1 bg-white/30 rounded-full mt-4"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <div className={`flex flex-col lg:grid lg:grid-cols-3 gap-6 ${isMobile ? (showFilters || showBookingList ? 'flex-col' : 'flex-col-reverse') : ''}`}>
                    {/* Left Column - Filters and List */}
                    <div className={`lg:col-span-1 ${isMobile && !showFilters && !showBookingList ? 'hidden' : ''} ${isMobile && showFilters ? 'order-1' : ''}`}>
                        <AnimatePresence>
                            {/* Filters */}
                            {(isMobile ? showFilters : true) && (
                                <motion.div
                                    variants={filterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                            <Filter className="w-5 h-5" />
                                            Filters
                                        </h2>
                                        {isMobile && (
                                            <button
                                                onClick={() => setShowFilters(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Status Filter */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Status
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map(status => (
                                                <motion.button
                                                    key={status}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setActiveFilter(status)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeFilter === status
                                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {status === 'all' ? 'All' : getStatusConfig(status).text}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Type Filter */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <CreditCard className="w-4 h-4" />
                                            Type
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['all', 'flight', 'hotel', 'bus', 'train'].map(type => (
                                                <motion.button
                                                    key={type}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setActiveType(type)}
                                                    className={`p-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${activeType === type
                                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {type === 'all' ? '🌍 All' : 
                                                     type === 'flight' ? '✈️ Flight' : 
                                                     type === 'hotel' ? '🏨 Hotel' : 
                                                     type === 'bus' ? '🚌 Bus' : '🚆 Train'}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Bookings List */}
                            {(isMobile ? showBookingList : true) && (
                                <motion.div
                                    variants={filterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            Bookings <span className="text-gray-500">({filteredBookings.length})</span>
                                        </h2>
                                        {isMobile && (
                                            <button
                                                onClick={() => setShowBookingList(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                        {filteredBookings.map((item, index) => {
                                            const statusConfig = getStatusConfig(item.status);
                                            return (
                                                <motion.div
                                                    key={`${item._id || item.bookingId || index}`}
                                                    variants={cardVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    whileHover="hover"
                                                    onMouseEnter={() => setHoveredBooking(item._id)}
                                                    onMouseLeave={() => setHoveredBooking(null)}
                                                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all overflow-hidden ${selectedBooking?._id === item._id
                                                        ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50"
                                                        : "border-gray-200 hover:border-blue-300"
                                                        }`}
                                                    onClick={() => {
                                                        setSelectedBooking(item);
                                                        if (isMobile) setShowBookingList(false);
                                                    }}
                                                >
                                                    {/* Background Animation */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"
                                                        initial={{ x: '-100%' }}
                                                        animate={{ 
                                                            x: hoveredBooking === item._id ? '0%' : '-100%',
                                                            transition: { duration: 0.3 }
                                                        }}
                                                    />

                                                    <div className="relative">
                                                        {/* Top Section */}
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="flex items-center min-w-0">
                                                                <div className={`p-2 rounded-lg ${selectedBooking?._id === item._id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                                    {getTypeIcon(item)}
                                                                </div>
                                                                <div className="ml-3 min-w-0">
                                                                    <h3 className="font-bold text-gray-900 truncate">
                                                                        {item?.firstName} {item?.lastName}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-600 truncate">
                                                                        {item.airline || item.hotelName || item.busName || item.trainName || 'Booking'}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <motion.div
                                                                whileHover={{ scale: 1.1 }}
                                                                className={`px-3 py-1 rounded-full flex items-center gap-1 ${statusConfig.bg} ${statusConfig.textColor}`}
                                                            >
                                                                {statusConfig.icon}
                                                                <span className="text-xs font-semibold">
                                                                    {isMobile ? statusConfig.text.charAt(0) : statusConfig.text}
                                                                </span>
                                                            </motion.div>
                                                        </div>

                                                        {/* Route/Details */}
                                                        <div className="mb-4">
                                                            <div className="flex items-center text-gray-700 mb-2">
                                                                <MapPin className="w-4 h-4 mr-2" />
                                                                <span className="text-sm">
                                                                    {item.from} → {item.to}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center text-gray-600">
                                                                <Calendar className="w-4 h-4 mr-2" />
                                                                <span className="text-xs">
                                                                    {formatDate(item.journeyDate || item.date || item.createdAt)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Bottom */}
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-lg font-bold text-gray-900">
                                                                ₹{item.totalPrice || item.amount || 0}
                                                            </span>
                                                            <motion.div
                                                                animate={{ 
                                                                    x: hoveredBooking === item._id ? 5 : 0,
                                                                    transition: { duration: 0.2 }
                                                                }}
                                                            >
                                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column - Booking Details */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {selectedBooking ? (
                                <motion.div
                                    key={selectedBooking._id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
                                >
                                    {/* Mobile back button */}
                                    {isMobile && (showFilters || showBookingList) && (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            onClick={() => {
                                                setShowFilters(false);
                                                setShowBookingList(false);
                                            }}
                                            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            Back to Details
                                        </motion.button>
                                    )}

                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                        <div className="min-w-0">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Details</h2>
                                            <div className="flex items-center gap-3">
                                                <div className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${getStatusConfig(selectedBooking.status).bg} ${getStatusConfig(selectedBooking.status).textColor}`}>
                                                    {getStatusConfig(selectedBooking.status).icon}
                                                    {getStatusConfig(selectedBooking.status).text}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    ID: {selectedBooking._id?.substring(0, 8).toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Booking Summary Card */}
                                    <motion.div
                                        initial={{ scale: 0.95 }}
                                        animate={{ scale: 1 }}
                                        className={`rounded-xl p-6 mb-8 bg-gradient-to-r ${selectedBooking.status === "confirmed" ? "from-green-50 to-emerald-50" : selectedBooking.status === "completed" ? "from-blue-50 to-indigo-50" : "from-gray-50 to-gray-100"} border-2 ${selectedBooking.status === "confirmed" ? "border-green-200" : selectedBooking.status === "completed" ? "border-blue-200" : "border-gray-200"}`}
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                                            <div className="flex items-center">
                                                <div className="p-4 rounded-xl bg-white shadow-md mr-4">
                                                    {getTypeIcon(selectedBooking)}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900">
                                                        {getBookingType(selectedBooking)} Booking
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {selectedBooking.from} → {selectedBooking.to}
                                                    </p>
                                                </div>
                                            </div>

                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="text-right bg-white rounded-xl p-4 shadow-md"
                                            >
                                                <p className="text-3xl font-bold text-gray-900">
                                                    ₹{selectedBooking.totalPrice}
                                                </p>
                                                <p className="text-sm text-gray-600">Total Amount</p>
                                            </motion.div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    <p className="text-sm text-gray-600">Passenger Name</p>
                                                </div>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {selectedBooking.firstName} {selectedBooking.lastName}
                                                </p>
                                            </div>

                                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Calendar className="w-4 h-4 text-gray-500" />
                                                    <p className="text-sm text-gray-600">Journey Date</p>
                                                </div>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {formatDate(selectedBooking.journeyDate || selectedBooking.date)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Detailed Information */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <CreditCard className="w-5 h-5" />
                                            Booking Information
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Flight specific details */}
                                            {selectedBooking.airline && (
                                                <>
                                                    <div className="bg-gray-50 rounded-xl p-4">
                                                        <p className="text-sm text-gray-600 mb-1">Airline</p>
                                                        <p className="font-medium text-gray-900">{selectedBooking.airline}</p>
                                                    </div>

                                                    <div className="bg-gray-50 rounded-xl p-4">
                                                        <p className="text-sm text-gray-600 mb-1">Flight Number</p>
                                                        <p className="font-medium text-gray-900">{selectedBooking.flightNumber}</p>
                                                    </div>
                                                </>
                                            )}

                                            {/* Common details */}
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <p className="text-sm text-gray-600 mb-1">Booking Date</p>
                                                <p className="font-medium text-gray-900">{formatDate(selectedBooking.bookedon)}</p>
                                            </div>

                                            {selectedBooking.email && (
                                                <div className="bg-gray-50 rounded-xl p-4">
                                                    <p className="text-sm text-gray-600 mb-1">Email</p>
                                                    <p className="font-medium text-gray-900 truncate">{selectedBooking.email}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-5 h-5" />
                                            Download Ticket
                                        </motion.button>

                                        {selectedBooking.status === 'confirmed' || selectedBooking.status === 'pending' ? (
                                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex-1 border-2 border-yellow-500 text-yellow-600 py-3 rounded-xl font-semibold hover:bg-yellow-50 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                    Modify
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex-1 border-2 border-red-500 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                    Cancel
                                                </motion.button>
                                            </div>
                                        ) : selectedBooking.status === 'completed' ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 border-2 border-green-500 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Star className="w-5 h-5" />
                                                Rate Experience
                                            </motion.button>
                                        ) : null}
                                    </div>

                                    {/* Timeline */}
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5" />
                                            Booking Timeline
                                        </h3>
                                        <div className="relative pl-8">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>

                                            {[
                                                {
                                                    status: 'created',
                                                    title: 'Booking Created',
                                                    date: formatDate(selectedBooking.createdAt),
                                                    color: 'from-blue-500 to-cyan-500'
                                                },
                                                ...(selectedBooking.status === 'confirmed' || selectedBooking.status === 'completed' ? [{
                                                    status: 'confirmed',
                                                    title: 'Booking Confirmed',
                                                    date: formatDate(selectedBooking.bookedon),
                                                    color: 'from-green-500 to-emerald-500'
                                                }] : []),
                                                ...(selectedBooking.status === 'completed' ? [{
                                                    status: 'completed',
                                                    title: 'Journey Completed',
                                                    date: formatDate(selectedBooking.journeyDate),
                                                    color: 'from-purple-500 to-violet-500'
                                                }] : []),
                                                ...(selectedBooking.status === 'cancelled' ? [{
                                                    status: 'cancelled',
                                                    title: 'Booking Cancelled',
                                                    date: formatDate(selectedBooking.updatedAt),
                                                    color: 'from-red-500 to-rose-500'
                                                }] : [])
                                            ].map((step, index) => (
                                                <motion.div
                                                    key={step.status}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="relative mb-8 last:mb-0"
                                                >
                                                    <div className={`absolute -left-10 w-6 h-6 rounded-full bg-gradient-to-r ${step.color} shadow-md flex items-center justify-center`}>
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    </div>
                                                    <div className="pl-4">
                                                        <p className="font-semibold text-gray-900">{step.title}</p>
                                                        <p className="text-sm text-gray-600">{step.date}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 md:p-12 text-center border border-blue-100"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="text-6xl mb-6"
                                    >
                                        📋
                                    </motion.div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                        Select a Booking
                                    </h2>
                                    <p className="text-gray-600 mb-8">
                                        {isMobile ? 'Tap' : 'Click'} on a booking from the list to view details
                                    </p>
                                    {isMobile && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowBookingList(true)}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                                        >
                                            Show Booking List
                                        </motion.button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AllBookings;