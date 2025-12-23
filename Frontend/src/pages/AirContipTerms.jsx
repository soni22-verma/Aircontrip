import React, { useState, useEffect } from 'react';

const AirContipTerms = () => {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const termsData = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: '✓',
      content: `By accessing and using AirContip, you agree to these Terms. We reserve the right to modify terms at any time. Your continued use constitutes acceptance of changes.`
    },
    {
      id: 'eligibility',
      title: 'Eligibility',
      icon: '👤',
      content: `You must be at least 18 years old to use AirContip. By using our services, you represent that you have the legal capacity to enter into binding contracts.`
    },
    {
      id: 'accounts',
      title: 'Account Registration',
      icon: '🔐',
      content: `You must provide accurate account information. You are responsible for maintaining confidentiality and all activities under your account. Do not share credentials.`
    },
    {
      id: 'listings',
      title: 'Listings & Bookings',
      icon: '🏠',
      content: `Hosts are responsible for accurate listings. Guests agree to pay all charges. Cancellation policies vary by listing. Service fees apply to all bookings.`
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: '💳',
      content: `We use secure payment processing. Hosts receive payment 24h after check-in. Currency conversion rates are approximate. Refunds follow cancellation policies.`
    },
    {
      id: 'cancellations',
      title: 'Cancellations',
      icon: '🔄',
      content: `Cancellation policies are set by hosts. Guests may cancel per host's policy. Host cancellations may incur penalties. Extreme circumstances may warrant exceptions.`
    },
    {
      id: 'conduct',
      title: 'User Conduct',
      icon: '👥',
      content: `Respect all users. No fraudulent activity. No circumventing fees. No false information. No discrimination. Report suspicious activity immediately.`
    },
    {
      id: 'content',
      title: 'User Content',
      icon: '📸',
      content: `You retain rights to your content but grant us license to use it. Do not post illegal or harmful content. We may remove content violating these terms.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: '⚠️',
      content: `AirContip is a platform connecting users. We are not party to agreements between users. Our liability is limited as permitted by law. Users assume risks.`
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: '⛔',
      content: `We may suspend or terminate accounts for violations. Users may terminate accounts anytime. Certain provisions survive termination.`
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = termsData.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Air<span className="text-rose-500">Contip</span>
              </span>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Stays', 'Experiences', 'Host'].map(item => (
                <a key={item} href="#" className="text-gray-600 hover:text-rose-500 transition-colors">
                  {item}
                </a>
              ))}
              <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                Sign Up
              </button>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {['Home', 'Stays', 'Experiences', 'Host'].map(item => (
              <a key={item} href="#" className="block text-gray-600 hover:text-rose-500 py-2">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-50 via-white to-orange-50 py-12 mt-19">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Use
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Last updated: January 15, 2024
            </p>
            <p className="text-gray-500">
              Please read these terms carefully before using AirContip. By accessing our platform, you agree to be bound by these terms.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contents</h3>
              <nav className="space-y-2">
                {termsData.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all flex items-center ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-rose-50 to-orange-50 text-rose-600 border border-rose-100'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Need Help?</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-600 hover:text-rose-500 text-sm">
                    📄 Privacy Policy
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-rose-500 text-sm">
                    ❓ FAQ
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-rose-500 text-sm">
                    📧 Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="space-y-6">
              {termsData.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-100 to-orange-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">{section.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-sm font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                          Section {index + 1}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {section.content}
                  </p>
                  
                  {/* Additional details for specific sections */}
                  {section.id === 'payments' && (
                    <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-4 rounded-lg border border-rose-100">
                      <p className="text-sm text-gray-600">
                        💳 <strong>Secure Payments:</strong> All transactions are encrypted and processed through PCI-compliant systems.
                      </p>
                    </div>
                  )}
                  
                  {section.id === 'cancellations' && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Cancellation Tiers:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { type: 'Flexible', desc: 'Full refund 24h before' },
                          { type: 'Moderate', desc: 'Full refund 5 days before' },
                          { type: 'Strict', desc: '50% refund 7 days before' }
                        ].map(tier => (
                          <div key={tier.type} className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium text-gray-900">{tier.type}</div>
                            <div className="text-sm text-gray-600">{tier.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Agreement Section */}
            <div className="mt-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Agreement Confirmation</h3>
                <p className="mb-6 opacity-90">
                  By using AirContip, you confirm that you have read, understood, and agree to these Terms of Use.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-6 py-3 bg-white text-rose-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                    Download PDF
                  </button>
                  <button className="px-6 py-3 bg-transparent border-2 border-white rounded-full hover:bg-white/10 transition-colors">
                    Print Terms
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                Questions? Contact us at{' '}
                <a href="mailto:legal@aircontip.com" className="text-rose-500 hover:underline">
                  legal@aircontip.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold">AirContip</span>
              </div>
              <p className="text-gray-400 text-sm">
                Find unique stays and experiences around the world.
              </p>
            </div>
            
            {['Company', 'Support', 'Legal'].map((category) => (
              <div key={category}>
                <h4 className="font-bold text-lg mb-4">{category}</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Link 1</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Link 2</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white text-sm">Link 3</a></li>
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 AirContip. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AirContipTerms;