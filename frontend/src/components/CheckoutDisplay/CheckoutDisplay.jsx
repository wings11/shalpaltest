import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContextProvider";
import CheckoutCard from "../CheckoutCard/CheckoutCard";
import "./CheckoutDisplay.css";

const CheckoutDisplay = () => {
  const { employeeList, orders, tables } = useContext(StoreContext);
  const [selectedOrderType, setSelectedOrderType] = useState("Dine-in");
  const [selectedStaffName, setSelectedStaffName] = useState("");

  const orderTypes = ["Dine-in", "Takeaway", "Delivery"];
  const staffNames = [...new Set(employeeList.map((employee) => employee.name))];

  // Filter tables with "In Process" orders
  const tablesWithInProcessOrders = tables.filter((table) =>
    orders.some(
      (order) =>
        order.table_number === table.table_number &&
        order.status === "In Process"
    )
  );

  return (
    <div className="Checkout-Display">
      <div className="checkout-header">
        <h2>Checkout Tables</h2>
        <div className="checkout-filters">
          <div className="filter-group">
            <label htmlFor="order-type">Order Type: </label>
            <select
              id="order-type"
              value={selectedOrderType}
              onChange={(e) => setSelectedOrderType(e.target.value)}
            >
              {orderTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="staff-name">Staff Name: </label>
            <select
              id="staff-name"
              value={selectedStaffName}
              onChange={(e) => setSelectedStaffName(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staffNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="Checkout-grid">
        {tablesWithInProcessOrders.length === 0 ? (
          <p>No tables with In Process orders.</p>
        ) : (
          tablesWithInProcessOrders.map((table) => (
            <CheckoutCard
              key={table.id}
              name={table.table_number}
              orderType={selectedOrderType}
              staffName={selectedStaffName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CheckoutDisplay;