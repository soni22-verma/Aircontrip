import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {Link} from "react-router-dom"
import { useEffect } from "react";

const promotions = [
  {
    id: 1,
    image:
      "https://cdn6.agoda.net/images/WebCampaign/20241212_ss_christmassale/home_banner_web/en-us.png",
   
  },
  {
    id: 2,
    image:
      "https://cdn6.agoda.net/images/WebCampaign/dealspagebanner_hp_web/en-us.png",
   
  },
  {
    id: 3,
    image:
      "https://cdn6.agoda.net/images/WebCampaign/wcMM20230312/home_banner_web3/en-us.png",
    
  },
  {
    id:4,
    image:"https://cdn6.agoda.net/images/WebCampaign/pulse_globalcampaign_fromasiatotheworld/home_banner_web2/en-us.png",
  },
  {
     id:5,
     image:"https://cdn6.agoda.net/images/WebCampaign/20251216_in_7applehotels/home_banner_web/en-us.png",
  },
  {
     id:6,
     image:"https://cdn6.agoda.net/images/WebCampaign/20251216_in_fern/home_banner_web/en-us.png",
  },
  {
     id:7,
     image:"https://cdn6.agoda.net/images/WebCampaign/20251201_my_visitmalaysia/home_banner_web/en-us.png",
  },
  {
     id:8,
     image:"https://cdn6.agoda.net/images/WebCampaign/20250925_sg_happyweek/home_banner_web/en-us.png",
  },
  {
     id:9,
     image:"https://cdn6.agoda.net/images/WebCampaign/20250401_mv_peakdays/home_banner_web/en-us.png",
  },
  {
     id:10,
     image:"https://cdn6.agoda.net/images/WebCampaign/20250925_ph_saveandescape/home_banner_web/en-us.png",
  },
  {
     id:11,
     image:"https://cdn6.agoda.net/images/WebCampaign/20250707_ph_discover/home_banner_web/en-us.png",
  },
  {
     id:12,
     image:"https://cdn6.agoda.net/images/WebCampaign/20251028_vn_jingle/home_banner_web/en-us.png",
  },
  {
     id:13,
     image:"https://cdn6.agoda.net/images/WebCampaign/pulse_globalcampaign_midnightmadness/home_banner_web2/en-us.png",
  },
  {
     id:14,
     image:"https://cdn6.agoda.net/images/WebCampaign/20250925_eu_asiatoeurope/home_banner_web/en-us.png",
  },
  {
     id:15,
     image:"https://cdn6.agoda.net/images/WebCampaign/wcNO20230101/home_banner_web3/en-us.png",
  },
  
];

export default function AccommodationPromotions() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    sliderRef.current.scrollBy({
      left: dir === "right" ? 420 : -420,
      behavior: "smooth",
    });
  };

 
  return (
    <section className="relative py-6 sm:py-8">
  {/* HEADER */}
  <div className="px-4 sm:px-6 md:px-10 flex items-center justify-between mb-4 sm:mb-5">
    <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold">
      Accommodation Promotions
    </h2>

    <Link to="viewall">
    <button className="text-sm sm:text-base text-blue-600 font-medium hover:underline flex items-center gap-1">
      View all <ChevronRight size={16} />
    </button>
    </Link>
  </div>

  {/* LEFT ARROW */}
  <button
    onClick={() => scroll("left")}
    className="hidden lg:flex absolute left-2 top-[60%] -translate-y-1/2 z-10
               bg-white shadow-md p-2 rounded-full"
  >
    <ChevronLeft />
  </button>

  {/* SLIDER */}
  <div
    ref={sliderRef}
    className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth
               px-4 sm:px-6 md:px-10"
  >
    {promotions.map((item) => (
      <div
        key={item.id}
        className=" min-w-[240px] sm:min-w-[300px] md:min-w-[360px] lg:min-w-[420px] h-[160px] sm:h-[180px] md:h-[200px]
          rounded-xl
          overflow-hidden
          shadow-md
          bg-white
          flex-shrink-0
        "
      >
        <img
          src={item.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>

  {/* RIGHT ARROW */}
  <button
    onClick={() => scroll("right")}
    className="hidden lg:flex absolute right-2 top-[60%] -translate-y-1/2 z-10
               bg-white shadow-md p-2 rounded-full"
  >
    <ChevronRight />
  </button>
</section>

  );
}
