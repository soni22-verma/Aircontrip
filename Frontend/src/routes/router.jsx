import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import HomeDestop from "../pages/home/HomeDestop";
import HomeMobile from "../pages/home/HomeMobile";
import Login from "../pages/Login";
import Singup from "../pages/Singup";
import Viewall from "../pages/Viewall";
import Offer from "../pages/Offer";
import Customer from "../pages/Customer";
import About from "../pages/About";
import Press from "../pages/Press";
import Blog from "../pages/Blog";
import FAQPage from "../pages/FAQPage"
import PrivacyPolicy from "../pages/PrivacyPolicy";
import HelpCenter from "../pages/HelpCenter";
import AirContipTerms from "../pages/AirContipTerms";
import Pointmax from "../pages/Pointmax";
import PertnerPortal from "../pages/PertnerPortal";
import Partnerhub from "../pages/Partnerhub";
import Advertise from "../pages/Advertise";
import Affiliates from "../pages/Affiliates";
import API from "../pages/API";
import IOS from "../pages/IOS";
import Digitalservice from "../pages/Digitalservice";
import Guidlines from "../pages/Guidlines";
import Statement from "../pages/Statement"




const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "homeDestop",
            element: <HomeDestop />
          },
          {
            path: "homemobile",
            element: <HomeMobile />
          },


        ]
      },

      {
        path: "login",
        element: <Login />
      },
      {
        path: "singup",
        element: <Singup />
      },
      {
        path:"viewall",
        element:<Viewall/>
      },
      {
        path:"offer",
        element:<Offer/>
      },
      {
        path:"customer",
        element:<Customer/>
      },
      {
        path:"about",
        element:<About/>
      },
     {
      path:"press",
      element:<Press/>
     },
     {
      path:"blog",
      element:<Blog/>
     },
     {
      path:"pointmax",
      element:<Pointmax/>
     },
       
      {
        path: "/faq",
        element: <FAQPage />
      },
      {
        path:"/privacy-policy",
        element:<PrivacyPolicy/>
      },
      {
        path:"/help-center",
        element:<HelpCenter/>
      },
      {
        path:"/air-contrip-terms",
        element:<AirContipTerms/>
      }
     ,
     {
      path:"partnerportal",
      element:<PertnerPortal/>

     },
     {
      path:"partnerhub",
      element:<Partnerhub/>

     },
     {
      path:"Advertise",
      element:<Advertise/>
     },
     {
      path:"Affiliates",
      element:<Affiliates/>
     },
     {
      path:"api",
      element:<API/>
     },
     {
      path:"ios",
      element:<IOS/>
     },
     {
      path:"digitalservice",
      element:<Digitalservice/>
     },
     {
      path:"guidlines",
      element:<Guidlines/>
     },
     {
      path:"statement",
      element:<Statement/>
     },
     
     
    ],
  }
]
  )





export default router;
