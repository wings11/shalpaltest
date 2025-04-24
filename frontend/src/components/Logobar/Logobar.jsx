import React from "react";
import "./Logobar.css";
import { assets } from "../../assets/assets";

const Logobar = () => {
  return (
    <div className="logobar">
      <div className="logofield">
        <img src={assets.logo} />
      </div>
      <div
        className="logotext"
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <h2>SHAL PAL</h2>
        <span>Tea House</span>
      </div>
      <div className="contact">
        <img src={assets.telephone} />
        <p>CONTACT US</p>
        <span>06-3849-2363</span>
      </div>
    </div>
  );
};

export default Logobar;