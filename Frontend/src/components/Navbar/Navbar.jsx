import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../services/endpoint";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    axios.defaults.headers.common["Authorization"] = `${token}`;
    if (token) {
      handleUserDetail();
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
    localStorage.removeItem("Authorization");
    navigate("/login");
  };

  const handleUserDetail = async () => {
    try {
      const res = await axios.get(api.user.userdata);

      console.log(res?.data?.user, "this is user")
      if (res?.data?.user?.email) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser && isLoggedIn) {
    }
  }, [isLoggedIn]);

  return (
    <nav className="w-full bg-gray-100 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link to="/">
            <img src="./logo.png" alt="logo" className="h-8 md:h-12" />
          </Link>

          {/* Mobile View */}
          <div className="md:hidden flex gap-2 items-center relative">
            {isLoggedIn && user ? (
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <CgProfile size={24} />
                  )}
                  <span className="font-semibold">{user.name}</span>
                </div>

              </div>
            ) : (
              <span className="font-semibold">
                <Link to="/login" className="hover:text-blue-500">Log in</Link>
                {" / "}
                <Link to="singup" className="hover:text-blue-500">Sign up</Link>
              </span>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center gap-10 text-gray-700">
            <Link to="/offer" className="flex items-center gap-2 hover:text-blue-500">
              <BiSolidOffer size={22} />
              <span className="font-semibold">Offers</span>
            </Link>

            <Link to="/customer" className="flex items-center gap-2 hover:text-blue-500">
              <BiSupport size={20} />
              <span className="font-semibold">Customer Service</span>
            </Link>

            {isLoggedIn && user ? (
              <div className="flex items-center gap-4">
                {/* Profile Section with Dropdown */}
                <div className="relative">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CgProfile size={24} className="text-blue-600" />
                      </div>
                    )}
                    <span className="font-semibold">{user.name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${showProfileDropdown ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Desktop Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 transform transition-all duration-200 ease-out">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <CgProfile size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <span className="font-medium">My Profile</span>
                          <p className="text-xs text-gray-500 mt-0.5">View and edit your profile</p>
                        </div>
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                      >
                        <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                          <AiOutlineLogout size={18} className="text-red-600" />
                        </div>
                        <div>
                          <span className="font-medium">Logout</span>
                          <p className="text-xs text-gray-500 mt-0.5">Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CgProfile size={22} />
                <span className="font-semibold">
                  <Link to="/login" className="hover:text-blue-500">Log in</Link>
                  {" / "}
                  <Link to="singup" className="hover:text-blue-500">Sign up</Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;