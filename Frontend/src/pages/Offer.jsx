import React, { useState } from 'react';
import { 
  Plane, 
  Search, 
  Filter, 
  Star, 
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Ticket,
  Tag,
  Percent,
  Calendar,
  Users,
  MapPin,
  ChevronDown,
  AlertCircle,
  X
} from 'lucide-react';

const AircontripOffersPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffer, setSelectedOffer] = useState('') ;

  // Filters for offers
  const filters = [
    { id: 'all', label: 'All Offers', count: 24 },
    { id: 'flights', label: 'Flights', count: 12 },
    { id: 'hotels', label: 'Hotels', count: 6 },
    { id: 'packages', label: 'Packages', count: 4 },
    { id: 'exclusive', label: 'Exclusive', count: 8 },
    { id: 'expiring', label: 'Expiring Soon', count: 3 },
  ];

  // Featured offers
  const featuredOffers = [
    {
      id: 'feat-1',
      title: 'Weekend Getaway Special',
      description: 'Book any domestic flight this weekend and get 40% off on hotel bookings',
      discount: '40% OFF',
      code: 'WEEKEND40',
      validUntil: '2025-12-31',
      type: 'package',
      icon: <Ticket className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      highlight: true
    },
    {
      id: 'feat-2',
      title: 'Early Bird Flight Discount',
      description: 'Book flights 30 days in advance and save up to ₹5,000',
      discount: 'UPTO ₹5,000',
      code: 'EARLYBIRD',
      validUntil: '2025-12-25',
      type: 'flights',
      icon: <Plane className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      highlight: true
    },
    {
      id: 'feat-3',
      title: 'Hotel Bundle Deal',
      description: '3+ nights stay with complimentary breakfast and airport transfer',
      discount: '35% OFF',
      code: 'STAY35',
      validUntil: '2025-12-28',
      type: 'hotels',
      icon: <Tag className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      highlight: true
    },
  ];

  // Regular offers
  const regularOffers = [
    {
      id: 'offer-1',
      title: 'Student Discount',
      description: 'Exclusive 25% off for students on all domestic flights',
      discount: '25% OFF',
      code: 'STUDENT25',
      validUntil: '2025-12-31',
      type: 'flights',
      icon: <Percent className="w-6 h-6" />,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50',
      conditions: 'Valid student ID required'
    },
    {
      id: 'offer-2',
      title: 'Family Vacation Package',
      description: 'Special rates for family bookings (4+ members)',
      discount: '30% OFF',
      code: 'FAMILY30',
      validUntil: '2025-12-20',
      type: 'package',
      icon: <Users className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      conditions: 'Minimum 4 travelers'
    },
    {
      id: 'offer-3',
      title: 'Business Class Upgrade',
      description: 'Free upgrade to business class on international flights',
      discount: 'FREE UPGRADE',
      code: 'BUSINESSUP',
      validUntil: '2025-12-15',
      type: 'exclusive',
      icon: <Star className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      conditions: 'On flights above ₹50,000'
    },
    {
      id: 'offer-4',
      title: 'Hotel Loyalty Bonus',
      description: 'Extra 20% discount for loyal customers',
      discount: '20% BONUS',
      code: 'LOYAL20',
      validUntil: '2025-12-22',
      type: 'hotels',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      conditions: 'For returning customers only'
    },
    {
      id: 'offer-5',
      title: 'Last Minute Deal',
      description: 'Special discounts on flights departing within 48 hours',
      discount: 'UPTO 50%',
      code: 'LASTMIN',
      validUntil: '2025-12-10',
      type: 'expiring',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      conditions: 'Limited seats available'
    },
    {
      id: 'offer-6',
      title: 'Destination Special: Goa',
      description: 'Complete package including flights + 3-night stay',
      discount: '₹8,000 OFF',
      code: 'GOASPECIAL',
      validUntil: '2025-12-30',
      type: 'package',
      icon: <MapPin className="w-6 h-6" />,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50',
      conditions: 'Valid for Goa bookings only'
    },
  ];

  const allOffers = [...featuredOffers, ...regularOffers];

  // Filter offers based on selection
  const filteredOffers = selectedFilter === 'all' 
    ? allOffers 
    : allOffers.filter(offer => offer.type === selectedFilter);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied to clipboard!`);
  };

  const handleApplyOffer = (offerId) => {
    setSelectedOffer(offerId);
    // In a real app, you would redirect to booking page or show modal
    setTimeout(() => setSelectedOffer(null), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Plane className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">Aircontrip</span>
              </div>
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Flights
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Hotels
                </a>
                <a href="#" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">
                  Offers
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  My Bookings
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100">
                Sign In
              </button>
              <button className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative bg-red-200">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Exclusive Travel Offers
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Unlock amazing discounts on flights, hotels, and vacation packages. 
              Your next adventure is more affordable than ever!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search offers by destination, code, or type..."
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  <Search className="w-5 h-5 mr-2" />
                  Search Offers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Browse Offers</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Filter by:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter.label}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  selectedFilter === filter.id
                    ? 'bg-blue-500'
                    : 'bg-gray-100'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Offers */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Featured Offers</h3>
            <div className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer">
              <span className="font-medium">View all</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredOffers.map((offer) => (
              <div 
                key={offer.id}
                className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ${offer.bgColor}`}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold text-white bg-linear-to-r ${offer.color} rounded-full">
                    FEATURED
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-linear-to-br ${offer.color} text-white`}>
                      {offer.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-800">{offer.discount}</div>
                      <div className="text-sm text-gray-600">Discount</div>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h4>
                  <p className="text-gray-600 mb-6">{offer.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="font-mono font-bold text-gray-800">{offer.code}</div>
                      <button
                        onClick={() => handleCopyCode(offer.code)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Copy Code
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        Valid until {new Date(offer.validUntil).toLocaleDateString()}
                      </div>
                      <button
                        onClick={() => handleApplyOffer(offer.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-linear-to-r ${offer.color} hover:opacity-90"
                      >
                        {selectedOffer === offer.id ? 'Applied!' : 'Apply Offer'}
                        {selectedOffer !== offer.id && <ArrowRight className="w-4 h-4 ml-2" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Offers Grid */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">All Available Offers</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <div 
                key={offer.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${offer.bgColor}`}>
                      <div className={`text-white ${offer.color.replace('from-', 'text-').replace('to-', '')}`}>
                        {offer.icon}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-linear-to-r ${offer.color} bg-clip-text text-transparent`}>
                        {offer.discount}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">USE CODE</div>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{offer.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                  
                  {offer.conditions && (
                    <div className="flex items-start text-sm text-gray-500 mb-4">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{offer.conditions}</span>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(offer.validUntil).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCopyCode(offer.code)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          {offer.code}
                        </button>
                        <button
                          onClick={() => handleApplyOffer(offer.id)}
                          className={`px-4 py-1 text-sm font-medium rounded-lg text-white bg-linear-to-r ${offer.color} hover:opacity-90`}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mt-16 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">How to Use Aircontrip Offers</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Find Your Offer</h4>
              <p className="text-gray-600 text-sm">
                Browse through our exclusive offers and select the one that best suits your travel plans
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Copy Coupon Code</h4>
              <p className="text-gray-600 text-sm">
                Click on the "Copy Code" button to save the coupon code to your clipboard
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Apply & Book</h4>
              <p className="text-gray-600 text-sm">
                Use the code during checkout on Aircontrip to avail your discount
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-2">Can I combine multiple offers?</h4>
              <p className="text-gray-600">
                Only one offer can be applied per booking. However, some offers may include combined benefits.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-2">How long are the offers valid?</h4>
              <p className="text-gray-600">
                Each offer has its own validity period mentioned on the card. Please check before applying.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-2">Are there any blackout dates?</h4>
              <p className="text-gray-600">
                Some offers may have blackout dates during peak seasons or holidays. Check offer details for specific restrictions.
              </p>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
};

export default AircontripOffersPage;