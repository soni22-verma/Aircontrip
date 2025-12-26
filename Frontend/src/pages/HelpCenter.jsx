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
  Sparkles
} from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    issue: '',
    message: ''
  });

  const categories = [
    { id: 'booking', title: 'Booking Help', icon: <Calendar size={22} />, count: 24, color: 'bg-blue-50 text-blue-600' },
    { id: 'payments', title: 'Payments', icon: <CreditCard size={22} />, count: 18, color: 'bg-green-50 text-green-600' },
    { id: 'account', title: 'Account', icon: <User size={22} />, count: 15, color: 'bg-purple-50 text-purple-600' },
    { id: 'safety', title: 'Safety', icon: <Shield size={22} />, count: 12, color: 'bg-red-50 text-red-600' },
    { id: 'hosting', title: 'Hosting', icon: <Home size={22} />, count: 32, color: 'bg-amber-50 text-amber-600' },
    { id: 'travel', title: 'Travel Info', icon: <Globe size={22} />, count: 21, color: 'bg-cyan-50 text-cyan-600' },
    { id: 'cancellation', title: 'Cancellations', icon: <FileText size={22} />, count: 16, color: 'bg-pink-50 text-pink-600' },
    { id: 'reviews', title: 'Reviews', icon: <Star size={22} />, count: 9, color: 'bg-indigo-50 text-indigo-600' },
  ];

  const popularArticles = [
    { 
      id: 1, 
      title: 'How to modify or cancel a booking', 
      category: 'booking', 
      views: '12.4k', 
      rating: 4.8,
      readTime: '3 min read'
    },
    { 
      id: 2, 
      title: 'Payment methods we accept', 
      category: 'payments', 
      views: '8.7k', 
      rating: 4.5,
      readTime: '2 min read'
    },
    { 
      id: 3, 
      title: 'Understanding security deposits', 
      category: 'safety', 
      views: '6.2k', 
      rating: 4.7,
      readTime: '4 min read'
    },
    { 
      id: 4, 
      title: 'How to become a host', 
      category: 'hosting', 
      views: '15.3k', 
      rating: 4.9,
      readTime: '5 min read'
    },
    { 
      id: 5, 
      title: 'COVID-19 travel updates', 
      category: 'travel', 
      views: '22.1k', 
      rating: 4.6,
      readTime: '2 min read'
    },
    { 
      id: 6, 
      title: 'Verifying your account', 
      category: 'account', 
      views: '5.8k', 
      rating: 4.4,
      readTime: '3 min read'
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I change my reservation dates?',
      answer: 'You can modify your reservation dates by going to "My Trips" in your account, selecting the reservation you want to change, and clicking "Change Dates". Changes are subject to the host\'s approval and may affect the total price.',
      category: 'booking',
      helpful: 234
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards (Visa, MasterCard, American Express, Discover), debit cards, PayPal, and in some regions, local payment methods. All payments are processed securely through our encrypted payment system.',
      category: 'payments',
      helpful: 189
    },
    {
      id: 3,
      question: 'How do I become a verified host?',
      answer: 'To become a verified host, complete your profile, add a government-issued ID, set up your payout method, and verify your phone number and email. Our team will review your submission within 24-48 hours.',
      category: 'hosting',
      helpful: 312
    },
    {
      id: 4,
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by property. You can check the specific policy for each listing before booking. Generally, we offer flexible, moderate, and strict policies with different refund percentages based on when you cancel.',
      category: 'cancellation',
      helpful: 276
    },
    {
      id: 5,
      question: 'How are reviews handled?',
      answer: 'Both guests and hosts have 14 days after checkout to write a review. Reviews are posted simultaneously after both parties have submitted or the 14-day period ends. We moderate reviews to ensure they meet our community guidelines.',
      category: 'reviews',
      helpful: 154
    },
  ];

  const contactOptions = [
    { 
      id: 'call', 
      title: 'Call Support', 
      description: 'Available 24/7', 
      icon: <Phone size={24} />, 
      value: '+1 (800) 123-4567', 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500' 
    },
    { 
      id: 'chat', 
      title: 'Live Chat', 
      description: 'Instant response', 
      icon: <MessageSquare size={24} />, 
      value: 'Start Chat', 
      color: 'bg-gradient-to-r from-green-500 to-emerald-500' 
    },
    { 
      id: 'email', 
      title: 'Email Us', 
      description: 'Reply within 2 hours', 
      icon: <Mail size={24} />, 
      value: 'support@aircontrip.com', 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500' 
    },
  ];

  const featuredGuides = [
    { 
      id: 1, 
      title: 'Travel Safety Guide', 
      icon: <Shield size={20} />, 
      time: '10 min read', 
      type: 'guide',
      category: 'safety'
    },
    { 
      id: 2, 
      title: 'Hosting Best Practices', 
      icon: <Home size={20} />, 
      time: '15 min read', 
      type: 'guide',
      category: 'hosting'
    },
    { 
      id: 3, 
      title: 'Payment Security', 
      icon: <CreditCard size={20} />, 
      time: '8 min read', 
      type: 'video',
      category: 'payments'
    },
    { 
      id: 4, 
      title: 'Travel Checklist', 
      icon: <BookOpen size={20} />, 
      time: '5 min read', 
      type: 'checklist',
      category: 'travel'
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactFormData);
    // Implement form submission
    setShowContactForm(false);
    setContactFormData({ name: '', email: '', issue: '', message: '' });
  };

  const renderArticleContent = () => {
    if (!selectedArticle) return null;

    const article = popularArticles.find(a => a.id === selectedArticle);
    
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-white border-b p-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {article.category.toUpperCase()}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye size={16} className="mr-1" />
                    {article.views} views
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mt-2">{article.title}</h2>
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
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Summary</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    Step-by-step instructions with screenshots
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    Common issues and their solutions
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    Best practices and expert tips
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Instructions</h3>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Pro Tip</h4>
                <p className="text-gray-600">
                  For the best experience, make sure to complete all required steps in order and double-check your information before submitting.
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <ThumbsUp size={20} />
                    <span>Helpful ({Math.floor(Math.random() * 100)})</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <ThumbsDown size={20} />
                    <span>Not Helpful ({Math.floor(Math.random() * 20)})</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-50">
                  <Bookmark size={20} />
                  <span>Save Article</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-800">AirContrip</span>
                <span className="text-gray-500">Help Center</span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">For Hosts</a>
              <button className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-white to-gray-50 border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4">
              How can we help you?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find answers to your questions about bookings, payments, hosting, and more
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles, FAQs, or topics..."
                  className="w-full pl-12 pr-4 py-4 text-base bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Search
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="text-gray-500 text-sm">Popular:</span>
                {['cancellation', 'refund', 'booking modification', 'payment', 'host verification'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Categories Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Browse by category</h2>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center">
              View all categories
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-5 rounded-xl transition-all duration-200 text-left hover:shadow-md ${
                  activeCategory === category.id
                    ? 'bg-white border-2 border-blue-500 shadow-sm'
                    : 'bg-white border border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`inline-flex p-2 rounded-lg ${category.color} mb-3`}>
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-800 mb-1">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.count} articles</p>
              </button>
            ))}
          </div>
        </section>

        {/* Popular Articles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Popular articles</h2>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center">
              View all articles
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article) => (
              <div
                key={article.id}
                className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedArticle(article.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {article.views}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center">
                        <Star size={14} className="mr-1 text-amber-500" />
                        {article.rating}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 ml-3 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - FAQ & Guides */}
          <div className="lg:col-span-2">
            {/* FAQ Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently asked questions</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            {faq.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {faq.helpful} found helpful
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-800">{faq.question}</h3>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                          expandedFaq === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-5 pb-5 border-t pt-4">
                        <p className="text-gray-600 mb-4">{faq.answer}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            <ThumbsUp size={16} className="mr-1" />
                            Helpful
                          </button>
                          <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            <ThumbsDown size={16} className="mr-1" />
                            Not helpful
                          </button>
                          <button className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors">
                            <ExternalLink size={16} className="mr-1" />
                            Read more
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Guides */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Guides & resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredGuides.map((guide) => (
                  <div key={guide.id} className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 rounded-lg ${
                        guide.category === 'safety' ? 'bg-red-50 text-red-600' :
                        guide.category === 'hosting' ? 'bg-amber-50 text-amber-600' :
                        guide.category === 'payments' ? 'bg-green-50 text-green-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {guide.icon}
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {guide.type}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {guide.time}
                      </span>
                      {guide.type === 'video' && (
                        <button className="flex items-center text-blue-600 text-sm font-medium">
                          <Video size={16} className="mr-1" />
                          Watch
                        </button>
                      )}
                      {guide.type === 'guide' && (
                        <button className="flex items-center text-blue-600 text-sm font-medium">
                          <BookOpen size={16} className="mr-1" />
                          Read
                        </button>
                      )}
                      {guide.type === 'checklist' && (
                        <button className="flex items-center text-blue-600 text-sm font-medium">
                          <Download size={16} className="mr-1" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Contact & Resources */}
          <div className="lg:col-span-1">
            {/* Contact Options */}
            <div className="sticky top-24 space-y-6">
              <section>
                <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Still need help?</h3>
                  <div className="space-y-4">
                    {contactOptions.map((option) => (
                      <div key={option.id} className="group cursor-pointer">
                        <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`p-3 rounded-lg ${option.color} text-white`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{option.title}</h4>
                            <p className="text-sm text-gray-500">{option.description}</p>
                          </div>
                        </div>
                        <div className="mt-1 ml-16">
                          <span className="text-sm font-medium text-gray-700">{option.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full mt-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Submit a request
                  </button>
                </div>
              </section>

              {/* Quick Resources */}
              <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick resources</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Community guidelines', icon: <Users size={18} /> },
                    { title: 'Travel advisories', icon: <Globe size={18} /> },
                    { title: 'Host resources', icon: <Home size={18} /> },
                    { title: 'COVID-19 updates', icon: <AlertCircle size={18} /> },
                    { title: 'Legal documents', icon: <FileText size={18} /> },
                  ].map((resource, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-gray-100 rounded group-hover:bg-gray-200">
                          <div className="text-gray-600">{resource.icon}</div>
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900">{resource.title}</span>
                      </div>
                      <ExternalLink size={16} className="text-gray-400 group-hover:text-gray-600" />
                    </a>
                  ))}
                </div>
              </section>

              {/* Status Updates */}
              <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">System status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-700">All systems operational</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Booking system</span>
                      <span className="text-green-600 text-sm font-medium">● Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Payment processing</span>
                      <span className="text-green-600 text-sm font-medium">● Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Messaging</span>
                      <span className="text-green-600 text-sm font-medium">● Operational</span>
                    </div>
                  </div>
                  <a href="#" className="block text-center text-gray-600 hover:text-gray-900 text-sm">
                    View incident history →
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Contact support</h3>
                  <p className="text-gray-600 text-sm mt-1">We'll get back to you within 2 hours</p>
                </div>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleContactSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({...contactFormData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="mb-5">
                <label className="block text-gray-700 text-sm font-medium mb-2">Issue type *</label>
                <select
                  required
                  value={contactFormData.issue}
                  onChange={(e) => setContactFormData({...contactFormData, issue: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                <label className="block text-gray-700 text-sm font-medium mb-2">Message *</label>
                <textarea
                  required
                  value={contactFormData.message}
                  onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Describe your issue in detail..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
                >
                  Submit request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {renderArticleContent()}
    </div>
  );
};

export default HelpCenter;