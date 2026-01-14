import React, { useEffect, useState, useRef } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FaUserLarge, FaPlane, FaCalendarCheck, FaRupeeSign, FaBars } from "react-icons/fa6";
import { LuLogOut, LuFileText, LuDownload, LuMenu } from "react-icons/lu";
import { HiTicket } from "react-icons/hi2";
import { MdOutlineFlightTakeoff, MdOutlineFlightLand, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/endpoint";
import axios from "axios";
import { logoutUser, setUser } from "../../store/userSlice";
import swal from "sweetalert"
import { toast } from "react-toastify";
import { FaCalendarAlt, FaCheckCircle, FaCreditCard, FaEnvelope, FaPassport, FaPhone, FaShieldAlt, FaStar, FaTimes, FaUser, FaChevronRight } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const Mobilebottom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showBooking, setShowBooking] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingTab, setBookingTab] = useState('current');
  const [profilePic, setProfilePic] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [loadingFlight, setLoadingFlight] = useState(false);
  const [drawerAnimating, setDrawerAnimating] = useState(false);
  const flightRef = useRef(null);
  const controls = useAnimation();

  const [passengerData, setPassengerData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    nationality: 'Indian',
    passportNumber: '',
    emergencyContact: '',
    specialRequests: ''
  });

  const currentBooking = {
    id: "BK202401021",
    flightNo: "AI-202",
    airline: "Air India",
    from: "Delhi (DEL)",
    to: "Mumbai (BOM)",
    date: "15 March 2024",
    time: "14:30",
    duration: "2h 15m",
    seat: "12A",
    class: "Economy",
    status: "Confirmed",
    fare: "₹4,850",
    gate: "3A",
    terminal: "T1",
    boardingTime: "13:45"
  };

  const bookingData = {
    current: [
      {
        id: "BK202401021",
        flightNo: "AI-202",
        from: "Delhi (DEL)",
        to: "Mumbai (BOM)",
        date: "15 March 2024",
        time: "14:30",
        status: "Confirmed",
        fare: "₹4,850"
      }
    ],
    upcoming: [
      {
        id: "BK202403011",
        flightNo: "AI-305",
        from: "Mumbai (BOM)",
        to: "Goa (GOI)",
        date: "5 April 2024",
        time: "09:15",
        status: "Confirmed",
        fare: "₹3,200"
      },
      {
        id: "BK202405151",
        flightNo: "6E-789",
        from: "Bangalore (BLR)",
        to: "Delhi (DEL)",
        date: "20 May 2024",
        time: "18:45",
        status: "Pending",
        fare: "₹5,100"
      }
    ],
    past: [
      {
        id: "BK202312151",
        flightNo: "6E-456",
        from: "Mumbai (BOM)",
        to: "Bangalore (BLR)",
        date: "25 Dec 2023",
        status: "Completed",
        fare: "₹3,650"
      },
      {
        id: "BK202311082",
        flightNo: "UK-789",
        from: "Delhi (DEL)",
        to: "Chennai (MAA)",
        date: "10 Nov 2023",
        status: "Completed",
        fare: "₹5,200"
      },
      {
        id: "BK202310153",
        flightNo: "SG-321",
        from: "Bangalore (BLR)",
        to: "Kolkata (CCU)",
        date: "20 Oct 2023",
        status: "Completed",
        fare: "₹4,100"
      }
    ]
  };

  const [flight, setFlight] = useState(null);

  const getCityName = (code) => {
    if (!code) return code || 'Unknown';
    
    const cities = [
      { code: 'DEL', name: 'Delhi' },
      { code: 'BOM', name: 'Mumbai' },
      { code: 'BLR', name: 'Bengaluru' },
      { code: 'HYD', name: 'Hyderabad' },
      { code: 'CCU', name: 'Kolkata' },
      { code: 'MAA', name: 'Chennai' },
      { code: 'AMD', name: 'Ahmedabad' },
      { code: 'PNQ', name: 'Pune' },
      { code: 'GOI', name: 'Goa' },
      { code: 'JAI', name: 'Jaipur' },
      { code: 'LKO', name: 'Lucknow' }
    ];
    
    const codeOnly = code.includes('(') 
      ? code.split('(')[1]?.replace(')', '').trim() 
      : code;
    
    const city = cities.find(c => c.code === codeOnly);
    return city ? city.name : code;
  };

  // Animation variants
  const bottomNavVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.1
      }
    }
  };

  const drawerVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.9, 
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    })
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  // Load flight from localStorage
  useEffect(() => {
    const loadFlightData = () => {
      const storedFlight = localStorage.getItem("selectedFlight");
      if (storedFlight) {
        try {
          const flightData = JSON.parse(storedFlight);
          console.log("Loaded flight from localStorage:", flightData);
          setFlight(flightData);
          flightRef.current = flightData;
        } catch (error) {
          console.error("Error parsing flight data:", error);
          toast.error("Error loading flight data");
        }
      }
    };

    loadFlightData();
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleStorageChange = (e) => {
    if (e.key === "selectedFlight") {
      const storedFlight = localStorage.getItem("selectedFlight");
      if (storedFlight) {
        try {
          const flightData = JSON.parse(storedFlight);
          setFlight(flightData);
          flightRef.current = flightData;
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  // Reload flight when modal opens
  useEffect(() => {
    if (showBookingForm) {
      const storedFlight = localStorage.getItem("selectedFlight");
      if (storedFlight) {
        try {
          const flightData = JSON.parse(storedFlight);
          setFlight(flightData);
          flightRef.current = flightData;
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  }, [showBookingForm]);

  const userStats = {
    totalBookings: 12,
    totalSpent: "₹56,800",
    loyaltyPoints: 2450,
    memberSince: "Jan 2023"
  };

  useEffect(() => {
    const savedProfilePic = localStorage.getItem("profilePic");
    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    }
  }, []);

  useEffect(() => {
    if (location.state?.openProfile) {
      setIsOpen(true);
    }
  }, [location.state]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleLogout = async () => {
    const willLogout = await swal({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willLogout) {
      swal("Logged out!", "You have been logged out successfully", "success");

      dispatch(logoutUser());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profilePic");
      localStorage.removeItem("bookingDetails");

      navigate("/login", { replace: true });
    }
  };

  const [bookingdata, setBookingdata] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    title: "Mr",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "Indian",
    passportNumber: "",
    passportExpiry: "",
    seatPreference: "No Preference",
    mealPreference: "Standard",
    specialrequest: "",
    bookedon: new Date().toISOString().split('T')[0]
  });

  const formatFlightPrice = (price) => {
    if (!price) return '0';
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const handleTicketBooking = async (e) => {
    e.preventDefault();

    if (!flight) {
      toast.error("Please select a flight first!");
      return;
    }

    if (!bookingdata.email || !bookingdata.phone || !bookingdata.firstName || !bookingdata.lastName || !bookingdata.title) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const token = localStorage.getItem("Authorization");

      const bookingPayload = {
        email: bookingdata.email,
        phone: bookingdata.phone,
        title: bookingdata.title,
        firstName: bookingdata.firstName,
        lastName: bookingdata.lastName,
        dateOfBirth: bookingdata.dateOfBirth || null,
        nationality: bookingdata.nationality || "Indian",
        passportNumber: bookingdata.passportNumber || "",
        passportExpiry: bookingdata.passportExpiry || null,
        seatPreference: bookingdata.seatPreference || "No Preference",
        mealPreference: bookingdata.mealPreference || "Standard",
        specialrequest: bookingdata.specialrequest || "",

        flightId: flight.id,
        flightNumber: flight.flightNo,
        airline: flight.airline,
        from: flight.from,
        to: flight.to,
        departureTime: flight.departure,
        arrivalTime: flight.arrival,
        journeyDate: flight.date,
        flightClass: flight.class,
        totalPrice: flight.price,
        duration: flight.duration,
        bookedon: new Date().toISOString()
      };

      const res = await axios.post(
        api.booking.ticketbooking,
        bookingPayload,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.data.success) {
        toast.success("Your Ticket is Confirmed, thank you! 😊");
        localStorage.removeItem("selectedFlight");
        setShowBookingForm(false);
        setIsOpen(false);

        navigate("/profile/travellerdetails", {
          state: {
            booking: res.data.booking,
            flightDetails: flight,
            email: res.data.booking.email,
          }
        });
      }

    } catch (error) {
      console.error("Booking error:", error.response?.data || error);
      toast.error(error?.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const activeClass = "text-blue-600";
  const inactiveClass = "text-gray-700";

  // Function to handle Book New Flight button
  const handleBookNewFlight = () => {
    const storedFlight = localStorage.getItem("selectedFlight");
    
    if (!storedFlight) {
      toast.error("Please select a flight first!");
      setTimeout(() => {
        navigate('/flightdetails');
        setIsOpen(false);
      }, 500);
      return;
    }
    
    try {
      const flightData = JSON.parse(storedFlight);
      setFlight(flightData);
      flightRef.current = flightData;
      
      setTimeout(() => {
        setShowBookingForm(true);
      }, 100);
      
    } catch (error) {
      console.error("Error parsing flight data:", error);
      toast.error("Error loading flight data. Please select a flight again.");
    }
  };

  // Quick Actions data
  const quickActions = [
    {
      title: "Booking History",
      icon: <HiTicket className="text-2xl text-blue-600" />,
      path: "/allbookingdetails"
    },
    {
      title: "Check-in",
      icon: <FaCalendarCheck className="text-2xl text-green-600" />,
      path: "/checkin"
    }
  ];

  // Menu items for drawer
  const menuItems = [
    {
      title: "My Bookings",
      icon: <HiTicket className="text-xl" />,
      action: () => setShowBooking(!showBooking)
    },
    {
      title: "Booking History",
      icon: <LuFileText className="text-xl" />,
      path: "/allbookingdetails"
    },
    {
      title: "Check-in",
      icon: <FaCalendarCheck className="text-xl" />,
      path: "/checkin"
    },
    {
      title: "Customer Support",
      icon: <RiCustomerServiceFill className="text-xl" />,
      path: "/customer"
    }
  ];

  // Handle Link click
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Handle drawer toggle with animation
  const handleDrawerToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setDrawerAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setDrawerAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="pt-1 overflow-y-scroll block md:hidden">
      {/* Bottom Navigation Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl md:hidden"
        initial="hidden"
        animate="visible"
        variants={bottomNavVariants}
      >
        <div className="flex justify-around items-center py-3 relative">
          {/* Floating indicator */}
          <motion.div 
            className="absolute top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: '33%' }}
            animate={{ x: location.pathname === '/' ? '0%' : location.pathname === '/customer' ? '100%' : '200%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex flex-col items-center relative py-2 ${isActive ? activeClass : inactiveClass} transition-all duration-300`}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <AiFillHome size={22} />
              {location.pathname === '/' && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                />
              )}
            </motion.div>
            <span className="text-xs font-medium mt-1">Home</span>
          </NavLink>

          <NavLink 
            to="/customer" 
            className={({ isActive }) => `flex flex-col items-center relative py-2 ${isActive ? activeClass : inactiveClass} transition-all duration-300`}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <RiCustomerServiceFill size={22} />
              {location.pathname === '/customer' && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                />
              )}
            </motion.div>
            <span className="text-xs font-medium mt-1">Support</span>
          </NavLink>

          <div 
            onClick={handleDrawerToggle} 
            className="flex flex-col items-center relative py-2 text-gray-700 cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              <FaUserLarge size={22} />
              {isOpen && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                />
              )}
            </motion.div>
            <span className="text-xs font-medium mt-1">Profile</span>
          </div>
        </div>
      </motion.div>

      {/* Profile Drawer from LEFT side */}
      <AnimatePresence>
        {isOpen && !drawerAnimating && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={handleDrawerToggle}
            />

            {/* Drawer - LEFT SIDE */}
            <motion.div
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-gradient-to-b from-white via-gray-50 to-blue-50 shadow-2xl z-[101] flex flex-col overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              {/* Header with Profile */}
              <div className="p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
                {/* Animated background elements */}
                <motion.div 
                  className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full"
                  animate={{ 
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    rotate: [0, 360, 0]
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                />
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <motion.h2 
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    My Profile
                  </motion.h2>
                  <motion.button
                    onClick={handleDrawerToggle}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MdClose className="text-white text-xl" />
                  </motion.button>
                </div>

                <motion.label 
                  htmlFor="profile-upload" 
                  className="cursor-pointer flex items-center space-x-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      {profilePic ? (
                        <motion.img
                          src={profilePic}
                          alt="Profile"
                          className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-2xl"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", delay: 0.3 }}
                        />
                      ) : (
                        <motion.div 
                          className="h-20 w-20 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl flex items-center justify-center border-4 border-white/30 shadow-2xl"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", delay: 0.3 }}
                        >
                          <FaUserLarge size={32} className="text-white" />
                        </motion.div>
                      )}
                      <motion.div 
                        className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaUser className="text-blue-600 text-xs" />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-white/80 mb-1">Tap to update photo</p>
                    <motion.h3 
                      className="text-xl font-bold text-white truncate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {user?.name || "Guest User"}
                    </motion.h3>
                    <motion.p 
                      className="text-white/90 text-sm truncate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {user?.email || "guest@example.com"}
                    </motion.p>
                    <motion.div 
                      className="flex items-center mt-2 space-x-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                        Member Since {userStats?.memberSince}
                      </span>
                    </motion.div>
                  </div>
                </motion.label>

                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();

                      reader.onload = (event) => {
                        setProfilePic(event.target.result);
                        localStorage.setItem("profilePic", event.target.result);
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              {/* Quick Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-3 p-4 bg-white/90 backdrop-blur-sm border-b border-gray-200"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { value: userStats.totalBookings, label: "Bookings", color: "from-blue-400 to-blue-600", icon: <HiTicket className="text-white" /> },
                  { value: userStats.totalSpent, label: "Spent", color: "from-green-400 to-green-600", icon: <FaRupeeSign className="text-white" /> },
                  { value: userStats.loyaltyPoints, label: "Points", color: "from-purple-400 to-purple-600", icon: <FaStar className="text-white" /> }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <div className="text-lg">
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* New Booking Button */}
              <motion.div
                className="px-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={handleBookNewFlight}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <FaPlane className="mr-3 text-lg relative z-10" />
                  <span className="relative z-10">Book New Flight</span>
                  <motion.div 
                    className="ml-2 relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    ✈️
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2 mb-6">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {item.path ? (
                        <Link
                          to={item.path}
                          onClick={handleLinkClick}
                          className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100"
                        >
                          <div className="flex items-center">
                            <div className="mr-4 text-gray-600 group-hover:text-blue-600 transition-colors">
                              {item.icon}
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.title}</span>
                          </div>
                          <FaChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                      ) : (
                        <button
                          onClick={item.action}
                          className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100"
                        >
                          <div className="flex items-center">
                            <div className="mr-4 text-gray-600 group-hover:text-blue-600 transition-colors">
                              {item.icon}
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.title}</span>
                          </div>
                          <FaChevronRight className={`text-gray-400 transition-all ${showBooking ? 'rotate-90' : ''}`} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* My Bookings Section */}
                <AnimatePresence>
                  {showBooking && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mb-6"
                    >
                      {/* Booking Tabs */}
                      <div className="flex border-b border-gray-200 mb-4">
                        {['current', 'upcoming', 'past'].map((tab, index) => (
                          <motion.button
                            key={tab}
                            onClick={() => setBookingTab(tab)}
                            className={`flex-1 py-3 text-sm font-medium relative ${bookingTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {tab === 'current' ? 'Current' : tab === 'upcoming' ? 'Upcoming' : 'Past'}
                            {bookingTab === tab && (
                              <motion.div 
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                                layoutId="activeTab"
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Booking Content */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={bookingTab}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          {bookingData[bookingTab].map((booking, index) => (
                            <motion.div
                              key={booking.id}
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.1 }}
                              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center mb-2">
                                    <FaPlane className="text-blue-500 mr-2" />
                                    <span className="font-bold text-gray-800">{booking.flightNo}</span>
                                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                      {booking.status}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600 mb-1">
                                    <span>{getCityName(booking.from)}</span>
                                    <FaPlane className="mx-2 text-xs" />
                                    <span>{getCityName(booking.to)}</span>
                                  </div>
                                  <p className="text-xs text-gray-500">{booking.date} {booking.time && `• ${booking.time}`}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-blue-700 text-lg">{booking.fare}</p>
                                  <Link
                                    to={`/booking-details/${booking.id}`}
                                    onClick={handleLinkClick}
                                    className="text-xs text-blue-600 hover:text-blue-800 transition-colors mt-1 inline-block"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* User Details */}
                <motion.div 
                  className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                    <FaUser className="mr-3 text-blue-500" />
                    Account Details
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: "Name", value: user?.name || "Not set" },
                      { label: "Email", value: user?.email || "Not set" },
                      { label: "Phone", value: user?.phone || "Not set" }
                    ].map((detail, index) => (
                      <motion.div 
                        key={index}
                        className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        <span className="text-gray-600 text-sm">{detail.label}</span>
                        <span className="font-semibold text-gray-800 text-sm">{detail.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer Actions */}
              <motion.div 
                className="border-t border-gray-200 p-4 bg-white/90 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleDrawerToggle}
                    className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MdClose className="text-lg" />
                    Close
                  </motion.button>
                  {isLoggedIn && (
                    <motion.button
                      onClick={handleLogout}
                      className="flex-1 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <LuLogOut size={18} className="relative z-10" />
                      <span className="relative z-10">Logout</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && flight && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200]"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={() => setShowBookingForm(false)}
            />

            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <div className="bg-gradient-to-b from-white to-gray-50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <FaPlane className="text-2xl text-white transform -rotate-45" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Complete Your Booking</h2>
                        <p className="text-blue-100">Fill passenger details to confirm your flight</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowBookingForm(false)}
                      className="p-3 hover:bg-white/20 rounded-full transition-colors"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes className="text-white text-xl" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Passenger Form */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Passenger Details Card */}
                      <motion.div 
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FaUser className="text-blue-600 text-xl" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">Passenger Details</h3>
                            <p className="text-gray-600">Primary traveller information</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                            <select
                              value={bookingdata.title}
                              onChange={(e) => setBookingdata({ ...bookingdata, title: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            >
                              <option value="Mr">Mr</option>
                              <option value="Mrs">Mrs</option>
                              <option value="Ms">Ms</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                            <input
                              type="text"
                              value={bookingdata.firstName}
                              onChange={(e) => setBookingdata({ ...bookingdata, firstName: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="Enter first name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                            <input
                              type="text"
                              value={bookingdata.lastName}
                              onChange={(e) => setBookingdata({ ...bookingdata, lastName: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="Enter last name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                            <div className="relative">
                              <input
                                type="date"
                                max={today}
                                value={bookingdata.dateOfBirth}
                                onChange={(e) => setBookingdata({ ...bookingdata, dateOfBirth: e.target.value })}
                                className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                              <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                            <div className="relative">
                              <input
                                type="email"
                                value={bookingdata.email}
                                onChange={(e) => setBookingdata({ ...bookingdata, email: e.target.value })}
                                className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="john@example.com"
                              />
                              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                            <div className="relative">
                              <input
                                type="tel"
                                value={bookingdata.phone}
                                onChange={(e) => setBookingdata({ ...bookingdata, phone: e.target.value })}
                                className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="+91 98765 43210"
                              />
                              <FaPhone className="absolute left-4 top-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Travel Documents Card */}
                      <motion.div 
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <FaPassport className="text-purple-600 text-xl" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">Travel Documents</h3>
                            <p className="text-gray-600">Passport & identification</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality</label>
                            <select
                              value={bookingdata.nationality}
                              onChange={(e) => setBookingdata({ ...bookingdata, nationality: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            >
                              <option value="Indian">Indian</option>
                              <option value="American">American</option>
                              <option value="British">British</option>
                              <option value="Canadian">Canadian</option>
                              <option value="Australian">Australian</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Passport Number</label>
                            <input
                              type="text"
                              value={bookingdata.passportNumber}
                              onChange={(e) => setBookingdata({ ...bookingdata, passportNumber: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="A12345678"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Passport Expiry</label>
                            <div className="relative">
                              <input
                                type="date"
                                min={today}
                                value={bookingdata.passportExpiry}
                                onChange={(e) => setBookingdata({ ...bookingdata, passportExpiry: e.target.value })}
                                className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                              <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column - Flight Summary */}
                    <div className="space-y-6">
                      {/* Flight Summary Card */}
                      <motion.div 
                        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-blue-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="font-bold text-gray-900 text-xl">Flight Summary</h3>
                            <p className="text-gray-600">
                              {getCityName(flight.from)} → {getCityName(flight.to)}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FaPlane className="text-blue-600 text-xl transform -rotate-45" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Airline</span>
                            <span className="font-semibold">{flight.airline}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Flight No.</span>
                            <span className="font-semibold">{flight.flightNo}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Date</span>
                            <span className="font-semibold">{flight.date || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Time</span>
                            <span className="font-semibold">{flight.departure} - {flight.arrival}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Class</span>
                            <span className="font-semibold">{flight.class || 'Economy'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Duration</span>
                            <span className="font-semibold">{flight.duration || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="border-t border-blue-200 mt-6 pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-gray-600">Total Amount</div>
                              <div className="text-3xl font-bold text-blue-600">
                                ₹{formatFlightPrice(flight.price)}
                              </div>
                            </div>
                            <div className="text-green-600 font-semibold">
                              <FaCheckCircle className="inline mr-1" />
                              Refundable
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.button
                          onClick={handleTicketBooking}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <GiConfirmed className="mr-3 text-xl" />
                          Confirm Booking
                        </motion.button>

                        <button
                          onClick={() => setShowBookingForm(false)}
                          className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </motion.div>

                      {/* Security Badge */}
                      <motion.div 
                        className="text-center pt-4 border-t border-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
                          <FaShieldAlt className="text-green-600" />
                          <span>Secure 256-bit SSL encryption</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mobilebottom;