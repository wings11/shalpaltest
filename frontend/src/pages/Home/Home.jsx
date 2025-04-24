import React from "react";
import { assets } from "../../assets/assets";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const table = queryParams.get('table');
    const token = queryParams.get('token');

    // Construct the menu link with query params if they exist
    const menuPath = `/PopularPicks${table && token ? `?table=${table}&token=${token}` : ''}`;

    return (
        <div className="bg" style={{ backgroundImage: `url(${assets.cover})` }}>
            <div className="logo">
                <img src={assets.logo} alt="Logo" />
            </div>
            <div className="menu">
                <Link to={menuPath}>
                    MENU
                    <img src={assets.Arrow} alt="to menu" />
                </Link>
            </div>
        </div>
    );
};

export default Home;