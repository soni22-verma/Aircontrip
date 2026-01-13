import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FlightSearchPage = () => {
    const navigate = useNavigate();
    
    // State for search parameters
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        departureDate: '',
        returnDate: '',
        passengers: 1,
        travelClass: 'economy'
    });

    // State for flights data
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [popularRoutes, setPopularRoutes] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Enhanced city data with popular airlines
    const cities = [
        {
            code: 'DEL',
            name: 'Delhi',
            airport: 'Indira Gandhi International',
            popularAirlines: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Go First']
        },
        {
            code: 'BOM',
            name: 'Mumbai',
            airport: 'Chhatrapati Shivaji Maharaj',
            popularAirlines: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Akasa Air']
        },
        {
            code: 'BLR',
            name: 'Bengaluru',
            airport: 'Kempegowda International',
            popularAirlines: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'AirAsia India']
        },
        {
            code: 'HYD',
            name: 'Hyderabad',
            airport: 'Rajiv Gandhi International',
            popularAirlines: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'TruJet']
        },
        {
            code: 'CCU',
            name: 'Kolkata',
            airport: 'Netaji Subhash Chandra Bose',
            popularAirlines: ['Air India', 'IndiGo', 'SpiceJet', 'Go First', 'AirAsia India']
        },
        {
            code: 'MAA',
            name: 'Chennai',
            airport: 'Chennai International',
            popularAirlines: ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'Air India Express']
        },
        {
            code: 'AMD',
            name: 'Ahmedabad',
            airport: 'Sardar Vallabhbhai Patel',
            popularAirlines: ['IndiGo', 'Air India', 'SpiceJet', 'Go First', 'Star Air']
        },
        {
            code: 'PNQ',
            name: 'Pune',
            airport: 'Pune International',
            popularAirlines: ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'Akasa Air']
        },
        {
            code: 'HBD',
            name: 'Hydrabad',
            airport: 'Hydrabad International',
            popularAirlines: ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'Akasa Air']
        }
    ];

    // Generate comprehensive flight data with different airlines for each route
    const generateFlights = () => {
        const allFlights = [];
        const airlines = ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Go First', 'AirAsia India', 'Akasa Air', 'Air India Express'];

        // Flight timings
        const timings = [
            { departure: '06:00 AM', arrival: '08:00 AM', duration: '2h' },
            { departure: '09:30 AM', arrival: '11:30 AM', duration: '2h' },
            { departure: '01:15 PM', arrival: '03:15 PM', duration: '2h' },
            { departure: '04:45 PM', arrival: '06:45 PM', duration: '2h' },
            { departure: '08:20 PM', arrival: '10:20 PM', duration: '2h' },
            { departure: '11:00 PM', arrival: '01:00 AM', duration: '2h' }
        ];

        // Flight classes with price multipliers
        const classes = [
            { type: 'economy', multiplier: 1 },
            { type: 'premium economy', multiplier: 1.5 },
            { type: 'business', multiplier: 2.5 },
            { type: 'first', multiplier: 4 }
        ];

        // Base prices for different routes (in INR)
        const routeBasePrices = {
            'DEL-BOM': 4500,
            'DEL-BLR': 6500,
            'DEL-HYD': 5500,
            'DEL-CCU': 5000,
            'DEL-MAA': 6000,
            'BOM-BLR': 4000,
            'BOM-HYD': 3500,
            'BOM-CCU': 4500,
            'BOM-MAA': 3800,
            'BLR-HYD': 3000,
            'BLR-CCU': 5500,
            'BLR-MAA': 2800,
            'HYD-CCU': 4200,
            'HYD-MAA': 3200,
            'CCU-MAA': 4800,
            'HBD-AMD': 5500
        };

        let flightId = 1;

        // Generate flights for popular routes
        const popularRoutePairs = [
            ['DEL', 'BOM'], ['DEL', 'BLR'], ['DEL', 'HYD'], ['DEL', 'CCU'], ['DEL', 'MAA'],
            ['BOM', 'DEL'], ['BOM', 'BLR'], ['BOM', 'HYD'], ['BOM', 'CCU'], ['BOM', 'MAA'],
            ['BLR', 'DEL'], ['BLR', 'BOM'], ['BLR', 'HYD'], ['BLR', 'CCU'], ['BLR', 'MAA'],
            ['HYD', 'DEL'], ['HYD', 'BOM'], ['HYD', 'BLR'], ['HYD', 'CCU'], ['HYD', 'MAA'],
            ['CCU', 'DEL'], ['CCU', 'BOM'], ['CCU', 'BLR'], ['CCU', 'HYD'], ['CCU', 'MAA'],
            ['MAA', 'DEL'], ['MAA', 'BOM'], ['MAA', 'BLR'], ['MAA', 'HYD'], ['MAA', 'CCU'],
            ['HBD', 'AMD']
        ];

        // Generate flights for next 7 days
        for (let day = 0; day < 7; day++) {
            const date = new Date();
            date.setDate(date.getDate() + day);
            const dateStr = date.toISOString().split('T')[0];

            popularRoutePairs.forEach(([from, to]) => {
                const routeKey = `${from}-${to}`;
                const basePrice = routeBasePrices[routeKey] || 4000;

                // Assign different airlines to each timing
                timings.forEach((timing, index) => {
                    const airlineIndex = index % airlines.length;
                    const airline = airlines[airlineIndex];
                    const flightClass = classes[index % classes.length];

                    // Adjust price based on timing (morning/evening flights cost more)
                    let priceMultiplier = 1;
                    if (timing.departure.includes('AM') && parseInt(timing.departure) < 12) {
                        priceMultiplier = 1.2; // Morning flights
                    } else if (timing.departure.includes('PM') && parseInt(timing.departure) >= 4) {
                        priceMultiplier = 1.3; // Evening flights
                    }

                    const price = Math.round(basePrice * flightClass.multiplier * priceMultiplier / 100) * 100;

                    allFlights.push({
                        id: flightId++,
                        airline: airline,
                        flightNo: `${airline.substring(0, 2).toUpperCase()}-${100 + flightId}`,
                        from: from,
                        to: to,
                        departure: timing.departure,
                        arrival: timing.arrival,
                        duration: timing.duration,
                        price: price,
                        date: dateStr,
                        class: flightClass.type,
                        airlineLogo: getAirlineLogo(airline),
                        seatsAvailable: Math.floor(Math.random() * 20) + 5, // Random seats available
                        baggageAllowance: flightClass.type === 'economy' ? '15kg' : flightClass.type === 'business' ? '30kg' : '40kg',
                        refundable: flightClass.type !== 'economy',
                        mealIncluded: flightClass.type !== 'economy'
                    });
                });
            });
        }

        return allFlights;
    };

    // Get airline logo/color
    const getAirlineLogo = (airline) => {
        const logos = {
            'Air India': '🛩️',
            'IndiGo': '✈️',
            'Vistara': '🌟',
            'SpiceJet': '🌶️',
            'Go First': '⚡',
            'AirAsia India': '🌏',
            'Akasa Air': '☁️',
            'Air India Express': '🇮🇳'
        };
        return logos[airline] || '✈️';
    };

    // Get airline color
    const getAirlineColor = (airline) => {
        const colors = {
            'Air India': 'bg-orange-100 text-orange-800',
            'IndiGo': 'bg-blue-100 text-blue-800',
            'Vistara': 'bg-purple-100 text-purple-800',
            'SpiceJet': 'bg-red-100 text-red-800',
            'Go First': 'bg-yellow-100 text-yellow-800',
            'AirAsia India': 'bg-pink-100 text-pink-800',
            'Akasa Air': 'bg-indigo-100 text-indigo-800',
            'Air India Express': 'bg-green-100 text-green-800'
        };
        return colors[airline] || 'bg-gray-100 text-gray-800';
    };

    // Initialize with today's date
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        setSearchParams(prev => ({
            ...prev,
            departureDate: today,
            returnDate: tomorrowStr
        }));

        // Generate and set flights
        const generatedFlights = generateFlights();
        setFlights(generatedFlights);

        // Show initial popular flights
        const initialFlights = generatedFlights
            .filter(flight => flight.from === 'DEL' && flight.to === 'BOM' && flight.date === today)
            .slice(0, 4);
        setFilteredFlights(initialFlights);

        // Set popular routes
        setPopularRoutes([
            { from: 'DEL', to: 'BOM', name: 'Delhi to Mumbai', price: 'From ₹4,500' },
            { from: 'DEL', to: 'BLR', name: 'Delhi to Bengaluru', price: 'From ₹6,500' },
            { from: 'BOM', to: 'DEL', name: 'Mumbai to Delhi', price: 'From ₹4,500' },
            { from: 'BLR', to: 'DEL', name: 'Bengaluru to Delhi', price: 'From ₹6,500' },
            { from: 'HBD', to: 'AMD', name: 'Hydrabad to Ahmedabad', price: 'From ₹5,500' }
        ]);

        // Check if there's a selected flight in localStorage
        const savedFlight = localStorage.getItem('selectedFlight');
        if (savedFlight) {
            setSelectedFlight(JSON.parse(savedFlight));
        }
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };

    // Handle form submission
    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Clear selected flight when searching
        setSelectedFlight(null);
        localStorage.removeItem('selectedFlight');

        // Simulate API call delay
        setTimeout(() => {
            // Filter flights based on search parameters
            const filtered = flights.filter(flight => {
                const matchesFrom = !searchParams.from || flight.from === searchParams.from.toUpperCase();
                const matchesTo = !searchParams.to || flight.to === searchParams.to.toUpperCase();
                const matchesDate = !searchParams.departureDate || flight.date === searchParams.departureDate;
                const matchesClass = !searchParams.travelClass ||
                    (searchParams.travelClass === 'economy' && flight.class.includes('economy')) ||
                    (searchParams.travelClass === 'premium economy' && flight.class === 'premium economy') ||
                    (searchParams.travelClass === 'business' && flight.class === 'business') ||
                    (searchParams.travelClass === 'first' && flight.class === 'first');

                return matchesFrom && matchesTo && matchesDate && matchesClass;
            });

            // Sort by price (low to high)
            filtered.sort((a, b) => a.price - b.price);

            setFilteredFlights(filtered.slice(0, 10)); // Show top 10 results
            setIsLoading(false);
        }, 800);
    };

    // Handle popular route click
    const handlePopularRouteClick = (from, to) => {
        setSearchParams({
            ...searchParams,
            from: from,
            to: to
        });

        // Auto-search for this route
        const filtered = flights.filter(flight =>
            flight.from === from &&
            flight.to === to &&
            flight.date === searchParams.departureDate
        ).slice(0, 6);

        setFilteredFlights(filtered);
        
        // Clear selected flight
        setSelectedFlight(null);
        localStorage.removeItem('selectedFlight');
    };

    // Reset search form
    const handleReset = () => {
        setSearchParams({
            from: '',
            to: '',
            departureDate: new Date().toISOString().split('T')[0],
            returnDate: '',
            passengers: 1,
            travelClass: 'economy'
        });

        const today = new Date().toISOString().split('T')[0];
        const initialFlights = flights
            .filter(flight => flight.from === 'DEL' && flight.to === 'BOM' && flight.date === today)
            .slice(0, 4);
        setFilteredFlights(initialFlights);
        
        // Clear selected flight
        setSelectedFlight(null);
        localStorage.removeItem('selectedFlight');
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Get city name from code
    const getCityName = (code) => {
        const city = cities.find(c => c.code === code);
        return city ? city.name : code;
    };

    const handleSelectFlight = (flight) => {
        setSelectedFlight(flight);
        localStorage.setItem('selectedFlight', JSON.stringify(flight));
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

const handleCompleteBooking = () => {
  const bookingData = {
    bookingId: `AIRCON-${Math.floor(100000 + Math.random() * 900000)}`,
    bookingDate: new Date().toLocaleDateString('en-IN'),
    bookingTime: new Date().toLocaleTimeString('en-IN'),
    totalAmount: selectedFlight.price,
    passengers: passengerCount,
    travelClass: travelClass
  };

  const passengerData = [
    {
      title: "Mr",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      passportNumber: "A12345678",
    }
  ];

  navigate('/traveller-details', {
    state: {
      selectedFlight: selectedFlight,
      bookingData: bookingData,
      passengerData: passengerData,
      flightData: {
        flightNo: selectedFlight.flightNo,
        airline: selectedFlight.airline,
        from: selectedFlight.from,
        to: selectedFlight.to,
        departureTime: selectedFlight.departure,
        arrivalTime: selectedFlight.arrival,
        duration: selectedFlight.duration,
        class: travelClass,
        price: selectedFlight.price,
        seats: selectedFlight.seatsAvailable
      }
    }
  });
};

    // Handle proceed to booking
const handleProceedToBooking = () => {
    if (!selectedFlight) return;

    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
        navigate('/', {
            state: {
                openProfile: true, // 👈 signal
                selectedFlight,
                passengers: searchParams.passengers,
                travelClass: searchParams.travelClass
            }
        });
    } else {
        navigate('/profile', {
            state: {
                selectedFlight,
                passengers: searchParams.passengers,
                travelClass: searchParams.travelClass
            }
        });
    }
};



    // Handle quick booking
    const handleQuickBooking = (flight) => {
        setSelectedFlight(flight);
        localStorage.setItem('selectedFlight', JSON.stringify(flight));
        setShowBookingModal(true);
    };

    // Get selected flight details for modal
    const getSelectedFlightDetails = () => {
        if (!selectedFlight) return null;
        
        const fromCity = getCityName(selectedFlight.from);
        const toCity = getCityName(selectedFlight.to);
        
        return {
            ...selectedFlight,
            fromCity,
            toCity,
            totalPrice: selectedFlight.price * searchParams.passengers
        };
    };

    // Booking Modal Component
    const BookingModal = () => {
        const flightDetails = getSelectedFlightDetails();
        
        if (!flightDetails) return null;

        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-md">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 
                            onClick={handleCompleteBooking}
                            className="text-xl font-bold text-gray-900">Confirm Booking</h3>
                            <button 
                                onClick={() => setShowBookingModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-blue-50 rounded-xl p-4">
                                <div className="flex items-center mb-3">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl mr-3 ${getAirlineColor(flightDetails.airline)}`}>
                                        {flightDetails.airlineLogo}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{flightDetails.airline}</h4>
                                        <p className="text-sm text-gray-600">{flightDetails.flightNo}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-lg font-bold">{flightDetails.departure}</p>
                                        <p className="text-sm text-gray-600">{flightDetails.from} ({flightDetails.fromCity})</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-500">{flightDetails.duration}</div>
                                        <div className="w-16 h-px bg-gray-300 my-2"></div>
                                        <div className="text-xs text-gray-500">Direct</div>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">{flightDetails.arrival}</p>
                                        <p className="text-sm text-gray-600">{flightDetails.to} ({flightDetails.toCity})</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Passengers</span>
                                    <span className="font-medium">{searchParams.passengers}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Class</span>
                                    <span className="font-medium">{flightDetails.class}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date</span>
                                    <span className="font-medium">{flightDetails.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Baggage</span>
                                    <span className="font-medium">{flightDetails.baggageAllowance}</span>
                                </div>
                            </div>
                            
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-gray-600">Total Amount</div>
                                        <div className="text-2xl font-bold text-blue-700">{formatCurrency(flightDetails.totalPrice)}</div>
                                    </div>
                                    <button
                                        onClick={handleProceedToBooking}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700"
                                    >
                                        Proceed to Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto mt-20">
                {/* Selected Flight Banner */}
                {selectedFlight && (
                    <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <div className="flex items-center mb-2">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3 ${getAirlineColor(selectedFlight.airline)}`}>
                                        {selectedFlight.airlineLogo}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Flight Selected ✓</h3>
                                        <p className="text-sm text-gray-600">
                                            {selectedFlight.airline} • {selectedFlight.flightNo} • {selectedFlight.class}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    {getCityName(selectedFlight.from)} → {getCityName(selectedFlight.to)} • {selectedFlight.departure} - {selectedFlight.arrival}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-700">{formatCurrency(selectedFlight.price * searchParams.passengers)}</div>
                                    <div className="text-sm text-gray-600">Total for {searchParams.passengers} passenger(s)</div>
                                </div>
                                <button
                                    onClick={handleProceedToBooking}
                                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700"
                                >
                                    Book Now
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedFlight(null);
                                        localStorage.removeItem('selectedFlight');
                                    }}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                        <span className="text-blue-600">Flight</span> Search
                    </h1>
                    <p className="text-gray-600 text-lg">Find flights from different airlines for your preferred routes</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Search Form Section */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                Search Flights
                            </h2>

                            <form onSubmit={handleSearch}>
                                <div className="space-y-6">
                                    {/* From & To */}
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                                            <div className="relative">
                                                <select
                                                    name="from"
                                                    value={searchParams.from}
                                                    onChange={handleInputChange}
                                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                >
                                                    <option value="">Select Departure City</option>
                                                    {cities.map(city => (
                                                        <option key={`from-${city.code}`} value={city.code}>
                                                            {city.name} ({city.code}) - {city.airport}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Show popular airlines for selected city */}
                                            {searchParams.from && (
                                                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                                    <p className="text-xs font-medium text-blue-800 mb-2">Popular airlines from {getCityName(searchParams.from)}:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {cities.find(c => c.code === searchParams.from)?.popularAirlines.slice(0, 3).map(airline => (
                                                            <span key={airline} className={`px-2 py-1 text-xs rounded-full ${getAirlineColor(airline)}`}>
                                                                {getAirlineLogo(airline)} {airline}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                                            <div className="relative">
                                                <select
                                                    name="to"
                                                    value={searchParams.to}
                                                    onChange={handleInputChange}
                                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                                >
                                                    <option value="">Select Destination City</option>
                                                    {cities.map(city => (
                                                        <option key={`to-${city.code}`} value={city.code}>
                                                            {city.name} ({city.code}) - {city.airport}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Show popular airlines for selected city */}
                                            {searchParams.to && (
                                                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                                                    <p className="text-xs font-medium text-green-800 mb-2">Popular airlines to {getCityName(searchParams.to)}:</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {cities.find(c => c.code === searchParams.to)?.popularAirlines.slice(0, 3).map(airline => (
                                                            <span key={airline} className={`px-2 py-1 text-xs rounded-full ${getAirlineColor(airline)}`}>
                                                                {getAirlineLogo(airline)} {airline}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Departure</label>
                                            <input
                                                type="date"
                                                name="departureDate"
                                                value={searchParams.departureDate}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Return (Optional)</label>
                                            <input
                                                type="date"
                                                name="returnDate"
                                                value={searchParams.returnDate}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                min={searchParams.departureDate || new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </div>

                                    {/* Passengers & Class */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* PASSENGERS */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Passengers
                                            </label>
                                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-[52px]">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSearchParams({
                                                            ...searchParams,
                                                            passengers: Math.max(1, searchParams.passengers - 1)
                                                        })
                                                    }
                                                    className="px-4 bg-gray-100 hover:bg-gray-200 transition"
                                                >
                                                    −
                                                </button>
                                                <div className="flex-1 text-center font-semibold text-gray-800 text-sm">
                                                    {searchParams.passengers}{" "}
                                                    {searchParams.passengers === 1 ? "Passenger" : "Passengers"}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSearchParams({
                                                            ...searchParams,
                                                            passengers: searchParams.passengers + 1
                                                        })
                                                    }
                                                    className="px-4 bg-gray-100 hover:bg-gray-200 transition"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* CLASS */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Class
                                            </label>
                                            <select
                                                name="travelClass"
                                                value={searchParams.travelClass}
                                                onChange={handleInputChange}
                                                className="w-full h-[52px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="economy">Economy</option>
                                                <option value="premium economy">Premium Economy</option>
                                                <option value="business">Business</option>
                                                <option value="first">First Class</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-xl transition duration-300 flex items-center justify-center shadow-lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Searching...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                    </svg>
                                                    Search Flights
                                                </>
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition duration-300"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Popular Routes */}
                            <div className="mt-10">
                                <h3 className="font-bold text-gray-800 mb-4 text-lg">Popular Routes</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {popularRoutes.map((route, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePopularRouteClick(route.from, route.to)}
                                            className={`p-3 rounded-lg border text-left transition-all duration-300 ${searchParams.from === route.from && searchParams.to === route.to
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                                }`}
                                        >
                                            <div className="font-semibold text-gray-800 text-sm">{route.name}</div>
                                            <div className="text-xs text-blue-600 mt-1">{route.price}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flight Results Section */}
                    <div className="lg:w-2/3">
                        {/* Results Header */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Available Flights</h2>
                                    <div className="flex items-center mt-2">
                                        <p className="text-gray-600">
                                            {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'} found
                                            {searchParams.from && searchParams.to &&
                                                ` from ${getCityName(searchParams.from)} to ${getCityName(searchParams.to)}`
                                            }
                                        </p>
                                        {searchParams.from && searchParams.to && filteredFlights.length > 0 && (
                                            <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                                {new Set(filteredFlights.map(f => f.airline)).size} different airlines
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-0">
                                    <div className="text-sm text-gray-600 font-medium">Sort by:</div>
                                    <select className="mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                        <option>Price (Low to High)</option>
                                        <option>Price (High to Low)</option>
                                        <option>Departure Time</option>
                                        <option>Airline Name</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Flight List */}
                        <div className="space-y-5">
                            {filteredFlights.length > 0 ? (
                                filteredFlights.map(flight => (
                                    <div 
                                        key={flight.id} 
                                        className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 ${selectedFlight?.id === flight.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-300'}`}
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                            {/* Airline Info */}
                                            <div className="lg:w-2/5 mb-6 lg:mb-0">
                                                <div className="flex items-center">
                                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mr-4 ${getAirlineColor(flight.airline)}`}>
                                                        {flight.airlineLogo}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center">
                                                            <h3 className="text-xl font-bold text-gray-800">{flight.airline}</h3>
                                                            <span className="ml-3 px-2 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-700">
                                                                {flight.flightNo}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center mt-2">
                                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${flight.class === 'business' || flight.class === 'first' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                                                {flight.class.toUpperCase()}
                                                            </span>
                                                            <span className="ml-2 text-sm text-gray-500">• {flight.duration}</span>
                                                        </div>
                                                        <div className="flex items-center mt-2 text-xs text-gray-500">
                                                            <span className="mr-3">🛄 {flight.baggageAllowance}</span>
                                                            <span className="mr-3">{flight.mealIncluded ? '🍽️ Meal Included' : '🍽️ Meal Available'}</span>
                                                            <span>{flight.refundable ? '💰 Refundable' : '💰 Non-refundable'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Flight Timing */}
                                            <div className="lg:w-2/5 mb-6 lg:mb-0">
                                                <div className="flex items-center">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-gray-800">{flight.departure}</div>
                                                        <div className="text-sm text-gray-600 mt-1">{flight.from}</div>
                                                        <div className="text-xs text-gray-500">{getCityName(flight.from)}</div>
                                                    </div>

                                                    <div className="flex-1 px-6">
                                                        <div className="relative">
                                                            <div className="border-t border-gray-300 border-dashed"></div>
                                                            <div className="absolute top-1/2 left-0 right-0 flex justify-center transform -translate-y-1/2">
                                                                <div className="bg-white px-2">
                                                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center text-xs text-gray-500 mt-2">{flight.duration} • Direct</div>
                                                    </div>

                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-gray-800">{flight.arrival}</div>
                                                        <div className="text-sm text-gray-600 mt-1">{flight.to}</div>
                                                        <div className="text-xs text-gray-500">{getCityName(flight.to)}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price & Action Buttons */}
                                            <div className="lg:w-1/5">
                                                <div className="flex flex-col items-end">
                                                    <div className="text-3xl font-bold text-blue-700 mb-2">
                                                        {formatCurrency(flight.price)}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mb-4">
                                                        per passenger • {flight.seatsAvailable} seats left
                                                    </div>
                                                    
                                                    {selectedFlight?.id === flight.id ? (
                                                        <div className="space-y-3 w-full">
                                                            <div className="text-center text-green-600 font-bold py-2 border-2 border-green-500 rounded-xl bg-green-50">
                                                                ✓ Selected
                                                            </div>
                                                            <button
                                                                onClick={handleProceedToBooking}
                                                                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition"
                                                            >
                                                                Book Now
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-3 w-full">
                                                            <button
                                                                onClick={() => handleSelectFlight(flight)}
                                                                className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition"
                                                            >
                                                                Select Flight
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuickBooking(flight)}
                                                                className="w-full py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition"
                                                            >
                                                                Quick View
                                                            </button>
                                                        </div>
                                                    )}
                                                    
                                                    <div className="text-xs text-gray-500 mt-3 text-center w-full">
                                                        Flight date: {flight.date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                    <div className="text-gray-400 mb-6">
                                        <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-700 mb-3">No flights found</h3>
                                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                        We couldn't find any flights matching your search criteria. Try adjusting your dates or select different cities.
                                    </p>
                                    <button
                                        onClick={handleReset}
                                        className="px-8 py-3 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl transition duration-300"
                                    >
                                        Try New Search
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Airlines Info */}
                        {filteredFlights.length > 0 && (
                            <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Airlines Available for This Route</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Array.from(new Set(filteredFlights.map(f => f.airline))).map(airline => {
                                        const airlineFlights = filteredFlights.filter(f => f.airline === airline);
                                        const minPrice = Math.min(...airlineFlights.map(f => f.price));

                                        return (
                                            <div key={airline} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
                                                <div className="flex items-center mb-3">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3 ${getAirlineColor(airline)}`}>
                                                        {getAirlineLogo(airline)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800">{airline}</div>
                                                        <div className="text-xs text-gray-500">{airlineFlights.length} flights</div>
                                                    </div>
                                                </div>
                                                <div className="text-2xl font-bold text-blue-700">{formatCurrency(minPrice)}</div>
                                                <div className="text-xs text-gray-500 mt-1">Starting price</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && <BookingModal />}
        </div>
    );
};

export default FlightSearchPage;