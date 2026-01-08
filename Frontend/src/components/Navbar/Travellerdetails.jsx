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
  FaCreditCard,
  FaStar
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TravellerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const booking = location.state?.booking;
  if(!booking){
    return <div>Not booking data found!</div>
  }
  
  const [bookingDetails, setBookingDetails] = useState({
    bookingId: `AIRCON-${Math.floor(Math.random() * 1000000)}`,
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
    totalAmount: "₹4,899",
    paymentMethod: "Credit Card",
    transactionId: `TXN${Date.now()}`,
    paymentDate: new Date().toLocaleDateString('en-IN'),
    pnrNumber: `PNR${Math.floor(Math.random() * 1000000000)}`
  });

  const [travellers, setTravellers] = useState([
    {
      id: 1,
      title: "Mr",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-05-15",
      nationality: "Indian",
      passportNumber: "A12345678",
      passportExpiry: "2030-12-31",
      seatPreference: "Window Seat",
      mealPreference: "Vegetarian",
      seatNumber: "12A",
      email: "john@example.com",
      phone: "+91 98765 43210",
      emergencyContact: "+91 98765 43211",
      specialRequests: "None",
      isPrimary: true
    }
  ]);

  const [flightDetails, setFlightDetails] = useState({
    flightNumber: "AC-789",
    airline: "AirContrip Airlines",
    airlineCode: "AIRCON",
    aircraft: "Airbus A320",
    departure: {
      city: "Delhi",
      code: "DEL",
      airport: "Indira Gandhi International Airport",
      terminal: "Terminal 3",
      date: "15 Mar 2024",
      time: "08:30",
      gate: "Gate 12"
    },
    arrival: {
      city: "Mumbai",
      code: "BOM",
      airport: "Chhatrapati Shivaji Maharaj International Airport",
      terminal: "Terminal 2",
      date: "15 Mar 2024",
      time: "11:15",
      gate: "Gate 45"
    },
    duration: "2h 45m",
    distance: "1138 km",
    class: "Economy",
    baggage: {
      cabin: "7 kg",
      checkin: "15 kg"
    },
    fareRules: {
      cancellation: "Free cancellation up to 24 hours before departure",
      changes: "Changes allowed with fee",
      refundable: "Partially refundable"
    }
  });

  const [fareBreakdown, setFareBreakdown] = useState({
    baseFare: 3500,
    taxes: {
      gst: 525,
      passengerServiceFee: 300,
      userDevelopmentFee: 200,
      securityFee: 125
    },
    convenienceFee: 249,
    total: 4899
  });

  const [loyaltyEarned, setLoyaltyEarned] = useState({
    points: 489,
    tier: "Gold",
    nextTier: "Platinum",
    pointsNeeded: 251
  });

  useEffect(() => {
    if (location.state?.bookingData) {
      setTravellers([location.state.bookingData]);
    }
  }, [location]);


  const handleBookAnother = () => {
    navigate("/profile");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 pt-30 pb-12">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-linear-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <FaCheckCircle className="text-white text-5xl" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <FaStar className="text-white text-sm" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your flight has been booked successfully. Your e-ticket has been sent to your email.
          </p>
          <div className="mt-4 bg-linear-to-r from-blue-600 to-purple-600 text-white text-lg font-medium py-2 px-6 rounded-full inline-block">
            Booking ID: <span className="font-bold tracking-wider">{bookingDetails.bookingId}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Flight & Passenger Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Flight Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Flight Details</h2>
                    <p className="opacity-90">AirContrip Airlines • {flightDetails.flightNumber}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <FaPlane className="text-3xl transform -rotate-45" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* Flight Timeline */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{flightDetails.departure.time}</div>
                      <div className="text-sm text-gray-600">{flightDetails.departure.date}</div>
                      <div className="font-semibold text-gray-800 mt-1">{flightDetails.departure.city}</div>
                      <div className="text-xs text-gray-500">({flightDetails.departure.code})</div>
                      <div className="text-xs text-gray-500 mt-1">{flightDetails.departure.terminal}</div>
                    </div>
                    
                    <div className="flex-1 mx-8">
                      <div className="relative">
                        <div className="h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full"></div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <FaPlane className="text-gray-400 text-xl transform -rotate-45" />
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <div className="font-semibold text-gray-700">{flightDetails.duration}</div>
                        <div className="text-xs text-gray-500">Non-stop</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{flightDetails.arrival.time}</div>
                      <div className="text-sm text-gray-600">{flightDetails.arrival.date}</div>
                      <div className="font-semibold text-gray-800 mt-1">{flightDetails.arrival.city}</div>
                      <div className="text-xs text-gray-500">({flightDetails.arrival.code})</div>
                      <div className="text-xs text-gray-500 mt-1">{flightDetails.arrival.terminal}</div>
                    </div>
                  </div>
                </div>
                
                {/* Flight Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Flight No.</div>
                    <div className="font-semibold">{flightDetails.flightNumber}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Class</div>
                    <div className="font-semibold">{flightDetails.class}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Cabin Baggage</div>
                    <div className="font-semibold">{flightDetails.baggage.cabin}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600">Check-in Baggage</div>
                    <div className="font-semibold">{flightDetails.baggage.checkin}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaUser className="text-blue-600 mr-3" />
                Passenger Details
              </h2>
              
              <div className="space-y-6">
                {travellers.map((traveller, index) => (
                  <div key={traveller.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold text-gray-900">
                            {booking.title} {booking.firstName} {booking.lastName}
                          </h3>
                          {traveller.isPrimary && (
                            <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                              Primary Passenger
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            Age: {calculateAge(traveller.dateOfBirth)} years
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <FaMapMarkerAlt className="mr-1" />
                            {booking.nationality}
                          </span>
                          <span>•</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Seat: {traveller.seatNumber || "12A"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Passenger {index + 1}</div>
                        <div className="text-lg font-bold text-blue-600">{flightDetails.class}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                            <FaPassport className="text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Passport Number</div>
                            <div className="font-semibold">{booking.passportNumber}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                            <FaCalendarAlt className="text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Passport Expiry</div>
                            <div className="font-semibold">{formatDate(traveller.passportExpiry)}</div>
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
                            <div className="font-semibold">{booking.email}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                            <FaPhone className="text-red-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Phone</div>
                            <div className="font-semibold">{booking.phone}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Preferences */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 bg-blue-50 text-blue-800 rounded-full flex items-center">
                          <span className="mr-2">✈️</span>
                          Seat: {booking.seatPreference}
                        </div>
                        <div className="px-4 py-2 bg-green-50 text-green-800 rounded-full flex items-center">
                          <span className="mr-2">🍽️</span>
                          Meal: {booking.mealPreference}
                        </div>
                        {traveller.specialRequests && traveller.specialRequests !== "None" && (
                          <div className="px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full">
                            Special: {booking.specialRequests}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaShieldAlt className="text-blue-600 mr-3" />
                Important Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Check-in Information</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Web check-in opens 48 hours before departure. Arrive at airport 3 hours before international flights.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Baggage Allowance</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {flightDetails.baggage.cabin} cabin + {flightDetails.baggage.checkin} check-in baggage included.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Travel Documents</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Carry valid passport and visa. E-ticket and photo ID required at airport.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-yellow-600 font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">COVID-19 Guidelines</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Follow local health guidelines. Masks recommended. Check destination requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary & Actions */}
          <div className="space-y-8">
            {/* Booking Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-bold text-blue-600">{bookingDetails.bookingId}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">PNR Number</span>
                  <span className="font-bold text-gray-900">{bookingDetails.pnrNumber}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Booking Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                    {bookingDetails.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    {bookingDetails.paymentStatus}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold">{bookingDetails.paymentMethod}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-semibold text-sm">{bookingDetails.transactionId}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Booking Date</span>
                  <span className="font-semibold">{bookingDetails.bookingDate}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Booking Time</span>
                  <span className="font-semibold">{bookingDetails.bookingTime}</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-900 font-bold">Total Paid</span>
                  <span className="text-3xl font-bold text-green-600">{bookingDetails.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Fare Breakdown</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span>₹{fareBreakdown.baseFare}</span>
                </div>
                
                <div className="pl-4 space-y-2 border-l-2 border-blue-200">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">GST (18%)</span>
                    <span className="text-sm">₹{fareBreakdown.taxes.gst}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Passenger Service Fee</span>
                    <span className="text-sm">₹{fareBreakdown.taxes.passengerServiceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">User Development Fee</span>
                    <span className="text-sm">₹{fareBreakdown.taxes.userDevelopmentFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Security Fee</span>
                    <span className="text-sm">₹{fareBreakdown.taxes.securityFee}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Convenience Fee</span>
                  <span>₹{fareBreakdown.convenienceFee}</span>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{fareBreakdown.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Loyalty Points */}
            <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">You've Earned</div>
                  <div className="text-3xl font-bold text-yellow-600">{loyaltyEarned.points} Points</div>
                  <div className="text-sm text-gray-600 mt-1">Added to your Airtribe account</div>
                </div>
                <div className="w-16 h-16 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <FaStar className="text-white text-2xl" />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Tier Progress</span>
                  <span className="font-semibold">{loyaltyEarned.tier} → {loyaltyEarned.nextTier}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-linear-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                    style={{ width: `${(loyaltyEarned.points / (loyaltyEarned.points + loyaltyEarned.pointsNeeded)) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right mt-1">
                  {loyaltyEarned.pointsNeeded} points to {loyaltyEarned.nextTier}
                </div>
              </div>
            </div>

            {/* QR Code for Mobile Ticket */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <FaQrcode className="text-blue-600 text-xl mr-2" />
                  <h3 className="font-bold text-gray-900">Digital Boarding Pass</h3>
                </div>
                
                <div className="flex justify-center">
                  <div className="p-4 bg-white border-2 border-blue-200 rounded-xl">
                    <QRCodeSVG 
                      value={`AIRCON:${bookingDetails.bookingId}:${flightDetails.flightNumber}:${flightDetails.departure.code}`}
                      size={150}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-4">
                  Show this QR code at airport check-in counters
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                className="w-full flex items-center justify-center space-x-3 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaPrint className="text-xl" />
                <span>Print Ticket</span>
              </button>
              
              <button
                className="w-full flex items-center justify-center space-x-3 py-4 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FaDownload className="text-xl" />
                <span>Download Ticket</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="flex items-center justify-center space-x-2 py-3 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                >
                  <FaEnvelopeOpen />
                  <span>Email</span>
                </button>
                
                <button
                  className="flex items-center justify-center space-x-2 py-3 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBookAnother}
                  className="py-3 bg-linear-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all"
                >
                  Book Another
                </button>
                
                <button
                  onClick={handleGoToHome}
                  className="py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaHome />
                  <span>Home</span>
                </button>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
              <h4 className="font-bold text-gray-900 mb-3">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Our customer support team is available 24/7 to assist you.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-24">Phone:</span>
                  <span className="font-semibold">1800-123-4567</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-24">Email:</span>
                  <span className="font-semibold">support@aircontrip.com</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-24">Live Chat:</span>
                  <span className="font-semibold">Available 24x7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Thank you for choosing AirContrip Airlines. We wish you a pleasant journey! ✈️
          </p>
          <p className="mt-2">
            Booking reference: {bookingDetails.bookingId} • 
            PNR: {bookingDetails.pnrNumber} • 
            Issued on: {bookingDetails.bookingDate} at {bookingDetails.bookingTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravellerDetails;