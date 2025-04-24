// import React, { useEffect, useRef } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//     const navContainerRef = useRef(null);
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

//     return (
//         <div className="navbar">
//             <Link to={`/popularpicks${queryString}`}>Popular Picks</Link>
//             <Link to={`/drinks${queryString}`}>Drinks</Link>
//             <Link to={`/specials${queryString}`}>Burmese Specials</Link>
//             <Link to={`/snacks${queryString}`}>Burmese Snacks</Link>
//             <Link to={`/salads${queryString}`}>Burmese Salads</Link>
//         </div>
//     );
// };

// export default Navbar;

import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navContainerRef = useRef(null);
  const location = useLocation(); // Detects route changes
  const queryParams = new URLSearchParams(location.search);
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

  useEffect(() => {
    const activeItem = document.querySelector(".nav-item.active");
    if (activeItem && navContainerRef.current) {
      navContainerRef.current.scrollLeft =
        activeItem.offsetLeft -
        navContainerRef.current.clientWidth / 2 +
        activeItem.clientWidth / 2;
    }
  }, [location.pathname]); // Runs when the route changes

  return (
    <nav className="navbar-container" ref={navContainerRef}>
      <ul className="navbar">
        <li>
          <NavLink to={`/popularpicks${queryString}`} className="nav-item">
            Popular Picks
          </NavLink>
        </li>
        <li>
          <NavLink to={`/Specials${queryString}`} className="nav-item">
            Burmese Specials
          </NavLink>
        </li>
        <li>
          <NavLink to={`/Salads${queryString}`} className="nav-item">
            Burmese Salads
          </NavLink>
        </li>
        <li>
          <NavLink to={`/Snacks${queryString}`} className="nav-item">
            Burmese Snacks
          </NavLink>
        </li>
        <li>
          <NavLink to={`/Drinks${queryString}`} className="nav-item">
            Drinks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;