import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FaUserLarge, FaPlane, FaCalendarCheck, FaRupeeSign } from "react-icons/fa6";
import { LuLogOut, LuFileText, LuDownload } from "react-icons/lu";
import { HiTicket } from "react-icons/hi2";
import { MdOutlineFlightTakeoff, MdOutlineFlightLand } from "react-icons/md";
// import { TbSeat } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/endpoint";
import axios from "axios";
import { logoutUser, setUser } from "../../store/userSlice";
import swal from "sweetalert"
import { toast } from "react-toastify";
import { FaCalendarAlt, FaCheckCircle, FaCreditCard, FaEnvelope, FaPassport, FaPhone, FaShieldAlt, FaStar, FaTimes, FaUser } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const Mobilebottom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showBooking, setShowBooking] = useState(false);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingTab, setBookingTab] = useState('current'); // 'current', 'upcoming', 'past'


  const [profilePic, setProfilePic] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
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


  const [flight, setFlight] = useState(null)
  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    if (storedFlight) {
      try {
        const flightData = JSON.parse(storedFlight);
        console.log("Loaded flight from localStorage:", flightData);
        setFlight(flightData);
      } catch (error) {
        console.error("Error parsing flight data:", error);
      }
    }
  }, []);



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
      setUser(JSON.parse(storedUser));
    }
  }, []);


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

      setUser({ name: "", email: "", phone: "" });

      setProfilePic(null);
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
      { code: 'HBD', name: 'Hydrabad' },
      { code: 'GOI', name: 'Goa' },
      { code: 'JAI', name: 'Jaipur' },
      { code: 'LKO', name: 'Lucknow' }
    ];

    // Agar code full city name hai (like "Delhi (DEL)"), toh split karo
    const codeOnly = code.includes('(')
      ? code.split('(')[1]?.replace(')', '').trim()
      : code;

    const city = cities.find(c => c.code === codeOnly);
    return city ? city.name : code;
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

        // Flight details
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

      console.log("Sending booking data:", bookingPayload);

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

      console.log("Booking response:", res.data);

      if (res.data.success) {
        toast.success("Your Ticket is Confirmed, thank you! 😊");
        localStorage.removeItem("selectedFlight");

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
  }
  const today = new Date().toISOString().split("T")[0];



  const activeClass = "text-blue-600";
  const inactiveClass = "text-gray-900";

  return (
    <div className="pt-16 min-h-screen overflow-y-scroll block md:hidden">
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md md:hidden">
        <div className="flex justify-around items-center py-2">
          <NavLink to="/" className={({ isActive }) => `flex flex-col items-center ${isActive ? activeClass : inactiveClass}`}>
            <AiFillHome size={20} />
            <span className="text-sm">Home</span>
          </NavLink>

          <NavLink to="/customer" className={({ isActive }) => `flex flex-col items-center ${isActive ? activeClass : inactiveClass}`}>
            <RiCustomerServiceFill size={20} />
            <span className="text-sm">Support</span>
          </NavLink>

          <div onClick={() => setIsOpen(true)} className="flex flex-col items-center text-gray-700">
            <FaUserLarge size={20} />
            <span className="text-sm">Profile</span>
          </div>
        </div>
      </div>

      {/* Profile Drawer */}
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header with Profile */}
          <div className="p-5 bg-linear-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>

            <label htmlFor="profile-upload" className="cursor-pointer flex items-center space-x-4">
              <div className="relative">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <FaUserLarge size={32} className="text-white" />
                  </div>
                )}

              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Tap to update photo</p>
                <h3 className="text-xl font-bold text-gray-800">{user?.name || "Guest User"}</h3>
                <p className="text-gray-600">{user?.email || "guest@example.com"}</p>
                <div className="flex items-center mt-2 space-x-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Member Since {userStats?.memberSince}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {userStats?.loyaltyPoints} Points
                  </span>
                </div>
              </div>
            </label>

            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              src={
                user
                  ? profilePic || "/default-avatar.png"
                  : "/default-avatar.png"
              }
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
          <div className="grid grid-cols-3 gap-2 p-4 bg-white border-b">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">{userStats.totalBookings}</p>
              <p className="text-xs text-gray-600">Total Bookings</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">{userStats.totalSpent}</p>
              <p className="text-xs text-gray-600">Total Spent</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">{userStats.loyaltyPoints}</p>
              <p className="text-xs text-gray-600">Loyalty Points</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* New Booking Button */}
            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full mb-6 bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
            >
              <FaPlane className="mr-2" />
              Book New Flight
            </button>

            {/* Booking Form Modal */}
            {showBookingForm && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden shadow-xl sm:shadow-2xl flex flex-col transform transition-all duration-300 scale-95 sm:scale-100 mx-2 sm:mx-0">

                  {/* Header with Gradient */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                        <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl backdrop-blur-sm">
                          <FaPlane className="text-lg sm:text-xl md:text-2xl transform -rotate-45" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate">
                            Complete Your Flight Booking
                          </h2>
                          <p className="text-blue-100 opacity-90 text-xs sm:text-sm md:text-base truncate">
                            Fill in passenger details to confirm your booking
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowBookingForm(false)}
                        className="p-2 sm:p-3 hover:bg-white/20 rounded-full transition-colors flex-shrink-0 ml-2"
                      >
                        <FaTimes className="text-lg sm:text-xl md:text-2xl" />
                      </button>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 md:p-6 lg:p-8">

                      {/* Left Column - Passenger Form */}
                      <div className="lg:col-span-8 space-y-4 sm:space-y-6 md:space-y-8">

                        {/* Primary Passenger */}
                        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8">
                          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                              <FaUser className="text-blue-600 text-sm sm:text-base md:text-xl" />
                            </div>
                            <div>
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                                Primary Passenger
                              </h3>
                              <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                                Main traveller details
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Title
                              </label>
                              <select
                                name="title"
                                value={bookingdata.title}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, title: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              >
                                <option>Select</option>
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Ms</option>
                              </select>
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                First Name *
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={bookingdata.firstName}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, firstName: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="John"
                              />
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={bookingdata.lastName}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, lastName: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Doe"
                              />
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Date of Birth
                              </label>
                              <div className="relative">
                                <input
                                  type="date"
                                  name="dateOfBirth"
                                  max={today} // Add max date validation
                                  value={bookingdata.dateOfBirth}
                                  onChange={(e) =>
                                    setBookingdata({ ...bookingdata, dateOfBirth: e.target.value })
                                  }
                                  className="w-full px-3 py-2 sm:px-4 sm:py-3 pl-9 sm:pl-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                                <FaCalendarAlt className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
                              </div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700 flex items-center">
                                <FaEnvelope className="mr-1 sm:mr-2 text-blue-600 text-sm sm:text-base" />
                                Email Address *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={bookingdata.email}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, email: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="john@example.com"
                              />
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700 flex items-center">
                                <FaPhone className="mr-1 sm:mr-2 text-blue-600 text-sm sm:text-base" />
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={bookingdata.phone}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, phone: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="+91 98765 43210"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Travel Documents */}
                        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8">
                          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                              <FaPassport className="text-purple-600 text-sm sm:text-base md:text-xl" />
                            </div>
                            <div>
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                                Travel Documents
                              </h3>
                              <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                                Passport & identification details
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Passport Number
                              </label>
                              <input
                                type="text"
                                name="passportNumber"
                                value={bookingdata.passportNumber}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, passportNumber: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="A12345678"
                              />
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Passport Expiry
                              </label>
                              <div className="relative">
                                <input
                                  type="date"
                                  name="passportExpiry"
                                  value={bookingdata.passportExpiry}
                                  onChange={(e) =>
                                    setBookingdata({ ...bookingdata, passportExpiry: e.target.value })
                                  }
                                  className="w-full px-3 py-2 sm:px-4 sm:py-3 pl-9 sm:pl-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                                <FaCalendarAlt className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
                              </div>
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Nationality
                              </label>
                              <input
                                type="text"
                                name="nationality"
                                value={bookingdata.nationality}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, nationality: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Indian"
                              />
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Emergency Contact
                              </label>
                              <input
                                type="text"
                                name="emergencyContact"
                                value={bookingdata.emergencyContact}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, emergencyContact: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="+91 98765 43211"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Travel Preferences */}
                        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 md:p-8">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Travel Preferences
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Seat Preference
                              </label>
                              <select
                                name="seatPreference"
                                value={bookingdata.seatPreference}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, seatPreference: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              >
                                <option>Select</option>
                                <option>Window Seat</option>
                                <option>Aisle Seat</option>
                                <option>Middle Seat</option>
                                <option>No Preference</option>
                              </select>
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                Meal Preference
                              </label>
                              <select
                                name="mealPreference"
                                value={bookingdata.mealPreference}
                                onChange={(e) =>
                                  setBookingdata({ ...bookingdata, mealPreference: e.target.value })
                                }
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              >
                                <option value="">Select Meal</option>
                                <option value="Standard">Standard Meal</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Gluten Free">Gluten Free</option>
                              </select>
                            </div>
                          </div>

                          <div className="mt-4 sm:mt-6">
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                              Special Requests
                            </label>
                            <textarea
                              name="specialRequest"
                              value={bookingdata.specialrequest}
                              onChange={(e) =>
                                setBookingdata({ ...bookingdata, specialrequest: e.target.value })
                              }
                              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              rows="2"
                              placeholder="Wheelchair assistance, dietary restrictions, etc."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Booking Summary */}
                      <div className="lg:col-span-4 space-y-4 sm:space-y-6">

                        {/* Flight Summary Card */}
                        {/* Flight Summary Card */}
                        {flight && (
                          <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-100 p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div>
                                <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg">
                                  Flight Details
                                </h3>
                                <p className="text-gray-600 text-sm font-medium">
                                  {getCityName(flight.from)} → {getCityName(flight.to)}
                                </p>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                  {flight.from} → {flight.to}
                                </p>
                              </div>
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaPlane className="text-blue-600 text-sm sm:text-base transform -rotate-45" />
                              </div>
                            </div>

                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Airline</span>
                                <span className="font-medium text-xs sm:text-sm md:text-base">{flight.airline}</span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Flight No.</span>
                                <span className="font-medium text-xs sm:text-sm md:text-base">{flight.flightNo}</span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Date</span>
                                <span className="font-medium text-xs sm:text-sm md:text-base">
                                  {flight.date || flight.departureDate || 'N/A'}
                                </span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Time</span>
                                <span className="font-medium text-xs sm:text-sm md:text-base">
                                  {flight.departure || flight.departureTime} - {flight.arrival || flight.arrivalTime}
                                </span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Class</span>
                                <span className="font-medium text-xs sm:text-sm md:text-base">{flight.class || 'Economy'}</span>
                              </div>

                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Duration</span>
                                <span className="font-medium text-xs sm:text-sm md:text-base">{flight.duration || 'N/A'}</span>
                              </div>
                            </div>

                            <div className="border-t border-blue-200 mt-4 sm:mt-6 pt-4 sm:pt-6">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-gray-600 text-xs sm:text-sm">Total Amount</div>
                                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                                    ₹{formatFlightPrice(flight.price)}
                                  </div>
                                </div>
                                <div className="text-green-600 text-xs sm:text-sm font-medium">
                                  <FaCheckCircle className="inline mr-1 text-xs sm:text-sm" />
                                  {flight.refundable ? 'Refundable' : 'Non-refundable'}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Price Breakdown */}
                        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-100 p-4 sm:p-6">
                          <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                            Price Breakdown
                          </h4>

                          {flight && (
                            <div className="space-y-2 sm:space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Base Fare</span>
                                <span>₹{formatFlightPrice(flight.price * 0.7)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Taxes & Fees</span>
                                <span>₹{formatFlightPrice(flight.price * 0.2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs sm:text-sm">Service Charge</span>
                                <span>₹{formatFlightPrice(flight.price * 0.1)}</span>
                              </div>
                              <div className="border-t pt-2 sm:pt-3">
                                <div className="flex justify-between font-bold text-sm sm:text-base md:text-lg">
                                  <span>Total Payable</span>
                                  <span className="text-blue-600">₹{formatFlightPrice(flight.price)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Loyalty Points */}
                        <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl md:rounded-2xl border border-yellow-100 p-4 sm:p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaStar className="text-white text-sm sm:text-base" />
                              </div>
                              <div>
                                <div className="font-bold text-sm sm:text-base">Airtribe Points</div>
                                <div className="text-gray-600 text-xs sm:text-sm">You'll earn</div>
                              </div>
                            </div>
                            <div className="text-xl sm:text-2xl font-bold text-yellow-600">+489</div>
                          </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="bg-gray-50 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6">
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <input
                              type="checkbox"
                              className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded"
                            />
                            <div className="text-xs sm:text-sm text-gray-700">
                              <p className="font-medium mb-1">Terms & Conditions</p>
                              <p>I agree to the Terms of Service, Privacy Policy, and Cancellation Policy.</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 sm:space-y-4">
                          <Link to="/profile/travellerdetails">
                            <button
                              onClick={handleTicketBooking}
                              className="w-full py-2 sm:py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                            >
                              <GiConfirmed className="inline mr-2 text-sm sm:text-base" />
                              Confirm Ticket
                            </button>
                          </Link>

                          <button className="w-full mt-2 py-2 sm:py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95">
                            <FaCreditCard className="inline mr-2 text-sm sm:text-base" />
                            Proceed to Payment
                          </button>

                          <button
                            onClick={() => setShowBookingForm(false)}
                            className="w-full py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base hover:bg-gray-50 transition-colors active:bg-gray-100"
                          >
                            Cancel Booking
                          </button>
                        </div>

                        {/* Security Badge */}
                        <div className="text-center pt-3 sm:pt-4 border-t">
                          <div className="inline-flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                            <FaShieldAlt className="text-green-600 text-xs sm:text-sm" />
                            <span>Your payment is secured with 256-bit SSL encryption</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Bookings Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <HiTicket className="mr-2 text-blue-600" />
                  My Bookings
                </h3>
                <button
                  onClick={() => setShowBooking(!showBooking)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {showBooking ? "Hide" : "Show"}
                </button>
              </div>

              {showBooking && (
                <div className="space-y-4">
                  {/* Booking Tabs */}
                  <div className="flex border-b">
                    {['current', 'upcoming', 'past'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setBookingTab(tab)}
                        className={`flex-1 py-2 text-sm font-medium ${bookingTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                      >
                        {tab === 'current' ? 'Current' : tab === 'upcoming' ? 'Upcoming' : 'Past'}
                      </button>
                    ))}
                  </div>

                  {/* Current Booking Details */}
                  {bookingTab === 'current' && (
                    <div className="bg-linear-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center mb-1">
                            <FaPlane className="text-blue-600 mr-2" />
                            <span className="font-bold">{currentBooking.flightNo}</span>
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {currentBooking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{currentBooking.airline}</p>
                        </div>
                        <button
                          onClick={() => handleDownloadTicket(currentBooking.id)}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <LuDownload className="mr-1" />
                          <span className="text-sm">Ticket</span>
                        </button>
                      </div>

                      {/* Flight Route */}
                      <div className="flex items-center justify-between my-4">
                        <div className="text-center">
                          <MdOutlineFlightTakeoff className="text-2xl text-blue-600 mx-auto mb-1" />
                          <p className="font-bold">{currentBooking.from}</p>
                          <p className="text-xs text-gray-600">Departure</p>
                        </div>
                        <div className="flex-1 px-4 text-center">
                          <div className="relative">
                            <div className="h-1 bg-blue-300 rounded-full"></div>
                            <FaPlane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600" />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{currentBooking.duration}</p>
                        </div>
                        <div className="text-center">
                          <MdOutlineFlightLand className="text-2xl text-green-600 mx-auto mb-1" />
                          <p className="font-bold">{currentBooking.to}</p>
                          <p className="text-xs text-gray-600">Arrival</p>
                        </div>
                      </div>

                      {/* Flight Details */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="font-semibold">{currentBooking.date}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="font-semibold">{currentBooking.time}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Seat</p>
                          <div className="flex items-center">
                            {/* <TbSeat className="mr-1" /> */}
                            <p className="font-semibold">{currentBooking.seat}</p>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Class</p>
                          <p className="font-semibold">{currentBooking.class}</p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="bg-white rounded-lg p-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Gate: <span className="font-semibold">{currentBooking.gate}</span></span>
                          <span>Terminal: <span className="font-semibold">{currentBooking.terminal}</span></span>
                          <span>Boarding: <span className="font-semibold">{currentBooking.boardingTime}</span></span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Total Fare</p>
                          <p className="text-xl font-bold text-blue-700">{currentBooking.fare}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(currentBooking.id)}
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleCancelBooking(currentBooking.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Booking List for Upcoming/Past */}
                  {(bookingTab === 'upcoming' || bookingTab === 'past') && (
                    <div className="space-y-3">
                      {bookingData[bookingTab].map((booking) => (
                        <div key={booking.id} className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-2">
                                <FaPlane className="text-blue-500 mr-2" />
                                <span className="font-bold">{booking.flightNo}</span>
                                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {booking.status}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <span>{booking.from}</span>
                                <FaPlane className="mx-2 text-xs" />
                                <span>{booking.to}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-700">{booking.fare}</p>
                              <p className="text-xs text-gray-500">{booking.date}</p>
                              {booking.time && <p className="text-xs text-gray-500">{booking.time}</p>}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-3">
                            <button
                              onClick={() => handleViewDetails(booking.id)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Details
                            </button>
                            {bookingTab === 'upcoming' && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-sm text-red-600 hover:text-red-800"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link to="allbookingdetails">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
                  {/* <FaHistory className="text-2xl text-blue-600 mb-2" /> */}
                  <span className="text-sm font-medium">Booking History</span>
                </button>
              </Link>
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
                <FaCalendarCheck className="text-2xl text-green-600 mb-2" />
                <span className="text-sm font-medium">Check-in</span>
              </button>
            </div>

            {/* User Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-bold text-gray-800 mb-3">Account Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-semibold">{user?.name || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-semibold">{user?.email || "Not set"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-semibold">{user?.phone || "Not set"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t p-4 bg-white">
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700"
                >
                  <LuLogOut size={18} />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default Mobilebottom;  