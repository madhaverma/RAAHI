import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Login from './components/Login'
import ComplaintForm from './components/ComplaintForm'
import Footer from './components/footer'
import Contact from './components/Contact'
import AboutUsPage from './components/About'


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;