import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


/* ================== TABS ================== */
const tabs = [
  "New Delhi and NCR",
  "Goa",
  "Bangalore",
  "Mumbai",
  "Hyderabad",
];

/* ================== HOMES DATA ================== */
const allHomes = [
  {
    id: 1,
    city: "New Delhi and NCR",
    name: "AIR by Ahuja Residences",
    location: "Gurgaon, New Delhi and NCR",
    price: "INR 4,246.84",
    rating: "8.8",
    image:
      "https://pix8.agoda.net/hotelImages/31008843/0/fc2a479a6781ee87274416d70a1a176b.jpg?ca=28&ce=0&s=375x",
  },
  {
    id: 2,
    city: "New Delhi and NCR",
    name: "StayVista Residences near Cyber City Hub w/ Gym",
    location: "Gurgaon, New Delhi and NCR",
    price: "INR 2,090.59",
    rating: "8.6",
    image:
      "https://pix8.agoda.net/hotelImages/76976615/0/c60d69f33318eaf7fc54c7a5adc68ce4.jpg?ce=3&s=375x",
  },
  {
    id: 3,
    city: "New Delhi and NCR",
    name: "YWCA International Guest House",
    location: "Central Delhi, New Delhi and NCR",
    price: "INR 4,200",
    rating: "7.8",
    image:
      "https://pix8.agoda.net/hotelImages/229/22991763/22991763_21030815530095320594.png?ca=17&ce=1&s=375x",
  },
  {
    id: 4,
    city: "New Delhi and NCR",
    name: "Sharangi stays",
    location: "Greater Noida, New Delhi and NCR",
    price: "INR 1,888.35",
    rating: "7.8",
    image:
      "https://pix8.agoda.net/hotelImages/63296479/0/19dd0830c094036996a568899cf18bfe.jpg?ce=0&s=375x",
  },

  /* ================== GOA ================== */
  {
    id: 5,
    city: "Goa",
    name: "Agonda Paradise",
    location: "Agonda, Goa",
    price: "INR 6,965.15",
    rating: "8.0",
    image:
      "https://pix8.agoda.net/hotelImages/23086433/0/d8c7b81b96a847d0139e97f003cf7dea.jpg?ce=3&s=375x",
  },
  {
    id: 6,
    city: "Goa",
    name: "Old Goa Residency",
    location: "Old Goa, Goa",
    price: "INR 1,388.48",
    rating: "7.5",
    image:
      "https://pix8.agoda.net/hotelImages/231/23136142/23136142_21032513240095689087.jpg?ca=18&ce=1&s=800x",
  },
  {
     id:7,
     city:"Goa",
     name:"Good sharped & Sabs Apartments & Rooms",
     location:"colva,goa",
     price:"INR 5,000",
     rating:"7.5",
     image:"https://q-xx.bstatic.com/xdata/images/hotel/max500/767306095.jpg?k=f2f41d5f833f3ae296ea60cc9c4b286cd28fc3c5e6d173e2ab2df90b475054e8&o=&s=375x",
  },

  /*====================Bangalore===================*/

  {
    id:8,
    city:"Bangalore",
    name:"Sliceinn Sylva ,Wilson Garden,Bangalore",
    location:"Kaemangala,Bnagalore",
    price:"INR 2,105.62",
    rating:"8.5",
    image:"https://pix8.agoda.net/hotelImages/72285127/0/7fd9c2b1048920c773ee1557c0af3942.jpg?ce=2&s=375x"
  },
  {
    id:9,
    city:"Bangalore",
    name:"BluO Studios,Bangalore",
    location:"Kaemangala,Bnagalore",
    price:"INR 4,016.36",
    rating:"8.9",
    image:"https://pix8.agoda.net/hotelImages/56199395/0/b1b56eeb27bb1a4dab15c2c6eb5e7516.jpg?ce=0&s=375x"
  },

  /*=================Mumbai=====================*/

  {
    id:10,
    city:"Mumbai",
    name:"Powai,Mumbai",
    location:"OSI Apartments Powai",
    price:"INR 3600",
    rating:"8.1",
    image:"https://q-xx.bstatic.com/xdata/images/hotel/max500/635225594.jpg?k=5a20e9fa7cf47f8a351a3e31b53a36170a02ebdb54c88e12c34c3fac4202efe5&o=&s=375x"
  },
   {
    id:11,
    city:"Mumbai",
    name:"Arnala Beach/Virar,Mumbai",
    location:"Lotus deluxe rooms",
    price:"INR 1,959.83",
    rating:"7.9",
    image:"https://pix8.agoda.net/hotelImages/56320006/0/94a139d2e4b2034952699cea4f8d79dd.jpg?ce=0&s=375x"
  },

  {
    id:12,
    city:"Mumbai",
    name:"Mira Bhayanda,Mumbai",
    location:"the Myriad Bussiness Hotels and Resraurents",
    price:"INR 2,782.27",
    rating:"7.8",
    image:"https://pix8.agoda.net/hotelImages/223/22356586/22356586_21020621400094844675.jpg?ca=17&ce=1&s=375x"
  },

  {
    id:13,
    city:"Mumbai",
    name:"Khar,Mumbai",
    location:"The Oroin Premium Suites",
    price:"INR 2,800.23",
    rating:"7.7",
    image:"https://pix8.agoda.net/hotelImages/59109146/-1/db2def4a90f51996e51d3004e2259e77.jpg?ce=0&s=375x"
  },

  /*=====================Hydrabad================*/

  {
    id:14,
    city:"Hyderabad",
    name:"Gachibowli,Hydrabad",
    location:"Priya Hydrabad",
    price:"INR 5,947.82",
    rating:"9.5",
    image:"https://pix8.agoda.net/hotelImages/68867887/0/319aefcc939785afc6069d8b23e8c64b.jpg?ce=2&s=375x"
  },
  {
    id:15,
    city:"Hyderabad",
    name:"Gachibowli,Hydrabad",
    location:"SID Royale",
    price:"INR 2,591.03",
    rating:"8.7",
    image:"https://pix8.agoda.net/hotelImages/63998273/-1/23beaef19044ff28e6dcb364e073245b.png?ce=0&s=375x"
  },
  {
    id:16,
    city:"Hyderabad",
    name:"Gachibowli,Hydrabad",
    location:"UNIQUE HOMESTAYS",
    price:"INR 1,527.21",
    rating:"8.3",
    image:"https://pix8.agoda.net/hotelImages/55330016/0/a011bd19ad77ab7ffc92293be88ab21c.jpg?ce=0&s=375x"
  },
  {
    id:17,
    city:"Hyderabad",
    name:"Gachibowli,Hydrabad",
    location:"Hitech Shiparamam Guest House",
    price:"INR 2,106.91",
    rating:"8.5",
    image:"https://pix8.agoda.net/hotelImages/41609911/-1/63a6641610c32569128d2befff1f0add.jpg?ce=0&s=375x"
  }

];


export default function FeaturedHomes() {
  const [activeTab, setActiveTab] = useState("New Delhi and NCR");

  const filteredHomes = allHomes.filter(
    (home) => home.city === activeTab
  );


  return (
    <section className="px-4 sm:px-6 md:px-10 py-8">
  
      <div className="mb-6">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4">
          Featured homes recommended for you
        </h2>

     
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-base sm:text-lg font-semibold whitespace-nowrap
                ${
                  activeTab === tab
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-700 hover:text-blue-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

     <AnimatePresence mode="wait">
  <motion.div
    key={activeTab} // ⭐ tab change detect karta hai
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
  >
    {filteredHomes.map((home) => (
      <div key={home.id} className="cursor-pointer group">
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={home.image}
            alt={home.name}
            className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
          />
          <span className="absolute top-2 right-2 bg-blue-700 text-white
                           text-sm font-semibold px-2 py-1 rounded-md">
            {home.rating}
          </span>
        </div>

        {/* CONTENT */}
        <div className="mt-3 space-y-1">
          <h3 className="font-bold text-sm sm:text-base line-clamp-2">
            {home.name}
          </h3>

          <p className="text-sm font-medium text-blue-800 flex items-center gap-1">
            <MapPin size={14} />
            {home.location}
          </p>

          <p className="text-xs text-gray-600">
            Per night before taxes and fees
          </p>

          <p className="text-red-700 font-bold">
            {home.price}
          </p>
        </div>
      </div>
    ))}
  </motion.div>
</AnimatePresence>


    
      <div className="mt-6 text-right">
        <button className="text-blue-600 font-medium hover:underline">
          See more ({activeTab}) properties →
        </button>
      </div>
    </section>
  );
}
