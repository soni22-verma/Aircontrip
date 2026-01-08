import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FaUserLarge, FaPlane, FaCalendarCheck, FaRupeeSign } from "react-icons/fa6";
import { LuLogOut, LuFileText, LuDownload } from "react-icons/lu";
import { HiTicket } from "react-icons/hi2";
import { MdOutlineFlightTakeoff, MdOutlineFlightLand } from "react-icons/md";
// import { TbSeat } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import api from "../../../services/endpoint";
import axios from "axios";
import { logoutUser, setUser } from "../../store/userSlice";
import swal from "sweetalert"
import { toast } from "react-toastify";

const Mobilebottom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBooking, setShowBooking] = useState(false);
  
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingTab, setBookingTab] = useState('current'); // 'current', 'upcoming', 'past'


  const [profilePic, setProfilePic] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [error, setError] = useState("")
  const [booking, setBooking] = useState("")



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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerData({
      ...passengerData,
      [name]: value
    });
  };



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

  const handleBooking = async (e) => {

    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    e.preventDefault();

    try {
      const res = await axios.post(api.user.bookingticket, {
        name: passengerData.name,
        email: passengerData.email,
        phone: passengerData.phone,
        gender: passengerData.gender,
        age: passengerData.age
      })
      console.log("response", res.data);
      if (res.data.success) {
        localStorage.setItem(
          "bookingDetails",
          JSON.stringify(passengerData)
        );
        setPassengerData({
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

         toast?.success("Your Ticket is Confirmed! Thankyou 😊");
        setShowBookingForm(false);
        navigate("/");
      }
           

    } catch (error) {
      console.log("Booking Error:", error.response || error.message)
      setError(error.response?.data?.message || "Booking failed")
      setBooking("")
    }
  }

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
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Passenger Details</h3>
                      <button onClick={() => setShowBookingForm(false)} className="text-gray-500 hover:text-gray-700">
                        ✕
                      </button>
                    </div>

                    {/* Passenger Form */}
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={passengerData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          placeholder="Enter full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={passengerData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          placeholder="Enter email"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={passengerData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-lg"
                          placeholder="Enter phone number"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Gender *</label>
                          <select
                            name="gender"
                            value={passengerData.gender}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                            required
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">Age *</label>
                          <input
                            type="number"
                            name="age"
                            value={passengerData.age}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Age"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowBookingForm(false)}
                          className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"

                          className="flex-1 py-3 bg-blue-600 text-white rounded-lg"
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </form>
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
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
                {/* <FaHistory className="text-2xl text-blue-600 mb-2" /> */}
                <span className="text-sm font-medium">Booking History</span>
              </button>
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