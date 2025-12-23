import React from 'react';
import {Link} from "lucide-react"
import { 
  Settings, 
  CreditCard, 
  HelpCircle, 
  Shield, 
  Wallet, 
  Ticket,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  User,
  DollarSign,
  Train,
  Clock,
  CheckCircle,
  LogIn
} from 'lucide-react';

const MigoHelpPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Migo</span>
            </div>
           
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quick Guide</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Here's a compilation of all the travel queries you may have. We're pretty sure the answer to your question will be here.
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto mt-2">
            Just in case you don't see it, please use contact us option mentioned below and we will get back to you for resolution.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Help Topics */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Help Topics</h2>
            
            <div className="space-y-4">
              {/* Account Settings */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Account Settings</h3>
                    <p className="text-gray-600 mb-3">Update email, phone no. or password</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Migo Money */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Wallet className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Migo money</h3>
                    <p className="text-gray-600 mb-3">View Migo money transaction details and rules</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pre-booking Queries */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Pre-booking Queries</h3>
                    <p className="text-gray-600 mb-3">Facing issue while booking? Not able to book?</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      Get Help <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Migo Money Max */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Migo money max</h3>
                    <p className="text-gray-600 mb-3">Seamless instant refunds</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Migo Assured */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <Shield className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Migo assured</h3>
                    <p className="text-gray-600 mb-3">Get free cancellation benefits</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      View Benefits <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Migo AU Credit Card */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <CreditCard className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Migo AU Credit Card</h3>
                    <p className="text-gray-600 mb-3">Your Gateway To Exclusive Perks</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      Explore Perks <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Manage Payment Methods */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Manage Payment Methods</h3>
                    <p className="text-gray-600 mb-3">Delete saved cards or link/unlink wallets</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      Manage <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Metro Ticket Booking */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <Train className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Metro Ticket Booking</h3>
                    <p className="text-gray-600 mb-3">Metro Tickets Made Simple</p>
                    <button className="text-blue-600 font-medium flex items-center">
                      Book Now <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Support Options */}
          <div>
            {/* Recent Booking Help */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Need help with your recent booking?</h2>
              <p className="text-gray-600 mb-6">
                Access your booking details and get assistance with modifications, cancellations, or other queries.
              </p>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                  <User className="w-5 h-5 text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Booking Reference Number"
                    className="flex-1 outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <input
                    type="email"
                    placeholder="Registered Email Address"
                    className="flex-1 outline-none bg-transparent"
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                  Track Booking
                </button>
              </div>
            </div>

            {/* Login Now Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <a href="login"><LogIn className="w-8 h-8 text-blue-600" /></a>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Log in Now</h3>
                <p className="text-gray-600 mb-6">
                  Access your account to manage bookings, view history, and get personalized support.
                </p>
                <a href="singup">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700">
                  Sign In to Your Account
                </button>
                </a>
              </div>
            </div>

            {/* About Migo */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About Migo</h3>
              <p className="text-gray-600 mb-6">
                Migo is your trusted travel partner, committed to making your journey seamless and memorable. 
                From flights and hotels to trains and metros, we've got you covered with the best deals and services.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="font-medium">Secure Booking</span>
                  </div>
                  <p className="text-sm text-gray-600">100% secure payment gateway</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="font-medium">24/7 Support</span>
                  </div>
                  <p className="text-sm text-gray-600">Round the clock customer service</p>
                </div>
              </div>
            </div>

            {/* Contact Options */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
              
              <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-800">Call Us</div>
                  <div className="text-gray-600">1800-123-4567</div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-800">Email Us</div>
                  <div className="text-gray-600">support@migo.com</div>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <HelpCircle className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-800">Live Chat</div>
                  <div className="text-gray-600">Available 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-2">How do I cancel my booking?</h4>
              <p className="text-gray-600">
                You can cancel your booking from 'My Trips' section. Refunds are processed as per the cancellation policy.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-2">What is Migo money?</h4>
              <p className="text-gray-600">
                Migo money is a wallet feature that allows you to store money for faster bookings and get exclusive cashbacks.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-2">How to update my email address?</h4>
              <p className="text-gray-600">
                Go to Account Settings → Personal Information → Edit Email. You'll receive a verification link on new email.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-2">Is my payment information secure?</h4>
              <p className="text-gray-600">
                Yes, we use 256-bit SSL encryption and are PCI DSS compliant. Your payment details are always secure.
              </p>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default MigoHelpPage;