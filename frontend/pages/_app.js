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
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Metal+Mania&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      
      </Head>
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
