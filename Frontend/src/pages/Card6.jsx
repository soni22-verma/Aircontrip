import React from "react";

const routes = [
  {
    city: "Mumbai Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/dc24e926a99e52461efb8d18f7997ef8-mrphc.webp",
    to: ["Goa", "Delhi", "Bangalore", "Ahmedabad"],
  },
  {
    city: "Delhi Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/5045a405f1c4dc160abb069992707481-mtvgf.webp",
    to: ["Mumbai", "Goa", "Bangalore", "Pune"],
  },
  {
    city: "Kolkata Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/7ae33a491397e9e25bc483c319db02ac-irvie.webp",
    to: ["Mumbai", "Delhi", "Bangalore", "Bagdogra"],
  },
  {
    city: "Chennai Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/d189a6d913d42962e07dfc924d456118-kyimy.webp",
    to: ["Mumbai", "Delhi", "Madurai", "Coimbatore"],
  },
  {
    city: "Hyderabad Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/a5d4c86e624150e31f81469824653223-rihzk.webp",
    to: ["Mumbai", "Goa", "Bangalore", "Delhi"],
  },
  {
    city: "Ahmedabad Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/f3e32516219efd2fbfd2c0828b286616-qnoxi.webp",
    to: ["Mumbai", "Delhi", "Bangalore", "Goa"],
  },
  {
    city: "Bangalore Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/a243c27c42a89fd0ee5a5d4f56e9c6f1-jzcgw.webp",
    to: ["Mumbai", "Delhi", "Goa", "Hyderabad"],
  },
  {
    city: "Pune Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100,q_100/home/2fc754645e39a6eda0a659881c1487ca-lzhpq.webp",
    to: ["Goa", "Delhi", "Bangalore", "Nagpur"],
  },
  {
    city: "Goa Flights",
    img: "https://images.ixigo.com/image/upload/c_fill,w_100,h_100/home/8cd662828d6fe2d32765d398648cf4d6-djmjf.webp",
    to: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"],
  },
];

const PopularRoutes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Popular Flight Routes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border border-gray-500 rounded-xl p-4 hover:shadow-md transition"
          >
            <img
              src={route.img}
              alt={route.city}
              className="w-14 h-14 rounded-md object-cover"
            />

            <div>
              <h3 className="font-semibold text-lg">{route.city}</h3>

              <p className="text-sm text-gray-600">
                To:{" "}
                {route.to.map((city, i) => (
                  <span key={i} className="text-blue-600">
                    {city}
                    {i !== route.to.length - 1 && " • "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
