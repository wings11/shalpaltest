

// // import React, { useState, useEffect, useContext } from "react";
// // import OrderCard from "../OrderCard/OrderCard";
// // import "./OrderCardDisplay.css";
// // import { StoreContext } from "../../context/StoreContextProvider";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import axios from "axios";

// // const OrderCardDisplay = () => {
// //   const [showModal, setShowModal] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [error, setError] = useState(null);
// //   const { orders, setOrders, updateOrderStatus, cancelOrder, removeOrderItem } = useContext(StoreContext);
// //   const [selectedTableOrder, setSelectedTableOrder] = useState(null);
// //   const [filterTable, setFilterTable] = useState("All");
// //   const [tables, setTables] = useState([]);

// //   // Fetch tables
// //   useEffect(() => {
// //     const fetchTables = async () => {
// //       try {
// //         console.log("Fetching tables from /api/admin/tables...");
// //         const response = await axios.get('http://localhost:5000/api/admin/tables');
// //         console.log("Tables response:", response.data);
// //         setTables(response.data);
// //       } catch (err) {
// //         console.error("Error fetching tables:", err.response?.data || err.message);
// //         setError(`Failed to load tables: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
// //       }
// //     };
// //     fetchTables();
// //   }, []);

// //   // Sort orders: "New" first, then "In Process"
// //   const sortedOrders = [...orders].sort((a, b) => {
// //     if (a.status === "New" && b.status !== "New") return -1;
// //     if (b.status === "New" && a.status !== "New") return 1;
// //     return 0;
// //   });

// //   // Filter orders based on selected table and today's date
// //   const filteredOrders = sortedOrders.filter((order) => {
// //     const orderDate = new Date(order.created_at).toDateString();
// //     const today = new Date().toDateString();
// //     if (filterTable === "All") return orderDate === today;
// //     return order.table_number === filterTable && orderDate === today;
// //   });

// //   const handleCardClick = (tableOrder) => {
// //     setSelectedTableOrder(tableOrder);
// //     setShowModal(true);
// //     setIsEditing(false);
// //   };

// //   const handleSendOrder = async (orderId) => {
// //     if (selectedTableOrder) {
// //       try {
// //         console.log(`Sending order ${orderId} to In Process`);
// //         await updateOrderStatus(orderId, "In Process");
// //         setSelectedTableOrder(null);
// //         setShowModal(false);
// //         setIsEditing(false);
// //       } catch (err) {
// //         setError(`Failed to send order: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
// //       }
// //     }
// //   };

// //   const handleCheckout = async (orderId) => {
// //     if (selectedTableOrder) {
// //       try {
// //         console.log(`Checking out order ${orderId}`);
// //         await updateOrderStatus(orderId, "Paid");
// //         setSelectedTableOrder(null);
// //         setShowModal(false);
// //         setIsEditing(false);
// //       } catch (err) {
// //         setError(`Failed to checkout: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
// //       }
// //     }
// //   };

// //   const handleCancelOrder = async () => {
// //     if (selectedTableOrder) {
// //       try {
// //         console.log(`Cancelling order ${selectedTableOrder.id}`);
// //         await cancelOrder(selectedTableOrder.id);
// //         setSelectedTableOrder(null);
// //         setShowModal(false);
// //         setIsEditing(false);
// //       } catch (err) {
// //         setError(`Failed to cancel order: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
// //       }
// //     }
// //   };

// //   const handleEditOrder = () => {
// //     setIsEditing(true);
// //   };

// //   const handleSaveEdit = () => {
// //     setIsEditing(false);
// //   };

// //   const handleDeleteItem = async (orderId, uniqueId) => {
// //     try {
// //       console.log(`Deleting item ${uniqueId} from order ${orderId}`);
// //       await removeOrderItem(orderId, uniqueId);
// //       const updatedOrder = orders.find((order) => order.id === orderId);
// //       if (updatedOrder.items.length === 0) {
// //         setSelectedTableOrder(null);
// //         setShowModal(false);
// //         setIsEditing(false);
// //       } else {
// //         setSelectedTableOrder(updatedOrder);
// //       }
// //     } catch (err) {
// //       setError(`Failed to delete item: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
// //     }
// //   };

// //   const closeAlert = () => {
// //     setShowModal(false);
// //     setSelectedTableOrder(null);
// //     setIsEditing(false);
// //     setError(null);
// //   };

// //   const getTableItems = (items) => {
// //     const validItems = items.filter(
// //       (item) => item.name && !isNaN(parseFloat(item.price))
// //     );

// //     const itemMap = validItems.reduce((acc, item) => {
// //       const key = `${item.name}-${item.price}-${JSON.stringify(item.options || [])}`;
// //       if (!acc[key]) {
// //         const price = parseFloat(item.price) || 0;
// //         acc[key] = {
// //           itemName: item.name,
// //           itemPrice: price.toFixed(2),
// //           options: item.options || [],
// //           qty: 0,
// //           ids: [],
// //         };
// //       }
// //       acc[key].qty += item.count || 1;
// //       acc[key].ids.push(item.uniqueId || `${item.name}-${Math.random()}`);
// //       return acc;
// //     }, {});

// //     const groupedItems = Object.values(itemMap).map((item) => ({
// //       ...item,
// //       amount: (item.qty * parseFloat(item.itemPrice)).toFixed(2),
// //     }));
// //     console.log("Grouped items:", groupedItems);
// //     return groupedItems;
// //   };

// //   const getTotalAmount = (items) => {
// //     const tableItems = getTableItems(items);
// //     const total = tableItems.reduce(
// //       (sum, item) => sum + parseFloat(item.amount),
// //       0
// //     );
// //     return total.toFixed(2);
// //   };

// //   const handleTableFilterChange = (e) => {
// //     setFilterTable(e.target.value);
// //   };

// //   return (
// //     <div className="order-display">
// //       <div className="order-header">
// //         <h2>Orders</h2>
// //         <div className="table-filter">
// //           <span>Filter by Table: </span>
// //           <select
// //             value={filterTable}
// //             onChange={handleTableFilterChange}
// //             className="table-select"
// //           >
// //             <option value="All">All Tables</option>
// //             {tables.map((table) => (
// //               <option key={table.id} value={table.table_number}>
// //                 {table.table_number}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
// //       </div>
// //       {error && <p className="error">{error}</p>}
// //       {filteredOrders.length === 0 ? (
// //         <p>
// //           No orders for{" "}
// //           {filterTable === "All" ? "any table today" : `Table ${filterTable} today`}.
// //         </p>
// //       ) : (
// //         <div className="order-grid">
// //           {filteredOrders.map((order) => (
// //             <OrderCard
// //               key={order.id}
// //               tableNo={order.table_number}
// //               itemName={`${order.items.length} item(s)`}
// //               itemPrice=""
// //               date={new Date(order.created_at).toLocaleDateString()}
// //               time={new Date(order.created_at).toLocaleTimeString()}
// //               status={order.status || "New"}
// //               onClick={() => handleCardClick(order)}
// //             />
// //           ))}
// //         </div>
// //       )}
// //       {showModal && selectedTableOrder && (
// //         <div className="modal-overlay">
// //           <div className="modal-box">
// //             <div className="modal-header">
// //               <h3>Table No. {selectedTableOrder.table_number}</h3>
// //               <i onClick={closeAlert} className="bi bi-x-lg" />
// //             </div>
// //             {selectedTableOrder.status === "In Process" ? (
// //               <>
// //                 <p>All orders for this table are now being processed.</p>
// //                 <table className="table table-striped">
// //                   <thead>
// //                     <tr>
// //                       <th>Items</th>
// //                       <th>Price</th>
// //                       <th>Qty</th>
// //                       <th>Amount</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {getTableItems(selectedTableOrder.items).map(
// //                       (item, index) => (
// //                         <tr key={index}>
// //                           <td>
// //                             {index + 1}. {item.itemName}{" "}
// //                             {item.options.length > 0 && `(${item.options.join(", ")})`}
// //                           </td>
// //                           <td>{item.itemPrice} B</td>
// //                           <td>{item.qty}</td>
// //                           <td>{item.amount} B</td>
// //                         </tr>
// //                       )
// //                     )}
// //                   </tbody>
// //                   <tfoot>
// //                     <tr>
// //                       <td colSpan="3" style={{ textAlign: "left" }}>
// //                         <strong>Total</strong>
// //                       </td>
// //                       <td>
// //                         <strong>
// //                           {getTotalAmount(selectedTableOrder.items)} B
// //                         </strong>
// //                       </td>
// //                     </tr>
// //                   </tfoot>
// //                 </table>
// //                 <div className="modal-buttons">
// //                   <button
// //                     className="modal-btn checkout-btn"
// //                     onClick={() => handleCheckout(selectedTableOrder.id)}
// //                   >
// //                     Checkout
// //                   </button>
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 <table className="table">
// //                   <thead>
// //                     <tr>
// //                       <th>Items</th>
// //                       <th>Price</th>
// //                       <th>Qty</th>
// //                       <th>Amount</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {getTableItems(selectedTableOrder.items).map(
// //                       (item, index) => (
// //                         <tr key={index}>
// //                           <td className="index-item">
// //                             {isEditing && (
// //                               <i
// //                                 className="bi bi-x delete-item"
// //                                 onClick={() =>
// //                                   handleDeleteItem(
// //                                     selectedTableOrder.id,
// //                                     item.ids[0]
// //                                   )
// //                                 }
// //                               />
// //                             )}
// //                             {index + 1}. {item.itemName}{" "}
// //                             {item.options.length > 0 && `(${item.options.join(", ")})`}
// //                           </td>
// //                           <td className="index-item">{item.itemPrice} B</td>
// //                           <td className="index-item">{item.qty}</td>
// //                           <td className="index-item">{item.amount} B</td>
// //                         </tr>
// //                       )
// //                     )}
// //                   </tbody>
// //                   <tfoot>
// //                     <tr>
// //                       <td style={{ textAlign: "center" }}>
// //                         <strong>Total</strong>
// //                       </td>
// //                       <td></td>
// //                       <td></td>
// //                       <td style={{ textAlign: "center" }}>
// //                         <strong>
// //                           {getTotalAmount(selectedTableOrder.items)} B
// //                         </strong>
// //                       </td>
// //                     </tr>
// //                   </tfoot>
// //                 </table>
// //                 <div className="modal-buttons">
// //                   {isEditing ? (
// //                     <button
// //                       className="modal-btn save-btn"
// //                       onClick={handleSaveEdit}
// //                     >
// //                       Save
// //                     </button>
// //                   ) : (
// //                     <>
// //                       <button
// //                         className="modal-btn send-btn"
// //                         onClick={() => handleSendOrder(selectedTableOrder.id)}
// //                       >
// //                         Send Orders
// //                       </button>
// //                       <button
// //                         className="modal-btn edit-btn"
// //                         onClick={handleEditOrder}
// //                       >
// //                         Edit Orders
// //                       </button>
// //                       <button
// //                         className="modal-btn cancel-btn"
// //                         onClick={handleCancelOrder}
// //                       >
// //                         Cancel Orders
// //                       </button>
// //                     </>
// //                   )}
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default OrderCardDisplay;


// import React, { useState, useEffect, useContext } from "react";
// import OrderCard from "../OrderCard/OrderCard";
// import "./OrderCardDisplay.css";
// import { StoreContext } from "../../context/StoreContextProvider";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// const OrderCardDisplay = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);
//   const { orders, setOrders, updateOrderStatus, cancelOrder, removeOrderItem } = useContext(StoreContext);
//   const [selectedTableOrder, setSelectedTableOrder] = useState(null);
//   const [filterTable, setFilterTable] = useState("All");
//   const [tables, setTables] = useState([]);

//   // Fetch tables
//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         console.log("Fetching tables from /api/admin/tables...");
//         const response = await axios.get('http://localhost:5000/api/admin/tables');
//         console.log("Tables response:", response.data);
//         setTables(response.data);
//       } catch (err) {
//         console.error("Error fetching tables:", err.response?.data || err.message);
//         setError(`Failed to load tables: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
//       }
//     };
//     fetchTables();
//   }, []);

//   // Sort orders: "New" first, then "In Process"
//   const sortedOrders = [...orders].sort((a, b) => {
//     if (a.status === "New" && b.status !== "New") return -1;
//     if (b.status === "New" && a.status !== "New") return 1;
//     return 0;
//   });

//   // Filter orders based on selected table and today's date
//   const filteredOrders = sortedOrders.filter((order) => {
//     const orderDate = new Date(order.created_at).toDateString();
//     const today = new Date().toDateString();
//     if (filterTable === "All") return orderDate === today;
//     return order.table_number === filterTable && orderDate === today;
//   });

//   const handleCardClick = (tableOrder) => {
//     setSelectedTableOrder(tableOrder);
//     setShowModal(true);
//     setIsEditing(false);
//   };

//   const handleSendOrder = async (orderId) => {
//     if (selectedTableOrder) {
//       try {
//         console.log(`Sending order ${orderId} to In Process`);
//         await updateOrderStatus(orderId, "In Process");
//         setSelectedTableOrder(null);
//         setShowModal(false);
//         setIsEditing(false);
//       } catch (err) {
//         setError(`Failed to send order: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
//       }
//     }
//   };

//   const handleCheckout = async (orderId) => {
//     if (selectedTableOrder) {
//       try {
//         console.log(`Checking out order ${orderId}`);
//         await updateOrderStatus(orderId, "Paid");
//         setSelectedTableOrder(null);
//         setShowModal(false);
//         setIsEditing(false);
//       } catch (err) {
//         setError(`Failed to checkout: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
//       }
//     }
//   };

//   const handleCancelOrder = async () => {
//     if (selectedTableOrder) {
//       try {
//         console.log(`Cancelling order ${selectedTableOrder.id}`);
//         await cancelOrder(selectedTableOrder.id);
//         setSelectedTableOrder(null);
//         setShowModal(false);
//         setIsEditing(false);
//       } catch (err) {
//         setError(`Failed to cancel order: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
//       }
//     }
//   };

//   const handleEditOrder = () => {
//     setIsEditing(true);
//   };

//   const handleSaveEdit = () => {
//     setIsEditing(false);
//   };

//   const handleDeleteItem = async (orderId, uniqueId) => {
//     try {
//       console.log(`Deleting item ${uniqueId} from order ${orderId}`);
//       await removeOrderItem(orderId, uniqueId);
//       const updatedOrder = orders.find((order) => order.id === orderId);
//       if (updatedOrder.items.length === 0) {
//         setSelectedTableOrder(null);
//         setShowModal(false);
//         setIsEditing(false);
//       } else {
//         setSelectedTableOrder(updatedOrder);
//       }
//     } catch (err) {
//       setError(`Failed to delete item: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
//     }
//   };

//   const closeAlert = () => {
//     setShowModal(false);
//     setSelectedTableOrder(null);
//     setIsEditing(false);
//     setError(null);
//   };

//   const getTableItems = (items) => {
//     const validItems = items.filter(
//       (item) => item.name && !isNaN(parseFloat(item.price))
//     );

//     const itemMap = validItems.reduce((acc, item) => {
//       const key = `${item.name}-${item.price}-${JSON.stringify(item.options || [])}`;
//       if (!acc[key]) {
//         const price = parseFloat(item.price) || 0;
//         acc[key] = {
//           itemName: item.name,
//           itemPrice: price.toFixed(2),
//           options: item.options || [],
//           qty: 0,
//           ids: [],
//         };
//       }
//       acc[key].qty += item.count || 1;
//       acc[key].ids.push(item.uniqueId || `${item.name}-${Math.random()}`);
//       return acc;
//     }, {});

//     const groupedItems = Object.values(itemMap).map((item) => ({
//       ...item,
//       amount: (item.qty * parseFloat(item.itemPrice)).toFixed(2),
//     }));
//     console.log("Grouped items:", groupedItems);
//     return groupedItems;
//   };

//   const getTotalAmount = (items) => {
//     const tableItems = getTableItems(items);
//     const total = tableItems.reduce(
//       (sum, item) => sum + parseFloat(item.amount),
//       0
//     );
//     return total.toFixed(2);
//   };

//   const handleTableFilterChange = (e) => {
//     setFilterTable(e.target.value);
//   };

//   return (
//     <div className="order-display">
//       <div className="order-header">
//         <h2>Orders</h2>
//         <div className="table-filter">
//           <span>Filter by Table: </span>
//           <select
//             value={filterTable}
//             onChange={handleTableFilterChange}
//             className="table-select"
//           >
//             <option value="All">All Tables</option>
//             {tables.map((table) => (
//               <option key={table.id} value={table.table_number}>
//                 {table.table_number}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       {error && <p className="error">{error}</p>}
//       {filteredOrders.length === 0 ? (
//         <p>
//           No orders for{" "}
//           {filterTable === "All" ? "any table today" : `Table ${filterTable} today`}.
//         </p>
//       ) : (
//         <div className="order-grid">
//           {filteredOrders.map((order) => (
//             <OrderCard
//               key={order.id}
//               tableNo={order.table_number}
//               itemName={`${order.items.length} item(s)`}
//               itemPrice=""
//               date={new Date(order.created_at).toLocaleDateString()}
//               time={new Date(order.created_at).toLocaleTimeString()}
//               status={order.status || "New"}
//               onClick={() => handleCardClick(order)}
//             />
//           ))}
//         </div>
//       )}
//       {showModal && selectedTableOrder && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <div className="modal-header">
//               <h3>Table No. {selectedTableOrder.table_number}</h3>
//               <i onClick={closeAlert} className="bi bi-x-lg" />
//             </div>
//             {selectedTableOrder.status === "In Process" ? (
//               <>
//                 <p>All orders for this table are now being processed.</p>
//                 <table className="table table-striped">
//                   <thead>
//                     <tr>
//                       <th>Items</th>
//                       <th>Price</th>
//                       <th>Qty</th>
//                       <th>Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {getTableItems(selectedTableOrder.items).map(
//                       (item, index) => (
//                         <tr key={index}>
//                           <td>
//                             {index + 1}. {item.itemName}{" "}
//                             {item.options.length > 0 && `(${item.options.join(", ")})`}
//                           </td>
//                           <td>{item.itemPrice} B</td>
//                           <td>{item.qty}</td>
//                           <td>{item.amount} B</td>
//                         </tr>
//                       )
//                     )}
//                   </tbody>
//                   <tfoot>
//                     <tr>
//                       <td colSpan="3" style={{ textAlign: "left" }}>
//                         <strong>Total</strong>
//                       </td>
//                       <td>
//                         <strong>
//                           {getTotalAmount(selectedTableOrder.items)} B
//                         </strong>
//                       </td>
//                     </tr>
//                   </tfoot>
//                 </table>
//                 <div className="order-notes">
//                   <p>
//                     <strong>Notes:</strong>{" "}
//                     {selectedTableOrder.notes}
//                   </p>
//                 </div>
                
//               </>
//             ) : (
//               <>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Items</th>
//                       <th>Price</th>
//                       <th>Qty</th>
//                       <th>Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {getTableItems(selectedTableOrder.items).map(
//                       (item, index) => (
//                         <tr key={index}>
//                           <td className="index-item">
//                             {isEditing && (
//                               <i
//                                 className="bi bi-x delete-item"
//                                 onClick={() =>
//                                   handleDeleteItem(
//                                     selectedTableOrder.id,
//                                     item.ids[0]
//                                   )
//                                 }
//                               />
//                             )}
//                             {index + 1}. {item.itemName}{" "}
//                             {item.options.length > 0 && `(${item.options.join(", ")})`}
//                           </td>
//                           <td className="index-item">{item.itemPrice} B</td>
//                           <td className="index-item">{item.qty}</td>
//                           <td className="index-item">{item.amount} B</td>
//                         </tr>
//                       )
//                     )}
//                   </tbody>
//                   <tfoot>
//                     <tr>
//                       <td style={{ textAlign: "center" }}>
//                         <strong>Total</strong>
//                       </td>
//                       <td></td>
//                       <td></td>
//                       <td style={{ textAlign: "center" }}>
//                         <strong>
//                           {getTotalAmount(selectedTableOrder.items)} B
//                         </strong>
//                       </td>
//                     </tr>
//                   </tfoot>
//                 </table>
//                 <div className="order-notes">
//                   <p>
//                     <strong>Notes:</strong>{" "}
//                     {selectedTableOrder.notes || "No notes provided"}
//                   </p>
//                 </div>
//                 <div className="modal-buttons">
//                   {isEditing ? (
//                     <button
//                       className="modal-btn save-btn"
//                       onClick={handleSaveEdit}
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         className="modal-btn send-btn"
//                         onClick={() => handleSendOrder(selectedTableOrder.id)}
//                       >
//                         Send Orders
//                       </button>
//                       <button
//                         className="modal-btn edit-btn"
//                         onClick={handleEditOrder}
//                       >
//                         Edit Orders
//                       </button>
//                       <button
//                         className="modal-btn cancel-btn"
//                         onClick={handleCancelOrder}
//                       >
//                         Cancel Orders
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderCardDisplay;


import React, { useState, useEffect, useContext } from "react";
import OrderCard from "../OrderCard/OrderCard";
import "./OrderCardDisplay.css";
import { StoreContext } from "../../context/StoreContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const OrderCardDisplay = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const { orders, setOrders, updateOrderStatus, cancelOrder, removeOrderItem } = useContext(StoreContext);
  const [selectedTableOrder, setSelectedTableOrder] = useState(null);
  const [filterTable, setFilterTable] = useState("All");
  const [tables, setTables] = useState([]);

  // Fetch tables
  useEffect(() => {
    const fetchTables = async () => {
      try {
        console.log("Fetching tables from /api/admin/tables...");
        const response = await axios.get('http://localhost:5000/api/admin/tables');
        console.log("Tables response:", response.data);
        setTables(response.data);
      } catch (err) {
        console.error("Error fetching tables:", err.response?.data || err.message);
        setError(`Failed to load tables: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
      }
    };
    fetchTables();
  }, []);

  // Sort orders: "New" first, then "In Process"
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === "New" && b.status !== "New") return -1;
    if (b.status === "New" && a.status !== "New") return 1;
    return 0;
  });

  // Filter orders: Exclude "Paid", include today's orders
  const filteredOrders = sortedOrders.filter((order) => {
    const orderDate = new Date(order.created_at).toDateString();
    const today = new Date().toDateString();
    if (filterTable === "All") {
      return orderDate === today && order.status !== "Paid";
    }
    return (
      order.table_number === filterTable &&
      orderDate === today &&
      order.status !== "Paid"
    );
  });

  const handleCardClick = (tableOrder) => {
    setSelectedTableOrder(tableOrder);
    setShowModal(true);
    setIsEditing(false);
  };

  const handleSendOrder = async (orderId) => {
    if (selectedTableOrder) {
      try {
        console.log(`Sending order ${orderId} to In Process`);
        await updateOrderStatus(orderId, "In Process");
        setSelectedTableOrder(null);
        setShowModal(false);
        setIsEditing(false);
      } catch (err) {
        setError(`Failed to send order: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
      }
    }
  };

  const handleCheckout = async (orderId) => {
    if (selectedTableOrder) {
      try {
        console.log(`Checking out order ${orderId}`);
        await updateOrderStatus(orderId, "Paid");
        setSelectedTableOrder(null);
        setShowModal(false);
        setIsEditing(false);
      } catch (err) {
        setError(`Failed to checkout: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
      }
    }
  };

  const handleCancelOrder = async () => {
    if (selectedTableOrder) {
      try {
        console.log(`Cancelling order ${selectedTableOrder.id}`);
        await cancelOrder(selectedTableOrder.id);
        setSelectedTableOrder(null);
        setShowModal(false);
        setIsEditing(false);
      } catch (err) {
        setError(`Failed to cancel order: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
      }
    }
  };

  const handleEditOrder = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (selectedTableOrder) {
      try {
        console.log(`Saving edits for order ${selectedTableOrder.id}`);
        await axios.put(
          `http://localhost:5000/api/admin/orders/${selectedTableOrder.id}`,
          { items: selectedTableOrder.items }
        );
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedTableOrder.id
              ? { ...order, items: selectedTableOrder.items }
              : order
          )
        );
        setIsEditing(false);
      } catch (err) {
        setError(`Failed to save edits: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
      }
    }
  };

  const handleDeleteItem = async (orderId, uniqueId) => {
    try {
      console.log(`Reducing quantity for item ${uniqueId} in order ${orderId}`);
      const order = orders.find((o) => o.id === orderId);
      const itemIndex = order.items.findIndex((item) => item.uniqueId === uniqueId);
      if (itemIndex === -1) {
        throw new Error("Item not found");
      }
      const updatedItems = [...order.items];
      const item = updatedItems[itemIndex];
      item.count = (item.count || 1) - 1;

      if (item.count <= 0) {
        updatedItems.splice(itemIndex, 1);
      }

      if (updatedItems.length === 0) {
        await cancelOrder(orderId);
        setSelectedTableOrder(null);
        setShowModal(false);
        setIsEditing(false);
      } else {
        await removeOrderItem(orderId, uniqueId, item.count);
        setSelectedTableOrder({ ...order, items: updatedItems });
      }
    } catch (err) {
      setError(`Failed to update item quantity: ${err.response?.status || ''} ${err.response?.data?.error || err.message}`);
    }
  };

  const closeAlert = () => {
    setShowModal(false);
    setSelectedTableOrder(null);
    setIsEditing(false);
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

    const groupedItems = Object.values(itemMap).map((item) => ({
      ...item,
      amount: (item.qty * parseFloat(item.itemPrice)).toFixed(2),
    }));
    console.log("Grouped items:", groupedItems);
    return groupedItems;
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
        <h2>Orders</h2>
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
        <p>
          No ongoing Orders happening now.
        </p>
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
              status={order.status || "New"}
              onClick={() => handleCardClick(order)}
            />
          ))}
        </div>
      )}
      {showModal && selectedTableOrder && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Table No. {selectedTableOrder.table_number}</h3>
              <i onClick={closeAlert} className="bi bi-x-lg" />
            </div>
            {selectedTableOrder.status === "In Process" ? (
              <>
                <p>All orders for this table are now being processed.</p>
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
                    {getTableItems(selectedTableOrder.items).map(
                      (item, index) => (
                        <tr key={index}>
                          <td>
                            {index + 1}. {item.itemName}{" "}
                            {item.options.length > 0 && `(${item.options.join(", ")})`}
                          </td>
                          <td>{item.itemPrice} B</td>
                          <td>{item.qty}</td>
                          <td>{item.amount} B</td>
                        </tr>
                      )
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" style={{ textAlign: "left" }}>
                        <strong>Total</strong>
                      </td>
                      <td>
                        <strong>
                          {getTotalAmount(selectedTableOrder.items)} B
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="order-notes">
                  <p>
                    <strong>Notes:</strong>{" "}
                    {selectedTableOrder.notes || "No notes provided"}
                  </p>
                </div>
                <div className="modal-buttons">
                  <button
                    className="modal-btn checkout-btn"
                    onClick={() => handleCheckout(selectedTableOrder.id)}
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTableItems(selectedTableOrder.items).map(
                      (item, index) => (
                        <tr key={index}>
                          <td className="index-item">
                            {isEditing && (
                              <i
                                className="bi bi-x delete-item"
                                onClick={() =>
                                  handleDeleteItem(
                                    selectedTableOrder.id,
                                    item.ids[0]
                                  )
                                }
                              />
                            )}
                            {index + 1}. {item.itemName}{" "}
                            {item.options.length > 0 && `(${item.options.join(", ")})`}
                          </td>
                          <td className="index-item">{item.itemPrice} B</td>
                          <td className="index-item">{item.qty}</td>
                          <td className="index-item">{item.amount} B</td>
                        </tr>
                      )
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <strong>Total</strong>
                      </td>
                      <td></td>
                      <td></td>
                      <td style={{ textAlign: "center" }}>
                        <strong>
                          {getTotalAmount(selectedTableOrder.items)} B
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="order-notes">
                  <p>
                    <strong>Notes:</strong>{" "}
                    {selectedTableOrder.notes || "No notes provided"}
                  </p>
                </div>
                <div className="modal-buttons">
                  {isEditing ? (
                    <button
                      className="modal-btn save-btn"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="modal-btn send-btn"
                        onClick={() => handleSendOrder(selectedTableOrder.id)}
                      >
                        Send Orders
                      </button>
                      <button
                        className="modal-btn edit-btn"
                        onClick={handleEditOrder}
                      >
                        Edit Orders
                      </button>
                      <button
                        className="modal-btn cancel-btn"
                        onClick={handleCancelOrder}
                      >
                        Cancel Orders
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCardDisplay;