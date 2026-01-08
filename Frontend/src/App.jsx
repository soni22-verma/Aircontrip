import React from "react";
import { useState } from 'react';
import './App.css';

import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Mobilebottom from './components/Navbar/Mobilebottom';
import { ToastContainer } from 'react-toastify';
import Footer from "./pages/Footer";
import { AnimatePresence,motion } from "framer-motion";
import ScrollToTop from "./components/ScrolltoTop";




function App() {


  return (
    <>
       <Navbar />
      
        <Outlet />
       <ScrollToTop />
      <ToastContainer />
      <Mobilebottom/>
      <Footer />
   





    </>
  );
}

export default App;
