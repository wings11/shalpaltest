import React, { useContext, useState } from "react";
import "./Card.css";
import { StoreContext } from "../../context/StoreContextProvider";

const Card = ({ id, name, price, image, meat_options, selectedTable }) => {
  const { addToCart, updateCartItem, cart } = useContext(StoreContext);
  const [selectedMeat, setSelectedMeat] = useState("None");
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    if (!selectedTable) {
      alert("Please select a table");
      return;
    }
    const options = selectedMeat === "None" ? [] : [selectedMeat];
    addToCart({
      id,
      name,
      price,
      basePrice: price,
      options,
    });
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 300);
  };

  const handleDecrease = () => {
    const options = selectedMeat === "None" ? [] : [selectedMeat];
    const item = cart.find(
      (cartItem) =>
        cartItem.id === id &&
        JSON.stringify(cartItem.options || []) === JSON.stringify(options)
    );
    if (item && item.count > 0) {
      updateCartItem(id, item.count - 1, options);
      setIsSelected(true);
      setTimeout(() => setIsSelected(false), 300);
    }
  };

  const handleMeatChange = (meat) => {
    setSelectedMeat(meat);
  };

  const clickCount = cart.reduce((total, item) => {
    if (
      item.id === id &&
      JSON.stringify(item.options || []) === JSON.stringify(selectedMeat === "None" ? [] : [selectedMeat])
    ) {
      return total + item.count;
    }
    return total;
  }, 0);

  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={handleCardClick}
    >
      {clickCount > 0 && (
        <>
          <span className="click-count">{clickCount}</span>
          <div
            className="minus-container"
            onClick={(e) => {
              e.stopPropagation();
              handleDecrease();
            }}
          >
            <button className="minus-button">-</button>
          </div>
        </>
      )}
      {image ? (
        <img src={`http://localhost:5000${image}`} alt={name} className="card-image" />
      ) : (
        <div className="card-image"></div>
      )}
      <div className="card-details">
        <span className="card-name">{name}</span>
        <span className="card-price">${parseFloat(price).toFixed(2)}</span>
      </div>
      <div className="meat-selection">
        <span>Select Meat: </span>
        {meat_options && meat_options.length > 0 ? (
          meat_options.map((meat) => (
            <label key={meat}>
              <input
                type="checkbox"
                checked={selectedMeat === meat}
                onChange={() => handleMeatChange(meat)}
                onClick={(e) => e.stopPropagation()}
              />
              {meat}
            </label>
          ))
        ) : (
          <label>
            <input
              type="checkbox"
              checked={selectedMeat === "None"}
              onChange={() => handleMeatChange("None")}
              onClick={(e) => e.stopPropagation()}
            />
            None
          </label>
        )}
      </div>
    </div>
  );
};

export default Card;