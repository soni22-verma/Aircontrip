import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiCustomerServiceFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { FaUserLarge } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../../services/endpoint";
import axios from "axios";
import { logoutUser } from "../../store/userSlice";

const Mobilebottom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [isopen, setisOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const[token,setToken]=useState(localStorage.getItem("token"));
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Token not found");
    return;
  }

  axios
    .get(api.user.userprofile, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log("PROFILE RESPONSE:", res.data);
      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.data.token);
      }
    })
    .catch((err) => {
      console.log("PROFILE ERROR:", err.response || err.message);
    });
}, [token]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const activeClass = "text-red-600";
  const inactiveClass = "text-gray-900";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md md:hidden">
      <div className="flex justify-around items-center py-2">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center ${isActive ? activeClass : inactiveClass}`}>
          <AiFillHome size={20} />
          <span className="text-sm">Home</span>
        </NavLink>

        <NavLink to="/customer" className={({ isActive }) => `flex flex-col items-center ${isActive ? activeClass : inactiveClass}`}>
          <RiCustomerServiceFill size={20} />
          <span className="text-sm">Support</span>
        </NavLink>

        {isLoggedIn && (
          <button onClick={handleLogout} className="flex flex-col items-center text-gray-900">
            <LuLogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        )}

        <button onClick={() => setisOpen(true)} className="flex flex-col items-center text-gray-900">
          <CgProfile size={20} />
          <span className="text-sm">Profile</span>
        </button>

        {/* Profile Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${
            isopen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 pt-10">
            <h2 className="text-xl font-bold flex gap-3">
              <FaUserLarge size={20} /> Your Profile
            </h2>
            <p className="mt-4">
              <b>Name:</b>{user.name}
            </p>
            <p>
              <b>Email:</b>{user.email}
            </p>
          </div>
          <button onClick={() => setisOpen(false)} className="py-2 px-4 m-3 bg-red-500 text-white rounded">
            Close
          </button>
        </div>

        {isopen && <div onClick={() => setisOpen(false)} className="fixed inset-0 bg-opacity-50"></div>}
      </div>
    </div>
  );
};

export default Mobilebottom;
