import React from "react";
import { useState } from 'react';
import './App.css';

import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
// import Cards from "./pages/Cards";
// import Passengers from "./pages/Passengers";
import { ToastContainer } from 'react-toastify';
import Footer from "./pages/Footer";



function App() {


  return (
    <>
      <Navbar />


      <Outlet />

      {/* <Cards/> */}
      {/* <Passengers/> */}
      <ToastContainer />
      <Footer />




    </>
  );
}

export default App;
