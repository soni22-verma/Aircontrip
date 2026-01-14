import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plane, Search, Calendar, Users, Briefcase,
    Star, Clock, MapPin, ChevronRight, Filter,
    X, Loader2, Sparkles, TrendingUp, Shield,
    CheckCircle, ArrowRight, Ticket, Heart,
    Menu, ChevronLeft, Smartphone, Tablet, Monitor
} from 'lucide-react';

const FlightSearchPage = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Add responsive state
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // State for search parameters
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        departureDate: '',
        returnDate: '',
        passengers: 1,
        travelClass: 'economy',
        tripType: 'oneway'
    });

    // State for flights data
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [popularRoutes, setPopularRoutes] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('price-low');
    const [favoriteFlights, setFavoriteFlights] = useState(new Set());
    const [activeAirlines, setActiveAirlines] = useState([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Enhanced city data with popular airlines
    const cities = [
        {
            code: 'DEL',
            name: 'Delhi',
            airport: 'Indira Gandhi International',
            popularAirlines: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Go First'],
            color: 'from-orange-500 to-red-500',
            icon: '🏛️'
        },
        {
            code: 'BOM',
            name: 'Mumbai',
            airport: 'Chhatrapati Shivaji Maharaj',
            popularAirlines: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Akasa Air'],
            color: 'from-blue-500 to-cyan-500',
            icon: '🏙️'
        },
        {
            code: 'BLR',
            name: 'Bengaluru',
            airport: 'Kempegowda International',
            popularAirlines: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'AirAsia India'],
            color: 'from-green-500 to-emerald-500',
            icon: '🌴'
        },
        {
            code: 'HYD',
            name: 'Hyderabad',
            airport: 'Rajiv Gandhi International',
            popularAirlines: ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'TruJet'],
            color: 'from-purple-500 to-pink-500',
            icon: '💎'
        },
        {
            code: 'CCU',
            name: 'Kolkata',
            airport: 'Netaji Subhash Chandra Bose',
            popularAirlines: ['Air India', 'IndiGo', 'SpiceJet', 'Go First', 'AirAsia India'],
            color: 'from-yellow-500 to-amber-500',
            icon: '🎭'
        },
        {
            code: 'MAA',
            name: 'Chennai',
            airport: 'Chennai International',
            popularAirlines: ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'Air India Express'],
            color: 'from-indigo-500 to-violet-500',
            icon: '🏖️'
        },
        {
            code: 'AMD',
            name: 'Ahmedabad',
            airport: 'Sardar Vallabhbhai Patel',
            popularAirlines: ['IndiGo', 'Air India', 'SpiceJet', 'Go First', 'Star Air'],
            color: 'from-rose-500 to-pink-500',
            icon: '🕌'
        },
        {
            code: 'PNQ',
            name: 'Pune',
            airport: 'Pune International',
            popularAirlines: ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'Akasa Air'],
            color: 'from-teal-500 to-green-500',
            icon: '🎓'
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const cardVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        hover: {
            y: -5,
            scale: 1.02,
            transition: {
                duration: 0.2
            }
        }
    };

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    // Generate comprehensive flight data
    const generateFlights = () => {
        const allFlights = [];
        const airlines = [
            { name: 'Air India', logo: '🇮🇳', color: 'from-orange-500 to-red-500' },
            { name: 'IndiGo', logo: '✈️', color: 'from-blue-500 to-cyan-500' },
            { name: 'Vistara', logo: '🌟', color: 'from-purple-500 to-pink-500' },
            { name: 'SpiceJet', logo: '🌶️', color: 'from-red-500 to-orange-500' },
            { name: 'Go First', logo: '⚡', color: 'from-yellow-500 to-amber-500' },
            { name: 'AirAsia India', logo: '🌏', color: 'from-pink-500 to-rose-500' },
            { name: 'Akasa Air', logo: '☁️', color: 'from-indigo-500 to-blue-500' },
            { name: 'Air India Express', logo: '🇮🇳', color: 'from-green-500 to-emerald-500' }
        ];

        const timings = [
            { departure: '06:00', arrival: '08:00', duration: '2h', type: 'morning' },
            { departure: '09:30', arrival: '11:30', duration: '2h', type: 'late-morning' },
            { departure: '13:15', arrival: '15:15', duration: '2h', type: 'afternoon' },
            { departure: '16:45', arrival: '18:45', duration: '2h', type: 'evening' },
            { departure: '20:20', arrival: '22:20', duration: '2h', type: 'night' },
            { departure: '23:00', arrival: '01:00', duration: '2h', type: 'late-night' }
        ];

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
            'CCU-MAA': 4800
        };

        let flightId = 1;
        const routePairs = [
            ['DEL', 'BOM'], ['DEL', 'BLR'], ['DEL', 'HYD'], ['DEL', 'CCU'], ['DEL', 'MAA'],
            ['BOM', 'DEL'], ['BOM', 'BLR'], ['BOM', 'HYD'], ['BOM', 'CCU'], ['BOM', 'MAA'],
            ['BLR', 'DEL'], ['BLR', 'BOM'], ['BLR', 'HYD'], ['BLR', 'CCU'], ['BLR', 'MAA'],
            ['HYD', 'DEL'], ['HYD', 'BOM'], ['HYD', 'BLR'], ['HYD', 'CCU'], ['HYD', 'MAA'],
            ['CCU', 'DEL'], ['CCU', 'BOM'], ['CCU', 'BLR'], ['CCU', 'HYD'], ['CCU', 'MAA'],
            ['MAA', 'DEL'], ['MAA', 'BOM'], ['MAA', 'BLR'], ['MAA', 'HYD'], ['MAA', 'CCU']
        ];

        for (let day = 0; day < 7; day++) {
            const date = new Date();
            date.setDate(date.getDate() + day);
            const dateStr = date.toISOString().split('T')[0];

            routePairs.forEach(([from, to]) => {
                const routeKey = `${from}-${to}`;
                const basePrice = routeBasePrices[routeKey] || 4000;

                timings.forEach((timing, index) => {
                    const airline = airlines[index % airlines.length];
                    let priceMultiplier = 1;

                    switch (timing.type) {
                        case 'morning': priceMultiplier = 1.3; break;
                        case 'evening': priceMultiplier = 1.4; break;
                        case 'night': priceMultiplier = 1.2; break;
                        default: priceMultiplier = 1;
                    }

                    const price = Math.round(basePrice * priceMultiplier / 100) * 100;

                    allFlights.push({
                        id: flightId++,
                        airline: airline.name,
                        airlineLogo: airline.logo,
                        airlineColor: airline.color,
                        flightNo: `${airline.name.substring(0, 2).toUpperCase()}${100 + flightId}`,
                        from: from,
                        to: to,
                        departure: timing.departure,
                        arrival: timing.arrival,
                        duration: timing.duration,
                        price: price,
                        date: dateStr,
                        class: index % 4 === 0 ? 'Economy' : index % 4 === 1 ? 'Premium Economy' : index % 4 === 2 ? 'Business' : 'First',
                        seatsAvailable: Math.floor(Math.random() * 20) + 5,
                        baggageAllowance: index % 4 === 0 ? '15kg' : index % 4 === 1 ? '20kg' : index % 4 === 2 ? '30kg' : '40kg',
                        refundable: index % 2 === 0,
                        mealIncluded: index % 4 !== 0,
                        wifi: index % 3 === 0,
                        rating: (Math.random() * 1 + 4).toFixed(1),
                        departureType: timing.type
                    });
                });
            });
        }

        return allFlights;
    };

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
                setShowMobileFilters(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Initialize data
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

        const generatedFlights = generateFlights();
        setFlights(generatedFlights);

        const initialFlights = generatedFlights
            .filter(flight => flight.from === 'DEL' && flight.to === 'BOM' && flight.date === today)
            .slice(0, 6);
        setFilteredFlights(initialFlights);

        setPopularRoutes([
            { from: 'DEL', to: 'BOM', name: 'Delhi → Mumbai', price: '₹4,500', icon: '🏛️→🏙️' },
            { from: 'DEL', to: 'BLR', name: 'Delhi → Bengaluru', price: '₹6,500', icon: '🏛️→🌴' },
            { from: 'BOM', to: 'DEL', name: 'Mumbai → Delhi', price: '₹4,500', icon: '🏙️→🏛️' },
            { from: 'BLR', to: 'DEL', name: 'Bengaluru → Delhi', price: '₹6,500', icon: '🌴→🏛️' },
            { from: 'HYD', to: 'CCU', name: 'Hyderabad → Kolkata', price: '₹4,200', icon: '💎→🎭' },
            { from: 'MAA', to: 'BOM', name: 'Chennai → Mumbai', price: '₹3,800', icon: '🏖️→🏙️' }
        ]);
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setSelectedFlight(null);
        localStorage.removeItem('selectedFlight');

        // Close mobile filters if open
        if (windowWidth < 1024) {
            setShowMobileFilters(false);
        }

        setTimeout(() => {
            const filtered = flights.filter(flight => {
                const matchesFrom = !searchParams.from || flight.from === searchParams.from.toUpperCase();
                const matchesTo = !searchParams.to || flight.to === searchParams.to.toUpperCase();
                const matchesDate = !searchParams.departureDate || flight.date === searchParams.departureDate;
                const matchesClass = !searchParams.travelClass || flight.class === searchParams.travelClass;

                return matchesFrom && matchesTo && matchesDate && matchesClass;
            });

            // Sort flights
            let sortedFlights = [...filtered];
            switch (sortBy) {
                case 'price-low':
                    sortedFlights.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedFlights.sort((a, b) => b.price - a.price);
                    break;
                case 'departure-early':
                    sortedFlights.sort((a, b) => a.departure.localeCompare(b.departure));
                    break;
                case 'departure-late':
                    sortedFlights.sort((a, b) => b.departure.localeCompare(a.departure));
                    break;
                case 'duration':
                    sortedFlights.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
                    break;
                case 'rating':
                    sortedFlights.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                    break;
            }

            // Filter by airlines if selected
            if (activeAirlines.length > 0) {
                sortedFlights = sortedFlights.filter(flight =>
                    activeAirlines.includes(flight.airline)
                );
            }

            setFilteredFlights(sortedFlights.slice(0, windowWidth < 768 ? 5 : 10));
            setIsLoading(false);

            // Scroll to results
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 800);
    };

    // Handle popular route click
    const handlePopularRouteClick = (from, to) => {
        setSearchParams({
            ...searchParams,
            from: from,
            to: to
        });

        const filtered = flights.filter(flight =>
            flight.from === from &&
            flight.to === to &&
            flight.date === searchParams.departureDate
        ).slice(0, windowWidth < 768 ? 4 : 6);

        setFilteredFlights(filtered);
        setSelectedFlight(null);
    };

    // Reset search
    const handleReset = () => {
        setSearchParams({
            from: '',
            to: '',
            departureDate: new Date().toISOString().split('T')[0],
            returnDate: '',
            passengers: 1,
            travelClass: 'economy',
            tripType: 'oneway'
        });

        const today = new Date().toISOString().split('T')[0];
        const initialFlights = flights
            .filter(flight => flight.from === 'DEL' && flight.to === 'BOM' && flight.date === today)
            .slice(0, windowWidth < 768 ? 3 : 4);
        setFilteredFlights(initialFlights);
        setSelectedFlight(null);
        setActiveAirlines([]);
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

    // Handle select flight
    const handleSelectFlight = (flight) => {
        setSelectedFlight(flight);
        localStorage.setItem('selectedFlight', JSON.stringify(flight));

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle proceed to booking
    const handleProceedToBooking = () => {
        if (!selectedFlight) return;

        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
            navigate('/', {
                state: {
                    openProfile: true,
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

    // Toggle favorite flight
    const toggleFavorite = (flightId, e) => {
        e.stopPropagation();
        setFavoriteFlights(prev => {
            const newSet = new Set(prev);
            if (newSet.has(flightId)) {
                newSet.delete(flightId);
            } else {
                newSet.add(flightId);
            }
            return newSet;
        });
    };

    // Toggle airline filter
    const toggleAirlineFilter = (airline) => {
        setActiveAirlines(prev =>
            prev.includes(airline)
                ? prev.filter(a => a !== airline)
                : [...prev, airline]
        );
    };

    // Get unique airlines from filtered flights
    const availableAirlines = Array.from(new Set(filteredFlights.map(f => f.airline)));

    // Get departure type color
    const getDepartureTypeColor = (type) => {
        switch (type) {
            case 'morning': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
            case 'evening': return 'bg-gradient-to-r from-purple-500 to-pink-500';
            case 'night': return 'bg-gradient-to-r from-indigo-500 to-blue-500';
            default: return 'bg-gradient-to-r from-blue-500 to-cyan-500';
        }
    };

    // Responsive breakpoints
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    const isDesktop = windowWidth >= 1024;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-3 md:p-4 lg:p-6 mt-16 md:mt-20"
        >
            {/* Mobile Navigation Menu Button */}
            {!isDesktop && (
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </motion.button>
            )}

            {/* Mobile Filters Overlay */}
            <AnimatePresence>
                {isMobile && showMobileFilters && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setShowMobileFilters(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25 }}
                            className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold">Filters</h3>
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold mb-3">Sort By</h4>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full p-3 border-2 border-gray-200 rounded-xl"
                                        >
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="departure-early">Departure: Early</option>
                                            <option value="departure-late">Departure: Late</option>
                                            <option value="duration">Shortest Duration</option>
                                            <option value="rating">Best Rating</option>
                                        </select>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">Airlines</h4>
                                        <div className="space-y-2">
                                            {availableAirlines.map(airline => (
                                                <label key={airline} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                                                    <input
                                                        type="checkbox"
                                                        checked={activeAirlines.includes(airline)}
                                                        onChange={() => toggleAirlineFilter(airline)}
                                                        className="w-5 h-5 text-blue-600 rounded"
                                                    />
                                                    <span>{airline}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animated Background Elements - Reduced on mobile */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={floatingAnimation}
                    className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl md:blur-3xl"
                />
                <motion.div
                    animate={{
                        ...floatingAnimation,
                        transition: { ...floatingAnimation.transition, delay: 1 }
                    }}
                    className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl md:blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Header - Responsive */}
                <motion.header
                    variants={itemVariants}
                    className="mb-6 md:mb-10 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="inline-block mb-4 md:mb-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 blur-lg md:blur-xl opacity-50 rounded-full"></div>
                            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl">
                                <Plane className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-3 md:mb-4" />
                                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-3 px-2">
                                    {isMobile ? 'Find Flights' : 'Find Your Perfect Flight'}
                                </h1>
                                <p className="text-blue-100 text-sm md:text-base lg:text-lg">
                                    {isMobile ? 'Search & book flights' : 'Search, compare, and book flights with ease'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.header>

                <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
                    {/* Search Form Section - Mobile Slide-in */}
                    <AnimatePresence>
                        {(isDesktop || isMobileMenuOpen) && (
                            <motion.div
                                initial={isMobile ? { x: -300, opacity: 0 } : { opacity: 0 }}
                                animate={isMobile ? { x: 0, opacity: 1 } : { opacity: 1 }}
                                exit={isMobile ? { x: -300, opacity: 0 } : { opacity: 0 }}
                                variants={isDesktop ? containerVariants : {}}
                                className={`lg:w-1/3 ${isMobile ? 'fixed inset-0 z-40 bg-white overflow-y-auto' : ''}`}
                            >
                                <div className={`${isDesktop ? 'sticky top-24' : 'min-h-screen p-4'}`}>
                                    {isMobile && (
                                        <div className="flex items-center justify-between mb-6">
                                            <button
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="p-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <h2 className="text-xl font-bold">Flight Search</h2>
                                            <div className="w-10"></div>
                                        </div>
                                    )}

                                    <motion.div
                                        variants={isDesktop ? itemVariants : {}}
                                        className="bg-white/90 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 md:p-6 border border-gray-200"
                                    >
                                        <div className="flex items-center mb-6">
                                            <Search className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2 md:mr-3" />
                                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Flight Search</h2>
                                        </div>

                                        <form onSubmit={handleSearch}>
                                            {/* Trip Type - Mobile optimized */}
                                            <div className="flex gap-1 md:gap-2 mb-4 md:mb-6 bg-gray-100 p-1 rounded-xl md:rounded-2xl">
                                                {['oneway', 'roundtrip'].map(type => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setSearchParams({ ...searchParams, tripType: type })}
                                                        className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all text-sm md:text-base ${searchParams.tripType === type
                                                            ? 'bg-white shadow-md md:shadow-lg text-blue-600'
                                                            : 'text-gray-600 hover:text-gray-900'
                                                            }`}
                                                    >
                                                        {type === 'oneway' ? 'One Way' : 'Round Trip'}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="space-y-4 md:space-y-6">
                                                {/* From & To - Stack on mobile */}
                                                <div className="space-y-3 md:space-y-4">
                                                    <motion.div
                                                        whileHover={{ scale: isMobile ? 1 : 1.01 }}
                                                        className="relative"
                                                    >
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
                                                            <MapPin className="w-4 h-4 mr-1 md:mr-2" />
                                                            From
                                                        </label>
                                                        <select
                                                            name="from"
                                                            value={searchParams.from}
                                                            onChange={handleInputChange}
                                                            className="w-full p-3 md:p-4 text-sm md:text-base border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                        >
                                                            <option value="">Select Departure City</option>
                                                            {cities.map(city => (
                                                                <option key={`from-${city.code}`} value={city.code}>
                                                                    <span className="text-lg">{city.icon}</span> {city.name} ({city.code})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </motion.div>

                                                    <motion.div
                                                        whileHover={{ scale: isMobile ? 1 : 1.01 }}
                                                        className="relative"
                                                    >
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
                                                            <MapPin className="w-4 h-4 mr-1 md:mr-2" />
                                                            To
                                                        </label>
                                                        <select
                                                            name="to"
                                                            value={searchParams.to}
                                                            onChange={handleInputChange}
                                                            className="w-full p-3 md:p-4 text-sm md:text-base border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                                        >
                                                            <option value="">Select Destination City</option>
                                                            {cities.map(city => (
                                                                <option key={`to-${city.code}`} value={city.code}>
                                                                    <span className="text-lg">{city.icon}</span> {city.name} ({city.code})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </motion.div>
                                                </div>

                                                {/* Dates - Stack on mobile */}
                                                <div className={`${searchParams.tripType === 'roundtrip' ? 'grid grid-cols-2 gap-3 md:gap-4' : ''}`}>
                                                    <motion.div
                                                        whileHover={{ scale: isMobile ? 1 : 1.01 }}
                                                    >
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
                                                            <Calendar className="w-4 h-4 mr-1 md:mr-2" />
                                                            Departure
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="departureDate"
                                                            value={searchParams.departureDate}
                                                            onChange={handleInputChange}
                                                            className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            min={new Date().toISOString().split('T')[0]}
                                                        />
                                                    </motion.div>

                                                    {searchParams.tripType === 'roundtrip' && (
                                                        <motion.div
                                                            whileHover={{ scale: isMobile ? 1 : 1.01 }}
                                                        >
                                                            <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
                                                                <Calendar className="w-4 h-4 mr-1 md:mr-2" />
                                                                Return
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="returnDate"
                                                                value={searchParams.returnDate}
                                                                onChange={handleInputChange}
                                                                className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                min={searchParams.departureDate || new Date().toISOString().split('T')[0]}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Passengers & Class - Stack on mobile */}
                                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
                                                            <Users className="w-4 h-4 mr-1 md:mr-2" />
                                                            Passengers
                                                        </label>
                                                        <div className="flex items-center border-2 border-gray-200 rounded-xl md:rounded-2xl overflow-hidden">
                                                            <button
                                                                type="button"
                                                                onClick={() => setSearchParams({
                                                                    ...searchParams,
                                                                    passengers: Math.max(1, searchParams.passengers - 1)
                                                                })}
                                                                className="px-3 md:px-4 py-2 md:py-3 bg-gray-100 hover:bg-gray-200 transition text-sm md:text-base"
                                                            >
                                                                −
                                                            </button>
                                                            <div className="flex-1 text-center font-bold text-gray-900 text-sm md:text-base">
                                                                {searchParams.passengers} {searchParams.passengers === 1 ? 'Pax' : 'Pax'}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => setSearchParams({
                                                                    ...searchParams,
                                                                    passengers: searchParams.passengers + 1
                                                                })}
                                                                className="px-3 md:px-4 py-2 md:py-3 bg-gray-100 hover:bg-gray-200 transition text-sm md:text-base"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2 flex items-center">
                                                            <Briefcase className="w-4 h-4 mr-1 md:mr-2" />
                                                            Class
                                                        </label>
                                                        <select
                                                            name="travelClass"
                                                            value={searchParams.travelClass}
                                                            onChange={handleInputChange}
                                                            className="w-full p-2 md:p-3 text-sm md:text-base border-2 border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        >
                                                            <option value="economy">Economy</option>
                                                            <option value="premium economy">Premium Eco</option>
                                                            <option value="business">Business</option>
                                                            <option value="first">First Class</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Buttons - Stack on mobile */}
                                                <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                                                    <motion.button
                                                        whileHover={{ scale: isMobile ? 1 : 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        type="submit"
                                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 md:py-4 px-4 rounded-xl md:rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg text-sm md:text-base"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                                                                Searching...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                                                {isMobile ? 'Search' : 'Search Flights'}
                                                            </>
                                                        )}
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: isMobile ? 1 : 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        type="button"
                                                        onClick={handleReset}
                                                        className="w-full md:px-6 py-3 md:py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl md:rounded-2xl hover:bg-gray-50 transition-all duration-300 text-sm md:text-base"
                                                    >
                                                        Reset
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </form>

                                        {/* Popular Routes - Responsive */}
                                        <motion.div
                                            variants={isDesktop ? itemVariants : {}}
                                            className="mt-6 md:mt-8"
                                        >
                                            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 text-base md:text-lg flex items-center">
                                                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                                Popular Routes
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 md:gap-3">
                                                {popularRoutes.slice(0, isMobile ? 4 : 6).map((route, index) => (
                                                    <motion.button
                                                        key={index}
                                                        whileHover={{ scale: isMobile ? 1.02 : 1.03 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() => handlePopularRouteClick(route.from, route.to)}
                                                        className={`p-3 md:p-4 rounded-xl md:rounded-2xl border-2 text-left transition-all duration-300 ${searchParams.from === route.from && searchParams.to === route.to
                                                            ? 'border-blue-500 bg-blue-50 shadow-sm md:shadow-md'
                                                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                                            }`}
                                                    >
                                                        <div className="flex items-center mb-1 md:mb-2">
                                                            <span className="text-lg md:text-xl mr-1 md:mr-2">{route.icon}</span>
                                                            <div className="font-bold text-gray-900 text-xs md:text-sm truncate">{route.name}</div>
                                                        </div>
                                                        <div className="text-xs text-blue-600 font-semibold">{route.price}</div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Menu Toggle Button */}
                    {!isMobileMenuOpen && !isDesktop && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="fixed bottom-6 right-6 z-30 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl lg:hidden"
                        >
                            <Search className="w-6 h-6" />
                        </motion.button>
                    )}

                    {/* Flight Results Section */}
                    <div className={`lg:w-2/3 ${isMobile && !isMobileMenuOpen ? '' : ''}`} ref={scrollRef}>
                        {/* Filters Bar - Responsive */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white/90 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-4 md:p-6 mb-4 md:mb-6 border border-gray-200"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                                <div className="mb-3 md:mb-0">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Available Flights</h2>
                                    <div className="flex items-center flex-wrap">
                                        <div className="text-sm md:text-base text-gray-600">
                                            {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'} found
                                            {searchParams.from && searchParams.to &&
                                                ` from ${getCityName(searchParams.from)} to ${getCityName(searchParams.to)}`
                                            }
                                        </div>
                                        {filteredFlights.length > 0 && (
                                            <div className="ml-2 md:ml-4 px-2 md:px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs md:text-sm font-bold rounded-full">
                                                {availableAirlines.length} airlines
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 md:gap-4">
                                    {isMobile ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowMobileFilters(true)}
                                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold flex items-center gap-1 text-sm"
                                        >
                                            <Filter className="w-4 h-4" />
                                            Filters
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowFilters(!showFilters)}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center gap-2"
                                        >
                                            <Filter className="w-4 h-4" />
                                            Filters
                                        </motion.button>
                                    )}

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 md:px-4 py-2 text-sm md:text-base border-2 border-gray-200 rounded-lg md:rounded-xl font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="departure-early">Departure: Early</option>
                                        <option value="departure-late">Departure: Late</option>
                                        <option value="duration">Shortest Duration</option>
                                        <option value="rating">Best Rating</option>
                                    </select>
                                </div>
                            </div>

                            {/* Airlines Filter - Desktop only */}
                            {!isMobile && (
                                <AnimatePresence>
                                    {showFilters && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200"
                                        >
                                            <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Filter by Airlines</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {availableAirlines.map(airline => {
                                                    const flight = filteredFlights.find(f => f.airline === airline);
                                                    return (
                                                        <motion.button
                                                            key={airline}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => toggleAirlineFilter(airline)}
                                                            className={`px-3 md:px-4 py-2 rounded-lg md:rounded-xl font-medium flex items-center gap-1 md:gap-2 text-sm md:text-base ${activeAirlines.includes(airline)
                                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                                }`}
                                                        >
                                                            <span className="text-lg">{flight?.airlineLogo}</span>
                                                            {airline}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </motion.div>

                        {/* Flight List */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4 md:space-y-6"
                        >
                            {filteredFlights.length > 0 ? (
                                filteredFlights.map((flight, index) => (
                                    <motion.div
                                        key={flight.id}
                                        variants={cardVariants}
                                        whileHover={isMobile ? {} : "hover"}
                                        className={`relative overflow-hidden bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-4 md:p-6 border-2 transition-all duration-300 ${selectedFlight?.id === flight.id
                                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-blue-200'
                                            : 'border-gray-100 hover:border-blue-300'
                                            }`}
                                    >
                                        {/* Background Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${flight.airlineColor} opacity-5 blur-lg md:blur-xl`}></div>

                                        {/* Favorite Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => toggleFavorite(flight.id, e)}
                                            className="absolute top-4 md:top-6 right-4 md:right-6 z-10"
                                        >
                                            <Heart
                                                className={`w-5 h-5 md:w-6 md:h-6 ${favoriteFlights.has(flight.id)
                                                    ? 'fill-red-500 text-red-500'
                                                    : 'text-gray-300 hover:text-red-400'
                                                    }`}
                                            />
                                        </motion.button>

                                        <div className="relative">
                                            {/* Flight Header - Responsive */}
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 md:mb-8">
                                                <div className="flex items-center mb-3 md:mb-0">
                                                    <motion.div
                                                        whileHover={{ rotate: 15 }}
                                                        className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mr-3 md:mr-4 bg-gradient-to-r ${flight.airlineColor} text-white shadow-md md:shadow-lg`}
                                                    >
                                                        {flight.airlineLogo}
                                                    </motion.div>
                                                    <div>
                                                        <div className="flex flex-col md:flex-row md:items-center">
                                                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 truncate">{flight.airline}</h3>
                                                            <motion.span
                                                                whileHover={{ scale: 1.1 }}
                                                                className="mt-1 md:mt-0 md:ml-3 px-2 md:px-3 py-1 text-xs md:text-sm font-bold rounded-full bg-gray-100 text-gray-700"
                                                            >
                                                                {flight.flightNo}
                                                            </motion.span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center mt-1 md:mt-2 gap-1 md:gap-2">
                                                            <div className={`px-2 md:px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${getDepartureTypeColor(flight.departureType)} text-white`}>
                                                                {isMobile ? flight.departureType.charAt(0).toUpperCase() : flight.departureType.charAt(0).toUpperCase() + flight.departureType.slice(1)}
                                                            </div>
                                                            <div className="px-2 md:px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center">
                                                                <Star className="w-3 h-3 mr-1" />
                                                                {flight.rating}
                                                            </div>
                                                            <div className="text-xs md:text-sm text-gray-500 flex items-center">
                                                                <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                                                {flight.duration}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
                                                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text mb-1 md:mb-2">
                                                        {formatCurrency(flight.price)}
                                                    </div>
                                                    <div className="text-xs md:text-sm text-gray-500">
                                                        per passenger • <span className="text-green-600 font-semibold">{flight.seatsAvailable} seats</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Flight Details - Responsive layout */}
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                                {/* Route and Timing - Stack on mobile */}
                                                <div className="lg:w-2/3 mb-4 md:mb-6 lg:mb-0">
                                                    <div className="flex items-center justify-between md:justify-start">
                                                        <div className="text-center min-w-[70px] md:min-w-[90px]">
                                                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{flight.departure}</div>
                                                            <div className="text-xs md:text-sm text-gray-600 mt-1 truncate">{getCityName(flight.from)}</div>
                                                            <div className="text-xs text-gray-500">({flight.from})</div>
                                                        </div>

                                                        <div className="flex-1 px-4 md:px-8">
                                                            <div className="relative">
                                                                <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                                                                <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
                                                                    {[0, 1, 2, 3, 4].map(i => (
                                                                        <motion.div
                                                                            key={i}
                                                                            animate={{ y: [0, -3, 0] }}
                                                                            transition={{
                                                                                duration: 2,
                                                                                repeat: Infinity,
                                                                                delay: i * 0.2
                                                                            }}
                                                                            className="w-1 h-1 md:w-2 md:h-2 bg-blue-500 rounded-full"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="text-center text-xs md:text-sm text-gray-500 mt-2 md:mt-4">
                                                                Direct • {flight.duration}
                                                            </div>
                                                        </div>

                                                        <div className="text-center min-w-[70px] md:min-w-[90px]">
                                                            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{flight.arrival}</div>
                                                            <div className="text-xs md:text-sm text-gray-600 mt-1 truncate">{getCityName(flight.to)}</div>
                                                            <div className="text-xs text-gray-500">({flight.to})</div>
                                                        </div>
                                                    </div>

                                                    {/* Amenities - Wrap on mobile */}
                                                    <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
                                                        <div className="flex items-center text-gray-600 text-xs md:text-sm">
                                                            <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                                            <span>{flight.baggageAllowance}</span>
                                                        </div>
                                                        {flight.mealIncluded && (
                                                            <div className="flex items-center text-gray-600 text-xs md:text-sm">
                                                                <span className="mr-1">🍽️</span>
                                                                <span>Meal</span>
                                                            </div>
                                                        )}
                                                        {flight.wifi && (
                                                            <div className="flex items-center text-gray-600 text-xs md:text-sm">
                                                                <span className="mr-1">📶</span>
                                                                <span>WiFi</span>
                                                            </div>
                                                        )}
                                                        {flight.refundable && (
                                                            <div className="flex items-center text-gray-600 text-xs md:text-sm">
                                                                <span className="mr-1">💸</span>
                                                                <span>Refundable</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Buttons - Full width on mobile */}
                                                <div className="lg:w-1/4">
                                                    <div className="space-y-2 md:space-y-3">
                                                        {selectedFlight?.id === flight.id ? (
                                                            <>
                                                                <motion.div
                                                                    initial={{ scale: 0.9 }}
                                                                    animate={{ scale: 1 }}
                                                                    className="text-center text-green-600 font-bold py-2 md:py-3 border-2 border-green-500 rounded-xl md:rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 text-sm md:text-base"
                                                                >
                                                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                                                                    Selected
                                                                </motion.div>
                                                                <motion.button
                                                                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={handleProceedToBooking}
                                                                    className="w-full py-2 md:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl md:rounded-2xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base"
                                                                >
                                                                    <Ticket className="w-4 h-4 md:w-5 md:h-5" />
                                                                    {isMobile ? 'Book' : 'Book Now'}
                                                                </motion.button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <motion.button
                                                                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleSelectFlight(flight)}
                                                                    className="w-full py-2 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl md:rounded-2xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base"
                                                                >
                                                                    {isMobile ? 'Select' : 'Select Flight'}
                                                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => setShowBookingModal(true)}
                                                                    className="w-full py-2 md:py-3 border-2 border-blue-500 text-blue-600 rounded-xl md:rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 text-sm md:text-base"
                                                                >
                                                                    {isMobile ? 'Details' : 'Quick View'}
                                                                </motion.button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gradient-to-br from-white to-blue-50 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 md:p-8 lg:p-12 text-center border border-blue-100"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="text-4xl md:text-6xl mb-4 md:mb-6"
                                    >
                                        ✈️
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">No flights found</h3>
                                    <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base max-w-md mx-auto">
                                        We couldn't find any flights matching your search criteria. Try adjusting your dates or select different cities.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleReset}
                                        className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl md:rounded-2xl hover:shadow-lg transition-all duration-300 text-sm md:text-base"
                                    >
                                        Try New Search
                                    </motion.button>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Airlines Overview - Responsive grid */}
                        {filteredFlights.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-6 md:mt-10 bg-gradient-to-r from-white to-blue-50 rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 border border-gray-200"
                            >
                                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8 flex items-center">
                                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-yellow-500" />
                                    Airlines Available
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                                    {availableAirlines.slice(0, isMobile ? 4 : availableAirlines.length).map(airline => {
                                        const airlineData = filteredFlights.find(f => f.airline === airline);
                                        const flightsCount = filteredFlights.filter(f => f.airline === airline).length;
                                        const minPrice = Math.min(...filteredFlights.filter(f => f.airline === airline).map(f => f.price));

                                        return (
                                            <motion.div
                                                key={airline}
                                                whileHover={{ y: -5 }}
                                                className={`bg-white rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 border-2 ${activeAirlines.includes(airline) ? 'border-blue-500 shadow-md md:shadow-lg' : 'border-gray-200'}`}
                                                onClick={() => toggleAirlineFilter(airline)}
                                            >
                                                <div className="flex items-center mb-2 md:mb-3 lg:mb-4">
                                                    <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-lg md:text-xl lg:text-2xl mr-2 md:mr-3 lg:mr-4 bg-gradient-to-r ${airlineData.airlineColor} text-white`}>
                                                        {airlineData.airlineLogo}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-sm md:text-base">{airline}</div>
                                                        <div className="text-xs md:text-sm text-gray-500">{flightsCount} flights</div>
                                                    </div>
                                                </div>
                                                <div className="text-lg md:text-xl lg:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                                                    {formatCurrency(minPrice)}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">Starting price</div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Selected Flight Banner - Responsive */}
            <AnimatePresence>
                {selectedFlight && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 md:p-4 lg:p-6 shadow-2xl z-50"
                    >
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex items-center mb-2 md:mb-0">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-lg md:text-xl lg:text-2xl mr-2 md:mr-3 lg:mr-4 ${selectedFlight.airlineColor} text-white`}>
                                        {selectedFlight.airlineLogo}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base md:text-lg">Flight Selected ✓</h3>
                                        <p className="text-green-100 text-xs md:text-sm">
                                            {getCityName(selectedFlight.from)} → {getCityName(selectedFlight.to)} • {selectedFlight.departure} - {selectedFlight.arrival}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mt-2 md:mt-0">

                                    {/* Price Section */}
                                    <div className="text-left md:text-right">
                                        <div className="text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap">
                                            {formatCurrency(selectedFlight.price * searchParams.passengers)}
                                        </div>
                                        <div className="text-xs text-green-200">
                                            Total for {searchParams.passengers} passenger(s)
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleProceedToBooking}
                                        className="
      w-full md:w-auto
      px-4 md:px-6 lg:px-8
      py-2 md:py-3
      bg-white text-emerald-600
      rounded-lg md:rounded-xl
      font-bold
      hover:bg-gray-100
      transition-all duration-300
      text-sm md:text-base
      text-center
    "
                                    >
                                        {isMobile ? 'Book Now' : 'Proceed to Booking'}
                                    </motion.button>

                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Device Indicator (for debugging) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="fixed bottom-2 left-2 z-50">
                    <div className="flex items-center gap-2 bg-black/80 text-white px-3 py-1 rounded-full text-xs">
                        {isMobile ? (
                            <Smartphone className="w-3 h-3" />
                        ) : isTablet ? (
                            <Tablet className="w-3 h-3" />
                        ) : (
                            <Monitor className="w-3 h-3" />
                        )}
                        <span>{windowWidth}px</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default FlightSearchPage;