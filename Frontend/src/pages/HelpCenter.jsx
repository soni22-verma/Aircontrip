import React, { useState, useEffect } from 'react';
import { 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronRight, 
  Home, 
  Calendar,
  CreditCard,
  User,
  Shield,
  Globe,
  FileText,
  Star,
  X,
  ChevronDown,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  BookOpen,
  Video,
  Download,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Eye,
  Users,
  Heart,
  MapPin,
  Settings,
  FileQuestion,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Bell,
  Tag,
  Filter,
  ArrowRight,
  ChevronLeft,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  const categories = [
    { id: 'booking', title: 'Booking Help', icon: Calendar, count: 24, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50' },
    { id: 'payments', title: 'Payments', icon: CreditCard, count: 18, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50' },
    { id: 'account', title: 'Account', icon: User, count: 15, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50' },
    { id: 'safety', title: 'Safety', icon: Shield, count: 12, color: 'from-red-500 to-orange-500', bgColor: 'bg-red-50' },
    { id: 'hosting', title: 'Hosting', icon: Home, count: 32, color: 'from-amber-500 to-yellow-500', bgColor: 'bg-amber-50' },
    { id: 'travel', title: 'Travel Info', icon: Globe, count: 21, color: 'from-cyan-500 to-blue-500', bgColor: 'bg-cyan-50' },
    { id: 'cancellation', title: 'Cancellations', icon: FileText, count: 16, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50' },
    { id: 'reviews', title: 'Reviews', icon: Star, count: 9, color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50' },
  ];

  const popularArticles = [
    { 
      id: 1, 
      title: 'How to modify or cancel a booking', 
      category: 'booking', 
      views: '12.4k', 
      rating: 4.8,
      readTime: '3 min read',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 2, 
      title: 'Payment methods we accept', 
      category: 'payments', 
      views: '8.7k', 
      rating: 4.5,
      readTime: '2 min read',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 3, 
      title: 'Understanding security deposits', 
      category: 'safety', 
      views: '6.2k', 
      rating: 4.7,
      readTime: '4 min read',
      color: 'from-red-500 to-orange-500'
    },
    { 
      id: 4, 
      title: 'How to become a host', 
      category: 'hosting', 
      views: '15.3k', 
      rating: 4.9,
      readTime: '5 min read',
      color: 'from-amber-500 to-yellow-500'
    },
    { 
      id: 5, 
      title: 'COVID-19 travel updates', 
      category: 'travel', 
      views: '22.1k', 
      rating: 4.6,
      readTime: '2 min read',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      id: 6, 
      title: 'Verifying your account', 
      category: 'account', 
      views: '5.8k', 
      rating: 4.4,
      readTime: '3 min read',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I change my reservation dates?',
      answer: 'You can modify your reservation dates by going to "My Trips" in your account, selecting the reservation you want to change, and clicking "Change Dates". Changes are subject to the host\'s approval and may affect the total price.',
      category: 'booking',
      helpful: 234,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards (Visa, MasterCard, American Express, Discover), debit cards, PayPal, and in some regions, local payment methods. All payments are processed securely through our encrypted payment system.',
      category: 'payments',
      helpful: 189,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      question: 'How do I become a verified host?',
      answer: 'To become a verified host, complete your profile, add a government-issued ID, set up your payout method, and verify your phone number and email. Our team will review your submission within 24-48 hours.',
      category: 'hosting',
      helpful: 312,
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 4,
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by property. You can check the specific policy for each listing before booking. Generally, we offer flexible, moderate, and strict policies with different refund percentages based on when you cancel.',
      category: 'cancellation',
      helpful: 276,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 5,
      question: 'How are reviews handled?',
      answer: 'Both guests and hosts have 14 days after checkout to write a review. Reviews are posted simultaneously after both parties have submitted or the 14-day period ends. We moderate reviews to ensure they meet our community guidelines.',
      category: 'reviews',
      helpful: 154,
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  const contactOptions = [
    { 
      id: 'call', 
      title: 'Call Support', 
      description: 'Available 24/7', 
      icon: Phone, 
      value: '+1 (800) 123-4567', 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      id: 'chat', 
      title: 'Live Chat', 
      description: 'Instant response', 
      icon: MessageSquare, 
      value: 'Start Chat', 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      id: 'email', 
      title: 'Email Us', 
      description: 'Reply within 2 hours', 
      icon: Mail, 
      value: 'support@aircontrip.com', 
      color: 'from-purple-500 to-pink-500' 
    },
  ];

  const featuredGuides = [
    { 
      id: 1, 
      title: 'Travel Safety Guide', 
      icon: Shield, 
      time: '10 min read', 
      type: 'guide',
      category: 'safety',
      color: 'from-red-500 to-orange-500'
    },
    { 
      id: 2, 
      title: 'Hosting Best Practices', 
      icon: Home, 
      time: '15 min read', 
      type: 'guide',
      category: 'hosting',
      color: 'from-amber-500 to-yellow-500'
    },
    { 
      id: 3, 
      title: 'Payment Security', 
      icon: CreditCard, 
      time: '8 min read', 
      type: 'video',
      category: 'payments',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 4, 
      title: 'Travel Checklist', 
      icon: BookOpen, 
      time: '5 min read', 
      type: 'checklist',
      category: 'travel',
      color: 'from-cyan-500 to-blue-500'
    },
  ];

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
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    issue: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactFormData);
    setShowContactForm(false);
    setContactFormData({ name: '', email: '', issue: '', message: '' });
  };

  const handleCopyContact = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedCode(value);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderArticleContent = () => {
    if (!selectedArticle) return null;

    const article = popularArticles.find(a => a.id === selectedArticle);
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b p-6 z-10">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 text-sm font-bold text-white bg-gradient-to-r ${article.color} rounded-full`}>
                      {article.category.toUpperCase()}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye size={16} className="mr-1" />
                      {article.views} views
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mt-2">{article.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="prose max-w-none">
                <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center">
                    <Star size={16} className="mr-1 text-amber-500" />
                    {article.rating} rating
                  </span>
                  <span className="flex items-center">
                    <TrendingUp size={16} className="mr-1 text-green-500" />
                    95% found helpful
                  </span>
                </div>
                
                <div className={`bg-gradient-to-r ${article.color}/10 rounded-2xl p-6 mb-6 border border-gray-100`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Zap size={20} />
                    Quick Summary
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    {[
                      'Step-by-step instructions with screenshots',
                      'Common issues and their solutions',
                      'Best practices and expert tips',
                      'Contact support if needed'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Instructions</h3>
                <p className="text-gray-600 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Sparkles size={18} />
                    Pro Tip
                  </h4>
                  <p className="text-gray-600">
                    For the best experience, make sure to complete all required steps in order and double-check your information before submitting.
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                    >
                      <ThumbsUp size={20} />
                      <span>Helpful ({Math.floor(Math.random() * 100)})</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                    >
                      <ThumbsDown size={20} />
                      <span>Not Helpful ({Math.floor(Math.random() * 20)})</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                    >
                      <Share2 size={20} />
                      <span>Share</span>
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-50"
                  >
                    <Bookmark size={20} />
                    <span>Save Article</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative bg-gradient-to-r from-white via-white to-blue-50/50 border-b border-gray-200 mt-9"
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-xl">
                  <HelpCircle className="h-12 w-12 text-white" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            >
              How can we{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                help you?
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Find answers to your questions about bookings, payments, hosting, and more
            </motion.p>
            
            {/* Search Bar */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSearch} 
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 transition-opacity duration-300 ${isSearchFocused ? 'opacity-30' : ''}`}></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className={`h-5 w-5 transition-colors ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for help articles, FAQs, or topics..."
                    className="w-full pl-14 pr-32 py-4 text-base bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Search
                  </motion.button>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <span className="text-gray-500 text-sm">Popular:</span>
                {['cancellation', 'refund', 'booking modification', 'payment', 'host verification'].map((term, idx) => (
                  <motion.button
                    key={term}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 rounded-full text-sm transition-all duration-300 border border-gray-200"
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Filter className="w-8 h-8 text-blue-500" />
              Browse by category
            </h2>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
            >
              <span>View all categories</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                variants={itemVariants}
                whileHover="hover"
                variants={cardHoverVariants}
                onClick={() => setActiveCategory(category.id)}
                className={`relative p-5 rounded-2xl transition-all duration-300 text-left group ${
                  activeCategory === category.id
                    ? 'bg-white border-2 border-blue-500 shadow-xl'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} mb-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-30 blur"></div>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{category.count} articles</p>
                  <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                    activeCategory === category.id ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Popular Articles */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              Popular articles
            </h2>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
            >
              <span>View all articles</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-70 blur transition duration-500 rounded-2xl"></div>
                <div 
                  onClick={() => setSelectedArticle(article.id)}
                  className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r ${article.color} rounded-full`}>
                      {article.category.toUpperCase()}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye size={14} className="mr-1" />
                      {article.views}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center">
                      <Star size={14} className="mr-1 text-amber-500" />
                      {article.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${article.color}`}></div>
                      <span className="text-sm text-gray-600">Read article</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - FAQ & Guides */}
          <div className="lg:col-span-2">
            {/* FAQ Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <FileQuestion className="w-8 h-8 text-purple-500" />
                Frequently asked questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 flex items-start justify-between group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${faq.color} rounded-full`}>
                            {faq.category}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <ThumbsUp size={12} className="mr-1" />
                            {faq.helpful} found helpful
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`ml-4 p-2 rounded-full bg-gradient-to-r ${faq.color}/10`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-b-2xl border border-t-0 border-gray-200">
                            <p className="text-gray-600 mb-6">{faq.answer}</p>
                            <div className="flex items-center gap-4">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                              >
                                <ThumbsUp size={16} />
                                Helpful
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                              >
                                <ThumbsDown size={16} />
                                Not helpful
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                              >
                                <ExternalLink size={16} />
                                Read more
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Featured Guides */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-amber-500" />
                Guides & resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredGuides.map((guide, index) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${guide.color} shadow-lg`}>
                          <guide.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-xs font-medium">
                          {guide.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock size={14} className="mr-1" />
                          {guide.time}
                        </span>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 text-sm font-bold rounded-lg text-white bg-gradient-to-r ${guide.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2`}
                        >
                          {guide.type === 'video' && <Video size={16} />}
                          {guide.type === 'guide' && <BookOpen size={16} />}
                          {guide.type === 'checklist' && <Download size={16} />}
                          {guide.type === 'video' ? 'Watch' : guide.type === 'guide' ? 'Read' : 'Download'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column - Contact & Resources */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Contact Options */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white via-white to-blue-50/50 rounded-2xl border border-gray-200 p-6 shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                  Still need help?
                </h3>
                
                <div className="space-y-4">
                  {contactOptions.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-gray-300 transition-all duration-300">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color} shadow-lg`}>
                          <option.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {option.title}
                          </h4>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 ml-16">
                        <span className="text-sm font-medium text-gray-700">{option.value}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => option.id !== 'chat' ? handleCopyContact(option.value) : setShowLiveChat(true)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {option.id === 'chat' ? (
                            <ArrowRight className="w-4 h-4 text-gray-500" />
                          ) : copiedCode === option.value ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowContactForm(true)}
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Submit a request
                </motion.button>
              </motion.section>

              {/* Quick Resources */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Quick resources
                </h3>
                
                <div className="space-y-3">
                  {[
                    { title: 'Community guidelines', icon: Users, color: 'from-blue-500 to-cyan-500' },
                    { title: 'Travel advisories', icon: Globe, color: 'from-green-500 to-emerald-500' },
                    { title: 'Host resources', icon: Home, color: 'from-amber-500 to-yellow-500' },
                    { title: 'COVID-19 updates', icon: AlertCircle, color: 'from-red-500 to-orange-500' },
                    { title: 'Legal documents', icon: FileText, color: 'from-purple-500 to-pink-500' },
                  ].map((resource, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ x: 5 }}
                      href="#"
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${resource.color}`}>
                          <resource.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                          {resource.title}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </motion.a>
                  ))}
                </div>
              </motion.section>

              {/* Status Updates */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 rounded-2xl border border-green-100 p-6 shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  System status
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-green-400 rounded-full blur opacity-30"></div>
                        <CheckCircle className="relative h-6 w-6 text-green-600" />
                      </div>
                      <span className="font-bold text-green-700">All systems operational</span>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Booking system', status: 'operational', icon: Calendar },
                      { name: 'Payment processing', status: 'operational', icon: CreditCard },
                      { name: 'Messaging', status: 'operational', icon: MessageSquare },
                      { name: 'Host dashboard', status: 'operational', icon: Home },
                    ].map((system, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <system.icon className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-700">{system.name}</span>
                        </div>
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {system.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="#"
                    className="block text-center text-gray-600 hover:text-gray-900 text-sm font-medium"
                  >
                    View incident history →
                  </motion.a>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Contact support</h3>
                    <p className="text-gray-600 mt-1">We'll get back to you within 2 hours</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowContactForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
                  </motion.button>
                </div>
              </div>
              
              <form onSubmit={handleContactSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={contactFormData.email}
                      onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">Issue type *</label>
                  <select
                    required
                    value={contactFormData.issue}
                    onChange={(e) => setContactFormData({...contactFormData, issue: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select an issue</option>
                    <option value="booking">Booking issue</option>
                    <option value="payment">Payment issue</option>
                    <option value="account">Account issue</option>
                    <option value="safety">Safety concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Message *</label>
                  <textarea
                    required
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Describe your issue in detail..."
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg font-medium"
                  >
                    Submit request
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat Widget */}
      <AnimatePresence>
        {showLiveChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-bold">Live Chat Support</span>
              </div>
              <button onClick={() => setShowLiveChat(false)} className="text-white hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 h-96 overflow-y-auto">
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">A support agent will be with you shortly.</p>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  onKeyPress={(e) => e.key === 'Enter' && setChatMessage('')}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Help Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowLiveChat(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2 group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="hidden group-hover:inline ml-2 font-medium">Live Help</span>
      </motion.button>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-2xl z-40"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {renderArticleContent()}
    </div>
  );
};

export default HelpCenter;