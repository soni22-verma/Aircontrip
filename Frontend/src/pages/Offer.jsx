import React, { useState, useEffect, useRef } from 'react';
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
  X,
  Sparkles,
  Zap,
  Gift,
  TrendingUp,
  Copy,
  ChevronLeft,
  ChevronRight,
  Crown,
  ShieldCheck,
  Globe,
  Headphones,
  Award,
  Tag as TagIcon,
  ArrowUpRight,
  Check,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const AircontripOffersPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffer, setSelectedOffer] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const filtersRef = useRef();
  const heroRef = useRef();
  const heroInView = useInView(heroRef, { once: true });

  // Filters for offers
  const filters = [
    { id: 'all', label: 'All Offers', count: 24, icon: Gift, color: 'from-purple-500 to-pink-500' },
    { id: 'flights', label: 'Flights', count: 12, icon: Plane, color: 'from-blue-500 to-cyan-500' },
    { id: 'hotels', label: 'Hotels', count: 6, icon: Shield, color: 'from-green-500 to-emerald-500' },
    { id: 'packages', label: 'Packages', count: 4, icon: Ticket, color: 'from-orange-500 to-amber-500' },
    { id: 'exclusive', label: 'Exclusive', count: 8, icon: Crown, color: 'from-yellow-500 to-orange-500' },
    { id: 'expiring', label: 'Expiring Soon', count: 3, icon: Clock, color: 'from-red-500 to-pink-500' },
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
      icon: Ticket,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      highlight: true,
      popular: true
    },
    {
      id: 'feat-2',
      title: 'Early Bird Flight Discount',
      description: 'Book flights 30 days in advance and save up to ₹5,000',
      discount: 'UPTO ₹5,000',
      code: 'EARLYBIRD',
      validUntil: '2025-12-25',
      type: 'flights',
      icon: Plane,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      highlight: true,
      popular: true
    },
    {
      id: 'feat-3',
      title: 'Hotel Bundle Deal',
      description: '3+ nights stay with complimentary breakfast and airport transfer',
      discount: '35% OFF',
      code: 'STAY35',
      validUntil: '2025-12-28',
      type: 'hotels',
      icon: Tag,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      highlight: true,
      popular: true
    },
    {
      id: 'feat-4',
      title: 'International Escape',
      description: '30% off on all international flights to Europe and USA',
      discount: '30% OFF',
      code: 'INTER30',
      validUntil: '2025-12-20',
      type: 'flights',
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      highlight: true,
      popular: false
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
      icon: Percent,
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
      icon: Users,
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
      icon: Star,
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
      icon: Shield,
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
      icon: Clock,
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
      icon: MapPin,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50',
      conditions: 'Valid for Goa bookings only'
    },
    {
      id: 'offer-7',
      title: 'Honeymoon Package',
      description: 'Romantic getaway with premium amenities',
      discount: '₹12,000 OFF',
      code: 'HONEYMOON',
      validUntil: '2025-12-25',
      type: 'package',
      icon: Star,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      conditions: 'Valid certificate required'
    },
    {
      id: 'offer-8',
      title: 'Weekday Special',
      description: '15% off on all weekday flights',
      discount: '15% OFF',
      code: 'WEEKDAY15',
      validUntil: '2025-12-18',
      type: 'flights',
      icon: Calendar,
      color: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-50',
      conditions: 'Monday to Thursday only'
    },
    {
      id: 'offer-9',
      title: 'Group Booking Offer',
      description: 'Special discounts for groups of 10+ people',
      discount: '40% OFF',
      code: 'GROUP40',
      validUntil: '2025-12-31',
      type: 'exclusive',
      icon: Users,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      conditions: 'Minimum 10 travelers'
    },
  ];

  const allOffers = [...featuredOffers, ...regularOffers];

  // Filter offers based on selection
  const filteredOffers = selectedFilter === 'all' 
    ? allOffers 
    : allOffers.filter(offer => offer.type === selectedFilter);

  const faqs = [
    {
      id: 1,
      question: "Can I combine multiple offers?",
      answer: "Only one offer can be applied per booking. However, some offers may include combined benefits like hotel + flight packages."
    },
    {
      id: 2,
      question: "How long are the offers valid?",
      answer: "Each offer has its own validity period mentioned on the card. Please check before applying as they cannot be extended."
    },
    {
      id: 3,
      question: "Are there any blackout dates?",
      answer: "Some offers may have blackout dates during peak seasons or holidays. Check offer details for specific restrictions."
    },
    {
      id: 4,
      question: "Can I use offers on existing bookings?",
      answer: "Offers can only be applied at the time of new bookings. They cannot be applied retroactively."
    },
    {
      id: 5,
      question: "Are these offers transferable?",
      answer: "No, all offers are non-transferable and can only be used by the account holder."
    },
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleApplyOffer = (offerId) => {
    setSelectedOffer(offerId);
    setTimeout(() => setSelectedOffer(null), 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide featured offers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredOffers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    })
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30 mt-5">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

    

      {/* Hero Banner */}
      <motion.div 
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative min-h-[80vh] flex items-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-1/4 left-10 w-6 h-6 bg-white/20 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
            className="absolute top-1/3 right-20 w-8 h-8 bg-white/10 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-white/15 rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={heroInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full blur opacity-30"></div>
              <div className="relative px-8 py-3 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full backdrop-blur-sm">
                <span className="text-white font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  LIMITED TIME OFFERS
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Travel More,
            <span className="block bg-linear-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Pay Less
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Unlock amazing discounts on flights, hotels, and vacation packages. 
            Your next adventure is more affordable than ever!
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-2 border border-white/30">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search offers by destination, code, or type..."
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-3" />
                    Search Offers
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white/60" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Filter className="w-8 h-8 text-blue-500" />
              Browse Offers
            </h2>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
            >
              <span>View all offers</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.div>
          </div>
          
          <div ref={filtersRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter.id)}
                className={`relative p-4 rounded-2xl transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? `bg-linear-to-r ${filter.color} text-white shadow-xl`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-100'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <filter.icon className="w-6 h-6" />
                  <span className="font-semibold text-sm">{filter.label}</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    selectedFilter === filter.id
                      ? 'bg-white/20'
                      : 'bg-gray-100'
                  }`}>
                    {filter.count}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

      

        {/* All Offers Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <Gift className="w-8 h-8 text-blue-500" />
            All Available Offers
            <span className="text-lg font-normal text-gray-600 ml-2">
              ({filteredOffers.length} offers found)
            </span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                variants={itemVariants}
                whileHover="hover"
                variants={cardHoverVariants}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r opacity-0 group-hover:opacity-70 blur transition duration-500 rounded-2xl"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Offer Badge */}
                  {offer.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 text-xs font-bold text-white bg-linear-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg">
                        POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-xl bg-linear-to-r ${offer.color} shadow-lg`}>
                        <offer.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold bg-linear-to-r ${offer.color} bg-clip-text text-transparent`}>
                          {offer.discount}
                        </div>
                        <div className="text-sm text-gray-500">USE CODE</div>
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {offer.title}
                    </h4>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    
                    {offer.conditions && (
                      <div className="flex items-start text-sm text-gray-500 mb-6">
                        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{offer.conditions}</span>
                      </div>
                    )}
                    
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(offer.validUntil).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCopyCode(offer.code)}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
                          >
                            {copiedCode === offer.code ? <Check className="w-4 h-4" /> : offer.code}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApplyOffer(offer.id)}
                            className={`px-6 py-2 text-sm font-bold rounded-lg text-white bg-linear-to-r ${offer.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2`}
                          >
                            {selectedOffer === offer.id ? 'Applied' : 'Apply'}
                            {selectedOffer !== offer.id && <ArrowUpRight className="w-4 h-4" />}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 bg-linear-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl p-12 backdrop-blur-sm"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            How to Use Aircontrip Offers
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: 1, title: "Find Your Offer", desc: "Browse through exclusive offers and select one that suits your travel plans", icon: Search },
              { num: 2, title: "Copy Coupon Code", desc: "Click 'Copy Code' to save the coupon code to your clipboard", icon: Copy },
              { num: 3, title: "Apply & Book", desc: "Use the code during checkout on Aircontrip to avail your discount", icon: CheckCircle }
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30"></div>
                  <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {step.num}
                    </div>
                  </div>
                  <div className="absolute -right-2 -top-2 p-2 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            Frequently Asked Questions
          </h3>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex justify-between items-center group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-linear-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: activeFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 bg-linear-to-r from-blue-50 to-blue-100 rounded-full flex items-center justify-center"
                  >
                    <ChevronDown className="w-5 h-5 text-blue-500" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {activeFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-gray-50/50 rounded-b-2xl">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 relative"
        >
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20"></div>
          <div className="relative bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>
            
            <div className="relative">
              <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-white mb-6">
                Ready to Travel with Amazing Offers?
              </h3>
              <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
                Don't miss out on these exclusive deals. Start planning your next adventure today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Plane className="w-6 h-6" />
                  Explore All Destinations
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-linear-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <TagIcon className="w-6 h-6" />
                  View More Offers
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      

      {/* Floating Offer Notification */}
      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              <div>
                <p className="font-bold">Offer Applied Successfully!</p>
                <p className="text-sm opacity-90">The offer has been applied to your booking</p>
              </div>
              <button onClick={() => setSelectedOffer(null)} className="ml-4">
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AircontripOffersPage;