import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const properties = [
  {
    id: 1,
    image:
      "https://cdn6.agoda.net/images/WebCampaign/20250729_th_flagshipstoreaccor_2/home_banner_web/en-us.png",
    
  },
  {
    id: 2,
    image:
      "https://cdn6.agoda.net/images/WebCampaign/20250724_in_oliveindia/home_banner_web/en-us.png",
    
  },
  {
    id: 3,
    image:
      "https://cdn6.agoda.net/images/WebCampaign/20251212_mv_crown&champa/home_banner_web/en-us.png",
    
  },
  {
    id: 4,
    image:
      "https://cdn6.agoda.net/images/WebCampaign/20250903_th_absolute/home_banner_web/en-us.png",
    
  },
  {
    id: 5,
    image:
      "https://cdn6.agoda.net/images/WebCampaign/20251119_uk_clermont/home_banner_web/en-us.png",
    
  },
 
];

export default function PropertiesYoullLike() {
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
      <div className="px-4 sm:px-6 md:px-10 mb-4">
        <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold">
          Properties we think you&apos;ll like
        </h2>
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
        {properties.map((item) => (
          <div
            key={item.id}
            className="
              min-w-[260px]
              sm:min-w-[340px]
              md:min-w-[420px]
              h-[180px]
              sm:h-[200px]
              md:h-[220px]
              rounded-2xl
              overflow-hidden
              relative
              flex-shrink-0
              shadow-md
            "
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* GRADIENT OVERLAY */}
            <div
              className={`absolute inset-0 bg-linear-to-r ${item.bg} opacity-85`}
            />

            {/* CONTENT */}
            
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
