import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../store/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaPassport,
  FaMapMarkerAlt,
  FaIdCard,
  FaPlane,
  FaStar,
  FaTicketAlt,
  FaTimes,
  FaCheckCircle,
  FaCreditCard,
  FaShieldAlt,
  FaCalendarCheck,
  FaClock,
  FaChevronRight,
  FaHistory,
  FaEdit,
  FaSave,
  FaUpload,
  FaCrown,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,

  FaUtensils,
  FaLock
} from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
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
    y: -8,
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

// Modal animation variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    rotateX: 10
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.6
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    rotateX: -10,
    transition: {
      duration: 0.4
    }
  }
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [isediting, setIsEditing] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    address: "",
    emergencyContact: "",
    profileImage: null,
  });

  const [bookingData, setBookingdata] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    title: "Select",
    firstName: user?.name?.split(' ')[0] || "",
    lastName: user?.name?.split(' ').slice(1).join(' ') || "",
    dateOfBirth: user?.dob || "",
    nationality: user?.nationality || "select",
    passportNumber: user?.passportNumber || "",
    passportExpiry: "",
    seatPreference: "",
    mealPreference: "",
    specialrequest: "",
    bookedon: new Date().toLocaleDateString("en-CA")
  })

  const [flight, setFlight] = useState(null)
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animated particles for background
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10
  }));

  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    console.log(user._id, " this is user id")
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

  const formatFlightPrice = (price) => {
    if (!price) return '0';
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const getCityName = (code) => {
    const cities = [
      { code: 'DEL', name: 'Delhi' },
      { code: 'BOM', name: 'Mumbai' },
      { code: 'BLR', name: 'Bengaluru' },
      { code: 'HYD', name: 'Hyderabad' },
      { code: 'CCU', name: 'Kolkata' },
      { code: 'MAA', name: 'Chennai' },
      { code: 'AMD', name: 'Ahmedabad' },
      { code: 'PNQ', name: 'Pune' },
      { code: 'HBD', name: 'Hydrabad' }
    ];

    const city = cities.find(c => c.code === code);
    return city ? city.name : code;
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.profileImage) {
      setImagePreview(savedUser.profileImage);
      setFormData(prev => ({
        ...prev,
        profileImage: savedUser.profileImage
      }));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const allFieldsFilled = user.dob &&
        user.nationality &&
        user.passportNumber &&
        user.Address &&
        user.emergencyno;

      if (allFieldsFilled) {
        setIsProfileSaved(true);
      } else {
        setIsProfileSaved(false);
      }
    } else {
      setIsProfileSaved(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dob || "",
        nationality: user.nationality || "",
        passportNumber: user.passportNumber || "",
        address: user.Address || "",
        emergencyContact: user.emergencyno || "",
        profileImage: user.profileImage || imagePreview,
      });

      if (user.profileImage) {
        setImagePreview(user.profileImage);
      }

      setLoyaltyPoints(user.loyaltyPoints || 1250);

      setBookingHistory([
        {
          id: 1,
          bookingId: "AIRCON-789012",
          date: "2024-01-15",
          from: "New York (JFK)",
          to: "London (LHR)",
          passengers: 2,
          total: "$1,450",
          status: "Confirmed",
          airline: "AirContrip Airlines",
          baseFare: 34677,
        },
        {
          id: 2,
          bookingId: "AIRCON-345678",
          date: "2024-01-10",
          from: "Tokyo (HND)",
          to: "Sydney (SYD)",
          passengers: 1,
          total: "$890",
          status: "Completed",
          airline: "SkyJet Airways",
          baseFare: 674875
        },
        {
          id: 3,
          bookingId: "AIRCON-901234",
          date: "2024-01-05",
          from: "Dubai (DXB)",
          to: "Singapore (SIN)",
          passengers: 4,
          total: "$3,200",
          status: "Completed",
          airline: "Emirates",
          baseFare: 67643
        }
      ]);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB allowed");
      return;
    }

    setIsImageUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);

      setFormData(prev => ({
        ...prev,
        profileImage: base64Image
      }));

      const oldUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = {
        ...oldUser,
        profileImage: base64Image,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(setUser(updatedUser));
      setIsImageUploading(false);
      toast.success("Profile picture updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {
        ...formData,
        loyaltyPoints,
      };

      dispatch(setUser(updatedData));
      localStorage.setItem("user", JSON.stringify(updatedData));
      toast.success("Profile updated successfully!");

    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDestopProfile = async (e) => {
    e.preventDefault()
    const allFieldsFilled = formData.dateOfBirth &&
      formData.nationality &&
      formData.passportNumber &&
      formData.address &&
      formData.emergencyContact;

    if (!allFieldsFilled) {
      toast.error("Please fill all profile fields before saving!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        api.user.destopProfile,
        {
          dob: formData.dateOfBirth,
          nationality: formData.nationality,
          passportNumber: formData.passportNumber,
          Address: formData.address,
          emergencyno: formData.emergencyContact,
          profileImage: formData.profileImage,
        }
      );

      
      if (res.data.success) {
        dispatch(setUser(res?.data?.user))
        setIsProfileSaved(true);
        toast.success("Profile Saved Successfully! Thank you 😊")
      }

    } catch (error) {
      console.log("Error response:", error.response);
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (
      !formData.dateOfBirth ||
      !formData.nationality ||
      !formData.passportNumber ||
      !formData.address ||
      !formData.emergencyContact
    ) {
      toast.error("Please fill all profile fields before updating!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        toast.error("Token missing. Please login again.");
        return;
      }

      // ✅ FORM DATA
      const data = {
        dob : formData.dateOfBirth,
        nationality:formData.nationality,
        passportNumber:formData.passportNumber,
        address:formData.address,
        emergencyno:formData.emergencyContact,
        userId:user._id

      }

console.log(data , " this is my data")

      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      // ✅ API CALL WITH TOKEN
      const response = await axios.post(
        api.user.updateprofile,
        {data}
      );

      console.log("Profile Update Response:", response.data);

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        setIsProfileSaved(true);
        toast.success("User Profile Updated Successfully 😁");
      } else {
        toast.error(response.data.message || "Profile update failed");
      }

    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  const handleTicketBooking = async (e) => {
    e.preventDefault();

    if (!flight) {
      toast.error("Please select a flight first!");
      return;
    }

    // Validate form
    const errors = {};
    if (!bookingData.firstName) errors.firstName = "First name is required";
    if (!bookingData.lastName) errors.lastName = "Last name is required";
    if (!bookingData.email) errors.email = "Email is required";
    if (!bookingData.phone) errors.phone = "Phone number is required";
    if (bookingData.email && !/\S+@\S+\.\S+/.test(bookingData.email)) errors.email = "Email is invalid";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        api.booking.ticketbooking,
        {
          email: bookingData.email,
          phone: bookingData.phone,
          title: bookingData.title,
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          dateOfBirth: bookingData.dateOfBirth,
          nationality: bookingData.nationality,
          passportNumber: bookingData.passportNumber,
          passportExpiry: bookingData.passportExpiry,
          seatPreference: bookingData.seatPreference,
          mealPreference: bookingData.mealPreference,
          specialrequest: bookingData.specialrequest,

          flightId: flight.id,
          airline: flight.airline,
          flightNumber: flight.flightNo,
          from: flight.from,
          to: flight.to,
          departureTime: flight.departure,
          arrivalTime: flight.arrival,
          journeyDate: flight.date,
          flightClass: flight.class,
          totalPrice: flight.price,
          duration: flight.duration,
          bookedon: bookingData.bookedon
        },
      );

      if (res.data.success) {
        toast.success("Your Ticket is Confirmed, thank you! 😊");
        localStorage.removeItem("selectedFlight");

        navigate("/profile/travellerdetails", {
          state: {
            booking: res.data.booking,
            flightDetails: flight,
            email: res.data.booking.email,
          }
        })
      }

    } catch (error) {
      console.log(error, "this is error")
      toast.error(error?.response?.data?.message || "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  // Auto-advance form steps
  useEffect(() => {
    if (bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone && formStep === 1) {
      setTimeout(() => setFormStep(2), 300);
    }
  }, [bookingData.firstName, bookingData.lastName, bookingData.email, bookingData.phone]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 pt-30 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
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

        {/* Floating planes */}
        <motion.div
          animate={rotateAnimation}
          className="absolute top-1/4 left-1/4 opacity-5"
        >
          <FaPlane className="text-6xl text-blue-500" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 opacity-5"
        >
          <FaPlane className="text-8xl text-purple-500 transform rotate-45" />
        </motion.div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        pauseOnHover
        newestOnTop
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header with Animation */}
        <motion.div
          variants={fadeInUp}
          className="mb-12 text-center relative"
        >
          <motion.div
            animate={floatAnimation}
            className="absolute -top-8 -right-8 opacity-10"
          >
            <FaPlane className="text-8xl text-blue-500 transform rotate-45" />
          </motion.div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My AirContrip Profile
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your travel preferences and booking information
          </p>

          {/* Progress Indicator */}
          <motion.div
            className="mt-6 flex justify-center space-x-4"
            variants={staggerContainer}
          >
            {['Profile', 'Bookings', 'Loyalty'].map((tab, index) => (
              <motion.button
                key={tab}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === tab.toLowerCase()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-md'
                  }`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-gradient-to-br from-white to-gray-50/90 rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-white/20 relative overflow-hidden"
            >
              {/* Card Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>

              <div className="text-center relative z-10">
                <div className="relative inline-block mb-6">
                  <motion.div
                    animate={pulseAnimation}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30"
                  />

                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto group">
                    {imagePreview ? (
                      <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        src={imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <FaUser className="text-6xl text-white" />
                      </div>
                    )}

                    <motion.label
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      {isImageUploading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <FaUpload className="h-5 w-5 text-white" />
                      )}
                    </motion.label>
                  </div>
                </div>

                {/* User Info */}
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  {user?.name || "Traveler"}
                </motion.h2>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center justify-center space-x-3 mb-6"
                >
                  <FaCrown className="text-yellow-500 text-xl" />
                  <span className="text-gray-700 font-medium">Gold Elite Member</span>
                </motion.div>

                {/* Travel Stats */}
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-2 gap-4 mb-8"
                >
                  {[
                    { value: bookingHistory.length, label: 'Total Bookings', color: 'blue' },
                    { value: 8, label: 'Flights Taken', color: 'green' },
                    { value: '12', label: 'Countries', color: 'purple' },
                    { value: '2.4K', label: 'Miles', color: 'orange' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      className={`text-center p-4 bg-gradient-to-b from-${stat.color}-50 to-white rounded-2xl border border-${stat.color}-100 shadow-sm`}
                    >
                      <div className={`text-2xl font-bold text-${stat.color}-600`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Loyalty Points */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-white/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">AIRTRIP POINTS</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {loyaltyPoints.toLocaleString()}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <FaTicketAlt className="text-4xl text-blue-500" />
                    </motion.div>
                  </div>
                  <div className="text-sm text-gray-600 mt-3">
                    Redeem for discounts on your next flight!
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100/50"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaChevronRight className="mr-2 text-blue-500" />
                Quick Actions
              </h3>

              <div className="space-y-4">
                {[
                  { icon: FaPlane, label: "View All Bookings", color: "blue", href: "/allbookingdetails" },
                  {
                    icon: FaTicketAlt,
                    label: "Book Ticket",
                    color: "green",
                    action: () => {
                      if (!flight) {
                        toast.info("Please select a flight first from the flight page");
                        navigate("/flightdetails");
                      } else {
                        setShowBookingForm(true);
                      }
                    }
                  },
                  { icon: FaStar, label: "Loyalty Program", color: "yellow", href: "/loyalty" }
                ].map((action, index) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    onClick={action.action}
                    variants={fadeInUp}
                    whileHover={{ x: 10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    custom={index}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 border border-gray-100 group cursor-pointer"
                  >
                    <div className={`p-3 rounded-xl bg-${action.color}-100 group-hover:bg-${action.color}-200 transition-colors`}>
                      <action.icon className={`text-${action.color}-600 text-xl`} />
                    </div>
                    <span className="font-medium text-gray-800 flex-1">{action.label}</span>
                    <FaChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Profile Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-gradient-to-br from-white to-gray-50/90 rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-white/20 relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-green-500/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center justify-between mb-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Personal Information
                    </h2>
                    <p className="text-gray-600 mt-2">Update your profile details</p>
                  </div>
                  <motion.div
                    animate={pulseAnimation}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${isProfileSaved
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}
                  >
                    {isProfileSaved ? 'Profile Complete ✓' : 'Profile Incomplete'}
                  </motion.div>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {[
                      { label: 'Full Name *', icon: FaUser, name: 'name', type: 'text', placeholder: 'Enter your full name', required: true },
                      { label: 'Email Address *', icon: FaEnvelope, name: 'email', type: 'email', disabled: true },
                      { label: 'Phone Number', icon: FaPhone, name: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
                      { label: 'Date of Birth *', icon: FaCalendarAlt, name: 'dateOfBirth', type: 'date', required: !isProfileSaved },
                      { label: 'Nationality *', icon: FaMapMarkerAlt, name: 'nationality', type: 'text', placeholder: 'Your nationality', required: !isProfileSaved },
                      { label: 'Passport Number *', icon: FaPassport, name: 'passportNumber', type: 'text', placeholder: 'Enter passport number', required: !isProfileSaved },
                      { label: 'Address *', icon: FaIdCard, name: 'address', type: 'textarea', placeholder: 'Your complete address', required: !isProfileSaved, fullWidth: true },
                      { label: 'Emergency Contact *', icon: FaPhone, name: 'emergencyContact', type: 'tel', placeholder: 'Emergency contact number', required: !isProfileSaved }
                    ].map((field, index) => (
                      <motion.div
                        key={field.name}
                        variants={fadeInUp}
                        className={`space-y-2 ${field.fullWidth ? 'md:col-span-2' : ''}`}
                      >
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                          <field.icon className="mr-2 text-blue-500" />
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/50 hover:bg-white"
                            rows="3"
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            disabled={field.disabled}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white/50 hover:bg-white disabled:bg-gray-100"
                            placeholder={field.placeholder}
                            required={field.required}
                          />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    variants={fadeInUp}
                    className="flex justify-end space-x-4 pt-8 border-t border-gray-200/50"
                  >
                    <motion.button
                      type="button"
                      onClick={() => window.history.back()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium hover:border-gray-400"
                    >
                      Cancel
                    </motion.button>

                    {isProfileSaved ? (
                      <motion.button
                        type="button"
                        onClick={handleUpdateProfile}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FaEdit className="inline mr-2 relative z-10" />
                        <span className="relative z-10">Update Profile</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={handleDestopProfile}
                        type="button"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.05 } : {}}
                        whileTap={!loading ? { scale: 0.95 } : {}}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {loading ? (
                          <span className="relative z-10 flex items-center">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                            Saving...
                          </span>
                        ) : (
                          <>
                            <FaSave className="inline mr-2 relative z-10" />
                            <span className="relative z-10">Save Profile</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Recent Bookings */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-gradient-to-br from-white to-gray-50/90 rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-white/20"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaHistory className="mr-3 text-blue-500" />
                Recent Bookings
              </h3>

              <div className="space-y-4">
                {bookingHistory.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    variants={fadeInUp}
                    custom={index}
                    whileHover={{ x: 5, scale: 1.01 }}
                    className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FaPlane className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{booking.airline}</h4>
                            <p className="text-sm text-gray-600">
                              {booking.from} → {booking.to}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Booking ID: {booking.bookingId}</span>
                          <span>•</span>
                          <span>{booking.date}</span>
                          <span>•</span>
                          <span>{booking.passengers} Passengers</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{booking.total}</div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium mt-2 ${booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                          {booking.status}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <div className="fixed inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/20 backdrop-blur-xl z-50 flex items-center justify-center p-4">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-6 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
                  animate={{
                    x: [0, Math.random() * 200 - 100, 0],
                    y: [0, Math.random() * 200 - 100, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-br from-white via-white to-gray-50/95 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col backdrop-blur-sm border border-white/30 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full"
              />

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-pink-400/10 to-yellow-400/10 rounded-full"
              />

              {/* Header with Enhanced Gradient */}
              <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3),transparent_50%)]"></div>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-4"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, -10, 0, 10, 0],
                        y: [0, -5, 0, 5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30"
                    >
                      <FaPlane className="text-2xl transform -rotate-45" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">
                        Complete Your Flight Booking
                      </h2>
                      <p className="text-blue-100/90 opacity-90">
                        Fill in passenger details to confirm your booking
                      </p>
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowBookingForm(false)}
                    className="p-3 hover:bg-white/20 rounded-full transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
                    <FaTimes className="text-2xl relative z-10" />
                  </motion.button>
                </div>

                {/* Progress Steps */}
                <div className="mt-8">
                  <div className="flex items-center justify-center space-x-4">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <motion.div
                          animate={{
                            scale: formStep >= step ? 1.2 : 1,
                            backgroundColor: formStep >= step ? '#FFFFFF' : 'rgba(255,255,255,0.2)'
                          }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${formStep >= step ? 'border-white' : 'border-white/30'
                            }`}
                        >
                          <span className={`font-bold text-sm ${formStep >= step ? 'text-blue-600' : 'text-white'
                            }`}>
                            {step}
                          </span>
                        </motion.div>
                        {step < 3 && (
                          <motion.div
                            animate={{
                              width: formStep > step ? '64px' : '32px',
                              backgroundColor: formStep > step ? '#FFFFFF' : 'rgba(255,255,255,0.2)'
                            }}
                            className="h-1 mx-2 rounded-full"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-white/80 max-w-md mx-auto">
                    <span>Personal Info</span>
                    <span>Documents</span>
                    <span>Preferences</span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto max-h-[60vh]">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-12 gap-8 p-8"
                >
                  {/* Left Column - Passenger Form */}
                  <div className="col-span-8 space-y-8">

                    {/* Primary Passenger */}
                    <motion.div variants={fadeInLeft} className="relative">
                      <motion.div
                        whileHover={{ scale: 1.005 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4 mb-8">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center border border-blue-200"
                          >
                            <FaUser className="text-blue-600 text-2xl" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">Primary Passenger</h3>
                            <p className="text-gray-600">Main traveller details</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          {[
                            { label: 'Title', type: 'select', name: 'title', options: ['Select', 'Mr', 'Mrs', 'Ms'] },
                            { label: 'First Name *', type: 'text', name: 'firstName', placeholder: 'John' },
                            { label: 'Last Name *', type: 'text', name: 'lastName', placeholder: 'Doe' },
                            { label: 'Date of Birth', type: 'date', name: 'dateOfBirth' },
                            { label: 'Booking Date', type: 'date', name: 'bookedon', icon: FaCalendarCheck, min: today }
                          ].map((field, index) => (
                            <motion.div
                              key={field.name}
                              variants={fadeInUp}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.05 }}
                              className="space-y-2"
                            >
                              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                                {field.icon && <field.icon className="mr-2 text-green-600" />}
                                {field.label}
                              </label>
                              {field.type === 'select' ? (
                                <select
                                  name={field.name}
                                  value={bookingData[field.name]}
                                  onChange={(e) => setBookingdata({ ...bookingData, [field.name]: e.target.value })}
                                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 focus:shadow-lg"
                                >
                                  {field.options.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              ) : (
                                <div className="relative">
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    min={field.min}
                                    value={bookingData[field.name]}
                                    onChange={(e) => setBookingdata({ ...bookingData, [field.name]: e.target.value })}
                                    className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 focus:shadow-lg"
                                    placeholder={field.placeholder}
                                  />
                                  {field.icon ? (
                                    <field.icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                  ) : (
                                    <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                  )}
                                </div>
                              )}
                              {formErrors[field.name] && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-red-500 text-sm mt-1"
                                >
                                  {formErrors[field.name]}
                                </motion.p>
                              )}
                              {field.name === 'bookedon' && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Default: Current date
                                </p>
                              )}
                            </motion.div>
                          ))}
                        </div>

                        {/* Contact Info */}
                        <motion.div
                          variants={fadeInUp}
                          className="mt-8 grid grid-cols-2 gap-6"
                        >
                          {[
                            { label: 'Email Address *', type: 'email', name: 'email', icon: FaEnvelope, placeholder: 'john@example.com' },
                            { label: 'Phone Number *', type: 'tel', name: 'phone', icon: FaPhone, placeholder: '+91 98765 43210' }
                          ].map((field, index) => (
                            <div key={field.name} className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                                <field.icon className="mr-2 text-blue-600" />
                                {field.label}
                              </label>
                              <input
                                type={field.type}
                                name={field.name}
                                value={bookingData[field.name]}
                                onChange={(e) => setBookingdata({ ...bookingData, [field.name]: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 focus:shadow-lg"
                                placeholder={field.placeholder}
                              />
                              {formErrors[field.name] && (
                                <p className="text-red-500 text-sm mt-1">{formErrors[field.name]}</p>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Travel Documents - Collapsible */}
                    <motion.div variants={fadeInLeft}>
                      <motion.div
                        whileHover={{ scale: 1.005 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
                      >
                        <div className="flex items-center justify-between cursor-pointer"
                          onClick={() => setFormStep(formStep === 2 ? 1 : 2)}>
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center border border-purple-200">
                              <FaPassport className="text-purple-600 text-2xl" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">Travel Documents</h3>
                              <p className="text-gray-600">Passport & identification details</p>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: formStep === 2 ? 180 : 0 }}
                          >
                            {formStep === 2 ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {formStep >= 2 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-8 grid grid-cols-2 gap-6">
                                {[
                                  { label: 'Passport Number', type: 'text', name: 'passportNumber', placeholder: 'A12345678' },
                                  { label: 'Passport Expiry', type: 'date', name: 'passportExpiry', min: today },
                                  {
                                    label: 'Nationality',
                                    type: 'select',
                                    name: 'nationality',
                                    options: ['Select', 'Indian', 'American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Japanese', 'Chinese', 'Singaporean']
                                  },
                                  { label: 'Emergency Contact', type: 'text', name: 'emergencyContact', placeholder: '+91 98765 43211' }
                                ].map((field, index) => (
                                  <motion.div
                                    key={field.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-2"
                                  >
                                    <label className="block text-sm font-semibold text-gray-700">
                                      {field.label}
                                    </label>
                                    {field.type === 'select' ? (
                                      <select
                                        name={field.name}
                                        value={bookingData[field.name]}
                                        onChange={(e) => setBookingdata({ ...bookingData, [field.name]: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 focus:shadow-lg"
                                      >
                                        {field.options.map(opt => (
                                          <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                      </select>
                                    ) : (
                                      <input
                                        type={field.type}
                                        name={field.name}
                                        min={field.min}
                                        value={bookingData[field.name]}
                                        onChange={(e) => setBookingdata({ ...bookingData, [field.name]: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 focus:shadow-lg"
                                        placeholder={field.placeholder}
                                      />
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>

                    {/* Travel Preferences */}
                    <motion.div variants={fadeInLeft}>
                      <motion.div
                        whileHover={{ scale: 1.005 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
                      >
                        <div className="flex items-center justify-between cursor-pointer"
                          onClick={() => setFormStep(formStep === 3 ? 2 : 3)}>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Travel Preferences</h3>
                            <p className="text-gray-600">Customize your travel experience</p>
                          </div>
                          <motion.div
                            animate={{ rotate: formStep === 3 ? 180 : 0 }}
                          >
                            {formStep === 3 ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {formStep >= 3 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-8 grid grid-cols-2 gap-6">
                                {[
                                  {
                                    label: 'Seat Preference',
                                    type: 'select',
                                    name: 'seatPreference',
                                    options: ['Select', 'Window Seat', 'Aisle Seat', 'Middle Seat', 'No Preference'],
                                    icon: FaUser
                                  },
                                  {
                                    label: 'Meal Preference',
                                    type: 'select',
                                    name: 'mealPreference',
                                    options: ['Select', 'Standard', 'Vegetarian', 'Vegan', 'Gluten Free'],
                                    icon: FaUtensils
                                  }
                                ].map((field, index) => (
                                  <motion.div
                                    key={field.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-2"
                                  >
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center">
                                      <field.icon className="mr-2 text-blue-600" />
                                      {field.label}
                                    </label>
                                    <select
                                      name={field.name}
                                      value={bookingData[field.name]}
                                      onChange={(e) => setBookingdata({ ...bookingData, [field.name]: e.target.value })}
                                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 focus:shadow-lg"
                                    >
                                      {field.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </select>
                                  </motion.div>
                                ))}
                              </div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 space-y-2"
                              >
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  Special Requests
                                </label>
                                <textarea
                                  name="specialrequest"
                                  value={bookingData.specialrequest}
                                  onChange={(e) => setBookingdata({ ...bookingData, specialrequest: e.target.value })}
                                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-blue-300 focus:shadow-lg resize-none"
                                  rows="3"
                                  placeholder="Wheelchair assistance, dietary restrictions, etc."
                                />
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Right Column - Booking Summary */}
                  <div className="col-span-4 space-y-6">

                    {/* Flight Summary Card */}
                    {flight && (
                      <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-blue-50 via-blue-50/50 to-purple-50 rounded-2xl border border-blue-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="font-bold text-gray-900 text-xl">Selected Flight</h3>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-gray-600 text-sm"
                            >
                              {getCityName(flight.from)} → {getCityName(flight.to)}
                            </motion.p>
                          </div>
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 5
                            }}
                            className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center border border-blue-300"
                          >
                            <FaPlane className="text-blue-600 transform -rotate-45" />
                          </motion.div>
                        </div>

                        <div className="space-y-4">
                          {[
                            { label: 'Airline', value: flight.airline },
                            { label: 'Flight No.', value: flight.flightNo },
                            { label: 'Date', value: flight.date },
                            { label: 'Time', value: `${flight.departure} - ${flight.arrival}` },
                            { label: 'Duration', value: flight.duration },
                            { label: 'Class', value: flight.class },
                            { label: 'Passengers', value: '1 Adult' },
                            {
                              label: 'Booking Date',
                              value: bookingData.bookedon ?
                                new Date(bookingData.bookedon).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                }) : 'Today',
                              highlight: true
                            }
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex justify-between items-center"
                            >
                              <span className="text-gray-600">{item.label}</span>
                              <span className={`font-medium ${item.highlight ? 'text-blue-600' : ''}`}>
                                {item.value}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="border-t border-blue-200 mt-6 pt-6"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-gray-600 text-sm">Flight Fare</div>
                              <motion.div
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                className="text-3xl font-bold text-blue-600"
                              >
                                ₹{formatFlightPrice(flight.price)}
                              </motion.div>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${flight.refundable
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : 'bg-red-100 text-red-800 border border-red-200'
                                }`}
                            >
                              <FaCheckCircle className="inline mr-1" />
                              {flight.refundable ? 'Refundable' : 'Non-refundable'}
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Price Breakdown */}
                    {flight && (
                      <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <h4 className="font-bold text-gray-900 text-lg mb-6 flex items-center">
                          <FaInfoCircle className="mr-2 text-blue-600" />
                          Price Breakdown
                        </h4>

                        <div className="space-y-4">
                          {[
                            { label: 'Base Fare', amount: flight.price * 0.7 },
                            { label: 'Taxes & Fees', amount: flight.price * 0.2 },
                            { label: 'Service Charge', amount: flight.price * 0.1 }
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className="flex justify-between"
                            >
                              <span className="text-gray-600">{item.label}</span>
                              <span>₹{formatFlightPrice(item.amount)}</span>
                            </motion.div>
                          ))}

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="border-t pt-3"
                          >
                            <div className="flex justify-between font-bold">
                              <span>Total Payable</span>
                              <motion.span
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-blue-600"
                              >
                                ₹{formatFlightPrice(flight.price)}
                              </motion.span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Loyalty Points */}
                    <motion.div
                      variants={fadeInRight}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-yellow-50 via-yellow-50/50 to-orange-50 rounded-2xl border border-yellow-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={{
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center shadow-md"
                          >
                            <FaStar className="text-white" />
                          </motion.div>
                          <div>
                            <div className="font-bold">Airtribe Points</div>
                            <div className="text-sm text-gray-600">You'll earn</div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-2xl font-bold text-yellow-600"
                        >
                          +489
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Terms & Conditions */}
                    <motion.div
                      variants={fadeInRight}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start space-x-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative"
                        >
                          <input
                            type="checkbox"
                            className="mt-1 h-5 w-5 text-blue-600 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
                          />
                        </motion.div>
                        <div className="text-sm text-gray-700">
                          <p className="font-medium mb-1">Terms & Conditions</p>
                          <p>I agree to the Terms of Service, Privacy Policy, and Cancellation Policy.</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                      <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link to="/profile/travellerdetails">
                          <motion.button
                            whileHover={{ scale: 1.03, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleTicketBooking}
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {isSubmitting ? (
                              <div className="relative z-10 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                Processing...
                              </div>
                            ) : (
                              <>
                                <GiConfirmed className="inline mr-2 relative z-10" />
                                <span className="relative z-10">Confirm Ticket</span>
                              </>
                            )}
                          </motion.button>
                        </Link>
                      </motion.div>

                      <motion.button
                        variants={fadeInRight}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <FaCreditCard className="inline mr-2 relative z-10" />
                        <span className="relative z-10">Proceed to Payment</span>
                      </motion.button>

                      <motion.button
                        variants={fadeInRight}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowBookingForm(false)}
                        className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 hover:border-gray-400"
                      >
                        Cancel Booking
                      </motion.button>
                    </div>

                    {/* Security Badge */}
                    <motion.div
                      variants={fadeInRight}
                      initial="hidden"
                      animate="visible"
                      className="text-center pt-4 border-t border-gray-200"
                    >
                      <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaLock className="text-green-600" />
                        </motion.div>
                        <span>Your payment is secured with 256-bit SSL encryption</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;