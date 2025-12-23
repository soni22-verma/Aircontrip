import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  User,
  Globe,
  Cookie,
  ChevronRight,
  Building,
  BarChart3,
  Database,
  Key,
  Server,
  Cpu,
  Network,
  HelpCircle,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  Download,
  Trash2,
  Edit3,
  Clock,
  Calendar,
  FileText,
  Mail,
  Smartphone,
  Users,
  Award,
  Shield,
  Bell,
  RefreshCw,
  ExternalLink,
  Zap,
  FileCheck,
  BookOpen,
  MessageSquare,
  ShieldAlert,
  ShieldOff,
  TrendingUp,
  PieChart,
  Target,
  Headphones,
  CreditCard,
  MapPin,
  Cloud,
  Globe as GlobeIcon,
  Heart,
  Star,
  ThumbsUp,
  Share2,
  Printer,
  Bookmark,
  Filter,
  Search,
  X,
  Menu,
  Info
} from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("data-collection");
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = ['overview', 'collection', 'usage', 'security', 'cookies', 'rights', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const sections = [
    { id: "overview", title: "Overview", icon: <Info size={18} /> },
    { id: "collection", title: "Data Collection", icon: <Database size={18} /> },
    { id: "usage", title: "Data Usage", icon: <BarChart3 size={18} /> },
    { id: "security", title: "Security", icon: <ShieldCheck size={18} /> },
    { id: "cookies", title: "Cookies", icon: <Cookie size={18} /> },
    { id: "rights", title: "Your Rights", icon: <Key size={18} /> },
    { id: "contact", title: "Contact Us", icon: <Headphones size={18} /> },
  ];

  const dataCategories = [
    {
      title: "Personal Information",
      icon: <User />,
      color: "bg-blue-50 text-blue-600",
      items: ["Full name and contact details", "Date of birth", "Government ID for verification", "Profile picture and preferences"]
    },
    {
      title: "Travel Information",
      icon: <GlobeIcon />,
      color: "bg-green-50 text-green-600",
      items: ["Booking history", "Travel preferences", "Destinations visited", "Trip reviews and ratings"]
    },
    {
      title: "Payment Details",
      icon: <CreditCard />,
      color: "bg-purple-50 text-purple-600",
      items: ["Payment method details", "Billing address", "Transaction history", "Refund requests"]
    },
    {
      title: "Technical Data",
      icon: <Cpu />,
      color: "bg-amber-50 text-amber-600",
      items: ["IP address and device info", "Browser type and version", "App usage analytics", "Location data (with consent)"]
    }
  ];

  const securityFeatures = [
    { 
      title: "Encryption", 
      description: "End-to-end AES-256 encryption for all sensitive data",
      icon: <Lock />,
      status: "Active"
    },
    { 
      title: "Multi-Factor Authentication", 
      description: "Enhanced login security with MFA options",
      icon: <Shield />,
      status: "Optional"
    },
    { 
      title: "Regular Audits", 
      description: "Quarterly security audits by independent experts",
      icon: <FileCheck />,
      status: "Ongoing"
    },
    { 
      title: "DDoS Protection", 
      description: "Advanced protection against distributed attacks",
      icon: <Network />,
      status: "Active 24/7"
    }
  ];

  const complianceBadges = [
    { name: "GDPR", region: "EU", status: "Compliant", color: "bg-blue-100 text-blue-800" },
    { name: "CCPA", region: "California", status: "Compliant", color: "bg-green-100 text-green-800" },
    { name: "ISO 27001", region: "Global", status: "Certified", color: "bg-purple-100 text-purple-800" },
    { name: "SOC 2", region: "Global", status: "Type II", color: "bg-amber-100 text-amber-800" }
  ];

  const userRights = [
    { 
      right: "Right to Access", 
      description: "Request a copy of your personal data",
      icon: <Eye />,
      action: "Request Data"
    },
    { 
      right: "Right to Rectification", 
      description: "Correct inaccurate or incomplete information",
      icon: <Edit3 />,
      action: "Update Info"
    },
    { 
      right: "Right to Erasure", 
      description: "Request deletion of your personal data",
      icon: <Trash2 />,
      action: "Delete Data"
    },
    { 
      right: "Right to Portability", 
      description: "Receive your data in machine-readable format",
      icon: <Download />,
      action: "Export Data"
    }
  ];

  const handleAcceptCookies = () => {
    setShowCookieBanner(false);
    alert("Cookie preferences saved!");
  };

  const handleCookieSettings = () => {
    alert("Opening cookie settings...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg animate-slideUp">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <Cookie className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <p className="text-gray-800 font-medium">We use cookies to enhance your experience</p>
                  <p className="text-gray-600 text-sm">By continuing to browse, you agree to our use of cookies. <a href="#" className="text-blue-600 hover:underline">Learn more</a></p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleCookieSettings}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Settings
                </button>
                <button 
                  onClick={handleAcceptCookies}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AirContrip</h1>
                <p className="text-xs text-gray-500">Privacy Center</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 animate-fadeIn">
              <div className="space-y-1 py-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center space-x-3 ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-6">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your privacy is our priority. Learn how we protect your data and give you control over your personal information.
          </p>
          
          {/* Last Updated */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-8">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Last updated: December 15, 2024</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { value: "256-bit", label: "Encryption", icon: <Lock className="h-5 w-5" /> },
              { value: "99.9%", label: "Uptime", icon: <Zap className="h-5 w-5" /> },
              { value: "24/7", label: "Monitoring", icon: <Eye className="h-5 w-5" /> },
              { value: "Zero", label: "Breaches", icon: <Shield className="h-5 w-5" /> },
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Read Full Policy</span>
              </div>
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <div className="flex items-center justify-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-md ${
                        activeSection === section.id ? "bg-white" : "bg-gray-100"
                      }`}>
                        {section.icon}
                      </div>
                      <span className="font-medium">{section.title}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      activeSection === section.id ? "rotate-90" : ""
                    }`} />
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  <Printer className="h-4 w-4" />
                  <span>Print Policy</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  <Bookmark className="h-4 w-4" />
                  <span>Bookmark Page</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-16">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Info className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Privacy Overview</h2>
                    <p className="text-gray-600 mt-2">Understanding our commitment to your privacy</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    At AirContrip, we believe in transparent privacy practices. This policy explains how we collect, 
                    use, and protect your personal information when you use our services. We're committed to 
                    maintaining the trust and confidence of our users.
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Principles</h3>
                    <ul className="space-y-3">
                      {[
                        "We only collect data necessary for providing our services",
                        "You have full control over your personal information",
                        "We use industry-leading security measures to protect your data",
                        "We never sell your personal data to third parties",
                        "Transparency in all our data practices"
                      ].map((principle, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Collection Section */}
            <section id="collection" className="scroll-mt-24">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Database className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Data Collection</h2>
                    <p className="text-gray-600 mt-2">What information we collect and why</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {dataCategories.map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors group">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-3 rounded-lg ${category.color}`}>
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Data Minimization</h4>
                      <p className="text-gray-600">
                        We follow the principle of data minimization, collecting only what's necessary 
                        for providing our services and improving your experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Usage Section */}
            <section id="usage" className="scroll-mt-24">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">How We Use Your Data</h2>
                    <p className="text-gray-600 mt-2">Purpose-driven data utilization</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: "🚀",
                      title: "Service Delivery",
                      description: "Process bookings, manage reservations, and provide customer support"
                    },
                    {
                      icon: "🎯",
                      title: "Personalization",
                      description: "Tailor recommendations and offers based on your preferences"
                    },
                    {
                      icon: "🛡️",
                      title: "Security",
                      description: "Prevent fraud and protect your account from unauthorized access"
                    },
                    {
                      icon: "📈",
                      title: "Analytics",
                      description: "Improve our services and user experience"
                    },
                    {
                      icon: "📱",
                      title: "Communication",
                      description: "Send important updates and notifications"
                    },
                    {
                      icon: "⚖️",
                      title: "Compliance",
                      description: "Meet legal obligations and regulatory requirements"
                    }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section id="security" className="scroll-mt-24">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-white rounded-xl">
                    <ShieldCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Security Measures</h2>
                    <p className="text-gray-600 mt-2">Protecting your data with enterprise-grade security</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            {feature.icon}
                          </div>
                          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Compliance Badges */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance & Certifications</h3>
                  <div className="flex flex-wrap gap-3">
                    {complianceBadges.map((badge, index) => (
                      <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
                        <Award className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">{badge.name}</div>
                          <div className="text-xs text-gray-500">{badge.region} • {badge.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Timeline */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Security Timeline</h3>
                  <div className="space-y-4">
                    {[
                      { month: "Jan 2024", event: "Security audit completed" },
                      { month: "Mar 2024", event: "GDPR compliance update" },
                      { month: "Jun 2024", event: "ISO 27001 certification renewed" },
                      { month: "Sep 2024", event: "Multi-factor authentication rollout" },
                      { month: "Dec 2024", event: "Annual security review" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.event}</div>
                          <div className="text-sm text-gray-500">{item.month}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies Section */}
            <section id="cookies" className="scroll-mt-24">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <Cookie className="h-8 w-8 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Cookies & Tracking</h2>
                    <p className="text-gray-600 mt-2">How we use cookies and similar technologies</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <p className="text-gray-700">
                      We use cookies and similar tracking technologies to enhance your browsing experience, 
                      analyze website traffic, and understand where our visitors are coming from.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { 
                        type: "Essential", 
                        description: "Required for core functionality", 
                        examples: ["Session management", "Security features"] 
                      },
                      { 
                        type: "Analytics", 
                        description: "Help us improve our services", 
                        examples: ["Usage statistics", "Performance metrics"] 
                      },
                      { 
                        type: "Marketing", 
                        description: "Show relevant advertisements", 
                        examples: ["Ad targeting", "Campaign tracking"] 
                      },
                    ].map((cookie, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-amber-300 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">{cookie.type}</h3>
                          <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {cookie.description}
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {cookie.examples.map((example, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights Section */}
            <section id="rights" className="scroll-mt-24">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Key className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Your Data Rights</h2>
                    <p className="text-gray-600 mt-2">You have full control over your personal information</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {userRights.map((right, index) => (
                    <div key={index} className="flex items-start justify-between p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-colors group">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-white rounded-xl text-green-600 group-hover:bg-green-50 transition-colors">
                          {right.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{right.right}</h3>
                          <p className="text-gray-600">{right.description}</p>
                        </div>
                      </div>
                      <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap">
                        {right.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="scroll-mt-24">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-white rounded-xl">
                    <Headphones className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Contact Our Privacy Team</h2>
                    <p className="text-gray-600 mt-2">Have questions? We're here to help</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-700 mb-6">
                      Our dedicated privacy team is available to answer your questions and address 
                      any concerns about our privacy practices.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">Email</div>
                          <div className="text-sm text-gray-600">privacy@aircontrip.com</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">Phone</div>
                          <div className="text-sm text-gray-600">+1 (800) 123-4567</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900">Hours</div>
                          <div className="text-sm text-gray-600">Monday-Friday, 9AM-5PM EST</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Data Protection Officer</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        AJ
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Alex Johnson</div>
                        <div className="text-gray-600">Chief Privacy Officer</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      With over 15 years of experience in data protection and privacy law, 
                      Alex leads our privacy initiatives and ensures compliance with global regulations.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">AirContrip</div>
                  <div className="text-sm text-gray-500">Privacy Center</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Committed to protecting your privacy and securing your data.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600">Security Overview</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Report a Concern</a></li>
                <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Stay Updated</h4>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe to receive privacy policy updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="px-4 py-2 bg-gray-900 text-white rounded-r-lg hover:bg-gray-800 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 AirContrip. All rights reserved. Protecting privacy worldwide.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors z-40"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default PrivacyPolicy;