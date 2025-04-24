import React from "react";
import Blank_white from "../../components/Blank_white/Blank_white";
import Header from "../../components/HeaderA/Header";
import Navbar_3 from "../../components/NavbarA/Navbar_3/Navbar_3";
// import Footer from "../../components/FooterA/Footer";
import "./Layout_1.css";

const Layout_1 = ({ children }) => {
  return (
    <div className="layout_1">
      <Blank_white />
      <Header />
      <Navbar_3 />
      {children}
      
    </div>
  );
};

export default Layout_1;