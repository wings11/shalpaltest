import React from "react";

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
        <div className="bg" style={{ backgroundImage: `url($'https://res.cloudinary.com/dakgb0zrs/image/upload/v1745521774/cover_xwlw5x.jpg')` }}>
            <div className="logo">
                <img src='https://res.cloudinary.com/dakgb0zrs/image/upload/v1745480251/logo_mw6gtv.svg' alt="Logo" />
            </div>
            <div className="menu">
                <Link to={menuPath}>
                    MENU
                    <img src='https://res.cloudinary.com/dakgb0zrs/image/upload/v1745521814/Arrow_1_2_exxfg1.svg' alt="to menu" />
                </Link>
            </div>
        </div>
    );
};

export default Home;