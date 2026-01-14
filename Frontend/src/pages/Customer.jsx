import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  CreditCard, 
  HelpCircle, 
  Shield, 
  Wallet, 
  Ticket,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  User,
  DollarSign,
  Train,
  Clock,
  CheckCircle,
  LogIn,
  Search,
  ChevronDown,
  MessageSquare,
  Headphones,
  Globe,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowUpRight,
  X,
  Link
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MigoHelpPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const helpTopics = [
    {
      id: 1,
      title: "Account Settings",
      description: "Update email, phone no. or password",
      icon: Settings,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      details: "Manage your personal information, privacy settings, and notification preferences."
    },
    {
      id: 2,
      title: "Migo Money",
      description: "View Migo money transaction details and rules",
      icon: Wallet,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      details: "Track your wallet balance, transactions, and cashback offers in one place."
    },
    {
      id: 3,
      title: "Pre-booking Queries",
      description: "Facing issue while booking? Not able to book?",
      icon: HelpCircle,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      details: "Get assistance with booking errors, payment issues, and availability queries."
    },
    {
      id: 4,
      title: "Migo Money Max",
      description: "Seamless instant refunds",
      icon: DollarSign,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      details: "Experience hassle-free instant refunds with our premium refund policy."
    },
    {
      id: 5,
      title: "Migo Assured",
      description: "Get free cancellation benefits",
      icon: Shield,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      details: "Enjoy risk-free bookings with complimentary cancellation and date change options."
    },
    {
      id: 6,
      title: "Migo AU Credit Card",
      description: "Your Gateway To Exclusive Perks",
      icon: CreditCard,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      details: "Unlock premium benefits and rewards with our exclusive co-branded credit card."
    },
    {
      id: 7,
      title: "Manage Payment Methods",
      description: "Delete saved cards or link/unlink wallets",
      icon: CreditCard,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      details: "Securely manage your payment methods, saved cards, and digital wallets."
    },
    {
      id: 8,
      title: "Metro Ticket Booking",
      description: "Metro Tickets Made Simple",
      icon: Train,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      details: "Book metro tickets across major cities with quick QR code access."
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking from 'My Trips' section. Refunds are processed as per the cancellation policy, typically within 5-7 business days."
    },
    {
      id: 2,
      question: "What is Migo money?",
      answer: "Migo money is a digital wallet feature that allows you to store money for faster bookings, get exclusive cashbacks, and enjoy seamless transactions across all travel services."
    },
    {
      id: 3,
      question: "How to update my email address?",
      answer: "Go to Account Settings → Personal Information → Edit Email. You'll receive a verification link on your new email address for security confirmation."
    },
    {
      id: 4,
      question: "Is my payment information secure?",
      answer: "Yes, we use 256-bit SSL encryption and are PCI DSS compliant. Your payment details are encrypted and never stored in plain text."
    },
    {
      id: 5,
      question: "What is the cancellation policy?",
      answer: "Cancellation policies vary by booking type. You can check the specific policy for your booking in the 'My Trips' section before proceeding with cancellation."
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer: "You can reach us 24/7 via phone, email, or live chat. Visit the Contact Us section for all available support options."
    }
  ];

  const contactOptions = [
    { id: 1, type: "Call Us", detail: "1800-123-4567", icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, type: "Email Us", detail: "support@migo.com", icon: Mail, color: "text-green-600", bg: "bg-green-50" },
    { id: 3, type: "Live Chat", detail: "Available 24/7", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
    { id: 4, type: "Help Center", detail: "Browse articles", icon: HelpCircle, color: "text-orange-600", bg: "bg-orange-50" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/50 mt-5">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
       
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
              <div className="relative px-6 py-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg">
                <span className="text-white font-semibold text-sm">Help Center</span>
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            How can we{' '}
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Here's a compilation of all the travel queries you may have. We're pretty sure the answer to your question will be here.
          </p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles, guides, or FAQs..."
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium"
              >
                Search
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Left Column - Help Topics */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-500" />
                Common Help Topics
              </h2>
            </motion.div>
            
            <motion.div variants={containerVariants} className="space-y-6">
              {helpTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  variants={itemVariants}
                  whileHover="hover"
                  variants={cardHoverVariants}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r opacity-0 group-hover:opacity-70 blur transition duration-500 rounded-2xl"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className={`p-4 rounded-xl bg-linear-to-r ${topic.color} shadow-lg`}>
                        <topic.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{topic.description}</p>
                        <p className="text-gray-500 text-sm mb-4">{topic.details}</p>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="text-blue-600 font-semibold flex items-center gap-2 group/btn"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Support Options */}
          <div>
            {/* Recent Booking Help */}
            <motion.div 
              variants={itemVariants}
              className="relative mb-8"
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-400 to-indigo-400 rounded-3xl blur opacity-20"></div>
              <div className="relative bg-linear-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl">
                    <Ticket className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Need help with your recent booking?</h2>
                </div>
                <p className="text-gray-600 mb-8">
                  Access your booking details and get assistance with modifications, cancellations, or other queries.
                </p>
                <div className="space-y-6">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Booking Reference Number"
                      className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Registered Email Address"
                      className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Track Booking
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Login Now Section */}
            <motion.div variants={itemVariants} className="relative mb-8">
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-indigo-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative text-center">
                  <div className="inline-block p-4 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg mb-6">
                    <a href="/login"><LogIn className="w-8 h-8 text-white" /></a>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Log in Now</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Access your account to manage bookings, view history, and get personalized support.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full max-w-md mx-auto py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                 <a href="/singup">
                                      <span className="flex items-center justify-center gap-2">
                      Sign In to Your Account
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                 </a>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Contact Options */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => option.type === "Live Chat" && setShowLiveChat(true)}
                    className={`p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl ${option.bg} flex items-center gap-4`}
                  >
                    <div className={`p-3 rounded-xl ${option.bg} bg-white shadow-sm`}>
                      <option.icon className={`w-6 h-6 ${option.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-800">{option.type}</div>
                      <div className="text-gray-600">{option.detail}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* About Migo */}
            <motion.div variants={itemVariants} className="bg-linear-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Migo?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Secure & Trusted</h4>
                    <p className="text-gray-600">Your security is our priority with enterprise-grade encryption</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-8 h-8 text-blue-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Global Coverage</h4>
                    <p className="text-gray-600">Access thousands of destinations worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Headphones className="w-8 h-8 text-purple-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">24/7 Support</h4>
                    <p className="text-gray-600">Always here to help you, anytime, anywhere</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <motion.button
                  onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex justify-between items-center"
                >
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
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
                      <div className="p-6 bg-gray-50/50 rounded-b-2xl border border-t-0 border-gray-100">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Chat Widget */}
        <AnimatePresence>
          {showLiveChat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">Live Chat Support</span>
                </div>
                <button onClick={() => setShowLiveChat(false)} className="text-white hover:text-gray-200">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 h-96 overflow-y-auto">
                <div className="text-center py-8">
                  <Headphones className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600">A support agent will be with you shortly.</p>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="fixed bottom-6 left-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2 group"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="hidden group-hover:inline ml-2 font-medium">Live Help</span>
        </motion.button>
      </main>

   
    </div>
  );
};

export default MigoHelpPage;