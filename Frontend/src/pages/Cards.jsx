import React, { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const destinations = [
  {
    id: 1,
    title: "New Delhi and NCR",
    count: "12,786 accommodations",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
  },
  {
    id: 2,
    title: "Goa",
    count: "9,254 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/11304/077a5dc2a344a604731be86537916ba0.jpg?ce=0&s=375x&ar=1x1",
  },
  {
    id: 3,
    title: "Bangalore",
    count: "5,372 accommodations",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2",
  },
  {
    id: 4,
    title: "Mumbai",
    count: "4,177 accommodations",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
  },
  {
    id:5,
    title:"Hyderabad",
    count:"2,735 accommodations",
    image:"https://pix6.agoda.net/geo/city/8801/1_8801_02.jpg?ca=6&ce=1&s=375x&ar=1x1"

  },
   {
    id:6,
    title:"Chennie",
    count:"2,832 accommodations",
    image:"https://pix6.agoda.net/geo/city/17269/1_17269_02.jpg?ca=6&ce=1&s=375x&ar=1x1"

  },
   {
    id:7,
    title:"Hyderabad",
    count:"2,735 accommodations",
    image:"https://pix6.agoda.net/geo/city/8845/017f7c5548e391397f2be20f88df0b2c.jpg?ce=0&s=375x&ar=1x1"

  },
   {
    id:8,
    title:"Varanasi",
    count:"2,000 accommodations",
    image:"https://pix6.agoda.net/geo/city/3005/1_3005_02.jpg?ca=6&ce=1&s=375x&ar=1x1"

  },
  {
    id:9,
    title:"Pune",
    count:"2,494 accommodations",
    image:"https://pix6.agoda.net/geo/city/16854/0abc435fa78c2ca6fb4cb5ec86af89d0.jpg?ce=0&s=375x&ar=1x1"
  },
   {
    id:10,
    title:"Kochi",
    count:"2,165 accommodations",
    image:"https://pix6.agoda.net/geo/city/12722/1_12722_02.jpg?ca=6&ce=1&s=375x&ar=1x1"
  },
   
];

export default function TopDestinationsSlider() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 320;
    sliderRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-6 relative">
  {/* Heading */}
 <h2 className="
  text-[16px]       
  sm:text-[18px]    
  md:text-3xl       
  lg:text-4xl      
  font-bold
  mt-8              
  sm:mt-10          
  md:mt-12         
  lg:mt-20        
  mb-4
  md:mb-6
  min-[540px]:mt-65
  min-[412px]:mt-20
  min-[344px]:mt-20
  min-[375px]:mt-73
  min-[390px]:mt-35
  min-[360px]:mt-60
  leading-tight
  sm:leading-snug
  text-center
  md:text-left
  px-4
">
  Top destinations in India
</h2>


  {/* Left Button */}
  <button
    onClick={() => scroll("left")}
    className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 z-10
               bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
  >
    <ChevronLeft />
  </button>

  {/* Slider */}
  <div
    ref={sliderRef}
    className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4"
  >
    {destinations.map((item) => (
      <div
        key={item.id}
        className="min-w-[200px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[300px]"
      >
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src={item.image}
            alt={item.title}
            className="h-48 sm:h-56 md:h-60 lg:h-70 w-full object-cover"
          />
        </div>

        <div className="mt-2 sm:mt-3 text-center md:text-left">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg">
            {item.title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm">
            {item.count}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Right Button */}
  <button
    onClick={() => scroll("right")}
    className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10
               bg-white shadow-lg p-2 rounded-full hover:bg-gray-100"
  >
    <ChevronRight />
  </button>
</div>

  );
}
