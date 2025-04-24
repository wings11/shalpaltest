import React from "react";
import "./Logobar.css";


const Logobar = () => {
  return (
    <div className="logobar">
      <div className="logofield">
        <img src='https://res.cloudinary.com/dakgb0zrs/image/upload/v1745480251/logo_mw6gtv.svg' />
      </div>
      <div
        className="logotext"
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <h2>SHAL PAL</h2>
        <span>Tea House</span>
      </div>
      <div className="contact">
        <img src='https://res.cloudinary.com/dakgb0zrs/image/upload/v1745520703/telephone_1_rnvm4i.svg' />
        <p>CONTACT US</p>
        <span>06-3849-2363</span>
      </div>
    </div>
  );
};

export default Logobar;