import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { assets } from "../../assets/assets";
const Header = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const showNotification = () => {
    setShowAlert(true);
    setFadeOut(false); // Reset fade effect

    setTimeout(() => {
      setFadeOut(true); // Start fading out
      setTimeout(() => setShowAlert(false), 500); // Remove after fade-out
    }, 2000); // Show for 3 seconds
  };

  return (
    <div className="header">
      <div className="leftlogo" onClick={goBack} tabIndex="-1">
        <i className="bi bi-arrow-left" />
      </div>
      <div className="rightlogo">
        <i onClick={showNotification} className="bi bi-bell" tabIndex="-1" />
      </div>
      {showAlert && (
        <div className={`alert-overlay ${fadeOut ? "fade-out" : ""}`}>
          <div className="alert-box ">
            <img
              src={assets.bellring}
              alt="Alert Icon"
              className="mx-auto mb-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;