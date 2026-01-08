import React, { useState } from 'react';
import { CheckCircle, User, Calendar, MapPin, CreditCard } from 'lucide-react';

const TicketConfirmationPage = () => {
  const [bookingDetails] = useState({
    bookingId: 'BK20231215001',
    bookingDate: '15 Dec 2023',
    bookingTime: '14:30',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    totalAmount: '₹1,850',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN789456123'
  });

  const [travelers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 28,
      gender: 'Male',
      seatNo: 'A12',
      boardingPoint: 'Delhi',
      droppingPoint: 'Jaipur'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 25,
      gender: 'Female',
      seatNo: 'A13',
      boardingPoint: 'Delhi',
      droppingPoint: 'Jaipur'
    }
  ]);

  const [tripDetails] = useState({
    busName: 'Sharma Travels AC Sleeper',
    busType: 'AC Sleeper (2+1)',
    departure: {
      city: 'Delhi',
      terminal: 'ISBT Kashmere Gate',
      date: '20 Dec 2023',
      time: '22:30'
    },
    arrival: {
      city: 'Jaipur',
      terminal: 'Sindhi Camp Bus Stand',
      date: '21 Dec 2023',
      time: '05:45'
    },
    duration: '7h 15m',
    distance: '280 km'
  });

  const handlePrintTicket = () => {
    window.print();
  };

  const handleDownloadTicket = () => {
    alert('Ticket downloaded successfully!');
  };

  const handleGoToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-gray-600">
            Your ticket has been successfully booked. Details are below.
          </p>
        </div>

        {/* Booking Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Booking ID: <span className="text-blue-600">{bookingDetails.bookingId}</span>
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {bookingDetails.status}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                  <CreditCard className="w-4 h-4 mr-1" />
                  {bookingDetails.paymentStatus}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-gray-600">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">{bookingDetails.totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trip Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                Trip Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{tripDetails.departure.city}</p>
                    <p className="text-sm text-gray-600">{tripDetails.departure.terminal}</p>
                    <p className="text-lg font-bold mt-1">{tripDetails.departure.time}</p>
                    <p className="text-sm text-gray-600">{tripDetails.departure.date}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-1 bg-blue-300 mx-auto"></div>
                    <p className="text-sm text-gray-600 mt-2">{tripDetails.duration}</p>
                    <p className="text-xs text-gray-500">{tripDetails.distance}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{tripDetails.arrival.city}</p>
                    <p className="text-sm text-gray-600">{tripDetails.arrival.terminal}</p>
                    <p className="text-lg font-bold mt-1">{tripDetails.arrival.time}</p>
                    <p className="text-sm text-gray-600">{tripDetails.arrival.date}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Bus Name</p>
                    <p className="font-semibold">{tripDetails.busName}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Bus Type</p>
                    <p className="font-semibold">{tripDetails.busType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-500" />
                Traveler Details
              </h2>
              
              <div className="space-y-4">
                {travelers.map((traveler) => (
                  <div key={traveler.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{traveler.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>Age: {traveler.age}</span>
                          <span>Gender: {traveler.gender}</span>
                          <span>Seat: {traveler.seatNo}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Primary
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">Boarding Point</p>
                        <p className="font-medium">{traveler.boardingPoint}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">Dropping Point</p>
                        <p className="font-medium">{traveler.droppingPoint}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary & Actions */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                Booking Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Booking Date</span>
                  <span className="font-medium">{bookingDetails.bookingDate}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Booking Time</span>
                  <span className="font-medium">{bookingDetails.bookingTime}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{bookingDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-medium text-blue-600">{bookingDetails.transactionId}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span className="text-green-600">{bookingDetails.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">📌 Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Arrive at boarding point 30 minutes before departure
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Carry valid ID proof (Aadhar, Passport, or Driving License)
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  E-ticket SMS/Email will be accepted
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Mask is recommended during travel
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handlePrintTicket}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                🖨️ Print Ticket
              </button>
              <button
                onClick={handleDownloadTicket}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                📥 Download Ticket
              </button>
              <button
                onClick={handleGoToHome}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200"
              >
                🏠 Go to Home
              </button>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Need help? Contact our 24x7 customer support at 📞 1800-123-4567</p>
          <p className="mt-1">or email us at ✉️ support@busbooking.com</p>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmationPage;