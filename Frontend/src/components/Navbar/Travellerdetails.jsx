import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaPlane,
  FaUser,
  FaPassport,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPrint,
  FaDownload,
  FaHome,
  FaShieldAlt,
  FaQrcode,
  FaWhatsapp,
  FaEnvelopeOpen,
  FaStar,
  FaChevronLeft,
  FaShareAlt,
  FaClock,
  FaExclamationTriangle,
  FaRupeeSign,
  FaChair,
  FaBriefcase,
  FaCrown,
  FaTicketAlt,
  FaUserFriends,
  FaCalendarCheck,
  FaInfoCircle,
  FaChevronRight,
  FaSyncAlt,
  FaTimes
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import api from "../../../services/endpoint";
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -20 }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  },
  hover: { 
    y: -5,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }
};

const TravellerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingemail, setBookedUserEmail] = useState("");
  const user = useSelector((state) => state.user);
  const [passengerInfo, setPassengerInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('passengers');
  const [showQR, setShowQR] = useState(true);
  const [shareMenu, setShareMenu] = useState(false);
  
  // Get data from location state
  const { selectedFlight, flightDetails, passengers, travelClass, bookingId: locationBookingId } = location.state || {};

  // Animated particles for background
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10
  }));

  useEffect(() => {
    console.log(location.state?.email, "this is details of booking user");
    setBookedUserEmail(location?.state?.email);
    setBookingId(locationBookingId || "");
  }, [location.state?.email, locationBookingId]);

  // Check if we have flight data
  const hasFlightData = !!(selectedFlight || flightDetails);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Find latest booking by comparing dates
  const findLatestBooking = (bookings) => {
    if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
      return null;
    }

    const sortedBookings = [...bookings].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.bookedon || 0);
      const dateB = new Date(b.createdAt || b.bookedon || 0);
      return dateB - dateA;
    });

    console.log("Sorted bookings (latest first):", sortedBookings);
    return sortedBookings[0];
  };

  // Group passengers by booking
  const groupPassengersByBooking = (bookings) => {
    if (!bookings || !Array.isArray(bookings)) return [];

    const bookingGroups = {};
    
    bookings.forEach(booking => {
      const bookingKey = booking.bookingId || booking._id || booking.email + booking.journeyDate;
      
      if (!bookingGroups[bookingKey]) {
        bookingGroups[bookingKey] = {
          bookingId: booking._id,
          bookingDate: booking.createdAt || booking.bookedon,
          passengers: []
        };
      }
      
      bookingGroups[bookingKey].passengers.push(booking);
    });

    console.log("Booking groups:", bookingGroups);
    
    const bookingKeys = Object.keys(bookingGroups);
    if (bookingKeys.length === 0) return [];

    let latestBookingKey = bookingKeys[0];
    let latestDate = new Date(bookingGroups[latestBookingKey].bookingDate || 0);

    bookingKeys.forEach(key => {
      const bookingDate = new Date(bookingGroups[key].bookingDate || 0);
      if (bookingDate > latestDate) {
        latestDate = bookingDate;
        latestBookingKey = key;
      }
    });

    console.log("Latest booking group:", bookingGroups[latestBookingKey]);
    return bookingGroups[latestBookingKey]?.passengers || [];
  };

  // Filter only current booking passengers based on booking ID
  const filterCurrentBookingPassengers = (bookings) => {
    if (!bookings || !Array.isArray(bookings)) return [];

    if (bookingId) {
      const currentBookingPassengers = bookings.filter(
        booking => booking._id === bookingId || booking.bookingId === bookingId
      );
      console.log("Filtered by booking ID:", currentBookingPassengers);
      return currentBookingPassengers;
    }

    return groupPassengersByBooking(bookings);
  };

  // Flight info state
  const [flightInfo, setFlightInfo] = useState({
    flightNumber: flightDetails?.flightNumber || selectedFlight?.flightNo || "AI-202",
    airline: flightDetails?.airline || selectedFlight?.airline || "Air India",
    from: {
      city: flightDetails?.fromCity || "Delhi",
      code: flightDetails?.fromCode || selectedFlight?.from || "DEL",
      airport: "Indira Gandhi International Airport",
      terminal: "T3",
      date: flightDetails?.date || selectedFlight?.date || "20 Dec 2024",
      time: flightDetails?.departureTime || selectedFlight?.departure || "08:30 AM",
      gate: "Gate 12"
    },
    to: {
      city: flightDetails?.toCity || "Mumbai",
      code: flightDetails?.toCode || selectedFlight?.to || "BOM",
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      terminal: "T2",
      date: flightDetails?.date || selectedFlight?.date || "20 Dec 2024",
      time: flightDetails?.arrivalTime || selectedFlight?.arrival || "11:15 AM",
      gate: "Gate 45"
    },
    duration: flightDetails?.duration || selectedFlight?.duration || "2h 45m",
    distance: "1138 km",
    class: travelClass || flightDetails?.class || selectedFlight?.class || "Economy",
    price: flightDetails?.price || selectedFlight?.price || 4899,
    baggage: {
      cabin: "7 kg",
      checkin: flightDetails?.baggageAllowance || selectedFlight?.baggageAllowance || "15 kg"
    },
    seatsAvailable: flightDetails?.seatsAvailable || selectedFlight?.seatsAvailable || 25
  });

  // Booking details state
  const [bookingInfo, setBookingInfo] = useState({
    bookingId: `BOOK${Date.now().toString().slice(-8)}`,
    bookingDate: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    bookingTime: new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: "Confirmed",
    paymentStatus: "Paid",
    totalAmount: `₹${flightInfo.price * (passengers || 1)}`,
    paymentMethod: "Credit Card",
    transactionId: `TXN${Date.now()}`,
    pnrNumber: `PNR${Math.floor(100000000 + Math.random() * 900000000)}`,
    passengerCount: passengers || 1
  });

  // Calculate age
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    try {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age + " years";
    } catch (e) {
      return "N/A";
    }
  };

  // Fetch user booking details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const email = location.state?.email || user?.email;
        console.log("Fetching details for email:", email);
        
        if (!email) {
          console.error("No email found for fetching booking details");
          toast.error("Please provide email to fetch booking details");
          return;
        }

        const res = await axios.post(api.booking.userDetails, { email });
        console.log("Full API Response:", res.data);
        
        if (res.data.success && res.data.userDetails && Array.isArray(res.data.userDetails)) {
          console.log("All user bookings found:", res.data.userDetails.length);
          
          const currentBookingPassengers = filterCurrentBookingPassengers(res.data.userDetails);
          console.log("Current booking passengers:", currentBookingPassengers);
          
          if (currentBookingPassengers.length === 0) {
            toast.warning("No current booking found. Showing latest booking...");
            const latestBooking = findLatestBooking(res.data.userDetails);
            if (latestBooking) {
              setPassengerInfo([latestBooking]);
            } else {
              setPassengerInfo(res.data.userDetails.slice(0, 1));
            }
          } else {
            setPassengerInfo(currentBookingPassengers);
          }
          
          if (currentBookingPassengers.length > 0 || passengerInfo.length > 0) {
            const firstPassenger = currentBookingPassengers[0] || passengerInfo[0];
            console.log("First passenger for flight info:", firstPassenger);
            
            setFlightInfo({
              flightNumber: firstPassenger.flightNumber || selectedFlight?.flightNo || "AI-202",
              airline: firstPassenger.airline || selectedFlight?.airline || "Air India",
              from: {
                city: firstPassenger.fromCity || "Delhi",
                code: firstPassenger.from || selectedFlight?.from || "DEL",
                airport: "Indira Gandhi International Airport",
                terminal: "T3",
                date: formatDate(firstPassenger.journeyDate) || selectedFlight?.date || "20 Dec 2024",
                time: firstPassenger.departureTime || selectedFlight?.departure || "08:30 AM",
                gate: "Gate 12"
              },
              to: {
                city: firstPassenger.toCity || "Mumbai",
                code: firstPassenger.to || selectedFlight?.to || "BOM",
                airport: "Chhatrapati Shivaji Maharaj International Airport",
                terminal: "T2",
                date: formatDate(firstPassenger.journeyDate) || selectedFlight?.date || "20 Dec 2024",
                time: firstPassenger.arrivalTime || selectedFlight?.arrival || "11:15 AM",
                gate: "Gate 45"
              },
              duration: flightDetails?.duration || selectedFlight?.duration || "2h 45m",
              distance: "1138 km",
              class: travelClass || flightDetails?.class || selectedFlight?.class || "Economy",
              price: firstPassenger.totalPrice || flightDetails?.price || selectedFlight?.price || 4899,
              baggage: {
                cabin: "7 kg",
                checkin: flightDetails?.baggageAllowance || selectedFlight?.baggageAllowance || "15 kg"
              },
              seatsAvailable: flightDetails?.seatsAvailable || selectedFlight?.seatsAvailable || 25
            });

            if (firstPassenger._id) {
              const currentPassengers = currentBookingPassengers.length > 0 ? currentBookingPassengers : passengerInfo;
              
              setBookingInfo({
                bookingId: firstPassenger._id.substring(0, 8).toUpperCase() || `BOOK${Date.now().toString().slice(-8)}`,
                bookingDate: formatDate(firstPassenger.bookedon || firstPassenger.createdAt) || new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                }),
                bookingTime: formatTime(firstPassenger.bookedon || firstPassenger.createdAt) || new Date().toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit'
                }),
                status: firstPassenger.status || "Confirmed",
                paymentStatus: "Paid",
                totalAmount: `₹${firstPassenger.totalPrice || flightDetails?.price || selectedFlight?.price || 4899}`,
                paymentMethod: "Credit Card",
                transactionId: `TXN${Date.now()}`,
                pnrNumber: `PNR${Math.floor(100000000 + Math.random() * 900000000)}`,
                passengerCount: currentPassengers.length || passengers || 1
              });
            }
          }
        } else {
          console.error("No valid user details found in response");
          toast.error("No booking details found");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.email || user?.email) {
      fetchUserDetails();
    } else {
      toast.error("Email not found. Please login or provide email.");
      setLoading(false);
    }
  }, [location.state?.email, user?.email, bookingId]);

  const handleBookAnother = () => {
    navigate("/flightdetails");
  };

  const handlePrintTicket = () => {
    setIsPrinting(true);
    toast.info("🖨️ Preparing your ticket for print...");
    setTimeout(() => {
      setIsPrinting(false);
      toast.success("✅ Ticket ready for printing!");
      // Actual print logic here
      window.print();
    }, 1500);
  };

  const handleDownloadTicket = () => {
    setIsDownloading(true);
    toast.info("📥 Downloading your ticket...");
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("✅ Ticket downloaded successfully!");
      // Actual download logic here
    }, 1500);
  };

  const handleShareBooking = () => {
    setShareMenu(!shareMenu);
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'whatsapp':
        toast.info("📱 Sharing via WhatsApp...");
        break;
      case 'email':
        toast.info("📧 Sending via Email...");
        break;
      case 'copy':
        navigator.clipboard.writeText(`Booking ID: ${bookingInfo.bookingId}\nFlight: ${flightInfo.flightNumber}`);
        toast.success("📋 Booking details copied!");
        break;
      default:
        break;
    }
    setShareMenu(false);
  };

  // If no flight data
  if (!hasFlightData) {
    return (
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 pt-20 flex items-center justify-center p-4 mt-5"
      >
        <motion.div 
          variants={cardVariants}
          className="text-center max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
        >
          <motion.div
            animate={pulseAnimation}
            className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaExclamationTriangle className="text-yellow-600 text-4xl" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Flight Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select a flight first to view booking details.
          </p>
          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/flightdetails")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center group"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaPlane className="mr-3 group-hover:rotate-45 transition-transform duration-300" />
              </motion.div>
              Search Flights
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pt-20 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="relative">
            <motion.div
              animate={rotateAnimation}
              className="w-20 h-20 border-4 border-blue-600/30 border-t-blue-600 rounded-full mx-auto mb-4"
            />
            <motion.div
              animate={floatAnimation}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FaPlane className="text-blue-600 text-2xl transform -rotate-45" />
            </motion.div>
          </div>
          <p className="text-gray-600">Loading current booking details...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 pt-20 pb-12 -mt-2 relative overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 opacity-5"
        >
          <FaPlane className="text-6xl text-blue-500" />
        </motion.div>
      </div>

      <ToastContainer 
        position="top-right"
        theme="colored"
        newestOnTop
      />
      
      {/* Header */}
      <motion.div 
        variants={fadeInUp}
        className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-3 rounded-xl hover:bg-gray-100/50 transition-all duration-300"
            >
              <FaChevronLeft className="text-gray-700 text-lg" />
            </motion.button>
            <motion.div 
              variants={fadeInUp}
              className="text-center"
            >
              <h1 className="text-xl font-bold text-gray-900">Flight Booking Details</h1>
              <p className="text-sm text-gray-600">{bookingInfo.bookingId} • Current Booking</p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShareBooking}
              className="p-3 rounded-xl hover:bg-gray-100/50 transition-all duration-300 relative"
            >
              <FaShareAlt className="text-blue-600 text-lg" />
              <AnimatePresence>
                {shareMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl p-3 w-48 z-50"
                  >
                    <button
                      onClick={() => handleQuickAction('whatsapp')}
                      className="flex items-center w-full p-3 rounded-lg hover:bg-green-50 text-green-700 mb-2"
                    >
                      <FaWhatsapp className="mr-3" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleQuickAction('email')}
                      className="flex items-center w-full p-3 rounded-lg hover:bg-blue-50 text-blue-700 mb-2"
                    >
                      <FaEnvelopeOpen className="mr-3" />
                      Email
                    </button>
                    <button
                      onClick={() => handleQuickAction('copy')}
                      className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <FaCopy className="mr-3" />
                      Copy Details
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Success Banner */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200 rounded-3xl p-8 mb-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-600/5"></div>
          
          <motion.div
            animate={pulseAnimation}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <FaCheckCircle className="text-white text-3xl" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border-4 border-green-500/30 rounded-full"
              />
            </div>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl font-bold text-gray-900 mb-3"
          >
            Booking Confirmed! 🎉
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-gray-600 mb-6 text-lg"
          >
            Your {flightInfo.airline} flight has been booked successfully
          </motion.p>
          
          <motion.div
            variants={fadeInUp}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg"
          >
            Booking ID: {bookingInfo.bookingId}
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2"
          >
            <FaTicketAlt className="text-blue-500" />
            Current Booking • {passengerInfo.length} Passenger(s)
            <FaUserFriends className="text-purple-500" />
          </motion.p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          variants={fadeInUp}
          className="flex border-b mb-8 bg-white/50 backdrop-blur-sm rounded-t-2xl p-1"
        >
          {['flight', 'passengers', 'summary'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'flight' ? 'Flight Details' : 
               tab === 'passengers' ? 'Passengers' : 
               'Booking Summary'}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'flight' && (
            <motion.div
              key="flight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <FaPlane className="text-blue-600 mr-3 text-2xl" />
                Flight Details
              </h2>
              
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <motion.div 
                  variants={fadeInLeft}
                  className="text-center md:text-left mb-8 md:mb-0"
                >
                  <div className="text-4xl font-bold text-gray-900">{flightInfo.from.time}</div>
                  <div className="text-gray-600">{flightInfo.from.date}</div>
                  <div className="font-semibold text-gray-800 mt-3 text-xl">{flightInfo.from.city}</div>
                  <div className="text-sm text-gray-500">({flightInfo.from.code})</div>
                  <div className="mt-2 text-xs text-gray-500">{flightInfo.from.terminal}</div>
                </motion.div>
                
                <div className="flex-1 mx-4 mb-8 md:mb-0">
                  <div className="relative">
                    <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                    <motion.div
                      animate={{ x: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/2 left-0 transform -translate-y-1/2"
                    >
                      <FaPlane className="text-blue-600 text-xl transform -rotate-45 shadow-lg" />
                    </motion.div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-lg"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-pink-600 rounded-full shadow-lg"></div>
                  </div>
                  <div className="text-center mt-4">
                    <div className="font-bold text-gray-700 text-lg">{flightInfo.duration}</div>
                    <div className="text-sm text-gray-500">Direct • {flightInfo.distance}</div>
                  </div>
                </div>
                
                <motion.div 
                  variants={fadeInRight}
                  className="text-center md:text-right"
                >
                  <div className="text-4xl font-bold text-gray-900">{flightInfo.to.time}</div>
                  <div className="text-gray-600">{flightInfo.to.date}</div>
                  <div className="font-semibold text-gray-800 mt-3 text-xl">{flightInfo.to.city}</div>
                  <div className="text-sm text-gray-500">({flightInfo.to.code})</div>
                  <div className="mt-2 text-xs text-gray-500">{flightInfo.to.terminal}</div>
                </motion.div>
              </div>
              
              {/* Flight Info Grid */}
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                {[
                  { label: 'Flight No.', value: flightInfo.flightNumber, icon: FaPlane, color: 'blue' },
                  { label: 'Airline', value: flightInfo.airline, icon: FaCrown, color: 'purple' },
                  { label: 'Class', value: flightInfo.class, icon: FaChair, color: 'green' },
                  { label: 'Baggage', value: flightInfo.baggage.checkin, icon: FaBriefcase, color: 'orange' }
                ].map((info, index) => (
                  <motion.div
                    key={info.label}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className={`bg-gradient-to-b from-${info.color}-50 to-white p-5 rounded-2xl border border-${info.color}-100 shadow-sm`}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 bg-${info.color}-100 rounded-xl flex items-center justify-center mr-3`}>
                        <info.icon className={`text-${info.color}-600`} />
                      </div>
                      <div className="text-sm text-gray-600">{info.label}</div>
                    </div>
                    <div className="font-bold text-gray-900 text-lg">{info.value}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Price Section */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-2xl border border-blue-200/50 backdrop-blur-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Total Fare</div>
                    <div className="text-3xl font-bold text-blue-600">{bookingInfo.totalAmount}</div>
                  </div>
                  <motion.div
                    animate={pulseAnimation}
                    className="text-right"
                  >
                    <div className="text-sm text-gray-600">Passengers</div>
                    <div className="text-2xl font-bold text-green-600 flex items-center">
                      {passengerInfo.length}
                      <FaUserFriends className="ml-2 text-green-500" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'passengers' && (
            <motion.div
              key="passengers"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <FaUser className="text-blue-600 mr-3 text-2xl" />
                Passenger Details {passengerInfo.length > 0 && `(${passengerInfo.length})`}
              </h2>
              
              {passengerInfo.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    animate={floatAnimation}
                  >
                    <FaUser className="text-gray-300 text-6xl mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-600 mb-6">No current booking found</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/flightdetails")}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Book New Flight
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-8">
                  {passengerInfo.map((passenger, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.01, y: -3 }}
                      className="border border-gray-200/50 rounded-2xl p-8 bg-gradient-to-b from-white to-gray-50/50 shadow-lg"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {passenger.title} {passenger.firstName} {passenger.lastName}
                            <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              Passenger {index + 1}
                            </span>
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                            <span className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                              <FaCalendarAlt className="mr-2 text-blue-500" />
                              Age: {calculateAge(passenger.dateOfBirth)}
                            </span>
                            <span className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                              <FaMapMarkerAlt className="mr-2 text-green-500" />
                              {passenger.nationality || "Indian"}
                            </span>
                            <span className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                              <FaTicketAlt className="mr-2 text-purple-500" />
                              Status: {passenger.status || "Confirmed"}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="mt-4 md:mt-0"
                        >
                          <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                            ✓ Confirmed
                          </div>
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <motion.div 
                            variants={fadeInLeft}
                            className="flex items-center p-4 bg-blue-50/50 rounded-xl"
                          >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                              <FaPassport className="text-blue-600 text-xl" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Passport Number</div>
                              <div className="font-bold text-lg">{passenger.passportNumber || "N/A"}</div>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            variants={fadeInLeft}
                            className="flex items-center p-4 bg-purple-50/50 rounded-xl"
                          >
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                              <FaCalendarAlt className="text-purple-600 text-xl" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Passport Expiry</div>
                              <div className="font-bold text-lg">{passenger.passportExpiry || "N/A"}</div>
                            </div>
                          </motion.div>
                        </div>
                        
                        <div className="space-y-6">
                          <motion.div 
                            variants={fadeInRight}
                            className="flex items-center p-4 bg-green-50/50 rounded-xl"
                          >
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                              <FaEnvelope className="text-green-600 text-xl" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Email</div>
                              <div className="font-bold text-lg truncate">{passenger.email || "N/A"}</div>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            variants={fadeInRight}
                            className="flex items-center p-4 bg-red-50/50 rounded-xl"
                          >
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                              <FaPhone className="text-red-600 text-xl" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Phone</div>
                              <div className="font-bold text-lg">{passenger.phone || "N/A"}</div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Preferences */}
                      {passenger.seatPreference || passenger.mealPreference || passenger.specialrequest ? (
                        <motion.div 
                          variants={fadeInUp}
                          className="mt-8 pt-8 border-t border-gray-200"
                        >
                          <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                            <FaStar className="mr-2 text-yellow-500" />
                            Travel Preferences
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {passenger.seatPreference && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-sm font-medium flex items-center shadow-sm"
                              >
                                <FaChair className="mr-2" />
                                {passenger.seatPreference} Seat
                              </motion.div>
                            )}
                            {passenger.mealPreference && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-sm font-medium flex items-center shadow-sm"
                              >
                                🍽️
                                <span className="ml-2">{passenger.mealPreference} Meal</span>
                              </motion.div>
                            )}
                            {passenger.specialrequest && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 rounded-full text-sm font-medium flex items-center shadow-sm"
                              >
                                <FaStar className="mr-2" />
                                Special Request
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Current Booking Summary</h2>
              
              <div className="space-y-4">
                {[
                  { label: 'Flight', value: flightInfo.flightNumber, icon: FaPlane },
                  { label: 'Route', value: `${flightInfo.from.code} → ${flightInfo.to.code}`, icon: FaMapMarkerAlt },
                  { label: 'Date', value: flightInfo.from.date, icon: FaCalendarAlt },
                  { label: 'Time', value: `${flightInfo.from.time} - ${flightInfo.to.time}`, icon: FaClock },
                  { label: 'Passengers', value: passengerInfo.length.toString(), icon: FaUserFriends },
                  { label: 'Booking ID', value: bookingInfo.bookingId, icon: FaTicketAlt },
                  { label: 'PNR', value: bookingInfo.pnrNumber, icon: FaInfoCircle },
                  { label: 'Status', value: bookingInfo.status, icon: FaCheckCircle },
                  ...(passengerInfo.length > 0 && passengerInfo[0].bookedon ? 
                    [{ label: 'Booked On', value: formatDate(passengerInfo[0].bookedon), icon: FaCalendarCheck }] : 
                    []
                  )
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 group"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
                        <item.icon className="text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                    <span className={`font-bold ${item.label === 'Booking ID' ? 'text-blue-600' : 'text-gray-900'}`}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                variants={fadeInUp}
                className="mt-10 pt-8 border-t border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes and fees</p>
                  </div>
                  <motion.div
                    animate={pulseAnimation}
                    className="text-right"
                  >
                    <div className="text-4xl font-bold text-green-600">{bookingInfo.totalAmount}</div>
                    <div className="text-sm text-gray-500 mt-1">Payment Status: {bookingInfo.paymentStatus}</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            disabled={isPrinting}
            onClick={handlePrintTicket}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-70 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isPrinting ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                <span className="relative z-10">Printing...</span>
              </>
            ) : (
              <>
                <FaPrint className="relative z-10" />
                <span className="relative z-10">Print Ticket</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            disabled={isDownloading}
            onClick={handleDownloadTicket}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-70 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isDownloading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                <span className="relative z-10">Downloading...</span>
              </>
            ) : (
              <>
                <FaDownload className="relative z-10" />
                <span className="relative z-10">Download Ticket</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookAnother}
            className="w-full py-4 border-2 border-blue-500 text-blue-600 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-50 transition-all group"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaPlane className="group-hover:rotate-45 transition-transform duration-300" />
            </motion.div>
            <span>Book Another</span>
          </motion.button>
        </motion.div>

        {/* QR Code Section */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FaQrcode className="text-blue-600 text-2xl mr-3" />
                  <h3 className="font-bold text-gray-900 text-xl">Digital Boarding Pass</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowQR(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="text-gray-400" />
                </motion.button>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white border-4 border-blue-200 rounded-2xl shadow-lg inline-block"
                  >
                    <QRCodeSVG 
                      value={`FLIGHT:${flightInfo.flightNumber}:${flightInfo.from.code}:${flightInfo.to.code}:${bookingInfo.bookingId}`}
                      size={180}
                      level="H"
                      bgColor="#FFFFFF"
                      fgColor="#1e40af"
                    />
                  </motion.div>
                  <p className="text-sm text-gray-600 mt-4">
                    Show this QR code at airport check-in
                  </p>
                </div>
                
                <div className="flex-1">
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="text-sm text-gray-600">Scanning Locations</div>
                      <div className="font-bold text-gray-900 mt-2">
                        • Airport Entry Gate<br/>
                        • Security Checkpoint<br/>
                        • Boarding Gate
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-sm text-gray-600">Benefits</div>
                      <div className="font-bold text-gray-900 mt-2">
                        • Contactless Check-in<br/>
                        • Faster Boarding<br/>
                        • Digital Convenience
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Banner */}
        <motion.div
          variants={fadeInUp}
          className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6"
        >
          <div className="flex items-start">
            <FaInfoCircle className="text-blue-600 text-xl mr-4 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Important Information</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Check-in opens 48 hours before departure</li>
                <li>• Arrive at airport at least 3 hours before flight</li>
                <li>• Carry original ID proof and this ticket copy</li>
                <li>• For any queries, contact airline customer service</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TravellerDetails;