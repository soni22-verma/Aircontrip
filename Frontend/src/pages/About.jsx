// DestinationsExplorer.jsx
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  Plane, 
  ChevronRight,
  Filter,
  Heart,
  TrendingUp,
  Sun,
  Snowflake,
  Umbrella,
  Mountain
} from 'lucide-react';

const DestinationsExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    // { id: 'all', name: 'All Destinations', icon: <Globe className="w-5 h-5" /> },
    { id: 'beach', name: 'Beach Getaways', icon: <Umbrella className="w-5 h-5" /> },
    { id: 'mountain', name: 'Mountain Adventures', icon: <Mountain className="w-5 h-5" /> },
    { id: 'city', name: 'City Breaks', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'tropical', name: 'Tropical Islands', icon: <Sun className="w-5 h-5" /> },
    { id: 'winter', name: 'Winter Wonderlands', icon: <Snowflake className="w-5 h-5" /> },
  ];

  const destinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800',
      price: 899,
      rating: 4.8,
      reviews: 1243,
      description: 'Tropical paradise with pristine beaches and rich culture',
      bestTime: 'Apr-Oct',
      travelers: '2M+ visited',
      isTrending: true,
      discount: 25,
    },
    {
      id: 2,
      name: 'Swiss Alps',
      category: 'mountain',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800',
      price: 1299,
      rating: 4.9,
      reviews: 892,
      description: 'Majestic mountains and alpine adventures',
      bestTime: 'Dec-Mar',
      travelers: '850K+ visited',
      isTrending: true,
      discount: 15,
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      category: 'city',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800',
      price: 1499,
      rating: 4.7,
      reviews: 2105,
      description: 'Vibrant metropolis blending tradition and innovation',
      bestTime: 'Mar-May',
      travelers: '3M+ visited',
      isTrending: false,
      discount: 10,
    },
    {
      id: 4,
      name: 'Maldives',
      category: 'tropical',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800',
      price: 2499,
      rating: 4.9,
      reviews: 1567,
      description: 'Overwater bungalows and crystal clear waters',
      bestTime: 'Nov-Apr',
      travelers: '750K+ visited',
      isTrending: true,
      discount: 20,
    },
    {
      id: 5,
      name: 'New York City, USA',
      category: 'city',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800',
      price: 1699,
      rating: 4.6,
      reviews: 3120,
      description: 'The city that never sleeps',
      bestTime: 'Apr-Jun, Sep-Nov',
      travelers: '5M+ visited',
      isTrending: false,
      discount: 0,
    },
    {
      id: 6,
      name: 'Switzerland',
      category: 'winter',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800',
      price: 1399,
      rating: 4.8,
      reviews: 1789,
      description: 'Winter sports and cozy mountain lodges',
      bestTime: 'Dec-Feb',
      travelers: '1.2M+ visited',
      isTrending: true,
      discount: 18,
    },
    {
      id: 7,
      name: 'Santorini, Greece',
      category: 'beach',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800',
      price: 1199,
      rating: 4.7,
      reviews: 1987,
      description: 'White-washed buildings with blue dome churches',
      bestTime: 'Jun-Sep',
      travelers: '2.5M+ visited',
      isTrending: false,
      discount: 12,
    },
    {
      id: 8,
      name: 'Banff, Canada',
      category: 'mountain',
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800',
      price: 1099,
      rating: 4.9,
      reviews: 1345,
      description: 'Emerald lakes and rugged mountain peaks',
      bestTime: 'Jun-Aug, Dec-Mar',
      travelers: '950K+ visited',
      isTrending: true,
      discount: 22,
    },
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const Globe = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-10000 hover:scale-100"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000)',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-900/70 to-teal-800/50"></div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                Discover Your Next Adventure
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Explore breathtaking destinations around the globe with exclusive Aircontrip deals
              </p>
              
              {/* Search Bar */}
              <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-2">
                <div className="flex flex-col md:flex-row gap-4 p-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search destinations, countries, or experiences..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Airplane Animation */}
        <div className="absolute top-1/4 right-1/4 animate-float">
          <Plane className="w-12 h-12 text-white opacity-70 rotate-45" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Categories Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Filter className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Explore by Category
              </h2>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-linear-to-r from-blue-600 to-teal-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Destinations
              <span className="block text-lg font-normal text-gray-600 mt-2">
                {filteredDestinations.length} amazing places to discover
              </span>
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Sort by: 
                <select className="ml-2 bg-transparent border-none focus:ring-0 font-medium">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trending Banner */}
          <div className="mb-8 bg-linear-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold">TRENDING NOW</span>
                </div>
                <h3 className="text-2xl font-bold">Summer Sale! Up to 40% Off</h3>
                <p className="opacity-90">Book your summer escape today</p>
              </div>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                View Deals
              </button>
            </div>
          </div>

          {/* Destinations Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <div 
                key={destination.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4">
                    {destination.isTrending && (
                      <span className="bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        TRENDING
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => toggleFavorite(destination.id)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          favorites.includes(destination.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </div>
                  
                  {/* Discount Badge */}
                  {destination.discount > 0 && (
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-linear-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        -{destination.discount}% OFF
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{destination.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${destination.price}
                        <span className="text-sm text-gray-600 font-normal"> /person</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  
                  {/* Rating and Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-bold">{destination.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({destination.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <Users className="inline w-4 h-4 mr-1" />
                      {destination.travelers}
                    </div>
                  </div>
                  
                  {/* Info Row */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Best time: {destination.bestTime}</span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className="w-full bg-linear-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <span>Book Now</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Map Section */}
        <div className="bg-linear-to-r from-blue-900 to-teal-900 rounded-2xl overflow-hidden mb-12">
          <div className="p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Global Reach</h2>
                <p className="text-blue-200">Track flights and explore routes worldwide</p>
              </div>
              <button className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-lg hover:bg-white/30 transition-colors">
                View Live Map
              </button>
            </div>
            
            {/* Map Visualization */}
            <div className="relative h-64 bg-linear-to-br from-blue-800 to-teal-800 rounded-xl overflow-hidden">
              {/* Simplified Map Dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[
                  { top: '20%', left: '15%', size: 'w-4 h-4' },
                  { top: '30%', left: '40%', size: 'w-6 h-6' },
                  { top: '60%', left: '25%', size: 'w-5 h-5' },
                  { top: '40%', left: '70%', size: 'w-7 h-7' },
                  { top: '70%', left: '60%', size: 'w-4 h-4' },
                  { top: '50%', left: '85%', size: 'w-6 h-6' },
                ].map((dot, idx) => (
                  <div
                    key={idx}
                    className={`absolute ${dot.size} bg-linear-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse`}
                    style={{ top: dot.top, left: dot.left }}
                  />
                ))}
                
                {/* Flight Paths */}
                <div className="absolute w-full h-full">
                  <svg className="w-full h-full">
                    <line 
                      x1="15%" y1="20%" 
                      x2="40%" y2="30%" 
                      stroke="rgba(255,255,255,0.3)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                    <line 
                      x1="40%" y1="30%" 
                      x2="70%" y2="40%" 
                      stroke="rgba(255,255,255,0.3)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                    <line 
                      x1="25%" y1="60%" 
                      x2="60%" y2="70%" 
                      stroke="rgba(255,255,255,0.3)" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4">
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span>Popular Destinations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span>Flight Routes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-linear-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-center text-white mb-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Never Miss a Deal
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to get exclusive travel deals, destination guides, and early access to sales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DestinationsExplorer;