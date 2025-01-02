import React, { useState, useEffect } from "react";
import { useLocation, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import SCWCalc from "./components/Projects/RegretCalc/RegretCalc";
import SykoChat from "./components/Projects/SykoChat/SykoChat";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "react-datetime/css/react-datetime.css";

function AppContent() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth <= 768;
      setIsMobile(isMobileScreen);
      console.log(`isMobile: ${isMobileScreen}`); // Debugging log
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log(`Current pathname: ${location.pathname}`); // Debugging log
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/crypto-regret" element={<SCWCalc />} />
        <Route path="/projects/sykochat" isMobile={isMobile} element={<SykoChat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* Simplified condition with debugging */}
      { location.pathname !== "/projects/sykochat" ? (
        <Footer />
        ): 
        !isMobile? (
          <Footer />
        ): "" }
    </>
  );
}

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
