import axios from "axios";
import React, { useState } from "react";
import api from "../../services/endpoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api.user.login, { email, password });
      if (response.data.success) {
        toast.success("Login Successfully");
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
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">Login to your account</p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-red-500 to-red-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-6">
                <a className="text-red-600 text-sm hover:underline cursor-pointer">
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
