import React, { useState, useEffect, useRef } from "react";
import "./Slider.css";
import { Link } from "react-router-dom";

const Slider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to track the dropdown
  const buttonRef = useRef(null); // Ref to track the button

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    console.log("toggleDropdown called. Current state of isOpen:", isOpen);
  };
  console.log("New state of isOpen:", isOpen);

  // Function to handle clicks outside the dropdown and button
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  // Attach event listener when dropdown is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="navbar navbar-light ">
      <button
        ref={buttonRef} // Attach ref to button
        className="navbar-toggler custom-toggler "
        type="button"
        onClick={toggleDropdown}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">
          <svg
            width="30"
            height="30"
            viewBox="10 0 10 30"
            fill="#000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7H26M4 15H26M4 23H26"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        ref={dropdownRef} // Attach ref to dropdown
        className={`dropdown-menu ${isOpen ? "show" : ""}`}
        aria-labelledby="navbarDropdownMenuLink"
      >
       
        <Link to="/Orders" className="dropdown-item">
          Orders
        </Link>
        <Link to="/OrderHistory" className="dropdown-item">
          Order History
        </Link>
        <Link to="/Management" className="dropdown-item">
          Management
        </Link>
        <Link to="/CheckOuta" className="dropdown-item">
          CheckOut
        </Link>
        
      </div>
    </nav>
  );
};

export default Slider;
