import React, { useState } from "react";
import { MapPin, Star, ChevronRight, Sparkles, Heart, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ================== TABS ================== */
const tabs = [
  { id: "delhi", name: "New Delhi and NCR", icon: "🏙️" },
  { id: "goa", name: "Goa", icon: "🏖️" },
  { id: "bangalore", name: "Bangalore", icon: "💻" },
  { id: "mumbai", name: "Mumbai", icon: "🌃" },
  { id: "hyderabad", name: "Hyderabad", icon: "💎" },
];

/* ================== HOMES DATA ================== */
const allHomes = [
  {
    id: 1,
    city: "New Delhi and NCR",
    name: "AIR by Ahuja Residences",
    location: "Gurgaon, New Delhi and NCR",
    price: "INR 4,246.84",
    originalPrice: "INR 5,500",
    discount: "23%",
    rating: "8.8",
    reviewCount: "124",
    type: "Luxury Apartment",
    image: "https://pix8.agoda.net/hotelImages/31008843/0/fc2a479a6781ee87274416d70a1a176b.jpg?ca=28&ce=0&s=375x",
    amenities: ["Free WiFi", "Swimming Pool", "Gym"],
  },
  {
    id: 2,
    city: "New Delhi and NCR",
    name: "StayVista Residences near Cyber City Hub w/ Gym",
    location: "Gurgaon, New Delhi and NCR",
    price: "INR 2,090.59",
    originalPrice: "INR 2,800",
    discount: "25%",
    rating: "8.6",
    reviewCount: "89",
    type: "Modern Studio",
    image: "https://pix8.agoda.net/hotelImages/76976615/0/c60d69f33318eaf7fc54c7a5adc68ce4.jpg?ce=3&s=375x",
    amenities: ["Gym", "Parking", "Kitchen"],
  },
  {
    id: 3,
    city: "New Delhi and NCR",
    name: "YWCA International Guest House",
    location: "Central Delhi, New Delhi and NCR",
    price: "INR 4,200",
    originalPrice: "INR 4,800",
    discount: "13%",
    rating: "7.8",
    reviewCount: "312",
    type: "Guest House",
    image: "https://pix8.agoda.net/hotelImages/229/22991763/22991763_21030815530095320594.png?ca=17&ce=1&s=375x",
    amenities: ["Breakfast", "WiFi", "24/7 Front Desk"],
  },
  {
    id: 4,
    city: "New Delhi and NCR",
    name: "Sharangi stays",
    location: "Greater Noida, New Delhi and NCR",
    price: "INR 1,888.35",
    originalPrice: "INR 2,300",
    discount: "18%",
    rating: "7.8",
    reviewCount: "56",
    type: "Budget Stay",
    image: "https://pix8.agoda.net/hotelImages/63296479/0/19dd0830c094036996a568899cf18bfe.jpg?ce=0&s=375x",
    amenities: ["WiFi", "AC", "TV"],
  },
  {
    id: 5,
    city: "Goa",
    name: "Agonda Paradise",
    location: "Agonda, Goa",
    price: "INR 6,965.15",
    originalPrice: "INR 8,500",
    discount: "18%",
    rating: "8.0",
    reviewCount: "201",
    type: "Beach Resort",
    image: "https://pix8.agoda.net/hotelImages/23086433/0/d8c7b81b96a847d0139e97f003cf7dea.jpg?ce=3&s=375x",
    amenities: ["Beach View", "Pool", "Restaurant"],
  },
  {
    id: 6,
    city: "Goa",
    name: "Old Goa Residency",
    location: "Old Goa, Goa",
    price: "INR 1,388.48",
    originalPrice: "INR 1,800",
    discount: "23%",
    rating: "7.5",
    reviewCount: "134",
    type: "Heritage Stay",
    image: "https://pix8.agoda.net/hotelImages/231/23136142/23136142_21032513240095689087.jpg?ca=18&ce=1&s=800x",
    amenities: ["Garden", "WiFi", "Breakfast"],
  },
  {
    id: 7,
    city: "Goa",
    name: "Good sharped & Sabs Apartments & Rooms",
    location: "Colva, Goa",
    price: "INR 5,000",
    originalPrice: "INR 6,200",
    discount: "19%",
    rating: "7.5",
    reviewCount: "78",
    type: "Apartment",
    image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/767306095.jpg?k=f2f41d5f833f3ae296ea60cc9c4b286cd28fc3c5e6d173e2ab2df90b475054e8&o=&s=375x",
    amenities: ["Kitchen", "AC", "Near Beach"],
  },
  {
    id: 8,
    city: "Bangalore",
    name: "Sliceinn Sylva, Wilson Garden, Bangalore",
    location: "Koramangala, Bangalore",
    price: "INR 2,105.62",
    originalPrice: "INR 2,800",
    discount: "25%",
    rating: "8.5",
    reviewCount: "189",
    type: "Serviced Apartment",
    image: "https://pix8.agoda.net/hotelImages/72285127/0/7fd9c2b1048920c773ee1557c0af3942.jpg?ce=2&s=375x",
    amenities: ["WiFi", "Workspace", "Kitchen"],
  },
  {
    id: 9,
    city: "Bangalore",
    name: "BluO Studios, Bangalore",
    location: "Koramangala, Bangalore",
    price: "INR 4,016.36",
    originalPrice: "INR 5,000",
    discount: "20%",
    rating: "8.9",
    reviewCount: "256",
    type: "Boutique Hotel",
    image: "https://pix8.agoda.net/hotelImages/56199395/0/b1b56eeb27bb1a4dab15c2c6eb5e7516.jpg?ce=0&s=375x",
    amenities: ["Studio", "Gym", "Cafe"],
  },
  {
    id: 10,
    city: "Mumbai",
    name: "OSI Apartments Powai",
    location: "Powai, Mumbai",
    price: "INR 3,600",
    originalPrice: "INR 4,500",
    discount: "20%",
    rating: "8.1",
    reviewCount: "167",
    type: "Business Apartment",
    image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/635225594.jpg?k=5a20e9fa7cf47f8a351a3e31b53a36170a02ebdb54c88e12c34c3fac4202efe5&o=&s=375x",
    amenities: ["WiFi", "AC", "Laundry"],
  },
  {
    id: 11,
    city: "Mumbai",
    name: "Lotus deluxe rooms",
    location: "Arnala Beach/Virar, Mumbai",
    price: "INR 1,959.83",
    originalPrice: "INR 2,500",
    discount: "22%",
    rating: "7.9",
    reviewCount: "92",
    type: "Beach Stay",
    image: "https://pix8.agoda.net/hotelImages/56320006/0/94a139d2e4b2034952699cea4f8d79dd.jpg?ce=0&s=375x",
    amenities: ["Sea View", "AC", "Restaurant"],
  },
  {
    id: 12,
    city: "Mumbai",
    name: "The Myriad Business Hotel and Restaurant",
    location: "Mira Bhayandar, Mumbai",
    price: "INR 2,782.27",
    originalPrice: "INR 3,400",
    discount: "18%",
    rating: "7.8",
    reviewCount: "143",
    type: "Business Hotel",
    image: "https://pix8.agoda.net/hotelImages/223/22356586/22356586_21020621400094844675.jpg?ca=17&ce=1&s=375x",
    amenities: ["Restaurant", "Conference", "WiFi"],
  },
  {
    id: 13,
    city: "Mumbai",
    name: "The Orion Premium Suites",
    location: "Khar, Mumbai",
    price: "INR 2,800.23",
    originalPrice: "INR 3,600",
    discount: "22%",
    rating: "7.7",
    reviewCount: "87",
    type: "Premium Suite",
    image: "https://pix8.agoda.net/hotelImages/59109146/-1/db2def4a90f51996e51d3004e2259e77.jpg?ce=0&s=375x",
    amenities: ["Suite", "Kitchen", "Parking"],
  },
  {
    id: 14,
    city: "Hyderabad",
    name: "Priya Hyderabad",
    location: "Gachibowli, Hyderabad",
    price: "INR 5,947.82",
    originalPrice: "INR 7,200",
    discount: "17%",
    rating: "9.5",
    reviewCount: "312",
    type: "Luxury Hotel",
    image: "https://pix8.agoda.net/hotelImages/68867887/0/319aefcc939785afc6069d8b23e8c64b.jpg?ce=2&s=375x",
    amenities: ["Spa", "Pool", "Fine Dining"],
  },
  {
    id: 15,
    city: "Hyderabad",
    name: "SID Royale",
    location: "Gachibowli, Hyderabad",
    price: "INR 2,591.03",
    originalPrice: "INR 3,200",
    discount: "19%",
    rating: "8.7",
    reviewCount: "189",
    type: "Business Hotel",
    image: "https://pix8.agoda.net/hotelImages/63998273/-1/23beaef19044ff28e6dcb364e073245b.png?ce=0&s=375x",
    amenities: ["Gym", "WiFi", "Breakfast"],
  },
  {
    id: 16,
    city: "Hyderabad",
    name: "UNIQUE HOMESTAYS",
    location: "Gachibowli, Hyderabad",
    price: "INR 1,527.21",
    originalPrice: "INR 1,900",
    discount: "20%",
    rating: "8.3",
    reviewCount: "104",
    type: "Homestay",
    image: "https://pix8.agoda.net/hotelImages/55330016/0/a011bd19ad77ab7ffc92293be88ab21c.jpg?ce=0&s=375x",
    amenities: ["Kitchen", "WiFi", "Parking"],
  },
  {
    id: 17,
    city: "Hyderabad",
    name: "Hitech Shiparamam Guest House",
    location: "Gachibowli, Hyderabad",
    price: "INR 2,106.91",
    originalPrice: "INR 2,700",
    discount: "22%",
    rating: "8.5",
    reviewCount: "156",
    type: "Guest House",
    image: "https://pix8.agoda.net/hotelImages/41609911/-1/63a6641610c32569128d2befff1f0add.jpg?ce=0&s=375x",
    amenities: ["AC", "WiFi", "24/7 Check-in"],
  },
];

export default function FeaturedHomes() {
  const [activeTab, setActiveTab] = useState("New Delhi and NCR");
  const [likedItems, setLikedItems] = useState([]);

  const filteredHomes = allHomes.filter((home) => home.city === activeTab);

  const toggleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const tabButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-12 bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-yellow-500 animate-pulse" size={24} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Homes
            </h2>
          </div>
          <p className="text-gray-600 text-lg">Recommended for you</p>
        </div>

        {/* Animated Tabs */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={tabVariants}
          className="mb-10"
        >
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  variants={tabButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setActiveTab(tab.name)}
                  className={`relative px-6 py-3 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap 
                    flex items-center gap-2 transition-all duration-300 ${
                    activeTab === tab.name
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.name}
                  {activeTab === tab.name && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Animated Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredHomes.map((home) => (
              <motion.div
                key={home.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="group relative"
              >
                {/* Gradient Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500 group-hover:duration-200"></div>
                
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={home.image}
                      alt={home.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      {/* Discount Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm rounded-full shadow-lg"
                      >
                        {home.discount} OFF
                      </motion.div>
                      
                      {/* Like Button */}
                      <button
                        onClick={() => toggleLike(home.id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Heart
                          size={20}
                          className={likedItems.includes(home.id) 
                            ? "fill-red-500 text-red-500 animate-heartbeat" 
                            : "text-gray-700"
                          }
                        />
                      </button>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                        <span className="text-white font-bold text-sm">{home.rating}</span>
                        <span className="text-gray-300 text-xs">({home.reviewCount})</span>
                      </div>
                    </div>
                    
                    {/* Property Type */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-medium rounded">
                        {home.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {home.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="text-blue-500" size={16} />
                      <p className="text-sm text-gray-600 line-clamp-1">{home.location}</p>
                    </div>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {home.amenities.slice(0, 3).map((amenity, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {amenity}
                        </span>
                      ))}
                      {home.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{home.amenities.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Price Section */}
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Zap className="text-yellow-500 animate-pulse" size={16} />
                          <span className="text-xs text-gray-500">Deal of the day</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xl font-bold text-gray-900">{home.price}</span>
                          <span className="text-sm text-gray-500 line-through">{home.originalPrice}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Per night • Includes taxes & fees</p>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* See More Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            See more ({activeTab}) properties
            <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </motion.button>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-heartbeat {
          animation: heartbeat 0.5s ease-in-out;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </section>
  );
}