import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Dubai",
    count: "19,464 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/2994/0c2aae36625e3e958684d0d4ae5b12d0.jpg?ce=0&s=375x&ar=1x1",
  },
  {
    id: 2,
    name: "Abu Dhabi",
    count: "721 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/10182/0d5aa026807856a268fc512c25ac53d3.jpg?ce=0&s=375x&ar=1x1",
  },
  {
    id: 3,
    name: "Sharjah",
    count: "323 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/8105/1_8105_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 4,
    name: "Bangkok",
    count: "12,048 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/9395/1_9395_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 5,
    name: "Pattaya",
    count: "11,909 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/8584/1_8584_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 6,
    name: "Bali",
    count: "32,908 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/17193/1_17193_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 7,
    name: "Fujairah",
    count: "153 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/4626/0fdc4eb62f66c72e3c1e41d7f55f274d.jpg?ce=0&s=375x&ar=1x1",
  },
  {
    id: 8,
    name: "Ajman",
    count: "264 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/5563/1_5563_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 9,
    name: "Macca",
    count: "970 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/78591/1_78591_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 10,
    name: "Kuala Lumpur",
    count: "19,902 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/14524/0435b08918aeb5e6ba2c933def5a3b57.jpg?ce=0&s=375x&ar=1x1",
  },
   {
    id: 11,
    name: "Singapore",
    count: "1,326 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/4064/1_4064_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
   {
    id: 12,
    name: "Ras AI Khaimah",
    count: "398 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/12050/1_12050_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 13,
    name: "Hanoi",
    count: "10,744 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/2758/065f4f2c9fa263611ab65239ecbeaff7.jpg?ce=0&s=375x&ar=1x1",
  },
  {
    id: 14,
    name: "Ho Chi Minn City",
    count: "15,546 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/13170/1_13170_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 15,
    name: "Doha",
    count: "660 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/4472/1_4472_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id: 16,
    name: "Medina",
    count: "745 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/23028/03467989ad0299d0ce13f5590d8c1577.jpg?ce=0&s=375x&ar=1x1",
  },
  {
    id: 17,
    name: "Krabi",
    count: "2,053 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/14865/1_14865_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
   {
    id: 18,
    name: "Muscat",
    count: "485 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/6445/1_6445_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
   {
    id: 19,
    name: "Da Nang",
    count: "5,534 accommodations",
    image:
      "https://pix6.agoda.net/geo/city/16440/1_16440_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  },
  {
    id:20,
    name:"Phuket",
    count:"12,290",
    image:"https://pix6.agoda.net/geo/city/16056/1_16056_02.jpg?ca=6&ce=1&s=375x&ar=1x1",
  }
];



export default function PopularDestinations() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 py-8 relative">
      {/* HEADER */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Popular destinations outside India
      </h2>

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2
                   bg-white shadow-lg p-2 rounded-full z-10"
      >
        <ChevronLeft />
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {destinations.map((item) => (
          <div
            key={item.id}
            className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px]
                       cursor-pointer"
          >
            {/* IMAGE */}
            <div className="rounded-2xl overflow-hidden h-[220px] sm:h-[250px]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>

            {/* TEXT */}
            <div className="mt-3 text-center">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2
                   bg-white shadow-lg p-2 rounded-full z-10"
      >
        <ChevronRight />
      </button>
    </section>
  );
}
