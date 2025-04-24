import React from "react";
import "./Header.css";

import Dropdown from "../Slider/Slider";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Dropdown />

      <div
        className="logotext"
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <h2>SHAL PAL</h2>
        <span>Tea House</span>
      </div>

      <Link className="logo">
        <img src='https://res.cloudinary.com/dakgb0zrs/image/upload/v1745480251/logo_mw6gtv.svg' alt="logo" />
      </Link>
    </div>
  );
};

export default Header;
