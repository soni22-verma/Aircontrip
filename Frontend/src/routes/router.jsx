import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../pages/home/Home";
import HomeDestop from "../pages/home/HomeDestop";
import HomeMobile from "../pages/home/HomeMobile";
import Login from "../pages/Login";
import Singup from "../pages/Singup";
import Viewall from "../pages/Viewall"
import FAQPage from "../pages/FAQPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import HelpCenter from "../pages/HelpCenter";
import AirContipTerms from "../pages/AirContipTerms";

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
        path: "viewall",
        element: <Viewall />
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
    ],
  },
]);

export default router;
