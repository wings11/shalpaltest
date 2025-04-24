import React from "react";

import { Routes, Route, Outlet } from "react-router-dom";
import TableManagement from "../../components/TableManagement/TableManagement";
import ItemManagement from "../../components/ItemManagement/ItemManagement";

const Management = () => {
  return (
    <div>
      <Routes>
      <Route element={<Outlet />}>
        <Route index element={<ItemManagement />} />
        <Route path="table-management" element={<TableManagement />} />
        <Route path="item-management" element={<ItemManagement />} />
      </Route>
    </Routes>
    </div>
  );
};

export default Management;