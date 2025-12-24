import React, { useState, useEffect } from 'react';

const AircontripPartnerPortal = () => {
  // State for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  // State for active section
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // State for bookings
  const [bookings, setBookings] = useState([
    { id: 1, customer: 'John Smith', destination: 'New York', date: '2023-12-15', status: 'Confirmed', price: '$450', flight: 'AC-789', type: 'Flight' },
    { id: 2, customer: 'Emma Johnson', destination: 'London', date: '2023-12-18', status: 'Pending', price: '$620', flight: 'AC-456', type: 'Flight' },
    { id: 3, customer: 'Robert Brown', destination: 'Tokyo', date: '2023-12-20', status: 'Cancelled', price: '$890', flight: 'AC-123', type: 'Flight' },
    { id: 4, customer: 'Sarah Miller', destination: 'Paris', date: '2023-12-22', status: 'Confirmed', price: '$540', flight: 'AC-321', type: 'Flight' },
    { id: 5, customer: 'Mike Wilson', destination: 'Dubai', date: '2023-12-25', status: 'Confirmed', price: '$720', flight: 'AC-654', type: 'Hotel' },
  ]);
  
  // State for new booking form
  const [newBooking, setNewBooking] = useState({
    customerName: '',
    email: '',
    phone: '',
    tripType: 'Flight',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'Economy',
  });
  
  // State for stats
  const [stats, setStats] = useState({
    totalBookings: 124,
    revenue: '$45,820',
    commission: '$4,582',
    pendingBookings: 8,
    cancellationRate: '4.2%',
    customerSatisfaction: '96%',
  });
  
  // State for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New booking request from Lisa Anderson', time: '30 mins ago', type: 'booking' },
    { id: 2, text: 'Flight AC-789 schedule changed', time: '2 hours ago', type: 'alert' },
    { id: 3, text: 'Your commission for November is ready', time: '1 day ago', type: 'commission' },
    { id: 4, text: 'New partner training available', time: '2 days ago', type: 'training' },
  ]);
  
  // State for loading animations
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (!userName.trim()) {
        setUserName('Aircontrip Partner');
      }
      if (!userEmail.trim()) {
        setUserEmail('partner@aircontrip.com');
      }
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 800);
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
  };
  
  // Handle new booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    const newBookingObj = {
      id: bookings.length + 1,
      customer: newBooking.customerName,
      destination: newBooking.destination,
      date: newBooking.departureDate,
      status: 'Pending',
      price: `$${Math.floor(Math.random() * 500) + 300}`,
      flight: `AC-${Math.floor(Math.random() * 900) + 100}`,
      type: newBooking.tripType,
    };
    
    setBookings([newBookingObj, ...bookings]);
    
    // Reset form
    setNewBooking({
      customerName: '',
      email: '',
      phone: '',
      tripType: 'Flight',
      destination: '',
      departureDate: '',
      returnDate: '',
      passengers: 1,
      class: 'Economy',
    });
    
    // Add notification
    const newNotification = {
      id: notifications.length + 1,
      text: `New booking created for ${newBookingObj.customer}`,
      time: 'Just now',
      type: 'booking',
    };
    
    setNotifications([newNotification, ...notifications]);
    
    // Show success animation
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = '✓ Booking Created!';
      submitBtn.classList.add('bg-green-500');
      setTimeout(() => {
        submitBtn.innerHTML = 'Create Booking';
        submitBtn.classList.remove('bg-green-500');
      }, 2000);
    }
  };
  
  // Handle booking status change
  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({
      ...newBooking,
      [name]: value,
    });
  };
  
  // Stats cards data
  const statCards = [
    { 
      title: 'Total Bookings', 
      value: stats.totalBookings, 
      change: '+12%', 
      color: 'blue', 
      icon: '📅',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      title: 'Total Revenue', 
      value: stats.revenue, 
      change: '+8.5%', 
      color: 'green', 
      icon: '💰',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      title: 'Your Commission', 
      value: stats.commission, 
      change: '+10.2%', 
      color: 'purple', 
      icon: '💳',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      title: 'Satisfaction Rate', 
      value: stats.customerSatisfaction, 
      change: '+2.1%', 
      color: 'orange', 
      icon: '⭐',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];
  
  // Quick actions
  const quickActions = [
    { title: 'New Booking', icon: '➕', color: 'from-blue-500 to-cyan-500', action: () => setActiveSection('new-booking') },
    { title: 'Manage Bookings', icon: '✈️', color: 'from-green-500 to-emerald-500', action: () => setActiveSection('bookings') },
    { title: 'View Reports', icon: '📊', color: 'from-purple-500 to-violet-500', action: () => setActiveSection('reports') },
    { title: 'Customer Support', icon: '🛟', color: 'from-orange-500 to-amber-500', action: () => setActiveSection('support') },
  ];
  
  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'Bookings', icon: '✈️' },
    { id: 'new-booking', label: 'New Booking', icon: '➕' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'commissions', label: 'Commissions', icon: '💰' },
    { id: 'support', label: 'Support', icon: '🛟' },
  ];
  
  // Login form component
  const LoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 to-blue-100 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row animate-slideUp mt-20">
        {/* Left side - Branding */}
        <div className="md:w-2/5 bg-linear-to-br from-blue-600 to-cyan-500 p-8 text-white flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">✈️</span>
              </div>
              <h1 className="text-3xl font-bold">Aircontrip</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">Partner Portal</h2>
            <p className="opacity-90">Access exclusive tools for managing bookings, commissions, and customer relationships.</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <h4 className="font-bold">Real-time Bookings</h4>
                <p className="text-sm opacity-80">Manage bookings instantly</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <h4 className="font-bold">Commission Tracking</h4>
                <p className="text-sm opacity-80">Track your earnings in real-time</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h4 className="font-bold">Advanced Analytics</h4>
                <p className="text-sm opacity-80">Data-driven insights for growth</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Login form */}
        <div className="md:w-3/5 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Welcome Back</h3>
            <p className="text-gray-600">Sign in to your partner account</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Partner Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="partner@email.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  defaultValue="aircontrip2023"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                  <label htmlFor="remember" className="ml-2 text-gray-700">Remember me</label>
                </div>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">Forgot password?</a>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 ${isLoading ? 'opacity-80' : 'hover:-translate-y-1'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In to Partner Portal'}
              </button>
              
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">Not a partner yet? <a href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">Apply for partnership</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Main portal component
  const Portal = () => (
    <div className="min-h-screen bg-gray-50 animate-fadeIn">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 mt-35">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-12 h-12 bg-linear-to-r from-blue-600 to-cyan-500 rounded-xl">
                <span className="text-2xl text-white">✈️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Aircontrip <span className="text-blue-600">Partner Portal</span></h1>
                <p className="text-gray-600 text-sm">Welcome, {userName}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative group">
                <button className="relative p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300 group-hover:shadow-md">
                  <span className="text-xl">🔔</span>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {/* Notifications dropdown */}
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            notification.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                            notification.type === 'commission' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {notification.type === 'booking' ? '✈️' : 
                             notification.type === 'alert' ? '⚠️' : 
                             notification.type === 'commission' ? '💰' : '📚'}
                          </div>
                          <div>
                            <p className="font-medium">{notification.text}</p>
                            <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="w-full py-2 text-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </div>
              </div>
              
              {/* User menu */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-right">
                  <p className="font-medium text-gray-800">{userName}</p>
                  <p className="text-sm text-gray-600">{userEmail}</p>
                </div>
                <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 text-gray-800 font-medium rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mt-6 overflow-x-auto">
            <div className="flex space-x-2 min-w-max pb-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${activeSection === item.id 
                    ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl animate-slideUp`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                  <p className={`text-sm font-medium mt-2 ${card.textColor}`}>
                    ↑ {card.change} from last month
                  </p>
                </div>
                <div className={`${card.bgColor} p-4 rounded-xl`}>
                  <span className="text-3xl">{card.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`bg-linear-to-r ${action.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center`}
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <span className="text-4xl mb-3">{action.icon}</span>
                <span className="font-semibold text-lg">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content based on active section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
          {activeSection === 'dashboard' && (
            <DashboardSection bookings={bookings} stats={stats} />
          )}
          
          {activeSection === 'bookings' && (
            <BookingsSection 
              bookings={bookings} 
              handleStatusChange={handleStatusChange}
            />
          )}
          
          {activeSection === 'new-booking' && (
            <NewBookingSection 
              newBooking={newBooking}
              handleInputChange={handleInputChange}
              handleBookingSubmit={handleBookingSubmit}
            />
          )}
          
          {activeSection === 'reports' && (
            <ReportsSection stats={stats} />
          )}
          
          {activeSection === 'commissions' && (
            <CommissionsSection stats={stats} />
          )}
          
          {activeSection === 'support' && (
            <SupportSection />
          )}
        </div>
      </main>
      
     
    </div>
  );

  // Dashboard Section Component
  const DashboardSection = ({ bookings, stats }) => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent bookings */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-600 font-medium">Customer</th>
                    <th className="text-left py-3 text-gray-600 font-medium">Destination</th>
                    <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                    <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                    <th className="text-left py-3 text-gray-600 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map(booking => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="font-medium">{booking.customer}</div>
                        <div className="text-sm text-gray-500">{booking.type}</div>
                      </td>
                      <td className="py-4 font-medium">{booking.destination}</td>
                      <td className="py-4 text-gray-600">{booking.date}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Upcoming flights */}
        <div>
          <div className="bg-linear-to-br from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-6">Upcoming Flights</h3>
            <div className="space-y-4">
              {[
                { code: 'AC-789', destination: 'New York', time: '10:30 AM', date: 'Dec 15' },
                { code: 'AC-456', destination: 'London', time: '2:15 PM', date: 'Dec 18' },
                { code: 'AC-123', destination: 'Tokyo', time: '8:45 PM', date: 'Dec 20' },
              ].map((flight, index) => (
                <div 
                  key={index} 
                  className="bg-white/20 p-4 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold">{flight.code}</div>
                    <div className="text-sm">{flight.date}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{flight.destination}</div>
                      <div className="text-sm opacity-80">Departure: {flight.time}</div>
                    </div>
                    <div className="text-2xl">✈️</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors font-medium">
              View All Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Bookings Section Component
  const BookingsSection = ({ bookings, handleStatusChange }) => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl transition-colors font-medium">
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium">
            Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-gray-600 font-medium">Booking ID</th>
              <th className="text-left py-3 text-gray-600 font-medium">Customer</th>
              <th className="text-left py-3 text-gray-600 font-medium">Destination</th>
              <th className="text-left py-3 text-gray-600 font-medium">Date</th>
              <th className="text-left py-3 text-gray-600 font-medium">Type</th>
              <th className="text-left py-3 text-gray-600 font-medium">Price</th>
              <th className="text-left py-3 text-gray-600 font-medium">Status</th>
              <th className="text-left py-3 text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 font-medium">#{booking.id}</td>
                <td className="py-4">
                  <div className="font-medium">{booking.customer}</div>
                  <div className="text-sm text-gray-500">{booking.flight}</div>
                </td>
                <td className="py-4 font-medium">{booking.destination}</td>
                <td className="py-4 text-gray-600">{booking.date}</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {booking.type}
                  </span>
                </td>
                <td className="py-4 font-bold text-gray-800">{booking.price}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                      className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm transition-colors"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => handleStatusChange(booking.id, 'Cancelled')}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm transition-colors">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // New Booking Section Component
  const NewBookingSection = ({ newBooking, handleInputChange, handleBookingSubmit }) => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Booking</h2>
      
      <form onSubmit={handleBookingSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Details */}
          <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={newBooking.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={newBooking.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="customer@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={newBooking.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Trip Details */}
          <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Trip Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Trip Type</label>
                <select
                  name="tripType"
                  value={newBooking.tripType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="Flight">Flight</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Flight + Hotel">Flight + Hotel</option>
                  <option value="Car Rental">Car Rental</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Destination *</label>
                <input
                  type="text"
                  name="destination"
                  value={newBooking.destination}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="New York, USA"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Departure Date *</label>
                <input
                  type="date"
                  name="departureDate"
                  value={newBooking.departureDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={newBooking.returnDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Passengers</label>
                <select
                  name="passengers"
                  value={newBooking.passengers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Class</label>
                <select
                  name="class"
                  value={newBooking.class}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all duration-300 hover:shadow-lg"
              onClick={() => {
                setNewBooking({
                  customerName: '',
                  email: '',
                  phone: '',
                  tripType: 'Flight',
                  destination: '',
                  departureDate: '',
                  returnDate: '',
                  passengers: 1,
                  class: 'Economy',
                });
              }}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
            >
              Create Booking
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  // Reports Section Component
  const ReportsSection = ({ stats }) => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics & Reports</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance metrics */}
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            {[
              { label: 'Booking Conversion Rate', value: '68%', progress: 68, color: 'bg-green-500' },
              { label: 'Customer Satisfaction', value: stats.customerSatisfaction, progress: 96, color: 'bg-blue-500' },
              { label: 'Repeat Customers', value: '42%', progress: 42, color: 'bg-purple-500' },
              { label: 'Commission Growth', value: '+10.2%', progress: 72, color: 'bg-cyan-500' },
            ].map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">{metric.label}</span>
                  <span className="font-bold text-gray-800">{metric.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`${metric.color} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${metric.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Monthly earnings */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Earnings</h3>
          <div className="space-y-4">
            {[
              { month: 'January', earnings: 4200, commission: 420 },
              { month: 'February', earnings: 5200, commission: 520 },
              { month: 'March', earnings: 4800, commission: 480 },
              { month: 'April', earnings: 6100, commission: 610 },
              { month: 'May', earnings: 5500, commission: 550 },
              { month: 'June', earnings: 7200, commission: 720 },
            ].map((monthData, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="font-medium">{monthData.month}</div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">${monthData.earnings.toLocaleString()}</div>
                  <div className="text-sm text-green-600">Commission: ${monthData.commission}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );

  // Commissions Section Component
  const CommissionsSection = ({ stats }) => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Commission Tracking</h2>
      
      <div className="bg-linear-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">Total Commission Earned</h3>
            <p className="opacity-90">Year-to-date commission earnings</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-5xl font-bold">{stats.commission}</div>
            <p className="text-center opacity-90 mt-2">+10.2% from last year</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Pending Commission', amount: '$1,250', status: 'pending', description: 'Awaiting payment' },
          { title: 'Paid This Month', amount: '$2,850', status: 'paid', description: 'Received on Dec 1' },
          { title: 'Next Payout', amount: '$1,820', status: 'upcoming', description: 'Expected Dec 15' },
        ].map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
            <h4 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h4>
            <div className="text-3xl font-bold text-gray-800 mb-2">{item.amount}</div>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <button className={`w-full py-3 rounded-xl font-medium transition-colors ${
              item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
              item.status === 'paid' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
              'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}>
              {item.status === 'pending' ? 'View Details' :
               item.status === 'paid' ? 'Download Invoice' :
               'Set Up Payment'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Support Section Component
  const SupportSection = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Partner Support</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact support */}
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Support</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Phone Support</h4>
                <p className="text-gray-600">+1 (800) 123-4567</p>
                <p className="text-sm text-gray-500">Available 24/7 for urgent issues</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✉️</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Email Support</h4>
                <p className="text-gray-600">partners@aircontrip.com</p>
                <p className="text-sm text-gray-500">Response within 2 business hours</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Live Chat</h4>
                <p className="text-gray-600">Available in portal</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resources */}
        <div className="bg-white border border-gray-200 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Resources & Training</h3>
          <div className="space-y-4">
            {[
              { title: 'Partner Training Portal', icon: '🎓' },
              { title: 'Marketing Materials', icon: '📢' },
              { title: 'Booking System Guide', icon: '📖' },
              { title: 'Commission Policy', icon: '💰' },
              { title: 'Brand Guidelines', icon: '🎨' },
            ].map((resource, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{resource.icon}</span>
                  <span className="font-medium text-gray-800">{resource.title}</span>
                </div>
                <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
            Access All Resources
          </button>
        </div>
      </div>
    </div>
  );

  return isLoggedIn ? <Portal /> : <LoginForm />;
};

export default AircontripPartnerPortal;