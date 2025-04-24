import React from "react";
import "./Specials.css";
import Header from "../../components/Header/Header";
import Logobar from "../../components/Logobar/Logobar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import Cart from "../../components/Cart/Cart";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Specials = () => {
    return (
        <div className="sp-Page">
            <div>
                <Header />
                <Logobar />
                <Navbar />
                <FoodDisplay category="Burmese Specials" customClass="sp-style" />
                <Cart />
                <Footer />
                <Contact />
            </div>
        </div>
    );
};

export default Specials;