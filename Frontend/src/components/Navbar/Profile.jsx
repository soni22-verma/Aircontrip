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
} from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/endpoint";

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
    email: "",
    phone: "",
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
    seatPreference: "",
    mealPreference: "",
    specialrequest: "",
  })

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.profileImage) {
      // console.log("Found profileImage in localStorage:", savedUser.profileImage);
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
          airline: "AirContrip Airlines"
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
          airline: "SkyJet Airways"
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
          airline: "Emirates"
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
      alert("Max 5MB allowed");
      return;
    }

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
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);

    try {
      const updatedData = {
        ...formData,
        loyaltyPoints,
      };

      console.log("Data to be saved:", updatedData);

      dispatch(setUser(updatedData));

      localStorage.setItem("user", JSON.stringify(updatedData));

    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("profileSaved");
    console.log("profileSaved from localStorage:", saved);

  }, []);

  const handleDestopProfile = async (e) => {
    e.preventDefault()
    console.log("handleDestopProfile called");
    console.log("Form data to be saved:", formData);

    const allFieldsFilled = formData.dateOfBirth &&
      formData.nationality &&
      formData.passportNumber &&
      formData.address &&
      formData.emergencyContact;

    if (!allFieldsFilled) {
      toast.error("Please fill all profile fields before saving!");
      console.log("Not all fields filled, cannot save");
      return;
    }

    setLoading(true);

    try {
      console.log("API endpoint:", api.user.destopProfile);
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

      console.log("API Response:", res);
      console.log("Response data:", res.data);

      if (res.data.success) {
        console.log(res?.data?.user);
        dispatch(setUser(res?.data?.user))
        setIsProfileSaved(true);
        toast?.success("Profile Saved Successfully! Thank you 😊")
        // navigate("/")
      }

    } catch (error) {
      console.log("Error response:", error.response);
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()

    const allFieldsFilled = formData.dateOfBirth &&
      formData.nationality &&
      formData.passportNumber &&
      formData.address &&
      formData.emergencyContact;

    if (!allFieldsFilled) {
      toast.error("Please fill all profile fields before updating!");
      console.log("Not all fields filled, cannot update");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("Authorization")
      console.log("Token from localStorage:", token);
      console.log("API endpoint:", api.user.updateprofile);

      const response = await axios.post(api.user.updateprofile,
        {
          dob: formData.dateOfBirth,
          nationality: formData.nationality,
          passportNumber: formData.passportNumber,
          Address: formData.address,
          emergencyno: formData.emergencyContact,
          profileImage: formData.profileImage,
        },
      );

      console.log("Update profile response:", response);
      console.log("Response data:", response.data);

      if (response.data.success) {
        console.log(response?.data?.user);
        dispatch(setUser(response?.data?.user))
        setIsProfileSaved(true);
        toast?.success("User Profile Updated Successfully, thank you 😁")
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error?.response?.data?.message || "Update failed")
    } finally {
      setLoading(false);
    }
  }

  const handleTicketBooking = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("Authorization")
      console.log("Token from localStorage:", token);
      console.log("API endpoint:", api.booking.ticketbooking);

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
        },

      );

      console.log(res, "ticket Booking response")
      console.log(res.data, "booking data")

      if (res.data.success) {
        console.log(res?.data?.booking)
        toast?.success("your Ticket is Confirmed,thankyou😊");
        navigate("/profile/travellerdetails",{
          state: {booking: res.data.booking}
        })
      }

    } catch (error) {
      console.log(error, "this is error")

    }


  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 pt-30">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My AirContrip Profile</h1>
          <p className="text-gray-600 mt-2">Manage your travel preferences and booking information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg mx-auto">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <FaUser className="text-5xl text-white" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </label>
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold text-gray-900">{user?.name || "Traveler"}</h2>
                <div className="flex items-center justify-center mt-2 space-x-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-600">Gold Member</span>
                </div>
              </div>

              {/* Travel Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{bookingHistory.length}</div>
                  <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">Flights Taken</div>
                </div>
              </div>

              {/* Loyalty Points */}
              <div className="mt-6 p-4 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">AIRTRIP POINTS</div>
                    <div className="text-2xl font-bold">{loyaltyPoints}</div>
                  </div>
                  <FaTicketAlt className="text-3xl opacity-80" />
                </div>
                <div className="text-sm mt-2 opacity-90">
                  Redeem for discounts on your next flight!
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 rounded-lg transition-colors">
                  <FaPlane className="text-blue-600" />
                  <span>View Upcoming Flights</span>
                </button>

                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 rounded-lg transition-colors">
                  <FaTicketAlt className="text-green-600" />
                  <span>Book Ticket</span>
                </button>

                {showBookingForm && (
                  <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100">

                      {/* Header with Gradient */}
                      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                              <FaPlane className="text-2xl transform -rotate-45" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold">Complete Your Flight Booking</h2>
                              <p className="text-blue-100 opacity-90">Fill in passenger details to confirm your booking</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowBookingForm(false)}
                            className="p-3 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <FaTimes className="text-2xl" />
                          </button>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-12 gap-8 p-8">

                          {/* Left Column - Passenger Form */}
                          <div className="col-span-8 space-y-8">

                            {/* Primary Passenger */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                              <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                  <FaUser className="text-blue-600 text-xl" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">Primary Passenger</h3>
                                  <p className="text-gray-600">Main traveller details</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">Title</label>
                                  <select
                                    name="title"
                                    value={bookingData.title}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, title: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                   <option>Select</option>
                                    <option>Mr</option>
                                    <option>Mrs</option>
                                    <option>Ms</option>
                                  </select>
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">First Name *</label>
                                  <input type="text"
                                    name="firstName"
                                    value={bookingData.firstName}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, firstName: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John" />
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">Last Name *</label>
                                  <input type="text"
                                    name="lastName"
                                    value={bookingData.lastName}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, lastName: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Doe" />
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                                  <div className="relative">
                                    <input type="date"
                                      name="dateOfBirth"
                                      value={bookingData.dateOfBirth}
                                      onChange={(e) =>
                                        setBookingdata({ ...bookingData, dateOfBirth: e.target.value })
                                      }
                                      className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                    <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-400" />
                                  </div>
                                </div>
                              </div>

                              {/* Contact Info */}
                              <div className="mt-8 grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                                    <FaEnvelope className="mr-2 text-blue-600" />
                                    Email Address *
                                  </label>
                                  <input type="email"
                                    name="email"
                                    value={bookingData.email}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, email: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                                    <FaPhone className="mr-2 text-blue-600" />
                                    Phone Number *
                                  </label>
                                  <input type="tel"
                                    name="phone"
                                    value={bookingData.phone}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, phone: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="+91 98765 43210" />
                                </div>
                              </div>
                            </div>

                            {/* Travel Documents */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                              <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                  <FaPassport className="text-purple-600 text-xl" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">Travel Documents</h3>
                                  <p className="text-gray-600">Passport & identification details</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">Passport Number</label>
                                  <input type="text"
                                    name="passportNumber"
                                    value={bookingData.passportNumber}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, passportNumber: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="A12345678" />
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">Passport Expiry</label>
                                  <div className="relative">
                                    <input type="date"
                                      name="passportExpiry"
                                      value={bookingData.passportExpiry}
                                      onChange={(e) =>
                                        setBookingdata({ ...bookingData, passportExpiry: e.target.value })
                                      }
                                      className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                                    <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-400" />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">Nationality</label>
                                  <input type="text"
                                    name="nationality"
                                    value={bookingData.nationality}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, nationality: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Indian" />
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">Emergency Contact</label>
                                  <input type="text"
                                    name="emergencyContent"
                                    value={bookingData.emergencyContact}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, emergencyContact: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="+91 98765 43211" />
                                </div>
                              </div>
                            </div>

                            {/* Travel Preferences */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                              <h3 className="text-xl font-bold text-gray-900 mb-6">Travel Preferences</h3>

                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">Seat Preference</label>
                                  <select
                                    name="seatPreference"
                                    value={bookingData.seatPreference}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, seatPreference: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                                      <option>Select</option>
                                    <option>Window Seat</option>
                                    <option>Aisle Seat</option>
                                    <option>Middle Seat</option>
                                    <option>No Preference</option>
                                  </select>
                                </div>

                                <div className="space-y-2">
                                  <label className="block text-sm font-semibold text-gray-700">
                                    Meal Preference
                                  </label>

                                  <select
                                 name="mealPreference"
                                    value={bookingData.mealPreference}
                                    onChange={(e) =>
                                      setBookingdata({ ...bookingData, mealPreference: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               outline-none transition-all"
                                  >
                                    <option value="">Select Meal</option>
                                    <option value="Standard">Standard Meal</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Gluten Free">Gluten Free</option>
                                  </select>
                                </div>

                              </div>

                              <div className="mt-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                                <textarea
                                  name="specialRequest"
                                  value={bookingData.specialrequest}
                                  onChange={(e) =>
                                    setBookingdata({ ...bookingData, specialrequest: e.target.value })
                                  }
                                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" rows="3" placeholder="Wheelchair assistance, dietary restrictions, etc." />
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Booking Summary */}
                          <div className="col-span-4 space-y-6">

                            {/* Flight Summary Card */}
                            <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-6">
                              <div className="flex items-center justify-between mb-6">
                                <div>
                                  <h3 className="font-bold text-gray-900 text-lg">Flight Details</h3>
                                  <p className="text-gray-600 text-sm">DEL → BOM</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FaPlane className="text-blue-600 transform -rotate-45" />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Airline</span>
                                  <span className="font-medium">AirContrip</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Date</span>
                                  <span className="font-medium">15 Mar 2024</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Time</span>
                                  <span className="font-medium">08:30 - 11:15</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Class</span>
                                  <span className="font-medium">Economy</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Passengers</span>
                                  <span className="font-medium">1 Adult</span>
                                </div>
                              </div>

                              <div className="border-t border-blue-200 mt-6 pt-6">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="text-gray-600 text-sm">Total Amount</div>
                                    <div className="text-3xl font-bold text-blue-600">₹4,899</div>
                                  </div>
                                  <div className="text-green-600 text-sm font-medium">
                                    <FaCheckCircle className="inline mr-1" />
                                    Free cancellation
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                              <h4 className="font-bold text-gray-900 mb-4">Price Breakdown</h4>

                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Base Fare</span>
                                  <span>₹3,500</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Taxes & Fees</span>
                                  <span>₹1,150</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Service Charge</span>
                                  <span>₹249</span>
                                </div>
                                <div className="border-t pt-3">
                                  <div className="flex justify-between font-bold">
                                    <span>Total Payable</span>
                                    <span className="text-blue-600">₹4,899</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Loyalty Points */}
                            <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-linear-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                                    <FaStar className="text-white" />
                                  </div>
                                  <div>
                                    <div className="font-bold">Airtribe Points</div>
                                    <div className="text-sm text-gray-600">You'll earn</div>
                                  </div>
                                </div>
                                <div className="text-2xl font-bold text-yellow-600">+489</div>
                              </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                              <div className="flex items-start space-x-3">
                                <input type="checkbox" className="mt-1 h-5 w-5 text-blue-600 rounded" />
                                <div className="text-sm text-gray-700">
                                  <p className="font-medium mb-1">Terms & Conditions</p>
                                  <p>I agree to the Terms of Service, Privacy Policy, and Cancellation Policy.</p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4">

                              <Link to="/profile/travellerdetails">
                                <button
                                onClick={handleTicketBooking}
                                className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                                <GiConfirmed className="inline mr-2" />
                                Confirm Ticket
                              </button>
                              </Link>
                              <button className="w-full mt-4 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                                <FaCreditCard className="inline mr-2" />
                                Proceed to Payment
                              </button>

                              <button
                                onClick={() => setShowBookingForm(false)}
                                className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                              >
                                Cancel Booking
                              </button>
                            </div>

                            {/* Security Badge */}
                            <div className="text-center pt-4 border-t">
                              <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
                                <FaShieldAlt className="text-green-600" />
                                <span>Your payment is secured with 256-bit SSL encryption</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <a href="loyalty">
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-blue-50 rounded-lg transition-colors">
                    <FaStar className="text-yellow-600" />
                    <span>Loyalty Program</span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className=" text-sm font-semibold text-gray-700 flex items-center">
                      <FaUser className="mr-2 text-blue-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className=" text-sm font-semibold text-gray-700 flex items-center">
                      <FaEnvelope className="mr-2 text-blue-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className=" text-sm font-semibold text-gray-700 flex items-center">
                      <FaPhone className="mr-2 text-blue-600" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className=" text-sm font-semibold text-gray-700 flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-600" />
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required={!isProfileSaved}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className=" text-sm font-semibold text-gray-700 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      Nationality *
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Your nationality"
                      required={!isProfileSaved}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className=" text-sm font-semibold text-gray-700 flex items-center">
                      <FaPassport className="mr-2 text-blue-600" />
                      Passport Number *
                    </label>
                    <input
                      type="text"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Enter passport number"
                      required={!isProfileSaved}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className=" text-sm font-semibold text-gray-700 flex items-center">
                      <FaIdCard className="mr-2 text-blue-600" />
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      rows="3"
                      placeholder="Your complete address"
                      required={!isProfileSaved}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Emergency Contact *
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Emergency contact number"
                      required={!isProfileSaved}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>

                  {isProfileSaved ? (
                    <button
                      type="button"
                      onClick={handleUpdateProfile}
                      className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium shadow-md hover:shadow-lg"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={handleDestopProfile}
                      type="button"
                      disabled={loading}
                      className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "Save Profile"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;