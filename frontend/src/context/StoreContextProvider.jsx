

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [foodList, setFoodList] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [tables, setTables] = useState([]);
//   const [meatOptions, setMeatOptions] = useState([]);
//   const [error, setError] = useState(null);

//   // Hardcoded categories
//   const categories = [
//     "Today's Specials",
//     "Popular Picks",
//     "Drinks",
//     "Combo's Sets",
//     "Burmese Specials",
//     "Burmese Snacks",
//     "Burmese Salads",
//   ];

//   // Mock data for checkout
//   const [employeeList] = useState([
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Alex Brown" },
//   ]);
//   const [paymentOptions] = useState([
//     { name: "Cash", enabled: true, showImageInInvoice: false },
//     { name: "Credit Card", enabled: true, showImageInInvoice: true, image: "/credit-card.png" },
//     { name: "QR Payment", enabled: true, showImageInInvoice: true, image: "/qr-payment.png" },
//   ]);
//   const [taxes] = useState([{ name: "VAT", rate: 7, enabled: true }]);
//   const [charges] = useState([{ name: "Service Fee", rate: 10, enabled: true }]);
//   const [discounts] = useState([{ name: "Loyalty Discount", rate: 5, enabled: false }]);

//   // Fetch menu
//   const fetchFoodList = async () => {
//     console.log("Fetching menu...");
//     try {
//       const res = await axios.get('http://localhost:5000/api/customer/menu?t=' + Date.now());
//       console.log("Menu response:", res.data);
//       setFoodList(res.data);
//     } catch (err) {
//       console.error("Error fetching menu:", err.response?.data || err.message);
//       setError("Failed to load menu.");
//     }
//   };
//   const fetchMeatOptions = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/meat-options");
//       console.log("Meat options response:", res.data);
//       setMeatOptions(res.data.map(option => option.name));
//     } catch (err) {
//       console.error("Error fetching meat options:", err.response?.data || err.message);
//       setError("Failed to load meat options.");
//     }
//   };

//   // Add item
//   const addItem = async (item) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", item.name);
//       formData.append("price", item.price);
//       formData.append("description", item.description || "");
//       formData.append("category", item.category || "");
//       if (item.imageFile) {
//         formData.append("image", item.imageFile);
//       }
//       if (item.meats) {
//         formData.append("meats", JSON.stringify(item.meats));
//       }
//       const response = await axios.post("http://localhost:5000/api/admin/menu-items", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setFoodList((prev) => [...prev, response.data]);
//       console.log(`Added item: ${item.name}`);
//     } catch (err) {
//       console.error("Error adding item:", err.response?.data || err.message);
//       throw err;
//     }
//   };

//   // Update item
//   const updateItem = async (id, updatedItem) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", updatedItem.name);
//       formData.append("price", updatedItem.price);
//       formData.append("description", updatedItem.description || "");
//       formData.append("category", updatedItem.category || "");
//       if (updatedItem.imageFile) {
//         formData.append("image", updatedItem.imageFile);
//       } else {
//         formData.append("image", updatedItem.image || "");
//       }
//       if (updatedItem.meats) {
//         formData.append("meats", JSON.stringify(updatedItem.meats));
//       }
//       const response = await axios.put(`http://localhost:5000/api/admin/menu-items/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setFoodList((prev) => prev.map((item) => (item.id === id ? response.data : item)));
//       console.log(`Updated item ${id}`);
//     } catch (err) {
//       console.error("Error updating item:", err.response?.data || err.message);
//       throw err;
//     }
//   };

//   // Delete item
//   const deleteItem = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/menu-items/${id}`);
//       setFoodList((prev) => prev.filter((item) => item.id !== id));
//       console.log(`Deleted item ${id}`);
//     } catch (err) {
//       console.error("Error deleting item:", err.response?.data || err.message);
//       throw err;
//     }
//   };
  

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       console.log("Fetching orders from /api/admin/orders...");
//       const response = await axios.get("http://localhost:5000/api/admin/orders", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       console.log("Fetched orders:", response.data);
//       setOrders(response.data);
//     } catch (err) {
//       console.error("Error fetching orders:", err.response?.data || err.message);
//       setError("Failed to fetch orders.");
//     }
//   };

//   // Fetch tables
//   const fetchTables = async () => {
//     try {
//       console.log("Fetching tables from /api/admin/tables...");
//       const response = await axios.get("http://localhost:5000/api/admin/tables", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       console.log("Fetched tables:", response.data);
//       setTables(response.data);
//     } catch (err) {
//       console.error("Error fetching tables:", err.response?.data || err.message);
//       setError("Failed to fetch tables.");
//     }
//   };

//   // Poll orders every 10 seconds
//   useEffect(() => {
//     fetchFoodList();
//     fetchMeatOptions();
//     fetchOrders();
//     fetchTables();
//     const interval = setInterval(fetchOrders, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   // Get "In Process" orders for a table
//   const getInProcessOrders = (tableNumber) => {
//     return orders
//       .filter((order) => order.table_number === tableNumber && order.status === "In Process")
//       .map((order) => ({
//         ...order,
//         date: new Date(order.created_at).toLocaleDateString(),
//         time: new Date(order.created_at).toLocaleTimeString(),
//       }));
//   };

//   // Get all orders for a table
//   const getTableOrders = (tableNumber) => {
//     return orders
//       .filter(
//         (order) =>
//           order.table_number === tableNumber &&
//           order.status !== "Cancelled" &&
//           new Date(order.created_at).toDateString() === new Date().toDateString()
//       )
//       .map((order) => ({
//         ...order,
//         date: new Date(order.created_at).toLocaleDateString(),
//         time: new Date(order.created_at).toLocaleTimeString(),
//       }));
//   };

//   // Complete order
//   const completeOrder = async (order, orderType, staffName, paymentMethod) => {
//     try {
//       console.log(`Completing order ${order.id} for table ${order.table_number}`, {
//         orderType,
//         staffName,
//         paymentMethod,
//       });
//       await axios.put(
//         `http://localhost:5000/api/admin/orders/${order.id}/status`,
//         { status: "Paid" },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setOrders((prevOrders) =>
//         prevOrders.map((o) => (o.id === order.id ? { ...o, status: "Paid" } : o))
//       );
//     } catch (err) {
//       console.error("Error completing order:", err.response?.data || err.message);
//       throw err;
//     }
//   };

//   const addToCart = (item) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find(
//         (cartItem) =>
//           cartItem.id === item.id &&
//           JSON.stringify(cartItem.options || []) === JSON.stringify(item.options || [])
//       );
//       if (existingItem) {
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id &&
//           JSON.stringify(cartItem.options || []) === JSON.stringify(item.options || [])
//             ? { ...cartItem, count: cartItem.count + 1 }
//             : cartItem
//         );
//       }
//       return [...prevCart, { ...item, count: 1 }];
//     });
//   };

//   const updateCartItem = (id, newCount, options = []) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === id && JSON.stringify(item.options || []) === JSON.stringify(options)
//             ? { ...item, count: newCount }
//             : item
//         )
//         .filter((item) => item.count > 0)
//     );
//   };

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       console.log(`Updating order ${orderId} to status: ${status}`);
//       const response = await axios.put(
//         `http://localhost:5000/api/admin/orders/${orderId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       console.log("Status update response:", response.data);
//       setOrders((prevOrders) =>
//         prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
//       );
//     } catch (err) {
//       console.error("Error updating status:", err.response?.data || err.message);
//       throw err;
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       console.log(`Cancelling order ${orderId}`);
//       const response = await axios.delete(`http://localhost:5000/api/admin/orders/${orderId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       console.log("Cancel order response:", response.data);
//       setOrders((prevOrders) =>
//         prevOrders.map((order) => (order.id === orderId ? { ...order, status: "Cancelled" } : order))
//       );
//     } catch (err) {
//       console.error("Error cancelling order:", err.response?.data || err.message);
//       throw err;
//     }
//   };

//   const removeOrderItem = async (orderId, uniqueId, newCount) => {
//     try {
//       console.log(`Updating item ${uniqueId} in order ${orderId} with count: ${newCount}`);
//       const order = orders.find((o) => o.id === orderId);
//       let updatedItems;
//       if (newCount <= 0) {
//         updatedItems = order.items.filter((item) => item.uniqueId !== uniqueId);
//       } else {
//         updatedItems = order.items.map((item) =>
//           item.uniqueId === uniqueId ? { ...item, count: newCount } : item
//         );
//       }
//       const response = await axios.put(
//         `http://localhost:5000/api/admin/orders/${orderId}`,
//         { items: updatedItems },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       console.log("Update item response:", response.data);
//       setOrders((prevOrders) =>
//         prevOrders.map((order) => (order.id === orderId ? { ...order, items: updatedItems } : order))
//       );
//     } catch (err) {
//       console.error("Error updating item:", err.response?.data || err.message);
//       throw err;
//     }
//   };

//   if (error) return <div>{error}</div>;

//   return (
//     <StoreContext.Provider
//       value={{
//         food_list: foodList,
//         cart,
//         addToCart,
//         updateCartItem,
//         setCart,
//         orders,
//         setOrders,
//         tables,
//         updateOrderStatus,
//         cancelOrder,
//         removeOrderItem,
//         employeeList,
//         paymentOptions,
//         taxes,
//         charges,
//         discounts,
//         getInProcessOrders,
//         getTableOrders,
//         completeOrder,
//         addItem,
//         updateItem,
//         deleteItem,
//         categories,
//         meatOptions,
//       }}
//     >
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;



import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [meatOptions, setMeatOptions] = useState([]);
  const [error, setError] = useState(null);

  // Hardcoded categories
  const categories = [
    "Today's Specials",
    "Popular Picks",
    "Drinks",
    "Combo's Sets",
    "Burmese Specials",
    "Burmese Snacks",
    "Burmese Salads",
  ];

  // Mock data for checkout
  const [employeeList] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Brown" },
  ]);
  const [paymentOptions] = useState([
    { name: "Cash", enabled: true, showImageInInvoice: false },
    { name: "Credit Card", enabled: true, showImageInInvoice: true, image: "/credit-card.png" },
    { name: "QR Payment", enabled: true, showImageInInvoice: true, image: "/qr-payment.png" },
  ]);
  const [taxes] = useState([{ name: "VAT", rate: 7, enabled: true }]);
  const [charges] = useState([{ name: "Service Fee", rate: 10, enabled: true }]);
  const [discounts] = useState([{ name: "Loyalty Discount", rate: 5, enabled: false }]);

  // Fetch menu
  const fetchFoodList = async () => {
    console.log("Fetching menu...");
    try {
      const res = await axios.get('http://localhost:5000/api/customer/menu?t=' + Date.now());
      console.log("Menu response:", res.data);
      setFoodList(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err.response?.data || err.message);
      setError("Failed to load menu.");
    }
  };

  // Fetch meat options
  const fetchMeatOptions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/meat-options");
      console.log("Meat options response:", res.data);
      setMeatOptions(res.data.map(option => option.name));
    } catch (err) {
      console.error("Error fetching meat options:", err.response?.data || err.message);
      setError("Failed to load meat options.");
    }
  };

  // Fetch tables
  const fetchTables = async () => {
    try {
      console.log("Fetching tables from /api/admin/tables...");
      const response = await axios.get("http://localhost:5000/api/admin/tables");
      console.log("Fetched tables:", response.data);
      setTables(response.data);
    } catch (err) {
      console.error("Error fetching tables:", err.response?.data || err.message);
      setError("Failed to fetch tables.");
    }
  };

  // Add item
  const addItem = async (item) => {
    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("price", item.price);
      formData.append("description", item.description || "");
      formData.append("category", item.category || "");
      if (item.imageFile) {
        formData.append("image", item.imageFile);
      }
      if (item.meats) {
        formData.append("meats", JSON.stringify(item.meats));
      }
      const response = await axios.post("http://localhost:5000/api/admin/menu-items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFoodList((prev) => [...prev, response.data]);
      console.log(`Added item: ${item.name}`);
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
      throw err;
    }
  };

  // Update item
  const updateItem = async (id, updatedItem) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedItem.name);
      formData.append("price", updatedItem.price);
      formData.append("description", updatedItem.description || "");
      formData.append("category", updatedItem.category || "");
      if (updatedItem.imageFile) {
        formData.append("image", updatedItem.imageFile);
      } else {
        formData.append("image", updatedItem.image || "");
      }
      if (updatedItem.meats) {
        formData.append("meats", JSON.stringify(updatedItem.meats));
      }
      const response = await axios.put(`http://localhost:5000/api/admin/menu-items/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFoodList((prev) => prev.map((item) => (item.id === id ? response.data : item)));
      console.log(`Updated item ${id}`);
    } catch (err) {
      console.error("Error updating item:", err.response?.data || err.message);
      throw err;
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/menu-items/${id}`);
      setFoodList((prev) => prev.filter((item) => item.id !== id));
      console.log(`Deleted item ${id}`);
    } catch (err) {
      console.error("Error deleting item:", err.response?.data || err.message);
      throw err;
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      console.log("Fetching orders from /api/admin/orders...");
      const response = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Fetched orders:", response.data);
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
      setError("Failed to fetch orders.");
    }
  };

  // Poll orders every 10 seconds
  useEffect(() => {
    fetchFoodList();
    fetchMeatOptions();
    fetchTables();
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Get "In Process" orders for a table
  const getInProcessOrders = (tableNumber) => {
    return orders
      .filter((order) => order.table_number === tableNumber && order.status === "In Process")
      .map((order) => ({
        ...order,
        date: new Date(order.created_at).toLocaleDateString(),
        time: new Date(order.created_at).toLocaleTimeString(),
      }));
  };

  // Get all orders for a table
  const getTableOrders = (tableNumber) => {
    return orders
      .filter(
        (order) =>
          order.table_number === tableNumber &&
          order.status !== "Cancelled" &&
          new Date(order.created_at).toDateString() === new Date().toDateString()
      )
      .map((order) => ({
        ...order,
        date: new Date(order.created_at).toLocaleDateString(),
        time: new Date(order.created_at).toLocaleTimeString(),
      }));
  };

  // Complete order
  const completeOrder = async (order, orderType, staffName, paymentMethod) => {
    try {
      console.log(`Completing order ${order.id} for table ${order.table_number}`, {
        orderType,
        staffName,
        paymentMethod,
      });
      await axios.put(
        `http://localhost:5000/api/admin/orders/${order.id}/status`,
        { status: "Paid" },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === order.id ? { ...o, status: "Paid" } : o))
      );
    } catch (err) {
      console.error("Error completing order:", err.response?.data || err.message);
      throw err;
    }
  };

  // Add to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.options || []) === JSON.stringify(item.options || [])
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.options || []) === JSON.stringify(item.options || [])
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, count: 1 }];
    });
  };

  // Update cart item
  const updateCartItem = (id, newCount, options = []) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && JSON.stringify(item.options || []) === JSON.stringify(options)
            ? { ...item, count: newCount }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Place order
  const placeOrder = async (tableNumber, notes) => {
    try {
      const table = tables.find(t => t === tableNumber);
      if (!table) throw new Error("Invalid table number");
      const response = await axios.get(`http://localhost:5000/api/admin/tables`);
      const tableData = response.data.find(t => t === tableNumber);
      if (!tableData) throw new Error("Table not found");
      
      // Fetch token for the table
      const tableResult = await axios.get(`http://localhost:5000/api/admin/tables`);
      const token = tableResult.data.find(t => t === tableNumber) ? "dummy-token" : null;
      if (!token) throw new Error("Token not found for table");

      const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        basePrice: item.price,
        price: item.options && item.options.length > 0
          ? parseFloat(item.price) + (meatPriceAdjustments[item.options[0]] || 0)
          : item.price,
        count: item.count,
        options: item.options || [],
        uniqueId: `${item.id}-${Date.now()}-${Math.random()}`,
      }));

      const orderResponse = await axios.post("http://localhost:5000/api/customer/order", {
        table_number: tableNumber,
        token: token || "dummy-token", // Use actual token if available
        items,
        notes,
      });
      clearCart();
      return orderResponse.data;
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      throw error;
    }
  };

  const meatPriceAdjustments = {
    Chicken: 20,
    Pork: 40,
    Beef: 60,
    Seafood: 60,
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      console.log(`Updating order ${orderId} to status: ${status}`);
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("Status update response:", response.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
      );
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
      throw err;
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      console.log(`Cancelling order ${orderId}`);
      const response = await axios.delete(`http://localhost:5000/api/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Cancel order response:", response.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: "Cancelled" } : order))
      );
    } catch (err) {
      console.error("Error cancelling order:", err.response?.data || err.message);
      throw err;
    }
  };

  // Remove order item
  const removeOrderItem = async (orderId, uniqueId, newCount) => {
    try {
      console.log(`Updating item ${uniqueId} in order ${orderId} with count: ${newCount}`);
      const order = orders.find((o) => o.id === orderId);
      let updatedItems;
      if (newCount <= 0) {
        updatedItems = order.items.filter((item) => item.uniqueId !== uniqueId);
      } else {
        updatedItems = order.items.map((item) =>
          item.uniqueId === uniqueId ? { ...item, count: newCount } : item
        );
      }
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}`,
        { items: updatedItems },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("Update item response:", response.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, items: updatedItems } : order))
      );
    } catch (err) {
      console.error("Error updating item:", err.response?.data || err.message);
      throw err;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        food_list: foodList,
        cart,
        addToCart,
        updateCartItem,
        setCart,
        clearCart,
        placeOrder,
        orders,
        setOrders,
        tables,
        updateOrderStatus,
        cancelOrder,
        removeOrderItem,
        employeeList,
        paymentOptions,
        taxes,
        charges,
        discounts,
        getInProcessOrders,
        getTableOrders,
        completeOrder,
        addItem,
        updateItem,
        deleteItem,
        categories,
        meatOptions,
        error,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;