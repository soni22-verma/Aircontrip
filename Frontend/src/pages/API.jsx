import React, { useState } from 'react';

const APIDocumentation = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('get-flights');
  const [apiKey, setApiKey] = useState('sk_live_1234567890abcdef');
  const [showApiKey, setShowApiKey] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // API Endpoints data
  const endpoints = [
    {
      id: 'get-flights',
      method: 'GET',
      path: '/api/v1/flights',
      title: 'Search Flights',
      description: 'Search for flights between destinations',
      parameters: [
        { name: 'from', type: 'string', required: true, description: 'Departure airport/city code' },
        { name: 'to', type: 'string', required: true, description: 'Arrival airport/city code' },
        { name: 'date', type: 'string', required: true, description: 'Departure date (YYYY-MM-DD)' },
        { name: 'passengers', type: 'number', required: false, description: 'Number of passengers (default: 1)' },
        { name: 'class', type: 'string', required: false, description: 'Cabin class: economy, premium, business, first' }
      ],
      exampleRequest: 'GET https://api.aircontrip.com/api/v1/flights?from=JFK&to=LAX&date=2023-12-25&passengers=2',
      exampleResponse: `{
  "status": "success",
  "data": {
    "flights": [
      {
        "id": "FL123",
        "airline": "AirContrip",
        "flightNumber": "AC456",
        "departure": "08:00",
        "arrival": "11:00",
        "duration": "5h 0m",
        "price": 299.99,
        "seatsAvailable": 24
      }
    ]
  }
}`
    },
    {
      id: 'book-flight',
      method: 'POST',
      path: '/api/v1/bookings',
      title: 'Book Flight',
      description: 'Create a new flight booking',
      parameters: [
        { name: 'flightId', type: 'string', required: true, description: 'Flight ID from search results' },
        { name: 'passengers', type: 'array', required: true, description: 'Array of passenger objects' },
        { name: 'contact', type: 'object', required: true, description: 'Contact information' },
        { name: 'payment', type: 'object', required: true, description: 'Payment details' }
      ],
      exampleRequest: `POST https://api.aircontrip.com/api/v1/bookings
{
  "flightId": "FL123",
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  ],
  "contact": {
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "payment": {
    "method": "card",
    "cardToken": "tok_visa"
  }
}`,
      exampleResponse: `{
  "status": "success",
  "data": {
    "bookingId": "BK7890123",
    "status": "confirmed",
    "totalAmount": 299.99,
    "currency": "USD",
    "passengers": [
      {
        "name": "John Doe",
        "seat": "12A"
      }
    ],
    "flightDetails": {
      "flightNumber": "AC456",
      "departure": "JFK",
      "arrival": "LAX",
      "date": "2023-12-25",
      "time": "08:00"
    }
  }
}`
    },
    {
      id: 'get-booking',
      method: 'GET',
      path: '/api/v1/bookings/{id}',
      title: 'Get Booking',
      description: 'Retrieve booking details by ID',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Booking ID' }
      ],
      exampleRequest: 'GET https://api.aircontrip.com/api/v1/bookings/BK7890123',
      exampleResponse: `{
  "status": "success",
  "data": {
    "bookingId": "BK7890123",
    "status": "confirmed",
    "createdAt": "2023-11-15T10:30:00Z",
    "totalAmount": 299.99,
    "flightDetails": {
      "flightNumber": "AC456",
      "departure": "JFK",
      "arrival": "LAX"
    }
  }
}`
    },
    {
      id: 'cancel-booking',
      method: 'DELETE',
      path: '/api/v1/bookings/{id}',
      title: 'Cancel Booking',
      description: 'Cancel an existing booking',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Booking ID' }
      ],
      exampleRequest: 'DELETE https://api.aircontrip.com/api/v1/bookings/BK7890123',
      exampleResponse: `{
  "status": "success",
  "data": {
    "bookingId": "BK7890123",
    "status": "cancelled",
    "refundAmount": 269.99,
    "message": "Booking cancelled successfully"
  }
}`
    },
    {
      id: 'get-airports',
      method: 'GET',
      path: '/api/v1/airports',
      title: 'List Airports',
      description: 'Get list of airports and cities',
      parameters: [
        { name: 'query', type: 'string', required: false, description: 'Search query for airport/city' },
        { name: 'country', type: 'string', required: false, description: 'Filter by country code' },
        { name: 'limit', type: 'number', required: false, description: 'Number of results (default: 20)' }
      ],
      exampleRequest: 'GET https://api.aircontrip.com/api/v1/airports?query=new+york&limit=5',
      exampleResponse: `{
  "status": "success",
  "data": {
    "airports": [
      {
        "code": "JFK",
        "name": "John F Kennedy International Airport",
        "city": "New York",
        "country": "United States"
      },
      {
        "code": "LGA",
        "name": "LaGuardia Airport",
        "city": "New York",
        "country": "United States"
      }
    ]
  }
}`
    }
  ];

  // Status codes
  const statusCodes = [
    { code: 200, text: 'OK', description: 'Request successful' },
    { code: 201, text: 'Created', description: 'Resource created successfully' },
    { code: 400, text: 'Bad Request', description: 'Invalid request parameters' },
    { code: 401, text: 'Unauthorized', description: 'Invalid or missing API key' },
    { code: 404, text: 'Not Found', description: 'Resource not found' },
    { code: 429, text: 'Too Many Requests', description: 'Rate limit exceeded' },
    { code: 500, text: 'Internal Server Error', description: 'Server error' }
  ];

  // Current endpoint
  const currentEndpoint = endpoints.find(e => e.id === activeEndpoint);

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Test API call
  const testApiCall = () => {
    setLoading(true);
    setResponse(null);
    
    // Simulate API call
    setTimeout(() => {
      setResponse({
        status: 'success',
        message: 'API test completed successfully',
        data: currentEndpoint.exampleResponse
      });
      setLoading(false);
    }, 1500);
  };

  // Generate API key
  const generateApiKey = () => {
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔌</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AirconTrip API</h1>
                <p className="text-gray-600">REST API Documentation</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => document.getElementById('quick-start').scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
              >
                Quick Start
              </button>
              <button 
                onClick={() => document.getElementById('playground').scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Try API
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* API Key Section */}
              <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Your API Key</h3>
                <div className="relative mb-4">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg font-mono text-sm"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showApiKey ? '🙈' : '👁️'}
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(apiKey)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Copy Key
                  </button>
                  <button
                    onClick={generateApiKey}
                    className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm transition-colors"
                  >
                    Generate New
                  </button>
                </div>
              </div>

              {/* Endpoints List */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 mb-4">Endpoints</h3>
                <nav className="space-y-2">
                  {endpoints.map((endpoint) => (
                    <button
                      key={endpoint.id}
                      onClick={() => setActiveEndpoint(endpoint.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeEndpoint === endpoint.id
                          ? 'bg-blue-50 border border-blue-200 text-blue-700'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold mr-3 ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                          endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <span className="truncate">{endpoint.title}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Links */}
              <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => document.getElementById('authentication').scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center text-gray-700 hover:text-blue-600 w-full text-left"
                  >
                    <span className="mr-2">🔑</span>
                    Authentication
                  </button>
                  <button 
                    onClick={() => document.getElementById('status-codes').scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center text-gray-700 hover:text-blue-600 w-full text-left"
                  >
                    <span className="mr-2">📋</span>
                    Status Codes
                  </button>
                  <button 
                    onClick={() => document.getElementById('rate-limiting').scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center text-gray-700 hover:text-blue-600 w-full text-left"
                  >
                    <span className="mr-2">⚡</span>
                    Rate Limiting
                  </button>
                  <button 
                    onClick={() => document.getElementById('support').scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center text-gray-700 hover:text-blue-600 w-full text-left"
                  >
                    <span className="mr-2">💬</span>
                    Support
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">AirconTrip REST API</h2>
              <p className="text-xl mb-6 opacity-90">
                Build amazing travel applications with our comprehensive flight booking API.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('quick-start').scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => window.open('https://github.com/aircontrip/api-examples', '_blank')}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-lg hover:bg-white/30 transition-colors"
                >
                  View Examples
                </button>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Quick Start</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">1. Get API Key</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-2">Sign up at dashboard.aircontrip.com to get your API key.</p>
                    <button 
                      onClick={() => copyToClipboard('curl -X GET https://api.aircontrip.com/api/v1/flights \\\n  -H "Authorization: Bearer YOUR_API_KEY"')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Copy Example →
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">2. Make Your First Request</h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>
{`curl -X GET https://api.aircontrip.com/api/v1/flights \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`}
                      </code>
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(`curl -X GET https://api.aircontrip.com/api/v1/flights \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Content-Type: application/json"`)}
                      className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                      Copy cURL Command
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">3. Start Building</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl mb-2">📚</div>
                      <h4 className="font-bold text-gray-900 mb-2">Documentation</h4>
                      <p className="text-gray-600 text-sm">Detailed API reference</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl mb-2">🛠️</div>
                      <h4 className="font-bold text-gray-900 mb-2">SDKs</h4>
                      <p className="text-gray-600 text-sm">Client libraries</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl mb-2">🎮</div>
                      <h4 className="font-bold text-gray-900 mb-2">Playground</h4>
                      <p className="text-gray-600 text-sm">Test API live</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔑 Authentication</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  All API requests require authentication using your API key. Include it in the Authorization header.
                </p>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    <code>
{`Authorization: Bearer ${apiKey}`}
                    </code>
                  </pre>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <p className="text-yellow-800 text-sm">
                      <strong>Important:</strong> Never expose your API key in client-side code. Use server-side implementation for production applications.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Endpoint Details */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{currentEndpoint.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  currentEndpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                  currentEndpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                  currentEndpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentEndpoint.method}
                </span>
              </div>
              
              <p className="text-gray-700 mb-8">{currentEndpoint.description}</p>
              
              <div className="space-y-8">
                {/* Endpoint Path */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Endpoint</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <code className="text-gray-800 font-mono">
                      https://api.aircontrip.com{currentEndpoint.path}
                    </code>
                  </div>
                </div>

                {/* Parameters */}
                {currentEndpoint.parameters.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Parameters</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Parameter</th>
                            <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Type</th>
                            <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Required</th>
                            <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentEndpoint.parameters.map((param, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-3 px-4 border-b border-gray-100">
                                <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">{param.name}</code>
                              </td>
                              <td className="py-3 px-4 border-b border-gray-100 text-gray-700">{param.type}</td>
                              <td className="py-3 px-4 border-b border-gray-100">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  param.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {param.required ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b border-gray-100 text-gray-700">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Example Request */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-gray-900">Example Request</h3>
                    <button 
                      onClick={() => copyToClipboard(currentEndpoint.exampleRequest)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <span className="mr-1">📋</span> Copy
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>{currentEndpoint.exampleRequest}</code>
                    </pre>
                  </div>
                </div>

                {/* Example Response */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-gray-900">Example Response</h3>
                    <button 
                      onClick={() => copyToClipboard(currentEndpoint.exampleResponse)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <span className="mr-1">📋</span> Copy
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>{currentEndpoint.exampleResponse}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* API Playground */}
            <section id="playground" className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎮 API Playground</h2>
              
              <div className="space-y-6">
                <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Test the API Live</h3>
                  <p className="text-gray-700 mb-6">
                    Try making a real API call with your credentials. Select an endpoint and click "Test API Call".
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <select 
                        value={activeEndpoint}
                        onChange={(e) => setActiveEndpoint(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {endpoints.map(endpoint => (
                          <option key={endpoint.id} value={endpoint.id}>
                            {endpoint.method} {endpoint.path} - {endpoint.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <button
                      onClick={testApiCall}
                      disabled={loading}
                      className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                        loading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg'
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Testing...
                        </span>
                      ) : 'Test API Call'}
                    </button>
                  </div>
                </div>

                {/* Response Display */}
                {response && (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-bold text-gray-900">API Response</h4>
                    </div>
                    <div className="p-4 bg-gray-900">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{JSON.stringify(response, null, 2)}</code>
                      </pre>
                    </div>
                    <div className="bg-gray-100 px-4 py-3 border-t border-gray-200">
                      <button 
                        onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Copy Response
                      </button>
                    </div>
                  </div>
                )}

                {/* Code Examples */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Code Examples</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-800 text-white px-4 py-3">
                        JavaScript (Fetch)
                      </div>
                      <div className="p-4">
                        <pre className="text-sm text-gray-700">
{`fetch('https://api.aircontrip.com${currentEndpoint.path}', {
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                        </pre>
                        <button 
                          onClick={() => copyToClipboard(`fetch('https://api.aircontrip.com${currentEndpoint.path}', {\n  headers: {\n    'Authorization': 'Bearer ${apiKey}',\n    'Content-Type': 'application/json'\n  }\n})\n.then(response => response.json())\n.then(data => console.log(data));`)}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Copy Code
                        </button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-800 text-white px-4 py-3">
                        Python (Requests)
                      </div>
                      <div className="p-4">
                        <pre className="text-sm text-gray-700">
{`import requests

headers = {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.aircontrip.com${currentEndpoint.path}',
    headers=headers
)

print(response.json())`}
                        </pre>
                        <button 
                          onClick={() => copyToClipboard(`import requests\n\nheaders = {\n    'Authorization': 'Bearer ${apiKey}',\n    'Content-Type': 'application/json'\n}\n\nresponse = requests.get(\n    'https://api.aircontrip.com${currentEndpoint.path}',\n    headers=headers\n)\n\nprint(response.json())`)}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Copy Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Status Codes */}
            <section id="status-codes" className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 HTTP Status Codes</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Code</th>
                      <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Text</th>
                      <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-700 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusCodes.map((status, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-100">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            status.code >= 200 && status.code < 300 ? 'bg-green-100 text-green-800' :
                            status.code >= 400 && status.code < 500 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {status.code}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-gray-100 text-gray-700 font-medium">{status.text}</td>
                        <td className="py-3 px-4 border-b border-gray-100 text-gray-700">{status.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Rate Limiting */}
            <section id="rate-limiting" className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Rate Limiting</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  API requests are limited to protect our infrastructure and ensure fair usage.
                </p>
                
                <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">100</div>
                      <div className="text-gray-700">Requests per minute</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">1,000</div>
                      <div className="text-gray-700">Requests per hour</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">10,000</div>
                      <div className="text-gray-700">Requests per day</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Enterprise plans have higher rate limits. Contact sales for custom requirements.
                  </p>
                </div>
              </div>
            </section>

            {/* Support */}
            <section id="support" className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💬 Support</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Need Help?</h3>
                  <p className="text-gray-700">
                    Our team is here to help you integrate with our API successfully.
                  </p>
                  
                  <div className="space-y-3">
                    <button className="flex items-center text-blue-600 hover:text-blue-800 w-full text-left">
                      <span className="mr-3">📚</span>
                      <div>
                        <div className="font-bold">Documentation</div>
                        <div className="text-sm text-gray-600">Complete API reference</div>
                      </div>
                    </button>
                    
                    <button className="flex items-center text-blue-600 hover:text-blue-800 w-full text-left">
                      <span className="mr-3">💬</span>
                      <div>
                        <div className="font-bold">Community Forum</div>
                        <div className="text-sm text-gray-600">Ask questions, share solutions</div>
                      </div>
                    </button>
                    
                    <button className="flex items-center text-blue-600 hover:text-blue-800 w-full text-left">
                      <span className="mr-3">📧</span>
                      <div>
                        <div className="font-bold">Email Support</div>
                        <div className="text-sm text-gray-600">api-support@aircontrip.com</div>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">SDK Libraries</h3>
                  <p className="text-gray-700">
                    Official client libraries for popular programming languages.
                  </p>
                  
                  <div className="space-y-3">
                    <button className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <span className="mr-3">⚛️</span>
                        <span>React SDK</span>
                      </div>
                      <span className="text-blue-600">Download</span>
                    </button>
                    
                    <button className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <span className="mr-3">🐍</span>
                        <span>Python SDK</span>
                      </div>
                      <span className="text-blue-600">Download</span>
                    </button>
                    
                    <button className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <span className="mr-3">🟨</span>
                        <span>Node.js SDK</span>
                      </div>
                      <span className="text-blue-600">Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default APIDocumentation;