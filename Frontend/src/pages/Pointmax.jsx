import React, { useState } from "react";

export default function PointsMaxSearch() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("2026-01-01");
  const [checkOut, setCheckOut] = useState("2026-01-02");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  const handleSearch = () => {
    const data = {
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
    };

    console.log("Search Data 👉", data);
    alert(`Searching hotels in ${destination || "your destination"}`);
  };

  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://cdn6.agoda.net/images/desktop/pointsmax/pointsmax-landing-hero-banner-desktop@2x.jpg)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-6xl px-4">
        <h1 className="text-center text-white text-3xl font-semibold mb-8">
          PointsMAX
        </h1>

        {/* SEARCH BAR */}
        <div className="bg-white rounded-xl shadow-lg flex flex-col lg:flex-row overflow-hidden">
          {/* Destination */}
          <div className="flex items-center gap-3 px-5 py-4 flex-1 border-b lg:border-b-0 lg:border-r">
            <span className="text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Enter a destination or property"
              className="w-full outline-none text-gray-700"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Check In */}
          <div className="flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r">
            <span>📅</span>
            <input
              type="date"
              className="outline-none text-gray-700"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          {/* Check Out */}
          <div className="flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r">
            <span>📅</span>
            <input
              type="date"
              className="outline-none text-gray-700"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          {/* Guests */}
          <div className="flex items-center gap-3 px-5 py-4 border-b lg:border-b-0 lg:border-r">
            <span>👤</span>
            <select
              className="outline-none text-gray-700"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <span className="text-sm text-gray-500">
              {rooms} room
            </span>
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-10 py-4"
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>

    <div className="w-full bg-white py-16">
      {/* TOP ICON */}
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center text-purple-600 font-bold">
          P
        </div>
      </div>

      {/* HEADING */}
      <h1 className="text-center text-2xl font-semibold mb-4">
        Welcome to PointsMAX
      </h1>

      {/* DESCRIPTION */}
      <p className="max-w-3xl mx-auto text-center text-gray-700 text-sm leading-relaxed mb-14">
        PointsMAX is a new way to earn benefits when you book accommodation on
        Agoda.com. It’s simple – choose your favorite loyalty program, and
        you’ll earn points toward that program with every booking you make
        with us.
      </p>

      {/* EARN MORE POINTS ICON */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center text-purple-600 font-bold">
            P
          </div>
          <div className="absolute -inset-2 rounded-full border border-dashed border-gray-300"></div>
        </div>
      </div>

      <h2 className="text-center text-xl font-semibold mb-12">
        Earn more points
      </h2>

      {/* STEPS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* STEP 1 */}
        <div className="text-center">
          <img
            src="https://cdn6.agoda.net/images/mvc/PointsMAX/pointsmax-step1.jpg"
            alt="Select Program"
            className="rounded-md shadow mb-6 mx-auto"
          />
          <h3 className="font-semibold text-lg mb-2">Select Program</h3>
          <p className="text-sm text-gray-600">
            Select your favorite loyalty program of our 46 participating
            partners
          </p>
        </div>

        {/* STEP 2 */}
        <div className="text-center">
          <img
            src="https://cdn6.agoda.net/images/abtest/PRIUS/landing/pointsmax-step2.png"
            alt="Book hotels"
            className="rounded-md shadow mb-6 mx-auto"
          />
          <h3 className="font-semibold text-lg mb-2">Book hotels</h3>
          <p className="text-sm text-gray-600">
            Choose room from over 500,000 qualified hotels
          </p>
        </div>

        {/* STEP 3 */}
        <div className="text-center">
          <img
            src="https://cdn6.agoda.net/images/abtest/PRIUS/landing/pointsmax-step3.png"
            alt="Earn rewards"
            className="rounded-md shadow mb-6 mx-auto"
          />
          <h3 className="font-semibold text-lg mb-2">Earn rewards</h3>
          <p className="text-sm text-gray-600">
            Earn up to 6,000 points after completing your hotel stay
          </p>

          {/* CTA */}
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm font-medium transition">
            Earn up to 6,000 points
          </button>
        </div>
      </div>
    </div>

    <div className="w-full bg-white py-16 px-4">
      {/* ICON */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-1">
          <div className="w-6 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-4 bg-gray-300 rounded-full"></div>
          <svg
            className="w-6 h-6 text-purple-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2.5 19.5l19-7.5-19-7.5v6l13 1.5-13 1.5v6z" />
          </svg>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-center text-2xl font-semibold mb-2">
        Partner programs
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Select your preferred loyalty program to view the points you can earn.
      </p>

      {/* LOGOS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[
          "PhoenixMiles",
          "Singapore Airlines KrisFlyer",
          "Singapore Airlines KrisFlyer",
          "UOB Prvi Miles",
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 h-24 flex items-center justify-center rounded"
          >
            <span className="text-gray-500 font-medium text-sm">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* NOTES */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          Some important notes on all PointsMAX bookings:
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 leading-relaxed">
          <li>
            The membership ID of the intended beneficiary of the third party
            points must belong to the guest staying at the hotel (identified by
            the lead guest name);
          </li>
          <li>
            The rates for PointsMAX bookings may be different from regular
            bookings at the same conditions;
          </li>
          <li>
            PointsMAX booking rates cannot be broken down into a room rate and
            points component;
          </li>
          <li>
            Any applicable cancellation policy will apply in full to the
            PointsMAX bookings;
          </li>
          <li>
            Only reward points or miles can be collected, no status points or
            credits;
          </li>
          <li>
            PointsMAX bookings cannot be adjusted online using the Agoda
            self-service tool or by contacting Customer Service. To amend your
            reservations, you will need to cancel (subject to the cancellation
            conditions of the reservations) and re-book your reservation.
            Cancelled reservations and No show will not earn points, regardless
            of the financial cancellations conditions;
          </li>
          <li>
            Points cannot be exchanged in cash and are not cumulative with
            other offers;
          </li>
          <li>
            The Agoda price guarantee does not apply to PointsMAX bookings; and
          </li>
          <li>
            The terms and conditions of the third party loyalty programs will
            apply to such program.
          </li>
        </ul>

        <p className="text-sm text-gray-700 mt-4">
          Terms and Conditions apply, please consult for more details.
        </p>
      </div>
    </div>
    </>
  );
}
