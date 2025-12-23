import React, { useState, useEffect } from "react";
import HomeDestop from "./HomeDestop";
import HomeMobile from "./HomeMobile";
import Cards from "../Cards";
import Cards1 from "../Cards1";
import Cards2 from "../Cards2";
import Cards3 from "../Cards3";
import Cards4 from "../Cards4";
import Banner from "../Banner";
import Cards5 from "../Cards5";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-18">
  {isMobile ? <HomeMobile /> : <HomeDestop />}

  {/* CENTER WRAPPER */}
  <div className="flex justify-center">
    <div className="w-full max-w-[1200px] px-4">
      <Cards />
      <Cards1 />
      <Cards2 />
      <Cards3 />
      <Cards4 />
      <Banner />
      <Cards5 />
    </div>
  </div>
</div>

  );
};

export default Home;
