import React, { useState, useEffect, useContext } from "react";
import OrderCard from "../../components/OrderCard/OrderCard";
import { StoreContext } from "../../context/StoreContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./OrderCardDisplay.css";

const OrderHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterTable, setFilterTable] = useState("All");
  const [error, setError] = useState(null);
  const { tables } = useContext(StoreContext);
  const [historyOrders, setHistoryOrders] = useState([]);

  // Fetch order history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log("Fetching order history from /api/admin/orderhistory...");
        const response = await axios.get('http://localhost:5000/api/admin/orderhistory');
        console.log("Order history response:", response.data);
        setHistoryOrders(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching order history:", err.response?.data || err.message);
        setError(`Failed to load order history: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
      }
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter orders by table
  const filteredOrders = historyOrders.filter((order) => {
    if (filterTable === "All") return true;
    return order.table_number === filterTable;
  });

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeAlert = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setError(null);
  };

  const getTableItems = (items) => {
    const validItems = items.filter(
      (item) => item.name && !isNaN(parseFloat(item.price))
    );

    const itemMap = validItems.reduce((acc, item) => {
      const key = `${item.name}-${item.price}-${JSON.stringify(item.options || [])}`;
      if (!acc[key]) {
        const price = parseFloat(item.price) || 0;
        acc[key] = {
          itemName: item.name,
          itemPrice: price.toFixed(2),
          options: item.options || [],
          qty: 0,
          ids: [],
        };
      }
      acc[key].qty += item.count || 1;
      acc[key].ids.push(item.uniqueId || `${item.name}-${Math.random()}`);
      return acc;
    }, {});

    return Object.values(itemMap).map((item) => ({
      ...item,
      amount: (item.qty * parseFloat(item.itemPrice)).toFixed(2),
    }));
  };

  const getTotalAmount = (items) => {
    const tableItems = getTableItems(items);
    const total = tableItems.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );
    return total.toFixed(2);
  };

  const handleTableFilterChange = (e) => {
    setFilterTable(e.target.value);
  };

  return (
    <div className="order-display">
      <div className="order-header">
        <h2>Order History</h2>
        <div className="table-filter">
          <span>Filter by Table: </span>
          <select
            value={filterTable}
            onChange={handleTableFilterChange}
            className="table-select"
          >
            <option value="All">All Tables</option>
            {tables.map((table) => (
              <option key={table.id} value={table.table_number}>
                {table.table_number}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-grid">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              tableNo={order.table_number}
              itemName={`${order.items.length} item(s)`}
              itemPrice=""
              date={new Date(order.created_at).toLocaleDateString()}
              time={new Date(order.created_at).toLocaleTimeString()}
              status={order.status}
              onClick={() => handleCardClick(order)}
            />
          ))}
        </div>
      )}
      {showModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Table No. {selectedOrder.table_number}</h3>
              <i onClick={closeAlert} className="bi bi-x-lg" />
            </div>
            <p>Status: {selectedOrder.status || "Unknown"}</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {getTableItems(selectedOrder.items).map((item, index) => (
                  <tr key={index}>
                    <td>
                      {index + 1}. {item.itemName}{" "}
                      {item.options.length > 0 && `(${item.options.join(", ")})`}
                    </td>
                    <td>{item.itemPrice} B</td>
                    <td>{item.qty}</td>
                    <td>{item.amount} B</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" style={{ textAlign: "left" }}>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{getTotalAmount(selectedOrder.items)} B</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;