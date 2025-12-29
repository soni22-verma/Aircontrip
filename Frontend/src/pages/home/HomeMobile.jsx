import React, { useEffect, useState } from 'react'
import { FaHotel } from "react-icons/fa6";
import { MdFlightTakeoff } from "react-icons/md";
import { LuSquareActivity } from "react-icons/lu";
import { Calendar, Users, Search, Activity } from 'lucide-react';
import { Plane, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const HomeMobile = () => {
  const navigate = useNavigate();
  
  const [flighthotel, setFlightHotel] = useState(false);
  const [activity, setActivity] = useState(false)

  const [flight, setFlight] = useState(false)
  const [hotel, setHotel] = useState(true)
  const [rooms, setRooms] = useState(1);

  const [passenger, setPassenger] = useState(true)

  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [passengerClass, setPassengerClass] = useState('Economy');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [passenger1, setPassenger1] = useState(false)

  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [travelClass, setTravelClass] = useState('Economy');

  //hotal k liye input box with suggestion only static
  const[search,setSearch]=useState("")
  const[result,setResult]=useState([])

 const destinations = [
    { city: "Delhi", code: "DEL", country: "India" },
    { city: "Mumbai", code: "BOM", country: "India" },
    { city: "Goa", code: "GOI", country: "India" },
    { city: "Dubai", code: "DXB", country: "UAE" },
    { city: "London", code: "LHR", country: "UK" },
  ];

  useEffect(()=>{
    if(search.trim() === ""){
      setResult([]);
      return;
      }

      const filtered = destinations.filter((item) =>
       item.city.toLowerCase().includes(search.toLowerCase())
      )
      setResult(filtered)
  },[search])

  



  // Calculate if values are at min/max
  const isRoomMin = rooms <= 1;
  const isRoomMax = rooms >= 5;
  const isAdultMin = adults <= 1;
  const isAdultMax = adults >= 10;
  const isChildMin = children <= 0;
  const isChildMax = children >= 10;

  const handleIncrement = (type) => {
    switch (type) {
      case 'adult':
        if (adults < 10) setAdults(adults + 1);
        break;
      case 'child':
        if (children < 10) setChildren(children + 1);
        break;
      case 'infant':
        if (infants < 10) setInfants(infants + 1);
        break;
      default:
        break;
    }
  };

  const handleDecrement = (type) => {
    switch (type) {
      case 'adult':
        if (adults > 1) setAdults(adults - 1);
        break;
      case 'child':
        if (children > 0) setChildren(children - 1);
        break;
      case 'infant':
        if (infants > 0) setInfants(infants - 1);
        break;
      default:
        break;
    }
  };
 
  const handleOK = () => {
    const totalPassengers = adults + children + infants;
    alert(`${totalPassengers} Passenger(s), ${passengerClass} selected:\nAdults: ${adults}\nChildren: ${children}\nInfants: ${infants}`);
    setShowPassengerModal(false);
  };

  const totalPassengers = adults + children + infants;
  const passengerSummary = `${totalPassengers} Passenger${totalPassengers !== 1 ? 's' : ''}, ${passengerClass}`;

  const showSection = (type) => {
    setHotel(type === "hotel");
    setFlight(type === "flight");
    setActivity(type === "activity")
    setFlightHotel(type === "flighthotel")
  };

  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    economy: true
  });

  const [checkIn, setCheckIn] = useState('Tue, Dec 16');
  const [checkOut, setCheckOut] = useState('Wed, Dec 17');
  const [roomConfig, setRoomConfig] = useState({
    rooms: 1,
    adults: 2,
    children: 0
  });
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Mock date increment for demo purposes
  const incrementDate = (dateStr) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date();
    date.setDate(date.getDate() + 3); // Add 3 days for demo
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const handleCheckIn = () => {
    setCheckIn(incrementDate(checkIn));
  };

  const handleCheckOut = () => {
    setCheckOut(incrementDate(checkOut));
  };

  const updateRoomConfig = (type, value) => {
    if (value >= 0) {
      setRoomConfig(prev => ({
        ...prev,
        [type]: value
      }));
    }
  };

  const handleSearch = () => {
    alert(`Searching for:\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\n${roomConfig.rooms} Room(s), ${roomConfig.adults} Adult(s), ${roomConfig.children} Children`);
  };

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  const [tripType, setTripType] = useState("One-way");


  const [differentCity, setDifferentCity] = useState(true);
  const InputBox = ({ icon, label }) => (
    <div className="flex items-center gap-3 border rounded-xl p-4 mb-4">
      <span className="text-gray-500">{icon}</span>
      <input
        placeholder={label}
        className="w-full outline-none text-gray-700"
      />
    </div>
  );

  const DateBox = ({ label, date }) => (
    <div className="border rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-1 text-gray-500 text-sm">
        <Calendar size={16} /> {label}
      </div>
      <p className="font-bold text-blue-600">{date}</p>
    </div>
  );

  const InfoBox = ({ icon, text }) => (
    <div className="flex items-center gap-3 border rounded-xl p-4 mb-4">
      <span className="text-gray-500">{icon}</span>
      <p className="text-gray-700 font-medium">{text}</p>
    </div>
  );



  const CounterRow = ({ label, value, onIncrease, onDecrease  , min = 0 }) => (
    <div className="flex items-center justify-between py-4 border-b">
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={()=>onDecrease()}
          disabled={value <= min}
          className={`w-10 h-10 rounded-full border flex items-center justify-center 
        ${value <= min ? "opacity-40" : "border-blue-500 text-blue-500"}`}
        >
          <Minus size={18} />
        </button>

        <button
          onClick={onIncrease}
          className="w-10 h-10 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );

  const Counter = ({ label, value, setValue, min }) => (
    <div className="flex items-center justify-between px-4 py-5 border-b">
      <span className="text-lg">{label}</span>
      <div className="flex items-center gap-4">
        <button
          disabled={value === 0}

          onClick={() => setValue(value - 1 )}
          className="disabled:opacity-30"
        >
          <Minus />
        </button>

        <span className="text-lg font-semibold">{value}</span>

        <button onClick={() => setValue(value + 1)}>
          <Plus className="text-blue-600" />
        </button>
      </div>
    </div>
  );
  

  const ClassButton = ({ name }) => (
    <button
      onClick={() => setTravelClass(name)}
      className={`px-5 py-3 rounded-lg border font-semibold
        ${
          travelClass === name
            ? "bg-blue-600 text-white border-blue-600 shadow"
            : "border-blue-600 text-blue-600"
        }
      `}
    >
      {name}
    </button>
  );


  return (
    <>
      {passenger ?
        <div className='w-full min-h-screen flex justify-center items-center '>
          <div className="w-full">
            <img src='https://wallpapercave.com/wp/wp2555218.jpg' className='object-cover h-[1050px] absolute top-0 left-0 z-0'

            />
          
          </div>

          <div className=" absolute top-[15%] ">
            <div className="flex flex-nowrap justify-center items-center overflow-x-auto gap-3 scrollbar-hide">

              {/* Hotels */}
              <button
                onClick={() => showSection("hotel")}
                className="  border border-black px-2 py-3 hover:bg-white  gap-2 font-bold text-white hover:text-indigo-600 text-sm   flex flex-col  items-center justify-center whitespace-nowrap   rounded-2xl"
              >
                <FaHotel size={20} className='justify-center flex' /> Hotels
              </button>

              {/* Flights */}
              <button
                onClick={() => showSection("flight")}
                className=" border border-black px-2 py-3 hover:bg-white  gap-2 font-bold text-white hover:text-indigo-600 text-sm  flex flex-col  items-center justify-center whitespace-nowrap rounded-2xl"
              >
                <MdFlightTakeoff size={25} /> Flights
              </button>

              {/* Activities */}
              <button
                onClick={() => showSection("activity")}
                className=" border border-black px-2 py-3 hover:bg-white  gap-1 font-bold text-white hover:text-indigo-600 text-sm  flex flex-col  items-center justify-center whitespace-nowrap rounded-2xl"
              >
                <LuSquareActivity size={25} /> Activities
              </button>


              {/* Flight + Hotel */}
              <button
                onClick={() => showSection("flighthotel")}
                className=" border border-black px-2 py-3 hover:bg-white  gap-2 font-bold text-white hover:text-indigo-600 text-sm  flex flex-col  items-center justify-center whitespace-nowrap rounded-2xl"
              >
                <div className='flex-row flex'>
                  <FaHotel size={20} />
                  <MdFlightTakeoff size={25} />
                </div>
                Flight + Hotel
              </button>

            </div>

            {hotel && (
              
              <div className="flex items-start justify-center h-screen pt-10 m-3">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                  <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Where would you like to go?
                  </h1>

                  {/* Destination Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      placeholder="Enter city, hotel, or landmark"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  {/* Date Selection */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                   
                      <div
                        className="group p-4 border border-gray-300 rounded-xl
               hover:border-blue-500 hover:bg-blue-50
               transition-all duration-200 text-left"
                      >
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                          <span className="text-sm font-medium text-gray-700">Check-in</span>
                        </div>

                        {/* Date Picker */}
                        <DatePicker
                          selected={checkIn}
                          onChange={(date) => setCheckIn(date)}
                          placeholderText="Select date"
                          className="w-full text-lg font-bold text-gray-900
                 bg-transparent border-none outline-none
                 focus:ring-0 cursor-pointer"
                          calendarClassName="!rounded-xl"
                          popperPlacement="bottom-start"
                        />

                        <div className="text-xs text-gray-500 mt-1">
                          Click to change
                        </div>
                      </div>
                   


                    <div
                        className="group p-4 border border-gray-300 rounded-xl
               hover:border-blue-500 hover:bg-blue-50
               transition-all duration-200 text-left"
                      >
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                          <span className="text-sm font-medium text-gray-700">Check-out</span>
                        </div>

                        {/* Date Picker */}
                        <DatePicker
                          selected={checkIn}
                          onChange={(date) => setCheckOut(date)}
                          placeholderText="Select date"
                          className="w-full text-lg font-bold text-gray-900
                 bg-transparent border-none outline-none
                 focus:ring-0 cursor-pointer"
                          calendarClassName="!rounded-xl"
                          popperPlacement="bottom-start"
                        />

                        <div className="text-xs text-gray-500 mt-1">
                          Click to change
                        </div>
                      </div>
                  </div>

                  {/* Room Configuration */}
                  <div className="relative mb-8">
                    <button
                      onClick={toggleConfig}
                      className="w-full p-4 border border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="text-lg font-bold text-gray-900">
                            {roomConfig.rooms} Room{roomConfig.rooms !== 1 ? 's' : ''}, {roomConfig.adults} Adult{roomConfig.adults !== 1 ? 's' : ''}, {roomConfig.children} Children
                          </div>
                          <div className="text-sm text-gray-500">Click to modify</div>
                        </div>
                      </div>
                      <div className="text-gray-400">
                        {isConfigOpen ? '▲' : '▼'}
                      </div>
                    </button>

                    {/* Configuration Panel */}
                    {isConfigOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10">
                        <div className="space-y-4">
                          {/* Rooms */}
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Rooms</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateRoomConfig('rooms', roomConfig.rooms - 1)}
                                disabled={roomConfig.rooms <= 1}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-bold">{roomConfig.rooms}</span>
                              <button
                                onClick={() => updateRoomConfig('rooms', roomConfig.rooms + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Adults */}
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Adults</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateRoomConfig('adults', roomConfig.adults - 1)}
                                disabled={roomConfig.adults <= 1}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-bold">{roomConfig.adults}</span>
                              <button
                                onClick={() => updateRoomConfig('adults', roomConfig.adults + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Children</span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateRoomConfig('children', roomConfig.children - 1)}
                                disabled={roomConfig.children <= 0}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-bold">{roomConfig.children}</span>
                              <button
                                onClick={() => updateRoomConfig('children', roomConfig.children + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Search className="w-5 h-5" />
                    SEARCH
                  </button>
                </div>
              </div>

            )}

            {flight &&
              (<div className="flex items-start justify-center h-screen pt-15 m-3">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4 space-y-4">

                  {/* Trip Type */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setTripType("One-way")}
                      className={`flex-1 py-3 rounded-lg font-semibold border
              ${tripType === "One-way"
                          ? "bg-blue-600 text-white shadow"
                          : "bg-white text-blue-600 border-blue-600"
                        }`}
                    >
                      One-way
                    </button>

                    <button
                      onClick={() => setTripType("Round-trip")}
                      className={`flex-1 py-3 rounded-lg font-semibold border
              ${tripType === "Round-trip"
                          ? "bg-blue-600 text-white shadow"
                          : "bg-white text-blue-600 border-blue-600"
                        }`}
                    >
                      Round-trip
                    </button>
                  </div>

                  {/* Flying From */}
                  <div className="flex items-center gap-3 border rounded-xl p-4">
                    <Plane className="text-gray-500" />
                    <input
                      placeholder="Flying from"
                      className="w-full outline-none"
                    />
                  </div>

                  {/* Flying To */}
                  <div className="flex items-center gap-3 border rounded-xl p-4">
                    <MapPin className="text-gray-500" />
                    <input
                      placeholder="Flying to"
                      className="w-full outline-none"
                    />
                  </div>

                  {/* Departure */}
                  <div className="border rounded-xl p-4 cursor-pointer">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Departure
                    </label>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      <input
                        type="date"
                        className="outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Return (Only Round-trip) */}
                  {tripType === "Round-trip" && (
                    <div className="border rounded-xl p-4 cursor-pointer">
                      <label className="text-sm text-gray-500 mb-1 block">
                        Return
                      </label>

                      <div className="flex items-center gap-2 text-blue-600 font-semibold">
                        <input
                          type="date"
                          className="outline-none bg-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {/* Passenger */}
                  <div onClick={() => setPassenger(false)} className="flex items-center gap-3 border rounded-xl p-4">
                    <User className="text-gray-500" />
                    <p className="font-medium"> {passengers.adults + passengers.children}  Passenger</p>
                  </div>

                  {/* Search Flights */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold shadow">
                    Search flights
                  </button>

                  {/* Flight + Hotel */}
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50">
                    Search flight + hotel
                  </button>

                </div>
              </div>)
            }

            {activity && (
              <div className='flex items-start  justify-center h-screen pt-20 px-4 '>
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5 space-y-4">


                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 max-w-5xl mx-auto text-gray-600">

                    <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                      Find your next adventure
                    </h1>

                    <p className="mt-3 text-sm sm:text-lg max-w-xl">
                      Bringing you the best activities from across the world
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 flex items-center bg-white border border-gray-500 rounded-full max-w-xl shadow-lg">

                      <div className="flex items-center gap-3 px-4 flex-2">
                        <Search className="text-gray-500" />
                        <input
                          placeholder="New Delhi and NCR"
                          className="w-full outline-none text-gray-700"
                        />
                      </div>

                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full">
                        <Search />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {passenger1 ? (

              <div className="fixed inset-0 bg-gray-100 z-50">
                {/* HEADER */}
                <div className="flex items-center gap-3 bg-blue-600 text-white p-4">
                  <ChevronLeft
                    className="cursor-pointer"
                    onClick={() => setPassenger1(false)}
                  />
                  <h2 className="text-lg font-semibold">
                    {adults} Passenger, {travelClass}, {rooms} Room
                  </h2>
                </div>

                {/* CLASS SELECTION */}
                <div className="p-4 grid grid-cols-3 gap-3">
                  {["Economy", "Premium economy", "Business"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setTravelClass(c)}
                      className={`${box} ${travelClass === c ? active : inactive
                        }`}
                    >
                      {c}
                    </button>
                  ))}

                  <button
                    onClick={() => setTravelClass("First")}
                    className={`${box} col-span-3 ${travelClass === "First" ? active : inactive
                      }`}
                  >
                    First
                  </button>
                </div>

                {/* COUNTERS */}
                <div className="bg-white mt-2">
                  <Counter
                    label="Room"
                    value={rooms}
                    setValue={setRooms}
                    min={1}
                  />
                  <Counter
                    label="Adult"
                    value={adults}
                    setValue={setAdults}
                    min={1}
                  />
                  <Counter
                    label="Children"
                    value={children}
                    setValue={setChildren}
                    min={0}
                  />
                </div>

                {/* OK BUTTON */}
                <div className="fixed bottom-4 left-4 right-4">
                  <button
                    onClick={() => setPassenger1(false)}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold"
                  >
                    OK
                  </button>
                </div>
              </div>


            ) 
            : flighthotel && (
              <div className="flex justify-center px-4 py-6">

                <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-xl">

                  {/* Trip Type */}
                  <div className="flex gap-3 m-2">
                    <button
                      onClick={() => setTripType("One-way")}
                      className={`flex-1 py-3 rounded-lg font-semibold border
              ${tripType === "One-way"
                          ? "bg-blue-600 text-white shadow"
                          : "bg-white text-blue-600 border-blue-600"
                        }`}
                    >
                      One-way
                    </button>

                    <button
                      onClick={() => setTripType("Round-trip")}
                      className={`flex-1 py-3 rounded-lg font-semibold border
              ${tripType === "Round-trip"
                          ? "bg-blue-600 text-white shadow"
                          : "bg-white text-blue-600 border-blue-600"
                        }`}
                    >
                      Round-trip
                    </button>
                  </div>

                  {/* Flying From */}
                  <InputBox icon={<Plane />} label="Flying from" />

                  {/* Flying To */}
                  <InputBox icon={<MapPin />} label="Flying to" />

                  {/* Departure */}
                  <div className="border rounded-xl p-4 mb-3 cursor-pointer">
                    <label className="text-sm text-gray-500 mb-1 block">
                      Departure
                    </label>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      <input
                        type="date"
                        className="outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {tripType === "Round-trip" && (
                    <div className="border rounded-xl p-4 mb-3 cursor-pointer">
                      <label className="text-sm text-gray-500 mb-1 block">
                        Return
                      </label>

                      <div className="flex items-center gap-2 text-blue-600 font-semibold">
                        <input
                          type="date"
                          className="outline-none bg-transparent"
                        />
                      </div>
                    </div>
                  )}


                  {/* Passenger */}

                 <div onClick={() => setPassenger(false)} className="flex items-center gap-3 border rounded-xl p-4">
                    <User className="text-gray-500" />
                    <p className="font-medium"> {passengers.adults + passengers.children}  Passenger</p>
                  </div>


                  {/* Checkbox */}
                  <label className="flex items-center gap-3 my-4 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={differentCity}
                      onChange={() => setDifferentCity(!differentCity)}
                      className="w-5 h-5 accent-blue-600"
                    />
                    Need a different city and dates
                  </label>

                  {/* Conditional Section */}
                  {differentCity && (
                    <>
                      <InfoBox icon={<MapPin />} text="Nearby" />

                      <div className="flex border rounded-xl overflow-hidden mb-5">
                        <div className="flex-1 p-4">
                          <p className="text-xs text-gray-500">Check-in</p>
                          <p className="font-bold text-blue-600">Tue, Dec 23</p>
                        </div>


                        <div className="w-px bg-gray-300" />
                        <div className="flex-1 p-4">
                          <p className="text-xs text-gray-500">Check-out</p>
                          <p className="font-bold text-blue-600">Fri, Dec 26</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Search Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg">
                    Search Flight+Hotel
                  </button>

                </div>
              </div>

            )}

          </div>

        </div> :

        <div>




          <div className="h-[600px] bg-gray-100 ">
      {/* HEADER */}
      <div className="bg-blue-600 text-white p-4 flex items-center gap-3">
        <ChevronLeft onClick={()=>setPassenger(true)} className="cursor-pointer" />
        <h2 className="text-lg font-semibold">
          {totalPassengers} Passenger, {travelClass}
        </h2>
      </div>

      {/* CONTENT */}
      <div className="p-4 bg-gray-100">
        {/* CLASS SELECTION */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <ClassButton name="Economy" />
          <ClassButton name="Premium economy" />
          <ClassButton name="Business" />
        </div>

        <div className="flex justify-center mb-6">
          <ClassButton name="First" />
        </div>

        {/* COUNTERS */}
        <div className="bg-white rounded-xl px-4">
          <Counter
            label="Adults (12yrs and above)"
            value={adults}
            setValue={setAdults}
          />
          <Counter
            label="Children (2-11yrs)"
            value={children}
            setValue={setChildren}
          />
          <Counter
            label="Infants (below 2yrs)"
            value={infants}
            setValue={setInfants}
          />
        </div>
      </div>

      
    </div>



        </div>



      }

    </>


  )
}


export default HomeMobile