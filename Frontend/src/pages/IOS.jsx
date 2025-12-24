import React, { useState, useEffect } from 'react';

const IOSAppPage = () => {
  const [device, setDevice] = useState('iphone');
  const [downloadCount, setDownloadCount] = useState(0);
  const [showAppStore, setShowAppStore] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Animate download counter
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount(prev => prev < 125000 ? prev + 1000 : prev);
    }, 100);
    
    setTimeout(() => clearInterval(interval), 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Book flights in under 60 seconds with our optimized iOS app',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Face ID/Touch ID login and end-to-end encryption',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🎫',
      title: 'Mobile-Only Deals',
      description: 'Exclusive discounts available only on iOS app',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: '📱',
      title: 'Apple Watch Ready',
      description: 'Get boarding passes and flight alerts on your wrist',
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const appScreens = [
    { id: 1, title: 'Smart Search', desc: 'Intuitive flight search with AI recommendations' },
    { id: 2, title: 'Easy Booking', desc: '3-tap booking process with Apple Pay' },
    { id: 3, title: 'Live Updates', desc: 'Real-time flight status and gate changes' },
    { id: 4, title: 'Travel Wallet', desc: 'All your bookings in one secure place' }
  ];

  const testimonials = [
    { name: 'Sarah K.', rating: 5, text: 'Best travel app on the App Store! So intuitive and fast.', date: '2 days ago' },
    { name: 'Michael T.', rating: 5, text: 'The Apple Watch integration is a game changer.', date: '1 week ago' },
    { name: 'Jessica L.', rating: 5, text: 'Saved $120 with app-exclusive deals. Love it!', date: '3 weeks ago' }
  ];

  const faqs = [
    { q: 'Is the app free to download?', a: 'Yes! The AirconTrip iOS app is completely free with no hidden fees.' },
    { q: 'What iOS version do I need?', a: 'Requires iOS 14.0 or later. Compatible with iPhone, iPad, and iPod touch.' },
    { q: 'Can I use Face ID to login?', a: 'Absolutely! We support Face ID and Touch ID for secure, instant login.' },
    { q: 'Are my payment details secure?', a: 'Yes, we use Apple Pay and secure tokenization. We never store your card details.' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-gray-700 to-black text-white">
        {/* Apple-style grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, transparent 1px, rgba(255,255,255,0.05) 1px),
                            linear-gradient(to bottom, transparent 1px, rgba(255,255,255,0.05) 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 mt-20">
         

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideUp">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="mr-2">📱</span>
                <span className="text-sm font-medium">iOS App Now Available</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Travel Smarter with Our <span className="text-blue-400">iOS App</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Download the #1 rated travel app on the App Store. Book flights, manage trips, and get exclusive mobile deals.
              </p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="text-gray-400 text-sm">App Store Rating</div>
                </div>
                <div className="h-12 w-px bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{(downloadCount / 1000).toFixed(0)}K+</div>
                  <div className="text-gray-400 text-sm">Downloads</div>
                </div>
                <div className="h-12 w-px bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-gray-400 text-sm">Countries</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
               
                <button
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative animate-slideUp animation-delay-300">
              {/* iPhone Mockup */}
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-4 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-[3rem] blur-2xl"></div>
                <div className="relative bg-linear-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-8 shadow-2xl">
                  {/* iPhone notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black rounded-b-2xl"></div>
                  
                  {/* Screen content */}
                  <div className="bg-linear-to-br from-gray-900 to-black rounded-[2rem] p-6">
                    <div className="text-center mb-8">
                      <div className="text-4xl mb-4">✈️</div>
                      <h3 className="text-2xl font-bold">AirconTrip</h3>
                      <p className="text-gray-400 text-sm">Your Travel Companion</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">JFK → LAX</span>
                          <span className="text-green-400 font-bold">$249</span>
                        </div>
                        <div className="text-sm text-gray-500">Today • 2h 45m</div>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">ORD → MIA</span>
                          <span className="text-green-400 font-bold">$189</span>
                        </div>
                        <div className="text-sm text-gray-500">Tomorrow • 3h 10m</div>
                      </div>
                      
                      <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl p-4 text-center">
                        <div className="font-bold">Search Flights</div>
                      </div>
                    </div>
                    
                    {/* Home indicator */}
                    <div className="mt-8 flex justify-center">
                      <div className="w-32 h-1 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-linear-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                ★ 4.9
              </div>
              <div className="absolute -bottom-4 -left-4 bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                Editor's Choice
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Store Modal */}
      {showAppStore && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Redirecting to App Store</h3>
              <button
                onClick={() => setShowAppStore(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                ✈️
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">AirconTrip</h4>
              <p className="text-gray-600">Travel & Booking</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-bold text-gray-900">Size</div>
                  <div className="text-gray-600 text-sm">85.4 MB</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Age</div>
                  <div className="text-gray-600 text-sm">4+</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Version</div>
                  <div className="text-gray-600 text-sm">2.1.5</div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  alert('Redirecting to App Store...');
                  setShowAppStore(false);
                }}
                className="w-full py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Open App Store
              </button>
              
              <button
                onClick={() => setShowAppStore(false)}
                className="w-full py-4 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why You'll Love Our <span className="text-blue-600">iOS App</span>
            </h2>
            <p className="text-xl text-gray-600">
              Designed specifically for iOS with Apple's Human Interface Guidelines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`group relative bg-linear-to-br from-white to-gray-50 border-2 rounded-3xl p-8 cursor-pointer transform transition-all duration-500 hover:-translate-y-2 ${
                  activeFeature === index 
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/20' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                }`}
              >
                <div className={`absolute -inset-0.5 bg-linear-to-r ${feature.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                  activeFeature === index ? 'opacity-20' : ''
                }`}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6 ${
                    activeFeature === index ? `bg-linear-to-r ${feature.color} text-white` : 'bg-gray-100 text-gray-700'
                  } transition-all duration-500`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  
                  {activeFeature === index && (
                    <div className="mt-6 flex items-center text-blue-600 font-medium">
                      <span>Learn more</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* iOS Exclusive Features */}
          <div className="bg-linear-to-r from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <span className="mr-2">🍎</span>
                  <span className="font-medium">iOS Exclusive</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">Built for Apple Ecosystem</h3>
                <p className="text-gray-300 mb-6">Seamlessly integrated with your Apple devices</p>
                <ul className="space-y-4">
                  {[
                    'Apple Pay for instant checkout',
                    'Face ID & Touch ID login',
                    'Apple Wallet boarding passes',
                    'Siri Shortcuts support',
                    'Apple Watch companion app',
                    'iCloud sync across devices'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-400 mr-3">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-32 h-32 bg-linear-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4">
                    <span className="text-3xl mb-2">💳</span>
                    <span className="text-center text-sm">Apple Pay</span>
                  </div>
                  <div className="w-32 h-32 bg-linear-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4">
                    <span className="text-3xl mb-2">👁️</span>
                    <span className="text-center text-sm">Face ID</span>
                  </div>
                  <div className="w-32 h-32 bg-linear-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4">
                    <span className="text-3xl mb-2">⌚</span>
                    <span className="text-center text-sm">Apple Watch</span>
                  </div>
                  <div className="w-32 h-32 bg-linear-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4">
                    <span className="text-3xl mb-2">☁️</span>
                    <span className="text-center text-sm">iCloud Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screens" className="py-20 bg-linear-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              App <span className="text-blue-600">Screenshots</span>
            </h2>
            <p className="text-xl text-gray-600">
              See the beautiful, intuitive interface designed for iOS
            </p>
          </div>

          {/* Device Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-2xl p-1">
              {['iphone', 'ipad'].map((type) => (
                <button
                  key={type}
                  onClick={() => setDevice(type)}
                  className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                    device === type
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type === 'iphone' ? '📱 iPhone' : '📱 iPad'}
                </button>
              ))}
            </div>
          </div>

          {/* Screenshot Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {appScreens.map((screen, index) => (
              <div 
                key={screen.id}
                className="group relative animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-linear-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-6 shadow-2xl">
                  {/* Device frame */}
                  {device === 'iphone' ? (
                    <>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
                      <div className="bg-linear-to-br from-gray-900 to-black rounded-[2rem] p-6">
                        <div className="text-center mb-6">
                          <div className="text-3xl mb-3">{screen.id === 1 ? '🔍' : screen.id === 2 ? '🎫' : screen.id === 3 ? '📊' : '👤'}</div>
                          <h4 className="text-lg font-bold text-white mb-2">{screen.title}</h4>
                          <p className="text-gray-400 text-sm">{screen.desc}</p>
                        </div>
                        <div className="h-40 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl"></div>
                        <div className="mt-6 flex justify-center">
                          <div className="w-24 h-1 bg-gray-700 rounded-full"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute top-4 left-4 w-4 h-4 bg-gray-700 rounded-full"></div>
                      <div className="bg-linear-to-br from-gray-900 to-black rounded-[1.5rem] p-8">
                        <div className="text-center mb-8">
                          <div className="text-4xl mb-4">{screen.id === 1 ? '🔍' : screen.id === 2 ? '🎫' : screen.id === 3 ? '📊' : '👤'}</div>
                          <h4 className="text-xl font-bold text-white mb-2">{screen.title}</h4>
                          <p className="text-gray-400">{screen.desc}</p>
                        </div>
                        <div className="h-48 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-2xl"></div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
              </div>
            ))}
          </div>

         
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by <span className="text-blue-600">iOS Users</span>
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying on the App Store
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-linear-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-xl mr-4">
                    👤
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">App Store Review</span>
                  <span className="text-gray-500 text-sm">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-6">Get Notified About Updates</h3>
              <p className="text-xl mb-8 text-blue-100">Be the first to know about new features and exclusive iOS offers</p>
              
              {isSubmitted ? (
                <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-8">
                  <div className="text-4xl mb-4">🎉</div>
                  <h4 className="text-2xl font-bold mb-2">You're Subscribed!</h4>
                  <p className="text-blue-100">Check your email for confirmation and special welcome offer.</p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                  <div className="flex">
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
                      className="px-8 bg-white text-blue-600 font-bold rounded-r-2xl hover:bg-blue-50 transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-blue-200">We'll only send iOS app updates and exclusive offers</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
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

      

      
     
    </div>
  );
};

export default IOSAppPage;