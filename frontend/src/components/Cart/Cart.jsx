import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Cart.css";

import { StoreContext } from "../../context/StoreContextProvider";

const Cart = () => {
  const { cart } = useContext(StoreContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const table = queryParams.get('table');
  const token = queryParams.get('token');

  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  const cartPath = `/addcart${table && token ? `?table=${table}&token=${token}` : ''}`;

  return (
    <div className="cart">
      <Link to={cartPath}>
        <div className="cart-container">
          <img src='https://res.cloudinary.com/dakgb0zrs/image/upload/v1745478614/cart_xxdjmj.svg' alt="cart" />
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Cart;