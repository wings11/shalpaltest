import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PopularPicks from "./pages/Popular Picks/Popular Picks";
import Specials from "./pages/Burmese Specials/Specials";
import Salads from "./pages/Burmese Salads/Salads";
import Snacks from "./pages/Burmese Snacks/Snacks";
import Drinks from "./pages/Drinks/Drinks";
import Today from "./pages/Today/Today";
import Combo from "./pages/Combo/Combo";
import AddCart from "./pages/AddCart/AddCart";
import CheckOut from "./pages/CheckOut/CheckOut";
import Admin from "./pages/Admin";
import Login from "./pages/LoginA/Login";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import StoreContextProvider from "./context/StoreContextProvider";
import Orders from "./pages/Orders/Orders";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import CheckOutA from "./pages/CheckOutA/CheckOutA";
import Management from "./pages/Management/Management";
import Layout_3 from "./Layout/Layout_3/Layout_3";
import HomeA from "./pages/HomeA/HomeA";
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import "./App.css";


const App = () => {
  return (
    <div className="app">
      <StoreContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateOrder" element={<CreateOrder />} />
          
          <Route path="/PopularPicks" element={<PopularPicks />} />
          <Route path="/Specials" element={<Specials />} />
          <Route path="/Salads" element={<Salads />} />
          <Route path="/Snacks" element={<Snacks />} />
          <Route path="/Drinks" element={<Drinks />} />
          <Route path="/Today" element={<Today />} />
          <Route path="/Combo" element={<Combo />} />
          <Route path="/AddCart" element={<AddCart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AdminOrders" element={<AdminOrders />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Orderhistory" element={<OrderHistory />} />
          <Route path="/CheckOutA" element={<CheckOutA />} />
          <Route path="/management/*" element={<Layout_3 />}>
        <Route path="*" element={<Management />} />
      </Route>
          {/* <Route path="/Management" element={<Management />} /> */}
        </Routes>
      </StoreContextProvider>
    </div>
  );
};

export default App;