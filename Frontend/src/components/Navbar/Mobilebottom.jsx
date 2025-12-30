import React from 'react'
import { BiSolidOffer } from "react-icons/bi";
import { RiCustomerServiceFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

const Mobilebottom = () => {
  return (

    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md md:hidden">
      <div className="flex justify-around items-center py-2">

        <button className="flex flex-col items-center text-orange-500">
          <span className="text-lg text-gray-900"><BiSolidOffer size={20}/></span>
          <span className="text-lg">offers</span>
        </button>

        <button className="flex flex-col items-center text-blue-600">
          <span className="text-xl  text-gray-900"><RiCustomerServiceFill  size={20}/></span>
          <span className="text-md">Customer care</span>
        </button>

    <button className="flex flex-col items-center text-red-600">
          <span className="text-xl text-gray-900"><LuLogOut  size={20}/></span>
          <span className="text-md">Logout</span>
        </button>

        <button className="flex flex-col items-center text-gray-900">
          <span className="text-xl  text-gray-900"><CgProfile size={20}/></span>
          <span className="text-md">Profile</span>
        </button>

      

      </div>
    </div>
  )
}

export default Mobilebottom