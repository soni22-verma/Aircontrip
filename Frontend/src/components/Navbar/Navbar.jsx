import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidOffer, BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { AiOutlineLogout } from "react-icons/ai";
import api from "../../../services/endpoint";
import { Link,useNavigate} from "react-router-dom";
import { logoutUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";






const Navbar = () => {
  const navigate = useNavigate()
const { user, isLoggedIn } = useSelector(state => state.user);
const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Authorization")

    if (!token) {
      navigate("/login")
    }
    axios.defaults.headers.common["Authorization"] = token;
    handledata()
  }, [])

  const handledata = async () => {
    try {
      const res = await axios.get(api.user.userdata)
      console.log(res)
      setUserdata(res?.data?.user)
      console.log(userdata, "this is user data")


    } catch (error) {
      console.log(error)
    }
  }
const handleLogout = () => {
  dispatch(logoutUser());
  delete axios.defaults.headers.common["Authorization"];
  navigate("/login");
};


  return (
    <nav className="w-full  shadow-sm bg-gray-100 fixed top-0 left-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-3 px-4">


        <Link to="/"><img src="./logo.png" alt="logo" className="h-8 md:h-12 " /></Link>

        <button
          className="lg:hidden text-gray-700 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>

        <div className="hidden lg:flex items-center gap-10 text-gray-700">

          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
            <BiSolidOffer size={22} />
            <Link to="offer"> <span className="font-semibold">Offers</span></Link>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
            <BiSupport size={20} />
            <Link to="customer"><span className="font-semibold">Customer Service</span></Link>
          </div>

          

          <div className="flex items-center gap-2 cursor-pointer">
            <CgProfile size={22} />
            <span className="font-semibold">
              {
                isLoggedIn && user ? <div>{user.name}</div> :
                  <div>
                    <Link to="login"><span className="hover:text-blue-500">Log in</span></Link>/
                    <Link to="singup"><span className="hover:text-blue-500">Sign up</span></Link>
                  </div>
              }

            </span>
          </div>
          
          <div onClick={handleLogout} className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
            <AiOutlineLogout size={22}/>
            <span className="font-semibold">Logout</span>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-gray-100 w-full px-6 py-4 space-y-4 shadow-md">

          <div className="flex items-center gap-3 text-gray-700 cursor-pointer">
            <BiSolidOffer size={16} />
            <Link to="offer"> <span className="font-semibold text-sm">Offers</span></Link>
          </div>

          <div className="flex items-center gap-3 text-gray-700 cursor-pointer">
            <BiSupport size={16} />
            <Link to="customer"><span className="font-semibold text-sm">Customer Service</span></Link>
          </div>
        

          <div className="flex items-center gap-3 text-gray-700 cursor-pointer">
            <CgProfile size={16} />
            <span className="font-semibold text-sm">
              {
               isLoggedIn && user ? (
               <div>{user.name}</div>):(
                <>
                 <a href="login">Log in</a> /
              <a href="singup">Sign up</a>
              </>
               )
              }
             </span>
          </div>
          
          <div onClick={handleLogout} className="flex items-center gap-3 text-gray-700 cursor-pointer">
            <AiOutlineLogout size={16}/>
            <span className="font-semibold text-sm">Logout</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
