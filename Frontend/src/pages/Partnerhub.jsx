import React, { useState, useEffect } from 'react';

const ModernDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for metrics
  const [metrics, setMetrics] = useState({
    revenue: 125430,
    users: 8542,
    conversion: 4.8,
    growth: 12.5,
    engagement: 78,
    satisfaction: 92
  });
  
  // State for chart data
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [65, 78, 85, 92, 88, 94, 98]
  });
  
  // State for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Update Complete', message: 'Latest security patches installed', time: '10 min ago', type: 'success' },
    { id: 2, title: 'New User Signups', message: '42 new users joined today', time: '2 hours ago', type: 'info' },
    { id: 3, title: 'Server Alert', message: 'High CPU usage detected', time: '5 hours ago', type: 'warning' },
    { id: 4, title: 'Payment Processed', message: 'Monthly subscription renewed', time: '1 day ago', type: 'success' },
  ]);
  
  // State for recent activities
  const [activities, setActivities] = useState([
    { id: 1, action: 'New project created', user: 'Alex Johnson', time: '2 min ago', icon: '🚀' },
    { id: 2, action: 'File uploaded', user: 'Sarah Miller', time: '15 min ago', icon: '📎' },
    { id: 3, action: 'Task completed', user: 'Mike Wilson', time: '1 hour ago', icon: '✅' },
    { id: 4, action: 'Meeting scheduled', user: 'David Chen', time: '3 hours ago', icon: '📅' },
    { id: 5, action: 'Report generated', user: 'Emma Davis', time: '5 hours ago', icon: '📊' },
  ]);
  
  // State for projects
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', progress: 85, status: 'active', team: 4, deadline: 'Dec 25' },
    { id: 2, name: 'Mobile App Launch', progress: 65, status: 'active', team: 6, deadline: 'Jan 15' },
    { id: 3, name: 'Q4 Marketing', progress: 100, status: 'completed', team: 3, deadline: 'Nov 30' },
    { id: 4, name: 'Database Migration', progress: 30, status: 'delayed', team: 5, deadline: 'Jan 30' },
  ]);
  
  // State for toggles
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Stats cards data
  const statCards = [
    { 
      title: 'Total Revenue', 
      value: `$${metrics.revenue.toLocaleString()}`, 
      change: `+${metrics.growth}%`, 
      icon: '💰',
      color: 'green',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Active Users', 
      value: metrics.users.toLocaleString(), 
      change: '+5.2%', 
      icon: '👥',
      color: 'blue',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-100',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Conversion Rate', 
      value: `${metrics.conversion}%`, 
      change: '+0.8%', 
      icon: '📈',
      color: 'purple',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
      iconColor: 'text-purple-600'
    },
    { 
      title: 'Engagement', 
      value: `${metrics.engagement}%`, 
      change: '+3.1%', 
      icon: '❤️',
      color: 'pink',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-100',
      iconColor: 'text-pink-600'
    },
  ];
  
  // Quick actions
  const quickActions = [
    { title: 'Add Project', icon: '➕', color: 'from-blue-500 to-cyan-500' },
    { title: 'Create Report', icon: '📊', color: 'from-green-500 to-emerald-500' },
    { title: 'Schedule Meeting', icon: '📅', color: 'from-purple-500 to-violet-500' },
    { title: 'Send Message', icon: '💬', color: 'from-orange-500 to-amber-500' },
  ];
  
  // Tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];
  
  // Team members
  const teamMembers = [
    { name: 'Alex Johnson', role: 'Product Manager', avatar: '👨‍💼', status: 'online' },
    { name: 'Sarah Miller', role: 'UI/UX Designer', avatar: '👩‍🎨', status: 'online' },
    { name: 'Mike Wilson', role: 'Full Stack Dev', avatar: '👨‍💻', status: 'away' },
    { name: 'Emma Davis', role: 'Marketing Lead', avatar: '👩‍💼', status: 'online' },
    { name: 'David Chen', role: 'Data Analyst', avatar: '👨‍🔬', status: 'offline' },
  ];
  
  // Initialize with some animations
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Animate metric counters
      const animateCounter = (start, end, duration, setter) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const current = Math.floor(progress * (end - start) + start);
          setter(current);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };
      
      // Animate each metric
      animateCounter(0, metrics.revenue, 2000, (val) => {
        setMetrics(prev => ({ ...prev, revenue: val }));
      });
      
      animateCounter(0, metrics.users, 1500, (val) => {
        setMetrics(prev => ({ ...prev, users: val }));
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle notification dismissal
  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-linear-to-br from-gray-50 to-blue-50'}`}>
      {/* Header */}
    
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome banner */}
        <div className={`mb-8 rounded-2xl p-6 ${darkMode ? 'bg-linear-to-r from-gray-800 to-gray-900' : 'bg-linear-to-r from-blue-500 to-cyan-500'} text-white shadow-xl animate-slideUp`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 mt-30">
              <h2 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h2>
              <p className="opacity-90">Here's what's happening with your business today.</p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-bold">${metrics.revenue.toLocaleString()}</div>
              <p className="opacity-90">Revenue this month</p>
            </div>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div 
              key={index} 
              className={`${card.bgColor} ${darkMode ? 'border-gray-700' : 'border-gray-200'} border rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-2 animate-slideUp`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{card.title}</p>
                  <p className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{card.value}</p>
                  <p className={`text-sm font-medium mt-2 ${card.iconColor}`}>
                    ↑ {card.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-white'}`}>
                  <span className="text-3xl">{card.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick actions */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`bg-linear-to-r ${action.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center animate-slideUp`}
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <span className="text-4xl mb-4">{action.icon}</span>
                <span className="font-bold text-lg">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content based on active tab */}
        <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border animate-fadeIn`}>
          {activeTab === 'overview' && (
            <OverviewTab 
              darkMode={darkMode}
              chartData={chartData}
              notifications={notifications}
              dismissNotification={dismissNotification}
              activities={activities}
              projects={projects}
            />
          )}
          
          {activeTab === 'analytics' && (
            <AnalyticsTab 
              darkMode={darkMode}
              metrics={metrics}
              chartData={chartData}
            />
          )}
          
          {activeTab === 'projects' && (
            <ProjectsTab 
              darkMode={darkMode}
              projects={projects}
            />
          )}
          
          {activeTab === 'team' && (
            <TeamTab 
              darkMode={darkMode}
              teamMembers={teamMembers}
            />
          )}
          
          {activeTab === 'settings' && (
            <SettingsTab 
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          )}
        </div>
      </main>
      
      
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ darkMode, chartData, notifications, dismissNotification, activities, projects }) => (
  <div>
    <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left column - Chart & Notifications */}
      <div className="lg:col-span-2 space-y-8">
        {/* Performance Chart */}
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-gray-50 to-white border-gray-200'} border shadow-sm`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Performance Trend</h3>
            <select className={`px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border`}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          <div className="h-64">
            <div className="flex items-end h-48 space-x-2 mt-4">
              {chartData.values.map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-10 bg-linear-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all duration-1000 animate-bar-chart"
                    style={{ height: `${value}%` }}
                    data-value={value}
                  ></div>
                  <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{chartData.labels[index]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-gray-50 to-white border-gray-200'} border shadow-sm`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Notifications</h3>
            <button className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}>
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mt-1 ${
                      notification.type === 'success' ? 'bg-green-100 text-green-600' :
                      notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    } ${darkMode ? 'bg-opacity-20' : ''}`}>
                      {notification.type === 'success' ? '✅' : 
                       notification.type === 'warning' ? '⚠️' : 'ℹ️'}
                    </div>
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{notification.title}</h4>
                      <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{notification.message}</p>
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{notification.time}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => dismissNotification(notification.id)}
                    className={`p-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right column - Activity & Projects */}
      <div className="space-y-8">
        {/* Recent Activity */}
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-gray-50 to-white border-gray-200'} border shadow-sm`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
          
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-center p-3 rounded-lg hover:shadow-sm transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <span className="text-xl">{activity.icon}</span>
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.action}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.user}</span>
                    <span className={`mx-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className={`w-full mt-6 py-3 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-xl font-medium transition-colors`}>
            View All Activity
          </button>
        </div>
        
        {/* Project Progress */}
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-gray-50 to-white border-gray-200'} border shadow-sm`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Progress</h3>
          
          <div className="space-y-6">
            {projects.map(project => (
              <div key={project.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</span>
                  <span className={`text-sm ${project.status === 'active' ? 'text-green-600' : project.status === 'completed' ? 'text-blue-600' : 'text-yellow-600'}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        project.status === 'active' ? 'bg-linear-to-r from-blue-500 to-cyan-500' :
                        project.status === 'completed' ? 'bg-linear-to-r from-green-500 to-emerald-500' :
                        'bg-linear-to-r from-yellow-500 to-orange-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className={`ml-3 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.progress}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.team} members</span>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Due {project.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Analytics Tab Component
const AnalyticsTab = ({ darkMode, metrics, chartData }) => (
  <div>
    <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics & Insights</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Revenue Chart */}
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Revenue Growth</h3>
        
        <div className="h-64 flex items-end space-x-4">
          {[65, 78, 90, 88, 120, 110, 125].map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-8 bg-linear-to-t from-green-400 to-emerald-600 rounded-t-lg transition-all duration-1000 animate-bar-chart"
                style={{ height: `${value * 0.5}%` }}
              ></div>
              <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${(metrics.revenue / 1000).toFixed(1)}K</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Month</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>+{metrics.growth}%</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Growth</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>24</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>New Clients</div>
          </div>
        </div>
      </div>
      
      {/* User Metrics */}
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Metrics</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Active Users</span>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{metrics.users.toLocaleString()}</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div className="bg-linear-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Engagement Rate</span>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{metrics.engagement}%</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div className="bg-linear-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${metrics.engagement}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Satisfaction</span>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{metrics.satisfaction}%</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: `${metrics.satisfaction}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Conversion Rate</span>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{metrics.conversion}%</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div className="bg-linear-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: `${metrics.conversion * 10}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-blue-50 to-cyan-50 border-blue-200'} border shadow-sm`}>
        <div className="text-center">
          <div className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>📱</div>
          <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mobile Traffic</h4>
          <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>68%</div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>of total visits</p>
        </div>
      </div>
      
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-green-50 to-emerald-50 border-green-200'} border shadow-sm`}>
        <div className="text-center">
          <div className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>🌍</div>
          <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Global Reach</h4>
          <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>42</div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>countries</p>
        </div>
      </div>
      
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-purple-50 to-violet-50 border-purple-200'} border shadow-sm`}>
        <div className="text-center">
          <div className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>⏱️</div>
          <h4 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Avg. Session</h4>
          <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>4:32</div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>minutes</p>
        </div>
      </div>
    </div>
  </div>
);

// Projects Tab Component
const ProjectsTab = ({ darkMode, projects }) => (
  <div>
    <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Management</h2>
    
    <div className="mb-8 flex justify-between items-center">
      <div>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track and manage all your projects in one place</p>
      </div>
      <button className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        + New Project
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {projects.map(project => (
        <div 
          key={project.id} 
          className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-200 hover:bg-gray-50'} border shadow-sm hover:shadow-md transition-all duration-300`}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'active' ? 'bg-green-100 text-green-800' :
                  project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                } ${darkMode ? 'bg-opacity-20' : ''}`}>
                  {project.status}
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{project.team} members</span>
              </div>
            </div>
            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
              ⋮
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progress</span>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.progress}%</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  project.status === 'active' ? 'bg-linear-to-r from-blue-500 to-cyan-500' :
                  project.status === 'completed' ? 'bg-linear-to-r from-green-500 to-emerald-500' :
                  'bg-linear-to-r from-yellow-500 to-orange-500'
                }`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Deadline</div>
              <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.deadline}</div>
            </div>
            <div className="flex space-x-2">
              <button className={`px-4 py-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg font-medium transition-colors`}>
                View
              </button>
              <button className="px-4 py-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-md transition-all duration-300">
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-blue-50 to-cyan-50 border-blue-200'} border shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Need help with project management?</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Check out our project management guide and best practices.</p>
        </div>
        <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  </div>
);

// Team Tab Component
const TeamTab = ({ darkMode, teamMembers }) => (
  <div>
    <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Team Management</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {teamMembers.map((member, index) => (
        <div 
          key={index} 
          className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm hover:shadow-md transition-all duration-300`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className={`w-20 h-20 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center text-3xl mb-2`}>
                {member.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 ${darkMode ? 'border-gray-900' : 'border-white'} ${
                member.status === 'online' ? 'bg-green-500' :
                member.status === 'away' ? 'bg-yellow-500' :
                'bg-gray-500'
              }`}></div>
            </div>
            
            <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
            
            <div className="flex space-x-3">
              <button className={`p-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                💬
              </button>
              <button className={`p-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                📧
              </button>
              <button className={`p-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}>
                👤
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-purple-50 to-pink-50 border-purple-200'} border shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Team Performance</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>View detailed analytics and performance reports for your team.</p>
        </div>
        <button className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          View Reports
        </button>
      </div>
    </div>
  </div>
);

// Settings Tab Component
const SettingsTab = ({ darkMode, toggleDarkMode, sidebarOpen, toggleSidebar }) => (
  <div>
    <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Appearance Settings */}
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Switch between light and dark themes</p>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${darkMode ? 'bg-blue-500' : 'bg-gray-300'} transition-colors`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Sidebar</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Show or hide the sidebar</p>
            </div>
            <button 
              onClick={toggleSidebar}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${sidebarOpen ? 'bg-blue-500' : 'bg-gray-300'} transition-colors`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sidebarOpen ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Animations</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enable page transitions and effects</p>
            </div>
            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Account Settings */}
      <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account</h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Display Name</label>
            <input
              type="text"
              defaultValue="Alex Johnson"
              className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
          </div>
          
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
            <input
              type="email"
              defaultValue="alex@nexusdash.com"
              className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
          </div>
          
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Timezone</label>
            <select className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}>
              <option>(GMT-5) Eastern Time</option>
              <option>(GMT-8) Pacific Time</option>
              <option>(GMT+0) Greenwich Mean Time</option>
              <option>(GMT+1) Central European Time</option>
            </select>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Save Changes
          </button>
        </div>
      </div>
    </div>
    
    <div className={`mt-8 rounded-2xl p-6 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-linear-to-br from-red-50 to-orange-50 border-red-200'} border shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Danger Zone</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Irreversible actions. Proceed with caution.</p>
        </div>
        <button className="px-6 py-3 bg-linear-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          Delete Account
        </button>
      </div>
    </div>
  </div>
);

export default ModernDashboard;