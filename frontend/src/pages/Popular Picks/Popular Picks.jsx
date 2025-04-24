import React, { useState } from "react";
import "./Popular Picks.css";
import Header from "../../components/Header/Header";
import Logobar from "../../components/Logobar/Logobar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import Cart from "../../components/Cart/Cart";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const PopularPicks = () => {
  return (
    <div className="pp-Page">
      <Header />
      <Logobar />
      <Navbar />
      <FoodDisplay category="Popular Picks" customClass="pp-style" />

      <Cart />
      <Footer />
      <Contact />
    </div>
  );
};

export default PopularPicks;
