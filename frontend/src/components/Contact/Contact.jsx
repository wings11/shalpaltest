import React from "react";
import "./Contact.css";


const Contact = () => {
  return (
    <div className="contact-page">
      <div className="social-contact">
        <p>Follow Us On</p>
        <a
          href="https://www.instagram.com/shalpal_tea_house?igsh=azRydHJ5d2Q2MnZp&fbclid=IwY2xjawIzuk1leHRuA2FlbQIxMAABHfVKIcMUC9Vk71OLHRx8yweWH4qtVEqT4QvyCDxscl-OrvfziCmC8LLVrw_aem_rNz_Fc_7EikM3ZupCIbX1g"
          target="_blank"
          rel="noopener noreferrer"
          className="fb"
        >
          <i className="bi bi-instagram"></i>
        </a>
        <a
          href="https://www.facebook.com/sarkyaml?mibextid=wwXIfr&rdid=te9xxKE2mFMMm7Db"
          target="_blank"
          rel="noopener noreferrer"
          className="fb"
        >
          <i className="bi bi-facebook"></i>
        </a>
      </div>
    </div>
  );
};

export default Contact;