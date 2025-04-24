import React, { useContext } from "react";
import "./Navbar_3.css";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContextProvider";

const Navbar_3 = () => {
  const { categories } = useContext(StoreContext);

  const formatCategoryForRoute = (category) => {
    return category.replace(/\s+/g, "-").toLowerCase();
  };

  const formatCategoryForDisplay = (category) => {
    return category.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="nav3_container">
      <nav className="navbar3">
        <ul className="nav3-list">
          {categories.map((category) => {
            const routeCategory = formatCategoryForRoute(category);
            const displayCategory = formatCategoryForDisplay(category);
            return (
              <li key={routeCategory} className="nav3-item">
                <NavLink
                  to={`/CreateOrder/${routeCategory}`}
                  className={({ isActive }) =>
                    isActive ? "nav3-link active" : "nav3-link"
                  }
                >
                  {displayCategory}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar_3;