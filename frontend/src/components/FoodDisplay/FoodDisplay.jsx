import React from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContextProvider";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category, customClass }) => {
  const { food_list } = useContext(StoreContext);
  const filteredItems = food_list.filter((item) => item.category === category);
  return (
    <div className={`foodDisplay ${customClass}`}>
      <div className="foodDisplaylist">
        {filteredItems.map((item) => (
           <FoodItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;