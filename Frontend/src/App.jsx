import React from "react";
import { useState } from 'react';
import './App.css';

import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import Footer from "./pages/Footer";



function App() {


  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />




    </>
  );
}

export default App;
