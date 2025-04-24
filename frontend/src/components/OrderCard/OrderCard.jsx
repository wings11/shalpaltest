// import React from "react";
// import "./OrderCard.css";

// const OrderCard = ({ tableNo, date, time, status, onClick }) => {
//   return (
//     <div className="order-card" onClick={onClick}>
//       <div className="order-details">
//         <span className="order-table">Table: {tableNo || "N/A"}</span>
//         <span className="order-date-time">
//           {date} | {time}
//         </span>
//         <span className={`order-status ${status.toLowerCase().replace(" ", "-")}`}>
//           {status}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;


import React from "react";
import "./OrderCard.css";

const OrderCard = ({ tableNo, date, time, status, onClick }) => {
  const statusClass = status ? status.toLowerCase().replace(" ", "-") : "unknown";
  return (
    <div className="order-card" onClick={onClick}>
      <div className="order-details">
        <span className="order-table">Table: {tableNo || "N/A"}</span>
        <span className="order-date-time">
          {date} | {time}
        </span>
        <span className={`order-status ${statusClass}`}>
          {status || "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;