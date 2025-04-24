import React, { useContext, useState } from "react";
import Layout_1 from "../../Layout/Layout_1/Layout_1";
import CardDisplay from "../../components/CardDisplay/CardDisplay";
import { StoreContext } from "../../context/StoreContextProvider";
import "./CreateOrder.css";

const CreateOrder = () => {
  const { cart, tables, placeOrder, clearCart } = useContext(StoreContext);
  const [selectedTable, setSelectedTable] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmitOrder = async () => {
    if (!selectedTable) {
      setError("Please select a table");
      return;
    }
    if (cart.length === 0) {
      setError("Cart is empty");
      return;
    }
    try {
      await placeOrder(selectedTable, notes);
      setSuccess("Order placed successfully!");
      setError(null);
      setNotes("");
      setSelectedTable("");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to place order");
      setSuccess(null);
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.count, 0);
  const totalPrice = cart.reduce(
    (total, item) => {
      const meatAdjustment = item.options && item.options.length > 0
        ? { Chicken: 20, Pork: 40, Beef: 60, Seafood: 60 }[item.options[0]] || 0
        : 0;
      return total + (parseFloat(item.price) + meatAdjustment) * item.count;
    },
    0
  );

  return (
    <Layout_1>
      <div className="create-order-content">
        <h2>Create Order</h2>
        <div className="order-form">
          <div className="form-group">
            <label htmlFor="table-select">Select Table *</label>
            <select
              id="table-select"
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
            >
              <option value="">Choose a table</option>
              {tables.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
          </div>
          <CardDisplay selectedTable={selectedTable} />
          {cart.length > 0 && (
            <div className="cart-summary">
              <h3>Cart Summary</h3>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.name} {item.options?.length > 0 ? `(${item.options[0]})` : ""} x {item.count} - $
                    {(
                      (parseFloat(item.price) +
                        (item.options?.length > 0
                          ? { Chicken: 20, Pork: 40, Beef: 60, Seafood: 60 }[item.options[0]] || 0
                          : 0)) * item.count
                    ).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Total Items: {totalItems}</p>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., No onions, extra spicy"
                />
              </div>
              <button onClick={handleSubmitOrder}>Place Order</button>
            </div>
          )}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      </div>
    </Layout_1>
  );
};

export default CreateOrder;