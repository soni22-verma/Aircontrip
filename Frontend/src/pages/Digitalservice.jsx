import React, { useState } from 'react';

const DigitalServicesPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const services = [
    {
      id: 'flight-booking',
      icon: '✈️',
      title: 'Intelligent Flight Booking',
      description: 'Our advanced flight booking system uses AI-powered algorithms to find the best routes, prices, and timing for your travel needs.',
      features: [
        'Real-time flight search across 650+ airlines',
        'Predictive pricing and fare alerts',
        'Multi-city and round-the-world trip planning',
        'Flexible date searches for optimal pricing',
        'Seat selection and meal preferences'
      ],
      benefits: [
        'Save up to 40% on flight tickets',
        '24/7 availability and instant confirmation',
        'Carbon footprint calculation and offset options',
        'Travel insurance integration'
      ]
    },
    {
      id: 'hotel-reservations',
      icon: '🏨',
      title: 'Smart Hotel Reservations',
      description: 'Access over 2 million properties worldwide with our hotel booking platform featuring verified reviews and exclusive deals.',
      features: [
        'Global inventory of hotels, resorts, and vacation rentals',
        'Smart filters for amenities, location, and ratings',
        'Virtual tours and 360° room views',
        'Price match guarantee',
        'Loyalty program integration'
      ],
      benefits: [
        'Member-only rates and discounts',
        'Free cancellation on most bookings',
        'Best price guarantee',
        '24/7 customer support for hotel issues'
      ]
    },
    {
      id: 'travel-packages',
      icon: '🎒',
      title: 'Custom Travel Packages',
      description: 'Create personalized travel experiences with our end-to-end package builder combining flights, hotels, and activities.',
      features: [
        'AI-powered itinerary planning',
        'Local experience and activity bookings',
        'Group travel coordination tools',
        'Budget optimization algorithms',
        'Destination guides and recommendations'
      ],
      benefits: [
        'All-in-one convenience',
        'Cost savings on package deals',
        'Local expert recommendations',
        'Single point of contact for entire trip'
      ]
    },
    {
      id: 'business-travel',
      icon: '💼',
      title: 'Corporate Travel Solutions',
      description: 'Comprehensive travel management for businesses with expense tracking, policy compliance, and reporting tools.',
      features: [
        'Corporate travel policy enforcement',
        'Centralized billing and invoicing',
        'Expense management integration',
        'Travel risk management',
        'Duty of care compliance'
      ],
      benefits: [
        'Average 25% cost reduction',
        'Real-time travel tracking',
        'Consolidated reporting',
        '24/7 traveler support'
      ]
    },
    {
      id: 'mobile-experience',
      icon: '📱',
      title: 'Mobile-First Experience',
      description: 'Our native mobile apps provide seamless booking, real-time notifications, and offline access to travel documents.',
      features: [
        'Biometric authentication (Face ID/Touch ID)',
        'Offline boarding pass storage',
        'Real-time flight status updates',
        'Mobile-exclusive deals',
        'In-app chat support'
      ],
      benefits: [
        'Book on the go in under 2 minutes',
        'Instant push notifications',
        'Digital wallet integration',
        'Location-based recommendations'
      ]
    },
    {
      id: 'loyalty-program',
      icon: '⭐',
      title: 'Loyalty & Rewards Program',
      description: 'Earn points on every booking and redeem for flights, upgrades, hotel stays, and exclusive experiences.',
      features: [
        'Points earned on all travel services',
        'Tier-based rewards system',
        'Partner airline and hotel transfers',
        'Exclusive member-only deals',
        'Family points pooling'
      ],
      benefits: [
        'Elite status recognition',
        'Priority customer service',
        'Complimentary upgrades',
        'Birthday rewards and surprises'
      ]
    }
  ];

  const technologyStack = [
    {
      category: 'Artificial Intelligence',
      technologies: [
        'Machine Learning algorithms for price prediction',
        'Natural Language Processing for customer support',
        'Computer Vision for document verification',
        'Recommendation engines for personalized offers'
      ]
    },
    {
      category: 'Cloud Infrastructure',
      technologies: [
        'AWS cloud hosting for global scalability',
        'Content Delivery Network for fast loading',
        'Microservices architecture',
        'Real-time database synchronization'
      ]
    },
    {
      category: 'Security & Compliance',
      technologies: [
        'PCI DSS Level 1 certification for payments',
        'GDPR compliance for data protection',
        'End-to-end SSL encryption',
        'Two-factor authentication'
      ]
    },
    {
      category: 'Mobile Technology',
      technologies: [
        'React Native for cross-platform apps',
        'Push notification services',
        'Offline-first architecture',
        'Biometric authentication integration'
      ]
    }
  ];

  const statistics = [
    { number: '10M+', label: 'Happy Travelers', icon: '😊' },
    { number: '650+', label: 'Airline Partners', icon: '✈️' },
    { number: '2M+', label: 'Hotel Properties', icon: '🏨' },
    { number: '150+', label: 'Countries Covered', icon: '🌍' },
    { number: '99.9%', label: 'Uptime', icon: '⚡' },
    { number: '24/7', label: 'Support', icon: '🛟' }
  ];

  const timeline = [
    {
      year: '2018',
      milestone: 'Founded with focus on AI-powered flight search',
      achievement: 'First 100,000 bookings processed'
    },
    {
      year: '2019',
      milestone: 'Expanded to hotel and package bookings',
      achievement: 'Partnered with 200+ airlines worldwide'
    },
    {
      year: '2020',
      milestone: 'Launched mobile apps and loyalty program',
      achievement: 'Reached 1 million registered users'
    },
    {
      year: '2021',
      milestone: 'Introduced corporate travel solutions',
      achievement: 'Expanded to 100+ countries'
    },
    {
      year: '2022',
      milestone: 'Implemented sustainable travel initiatives',
      achievement: 'Processed over 5 million bookings'
    },
    {
      year: '2023',
      milestone: 'Launched AI travel assistant',
      achievement: 'Recognized as Top Travel Platform'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-blue-400 via-blue-500 to-cyan-500 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="mr-2">💻</span>
              <span className="font-medium">Digital Services</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transforming Travel Through <span className="text-yellow-300">Technology</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Discover how AirconTrip leverages cutting-edge digital solutions to create seamless travel experiences for millions worldwide.
            </p>
            
            
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {statistics.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="flex items-center justify-center text-gray-600">
                  <span className="mr-2">{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-linear-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Digital <span className="text-blue-600">Vision</span>
              </h2>
              <p className="text-xl text-gray-600">
                At AirconTrip, we believe technology should enhance travel, not complicate it. Our digital services are designed to make every journey seamless, from inspiration to destination.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
                  <p className="text-gray-700 mb-6">
                    To democratize travel by making it more accessible, affordable, and enjoyable through innovative digital solutions. We're committed to removing friction from every step of the travel journey.
                  </p>
                  <div className="flex items-start space-x-3 mb-4">
                    <span className="text-green-500 text-xl mt-1">✓</span>
                    <div>
                      <div className="font-bold text-gray-900">Simplify Complexity</div>
                      <div className="text-gray-600">Transform complex travel planning into simple steps</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 mb-4">
                    <span className="text-green-500 text-xl mt-1">✓</span>
                    <div>
                      <div className="font-bold text-gray-900">Personalize Experiences</div>
                      <div className="text-gray-600">Tailor recommendations to individual preferences</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-xl mt-1">✓</span>
                    <div>
                      <div className="font-bold text-gray-900">Ensure Reliability</div>
                      <div className="text-gray-600">Maintain 99.9% uptime and instant confirmations</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Values</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-linear-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-xl">
                        🔄
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Innovation First</h4>
                        <p className="text-gray-600">Continuously evolving our technology to stay ahead of travel trends</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-linear-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-xl">
                        🤝
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Customer-Centric</h4>
                        <p className="text-gray-600">Every feature is designed with traveler needs in mind</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-linear-to-r from-purple-100 to-violet-100 rounded-xl flex items-center justify-center text-xl">
                        🌱
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Sustainable Growth</h4>
                        <p className="text-gray-600">Building technology that supports responsible tourism</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Digital <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive digital solutions powered by advanced technology
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="bg-linear-to-br from-white to-blue-50 border border-blue-100 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/4">
                    <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-700">{service.description}</p>
                  </div>

                  <div className="lg:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">⚡</span> Key Features
                        </h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-500 mr-3 mt-1">•</span>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">🎯</span> Key Benefits
                        </h4>
                        <ul className="space-y-3">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-3 mt-1">✓</span>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="technology" className="py-20 bg-linear-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technology <span className="text-blue-600">Stack</span>
            </h2>
            <p className="text-xl text-gray-600">
              Powered by modern, scalable, and secure technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {technologyStack.map((tech, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{tech.category}</h3>
                <div className="space-y-4">
                  {tech.technologies.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start p-4 bg-linear-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                    >
                      <span className="text-blue-500 mr-3 mt-1">▸</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Diagram */}
          <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-8 text-center">System Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  🌐
                </div>
                <h4 className="font-bold mb-2">Presentation Layer</h4>
                <p className="text-sm opacity-90">Web & Mobile Apps</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  ⚡
                </div>
                <h4 className="font-bold mb-2">API Gateway</h4>
                <p className="text-sm opacity-90">Request Routing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  🧩
                </div>
                <h4 className="font-bold mb-2">Microservices</h4>
                <p className="text-sm opacity-90">Specialized Services</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  🗄️
                </div>
                <h4 className="font-bold mb-2">Data Layer</h4>
                <p className="text-sm opacity-90">Databases & Caching</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Digital <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600">
              Milestones in our technology evolution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-blue-500 to-cyan-500"></div>
              
              {/* Timeline items */}
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative mb-12 ${index % 2 === 0 ? 'pr-1/2 pl-8 text-right' : 'pl-1/2 pr-8'}`}
                >
                  <div className={`absolute top-0 w-6 h-6 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-white ${index % 2 === 0 ? '-right-3' : '-left-3'}`}></div>
                  
                  <div className={`bg-linear-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg ${index % 2 === 0 ? 'mr-6' : 'ml-6'}`}>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.milestone}</h3>
                    <p className="text-gray-700">{item.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Privacy & Security */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Data Privacy & <span className="text-blue-600">Security</span>
                </h2>
                <p className="text-xl text-gray-600">
                  Your trust is our top priority
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 border border-gray-200 rounded-2xl">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Encryption</h3>
                  <p className="text-gray-600">End-to-end SSL/TLS encryption for all data transmissions</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-2xl">
                  <div className="text-4xl mb-4">📜</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance</h3>
                  <p className="text-gray-600">GDPR, CCPA, and global data protection regulations</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-2xl">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Certification</h3>
                  <p className="text-gray-600">PCI DSS Level 1 certified payment processing</p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment</h3>
                <p className="text-gray-700 mb-6">
                  We adhere to the highest standards of data privacy and security. Your personal information is protected with industry-leading security measures, and we never share your data without explicit consent.
                </p>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">📧</span>
                  <span>Privacy inquiries: privacy@aircontrip.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Future <span className="text-blue-600">Roadmap</span>
            </h2>
            <p className="text-xl text-gray-600">
              What's next in our digital evolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-linear-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-8">
              <div className="text-2xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Travel Assistant</h3>
              <p className="text-gray-600">
                Advanced AI that learns your preferences and proactively suggests travel opportunities
              </p>
            </div>
            <div className="bg-linear-to-br from-green-50 to-white border border-green-100 rounded-2xl p-8">
              <div className="text-2xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Travel</h3>
              <p className="text-gray-600">
                Carbon-neutral booking options and eco-friendly travel recommendations
              </p>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8">
              <div className="text-2xl mb-4">🕶️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AR Integration</h3>
              <p className="text-gray-600">
                Augmented Reality for hotel room previews and destination exploration
              </p>
            </div>
          </div>
        </div>
      </section>

    

     
    </div>
  );
};

export default DigitalServicesPage;