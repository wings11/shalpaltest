import React from "react";
import "./Drinks.css";
import Header from "../../components/Header/Header";
import Logobar from "../../components/Logobar/Logobar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import Cart from "../../components/Cart/Cart";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Drinks = () => {
    return (
        <div className="dr-Page">
            <Header />
            <Logobar />
            <Navbar />
            <FoodDisplay category="Drinks" customClass="dr-style" />
            <Cart />
            <Footer />
            <Contact />
        </div>
    );
};

export default Drinks;