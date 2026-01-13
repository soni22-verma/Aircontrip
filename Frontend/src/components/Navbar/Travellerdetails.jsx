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
  FaBriefcase
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import api from "../../../services/endpoint";

const TravellerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingemail, setBookedUserEmail] = useState("");
  const user = useSelector((state) => state.user);
  const [passengerInfo, setPassengerInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState("");
  
  // Get data from location state
  const { selectedFlight, flightDetails, passengers, travelClass, bookingId: locationBookingId } = location.state || {};

  console.log("Location State:", location.state);
  console.log("Selected Flight:", selectedFlight);
  console.log("Flight Details:", flightDetails);

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

    // Sort bookings by date (newest first)
    const sortedBookings = [...bookings].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.bookedon || 0);
      const dateB = new Date(b.createdAt || b.bookedon || 0);
      return dateB - dateA;
    });

    console.log("Sorted bookings (latest first):", sortedBookings);
    return sortedBookings[0]; // Return the latest booking
  };

  // Group passengers by booking
  const groupPassengersByBooking = (bookings) => {
    if (!bookings || !Array.isArray(bookings)) return [];

    // Group by bookingId or _id
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
    
    // Find the latest booking group
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

    // If we have a specific booking ID from location state, use it
    if (bookingId) {
      const currentBookingPassengers = bookings.filter(
        booking => booking._id === bookingId || booking.bookingId === bookingId
      );
      console.log("Filtered by booking ID:", currentBookingPassengers);
      return currentBookingPassengers;
    }

    // Otherwise, find the latest booking
    return groupPassengersByBooking(bookings);
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
          
          // Filter only current booking passengers
          const currentBookingPassengers = filterCurrentBookingPassengers(res.data.userDetails);
          console.log("Current booking passengers:", currentBookingPassengers);
          
          if (currentBookingPassengers.length === 0) {
            toast.warning("No current booking found. Showing latest booking...");
            // Fallback to showing latest booking
            const latestBooking = findLatestBooking(res.data.userDetails);
            if (latestBooking) {
              setPassengerInfo([latestBooking]);
            } else {
              setPassengerInfo(res.data.userDetails.slice(0, 1)); // Show first booking as fallback
            }
          } else {
            setPassengerInfo(currentBookingPassengers);
          }
          
          // Set flight info dynamically from API response
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

            // Set booking info dynamically
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

  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

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

  const handleBookAnother = () => {
    navigate("/flightdetails");
  };

  // If no flight data, show error
  if (!hasFlightData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pt-30 flex items-center justify-center p-4 mt-5">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-yellow-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Flight Selected</h2>
          <p className="text-gray-600 mb-4">
            Please select a flight first to view booking details.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/flightdetails")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"
            >
              <FaPlane className="mr-2" />
              Search Flights
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading current booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 pt-20 pb-12 -mt-2">
      <ToastContainer />
      
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FaChevronLeft className="text-gray-700" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">Flight Booking Details</h1>
              <p className="text-xs text-gray-600">{bookingInfo.bookingId} • Current Booking</p>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Success Banner */}
        <div className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-8 text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-linear-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <FaCheckCircle className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h1>
          <p className="text-gray-600 mb-4">
            Your {flightInfo.airline} flight has been booked successfully
          </p>
          <div className="inline-block bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium">
            Booking ID: {bookingInfo.bookingId}
          </div>
          <p className="text-sm text-gray-500 mt-2">Current Booking • {passengerInfo.length} Passenger(s)</p>
        </div>

        {/* Flight Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FaPlane className="text-blue-600 mr-3" />
            Flight Details
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="text-3xl font-bold text-gray-900">{flightInfo.from.time}</div>
              <div className="text-gray-600">{flightInfo.from.date}</div>
              <div className="font-semibold text-gray-800 mt-2">{flightInfo.from.city}</div>
              <div className="text-sm text-gray-500">({flightInfo.from.code})</div>
            </div>
            
            <div className="flex-1 mx-4 mb-6 md:mb-0">
              <div className="relative">
                <div className="h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <FaPlane className="text-gray-400 transform -rotate-45" />
                </div>
              </div>
              <div className="text-center mt-2">
                <div className="font-semibold text-gray-700">{flightInfo.duration}</div>
                <div className="text-sm text-gray-500">Direct • {flightInfo.distance}</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold text-gray-900">{flightInfo.to.time}</div>
              <div className="text-gray-600">{flightInfo.to.date}</div>
              <div className="font-semibold text-gray-800 mt-2">{flightInfo.to.city}</div>
              <div className="text-sm text-gray-500">({flightInfo.to.code})</div>
            </div>
          </div>
          
          {/* Flight Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-sm text-gray-600">Flight No.</div>
              <div className="font-bold text-gray-900">{flightInfo.flightNumber}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-sm text-gray-600">Airline</div>
              <div className="font-bold text-gray-900">{flightInfo.airline}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-sm text-gray-600">Class</div>
              <div className="font-bold text-gray-900">{flightInfo.class}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="text-sm text-gray-600">Baggage</div>
              <div className="font-bold text-gray-900">{flightInfo.baggage.checkin}</div>
            </div>
          </div>
          
          {/* Price Section */}
          <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">Total Fare</div>
                <div className="text-2xl font-bold text-blue-600">{bookingInfo.totalAmount}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Passengers</div>
                <div className="text-xl font-bold text-green-600">{passengerInfo.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FaUser className="text-blue-600 mr-3" />
            Passenger Details {passengerInfo.length > 0 && `(${passengerInfo.length})`}
          </h2>
          
          {passengerInfo.length === 0 ? (
            <div className="text-center py-8">
              <FaUser className="text-gray-300 text-4xl mx-auto mb-3" />
              <p className="text-gray-600">No current booking found</p>
              <button 
                onClick={() => navigate("/flightdetails")}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Book New Flight
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {passengerInfo.map((passenger, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {passenger.title} {passenger.firstName} {passenger.lastName}
                        <span className="ml-2 text-sm text-gray-500">(Passenger {index + 1})</span>
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          Age: {calculateAge(passenger.dateOfBirth)}
                        </span>
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {passenger.nationality || "Indian"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Booking Status: {passenger.status || "Confirmed"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                          <FaPassport className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Passport Number</div>
                          <div className="font-semibold">{passenger.passportNumber || "N/A"}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                          <FaCalendarAlt className="text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Passport Expiry</div>
                          <div className="font-semibold">{passenger.passportExpiry || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                          <FaEnvelope className="text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Email</div>
                          <div className="font-semibold">{passenger.email || "N/A"}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                          <FaPhone className="text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Phone</div>
                          <div className="font-semibold">{passenger.phone || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preferences */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      {passenger.seatPreference && (
                        <div className="px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm flex items-center">
                          <FaChair className="mr-2" />
                          {passenger.seatPreference} Seat
                        </div>
                      )}
                      {passenger.mealPreference && (
                        <div className="px-4 py-2 bg-green-50 text-green-800 rounded-full text-sm flex items-center">
                          🍽️
                          {passenger.mealPreference} Meal
                        </div>
                      )}
                      {passenger.specialrequest && (
                        <div className="px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full text-sm flex items-center">
                          <FaStar className="mr-2" />
                          Special Request
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Flight Specific Details */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Flight Specific Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {passenger.flightNumber && (
                        <div>
                          <div className="text-sm text-gray-600">Flight Number</div>
                          <div className="font-semibold">{passenger.flightNumber}</div>
                        </div>
                      )}
                      {passenger.journeyDate && (
                        <div>
                          <div className="text-sm text-gray-600">Journey Date</div>
                          <div className="font-semibold">{formatDate(passenger.journeyDate)}</div>
                        </div>
                      )}
                      {passenger.totalPrice && (
                        <div>
                          <div className="text-sm text-gray-600">Price</div>
                          <div className="font-semibold text-green-600">₹{passenger.totalPrice}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Current Booking Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Flight</span>
              <span className="font-semibold">{flightInfo.flightNumber}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Route</span>
              <span className="font-semibold">{flightInfo.from.code} → {flightInfo.to.code}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold">{flightInfo.from.date}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Time</span>
              <span className="font-semibold">{flightInfo.from.time} - {flightInfo.to.time}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Passengers</span>
              <span className="font-semibold">{passengerInfo.length}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-semibold text-blue-600">{bookingInfo.bookingId}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">PNR</span>
              <span className="font-semibold">{bookingInfo.pnrNumber}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {bookingInfo.status}
              </span>
            </div>
            {passengerInfo.length > 0 && passengerInfo[0].bookedon && (
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Booked On</span>
                <span className="font-semibold">{formatDate(passengerInfo[0].bookedon)}</span>
              </div>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total Amount</span>
              <span className="text-3xl font-bold text-green-600">{bookingInfo.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            disabled={isPrinting}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isPrinting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Printing...
              </>
            ) : (
              <>
                <FaPrint />
                Print Ticket
              </>
            )}
          </button>
          
          <button
            disabled={isDownloading}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Downloading...
              </>
            ) : (
              <>
                <FaDownload />
                Download Ticket
              </>
            )}
          </button>
          
          <button
            onClick={handleBookAnother}
            className="w-full py-4 border-2 border-blue-500 text-blue-600 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-50"
          >
            <FaPlane />
            Book Another
          </button>
        </div>

        {/* QR Code */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <FaQrcode className="text-blue-600 text-xl mr-2" />
            <h3 className="font-bold text-gray-900">Digital Boarding Pass</h3>
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white border-2 border-blue-200 rounded-xl">
              <QRCodeSVG 
                value={`FLIGHT:${flightInfo.flightNumber}:${flightInfo.from.code}:${flightInfo.to.code}:${bookingInfo.bookingId}`}
                size={150}
                level="H"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Show this QR code at airport check-in
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravellerDetails;