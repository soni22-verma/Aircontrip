import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Star, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const destinations = [
  {
    id: 1,
    title: "New Delhi and NCR",
    count: "12,786 accommodations",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    tag: "Popular"
  },
  {
    id: 2,
    title: "Goa",
    count: "9,254 accommodations",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    tag: "Beach"
  },
  {
    id: 3,
    title: "Bangalore",
    count: "5,372 accommodations",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    tag: "Tech Hub"
  },
  {
    id: 4,
    title: "Mumbai",
    count: "4,177 accommodations",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    tag: "City Life"
  },
  {
    id: 5,
    title: "Hyderabad",
    count: "2,735 accommodations",
    image: "https://pix6.agoda.net/geo/city/8801/1_8801_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    rating: 4.4,
    tag: "Heritage"
  },
  {
    id: 6,
    title: "Chennai",
    count: "2,832 accommodations",
    image: "https://pix6.agoda.net/geo/city/17269/1_17269_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    rating: 4.3,
    tag: "Coastal"
  },
  {
    id: 7,
    title: "Jaipur",
    count: "2,735 accommodations",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    tag: "Royal"
  },
  {
    id: 8,
    title: "Varanasi",
    count: "2,000 accommodations",
    image: "https://pix6.agoda.net/geo/city/3005/1_3005_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
    rating: 4.6,
    tag: "Spiritual"
  },
  {
    id: 9,
    title: "Pune",
    count: "2,494 accommodations",
    image: "https://pix6.agoda.net/geo/city/16854/0abc435fa78c2ca6fb4cb5ec86af89d0.jpg?ce=0&s=375x&ar=1x1",
    rating: 4.5,
    tag: "Student City"
  },
  {
    id: 10,
    title: "Kochi",
    count: "2,165 accommodations",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    tag: "Backwaters"
  },
];

export default function TopDestinationsSlider() {
  const sliderRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) setVisibleCards(4);
      else if (window.innerWidth >= 768) setVisibleCards(3);
      else if (window.innerWidth >= 640) setVisibleCards(2);
      else setVisibleCards(1);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const scroll = (direction) => {
    const cardWidth = sliderRef.current.children[0]?.offsetWidth + 16;
    const scrollAmount = cardWidth * visibleCards;
    
    sliderRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
    
    setCurrentIndex(prev => {
      const maxIndex = destinations.length - visibleCards;
      if (direction === "right") {
        return Math.min(prev + 1, maxIndex);
      } else {
        return Math.max(prev - 1, 0);
      }
    });
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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-12 relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />

      {/* Heading with animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Explore India
          </span>
        </div>
        
        <h2 className="
          text-3xl 
          sm:text-4xl 
          md:text-5xl 
          lg:text-6xl 
          font-bold 
          text-center 
          mb-4
          bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 
          bg-clip-text text-transparent
          leading-tight
        ">
          Top Destinations in India
        </h2>
        
        <p className="text-gray-600 text-center text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Discover amazing places with thousands of accommodations to choose from
        </p>
      </motion.div>

      {/* Slider Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation Buttons - Desktop */}
        <AnimatePresence>
          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute -left-14 top-1/2 -translate-y-1/2 z-20
                       bg-white/90 backdrop-blur-sm shadow-2xl p-4 rounded-full 
                       hover:bg-white border border-gray-200
                       hover:shadow-2xl transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {currentIndex < destinations.length - visibleCards && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2 z-20
                       bg-white/90 backdrop-blur-sm shadow-2xl p-4 rounded-full 
                       hover:bg-white border border-gray-200
                       hover:shadow-2xl transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Dots */}
        <div className="lg:hidden flex justify-center gap-2 mb-6">
          {Array.from({ length: Math.ceil(destinations.length / visibleCards) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const cardWidth = sliderRef.current.children[0]?.offsetWidth + 16;
                sliderRef.current.scrollTo({
                  left: idx * cardWidth * visibleCards,
                  behavior: 'smooth'
                });
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-8 bg-blue-500' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Slider Cards */}
        <motion.div
          ref={sliderRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence>
            {destinations.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative min-w-[280px] sm:min-w-[320px] md:min-w-[340px] lg:min-w-[360px] 
                         flex-shrink-0 group cursor-pointer"
              >
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-3xl shadow-xl 
                              bg-white border border-gray-200/50 
                              hover:shadow-2xl transition-all duration-500">
                  
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent 
                                  z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full 
                                     text-sm font-semibold text-gray-800 shadow-lg">
                        {item.tag}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1 
                                  px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-semibold text-sm">
                        {item.rating}
                      </span>
                    </div>

                    {/* Image with parallax effect */}
                    <motion.img
                      variants={imageVariants}
                      whileHover="hover"
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 
                                       transition-colors duration-300">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {item.count}
                        </p>
                      </div>
                    </div>

                    {/* Explore Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 
                               text-white font-semibold rounded-xl shadow-lg 
                               hover:shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700
                               transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Explore Now</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  {/* Hover Effect Glow */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none 
                                bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating particles on hover */}
                {hoveredCard === item.id && (
                  <>
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full 
                                  animate-ping opacity-75" />
                    <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-400 rounded-full 
                                  animate-ping opacity-75 delay-300" />
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Progress Indicator */}
        <div className="hidden lg:flex items-center justify-center gap-4 mt-8">
          <div className="h-1.5 bg-gray-200 rounded-full w-64 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ 
                width: `${((currentIndex + visibleCards) / destinations.length) * 100}%` 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
          <span className="text-gray-600 font-medium">
            {currentIndex + 1} - {Math.min(currentIndex + visibleCards, destinations.length)} of {destinations.length}
          </span>
        </div>
      </div>

      {/* Scroll hint for mobile */}
      <motion.div 
        animate={{ x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="lg:hidden text-center mt-6 text-gray-500 text-sm"
      >
        ← Scroll to explore more →
      </motion.div>
    </div>
  );
}