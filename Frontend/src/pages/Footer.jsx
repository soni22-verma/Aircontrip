
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-md">
          
          {/* HELP */}
          <div>
            <h3 className="font-bold mb-2">Help</h3>
            <ul className="space-y-2 text-gray-900">
              <li className="hover:underline cursor-pointer">Help center</li>
              <li className="hover:underline cursor-pointer">FAQs</li>
              <li className="hover:underline cursor-pointer">Privacy policy</li>
              <li className="hover:underline cursor-pointer">Cookie policy</li>
              <li className="hover:underline cursor-pointer">Terms of use</li>
              <a href="digitalservice"><li className="hover:underline cursor-pointer">Digital Services Act (EU)</li></a>
              <a href="guidlines"><li className="hover:underline cursor-pointer">Content guidelines & reporting</li></a>
         <a href="statement"><li className="hover:underline cursor-pointer">Modern Slavery Statement</li></a>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-bold mb-2">Company</h3>
            <ul className="space-y-2 text-gray-900">
             <a href="about"><li className="hover:underline cursor-pointer">About us</li></a>
            <a href="press"><li className="hover:underline cursor-pointer">Press</li></a>
              <a href="blog"><li className="hover:underline cursor-pointer">Blog</li></a>
              <a href="pointmax"><li className="hover:underline cursor-pointer">PointsMAX</li></a>
            </ul>
          </div>

          

          {/* PARTNER */}
          <div>
            <h3 className="font-bold mb-2">Partner with us</h3>
            <ul className="space-y-2 text-gray-900">
              <a href="partnerportal"><li className="hover:underline cursor-pointer">YCS partner portal</li></a>
            <a href="partnerhub"> <li className="hover:underline cursor-pointer">Partner Hub</li></a>
              <a href="Advertise"><li className="hover:underline cursor-pointer">Advertise on Agoda</li></a>
              <a href="Affiliates"><li className="hover:underline cursor-pointer">Affiliates</li></a>
             <a href="api"><li className="hover:underline cursor-pointer">Agoda API Documentation</li></a>
            </ul>
          </div>

          {/* APP */}
          <div>
            <h3 className="font-bold mb-2">Get the app</h3>
            <ul className="space-y-2 text-gray-900">
           <a href="ios"><li className="hover:underline cursor-pointer">iOS app</li></a>
              <li className="hover:underline cursor-pointer">Android app</li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Agoda Clone. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
