import React, { useState } from "react";
import "./Footer.css";
import { useOrderContext } from "../../context/OrderProvider";
import { useNavigate } from "react-router-dom"; // For navigation

const Footer = () => {
  const {
    selectedTable,
    setSelectedTable,
    addOrder,
    tableNo,
    pendingItems,
    clearPendingItems,
    orders, // Access orders at the top level
  } = useOrderContext(); // Call hook at the top level
  const [showOrderAlert, setShowOrderAlert] = useState(false); // State for alert box
  const navigate = useNavigate(); // Hook for navigation

  const handleTableChange = (e) => {
    const newTable = e.target.value;
    setSelectedTable(newTable);
    console.log("Table changed to:", newTable);
  };

  const handleOrder = () => {
    const tablePendingItems = pendingItems[selectedTable] || [];
    console.log("Pending Items for", selectedTable, ":", tablePendingItems);
    if (tablePendingItems.length === 0) {
      console.log("No items to order for table:", selectedTable);
      alert("No items to order for this table!");
      return;
    }

    addOrder(selectedTable, tablePendingItems);
    clearPendingItems(selectedTable);
    console.log("Orders after adding:", orders); // Use the orders variable
    setShowOrderAlert(true); // Show the alert box
  };

  const handleViewOrder = () => {
    setShowOrderAlert(false); // Close the alert box
    navigate("/orders"); // Navigate to the orders page (lowercase to match route)
  };

  const handleCloseAlert = () => {
    setShowOrderAlert(false); // Close the alert box without navigation
  };

  return (
    <div className="footer">
      <div className="tableNumberShow">
        <span>Table Number: </span>
        <select
          value={selectedTable}
          onChange={handleTableChange}
          className="table-select"
        >
          {tableNo.map((table) => (
            <option key={table.id} value={table.name}>
              {table.name}
            </option>
          ))}
        </select>
      </div>
      <button className="gotoOrder" onClick={handleOrder}>
        Add Order
      </button>
      {showOrderAlert && (
        <div className="alert-overlay-ordered">
          <div className="alert-box-ordered">
            <i onClick={handleCloseAlert} className="bi bi-x-lg"></i>
            <h3>Orders Created Successfully</h3>
            <button className="view-order-button" onClick={handleViewOrder}>
              View Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
