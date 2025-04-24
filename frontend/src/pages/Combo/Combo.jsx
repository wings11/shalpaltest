import React from "react";
import "./Combo.css";
import Header from "../../components/Header/Header";
import Logobar from "../../components/Logobar/Logobar";
import Contact from "../../components/Contact/Contact";
import Cart from "../../components/Cart/Cart";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Combo = () => {
  return (
    <div className="combo-Page">
      <Header />
      <Logobar />

      <div className="combo-Page-title">
        <h1>COMBO'S SETS</h1>
      </div>
      <FoodDisplay category="Combo's Sets" customClass="combostyle" />

      <Cart />
      <Contact />
    </div>
  );
};

export default Combo;