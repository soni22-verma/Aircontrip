import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  Mail, 
  Phone, 
  Globe, 
  Clock, 
  Star, 
  Users, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  TrendingUp, 
  Zap, 
  Heart, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  Filter, 
  X, 
  Home, 
  Calendar, 
  FileText, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Bookmark, 
  RefreshCw,
  Bell,
  Award,
  CheckCircle,
  AlertCircle,
  Download,
 
  Copy,
  Volume2,
  Mic,
  Eye,
  MessageSquare,
  Video
} from 'lucide-react';

const FAQItem = ({ question, answer, category, isOpen, onClick, helpfulCount = 0, index }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div 
      className={`relative bg-white rounded-2xl mb-6 overflow-hidden transition-all duration-500 ${
        isOpen ? 'shadow-xl ring-2 ring-blue-100 scale-[1.02]' : 'shadow-md hover:shadow-lg'
      }`}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 ${
        category === 'booking' ? 'bg-gradient-to-r from-blue-50/50 to-cyan-50/50' :
        category === 'cancellation' ? 'bg-gradient-to-r from-amber-50/50 to-orange-50/50' :
        category === 'host' ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/50' :
        'bg-gradient-to-r from-purple-50/50 to-pink-50/50'
      } opacity-0 ${isOpen ? 'opacity-100' : 'group-hover:opacity-50'} transition-opacity duration-500`}></div>
      
      <button
        className="relative w-full px-8 py-7 text-left flex justify-between items-center bg-white/80 hover:bg-white transition-all duration-300 group"
        onClick={onClick}
      >
        <div className="flex items-start space-x-6">
          {/* Number Badge */}
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl ${
            category === 'booking' ? 'bg-blue-100 text-blue-600' :
            category === 'cancellation' ? 'bg-amber-100 text-amber-600' :
            category === 'host' ? 'bg-green-100 text-green-600' :
            'bg-purple-100 text-purple-600'
          } group-hover:scale-110 transition-transform duration-300`}>
            {String(index + 1).padStart(2, '0')}
          </div>
          
          <div className="text-left">
            <div className="flex items-center space-x-3 mb-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                category === 'booking' ? 'bg-blue-100 text-blue-700' :
                category === 'cancellation' ? 'bg-amber-100 text-amber-700' :
                category === 'host' ? 'bg-green-100 text-green-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {category.toUpperCase()}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <ThumbsUp className="w-3 h-3 mr-1" />
                <span>{helpfulCount} found helpful</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {question}
            </h3>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="flex items-center text-xs text-gray-500 hover:text-blue-600">
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </button>
              <button className="flex items-center text-xs text-gray-500 hover:text-blue-600">
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </button>
              <button className="flex items-center text-xs text-gray-500 hover:text-blue-600">
                <Bookmark className="w-3 h-3 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated Chevron */}
        <div className={`flex-shrink-0 ml-4 ${
          isOpen ? 'animate-bounce-once' : ''
        }`}>
          <div className={`p-3 rounded-full ${
            isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          } group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300`}>
            {isOpen ? 
              <ChevronUp className="w-5 h-5" /> : 
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            }
          </div>
        </div>
      </button>
      
      {/* Answer Section */}
      <div className={`overflow-hidden transition-all duration-700 ease-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="relative px-8 pb-8 animate-fadeIn">
          {/* Decorative Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent"></div>
          
          <div className="ml-6">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-lg">{answer}</p>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-wrap items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300 group">
                    <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Helpful</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
                    <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Not Helpful</span>
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-300 group relative"
                  >
                    <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Copy Answer</span>
                    {showCopied && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-green-600 text-white rounded-lg text-xs animate-fadeInOut">
                        Copied!
                      </span>
                    )}
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-300 group">
                    <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Listen</span>
                  </button>
                </div>
                
                <button className="mt-3 sm:mt-0 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Full Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQCategorySection = ({ title, description, faqs, category, icon }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mb-16 animate-fadeIn">
      <div className="flex items-start justify-between mb-10">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className={`p-3 rounded-xl ${
              category === 'booking' ? 'bg-blue-100 text-blue-600' :
              category === 'cancellation' ? 'bg-amber-100 text-amber-600' :
              category === 'host' ? 'bg-green-100 text-green-600' :
              'bg-purple-100 text-purple-600'
            }`}>
              {icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-2 max-w-3xl">{description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold">
            {faqs.length} questions
          </span>
          <button className="p-2 text-gray-400 hover:text-blue-600">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            index={index}
            question={faq.question}
            answer={faq.answer}
            category={category}
            isOpen={openIndex === index}
            onClick={() => toggleFAQ(index)}
            helpfulCount={faq.helpfulCount || Math.floor(Math.random() * 100) + 50}
          />
        ))}
      </div>
    </div>
  );
};

const FAQSearch = ({ onSearch, resultsCount = 0, totalQuestions = 0 }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showVoice, setShowVoice] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleVoiceSearch = () => {
    setShowVoice(true);
 
    setTimeout(() => setShowVoice(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto mb-16">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-slideUp">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-xl animate-pulse-slow">
          <HelpCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          How can we help?
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find instant answers, expert guides, and personalized support for all your travel needs
        </p>
      </div>

      {/* Advanced Search */}
      <div className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
        
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-2 border border-gray-200/50">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <Search className={`w-6 h-6 transition-all duration-300 ${
                    isFocused ? 'text-blue-600 scale-110' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ask any question about bookings, payments, hosting..."
                  className="w-full pl-14 pr-32 py-6 text-lg rounded-xl border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-400"
                />
                
                {/* Voice Search Button */}
                <button 
                  onClick={handleVoiceSearch}
                  className="absolute right-32 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                {/* Clear Button */}
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      onSearch('');
                    }}
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            <button className="ml-4 px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
              Search
            </button>
          </div>
        </div>

        {/* Voice Search Indicator */}
        {showVoice && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-4 animate-pulse">
            <div className="flex items-center justify-center">
              <Mic className="w-6 h-6 mr-3 animate-pulse" />
              <span>Listening... Speak your question</span>
            </div>
          </div>
        )}

        {/* Search Stats */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="font-medium">{totalQuestions} Expert Answers</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Updated Daily</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center space-x-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium">Verified Answers</span>
          </div>
        </div>

        {/* Search Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="text-gray-500 font-medium flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending searches:
          </span>
          {['Booking modification', 'Cancellation policy', 'Host verification', 'Refund timeline', 'Payment security'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                onSearch(term);
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <span className="relative px-4 py-2 bg-white text-gray-700 rounded-full hover:text-blue-600 hover:shadow-md transition-all duration-300 group-hover:bg-white">
                {term}
              </span>
            </button>
          ))}
        </div>

        {/* Search Results Counter */}
        {query && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full">
              <span className="text-gray-700">
                Found <span className="font-bold text-blue-600">{resultsCount}</span> results for "
                <span className="font-bold text-gray-900">{query}</span>"
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Floating particles effect
  useEffect(() => {
    const particles = [];
    const container = document.createElement('div');
    container.className = 'fixed inset-0 pointer-events-none';
    document.body.appendChild(container);

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      particle.style.width = `${Math.random() * 100 + 50}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.background = `radial-gradient(circle, ${['#60A5FA10', '#34D39910', '#FBBF2410', '#A78BFA10'][i % 4]}, transparent)`;
      particle.style.animation = `float ${Math.random() * 20 + 20}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
      container.remove();
    };
  }, []);

  const categories = [
    { 
      id: 'all', 
      label: 'All Questions', 
      icon: <Globe className="w-6 h-6" />, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Browse all frequently asked questions'
    },
    { 
      id: 'booking', 
      label: 'Booking', 
      icon: <Calendar className="w-6 h-6" />, 
      color: 'from-blue-600 to-indigo-600',
      description: 'Making and managing bookings'
    },
    { 
      id: 'cancellation', 
      label: 'Cancellations', 
      icon: <RefreshCw className="w-6 h-6" />, 
      color: 'from-amber-500 to-orange-500',
      description: 'Cancellation policies and refunds'
    },
    { 
      id: 'host', 
      label: 'Hosting', 
      icon: <Home className="w-6 h-6" />, 
      color: 'from-green-500 to-emerald-500',
      description: 'Host guides and management'
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: <MessageCircle className="w-6 h-6" />, 
      color: 'from-purple-500 to-pink-500',
      description: 'Contact and support options'
    }
  ];

  const faqData = {
    booking: [
      {
        question: "How do I make a booking on AirContrip?",
        answer: "Making a booking is simple! Search for your destination, select travel dates, browse available properties, choose your preferred option, and proceed with secure payment. You'll receive instant confirmation with all details.",
        helpfulCount: 125
      },
      {
        question: "Can I modify my booking after confirmation?",
        answer: "Yes, most bookings can be modified up to 48 hours before check-in. Log into your account, go to 'My Trips', select the booking, and click 'Modify'. Changes are subject to availability and host approval.",
        helpfulCount: 89
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit/debit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, Google Pay, and various local payment options depending on your region. All payments are secured with 256-bit SSL encryption.",
        helpfulCount: 156
      },
      {
        question: "How do I find the best deals and discounts?",
        answer: "Use our 'Deals' filter, sign up for price alerts, book during off-peak seasons, and consider flexible dates. Our algorithm also highlights properties with special offers and last-minute discounts.",
        helpfulCount: 203
      },
      {
        question: "What information do I need to provide when booking?",
        answer: "For most bookings, you'll need your contact information, payment details, and the names of all guests. For international travel, you may need passport information and visa details.",
        helpfulCount: 78
      }
    ],
    cancellation: [
      {
        question: "What is the cancellation policy?",
        answer: "Cancellation policies vary by property and are clearly displayed before booking. Most hosts offer flexible (free cancellation up to 24 hours before), moderate (free up to 5 days), or strict (50% refund) options.",
        helpfulCount: 142
      },
      {
        question: "How long does it take to receive a refund?",
        answer: "Refunds are processed within 24 hours of cancellation. The time it takes to appear in your account depends on your payment method: 3-5 business days for cards, instant for PayPal, and up to 10 days for bank transfers.",
        helpfulCount: 95
      },
      {
        question: "Can I cancel for free due to emergencies?",
        answer: "Yes, under our Extenuating Circumstances Policy. This covers medical emergencies, natural disasters, and government travel restrictions. Contact our support team with proper documentation within 14 days.",
        helpfulCount: 78
      },
      {
        question: "What if my host cancels my booking?",
        answer: "If a host cancels, you'll receive a full refund and we'll help you find a similar or better property. In urgent cases, we provide complimentary rebooking assistance and may offer travel credits.",
        helpfulCount: 54
      }
    ],
    host: [
      {
        question: "How do I become a host?",
        answer: "Sign up, create your listing with high-quality photos and detailed descriptions, set competitive pricing, configure availability, and complete verification. Our onboarding team provides personalized guidance throughout.",
        helpfulCount: 231
      },
      {
        question: "How and when do I get paid?",
        answer: "Payments are automatically transferred 24 hours after guest check-in. Choose from multiple payout methods including bank transfer, PayPal, or direct deposit. You can track all earnings in your host dashboard.",
        helpfulCount: 167
      },
      {
        question: "What are the hosting requirements?",
        answer: "Requirements include: verified identity, accurate property details, professional photos, responsive communication, maintaining 4-star+ cleanliness, compliance with local laws, and hosting insurance coverage.",
        helpfulCount: 112
      },
      {
        question: "How does the review system work for hosts?",
        answer: "After checkout, both parties have 14 days to submit reviews. Reviews are posted simultaneously once both are submitted or after the period ends. We moderate reviews to ensure authenticity and compliance.",
        helpfulCount: 89
      },
      {
        question: "What support is available for hosts?",
        answer: "24/7 host support, marketing tools, pricing optimization suggestions, legal guidance, and access to our host community. Premium hosts get dedicated account managers.",
        helpfulCount: 67
      }
    ],
    support: [
      {
        question: "How do I contact customer support?",
        answer: "Reach us 24/7 via: Live Chat (in app/website), email at support@aircontrip.com, phone at +1-800-TRAVEL, or Twitter @AirContripHelp. Average response time is under 2 minutes for chat.",
        helpfulCount: 156
      },
      {
        question: "What information should I have ready when contacting support?",
        answer: "For faster assistance, have your booking ID, registered email, property name, dates of stay, and any relevant screenshots ready. This helps us resolve issues more efficiently.",
        helpfulCount: 67
      },
      {
        question: "Do you offer multi-language support?",
        answer: "Yes! Our support team covers 15+ languages including English, Spanish, French, German, Japanese, Korean, Mandarin, Arabic, and Portuguese. Language preferences can be set in your account.",
        helpfulCount: 94
      },
      {
        question: "What are your support hours and response times?",
        answer: "We provide 24/7/365 support for urgent matters. Premium support members get priority assistance. Non-urgent inquiries receive responses within 4 hours during business hours.",
        helpfulCount: 58
      }
    ]
  };

  const filterFAQs = () => {
    let filtered = [];
    
    if (activeCategory === 'all') {
      Object.values(faqData).forEach(category => {
        filtered = [...filtered, ...category];
      });
    } else {
      filtered = faqData[activeCategory] || [];
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredFAQs = filterFAQs();
  const totalQuestions = Object.values(faqData).reduce((acc, category) => acc + category.length, 0);
  const activeCategoryData = categories.find(c => c.id === activeCategory);

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      alert('Thank you for your feedback!');
      setFeedback('');
      setShowFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-blue-50/30">
   

      <main className="container mx-auto px-6 py-12 max-w-7xl mt-19">
        {/* Search Section */}
        <FAQSearch 
          onSearch={setSearchQuery} 
          resultsCount={filteredFAQs.length}
          totalQuestions={totalQuestions}
        />

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative overflow-hidden rounded-xl transition-all duration-500 ${
                activeCategory === category.id ? 'scale-105 shadow-xl' : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className={`absolute inset-0 bg-linear-to-r ${category.color} ${
                activeCategory === category.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } transition-opacity duration-300`}></div>
              
              <div className={`relative flex items-center px-6 py-4 rounded-xl border ${
                activeCategory === category.id 
                  ? 'border-transparent text-white' 
                  : 'border-gray-200 bg-white text-gray-700 group-hover:text-white'
              }`}>
                <div className={`p-2 rounded-lg mr-3 ${
                  activeCategory === category.id 
                    ? 'bg-white/20' 
                    : `bg-linear-to-r ${category.color.replace('500', '100').replace('600', '200')}`
                }`}>
                  <div className={
                    activeCategory === category.id ? 'text-white' : 
                    category.color.includes('blue') ? 'text-blue-600' :
                    category.color.includes('green') ? 'text-green-600' :
                    category.color.includes('amber') ? 'text-amber-600' :
                    'text-purple-600'
                  }>
                    {category.icon}
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-bold">{category.label}</div>
                  <div className={`text-xs ${
                    activeCategory === category.id ? 'text-white/80' : 'text-gray-500 group-hover:text-white/80'
                  }`}>
                    {category.description}
                  </div>
                </div>
                <div className={`ml-4 px-2 py-1 rounded-full text-xs font-bold ${
                  activeCategory === category.id ? 'bg-white/30' : 'bg-gray-100 group-hover:bg-white/30'
                }`}>
                  {category.id === 'all' ? totalQuestions : faqData[category.id]?.length || 0}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* FAQ Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main FAQ Area */}
          <div className="lg:col-span-2">
            {activeCategory === 'all' ? (
              <>
                <FAQCategorySection 
                  title="Booking Questions"
                  description="Everything about making, modifying, and managing your bookings"
                  faqs={faqData.booking}
                  category="booking"
                  icon={<Calendar className="w-6 h-6" />}
                />
                <FAQCategorySection 
                  title="Cancellation & Refunds"
                  description="Understanding policies, refunds, and emergency cancellations"
                  faqs={faqData.cancellation}
                  category="cancellation"
                  icon={<RefreshCw className="w-6 h-6" />}
                />
                <FAQCategorySection 
                  title="Hosting Questions"
                  description="For current and aspiring hosts - manage your properties effectively"
                  faqs={faqData.host}
                  category="host"
                  icon={<Home className="w-6 h-6" />}
                />
              </>
            ) : (
              <FAQCategorySection 
                title={`${activeCategoryData?.label} Questions`}
                description={activeCategoryData?.description}
                faqs={filteredFAQs}
                category={activeCategory}
                icon={activeCategoryData?.icon}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Premium Support Card */}
            <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl mr-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-sm font-bold text-yellow-400">PREMIUM SUPPORT</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Priority Assistance</h3>
                    <p className="text-white/80 mb-6">Get instant access to our premium support team</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-white/90">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Dedicated support agent</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>15-minute response guarantee</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Phone callback within 5 minutes</span>
                  </div>
                </div>
                <button className="w-full mt-8 py-3.5 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Upgrade to Premium
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                Help Center Stats
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Questions Answered", value: "15,324", change: "+12%", color: "text-green-600" },
                  { label: "Average Rating", value: "4.8/5", change: "+0.2", color: "text-amber-600" },
                  { label: "Resolution Rate", value: "99.2%", change: "+1.5%", color: "text-blue-600" },
                  { label: "Response Time", value: "1.8 min", change: "-0.5 min", color: "text-purple-600" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <div className="font-medium text-gray-700">{stat.label}</div>
                      <div className={`text-sm ${stat.color}`}>{stat.change} this month</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Support Status */}
            <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Live Support Status</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping mr-2"></div>
                  <span className="text-sm font-medium text-green-700">Online Now</span>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-shadow duration-300 group">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Live Chat</div>
                      <div className="text-sm text-gray-500">2 min wait time</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-shadow duration-300 group">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Phone Call</div>
                      <div className="text-sm text-gray-500">5 min callback</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-shadow duration-300 group">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <Video className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Video Call</div>
                      <div className="text-sm text-gray-500">Schedule meeting</div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                </button>
              </div>
            </div>

            {/* Feedback Widget */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Help Us Improve</h3>
              <p className="text-gray-600 mb-4">Was this page helpful?</p>
              <div className="flex space-x-3 mb-4">
                <button className="flex-1 py-2.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium">
                  Yes, very helpful
                </button>
                <button 
                  onClick={() => setShowFeedback(true)}
                  className="flex-1 py-2.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                >
                  Could be better
                </button>
              </div>
              {showFeedback && (
                <div className="animate-fadeIn">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What can we improve?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                    rows="3"
                  />
                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={() => setShowFeedback(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmitFeedback}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="mt-20 bg-linear-to-r from-blue-50 via-white to-cyan-50 rounded-3xl p-12 border border-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="relative">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-linear-to-r from-blue-600 to-cyan-600 rounded-xl mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Expert Help Instantly</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied travelers who get personalized support from our expert team
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-10 h-10" />,
                  title: "Priority Support",
                  description: "Skip the queue with dedicated support agents",
                  features: ["15-min response time", "Direct phone line", "24/7 availability"]
                },
                {
                  icon: <Users className="w-10 h-10" />,
                  title: "Community Access",
                  description: "Connect with experienced travelers and hosts",
                  features: ["Exclusive forums", "Expert Q&A sessions", "Local insights"]
                },
                {
                  icon: <FileText className="w-10 h-10" />,
                  title: "Premium Resources",
                  description: "Access to exclusive guides and tools",
                  features: ["Travel planning tools", "Legal templates", "Market analysis"]
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex p-3 bg-linear-to-r from-blue-100 to-cyan-100 rounded-xl mb-6">
                    <div className="text-blue-600">{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((f, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <button className="px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Explore Premium Features
              </button>
            </div>
          </div>
        </div>
      </main>

    
      

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -40px) rotate(10deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-bounce-once {
          animation: bounce-once 0.5s ease-in-out;
        }
        
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;