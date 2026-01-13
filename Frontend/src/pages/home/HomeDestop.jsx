import React, { useState, useEffect, useRef } from 'react'
import { FaHotel } from "react-icons/fa6";
import { MdFlightTakeoff } from "react-icons/md";
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { MdHomeWork } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { MdHolidayVillage } from "react-icons/md";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link, useNavigate } from 'react-router-dom';


const HomeDestop = () => {
  



  const retRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState('20 Dec 2025');
  const [selectedDay, setSelectedDay] = useState('Saturday');
  const [roomCount, setRoomCount] = useState(1);
  const [adultCount, setAdultCount] = useState(2);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [addflight, setAddflight] = useState(false);
  const [tripType, setTripType] = useState("oneway");
  const [openDep, setOpenDep] = useState(false);
  const [openRet, setOpenRet] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false)


  const [flight, setFlight] = useState(false)
  const [hotel, setHotel] = useState(true)

  const [departure, setDeparture] = useState(new Date());
  const [passenger, setPassenger] = useState("1 Passenger, Economy");

  const [checked, setChecked] = useState(false);

  const [bus, setBus] = useState(false)
  const [activity, setActivity] = useState(false)
  const [airport, setAirport] = useState(false)

  const [date, setDate] = useState("");
  const [time, setTime] = useState("00:00");
  const [passengers, setPassengers] = useState(1);
  const [room, setRoom] = useState(1);
  const [trip, setTrip] = useState("")
  const [ecnomy, setEcnomy] = useState("")

  const [flighthotel, setFlightHotel] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [stays, setStays] = useState(false)
  const [nightstay, setNightstay] = useState(true)
  const [rotated, setRotated] = useState(false);


  const handleSwap = () => {
    // rotate toggle
    setRotated(prev => !prev);


    const temp = fromSearch;
    setFromSearch(toSearch);
    setToSearch(temp);

    // suggestions clear
    setFromResult([]);
    setToResult([]);
  };


  //Hotal ka first flight search
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([]);

  const destinations = [
    { city: "Delhi", code: "DEL", country: "India" },
    { city: "Mumbai", code: "BOM", country: "India" },
    { city: "Goa", code: "GOI", country: "India" },
    { city: "Dubai", code: "DXB", country: "UAE" },
    { city: "London", code: "LHR", country: "UK" },
  ];
  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = destinations.filter((item) =>
      item.city.toLowerCase().includes(search.toLowerCase())
    );

    setResults(filtered);
  }, [search]);

  //Hotal ka second search button
  const [searchs, setSearchs] = useState("");
  const [result, setResult] = useState("");


  const destinationsairport = [
    { city: "Delhi", airport: "Indira Gandhi International Airport", code: "DEL" },
    { city: "Mumbai", airport: "Chhatrapati Shivaji International Airport", code: "BOM" },
    { city: "Goa", airport: "Dabolim Airport", code: "GOI" },
    { city: "Dubai", airport: "Dubai International Airport", code: "DXB" },
    { city: "London", airport: "Heathrow Airport", code: "LHR" },
  ];

  useEffect(() => {
    if (!searchs.trim()) {
      setResult([]);
      return;
    }

    const filtereds = destinationsairport.filter((item) =>
      item.city.toLowerCase().includes(searchs.toLowerCase())
    );
    setResult(filtereds);
  }, [searchs]);


  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  //flight ka first earch

  const [fromSearch, setFromSearch] = useState("")
  const [fromResult, setFromResult] = useState([])
  const findFrom = [
    { city: "Delhi", code: "DEL", country: "India" },
    { city: "Mumbai", code: "BOM", country: "India" },
    { city: "Goa", code: "GOI", country: "India" },
    { city: "Dubai", code: "DXB", country: "UAE" },
    { city: "London", code: "LHR", country: "UK" },
    { city: "Banares", code: "BAN", contry: "India" },

  ]

  useEffect(() => {
    if (!fromSearch || fromSearch.trim() === "") {
      setFromResult([]);
      return;
    }

    const filtered = findFrom.filter((item) =>
      item.city.toLowerCase().includes(fromSearch.toLowerCase())
    );

    setFromResult(filtered);
  }, [fromSearch]);

  //flight ka second search input field
  const [toResult, setToResult] = useState("")
  const [toSearch, setToSearch] = useState("")
  const findTo = [
    { city: "Delhi", code: "DEL", country: "India" },
    { city: "Mumbai", code: "BOM", country: "India" },
    { city: "Goa", code: "GOI", country: "India" },
    { city: "Dubai", code: "DXB", country: "UAE" },
    { city: "London", code: "LHR", country: "UK" },
    { city: "Banares", code: "BAN", contry: "India" },

  ]

  useEffect(() => {
    if (!toSearch || toSearch.trim() === "") {
      setToResult([]);
      return;
    }

    const filterto = findTo.filter((item) =>
      item.city.toLowerCase().includes(fromSearch.toLowerCase())
    );

    setToResult(filterto);
  }, [toSearch]);

  const handleSearch = () => {
    alert(`Departure: ${departure}\nPassenger: ${passenger}`);
  };
  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearchall = () => {
    alert(
      `From: ${from}\nTo: ${to}\nDeparture: ${departure}\nReturn: ${returnDate}`
    );
  };

  const handleAll = () => {
    alert(
      `Pick-up Date: ${date}\nTime: ${time}\nPassenger: ${passenger}`
    );
  };




  const dates = [
    { date: '20 Dec 2025', day: 'Saturday' },
    { date: '21 Dec 2025', day: 'Sunday' },
    { date: '22 Dec 2025', day: 'Monday' },
    { date: '23 Dec 2025', day: 'Tuesday' },
    { date: '24 Dec 2025', day: 'Wednesday' },
  ];

  const handleDateSelect = (d, day) => {
    setSelectedDate(d);
    setSelectedDay(day);
    setShowDatePicker(false);
  };



  useEffect(() => {
    if (!showDatePicker) {
      setShowSearch(true);
    }
  }, [showDatePicker]);

  const showSection = (type) => {
    setHotel(type === "hotel");
    setFlight(type === "flight");
    setBus(type === "bus");
    setActivity(type === "activity")
    setAirport(type === "airport")
    setFlightHotel(type === "flighthotel")

    setNightstay(type === "Nightstay")

  };


  return (
    <>
      <div className={` w-full   h-fit-content`} >
        <div className='w-full' >
          <img className='w-full h-[500px] absolute top-0 left-0 z-0' src="https://images5.alphacoders.com/372/372649.jpg" alt="" />
          <span className='h-30  block'></span>


          {/* Headers  */}

          <div className="w-[50%] relative mx-auto bg-white shadow-lg rounded-xl p-4 flex flex-wrap justify-center items-center gap-6 z-30 ">

            {/* Hotels */}
            <button
              onClick={() => showSection("hotel")}
              className="flex items-center gap-2 font-semibold text-gray-600 hover:text-blue-500 text-base"
            >
              <FaHotel size={20} /> Hotels
            </button>

            <div className="w-px h-8 bg-gray-300" />

            {/* Flights */}
            <button
              onClick={() => showSection("flight")}
              className="flex items-center gap-2 font-semibold text-gray-600 hover:text-blue-500 text-base"
            >
              <MdFlightTakeoff size={28} /> Flights
            </button>

            <div className="w-px h-8 bg-gray-300" />

            {/* Homes */}
            <button
              onClick={() => showSection("bus")}
              className="flex items-center gap-2 font-semibold text-gray-600 hover:text-blue-500 text-base"
            >
              <MdHomeWork size={26} /> Homes & Apts
            </button>

            <div className="w-px h-8 bg-gray-300" />



            {/* Flight + Hotel */}
            <button
              onClick={() => showSection("flighthotel")}
              className="flex items-center gap-1 font-semibold text-gray-600 hover:text-blue-500 whitespace-nowrap text-base"
            >
              <FaHotel size={20} />
              <MdFlightTakeoff size={28} />
              Flight + Hotel
            </button>

          </div>

          <div
            className="mx-auto relative -top-10  w-[90%] lg:w-[70%] z-10">

            <AnimatePresence mode='wait'>
              {hotel && (
                <motion.div
                  key="hotel"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bg-white shadow-2xl rounded-2xl p-8">

                    {/* TABS */}
                    <div className="flex justify-start items-start gap-3 m-6 pt-10">
                      <button onClick={() => setStays(false)} className={`border border-gray-400 hover:border-blue-400 hover:bg-blue-300 hover:text-blue-600 text-gray-600 px-4 py-3 rounded-full font-semibold text-sm"
         ${!stays
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-400 text-gray-600 hover:bg-blue-300 hover:text-blue-600"}`}>
                        Overnight stays
                      </button>
                      <button onClick={() => setStays(true)} className={`border border-gray-400 hover:border-blue-400 hover:bg-blue-300 hover:text-blue-600 text-gray-600 px-4 py-3 rounded-full font-semibold text-sm
          ${stays
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-400 text-gray-600 hover:bg-blue-300 hover:text-blue-600"}`}>
                        Day use Stay


                      </button>
                    </div>
                    {stays && (
                      <div className="flex items-start gap-3 pb-5">
                        {/* ICON */}
                        <MdHolidayVillage
                          size={32}
                          className="text-red-600 flex-shrink-0 sm:size-[36px]"
                        />

                        {/* TEXT */}
                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                          <span className="font-semibold text-pink-800">
                            Day Use Stays
                          </span>{" "}
                          are inexpensive, 4–12 hour room rentals that are not overnight.
                          Your check-in and check-out will be on the same date.
                        </p>
                      </div>
                    )}



                    {/* SEARCH BAR */}
                    <div className="w-full mb-6 relative">
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="🔍 Enter a destination or property"
                        className="border border-gray-300 shadow-sm rounded-lg px-4 py-3 w-full text-base"
                      />

                      {results.length > 0 && (
                        <div className="absolute left-0 right-0 bg-white shadow rounded mt-1 z-50">
                          {results.map((item, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setSearch(`${item.city} (${item.code})`);
                                setResults([]);
                              }}
                            >
                              {item.city} ({item.code})
                            </div>
                          ))}
                        </div>
                      )}
                    </div>


                    {/* GRID AREA */}
                    <div className="grid grid-cols-3 gap-6">

                      {/* DATE AREA */}
                      <div className="col-span-2">

                        <div className="flex justify-between mb-4">
                          <button
                            onClick={() => {
                              setShowSearch(false);
                              setShowDatePicker(!showDatePicker);
                            }}
                            className="text-blue-600 font-medium"
                          >
                            {showDatePicker ? "Hide options" : "Change dates"}
                          </button>
                        </div>

                        {/* SELECTED DATE BOX */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <div className="flex gap-4 items-center justify-between">

                            <div className="text-center flex-1">
                              <p className="text-sm text-gray-500">Selected Date</p>
                              <p className="text-lg font-bold">{selectedDate}</p>
                              <p className="text-sm text-blue-600">{selectedDay}</p>
                            </div>

                            <div className="text-center flex-1 border-l border-gray-300">
                              <p className="text-sm text-gray-500">Next Day</p>
                              <p className="text-lg font-bold">21 Dec 2025</p>
                              <p className="text-sm text-blue-600">Sunday</p>
                            </div>

                          </div>
                        </div>

                        {/* DATE PICKER */}
                        {showDatePicker && (
                          <div className="grid grid-cols-5 gap-3 text-sm">

                            <div className="col-span-5 flex justify-between mb-3">
                              <h3 className="font-semibold">Available Dates</h3>
                              <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                  <ChevronLeft />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                  <ChevronRight />
                                </button>
                              </div>
                            </div>

                            {dates.map((item, i) => (
                              <button
                                key={i}
                                onClick={() => handleDateSelect(item.date, item.day)}
                                className={`p-3 rounded-lg border text-sm ${selectedDate === item.date
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-gray-50 hover:bg-blue-50 border-gray-200"
                                  }`}
                              >
                                <p className="font-semibold">{item.date.split(" ")[0]}</p>
                                <p className="text-lg font-bold">{item.date.split(" ")[1]}</p>
                                <p>{item.date.split(" ")[2]}</p>
                                <p className="mt-1">{item.day}</p>
                              </button>
                            ))}

                          </div>
                        )}
                      </div>

                      {/* GUEST AREA */}
                      <div>
                        <div className="flex justify-between mb-4">
                          <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Users size={18} /> Guests & Rooms
                          </h2>
                          <button
                            onClick={() => setShowGuestPicker(!showGuestPicker)}
                            className="text-blue-600 font-medium"
                          >
                            {showGuestPicker ? "Done" : "Edit"}
                          </button>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Adults:</span>
                              <span className="font-semibold">{adultCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rooms:</span>
                              <span className="font-semibold">{roomCount}</span>
                            </div>
                          </div>
                        </div>

                        {showGuestPicker && (
                          <div className="border rounded-xl p-4 space-y-6">

                            {/* Adults */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Number of Adults</span>
                                <span className="font-semibold">{adultCount}</span>
                              </div>

                              <div className="flex gap-4">
                                <button
                                  disabled={adultCount <= 1}
                                  onClick={() => setAdultCount(adultCount - 1)}
                                  className={`p-3 rounded-lg border ${adultCount <= 1
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-red-50 text-red-600"
                                    }`}
                                >
                                  −
                                </button>

                                <button
                                  onClick={() => setAdultCount(adultCount + 1)}
                                  className="p-3 rounded-lg border bg-green-50 text-green-600"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Rooms */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Number of Rooms</span>
                                <span className="font-semibold">{roomCount}</span>
                              </div>

                              <div className="flex gap-4">
                                <button
                                  disabled={roomCount <= 1}
                                  onClick={() => setRoomCount(roomCount - 1)}
                                  className={`p-3 rounded-lg border ${roomCount <= 1
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-red-50 text-red-600"
                                    }`}
                                >
                                  −
                                </button>

                                <button
                                  onClick={() => setRoomCount(roomCount + 1)}
                                  className="p-3 rounded-lg border bg-green-50 text-green-600"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    </div>

                    {/* ADD FLIGHT */}
                    {!addflight && (
                      
                      <button
                        onClick={() => setAddflight(true)}
                        className="mt-6 text-blue-500 hover:bg-blue-200 rounded-2xl px-4 py-2 font-semibold"
                      >
                        + Add Flight
                      </button>
                    )}

                    {addflight && (
                      <div className="mt-6 bg-white p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-base">Flight Search</h4>
                          <button
                            onClick={() => setAddflight(false)}
                            className="text-blue-500 hover:bg-blue-200 rounded-2xl px-4 py-2 font-medium"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex gap-4 relative">
                          {/* INPUT */}
                          <div className="w-[36%] relative">
                            <input
                              value={searchs}
                              onChange={(e) => setSearchs(e.target.value)}
                              placeholder="✈️ city or airport name"
                              className="w-full border p-3 rounded-lg"
                            />

                            {result.length > 0 && (
                              <div className="absolute left-0 right-0 bg-white shadow rounded mt-1 z-50">
                                {result.map((item, index) => (
                                  <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                      setSearchs(`${item.city} - ${item.airport} (${item.code})`);
                                      setResult([]);
                                    }}
                                  >
                                    <strong>{item.city}</strong> – {item.airport} ({item.code})
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* BUTTON */}
                          <button className="text-white bg-blue-400 hover:bg-blue-500 px-5 py-3 rounded-2xl">
                            Search
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                </motion.div>
              )}

              {flight && (
                <motion.div
                  key="flight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-full max-w-7xl mx-auto">
                    <div className="bg-white shadow-2xl rounded-2xl mb-12 p-8">

                      {/* TABS */}
                      <div className="flex gap-3 m-5">
                        <button
                          onClick={() => setTripType("oneway")}
                          className={`px-5 py-2 rounded-full border text-sm font-semibold
            ${tripType === "oneway"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 text-gray-600"}`}
                        >
                          One-way
                        </button>

                        <button
                          onClick={() => setTripType("round")}
                          className={`px-5 py-2 rounded-full border text-sm font-semibold
            ${tripType === "round"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-gray-300 text-gray-600"}`}
                        >
                          Round-trip
                        </button>
                      </div>

                      {/* FROM → TO */}
                      <div className="w-full mb-6 flex items-center gap-8 relative">
                        <div className="relative w-1/2">
                          <input
                            type="text"
                            value={fromSearch}
                            onChange={(e) => setFromSearch(e.target.value)}
                            placeholder="✈️ Flying From"
                            className="border border-gray-400 shadow-sm rounded-lg px-4 py-4 w-full text-base"
                          />

                          {fromResult.length > 0 && (
                            <div className="absolute left-0 right-0 bg-white shadow rounded mt-1 z-50">
                              {fromResult.map((item, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    setFromSearch(`${item.city} (${item.code})`);
                                    setFromResult([]);
                                  }}
                                >
                                  {item.city} ({item.code})
                                </div>
                              ))}
                            </div>
                          )}
                        </div>



                        <button
                          type="button"
                          onClick={handleSwap}
                          className={`p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-all duration-300 hover:rotate-180
                            ${rotated ? "rotate-180" : "rotate-0"}`}
                        >
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                          </svg>
                        </button>

                        <div className="relative w-1/2">
                          <input
                            type="text"
                            value={toSearch}
                            onChange={(e) => setToSearch(e.target.value)}
                            placeholder="✈️ Flying To"
                            className="border border-gray-400 shadow-sm rounded-lg px-4 py-4 w-full text-base"
                          />

                          {toResult.length > 0 && (
                            <div className="absolute left-0 top-full w-full bg-white shadow-lg rounded-md mt-1 z-50">
                              {toResult.map((item, index) => (
                                <div
                                  key={index}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => {
                                    setToSearch(`${item.city} (${item.code})`);
                                    setToResult([]);

                                  }}
                                >
                                  {item.city} ({item.code})
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                      <div className="w-full max-w-md space-y-4">
                        {/* DATE BUTTON */}
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setOpenDep(true)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                          >
                            <Calendar size={20} />
                            <span className={departure ? "text-gray-800" : "text-gray-500"}>
                              {departure
                                ? new Date(departure).toLocaleDateString("en-IN")
                                : "Departure"}
                            </span>
                          </button>

                          {tripType === "round" && (
                            <button
                              type="button"
                              onClick={() => setOpenRet(true)}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                            >
                              <Calendar size={20} />
                              <span className={returnDate ? "text-gray-800" : "text-gray-500"}>
                                {returnDate ? returnDate.toLocaleDateString() : "Return"}
                              </span>
                            </button>
                          )}
                        </div>

                        {/* Departure DatePicker */}
                        <DatePicker
                          selected={departure}
                          onChange={(date) => {
                            setDeparture(date);
                            setOpenDep(false);
                            if (tripType === "round") setOpenRet(true);
                          }}
                          open={openDep}
                          onClickOutside={() => setOpenDep(false)}
                          inline={false}
                          placeholderText="Select Departure"
                        />

                        {/* Return DatePicker */}
                        {tripType === "round" && (
                          <DatePicker
                            selected={returnDate}
                            onChange={(date) => setReturnDate(date)}
                            open={openRet}
                            minDate={departure}
                            onClickOutside={() => setOpenRet(false)}
                            inline={false}
                            placeholderText="Select Return"
                          />
                        )}
                      </div>
                      {/* DATE + PASSENGER */}
                      <div className="w-full mb-6 flex gap-8">
                        <input
                          type="date"
                          value={departure}
                          onChange={(e) => setDeparture(e.target.value)}
                          className="w-1/2 pl-4 pr-4 py-3 border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <select
                          value={passenger}
                          onChange={(e) => setPassenger(e.target.value)}
                          className="w-1/2 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option>1 Passenger, Economy</option>
                          <option>2 Passengers, Economy</option>
                          <option>1 Passenger, Business</option>
                          <option>2 Passengers, Business</option>
                        </select>
                      </div>

                      {/* BUNDLE CARD */}
                      <div className="max-w-3xl mx-auto mt-6 border rounded-xl p-4 flex items-center justify-between gap-4 bg-white shadow-sm">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            className="w-5 h-5"
                          />
                          <span className="text-gray-800 text-base">
                            Add hotel to save up to <strong>25%</strong>
                          </span>
                        </label>

                        <button
                          disabled={!checked}
                          className={`px-4 py-2 rounded-md text-white font-medium transition ${checked
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-red-300 cursor-not-allowed"
                            }`}
                        >
                          Bundle and Save
                        </button>
                      </div>

                      {/* ADD FLIGHT */}



                    <Link to="flightdetails">

                    <button
                        
                        className="mt-6 text-blue-500 hover:bg-blue-200 rounded-2xl px-4 py-2 font-semibold"
                      >
                        + Add Flight
                      </button>
                    </Link>



                    </div>
                  </div>
                </motion.div>
              )}


              {bus && (
                <motion.div
                  key="bus"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bg-white shadow-2xl rounded-2xl mb-12 p-8">

                    {/* SEARCH */}
                    <div className="w-full mt-8 flex gap-4 px-4 pt-8">
                      <div className="w-[60%] mb-6 relative">
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="🔍 Enter a destination or property"
                          className="border border-gray-300 shadow-sm rounded-lg px-4 py-3 w-full text-base"
                        />

                        {results.length > 0 && (
                          <div className="absolute left-0 right-0 bg-white shadow rounded mt-1 z-50">
                            {results.map((item, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setSearch(`${item.city} (${item.code})`);
                                  setResults([]);
                                }}
                              >
                                {item.city} ({item.code})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* GRID AREA */}
                    <div className="grid grid-cols-3 gap-6 mt-6">

                      {/* DATE AREA */}
                      <div className="col-span-2">

                        <div className="flex justify-between mb-4">
                          <button
                            onClick={() => {
                              setShowSearch(false);
                              setShowDatePicker(!showDatePicker);
                            }}
                            className="text-blue-600 font-medium"
                          >
                            {showDatePicker ? "Hide options" : "Change dates"}
                          </button>
                        </div>

                        {/* SELECTED DATE */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <div className="flex items-center justify-between gap-4">

                            <div className="text-center flex-1">
                              <p className="text-sm text-gray-500">Selected Date</p>
                              <p className="text-lg font-bold">{selectedDate}</p>
                              <p className="text-sm text-blue-600">{selectedDay}</p>
                            </div>

                            <div className="text-center flex-1 border-l border-gray-300">
                              <p className="text-sm text-gray-500">Next Day</p>
                              <p className="text-lg font-bold">21 Dec 2025</p>
                              <p className="text-sm text-blue-600">Sunday</p>
                            </div>

                          </div>
                        </div>

                        {/* DATE PICKER */}
                        {showDatePicker && (
                          <div className="border rounded-xl p-4 mb-6">

                            <div className="flex justify-between mb-3">
                              <h3 className="font-semibold">Available Dates</h3>
                              <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                  <ChevronLeft />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                  <ChevronRight />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-5 gap-3">
                              {dates.map((item, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleDateSelect(item.date, item.day)}
                                  className={`p-3 rounded-lg border text-sm ${selectedDate === item.date
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-gray-50 hover:bg-blue-50 border-gray-200"
                                    }`}
                                >
                                  <p className="font-semibold">{item.date.split(" ")[0]}</p>
                                  <p className="text-lg font-bold">{item.date.split(" ")[1]}</p>
                                  <p>{item.date.split(" ")[2]}</p>
                                  <p className="mt-1">{item.day}</p>
                                </button>
                              ))}
                            </div>

                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between mb-4">
                          <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Users size={18} /> Guests & Rooms
                          </h2>
                          <button
                            onClick={() => setShowGuestPicker(!showGuestPicker)}
                            className="text-blue-600 font-medium"
                          >
                            {showGuestPicker ? "Done" : "Edit"}
                          </button>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Adults:</span>
                              <span className="font-semibold">{adultCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rooms:</span>
                              <span className="font-semibold">{roomCount}</span>
                            </div>
                          </div>
                        </div>

                        {showGuestPicker && (
                          <div className="border rounded-xl p-4 space-y-6">

                            {/* Adults */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Number of Adults</span>
                                <span className="font-semibold">{adultCount}</span>
                              </div>

                              <div className="flex gap-4">
                                <button
                                  disabled={adultCount <= 1}
                                  onClick={() => setAdultCount(adultCount - 1)}
                                  className={`p-3 rounded-lg border ${adultCount <= 1
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-red-50 text-red-600"
                                    }`}
                                >
                                  −
                                </button>

                                <button
                                  onClick={() => setAdultCount(adultCount + 1)}
                                  className="p-3 rounded-lg border bg-green-50 text-green-600"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Rooms */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Number of Rooms</span>
                                <span className="font-semibold">{roomCount}</span>
                              </div>

                              <div className="flex gap-4">
                                <button
                                  disabled={roomCount <= 1}
                                  onClick={() => setRoomCount(roomCount - 1)}
                                  className={`p-3 rounded-lg border ${roomCount <= 1
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-red-50 text-red-600"
                                    }`}
                                >
                                  −
                                </button>

                                <button
                                  onClick={() => setRoomCount(roomCount + 1)}
                                  className="p-3 rounded-lg border bg-green-50 text-green-600"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                          </div>
                        )}
                      </div>

                    </div>

                    {/* ADD FLIGHT */}
                    {!addflight && (
                      <button
                        onClick={() => setAddflight(true)}
                        className="mt-6 text-blue-500 hover:bg-blue-200 rounded-2xl px-4 py-2 font-semibold"
                      >
                        + Add Flight
                      </button>
                    )}

                    {addflight && (
                      <div className="mt-6 bg-white p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold">Flight Search</h4>
                          <button
                            onClick={() => setAddflight(false)}
                            className="text-blue-500 hover:bg-blue-200 rounded-2xl px-4 py-2 font-medium"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex gap-4">
                          <div className="w-[36%] relative">
                            <input
                              value={searchs}
                              onChange={(e) => setSearchs(e.target.value)}
                              placeholder="✈️ city or airport name"
                              className="w-full border p-3 rounded-lg"
                            />

                            {result.length > 0 && (
                              <div className="absolute left-0 right-0 bg-white shadow rounded mt-1 z-50">
                                {result.map((item, index) => (
                                  <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                      setSearchs(`${item.city} - ${item.airport} (${item.code})`);
                                      setResult([]);
                                    }}
                                  >
                                    <strong>{item.city}</strong> – {item.airport} ({item.code})
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <button className="text-white bg-blue-400 hover:bg-blue-500 px-5 py-3 rounded-2xl">
                            Search
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              )}

              {flighthotel && (
                <motion.div
                  key="flighthotel"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="relative bg-white shadow-2xl rounded-2xl  p-8">

                    {/* TOP FILTERS */}
                    <div className="flex gap-4 md:m-10">
                      <select
                        value={trip}
                        onChange={(e) => setTrip(e.target.value)}
                        className="border border-gray-400 hover:border-gray-300 hover:bg-gray-200
                     hover:text-gray-500 text-gray-600 px-6 py-3 rounded-full
                     font-bold text-sm"
                      >
                        <option>Roundtrip</option>
                        <option>One-way</option>
                      </select>

                      <select
                        value={ecnomy}
                        onChange={(e) => setEcnomy(e.target.value)}
                        className="border border-gray-400 hover:border-gray-300 hover:bg-gray-200
                     hover:text-gray-500 text-gray-600 px-6 py-3 rounded-full
                     font-bold text-sm"
                      >
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                        <option>First</option>
                      </select>
                    </div>

                    {/* FROM TO SEARCH */}
                    <div className="w-full border border-gray-500 rounded-2xl p-4
                      flex items-center gap-4 bg-gray-100">

                      <div className="relative w-1/2">
                        <input
                          type="text"
                          value={fromSearch}
                          onChange={(e) => setFromSearch(e.target.value)}
                          placeholder="✈️ Flying From"
                          className="border border-gray-400 shadow-sm rounded-lg px-4 py-4 w-full text-base"
                        />

                        {fromResult.length > 0 && (
                          <div className="absolute left-0 right-0 bg-white shadow rounded mt-1 z-50">
                            {fromResult.map((item, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setFromSearch(`${item.city} (${item.code})`);
                                  setFromResult([]);
                                }}
                              >
                                {item.city} ({item.code})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleSwap}
                        className={`p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-all duration-300 hover:rotate-180
                            ${rotated ? "rotate-180" : "rotate-0"}`}
                      >
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                          />
                        </svg>
                      </button>
                      <div className="relative w-1/2">
                        <input
                          type="text"
                          value={toSearch}
                          onChange={(e) => setToSearch(e.target.value)}
                          placeholder="✈️ Flying From"
                          className="border border-gray-400 shadow-sm rounded-lg px-4 py-4 w-full text-base"
                          onFocus={() => setShowSuggestions(true)} // show suggestions on focus
                        />

                        {showSuggestions && toResult.length > 0 && (
                          <div className="absolute left-0 top-full w-full bg-white shadow-lg rounded-md mt-1 z-50">
                            {toResult.map((item, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setToSearch(`${item.city} (${item.code})`);
                                  setToResult([]); // clear results to hide suggestions
                                  setShowSuggestions(false); // optional, extra safety
                                }}
                              >
                                {item.city} ({item.code})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>


                      {/* <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white
                     px-6 py-4 rounded-xl font-semibold"
        >
          Search
        </button> */}
                    </div>

                    {/* DATE + PASSENGER */}
                    <div className="flex gap-8 mt-6">

                      <input
                        type="date"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        className="w-[40%] py-5 px-4 border border-gray-300
                     shadow-sm rounded-lg focus:outline-none
                     focus:ring-2 focus:ring-blue-400"
                      />

                      <select
                        value={passenger}
                        onChange={(e) => setPassenger(e.target.value)}
                        className="w-[40%] py-5 px-4 border border-gray-300
                     shadow-sm rounded-lg focus:outline-none
                     focus:ring-2 focus:ring-blue-400"
                      >
                        <option>1 Passenger, Economy</option>
                        <option>2 Passengers, Economy</option>
                        <option>1 Passenger, Business</option>
                        <option>2 Passengers, Business</option>
                      </select>
                    </div>

                    {/* ROOMS & PASSENGERS */}
                    <div className="max-w-xl mx-auto mt-8 border rounded-2xl px-8 py-4
                      bg-gray-100 shadow-lg flex items-center justify-between">

                      <div className="flex items-center gap-4">
                        👥
                        <button onClick={() => passengers > 1 && setPassengers(passengers - 1)}
                          className="border w-7 h-7 rounded-full">−</button>
                        <span>{passengers} Passenger</span>
                        <button onClick={() => setPassengers(passengers + 1)}
                          className="border w-7 h-7 rounded-full">+</button>
                      </div>

                      <div className="h-8 w-px bg-gray-300"></div>

                      <div className="flex items-center gap-4">
                        🚪
                        <button onClick={() => room > 1 && setRoom(room - 1)}
                          className="border w-7 h-7 rounded-full">−</button>
                        <span>{room} Room</span>
                        <button onClick={() => setRoom(room + 1)}
                          className="border w-7 h-7 rounded-full">+</button>
                      </div>
                    </div>

                    {/* HOTEL EXTRA */}
                    <div className="max-w-5xl mx-auto border border-gray-300 rounded-2xl
                      p-6 mt-8 bg-white space-y-4">

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setEnabled(!enabled)}
                          className={`w-12 h-6 rounded-full flex items-center px-1
              ${enabled ? "bg-blue-600" : "bg-gray-400"}`}
                        >
                          <span
                            className={`w-4 h-4 bg-white rounded-full transition
                ${enabled ? "translate-x-6" : "translate-x-0"}`}
                          />
                        </button>

                        <span className="font-semibold text-gray-600">
                          Search hotel in different cities or dates
                        </span>
                      </div>

                      <div className="flex w-full relative gap-4">
                        <input
                          readOnly={!enabled}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="🔍 Enter destination or property"
                          className={`flex-1 rounded-xl p-4 border focus:outline-none
      ${!enabled ? "bg-gray-200  cursor-not-allowed" : ""}
    `}
                        />
                        {results.length > 0 && (
                          <div className="absolute left-0 right-0 w-[30%] bg-white shadow rounded mt-15 z-20">
                            {results.map((item, index) => (
                              <div
                                key={index}
                                className="px-4 py-2  hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setSearch(`${item.city} (${item.code})`);
                                  setResults([]);
                                }}
                              >
                                {item.city} ({item.code})
                              </div>
                            ))}
                          </div>
                        )}


                        <input
                          type="date"
                          readOnly={!enabled}
                          className={`flex-1 rounded-xl p-4 border focus:outline-none
      ${!enabled ? "bg-gray-200 cursor-not-allowed" : ""}
    `}
                        />
                      </div>

                    </div>

                    {/* FINAL SEARCH BUTTON */}
                    <button
                      className="absolute left-1/2 -translate-x-1/2 -bottom-7
                   bg-blue-600 hover:bg-blue-700 text-white
                   px-20 py-4 rounded-full
                   font-semibold shadow-xl"
                    >
                      Search
                    </button>

                  </div>
                </motion.div>
              )}

            </AnimatePresence>


          </div>
        </div>



        {/* className="absolute top-[22%] sm:top-[20%] md:top-[18%] lg:top-[13%] xl:top-[35%]
left-1/2 -translate-x-1/2
   z-10
  w-[92%] sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[65%]"> */}
        <div className="  ">




          {/* MAIN WHITE CARD */}
          {/* <div className="absolute top-[300px] left-1/2 -translate-x-1/2 w-[85%] max-w-6xl  responsive-card"> */}





        </div>
      </div>

    </>
  )
}




export default HomeDestop;
