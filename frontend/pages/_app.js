import React, { useState, useEffect } from "react";
import Head from "next/head"
import { useRouter } from "next/router";
import Preloader from "../components/Pre";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import "react-datetime/css/react-datetime.css";

function MyApp({ Component, pageProps }) {
  const [load, setLoad] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  // Handle preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  // Handle mobile detection
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Preloader load={load} />
      <div className={`App ${load ? "no-scroll" : "scroll"}`}>
        <Navbar />
        <ScrollToTop />
        <Component {...pageProps} isMobile={isMobile} />
        {!(pathname === "/projects/sykochat" && isMobile) ? <Footer /> : null}
      </div>
    </>
  );
}

export default MyApp;
