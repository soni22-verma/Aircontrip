import React from "react";
import { useEffect,useState } from "react";
import { 
  Search, 
  Copy, 
  Check, 
  Tag, 
  CreditCard, 
  ChevronRight,
  X
} from 'lucide-react';


export default function TodayDeals() {
     useEffect(() => {
    
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, );

      const [checkedItems, setCheckedItems] = useState({
    hotels: false,
    flights: false,
    flightHotel: false,
    coupons: false,
    credit: false,
    campaigns: false,
    limited: false,
  });

      const isAnyChecked = Object.values(checkedItems).some(Boolean);
      const handleChange = (key) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  
  const handleClear = () => {
    setCheckedItems({
      hotels: false,
      flights: false,
      flightHotel: false,
      coupons: false,
      credit: false,
      campaigns: false,
      limited: false,
    });
  };


 
 const steps = [
    {
      id: 1,
      title:
        "Find a coupon and collect it. If there is a promotion code, don’t forget to copy it!",
      image:
        "https://cdn0.agoda.net/images/emailmarketing/js_elements/full-img-2x.png",
    },
    // {
    //   id: 2,
    //   title:
    //     "Search for properties with “Coupon applicable” label to use your coupons",
    //   image:
    //     "https://cdn-icons-png.flaticon.com/512/942/942748.png",
    // },
    // {
    //   id: 3,
    //   title:
    //     "Be sure to apply your coupon / promotion code before completing payment",
    //   image:
    //     "https://cdn-icons-png.flaticon.com/512/942/942759.png",
    // },
  ];






  

 
 


  return (
    <>
    <div className="w-full">

      {/* ===== TOP BANNER ===== */}
      <div className="w-full bg-linear-to-r from-purple-600 to-indigo-700 text-white py-28 px-4 relative overflow-hidden">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Today’s deals
        </h1>
        <p className="text-center mt-3 text-sm sm:text-base max-w-3xl mx-auto">
          Spontaneous savings. Available nowhere else. Bookmark this page and check back daily.
        </p>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ===== LEFT SIDEBAR ===== */}
          <div className="w-[280px]  p-4 rounded-xl ">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Applicable Products</h3>

        {isAnyChecked && (
          <button
            onClick={handleClear}
            className="text-blue-600 text-sm font-medium"
          >
            CLEAR
          </button>
        )}
      </div>

      {/* PRODUCTS */}
      <div className="space-y-3 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedItems.hotels}
            onChange={() => handleChange("hotels")}
          />
          Hotels & Homes (6)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedItems.flights}
            onChange={() => handleChange("flights")}
          />
          Flights (0)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedItems.flightHotel}
            onChange={() => handleChange("flightHotel")}
          />
          Flight + Hotel (0)
        </label>
      </div>

      {/* DEALS */}
      <h4 className="font-semibold mb-3">Deals</h4>
      <div className="space-y-3 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedItems.coupons}
            onChange={() => handleChange("coupons")}
          />
          Coupons (2)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedItems.credit}
            onChange={() => handleChange("credit")}
          />
          Credit Card (0)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedItems.campaigns}
            onChange={() => handleChange("campaigns")}
          />
          Special Campaigns (4)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedItems.limited}
            onChange={() => handleChange("limited")}
          />
          Limited Time Offers (3)
        </label>
      </div>

      {/* SEE ALL DEALS BUTTON */}
      {isAnyChecked && (
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium shadow">
          See all Deals
        </button>
      )}
    </div>

          {/* ===== RIGHT CONTENT ===== */}
          <section className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* CARD 1 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition overflow-hidden">
              <div className="bg-blue-200 h-60 flex items-center justify-center">
               <img src="https://cdn0.agoda.net/images/emailmarketing/contentcard/upto5_mspa.png"/>
              </div>
              <div className="p-5">
                <h4 className="font-semibold mb-2">
                  Up to ₹2,500 Off Hotels
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Expires in 3 days
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  CLAIM COUPON
                </button>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <div className="bg-green-200 h-60 flex items-center justify-center">
                <img src="https://cdn0.agoda.net/images/emailmarketing/contentcard/upto8_mspa.png"/>
              </div>
              <div className="p-5">
                <h4 className="font-semibold mb-2">
                  Up to ₹4,000 Off Hotels
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Min. spend ₹9,170 | Expires in 3 days
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  CLAIM COUPON
                </button>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <div className="bg-yellow-200 h-60 flex items-center justify-center">
                <img src="https://cdn0.agoda.net/images/emailmarketing/contentcard/blocklist-removal-web.png"/>
              </div>
              <div className="p-5">
                <h4 className="font-semibold mb-2">
                  Limited Time Price Drop
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Unlock special hotel rates at your dream destination.
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  ACTIVATE NOW
                </button>
              </div>
            </div>
            {/* card 4 */}

           
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <div className="bg-yellow-200 h-60 flex items-center justify-center">
                <img src="https://cdn0.agoda.net/images/emailmarketing/contentcard/Highlight_AgodaVIP_1.png"/>
              </div>
              <div className="p-5">
                <h4 className="font-semibold mb-2">
                  Limited Time Price Drop
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Unlock special hotel rates at your dream destination.
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  ACTIVATE NOW
                </button>
              </div>
            </div>

            {/* card 5 */}
          
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <div className="bg-yellow-200 h-60 flex items-center justify-center">
                <img src="https://cdn0.agoda.net/images/emailmarketing/contentcard/domestic-web.png"/>
              </div>
              <div className="p-5">
                <h4 className="font-semibold mb-2">
                  Limited Time Price Drop
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Unlock special hotel rates at your dream destination.
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  ACTIVATE NOW
                </button>
              </div>
            </div>
{/* 
            card 6 */}
<div className="bg-white  rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <div className="bg-yellow-200 h-60 flex items-center justify-center">
               <img src="https://cdn0.agoda.net/images/emailmarketing/contentcard/internationalDeals.png"/>
              </div>
              <div className="p-5">
                <h4 className="font-semibold mb-2">
                  Limited Time Price Drop
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Unlock special hotel rates at your dream destination.
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  ACTIVATE NOW
                </button>
              </div>
            </div>
       
       {/* card 7 */}

       <div className="bg-white  rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <div className="bg-yellow-200 h-60 flex items-center justify-center">
               <img src="https://cdn0.agoda.net/images/emailmarketing/contentcard/Web_Deals_Page_More_Deals.png"/>
              </div>
              <div className="p-5">
                <h4 className="font-semibold mb-2">
                  Limited Time Price Drop
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Unlock special hotel rates at your dream destination.
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  ACTIVATE NOW
                </button>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
    <section className="w-full bg-gray-100 shadow-xl py-6 px-4">
      {/* TITLE */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-14">
        How to Apply Coupons
      </h2>

      {/* STEPS */}
      <div className="max-w-6xl mx-auto ">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center"
          >
            {/* IMAGE WRAPPER */}
            <div className="relative mb-6">
              <div className="w-full flex items-center justify-center">
                <img
                  src={step.image}
                  alt="step"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* STEP NUMBER */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                
              </div>
            </div>

            {/* TEXT */}
            <p className="mt-6 text-gray-700 text-sm sm:text-base max-w-xs">
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </section>
   
    </>
  );
}
