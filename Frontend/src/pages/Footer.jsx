import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        
        {/* GRID */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-5 
          gap-8
          text-sm
          text-center
          sm:text-left
        ">
          
          {/* HELP */}
          <div>
            <h3 className="font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:underline">
          <Link to="/help-center">Help center</Link>
          </li>
            <li className="hover:underline">
              <Link to="/faq">FAQs</Link>
              </li>
              <li className="hover:underline">
                <Link to="/privacy-policy">Privacy policy</Link>
                </li>
              <li className="hover:underline">
                <Link to="/contact">Contact Us</Link>
                </li>
              {/* <li className="hover:underline">
                <Link to="/term">Terms of use</Link>
                </li> */}
              <li className="hover:underline">
                <Link to="/digitalservice" >Digital Services Act (EU)</Link>
                </li>
              <li className="hover:underline">
                <Link to="/guidlines" >Content guidelines & reporting</Link>
                </li>
              <li  className="hover:underline">
                <Link to="/statement">Modern Slavery Statement</Link>
                </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:underline">
                <Link to="/about" >About us</Link>
                </li>
              <li className="hover:underline">
                <Link to="/press">Press</Link>
                </li>
              <li className="hover:underline">
                <Link to="/blog">Blog</Link>
                </li>
              <li className="hover:underline">
                <Link to="/pointmax">PointsMAX</Link>
                </li>
            </ul>
          </div>

          {/* PARTNER */}
          <div>
            <h3 className="font-semibold mb-3">Partner with us</h3>
            <ul className="space-y-2 text-gray-700">
              {/* <li className="hover:underline">
                <Link to="/partnerportal">YCS partner portal</Link>
                </li> */}
              <li className="hover:underline">
                <Link to="/partnerhub">Partner Hub</Link>
                </li>
              <li className="hover:underline">
                <Link to="/advertise">Advertise on Agoda</Link>
                </li>
              <li className="hover:underline">
                <Link to="/affiliates">Affiliates</Link>
                </li>
              <li className="hover:underline">
                <Link to="/api">Agoda API Documentation</Link>
                </li>
            </ul>
          </div>

          {/* APP */}
          <div>
            <h3 className="font-semibold mb-3">Get the app</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:underline">
                <Link to="/ios" >iOS app</Link>
                </li>
              <li className="hover:underline">
                <Link to="/android" >Android app</Link>
                </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="
          border-t 
          border-gray-300 
          mt-10 
          pt-6 
          text-center 
          text-xs 
          text-gray-600
        ">
          © {new Date().getFullYear()} Agoda Clone. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
