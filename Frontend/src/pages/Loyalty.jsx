import React, { useState, useEffect } from "react";
import { 
  FaCrown, 
  FaGem, 
  FaPlane, 
  FaStar, 
  FaTicketAlt, 
  FaGift, 
  FaCheckCircle,
  FaArrowRight,
  FaUserFriends,
  FaShieldAlt,
  FaClock,
  FaGlobeAmericas,
  FaChartLine,
  FaCreditCard,
  FaConciergeBell
} from "react-icons/fa";
import { Link } from "react-router-dom";

const LoyaltyProgram = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userTier, setUserTier] = useState("gold");
  const [nextTierPoints, setNextTierPoints] = useState(500);
  const [loading, setLoading] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    memberSince: "2022",
    totalFlights: 15,
    totalSpent: "$8,450",
    nextReward: 250
  };

  // Tiers data
  const tiers = [
    {
      name: "Blue",
      level: 1,
      minPoints: 0,
      maxPoints: 999,
      color: "from-blue-400 to-blue-600",
      icon: "🛫",
      benefits: ["Basic seat selection", "Standard check-in", "Email support"]
    },
    {
      name: "Silver",
      level: 2,
      minPoints: 1000,
      maxPoints: 2499,
      color: "from-gray-300 to-gray-500",
      icon: "✈️",
      benefits: ["Priority boarding", "Free seat upgrade", "Extra baggage 5kg", "24/7 chat support"]
    },
    {
      name: "Gold",
      level: 3,
      minPoints: 2500,
      maxPoints: 4999,
      color: "from-yellow-400 to-yellow-600",
      icon: "👑",
      benefits: ["Business lounge access", "Free flight changes", "Extra baggage 10kg", "Dedicated support", "Partner discounts"]
    },
    {
      name: "Platinum",
      level: 4,
      minPoints: 5000,
      maxPoints: 9999,
      color: "from-purple-500 to-indigo-600",
      icon: "💎",
      benefits: ["First class upgrades", "Personal travel concierge", "Unlimited changes", "VIP airport transfers", "Hotel upgrades", "Exclusive events"]
    },
    {
      name: "Diamond",
      level: 5,
      minPoints: 10000,
      maxPoints: null,
      color: "from-cyan-500 to-blue-700",
      icon: "🔷",
      benefits: ["All Platinum benefits", "Companion tickets", "Global lounge access", "Private jet discounts", "Lifestyle experiences", "Elite status matching"]
    }
  ];

  // Partner airlines
  const partners = [
    { name: "SkyJet Airways", logo: "✈️", discount: "15%" },
    { name: "Global Airlines", logo: "🌐", discount: "20%" },
    { name: "Oceanic Airways", logo: "🌊", discount: "10%" },
    { name: "Mountain Air", logo: "⛰️", discount: "12%" },
    { name: "Sunset Airlines", logo: "🌅", discount: "18%" }
  ];

  // Rewards catalog
  const rewards = [
    {
      id: 1,
      name: "Flight Discount Voucher",
      points: 500,
      description: "$50 off your next flight",
      category: "flights",
      icon: <FaTicketAlt />
    },
    {
      id: 2,
      name: "Extra Baggage",
      points: 300,
      description: "Extra 10kg baggage allowance",
      category: "perks",
      icon: <FaGift />
    },
    {
      id: 3,
      name: "Lounge Access",
      points: 750,
      description: "Single airport lounge pass",
      category: "experience",
      icon: <FaConciergeBell />
    },
    {
      id: 4,
      name: "Seat Upgrade",
      points: 400,
      description: "Upgrade to Premium Economy",
      category: "flights",
      icon: <FaArrowRight />
    },
    {
      id: 5,
      name: "Hotel Discount",
      points: 600,
      description: "20% off partner hotels",
      category: "hotels",
      icon: <FaCreditCard />
    },
    {
      id: 6,
      name: "Priority Service",
      points: 350,
      description: "Fast-track security & boarding",
      category: "perks",
      icon: <FaShieldAlt />
    }
  ];

  // Calculate progress percentage
  const calculateProgress = () => {
    const currentTier = tiers.find(tier => tier.name.toLowerCase() === userTier);
    if (!currentTier || !currentTier.maxPoints) return 75;
    
    const progress = ((userPoints - currentTier.minPoints) / 
                     (currentTier.maxPoints - currentTier.minPoints)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  // Get next tier
  const getNextTier = () => {
    const currentIndex = tiers.findIndex(tier => tier.name.toLowerCase() === userTier);
    return tiers[currentIndex + 1] || null;
  };

  const nextTier = getNextTier();

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-cyan-50 pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-500 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full shadow-xl mb-6">
              <FaCrown className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              AirContrip <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">AIRTRIBE</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your journey to extraordinary rewards starts here. Earn points on every flight and unlock amazing benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* User Stats Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Status */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
                  <p className="text-gray-600">Member since {user.memberSince}</p>
                </div>
                <div className="bg-linear-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                  <FaCrown /> Gold Member
                </div>
              </div>

              {/* Points Display */}
              <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Your Airtribe Points</h3>
                    <p className="text-gray-600">Points never expire</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-blue-600">{userPoints.toLocaleString()}</div>
                    <div className="text-gray-600">Points</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Current Tier: {userTier.charAt(0).toUpperCase() + userTier.slice(1)}</span>
                    {nextTier && (
                      <span>{nextTierPoints} points to {nextTier.name}</span>
                    )}
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{user.totalFlights}</div>
                    <div className="text-gray-600 text-sm">Total Flights</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{user.totalSpent}</div>
                    <div className="text-gray-600 text-sm">Total Spent</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">{user.nextReward}</div>
                    <div className="text-gray-600 text-sm">Points to next reward</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier Benefits */}
            <div className="bg-linear-to-b from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Gold Tier Benefits</h3>
              <ul className="space-y-3">
                {tiers.find(t => t.name.toLowerCase() === userTier)?.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 bg-linear-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200">
                View All Benefits
              </button>
            </div>
          </div>
        </div>

        {/* Tiers Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Tier Levels</h2>
              <p className="text-gray-600">Climb higher, earn more</p>
            </div>
            <Link 
              to="/tiers" 
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
            >
              Compare all tiers <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {tiers.map((tier) => (
              <div 
                key={tier.name}
                className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  tier.name.toLowerCase() === userTier 
                    ? 'border-yellow-400 shadow-lg' 
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-r ${tier.color} text-white text-2xl`}>
                    {tier.icon}
                  </div>
                  {tier.name.toLowerCase() === userTier && (
                    <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                      CURRENT
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {tier.minPoints.toLocaleString()} - {tier.maxPoints ? tier.maxPoints.toLocaleString() : '+'} points
                </p>
                <ul className="space-y-2">
                  {tier.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      {benefit}
                    </li>
                  ))}
                  {tier.benefits.length > 3 && (
                    <li className="text-sm text-blue-600">+{tier.benefits.length - 3} more benefits</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Catalog */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Redeem Points</h2>
              <p className="text-gray-600">Turn points into amazing experiences</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
                All Rewards
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-700 rounded-full font-medium">
                Flights
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-blue-700 rounded-full font-medium">
                Perks
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div 
                key={reward.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    {reward.icon}
                  </div>
                  <div className="bg-linear-to-r from-blue-600 to-cyan-500 text-white px-3 py-1 rounded-full font-bold">
                    {reward.points} pts
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{reward.name}</h3>
                <p className="text-gray-600 mb-6">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 capitalize">{reward.category}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Redeem Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">Start earning from your very first flight with AirContrip</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <div className="text-2xl font-bold">1</div>
              </div>
              <h3 className="text-xl font-bold mb-3">Book & Fly</h3>
              <p className="text-blue-100">Earn 5 points for every $1 spent on flights</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <div className="text-2xl font-bold">2</div>
              </div>
              <h3 className="text-xl font-bold mb-3">Accumulate Points</h3>
              <p className="text-blue-100">Watch your points grow with every journey</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <div className="text-2xl font-bold">3</div>
              </div>
              <h3 className="text-xl font-bold mb-3">Redeem Rewards</h3>
              <p className="text-blue-100">Use points for flights, upgrades, and exclusive perks</p>
            </div>
          </div>
        </div>

        {/* Partner Airlines */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Partner Airlines</h2>
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <p className="text-gray-600 mb-6">Earn and redeem points across our global partner network</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="text-center p-4 hover:bg-blue-50 rounded-xl transition-colors">
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                  <p className="text-blue-600 font-bold">{partner.discount} off with points</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default LoyaltyProgram;