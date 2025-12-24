import React, { useState, useEffect } from 'react';

const AirconTripAdvertise = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [stats, setStats] = useState({
    customers: 125000,
    destinations: 250,
    flights: 85000,
    satisfaction: 98
  });

  // Animate counters on load
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        customers: prev.customers < 125000 ? prev.customers + 2500 : prev.customers,
        destinations: prev.destinations < 250 ? prev.destinations + 5 : prev.destinations,
        flights: prev.flights < 85000 ? prev.flights + 1700 : prev.flights,
        satisfaction: prev.satisfaction < 98 ? prev.satisfaction + 2 : prev.satisfaction
      }));
    }, 50);

    setTimeout(() => clearInterval(interval), 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const features = [
    { icon: '✈️', title: 'Global Coverage', desc: 'Access to 250+ destinations worldwide' },
    { icon: '💰', title: 'Best Prices', desc: 'Guaranteed lowest fares with price match' },
    { icon: '⚡', title: 'Instant Booking', desc: 'Book flights in under 2 minutes' },
    { icon: '🛡️', title: 'Safe & Secure', desc: 'SSL encryption & secure payment' },
    { icon: '🎫', title: 'Easy Cancellation', desc: 'Flexible cancellation policies' },
    { icon: '📱', title: 'Mobile App', desc: 'Book on the go with our mobile app' },
  ];

  const destinations = [
    { name: 'New York', price: '$299', image: 'nyc.jpg', tag: 'Popular' },
    { name: 'London', price: '$349', image: 'london.jpg', tag: 'Trending' },
    { name: 'Tokyo', price: '$599', image: 'tokyo.jpg', tag: 'Exotic' },
    { name: 'Paris', price: '$379', image: 'paris.jpg', tag: 'Romantic' },
    { name: 'Dubai', price: '$449', image: 'dubai.jpg', tag: 'Luxury' },
    { name: 'Sydney', price: '$699', image: 'sydney.jpg', tag: 'Adventure' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Frequent Traveler', text: 'AirconTrip made my Europe trip seamless! Best prices and excellent customer service.', rating: 5, avatar: '👩‍💼' },
    { name: 'Michael Chen', role: 'Business Traveler', text: 'As someone who travels weekly, AirconTrip saves me hours of searching. Highly recommended!', rating: 5, avatar: '👨‍💼' },
    { name: 'Emma Wilson', role: 'Family Traveler', text: 'Booking our family vacation was so easy. The family discounts are amazing!', rating: 5, avatar: '👩‍👧‍👦' },
  ];

  const airlines = ['AA', 'DL', 'UA', 'BA', 'EK', 'AF', 'LH', 'SQ'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 mt-20">
          {/*  */}

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slideUp">
              Your Journey Begins <span className="text-yellow-300">Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90 animate-slideUp animation-delay-300">
              Book flights, hotels, and experiences at unbeatable prices. Join 125,000+ satisfied travelers.
            </p>
            
           <div className="relative bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-1 max-w-4xl mx-auto mb-16 animate-slideUp animation-delay-600 shadow-2xl shadow-blue-500/20 border border-white/20">
  {/* Glowing border effect */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
  
  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
    {/* Tab Navigation with better styling */}
    <div className="flex space-x-1 p-2 bg-gradient-to-r from-blue-50 to-cyan-50">
      {['flights', 'hotels', 'packages', 'cars'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative flex-1 py-4 px-2 rounded-xl font-bold text-lg transition-all duration-500 group ${
            activeTab === tab
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl'
              : 'text-gray-700 hover:text-blue-600 hover:bg-white/80'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">
              {tab === 'flights' ? '✈️' : 
               tab === 'hotels' ? '🏨' : 
               tab === 'packages' ? '🎒' : '🚗'}
            </span>
            <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
          </div>
          
          {/* Active indicator */}
          {activeTab === tab && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rotate-45"></div>
          )}
        </button>
      ))}
    </div>
    
    {/* Booking Form */}
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* From */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-3 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mr-2">
                <span className="text-blue-600">📍</span>
              </span>
              From
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="City or airport"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* To */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-3 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mr-2">
                <span className="text-blue-600">🏁</span>
              </span>
              To
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Destination"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="text-xl">🎯</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dates */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-3 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mr-2">
                <span className="text-blue-600">📅</span>
              </span>
              Dates
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select dates"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Travelers & Search */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-3 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mr-2">
                <span className="text-blue-600">👥</span>
              </span>
              Travelers
            </label>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="2 Adults, 1 Child"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0a9 9 0 01-13 0" />
                  </svg>
                </div>
              </div>
              
              {/* Search Button */}
              <button className="relative px-8 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-500 group/btn">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center space-x-3">
                  <span className="text-xl">🔍</span>
                  <span className="text-lg">Search</span>
                  <svg 
                    className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
                
                {/* Button glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional options */}
      <div className="mt-6 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600 opacity-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-gray-600 text-sm">Direct flights only</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked />
              <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-gray-600 text-sm">Flexible dates</span>
          </label>
        </div>
        
        <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
          <span className="text-sm">Advanced options</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

            <div className="flex flex-wrap justify-center gap-8 animate-slideUp animation-delay-900">
              {[
                { label: 'Happy Customers', value: `${(stats.customers / 1000).toFixed(0)}K+` },
                { label: 'Destinations', value: `${stats.destinations}+` },
                { label: 'Flights Booked', value: `${(stats.flights / 1000).toFixed(0)}K+` },
                { label: 'Satisfaction', value: `${stats.satisfaction}%` },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">AirconTrip</span>?
            </h2>
            <p className="text-xl text-gray-600">
              We're revolutionizing travel booking with cutting-edge technology and customer-first approach
            </p>
          </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
  {features.map((feature, index) => (
    <div 
      key={index} 
      className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white border border-blue-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-700 hover:-translate-y-3 animate-slideUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background decorative element */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
      
      {/* Icon container with glow effect */}
      <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg group-hover:shadow-blue-500/30 group-hover:scale-110 transition-all duration-500">
        <span className="text-white drop-shadow-lg">{feature.icon}</span>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-gray-900 bg-clip-text text-transparent mb-4 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-500">
          {feature.title}
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">{feature.desc}</p>
        
        {/* Learn more link */}
        <div className="mt-6 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <span>Learn more</span>
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </div>
      </div>
      
      {/* Bottom border effect on hover */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-3/4 transition-all duration-500 rounded-t-full"></div>
    </div>
  ))}
</div>

         
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 bg-gradient-to-b from-white to-blue-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular <span className="text-blue-600">Destinations</span>
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing places at unbeatable prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {destinations.map((dest, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-64 bg-gradient-to-br from-blue-300 to-cyan-200 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">
                      {dest.name === 'New York' ? '🗽' :
                       dest.name === 'London' ? '🇬🇧' :
                       dest.name === 'Tokyo' ? '🗼' :
                       dest.name === 'Paris' ? '🇫🇷' :
                       dest.name === 'Dubai' ? '🏙️' : '🇦🇺'}
                    </div>
                    <h3 className="text-2xl font-bold">{dest.name}</h3>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-blue-600 font-bold px-3 py-1 rounded-full">
                    {dest.tag}
                  </span>
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{dest.price}</div>
                      <div className="text-gray-600">Round trip</div>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity transform group-hover:scale-110 duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              View All 250+ Destinations →
            </button>
          </div>
        </div>
      </section>

      {/* Airlines Partners */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Top Airlines</h3>
            <p className="text-gray-600">We partner with leading airlines worldwide</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {airlines.map((airline, index) => (
              <div 
                key={index} 
                className="w-20 h-20 bg-gradient-to-br from-gray-100 to-white border border-gray-200 rounded-2xl flex items-center justify-center text-2xl font-bold text-gray-700 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
              >
                {airline}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-blue-600">Travelers Say</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who trust AirconTrip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h3>
            <p className="text-xl mb-8 text-blue-100">Sign up today and get 15% off your first booking!</p>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-l-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className={`px-8 rounded-r-2xl font-bold transition-all duration-300 ${subscribed 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                >
                  {subscribed ? '✓ Subscribed!' : 'Get Discount'}
                </button>
              </form>
              <p className="mt-4 text-sm text-blue-200">No spam, unsubscribe anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                q: "How do I get the best prices on AirconTrip?",
                a: "We use advanced algorithms to find the lowest fares across all airlines. Book in advance and use our price alert feature for the best deals."
              },
              {
                q: "What is your cancellation policy?",
                a: "We offer flexible cancellation options. Most tickets can be cancelled with a full refund up to 24 hours before departure."
              },
              {
                q: "Do you offer travel insurance?",
                a: "Yes! We partner with top insurance providers to offer comprehensive travel insurance for all your bookings."
              },
              {
                q: "How can I contact customer support?",
                a: "Our 24/7 customer support is available via chat, email, and phone. Average response time is under 5 minutes."
              },
            ].map((faq, index) => (
              <div key={index} className="mb-6 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center cursor-pointer">
                  <h4 className="text-xl font-bold text-gray-900">{faq.q}</h4>
                  <span className="text-2xl text-blue-600">+</span>
                </div>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Your Next Adventure Awaits
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-100">
            Join over 125,000 travelers who trust AirconTrip for their journeys. Book your flight today and experience the difference.
          </p>
          
        </div>
      </section>

     
    </div>
  );
};

export default AirconTripAdvertise;