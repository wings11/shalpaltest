import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

  return (
    <section className="footer">
      <div className="footer-content">
        <Link className="linktoday" to={`/Today${queryString}`}>
          <button className="today">TODAY'S SPECIALS</button>
        </Link>
        <Link className="linkcombo" to={`/Combo${queryString}`}>
          <button className="combo">COMBO SETS</button>
        </Link>
      </div>
    </section>
  );
};

export default Footer;