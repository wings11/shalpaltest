import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError("Please log in to view orders");
          return;
        }
        const response = await axios.get('http://localhost:5000/api/admin/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err.response?.data);
        setError(err.response?.data?.error || err.message);
      }
    };
    fetchOrders();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-orders">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order">
            <p>Order ID: {order.id}</p>
            <p>Table: {order.table_number}</p>
            <p>Notes: {order.notes || "None"}</p>
            <p>Status: {order.status}</p>
            <p>Created: {new Date(order.created_at).toLocaleString()}</p>
            <h4>Items:</h4>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} x{item.count} ({item.options?.join(", ") || "No options"}) - {item.price} THB
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;