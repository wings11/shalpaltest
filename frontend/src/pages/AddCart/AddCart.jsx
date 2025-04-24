// import React, { useContext, useState } from "react";
// import { StoreContext } from "../../context/StoreContextProvider";
// import "./AddCart.css";
// import Header from "../../components/Header/Header";
// import Logobar from "../../components/Logobar/Logobar";
// import Contact from "../../components/Contact/Contact";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const AddCart = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const table = queryParams.get('table');
//   const tokenBtn = queryParams.get('token');

//   const { cart, updateCartItem, setCart } = useContext(StoreContext);
//   const [orderNotes, setOrderNotes] = useState("");
//   const navigate = useNavigate();

//   const tableNumber = queryParams.get('table') || '1';
//   const token = queryParams.get('token');

//   const handleOrderNotesChange = (e) => setOrderNotes(e.target.value);

//   const totalPrice = cart.reduce((total, item) => {
//     const price = parseFloat(item.price) || 0;
//     const count = item.count > 0 ? item.count : 1;
//     return total + price * count;
//   }, 0);

//   const handleOrder = async () => {
//     console.log("Cart before order:", cart);
//     const orderItems = cart.map(item => ({
//       id: item.id,
//       name: item.name,
//       basePrice: item.basePrice,
//       price: item.price,
//       count: item.count,
//       options: item.options || []
//     }));
//     console.log("Order items:", orderItems);

//     try {
//       const response = await axios.post('http://localhost:5000/api/customer/order', {
//         table_number: tableNumber,
//         items: orderItems,
//         notes: orderNotes,
//         token
//       });
//       setCart([]);
//       navigate(`/checkout${table && tokenBtn ? `?table=${table}&token=${tokenBtn}` : ''}`);
//     } catch (err) {
//       console.error("Order error:", err.response?.data);
//       alert('Failed to place order: ' + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div className="AddCart-Page">
//       <Header />
//       <Logobar />
//       <div className="cart-container">
//         <h2>Your Orders</h2>
//         <p className="items-quantity">
//           <span>Items</span>
//           <span>Quantity</span>
//         </p>
//         {cart.length === 0 ? (
//           <p>Cart is empty</p>
//         ) : (
//           cart.map((item, index) => (
//             <div key={`${item.id}-${item.options?.join("") || index}`} className="cart-item">
//               <div className="cart-item-details">
//                 <p className="cart-item-name">
//                   <span className="item-name">{index + 1}. {item.name}</span>
//                   {item.options && item.options.length > 0 && (
//                     <span className="cart-item-options">({item.options.join(", ")})</span>
//                   )}
//                 </p>
//                 <p className="cart-item-price">{parseFloat(item.price).toFixed(2)} THB</p>
//               </div>
//               <div className="cart-controls">
//                 <button
//                   className="button_3"
//                   onClick={() => updateCartItem(item.id, item.count - 1, item.options)}
//                 >
//                   -
//                 </button>
//                 <span className="item-count">{item.count}</span>
//                 <button
//                   className="button_4"
//                   onClick={() => updateCartItem(item.id, item.count + 1, item.options)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//         <div className="order-notes">
//           <input
//             type="text"
//             placeholder="Leave your additional notes for your orders here ..."
//             value={orderNotes}
//             onChange={handleOrderNotesChange}
//             className="order-notes-input"
//           />
//         </div>
//         <div className="cart-footer">
//           <div className="total-price">
//             <h3>Total</h3>
//             <span>{totalPrice.toFixed(2)} THB</span>
//           </div>
//           <button
//             className="order-button"
//             onClick={handleOrder}
//             disabled={cart.length === 0}
//           >
//             Order Now
//           </button>
//         </div>
//       </div>
//       <Contact />
//     </div>
//   );
// };

// export default AddCart;


import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContextProvider";
import "./AddCart.css";
import Header from "../../components/Header/Header";
import Logobar from "../../components/Logobar/Logobar";
import Contact from "../../components/Contact/Contact";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddCart = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const table = queryParams.get('table');
  const tokenBtn = queryParams.get('token');

  const { cart, updateCartItem, setCart } = useContext(StoreContext);
  const [orderNotes, setOrderNotes] = useState("");
  const navigate = useNavigate();

  const tableNumber = queryParams.get('table') || '1';
  const token = queryParams.get('token');

  const handleOrderNotesChange = (e) => setOrderNotes(e.target.value);

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const count = item.count > 0 ? item.count : 1;
    return total + price * count;
  }, 0);

  const handleOrder = async () => {
    console.log("Cart before order:", cart);
    const orderItems = cart.map(item => ({
      id: item.id,
      name: item.name,
      basePrice: item.basePrice,
      price: item.price,
      count: item.count,
      options: item.options || []
    }));
    console.log("Order items:", orderItems);

    try {
      const response = await axios.post('http://localhost:5000/api/customer/order', {
        table_number: tableNumber,
        items: orderItems,
        notes: orderNotes,
        token
      });
      console.log("Order response:", response.data);
      setCart([]);
      navigate(`/checkout${table && tokenBtn ? `?table=${table}&token=${tokenBtn}` : ''}`);
    } catch (err) {
      console.error("Order error:", err.response?.data);
      alert('Failed to place order: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="AddCart-Page">
      <Header />
      <Logobar />
      <div className="cart-container">
        <h2>Your Orders</h2>
        <p className="items-quantity">
          <span>Items</span>
          <span>Quantity</span>
        </p>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={`${item.id}-${item.options?.join("") || index}`} className="cart-item">
              <div className="cart-item-details">
                <p className="cart-item-name">
                  <span className="item-name">{index + 1}. {item.name}</span>
                  {item.options && item.options.length > 0 && (
                    <span className="cart-item-options">({item.options.join(", ")})</span>
                  )}
                </p>
                <p className="cart-item-price">{parseFloat(item.price).toFixed(2)} THB</p>
              </div>
              <div className="cart-controls">
                <button
                  className="button_3"
                  onClick={() => updateCartItem(item.id, item.count - 1, item.options)}
                >
                  -
                </button>
                <span className="item-count">{item.count}</span>
                <button
                  className="button_4"
                  onClick={() => updateCartItem(item.id, item.count + 1, item.options)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
        <div className="order-notes">
          <input
            type="text"
            placeholder="Leave your additional notes for your orders here ..."
            value={orderNotes}
            onChange={handleOrderNotesChange}
            className="order-notes-input"
          />
        </div>
        <div className="cart-footer">
          <div className="total-price">
            <h3>Total</h3>
            <span>{totalPrice.toFixed(2)} THB</span>
          </div>
          <button
            className="order-button"
            onClick={handleOrder}
            disabled={cart.length === 0}
          >
            Order Now
          </button>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default AddCart;