import React from "react";
import "./OrderHistoryCard.css";

const OrderHistoryCard = ({ tableNo, date, time, onClick }) => {
  const handleViewClick = () => {
    onClick();
  };

  return (
    <div className="order-history-card">
      <div className="order-history-details">
        <span className="order-history-table">Table: {tableNo || "N/A"}</span>
        <span className="order-history-date-time">
          {date} | {time}
        </span>
        <span className="order-history-view">
          <button className="view-btn" onClick={handleViewClick}>
            View
          </button>
        </span>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
