import React from "react";

export default function PromoBanner() {
  return (
    <section className="px-4 sm:px-6 md:px-10 my-8">
      <div
        className="relative w-full h-[120px] sm:h-[160px] md:h-[200px]
                   rounded-xl overflow-hidden flex items-center"
        style={{
          backgroundImage:
            "url('https://tpc.googlesyndication.com/simgad/15370050502381143377')", // 👈 replace with your banner image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* DARK OVERLAY (optional) */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex items-center justify-between w-full px-4 sm:px-8 md:px-12">
          {/* LEFT (optional text / logo) */}
          

          {/* RIGHT BUTTON */}
          <button
            className="ml-auto bg-pink-600 hover:bg-pink-700
                       text-white font-bold
                       px-5 py-2 md:px-7 md:py-3
                       rounded-full shadow-lg
                       transition-all"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </section>
  );
}
