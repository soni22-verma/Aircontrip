// PressPage.jsx
import React, { useState } from 'react';
import { 
  Newspaper, 
  Users, 
  Calendar, 
  Award, 
  Download, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  FileText
} from 'lucide-react';

const PressPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const pressReleases = [
    {
      id: 1,
      title: "TicketFlow Announces Major Platform Upgrade with AI-Powered Recommendations",
      date: "2024-03-15",
      category: "product",
      summary: "New AI features provide personalized event recommendations to users",
      link: "#"
    },
    {
      id: 2,
      title: "TicketFlow Partners with 50+ Major Venues Nationwide",
      date: "2024-02-28",
      category: "partnership",
      summary: "Expanded venue network provides access to exclusive events",
      link: "#"
    },
    {
      id: 3,
      title: "Company Reaches 1 Million Active Users Milestone",
      date: "2024-01-10",
      category: "milestone",
      summary: "Rapid user growth demonstrates market leadership",
      link: "#"
    },
    {
      id: 4,
      title: "TicketFlow Wins 'Best Ticketing Platform 2024' Award",
      date: "2024-01-05",
      category: "award",
      summary: "Recognition for innovation and user experience",
      link: "#"
    },
    {
      id: 5,
      title: "New Mobile App Launch with Enhanced Features",
      date: "2023-12-15",
      category: "product",
      summary: "Redesigned app offers smoother booking experience",
      link: "#"
    }
  ];

  const mediaCoverage = [
    {
      outlet: "TechCrunch",
      title: "How TicketFlow is Revolutionizing Event Ticketing",
      date: "2024-03-10",
      logo: "TC",
      link: "#"
    },
    {
      outlet: "Forbes",
      title: "The Future of Digital Ticketing: TicketFlow's Approach",
      date: "2024-02-22",
      logo: "F",
      link: "#"
    },
    {
      outlet: "Business Insider",
      title: "TicketFlow's Growth Strategy in Competitive Market",
      date: "2024-01-30",
      logo: "BI",
      link: "#"
    },
    {
      outlet: "The Verge",
      title: "Simplifying Event Discovery with Smart Technology",
      date: "2023-12-05",
      logo: "TV",
      link: "#"
    }
  ];

  const pressKit = [
    { name: "Company Logo Pack", format: "ZIP", size: "25 MB", icon: FileText },
    { name: "Brand Guidelines", format: "PDF", size: "8 MB", icon: FileText },
    { name: "Executive Team Photos", format: "ZIP", size: "45 MB", icon: Users },
    { name: "Product Screenshots", format: "ZIP", size: "32 MB", icon: FileText },
    { name: "Company Fact Sheet", format: "PDF", size: "2 MB", icon: FileText }
  ];

  const leadershipTeam = [
    { name: "Sarah Johnson", title: "CEO", bio: "Former VP at EventTech Inc." },
    { name: "Michael Chen", title: "CTO", bio: "Ex-Google, AI/ML expert" },
    { name: "Emily Rodriguez", title: "Head of Partnerships", bio: "15+ years in entertainment industry" }
  ];

  const stats = [
    { value: "1M+", label: "Active Users", icon: Users },
    { value: "50K+", label: "Events Listed", icon: Calendar },
    { value: "500+", label: "Venue Partners", icon: Award },
    { value: "98%", label: "Customer Satisfaction", icon: Award }
  ];

  const filteredPressReleases = activeFilter === 'all' 
    ? pressReleases 
    : pressReleases.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-linear-to-r from-blue-400 to-purple-500 text-white mt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center mb-4">
            <Newspaper className="w-8 h-8 mr-3" />
            <h1 className="text-4xl font-bold">Press Center</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Latest news, media resources, and information about TicketFlow - 
            Your trusted partner for seamless event ticketing experiences.
          </p>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex items-center">
              <div className="mr-4 p-3 bg-blue-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Press Releases */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Press Releases</h2>
                  <p className="text-gray-600">Official announcements and company news</p>
                </div>
                
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                  {['all', 'product', 'partnership', 'milestone', 'award'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === filter
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {filteredPressReleases.map((release) => (
                  <article key={release.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            release.category === 'product' ? 'bg-blue-100 text-blue-800' :
                            release.category === 'partnership' ? 'bg-green-100 text-green-800' :
                            release.category === 'milestone' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {release.category}
                          </span>
                          <span className="mx-3 text-gray-400">•</span>
                          <span className="text-gray-500 text-sm">{release.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{release.title}</h3>
                        <p className="text-gray-600 mb-4">{release.summary}</p>
                      </div>
                      <a
                        href={release.link}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4 md:mt-0 md:ml-6"
                      >
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Media Coverage */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Media Coverage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaCoverage.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                        {item.logo}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.outlet}</div>
                        <div className="text-sm text-gray-500">{item.date}</div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <a
                      href={item.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Read Article
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Press Kit */}
            <section className="bg-linear-to-br from-blue-50 to-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <div className="flex items-center mb-6">
                <Download className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Press Kit</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                {pressKit.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.format} • {item.size}</div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download All Assets
              </button>
            </section>

            {/* Contact Information */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Press Contact</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-lg mr-4">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <a href="mailto:press@ticketflow.com" className="text-blue-600 hover:text-blue-800">
                      press@ticketflow.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-lg mr-4">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <a href="tel:+11234567890" className="text-blue-600 hover:text-blue-800">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Media Inquiries</h3>
                <p className="text-gray-600 text-sm mb-4">
                  For interview requests, media partnerships, or other press-related questions, 
                  please contact our communications team.
                </p>
                <button className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  Contact Press Team
                </button>
              </div>
            </section>

            {/* Leadership Team */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Leadership Team</h2>
              
              <div className="space-y-4">
                {leadershipTeam.map((member, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-linear-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-blue-600 text-sm mb-1">{member.title}</div>
                      <div className="text-gray-600 text-sm">{member.bio}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* About Company */}
            <section className="bg-linear-to-br from-purple-50 to-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About TicketFlow</h2>
              <p className="text-gray-600 mb-4">
                TicketFlow is a leading ticketing platform that simplifies event discovery and ticket purchasing. 
                We connect millions of users with their favorite events through innovative technology.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-gray-700">Founded: 2020</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-gray-700">Employees: 150+</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-gray-700">Headquarters: San Francisco, CA</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

                
    </div>
  );
};

export default PressPage;