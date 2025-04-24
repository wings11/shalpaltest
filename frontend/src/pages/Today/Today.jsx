import React from "react";
import "./Today.css";
import Header from "../../components/Header/Header";
import Logobar from "../../components/Logobar/Logobar";
import Contact from "../../components/Contact/Contact";
import Cart from "../../components/Cart/Cart";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Today = () => {
    return (
        <div className="today-Page">
            <Header />
            <Logobar />
            <div className="today-Page-title">
                <h1>TODAY'S SPECIALS</h1>
            </div>
            <FoodDisplay category="Today's Specials" customClass="today-style" />
            <Cart />
            <Contact />
        </div>
    );
};

export default Today;