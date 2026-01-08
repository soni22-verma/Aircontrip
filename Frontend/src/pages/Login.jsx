import axios from "axios";
import React, { useState } from "react";
import api from "../../services/endpoint";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const[showpassword,setShowpassword] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api.user.login, { email, password });
       dispatch(setUser(response.data.user))
       console.log(response,"this is response")
      if (response.data.success) {
        localStorage.setItem("Authorization" , response?.data?.token)
        toast?.success("Login Successfully");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
     
  };

 

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT (HIDDEN ON MOBILE) */}
          <div className="hidden md:block text-white space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Want to become a <br /> Travel Agent?
            </h1>

            <p className="text-lg text-gray-200">
              Join our B2B platform for exclusive rates, top communication,
              and easy booking.
            </p>

            <p className="text-xl font-semibold">
              Start earning today!
            </p>
          </div>

          {/* RIGHT LOGIN CARD */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Already using AirconTrip?
                </h2>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">Login to your account</p>

              <form onSubmit={(e)=>handleFormSubmit(e)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="relative w-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Password
  </label>

  <input
    value={password}
    type={showpassword ? "text" : "password"}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter your password"
    className="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
    "
  />

  <button
    type="button"
    onClick={() => setShowpassword(!showpassword)}
    className=" absolute right-4 top-[60%] -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer
    "
  >
    {showpassword ? <FaEye /> : <FaEyeSlash />}
  </button>
</div>


                <button
                  type="submit"
                 
                  className="w-full bg-linear-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                
                  Login
                </button>
              </form>

              <div className="text-center mt-6">
                <a className="text-black text-sm hover:underline cursor-pointer">
                  Forgot your password?{" "}
                </a>
               <span
                    onClick={() => navigate("/singup")}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  >
                    signup
                  </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
