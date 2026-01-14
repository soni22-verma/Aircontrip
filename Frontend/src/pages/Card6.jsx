import React, { useState } from "react";
import { 
  Plane, 
  MapPin, 
  ChevronRight,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const routes = [
  {
    id: 1,
    city: "Mumbai",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h-300&fit=crop",
    to: [
      { city: "Goa", price: "₹2,499", duration: "1h 20m" },
      { city: "Delhi", price: "₹3,999", duration: "2h 10m" },
      { city: "Bangalore", price: "₹2,899", duration: "1h 45m" },
      { city: "Ahmedabad", price: "₹1,999", duration: "1h 15m" }
    ],
    popularity: 98,
    bestPrice: "₹1,799"
  },
  {
    id: 2,
    city: "Delhi",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h-300&fit=crop",
    to: [
      { city: "Mumbai", price: "₹3,999", duration: "2h 10m" },
      { city: "Goa", price: "₹4,499", duration: "2h 30m" },
      { city: "Bangalore", price: "₹4,199", duration: "2h 25m" },
      { city: "Pune", price: "₹3,599", duration: "2h" }
    ],
    popularity: 95,
    bestPrice: "₹3,299"
  },
  {
    id: 3,
    city: "Bangalore",
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h-300&fit=crop",
    to: [
      { city: "Mumbai", price: "₹2,899", duration: "1h 45m" },
      { city: "Delhi", price: "₹4,199", duration: "2h 25m" },
      { city: "Goa", price: "₹2,299", duration: "1h 15m" },
      { city: "Hyderabad", price: "₹1,899", duration: "1h" }
    ],
    popularity: 92,
    bestPrice: "₹1,699"
  },
  {
    id: 4,
    city: "Chennai",
    img: "https://pix6.agoda.net/geo/city/17269/1_17269_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    to: [
      { city: "Mumbai", price: "₹3,299", duration: "1h 55m" },
      { city: "Delhi", price: "₹4,599", duration: "2h 40m" },
      { city: "Madurai", price: "₹1,499", duration: "1h" },
      { city: "Coimbatore", price: "₹1,299", duration: "50m" }
    ],
    popularity: 88,
    bestPrice: "₹1,099"
  },
  {
    id: 5,
    city: "Hyderabad",
    img: "https://pix6.agoda.net/geo/city/8801/1_8801_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    to: [
      { city: "Mumbai", price: "₹2,199", duration: "1h 30m" },
      { city: "Goa", price: "₹2,999", duration: "1h 40m" },
      { city: "Bangalore", price: "₹1,899", duration: "1h" },
      { city: "Delhi", price: "₹3,899", duration: "2h 15m" }
    ],
    popularity: 85,
    bestPrice: "₹1,599"
  },
  {
    id: 6,
    city: "Goa",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h-300&fit=crop",
    to: [
      { city: "Mumbai", price: "₹2,499", duration: "1h 20m" },
      { city: "Delhi", price: "₹4,499", duration: "2h 30m" },
      { city: "Bangalore", price: "₹2,299", duration: "1h 15m" },
      { city: "Hyderabad", price: "₹2,999", duration: "1h 40m" }
    ],
    popularity: 96,
    bestPrice: "₹1,999"
  },
  {
    id: 7,
    city: "Kolkata",
    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    to: [
      { city: "Mumbai", price: "₹3,899", duration: "2h 20m" },
      { city: "Delhi", price: "₹2,999", duration: "2h" },
      { city: "Bangalore", price: "₹4,299", duration: "2h 30m" },
      { city: "Bagdogra", price: "₹1,599", duration: "1h 10m" }
    ],
    popularity: 82,
    bestPrice: "₹1,399"
  },
  {
    id: 8,
    city: "Pune",
    img: "https://pix6.agoda.net/geo/city/16854/0abc435fa78c2ca6fb4cb5ec86af89d0.jpg?ce=0&s=375x&ar=1x1",
    to: [
      { city: "Goa", price: "₹2,199", duration: "1h 15m" },
      { city: "Delhi", price: "₹3,599", duration: "2h" },
      { city: "Bangalore", price: "₹2,099", duration: "1h 20m" },
      { city: "Nagpur", price: "₹1,799", duration: "1h 10m" }
    ],
    popularity: 80,
    bestPrice: "₹1,599"
  },
  {
    id: 9,
    city: "Ahmedabad",
    img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    to: [
      { city: "Mumbai", price: "₹1,999", duration: "1h 15m" },
      { city: "Delhi", price: "₹2,899", duration: "1h 40m" },
      { city: "Bangalore", price: "₹3,199", duration: "2h" },
      { city: "Goa", price: "₹2,799", duration: "1h 30m" }
    ],
    popularity: 78,
    bestPrice: "₹1,499"
  }
];

const PopularRoutes = () => {
  const [activeRoute, setActiveRoute] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const routeCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-4">
            <Plane className="w-4 h-4" />
            <span className="text-sm font-semibold">TOP ROUTES</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Flight Routes
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the most booked flight routes with the best prices and shortest durations
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Plane, label: "Daily Flights", value: "1,250+", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: TrendingUp, label: "Popular Routes", value: "50+", color: "text-green-600", bg: "bg-green-50" },
            { icon: Clock, label: "Avg Duration", value: "1h 45m", color: "text-purple-600", bg: "bg-purple-50" },
            { icon: DollarSign, label: "Lowest Fare", value: "₹1,099", color: "text-amber-600", bg: "bg-amber-50" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`${stat.bg} p-4 rounded-2xl text-center`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setActiveRoute(route.id)}
              onMouseLeave={() => setActiveRoute(null)}
            >
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* City Header with Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.img}
                    alt={route.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* City Name and Popularity */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{route.city}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-white/80" />
                          <span className="text-white/80 text-sm">International Airport</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <TrendingUp className="w-3 h-3 text-white" />
                          <span className="text-white font-semibold text-sm">{route.popularity}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Details */}
                <div className="p-6">
                  {/* Best Price Banner */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
                        Best Price: {route.bestPrice}
                      </div>
                      <Shield className="w-4 h-4 text-gray-400" />
                    </div>
                    <motion.button
                      whileHover="hover"
                      variants={iconVariants}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Zap className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Destination Routes */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <Plane className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Top Connections</span>
                    </div>
                    
                    {route.to.map((destination, destIndex) => (
                      <motion.div
                        key={destIndex}
                        variants={routeCardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 * destIndex }}
                        whileHover={{ backgroundColor: "#f8fafc" }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Plane className="w-3 h-3 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{destination.city}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-3 h-3" />
                              {destination.duration}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{destination.price}</div>
                          <div className="text-xs text-green-600">Live price</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Now
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Decorative Elements */}
              {activeRoute === route.id && (
                <>
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75" />
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75 delay-150" />
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
         
        </motion.div>
      </div>
    </div>
  );
};

export default PopularRoutes;