
import React, { createContext, useState, useContext } from "react";
import { tableNo, menuItems, employees } from "../assets/assets";
import { v4 as uuidv4 } from "uuid";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [pendingItems, setPendingItems] = useState({});
  const [selectedTable, setSelectedTable] = useState("A1");
  const [cardClickCounts, setCardClickCounts] = useState({});
  const [items, setItems] = useState(menuItems);
  const [tableitems, setTableitems] = useState(tableNo);
  const [employeeList, setEmployeeList] = useState(employees);

  // Payment options
  const [paymentOptions, setPaymentOptions] = useState([
    {
      id: uuidv4(),
      name: "Cash",
      enabled: true,
      showImageInInvoice: false,
      image: null,
    },
    {
      id: uuidv4(),
      name: "PromptPay",
      enabled: true,
      showImageInInvoice: false,
      image: null,
    },
    {
      id: uuidv4(),
      name: "Master Card",
      enabled: true,
      showImageInInvoice: false,
      image: null,
    },
  ]);
  const [taxes, setTaxes] = useState([
    { id: uuidv4(), name: "VAT", rate: 7, enabled: true },
  ]);
  const [charges, setCharges] = useState([
    { id: uuidv4(), name: "Service Charge", rate: 10, enabled: true },
  ]);
  const [discounts, setDiscounts] = useState([
    { id: uuidv4(), name: "Student Discount", rate: 5, enabled: true },
  ]);

  // Employee management functions
  const addEmployee = (newEmployee) => {
    setEmployeeList((prevList) => [...prevList, newEmployee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployeeList((prevList) =>
      prevList.map((emp) =>
        emp._id === updatedEmployee._id ? { ...emp, ...updatedEmployee } : emp
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployeeList((prevList) => prevList.filter((emp) => emp._id !== id));
  };

  // Order management functions
  const addOrder = (tableNo, newItems) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.tableNo === tableNo && order.status === "New"
      );
      const now = new Date();
      if (existingOrderIndex !== -1) {
        const existingItems = prevOrders[existingOrderIndex].items;
        const uniqueNewItems = newItems.filter(
          (newItem) => !existingItems.some((item) => item.id === newItem.id)
        );
        const updatedOrder = {
          ...prevOrders[existingOrderIndex],
          items: [...existingItems, ...uniqueNewItems],
        };
        const newOrders = [...prevOrders];
        newOrders[existingOrderIndex] = updatedOrder;
        return newOrders;
      } else {
        const newOrder = {
          id: Date.now(),
          tableNo,
          items: newItems,
          status: "New",
          date: now.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          time: now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        return [...prevOrders, newOrder];
      }
    });
    setCardClickCounts((prev) => {
      const newCounts = { ...prev };
      Object.keys(newCounts).forEach((key) => {
        if (key.startsWith(`${tableNo}_`)) delete newCounts[key];
      });
      return newCounts;
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      const order = updatedOrders.find((order) => order.id === orderId);
      if (order && newStatus === "In Process") clearPendingItems(order.tableNo);
      return updatedOrders;
    });
  };

  const cancelOrder = (orderId) => {
    setOrders((prevOrders) => {
      const orderToCancel = prevOrders.find((order) => order.id === orderId);
      if (orderToCancel) {
        setCardClickCounts((prev) => {
          const newCounts = { ...prev };
          orderToCancel.items.forEach((item) => {
            const key = `${orderToCancel.tableNo}_${item.itemName}`;
            delete newCounts[key];
          });
          return newCounts;
        });
        clearPendingItems(orderToCancel.tableNo);
      }
      return prevOrders.filter((order) => order.id !== orderId);
    });
  };

  // Updated completeOrder to include paymentMethod
  const completeOrder = (order, orderType, staffName, paymentMethod) => {
    const completedOrder = {
      ...order,
      status: "Completed",
      orderType,
      staffName,
      paymentMethod: paymentMethod || "Cash", // Default to "Cash" if not provided
      completedAt: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setOrderHistory((prevHistory) => [...prevHistory, completedOrder]);
    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
    clearPendingItems(order.tableNo);
  };

  const removeOrderItem = (orderId, itemId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.filter((item) => item.id !== itemId),
            }
          : order
      )
    );
  };

  const addPendingItem = (item) => {
    setPendingItems((prevItems) => {
      const tableItems = prevItems[item.tableNo] || [];
      return { ...prevItems, [item.tableNo]: [...tableItems, item] };
    });
  };

  const removePendingItem = (itemName, tableNo) => {
    setPendingItems((prevItems) => {
      const tableItems = prevItems[tableNo] || [];
      const index = tableItems.findIndex(
        (item) => item.itemName === itemName && item.status === "New"
      );
      if (index !== -1) {
        const newTableItems = [...tableItems];
        newTableItems.splice(index, 1);
        return { ...prevItems, [tableNo]: newTableItems };
      }
      return prevItems;
    });
  };

  const clearPendingItems = (tableNo) => {
    setPendingItems((prevItems) => ({ ...prevItems, [tableNo]: [] }));
  };

  const updateCardClickCount = (cardName, tableNo) => {
    const key = `${tableNo}_${cardName}`;
    setCardClickCounts((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const decreaseCardClickCount = (cardName, tableNo) => {
    const key = `${tableNo}_${cardName}`;
    setCardClickCounts((prev) => {
      const currentCount = prev[key] || 0;
      return currentCount > 0 ? { ...prev, [key]: currentCount - 1 } : prev;
    });
  };

  const resetCardCounts = (tableNo) => {
    setCardClickCounts((prev) => {
      const newCounts = { ...prev };
      Object.keys(newCounts).forEach((key) => {
        if (key.startsWith(`${tableNo}_`)) delete newCounts[key];
      });
      return newCounts;
    });
  };

  const addItem = (newItem) => {
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, _id: newItem._id || Date.now().toString() },
    ]);
  };

  const updateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const addTable = (newTableName) => {
    if (!newTableName.trim()) return;
    const newTable = { id: Date.now(), name: newTableName.trim() };
    setTableitems((prevItems) => [...prevItems, newTable]);
  };

  const deleteTable = (id) => {
    setTableitems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTableOrders = (tableNo) => {
    return orders.filter(
      (order) => order.tableNo === tableNo && order.status === "New"
    );
  };

  const getInProcessOrders = (tableNo) => {
    return orders.filter(
      (order) => order.tableNo === tableNo && order.status === "In Process"
    );
  };

  // Payment, Tax, Charge, and Discount Handlers
  const handlePaymentToggle = (id) => {
    setPaymentOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    );
  };

  const addPaymentOption = (name) => {
    const trimmedName = name.trim();
    if (
      !trimmedName ||
      paymentOptions.some(
        (opt) => opt.name.toLowerCase() === trimmedName.toLowerCase()
      )
    )
      return;
    const newOption = {
      id: uuidv4(),
      name: trimmedName,
      enabled: true,
      showImageInInvoice: false,
      image: null,
    };
    setPaymentOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const editPaymentOption = (id, updatedOption) => {
    setPaymentOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, ...updatedOption } : option
      )
    );
  };

  const deletePaymentOption = (id) => {
    setPaymentOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  };

  const handleTaxToggle = (id) => {
    setTaxes((prevTaxes) =>
      prevTaxes.map((tax) =>
        tax.id === id ? { ...tax, enabled: !tax.enabled } : tax
      )
    );
  };

  const addTax = (tax) => {
    const trimmedName = tax.name.trim();
    if (
      !trimmedName ||
      isNaN(tax.rate) ||
      tax.rate < 0 ||
      taxes.some((t) => t.name.toLowerCase() === trimmedName.toLowerCase())
    )
      return;
    const newTax = {
      id: uuidv4(),
      name: trimmedName,
      rate: parseFloat(tax.rate),
      enabled: tax.enabled,
    };
    setTaxes((prevTaxes) => [...prevTaxes, newTax]);
  };

  const editTax = (id, updatedTax) => {
    setTaxes((prevTaxes) =>
      prevTaxes.map((tax) => (tax.id === id ? { ...tax, ...updatedTax } : tax))
    );
  };

  const deleteTax = (id) => {
    setTaxes((prevTaxes) => prevTaxes.filter((tax) => tax.id !== id));
  };

  const handleChargeToggle = (id) => {
    setCharges((prevCharges) =>
      prevCharges.map((charge) =>
        charge.id === id ? { ...charge, enabled: !charge.enabled } : charge
      )
    );
  };

  const addCharge = (charge) => {
    const trimmedName = charge.name.trim();
    if (
      !trimmedName ||
      isNaN(charge.rate) ||
      charge.rate < 0 ||
      charges.some((c) => c.name.toLowerCase() === trimmedName.toLowerCase())
    )
      return;
    const newCharge = {
      id: uuidv4(),
      name: trimmedName,
      rate: parseFloat(charge.rate),
      enabled: charge.enabled,
    };
    setCharges((prevCharges) => [...prevCharges, newCharge]);
  };

  const editCharge = (id, updatedCharge) => {
    setCharges((prevCharges) =>
      prevCharges.map((charge) =>
        charge.id === id ? { ...charge, ...updatedCharge } : charge
      )
    );
  };

  const deleteCharge = (id) => {
    setCharges((prevCharges) =>
      prevCharges.filter((charge) => charge.id !== id)
    );
  };

  const handleDiscountToggle = (id) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.map((discount) =>
        discount.id === id
          ? { ...discount, enabled: !discount.enabled }
          : discount
      )
    );
  };

  const addDiscount = (discount) => {
    const trimmedName = discount.name.trim();
    if (
      !trimmedName ||
      isNaN(discount.rate) ||
      discount.rate < 0 ||
      discounts.some((d) => d.name.toLowerCase() === trimmedName.toLowerCase())
    )
      return;
    const newDiscount = {
      id: uuidv4(),
      name: trimmedName,
      rate: parseFloat(discount.rate),
      enabled: discount.enabled,
    };
    setDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount]);
  };

  const editDiscount = (id, updatedDiscount) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.map((discount) =>
        discount.id === id ? { ...discount, ...updatedDiscount } : discount
      )
    );
  };

  const deleteDiscount = (id) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.filter((discount) => discount.id !== id)
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderHistory,
        addOrder,
        updateOrderStatus,
        cancelOrder,
        completeOrder,
        removeOrderItem,
        selectedTable,
        setSelectedTable,
        tableNo,
        menuItems,
        pendingItems,
        addPendingItem,
        removePendingItem,
        clearPendingItems,
        cardClickCounts,
        updateCardClickCount,
        decreaseCardClickCount,
        resetCardCounts,
        items,
        addItem,
        updateItem,
        deleteItem,
        tableitems,
        addTable,
        deleteTable,
        getTableOrders,
        getInProcessOrders,
        employeeList,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        paymentOptions,
        handlePaymentToggle,
        addPaymentOption,
        editPaymentOption,
        deletePaymentOption,
        taxes,
        handleTaxToggle,
        addTax,
        editTax,
        deleteTax,
        charges,
        handleChargeToggle,
        addCharge,
        editCharge,
        deleteCharge,
        discounts,
        handleDiscountToggle,
        addDiscount,
        editDiscount,
        deleteDiscount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
