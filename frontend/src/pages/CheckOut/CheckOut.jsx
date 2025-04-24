import React from "react";
import Header from "../../components/Header/Header";
import Logobar from "../../components/Logobar/Logobar";
import Contact from "../../components/Contact/Contact";
import "./CheckOut.css";

import { Link } from "react-router-dom";

const CheckOut = () => {
  return (
    <div className="CheckOut-Page">
      <Header />
      <Logobar />
      <div className="checkout-container">
        {/* <img src={assets.paper_1} alt="checkout" /> */}
        <button className="button_1">Order Completed</button>
        <Link className="linktomain" to={"/PoppicksPage"}>
          <button className="button_2">Order More </button>
        </Link>
        <p>Order No: 00001</p>
      </div>

      <Contact />
    </div>
  );
};

export default CheckOut;