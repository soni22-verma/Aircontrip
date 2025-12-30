import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { MdHelpOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";



const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (!token) navigate("/login");
    axios.defaults.headers.common["Authorization"] = token;
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gray-100 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4">

        <div className="flex items-center justify-between py-5">


          <Link to="/">
            <img src="./logo.png" alt="logo" className="h-8 md:h-12" />
          </Link>


          <div className="lg:hidden flex gap-6 items-center">
            <Link
              to="/help-center"
              className="flex flex-row items-center text-gray-700 hover:text-blue-500"
            >
              <MdHelpOutline size={26} />
              <span className="text-sm font-semibold">Help</span>
            </Link>
            <Link
              to="/offer"
              className="flex flex-row items-center text-gray-700 hover:text-blue-500"
            >
              <BiSolidOffer size={26} />
              <span className="text-sm font-semibold">Offer</span>
            </Link>
          </div>


          <div className="hidden lg:flex items-center gap-10 text-gray-700">

            <Link to="/offer" className="flex items-center gap-2 hover:text-blue-500">
              <BiSolidOffer size={22} />
              <span className="font-semibold">Offers</span>
            </Link>

            <Link to="/customer" className="flex items-center gap-2 hover:text-blue-500">
              <BiSupport size={20} />
              <span className="font-semibold">Customer Service</span>
            </Link>

            <div className="flex items-center gap-2">
              <CgProfile size={22} />
              <span className="font-semibold">
                {isLoggedIn && user ? (
                  user.name
                ) : (
                  <>
                    <Link to="/login" className="hover:text-blue-500">Log in</Link>
                    {" / "}
                    <Link to="/singup" className="hover:text-blue-500">Sign up</Link>
                  </>
                )}
              </span>
            </div>

            {isLoggedIn && (
              <div
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
              >
                <AiOutlineLogout size={22} />
                <span className="font-semibold">Logout</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
