import React, { useContext } from "react";
import Card from "../Card/Card";
import "./CardDisplay.css";
import { StoreContext } from "../../context/StoreContextProvider";

const CardDisplay = ({ selectedTable }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="card-display">
      <div className="card-grid">
        {food_list.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            meat_options={item.meat_options}
            selectedTable={selectedTable}
          />
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;