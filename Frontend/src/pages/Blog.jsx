import React from "react";
import { Search } from "lucide-react";

const trends = [
  {
    id: 1,
    title: "5 Breathtaking Trips in the Himalayas | Dreamy Hikes in Asia",
    desc:
      "Check off trekking the Himalayas from your bucket list with any of these five incredibly scenic hikes through Asia...",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 2,
    title: "How Travelers Use Homestays Around the World",
    desc:
      "Fancy your own private villa? Or waking up in a quirky themed apartment? From homestays to villas...",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: 3,
    title:
      "Suffering from Nomophobia? Get Off-Grid on a Wellness Retreat",
    desc:
      "Since the advent of the smartphone and social media, we have become constantly switched on...",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];


const mainPosts = [
  {
    id: 1,
    title: "Indonesian Hot Spots | 5 Unique Destinations Worth...",
    desc:
      "Bali is often the first thing that comes to mind when travelers think of Indonesia. But did you know that Indonesia has the 2nd highest number of islands in the world? There're many more hidden gems yet to be discovered by travelers. Need a few ideas...",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 2,
    title: "6 Eco-Hotels in Asia Leading the Way to Greener Travel",
    desc:
      "Travelers are increasingly becoming eco-conscious – according to Agoda’s Tech and Travel Study, 58% of travelers prefer eco-friendly properties and 40% are willing to spend an extra $10 a night for the privilege. Contrary to popular misconceptions...",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 3,
    title: "Breathtaking Views in Indonesia | 5 Hotels You'll Not...",
    desc:
      "With over 17,500 islands, Indonesia has something for everyone: busy cities, vibrant culture, laid-back beaches and tranquil mountains. Here are five breathtaking views you can enjoy from your hotel room.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

const mostRead = [
  {
    id: 1,
    title: "Suffering from...",
    desc:
      "Since the advent of the smartphone and social media, we have become constantly...",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    title: "6 Eco-Friendly...",
    desc:
      "Balancing wanderlust and the environment: great getaway spots across Asia that are...",
    img: "https://www.agoda.com/wp-content/uploads/2023/08/6-eco-properties-Featured-1024x377.jpg   ",
  },
  {
    id: 3,
    title: "Top Movie Hotels in As...",
    desc:
      "You know you’re in for a special stay when your hotel has a movie credit on IMDB. More...",
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: 4,
    title: "7 One-of-a-Kind Hotel...",
    desc:
      "Fancy spending a night in a prison cell, shipping container...",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
];

const articles = [
  {
    id: 1,
    title: "7 One-of-a-Kind Hotels That Will Be the Star ...",
    desc:
      "Fancy spending a night in a prison cell, shipping container, cave or Tim Burton-style treehouse? These wonderful and wacky (and sometimes just plain weird) properties are tourist attractions in their own right.",
    img: "https://www.agoda.com/wp-content/uploads/2023/08/7-one-of-a-kind-hotels-Featured-1024x377.jpg",
  },
  {
    id: 2,
    title: "6 Eco-Friendly Properties in Asia Perfect for a...",
    desc:
      "Balancing wanderlust and the environment: great getaway spots across Asia that are green in more ways than one.",
    img: "https://www.agoda.com/wp-content/uploads/2023/08/6-eco-properties-Featured-1024x377.jpg",
  },
  {
    id: 3,
    title: "Top Movie Hotels in Asia | Stay Where Films...",
    desc:
      "You know you’re in for a special stay when your hotel has a movie credit on IMDB. More than just a place to lay your head for the night, these famous movie hotels in Asia immerse you in a cinematic mood for the ultimate escapism.",
    img: "https://www.agoda.com/wp-content/uploads/2023/08/Movie-hotels-Featured-1024x377.jpg",
  },
  {
    id: 4,
    title: "UNESCO World Heritage Sites in Japan (and 1...)",
    desc:
      "Castles, volcanoes, primeval forests — UNESCO World Heritage Sites in Japan encompass a fantastical range of landmarks and landscapes. With 25 heritage sites in total, and a growing number of natural areas with geopark designations, Japan really...",
    img: "https://www.agoda.com/wp-content/uploads/2023/08/Japan-UNESCO-Featured-1024x377.jpg",
  },
];

export default function TravelTrends() {
  return (
    <>
    <div className="w-full">
      {/* ================= HERO ================= */}
      <div
        className="relative h-[60vh] bg-cover bg-center mt-20"
        style={{
          backgroundImage:
            "url(https://www.agoda.com/wp-content/uploads/2023/04/travel-trends-header.png)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
          <h1 className="text-white text-4xl md:text-5xl font-semibold mb-8">
            Travel Trends
          </h1>

          {/* SEARCH BAR */}
          <div className="max-w-xl bg-white rounded-full flex items-center px-4 py-2 shadow-lg">
            <input
              type="text"
              placeholder="Explore Country, City guides"
              className="flex-1 outline-none px-2 text-gray-700"
            />
            <button className="bg-blue-600 text-white p-3 rounded-full">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= FEATURED ================= */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Featured Travel Trends
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trends.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg font-semibold">
                  {item.title}
                </h3>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.desc}
                </p>

                <button className="text-blue-600 text-sm font-semibold bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100">
                  READ MORE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

   <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-semibold">Travel Trends</h2>

          {mainPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full md:w-64 h-52 object-cover"
              />

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold underline mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.desc}
                  </p>
                </div>

                <button className="mt-4 w-fit px-5 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold hover:bg-blue-200">
                  READ MORE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Most read</h2>

          <div className="space-y-5">
            {mostRead.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-4 flex gap-4"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {item.desc}
                    </p>
                  </div>

                  <button className="mt-2 w-fit px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                    READ MORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

<div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {articles.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row overflow-hidden"
        >
          {/* IMAGE */}
          <img
            src={item.img}
            alt={item.title}
            className="w-full md:w-64 h-56 object-cover"
          />

          {/* CONTENT */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold underline mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>

            <button className="mt-4 w-fit px-6 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold hover:bg-blue-200 transition">
              READ MORE
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
