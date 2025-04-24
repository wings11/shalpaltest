import React from "react";
import Blank_white from "../../components/Blank_white/Blank_white";
import Header from "../../components/HeaderA/Header";
import Navbar_1 from "../../components/NavbarA/Navbar_1/Navbar_1";
import { Outlet } from "react-router-dom";
import "./Layout_3.css";

const Layout_3 = () => {
  return (
    <div className="Layout_3">
      <Blank_white />
      <Header />
      <Navbar_1 />
      <Outlet />
    </div>
  );
};

export default Layout_3;
