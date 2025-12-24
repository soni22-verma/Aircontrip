import React, { useState, useEffect } from 'react';

const AffiliatesPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [commissionRate, setCommissionRate] = useState(15);
  const [earnings, setEarnings] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stats, setStats] = useState({
    partners: 0,
    paid: 0,
    average: 0,
    countries: 0
  });

  // Animate stats on load
  useEffect(() => {
    const finalStats = {
      partners: 1250,
      paid: 2850000,
      average: 450,
      countries: 65
    };

    const interval = setInterval(() => {
      setStats(prev => ({
        partners: prev.partners < finalStats.partners ? prev.partners + 25 : finalStats.partners,
        paid: prev.paid < finalStats.paid ? prev.paid + 57000 : finalStats.paid,
        average: prev.average < finalStats.average ? prev.average + 9 : finalStats.average,
        countries: prev.countries < finalStats.countries ? prev.countries + 1 : finalStats.countries
      }));
    }, 50);

    setTimeout(() => clearInterval(interval), 2000);

    return () => clearInterval(interval);
  }, []);

  // Calculate earnings based on commission rate
  const calculateEarnings = (value) => {
    setCommissionRate(value);
    setEarnings((value / 100) * 5000); // Example calculation based on $5000 sales
  };

  // Handle affiliate signup
  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setEmail('');
        setWebsite('');
      }, 3000);
    }
  };

  // Stats cards
  const statCards = [
    { 
      title: 'Active Partners', 
      value: `${stats.partners}+`, 
      icon: '🤝',
      color: 'from-blue-500 to-cyan-500',
      description: 'Join our growing network'
    },
    { 
      title: 'Total Paid', 
      value: `$${(stats.paid / 1000000).toFixed(1)}M+`, 
      icon: '💰',
      color: 'from-green-500 to-emerald-500',
      description: 'In affiliate commissions'
    },
    { 
      title: 'Avg. Monthly', 
      value: `$${stats.average}+`, 
      icon: '📈',
      color: 'from-purple-500 to-violet-500',
      description: 'Per active partner'
    },
    { 
      title: 'Countries', 
      value: `${stats.countries}+`, 
      icon: '🌍',
      color: 'from-orange-500 to-amber-500',
      description: 'Global reach'
    },
  ];

  // Features
  const features = [
    { icon: '⚡', title: 'High Commissions', desc: 'Earn up to 25% on every booking' },
    { icon: '💰', title: 'Recurring Revenue', desc: 'Commission on repeat bookings' },
    { icon: '🎯', title: 'High Conversion', desc: 'Premium travel audience' },
    { icon: '📊', title: 'Real-time Tracking', desc: 'Advanced analytics dashboard' },
    { icon: '🛡️', title: 'Secure Payments', desc: 'Monthly payments via PayPal/Wire' },
    { icon: '👨‍💼', title: 'Dedicated Support', desc: 'Personal account manager' },
  ];

  // Commission tiers
  const commissionTiers = [
    { level: 'Starter', sales: 'Up to $5,000', rate: '15%', color: 'blue' },
    { level: 'Growth', sales: '$5,001 - $25,000', rate: '18%', color: 'green' },
    { level: 'Premium', sales: '$25,001 - $100,000', rate: '21%', color: 'purple' },
    { level: 'Elite', sales: '$100,000+', rate: '25%', color: 'orange' },
  ];

  // Marketing materials
  const marketingMaterials = [
    { type: 'Banners', count: 25, icon: '🖼️', color: 'bg-gradient-to-r from-blue-100 to-cyan-100' },
    { type: 'Text Links', count: 50, icon: '🔗', color: 'bg-gradient-to-r from-green-100 to-emerald-100' },
    { type: 'Widgets', count: 15, icon: '⚙️', color: 'bg-gradient-to-r from-purple-100 to-violet-100' },
    { type: 'API Access', count: 1, icon: '💻', color: 'bg-gradient-to-r from-orange-100 to-amber-100' },
  ];

  // Success stories
  const successStories = [
    { name: 'Travel Blog Pro', earnings: '$12,450/mo', niche: 'Luxury Travel', duration: '8 months' },
    { name: 'Budget Traveler', earnings: '$4,200/mo', niche: 'Budget Travel', duration: '14 months' },
    { name: 'Adventure Hub', earnings: '$8,750/mo', niche: 'Adventure Travel', duration: '6 months' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 mt-15">
         

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slideUp">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Earn Up To <span className="text-yellow-300">25%</span> Commission
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  Join AirconTrip's Affiliate Program and earn recurring commissions on flight, hotel, and package bookings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => document.getElementById('join').scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Start Earning Today
                  </button>
                  <button 
                    onClick={() => setActiveTab('calculator')}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300"
                  >
                    Calculate Earnings
                  </button>
                </div>
              </div>
              
              <div className="animate-slideUp animation-delay-300">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold mb-6">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {statCards.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className="text-blue-100 text-sm">{stat.title}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-lg">Average Conversion Rate</span>
                      <span className="text-2xl font-bold text-green-300">4.8%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div className="bg-linear-to-r from-green-400 to-cyan-400 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statCards.map((card, index) => (
              <div 
                key={index} 
                className={`bg-linear-to-br ${card.color} text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-slideUp`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <div className="text-3xl font-bold mb-2">{card.value}</div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="opacity-90">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Partner With <span className="text-blue-600">AirconTrip</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Our affiliate program is designed to maximize your earnings with industry-leading features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 animate-slideUp border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-v-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-linear-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-2xl mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Marketing Materials */}
          <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h3 className="text-3xl font-bold mb-4">Marketing Materials</h3>
                <p className="text-blue-100 mb-6">Access our professionally designed banners, widgets, and API integration</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {marketingMaterials.map((material, index) => (
                    <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl mb-2">{material.icon}</div>
                      <div className="font-bold">{material.type}</div>
                      <div className="text-sm opacity-80">{material.count} options</div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Commission Calculator */}
      <section id="commission" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Commission <span className="text-blue-600">Calculator</span>
            </h2>
            <p className="text-xl text-gray-600">
              See how much you can earn with our tiered commission structure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator */}
            <div className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Calculate Your Earnings</h3>
              
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700 font-medium">Commission Rate</span>
                  <span className="text-2xl font-bold text-blue-600">{commissionRate}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="25"
                  step="1"
                  value={commissionRate}
                  onChange={(e) => calculateEarnings(parseInt(e.target.value))}
                  className="w-full h-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-blue-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>15%</span>
                  <span>25%</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Monthly Sales Volume</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      defaultValue="5000"
                      className="w-full pl-10 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                      onChange={(e) => calculateEarnings(commissionRate)}
                    />
                  </div>
                </div>

                <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Your Monthly Earnings</div>
                    <div className="text-5xl font-bold text-gray-900 mb-2">${earnings.toFixed(2)}</div>
                    <div className="text-gray-600">Based on ${commissionRate}% commission rate</div>
                  </div>
                </div>

                <button className="w-full py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-500">
                  Start Earning
                </button>
              </div>
            </div>

            {/* Commission Tiers */}
            <div className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Commission Tiers</h3>
              
              <div className="space-y-6">
                {commissionTiers.map((tier, index) => (
                  <div 
                    key={index} 
                    className={`group relative p-6 rounded-2xl border-2 ${tier.color === 'blue' ? 'border-blue-200 hover:border-blue-500' : tier.color === 'green' ? 'border-green-200 hover:border-green-500' : tier.color === 'purple' ? 'border-purple-200 hover:border-purple-500' : 'border-orange-200 hover:border-orange-500'} bg-white hover:shadow-xl transform transition-all duration-500 hover:-translate-y-1 cursor-pointer`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{tier.level}</h4>
                        <p className="text-gray-600">{tier.sales} monthly sales</p>
                      </div>
                      <div className={`text-3xl font-bold ${tier.color === 'blue' ? 'text-blue-600' : tier.color === 'green' ? 'text-green-600' : tier.color === 'purple' ? 'text-purple-600' : 'text-orange-600'}`}>
                        {tier.rate}
                      </div>
                    </div>
                    <div className={`w-full h-2 ${tier.color === 'blue' ? 'bg-blue-100' : tier.color === 'green' ? 'bg-green-100' : tier.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'} rounded-full overflow-hidden`}>
                      <div 
                        className={`h-full ${tier.color === 'blue' ? 'bg-linear-to-r from-blue-500 to-cyan-500' : tier.color === 'green' ? 'bg-linear-to-r from-green-500 to-emerald-500' : tier.color === 'purple' ? 'bg-linear-to-r from-purple-500 to-violet-500' : 'bg-linear-to-r from-orange-500 to-amber-500'} rounded-full transition-all duration-500`}
                        style={{ width: `${(index + 1) * 25}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Additional Benefits</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>90-day cookie duration</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Commission on repeat bookings</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Bonus for top performers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success" className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success <span className="text-blue-600">Stories</span>
            </h2>
            <p className="text-xl text-gray-600">
              See how our partners are earning significant income
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {successStories.map((story, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-3 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-linear-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-2xl mr-4">
                      {index === 0 ? '👑' : index === 1 ? '💰' : '🏔️'}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{story.name}</h4>
                      <p className="text-gray-600">{story.niche}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{story.earnings}</div>
                    <div className="text-gray-600">Monthly earnings</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Joined {story.duration} ago</span>
                    <span className="px-4 py-1 bg-green-100 text-green-800 font-bold rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 bg-linear-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Affiliate Program
              </h2>
              <p className="text-xl text-blue-100">
                Start earning commissions in just 5 minutes
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Application Submitted!</h3>
                  <p className="text-xl text-blue-100 mb-8">
                    We'll contact you within 24 hours with your affiliate dashboard access.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-8">Apply Now</h3>
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white mb-2 font-medium">Full Name *</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-4 bg-white/10 border border-white/30 text-white rounded-xl focus:bg-white/20 focus:border-white focus:ring-2 focus:ring-white/20 focus:outline-none transition-all duration-300 placeholder-white/50"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2 font-medium">Email Address *</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-4 bg-white/10 border border-white/30 text-white rounded-xl focus:bg-white/20 focus:border-white focus:ring-2 focus:ring-white/20 focus:outline-none transition-all duration-300 placeholder-white/50"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2 font-medium">Website/Platform</label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-4 bg-white/10 border border-white/30 text-white rounded-xl focus:bg-white/20 focus:border-white focus:ring-2 focus:ring-white/20 focus:outline-none transition-all duration-300 placeholder-white/50"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2 font-medium">Promotion Method</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Blog/Website', 'Social Media', 'Email Newsletter', 'YouTube', 'Mobile App', 'Other'].map((method, index) => (
                          <label key={index} className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                            <span className="text-white">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="terms" className="w-5 h-5 text-blue-600 rounded" required />
                      <label htmlFor="terms" className="ml-3 text-white">
                        I agree to the <a href="#" className="text-yellow-300 hover:text-yellow-200">Terms & Conditions</a> and <a href="#" className="text-yellow-300 hover:text-yellow-200">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-5 bg-linear-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
                    >
                      Apply to Join Program
                    </button>
                    
                    <p className="text-center text-white/70 text-sm">
                      Approval typically takes 1-2 business days. You'll receive dashboard access via email.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                q: "How do I get paid?",
                a: "We pay commissions monthly via PayPal, Wire Transfer, or ACH. Minimum payout is $50. Payments are processed on the 15th of each month."
              },
              {
                q: "What's the cookie duration?",
                a: "We offer a 90-day cookie duration. You earn commission on any booking made within 90 days of clicking your affiliate link."
              },
              {
                q: "Can I track my performance?",
                a: "Yes! You get access to a real-time dashboard with detailed analytics, conversion rates, earnings reports, and more."
              },
              {
                q: "What support do you provide?",
                a: "All affiliates get dedicated support, marketing materials, and a personal account manager for strategic guidance."
              },
              {
                q: "Are there any fees to join?",
                a: "No, joining our affiliate program is completely free. We only succeed when you succeed!"
              },
            ].map((faq, index) => (
              <div key={index} className="mb-6 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
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

export default AffiliatesPage;