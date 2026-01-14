import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Star, Plane, Compass } from "lucide-react";
import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Dubai",
    count: "19,464 accommodations",
    image: "https://pix6.agoda.net/geo/city/2994/0c2aae36625e3e958684d0d4ae5b12d0.jpg?ce=0&s=375x&ar=1x1",
    country: "UAE",
    rating: 4.8,
    tags: ["Luxury", "Shopping", "Beaches"],
    color: "from-amber-500 to-orange-600"
  },
  {
    id: 2,
    name: "Abu Dhabi",
    count: "721 accommodations",
    image: "https://pix6.agoda.net/geo/city/10182/0d5aa026807856a268fc512c25ac53d3.jpg?ce=0&s=375x&ar=1x1",
    country: "UAE",
    rating: 4.6,
    tags: ["Cultural", "Modern", "Desert"],
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 3,
    name: "Sharjah",
    count: "323 accommodations",
    image: "https://pix6.agoda.net/geo/city/8105/1_8105_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "UAE",
    rating: 4.4,
    tags: ["Heritage", "Museums", "Family"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 4,
    name: "Bangkok",
    count: "12,048 accommodations",
    image: "https://pix6.agoda.net/geo/city/9395/1_9395_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Thailand",
    rating: 4.7,
    tags: ["Street Food", "Temples", "Nightlife"],
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 5,
    name: "Pattaya",
    count: "11,909 accommodations",
    image: "https://pix6.agoda.net/geo/city/8584/1_8584_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Thailand",
    rating: 4.5,
    tags: ["Beaches", "Resorts", "Entertainment"],
    color: "from-purple-500 to-pink-600"
  },
  {
    id: 6,
    name: "Bali",
    count: "32,908 accommodations",
    image: "https://pix6.agoda.net/geo/city/17193/1_17193_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Indonesia",
    rating: 4.9,
    tags: ["Island", "Spiritual", "Nature"],
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 7,
    name: "Fujairah",
    count: "153 accommodations",
    image: "https://pix6.agoda.net/geo/city/4626/0fdc4eb62f66c72e3c1e41d7f55f274d.jpg?ce=0&s=375x&ar=1x1",
    country: "UAE",
    rating: 4.3,
    tags: ["Mountains", "Beaches", "Relaxing"],
    color: "from-red-500 to-orange-600"
  },
  {
    id: 8,
    name: "Ajman",
    count: "264 accommodations",
    image: "https://pix6.agoda.net/geo/city/5563/1_5563_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "UAE",
    rating: 4.2,
    tags: ["Coastal", "Budget", "Traditional"],
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: 9,
    name: "Macca",
    count: "970 accommodations",
    image: "https://pix6.agoda.net/geo/city/78591/1_78591_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Saudi Arabia",
    rating: 4.7,
    tags: ["Religious", "Historic", "Spiritual"],
    color: "from-amber-500 to-yellow-600"
  },
  {
    id: 10,
    name: "Kuala Lumpur",
    count: "19,902 accommodations",
    image: "https://pix6.agoda.net/geo/city/14524/0435b08918aeb5e6ba2c933def5a3b57.jpg?ce=0&s=375x&ar=1x1",
    country: "Malaysia",
    rating: 4.6,
    tags: ["Skyscrapers", "Food", "Shopping"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 11,
    name: "Singapore",
    count: "1,326 accommodations",
    image: "https://pix6.agoda.net/geo/city/4064/1_4064_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Singapore",
    rating: 4.8,
    tags: ["Clean", "Modern", "Garden City"],
    color: "from-red-500 to-pink-600"
  },
  {
    id: 12,
    name: "Ras Al Khaimah",
    count: "398 accommodations",
    image: "https://pix6.agoda.net/geo/city/12050/1_12050_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "UAE",
    rating: 4.5,
    tags: ["Adventure", "Desert", "Luxury"],
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 13,
    name: "Hanoi",
    count: "10,744 accommodations",
    image: "https://pix6.agoda.net/geo/city/2758/065f4f2c9fa263611ab65239ecbeaff7.jpg?ce=0&s=375x&ar=1x1",
    country: "Vietnam",
    rating: 4.6,
    tags: ["Historic", "Street Food", "Cultural"],
    color: "from-green-500 to-teal-600"
  },
  {
    id: 14,
    name: "Ho Chi Minh City",
    count: "15,546 accommodations",
    image: "https://pix6.agoda.net/geo/city/13170/1_13170_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Vietnam",
    rating: 4.7,
    tags: ["Bustling", "Modern", "Historic"],
    color: "from-yellow-500 to-amber-600"
  },
  {
    id: 15,
    name: "Doha",
    count: "660 accommodations",
    image: "https://pix6.agoda.net/geo/city/4472/1_4472_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Qatar",
    rating: 4.6,
    tags: ["Modern", "Luxury", "Cultural"],
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: 16,
    name: "Medina",
    count: "745 accommodations",
    image: "https://pix6.agoda.net/geo/city/23028/03467989ad0299d0ce13f5590d8c1577.jpg?ce=0&s=375x&ar=1x1",
    country: "Saudi Arabia",
    rating: 4.8,
    tags: ["Religious", "Historic", "Spiritual"],
    color: "from-emerald-500 to-green-600"
  },
  {
    id: 17,
    name: "Krabi",
    count: "2,053 accommodations",
    image: "https://pix6.agoda.net/geo/city/14865/1_14865_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Thailand",
    rating: 4.7,
    tags: ["Islands", "Beaches", "Nature"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 18,
    name: "Muscat",
    count: "485 accommodations",
    image: "https://pix6.agoda.net/geo/city/6445/1_6445_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Oman",
    rating: 4.5,
    tags: ["Traditional", "Mountains", "Beaches"],
    color: "from-orange-500 to-red-600"
  },
  {
    id: 19,
    name: "Da Nang",
    count: "5,534 accommodations",
    image: "https://pix6.agoda.net/geo/city/16440/1_16440_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Vietnam",
    rating: 4.6,
    tags: ["Beaches", "Bridges", "Modern"],
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 20,
    name: "Phuket",
    count: "12,290 accommodations",
    image: "https://pix6.agoda.net/geo/city/16056/1_16056_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    country: "Thailand",
    rating: 4.8,
    tags: ["Island", "Nightlife", "Beaches"],
    color: "from-green-500 to-emerald-600"
  }
];

export default function PopularDestinations() {
  const sliderRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const cardWidth = 320; // w-80 = 320px
    const gap = 24; // gap-6 = 24px
    const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards
    
    sliderRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const cardWidth = 320;
      const gap = 24;
      const newIndex = Math.round(slider.scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.max(0, newIndex));
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Compass className="text-blue-600 animate-spin-slow" size={28} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Popular Destinations
          </h2>
        </div>
        <p className="text-lg text-gray-600 flex items-center gap-2">
          <Plane className="text-blue-500" size={20} />
          Discover amazing destinations outside India
        </p>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-6">
          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentIndex / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {currentIndex + 1} / {Math.ceil(destinations.length / 3)}
          </span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative group">
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll("left")}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
                     bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-2xl
                     hover:scale-110 hover:bg-white hover:shadow-3xl
                     active:scale-95 transition-all duration-300
                     opacity-0 group-hover:opacity-100 hover:opacity-100"
        >
          <ChevronLeft className="text-gray-800" size={24} />
        </button>

        {/* Slider */}
        <motion.div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth 
                     px-4 py-4 cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'smooth' }}
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={cardVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative min-w-[280px] sm:min-w-[300px] md:min-w-[320px]"
            >
              {/* Gradient Border */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${destination.color} rounded-3xl blur opacity-0 group-hover:opacity-70 transition duration-500`}></div>
              
              {/* Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    animate={hoveredCard === destination.id ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Country Flag */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                        <MapPin size={14} className="text-blue-500" />
                        {destination.country}
                      </span>
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <span className="text-white font-bold text-sm">{destination.rating}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="absolute bottom-16 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {destination.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                    <MapPin size={14} className="text-blue-500" />
                    {destination.count}
                  </p>
                  
                  {/* Explore Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 bg-gradient-to-r ${destination.color} text-white font-semibold rounded-xl
                               hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <span>Explore Now</span>
                    <ChevronRight size={18} />
                  </motion.button>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              
              {/* Floating Icon */}
              <motion.div
                animate={hoveredCard === destination.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full shadow-xl z-10"
              >
                <Plane className="text-white" size={20} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
                     bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-2xl
                     hover:scale-110 hover:bg-white hover:shadow-3xl
                     active:scale-95 transition-all duration-300
                     opacity-0 group-hover:opacity-100 hover:opacity-100"
        >
          <ChevronRight className="text-gray-800" size={24} />
        </button>
      </div>

      {/* Dots Navigation for Mobile */}
      <div className="flex justify-center gap-2 mt-8 lg:hidden">
        {Array.from({ length: Math.ceil(destinations.length / 3) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (sliderRef.current) {
                const cardWidth = 320;
                const gap = 24;
                sliderRef.current.scrollTo({
                  left: idx * (cardWidth + gap) * 3,
                  behavior: 'smooth'
                });
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "w-8 bg-gradient-to-r from-blue-600 to-purple-600" 
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                     font-semibold rounded-full hover:shadow-xl hover:shadow-blue-500/30 
                     transition-all duration-300 inline-flex items-center gap-3"
        >
          <span>View All Destinations</span>
          <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
        </motion.button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
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