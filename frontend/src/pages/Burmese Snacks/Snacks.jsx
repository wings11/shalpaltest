import React from "react";
import "./Snacks.css";
import Header from "../../components/Header/Header";
import Logobar from "../../components/Logobar/Logobar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import Cart from "../../components/Cart/Cart";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Snacks = () => {
  return (
    <div className="sn-Page">
      <div>
        <Header />
        <Logobar />
        <Navbar />
        <FoodDisplay category="Burmese Snacks" customClass="sn-style" />
        <Cart />
        <Footer />
        <Contact />
      </div>
    </div>
  );
};

export default Snacks;