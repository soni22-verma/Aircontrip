import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from "./routes/router";
import { RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from "./store/store.js";
import { motion, AnimatePresence } from "framer-motion";


createRoot(document.getElementById('root')).render(
 
     <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
  
)
