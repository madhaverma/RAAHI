import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Login from './components/Login'
import ComplaintForm from './components/ComplaintForm'
import Footer from './components/footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './components/Contact'
import AboutUsPage from './components/About'



function App() {
  return <div>
    <Navbar />
    <HeroSection />
    <Login />
    <ComplaintForm />
    <Contact />
    <AboutUsPage />
    <Footer /> 
  
  </div>

}

export default App
