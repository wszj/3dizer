import {
    Box,
} from "@chakra-ui/react";

import React, { useState } from 'react';

import "./footer.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import LogoFooter from "../assets/images/footer/logo.png";
import UpToTop from "../assets/images/footer/up2top.png";

export default function Header() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 400) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
 
  window.addEventListener('scroll', handleScroll);

  return (
      <Box>    
          <div className="footer">
            <div className="logo-footer">
              <Link to="/"><img src={LogoFooter}></img></Link>
              <span>AI-powered 2D to 3D Video Converter</span>
            </div>
            <div className="contact">
              <div className="email">Contact: <a href="mailto:3dizerai@gmail.com">3dizerai@gmail.com</a></div>
              <div className="social">
                <a className="telegram" href="https://t.me/+OYPFYyswM5NjMmI1" target="_blank"></a>
                <a className="discord" href="https://discord.gg/Dn8EZqyq2S" target="_blank"></a>
                <a className="twitter" href="https://twitter.com/3DizerNetwork" target="_blank"></a>
              </div>
            </div>
          </div>

          <div className="partner">
            <div className="partners">Business partner</div>
          </div>

          {showButton && (
            <a onClick={scrollToTop} href="#top" className="back-to-top"><img src={UpToTop} className="img-back"></img></a>
          )}
      </Box>
  );
}