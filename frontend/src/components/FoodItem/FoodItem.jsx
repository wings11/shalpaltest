// import React, { useState, useContext } from "react";
// import { StoreContext } from "../../context/StoreContextProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./FoodItem.css";

// const FoodItem = ({ item }) => {
//   const { addToCart } = useContext(StoreContext);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const getMeatPriceAdjustment = (meat) => {
//     switch (meat) {
//       case "Chicken": return 20;
//       case "Pork": return 40;
//       case "Beef": return 60;
//       case "Seafood": return 60;
//       default: return 0;
//     }

    
//   };

//   const calculateDisplayPrice = () => {
//     const basePrice = parseFloat(item.price) || 0;
//     const meatPrice = selectedOption ? getMeatPriceAdjustment(selectedOption) : 0;
//     return (basePrice + meatPrice).toFixed(2);
//   };

//   const handleOptionChange = (option) => {
//     setSelectedOption((prevOption) => (prevOption === option ? null : option));
//   };

//   const handleAddToCart = () => {
//     const options = selectedOption ? [selectedOption] : [];
//     const meatPriceAdjustment = selectedOption ? getMeatPriceAdjustment(selectedOption) : 0;
//     addToCart({
//       id: item.id,
//       name: item.name,
//       basePrice: item.price, // Store base price
//       price: (parseFloat(item.price) + meatPriceAdjustment).toFixed(2), // Adjusted price
//       options,
//       count: 1
//     });
//     const cartPath = `/AddCart?${queryParams.toString()}`;
//     navigate(cartPath);
//   };

//   if (!item) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="foodItem">
//       <div className="foodimgcontainer">
//         <img src={item.image || "/placeholder.png"} alt={item.name} />
//       </div>
//       <div className="foodinfo">
//         <p>{item.name}</p>
//         <span>{item.description}</span>
//         {item.options && item.options.length > 0 && (
//           <div className="fooditem-options">
//             {item.options.map((option, index) => (
//               <button
//                 key={index}
//                 className={`option-button ${selectedOption === option ? "selected" : ""}`}
//                 onClick={() => handleOptionChange(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="price-addtocart">
//         <p>{calculateDisplayPrice()} THB</p>
//         <button onClick={handleAddToCart}>
//           <i className="bi bi-plus-circle"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;


// import React, { useState, useContext } from "react";
// import { StoreContext } from "../../context/StoreContextProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./FoodItem.css";

// const FoodItem = ({ item }) => {
//   const { addToCart } = useContext(StoreContext);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const getMeatPriceAdjustment = (meat) => {
//     switch (meat) {
//       case "Chicken": return 20;
//       case "Pork": return 40;
//       case "Beef": return 60;
//       case "Seafood": return 60;
//       default: return 0;
//     }
//   };

//   const calculateDisplayPrice = () => {
//     const basePrice = parseFloat(item.price) || 0;
//     const meatPrice = selectedOption ? getMeatPriceAdjustment(selectedOption) : 0;
//     return (basePrice + meatPrice).toFixed(2);
//   };

//   const handleOptionChange = (option) => {
//     setSelectedOption((prevOption) => (prevOption === option ? null : option));
//   };

//   const handleAddToCart = () => {
//     const options = selectedOption ? [selectedOption] : [];
//     const meatPriceAdjustment = selectedOption ? getMeatPriceAdjustment(selectedOption) : 0;
//     addToCart({
//       id: item.id,
//       name: item.name,
//       basePrice: item.price.toString(), // Ensure string
//       price: (parseFloat(item.price) + meatPriceAdjustment).toFixed(2), // Adjusted price
//       options,
//       count: 1
//     });
   
//   };

//   if (!item) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="foodItem">
//       <div className="foodimgcontainer">
//         <img src={item.image || "/placeholder.png"} alt={item.name} />
//       </div>
//       <div className="foodinfo">
//         <p>{item.name}</p>
//         <span>{item.description}</span>
//         {item.options && item.options.length > 0 && (
//           <div className="fooditem-options">
//             {item.options.map((option, index) => (
//               <button
//                 key={index}
//                 className={`option-button ${selectedOption === option ? "selected" : ""}`}
//                 onClick={() => handleOptionChange(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="price-addtocart">
//         <p>{calculateDisplayPrice()} THB</p>
//         <button onClick={handleAddToCart}>
//           <i className="bi bi-plus-circle"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;


import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContextProvider";
import { useLocation } from "react-router-dom";
import "./FoodItem.css";

const FoodItem = ({ item }) => {
  const { addToCart } = useContext(StoreContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  console.log('FoodItem received:', item);

  const getMeatPriceAdjustment = (meat) => {
    switch (meat) {
      case "Chicken": return 20;
      case "Pork": return 40;
      case "Beef": return 60;
      case "Seafood": return 60;
      default: return 0;
    }
  };

  const calculateDisplayPrice = () => {
    const basePrice = parseFloat(item.price) || 0;
    const meatPrice = selectedOption ? getMeatPriceAdjustment(selectedOption) : 0;
    return (basePrice + meatPrice).toFixed(2);
  };

  const handleOptionChange = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

  const handleAddToCart = () => {
    const options = selectedOption ? [selectedOption] : [];
    const meatPriceAdjustment = selectedOption ? getMeatPriceAdjustment(selectedOption) : 0;
    const cartItem = {
      id: item.id,
      name: item.name,
      basePrice: item.price.toString(),
      price: (parseFloat(item.price) + meatPriceAdjustment).toFixed(2),
      options,
      count: 1,
      uniqueId: `${item.id}-${Date.now()}-${Math.random()}`
    };
    console.log('Adding to cart:', cartItem);
    addToCart(cartItem);
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="foodItem">
      <div className="foodimgcontainer">
        <img src={item.image ? `http://localhost:5000${item.image}` : '/placeholder.jpg'}alt={item.name}className="menu-item-image"/>
      </div>
      <div className="foodinfo">
        <p>{item.name}</p>
        <span>{item.description}</span>
        {item.options && item.options.length > 0 ? (
          <div className="fooditem-options">
            {item.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? "selected" : ""}`}
                onClick={() => handleOptionChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div className="price-addtocart">
        <p>{calculateDisplayPrice()} THB</p>
        <button onClick={handleAddToCart}>
          <i className="bi bi-plus-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default FoodItem;