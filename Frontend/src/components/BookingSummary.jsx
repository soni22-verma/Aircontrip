import React from "react";

const BookingSummary = ({ bookingDetails }) => {

  if (!bookingDetails) {
    return (
      <div className="p-4 bg-gray-100 rounded-xl text-center text-gray-500">
        No booking selected
      </div>
    );
  }

  return (
    <div className="
      bg-linear-to-br from-blue-900 to-indigo-900 text-white
      rounded-2xl shadow-xl
      p-4 sm:p-6
      lg:sticky lg:top-6
      w-full
    ">
      {/* Title */}
      <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center justify-center sm:justify-start">
        <i className="fas fa-receipt mr-2 sm:mr-3"></i>
        Booking Summary
      </h3>

      {/* Route */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold">{bookingDetails.from}</h4>
            <p className="text-blue-200 text-sm">Departure</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="fas fa-plane text-xl sm:text-2xl text-blue-300"></i>
            <div className="w-16 sm:w-24 h-1 bg-blue-400 rounded-full my-1"></div>
            <p className="text-xs text-blue-200">{bookingDetails.duration}</p>
          </div>

          <div className="text-center sm:text-right">
            <h4 className="text-lg sm:text-xl font-bold">{bookingDetails.to}</h4>
            <p className="text-blue-200 text-sm">Arrival</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 sm:space-y-4 mb-6">
        {[
          ["Flight", bookingDetails.flightNo, "plane-departure"],
          ["Date", bookingDetails.date, "calendar-alt"],
          ["Time", bookingDetails.time, "clock"],
          ["Seat", bookingDetails.seat, "chair"],
        ].map(([label, value, icon]) => (
          <div key={label} className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-blue-200">
              <i className={`fas fa-${icon} mr-2`}></i>
              {label}
            </span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>

      {/* Fare */}
      <div className="border-t border-blue-700 pt-4 mb-5 text-sm sm:text-base">
        <h4 className="text-base sm:text-lg font-bold mb-3">Fare Breakdown</h4>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-blue-200">Base Fare</span>
            <span>₹3,500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">Taxes & Fees</span>
            <span>₹1,350</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-blue-700">
            <span>Total</span>
            <span className="text-lg">{bookingDetails.fare}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-blue-800/40 rounded-xl p-3 sm:p-4 text-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-blue-200">Booking Status</span>
          <span className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
            Confirmed
          </span>
        </div>
        <p className="text-blue-200 text-xs sm:text-sm">
          E-ticket will be sent to your email
        </p>
      </div>

      {/* Help */}
      <div className="mt-4 text-center text-xs sm:text-sm text-blue-300">
        <p>
          <i className="fas fa-headset mr-2"></i>
          +91 98765 43210
        </p>
        <p className="mt-1">
          <i className="far fa-clock mr-2"></i>
          24/7 Support
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
