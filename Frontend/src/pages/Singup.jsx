import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../services/endpoint";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(api.user.register, { name, email, phone, password, },
        
      );

      if (res.data.success) {
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("email already registered");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center mt-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >

      <div className="absolute inset-0 bg-black/50"></div>


      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">


          <div className="hidden md:block text-white space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Want to Become a <br /> Travel Agent?
            </h1>
            <p className="text-lg text-gray-200">
              Join our B2B platform for exclusive rates, best commissions,
              and easy bookings.
            </p>
            <p className="text-xl font-semibold">
              Start earning today!
            </p>
          </div>


          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-xl p-6 mt-15 sm:p-8 ">


              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">
                  Create your AirconTrip account
                </h2>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Register to start your journey
              </p>


              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showpassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowpassword(!showpassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showpassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
                >
                  Create Account
                </button>
              </form>


              <div className="text-center mt-2">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
   
  );
};

export default Signup;
