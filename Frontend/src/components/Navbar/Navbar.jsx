import React, { useState } from "react";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full  shadow-sm bg-gray-100 fixed top-0 left-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-3 px-4">

   
        <Link to="/"><img src="./logo.png" alt="logo" className="h-10 md:h-15 " /></Link>

        <button
          className="lg:hidden text-gray-700 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={20}/> : <HiMenu size={20}/>}
        </button>

        <div className="hidden lg:flex items-center gap-10 text-gray-700">

          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
            <BiSolidOffer size={25} />
            <span className="font-semibold">Offers</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
            <BiSupport size={25} />
            <span className="font-semibold">Customer Service</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <CgProfile size={25} />
            <span className="font-semibold">
             <Link to="login"><span className="hover:text-blue-500">Log in</span></Link>/
              <Link to="singup"><span className="hover:text-blue-500">Sign up</span></Link>
            </span>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-gray-100 w-full px-6 py-4 space-y-4 shadow-md">

          <div className="flex items-center gap-3 text-gray-700 cursor-pointer">
            <BiSolidOffer size={20} />
            <span className="font-semibold">Offers</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 cursor-pointer">
            <BiSupport size={20} />
            <span className="font-semibold">Customer Service</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 cursor-pointer">
            <CgProfile size={20} />
            <span className="font-semibold"><a href="login">Log in</a> / <a href="singup">Sign up</a></span>
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
