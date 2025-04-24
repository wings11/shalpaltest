import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContextProvider";

// import  assets  from "../../assets/assets.js";
import "./CheckoutCard.css";

const CheckoutCard = ({ name, orderType, staffName }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    items: [],
    subtotal: "0.00",
    taxes: [],
    charges: [],
    discounts: [],
    grandTotal: "0.00",
    dateTime: "N/A",
    paymentMethod: ""
  });

  const {
    getInProcessOrders,
    getTableOrders,
    completeOrder,
    taxes,
    charges,
    discounts,
    paymentOptions
  } = useContext(StoreContext);

  const tableOrders = getInProcessOrders(name);
  const newOrders = getTableOrders(name);

  let cardColorClass = "";
  if (newOrders.length > 0) cardColorClass = "new-order";
  else if (tableOrders.length > 0 && !hasCheckedOut)
    cardColorClass = "in-process";
  else cardColorClass = "normal";

  const handleCardClick = () => {
    if (tableOrders.length === 0 && !hasCheckedOut) {
      alert(`No "In Process" orders found for Table ${name}.`);
      return;
    }
    if (tableOrders.length > 0 && !hasCheckedOut) {
      const allItems = tableOrders.reduce(
        (acc, order) => [...acc, ...order.items],
        []
      );
      const items = getTableItems(allItems);
      const subtotal = parseFloat(getTotalAmount(allItems));
      const enabledTaxes = taxes
        .filter((tax) => tax.enabled)
        .map((tax) => ({
          name: tax.name,
          rate: tax.rate,
          amount: (subtotal * (tax.rate / 100)).toFixed(2)
        }));
      const enabledCharges = charges
        .filter((charge) => charge.enabled)
        .map((charge) => ({
          name: charge.name,
          rate: charge.rate,
          amount: (subtotal * (charge.rate / 100)).toFixed(2)
        }));
      const enabledDiscounts = discounts
        .filter((discount) => discount.enabled)
        .map((discount) => ({
          name: discount.name,
          rate: discount.rate,
          amount: (subtotal * (discount.rate / 100)).toFixed(2)
        }));
      const totalTaxAmount = enabledTaxes.reduce(
        (sum, tax) => sum + parseFloat(tax.amount),
        0
      );
      const totalChargeAmount = enabledCharges.reduce(
        (sum, charge) => sum + parseFloat(charge.amount),
        0
      );
      const totalDiscountAmount = enabledDiscounts.reduce(
        (sum, discount) => sum + parseFloat(discount.amount),
        0
      );
      const grandTotal = (
        subtotal +
        totalTaxAmount +
        totalChargeAmount -
        totalDiscountAmount
      ).toFixed(2);
      const firstOrder = tableOrders[0];
      const dateTime = firstOrder
        ? `${new Date(firstOrder.created_at).toLocaleDateString()} | ${new Date(
            firstOrder.created_at
          ).toLocaleTimeString()}`
        : "N/A";
      const defaultPayment =
        paymentOptions.find((opt) => opt.enabled)?.name || "Cash";

      setInvoiceData({
        items,
        subtotal: subtotal.toFixed(2),
        taxes: enabledTaxes,
        charges: enabledCharges,
        discounts: enabledDiscounts,
        grandTotal,
        dateTime,
        paymentMethod: defaultPayment
      });
    }
    setShowModal(true);
  };

  const handleCheckout = () => {
    console.log(
      `Checking out for table ${name} with payment: ${invoiceData.paymentMethod}`
    );
    tableOrders.forEach((order) =>
      completeOrder(order, orderType, staffName, invoiceData.paymentMethod)
    );
    setHasCheckedOut(true);
  };

  const handlePrint = () => {
    console.log(`Printing receipt for table ${name}`);
    window.print();
    setShowModal(false);
    setHasCheckedOut(false);
    setInvoiceData({
      items: [],
      subtotal: "0.00",
      taxes: [],
      charges: [],
      discounts: [],
      grandTotal: "0.00",
      dateTime: "N/A",
      paymentMethod: ""
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setHasCheckedOut(false);
    setInvoiceData({
      items: [],
      subtotal: "0.00",
      taxes: [],
      charges: [],
      discounts: [],
      grandTotal: "0.00",
      dateTime: "N/A",
      paymentMethod: ""
    });
  };

  const getTableItems = (items) => {
    const validItems = items.filter(
      (item) => item.name && !isNaN(parseFloat(item.price))
    );
    const itemMap = validItems.reduce((acc, item) => {
      const key = `${item.name}-${item.price}-${JSON.stringify(item.options || [])}`;
      if (!acc[key]) {
        const price = parseFloat(item.price) || 0;
        acc[key] = {
          itemName: item.name,
          itemPrice: price.toFixed(2),
          qty: 0,
          options: item.options || [],
          ids: []
        };
      }
      acc[key].qty += item.count || 1;
      acc[key].ids.push(item.uniqueId);
      return acc;
    }, {});
    return Object.values(itemMap).map((item) => ({
      ...item,
      amount: (item.qty * parseFloat(item.itemPrice)).toFixed(2)
    }));
  };

  const getTotalAmount = (items) => {
    const tableItems = getTableItems(items);
    return tableItems
      .reduce((sum, item) => sum + parseFloat(item.amount), 0)
      .toFixed(2);
  };

  const displayItems = hasCheckedOut
    ? invoiceData.items
    : getTableItems(
        tableOrders.reduce((acc, order) => [...acc, ...order.items], [])
      );
  const displaySubtotal = hasCheckedOut
    ? invoiceData.subtotal
    : getTotalAmount(
        tableOrders.reduce((acc, order) => [...acc, ...order.items], [])
      );
  const displayTaxes = hasCheckedOut
    ? invoiceData.taxes
    : taxes
        .filter((tax) => tax.enabled)
        .map((tax) => ({
          name: tax.name,
          rate: tax.rate,
          amount: (parseFloat(displaySubtotal) * (tax.rate / 100)).toFixed(2)
        }));
  const displayCharges = hasCheckedOut
    ? invoiceData.charges
    : charges
        .filter((charge) => charge.enabled)
        .map((charge) => ({
          name: charge.name,
          rate: charge.rate,
          amount: (parseFloat(displaySubtotal) * (charge.rate / 100)).toFixed(2)
        }));
  const displayDiscounts = hasCheckedOut
    ? invoiceData.discounts
    : discounts
        .filter((discount) => discount.enabled)
        .map((discount) => ({
          name: discount.name,
          rate: discount.rate,
          amount: (parseFloat(displaySubtotal) * (discount.rate / 100)).toFixed(2)
        }));
  const totalTaxAmount = displayTaxes.reduce(
    (sum, tax) => sum + parseFloat(tax.amount),
    0
  );
  const totalChargeAmount = displayCharges.reduce(
    (sum, charge) => sum + parseFloat(charge.amount),
    0
  );
  const totalDiscountAmount = displayDiscounts.reduce(
    (sum, discount) => sum + parseFloat(discount.amount),
    0
  );
  const displayGrandTotal = hasCheckedOut
    ? invoiceData.grandTotal
    : (
        parseFloat(displaySubtotal) +
        totalTaxAmount +
        totalChargeAmount -
        totalDiscountAmount
      ).toFixed(2);
  const displayDateTime = hasCheckedOut
    ? invoiceData.dateTime
    : tableOrders[0]
      ? `${new Date(tableOrders[0].created_at).toLocaleDateString()} | ${new Date(
          tableOrders[0].created_at
        ).toLocaleTimeString()}`
      : "N/A";
  const displayPaymentMethod = hasCheckedOut ? invoiceData.paymentMethod : "";
  const paymentImage = paymentOptions.find(
    (opt) =>
      opt.name === displayPaymentMethod && opt.enabled && opt.showImageInInvoice
  )?.image;

  return (
    <>
      <div
        className={`checkout-card ${cardColorClass}`}
        onClick={handleCardClick}
      >
        <h3>{name}</h3>
      </div>
      {showModal && (
        <div className="invoice-overlay" onClick={handleCloseModal}>
          <div className="invoice-box" onClick={(e) => e.stopPropagation()}>
            <div className="invoice-header">
              {/* <img src={assets.logo} alt="logo" /> */}
              <h6>
                Ek Thaksin 5 Alley, Lak Hok, Mueang Pathum Thani District,
                Pathum Thani 12000
              </h6>
            </div>
            <hr className="green-hr" />
            <div className="invoice-content">
              <p>
                <span>TableNo:</span>
                <span>{name}</span>
              </p>
              <p>
                <span>Order type:</span>
                <span>{orderType}</span>
              </p>
              <p>
                <span>Date and Time:</span>
                <span>{displayDateTime}</span>
              </p>
              <p>
                <span>Staff Name:</span>
                <span>{staffName || "Not Selected"}</span>
              </p>
              <hr className="green-hr" />
              <div className="invoice-items">
                {displayItems.length > 0 ? (
                  <table className="invoice-table">
                    <thead>
                      <tr>
                        <th>Items</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {index + 1}. {item.itemName}{" "}
                            {item.options.length > 0 &&
                              `(${item.options.join(", ")})`}
                          </td>
                          <td>{item.itemPrice} B</td>
                          <td>{item.qty}</td>
                          <td>{item.amount} B</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items to display.</p>
                )}
              </div>
              <hr className="green-hr" />
              <div className="invoice-total">
                <p>
                  Subtotal: <span>{displaySubtotal} B</span>
                </p>
                {displayTaxes.map((tax, index) => (
                  <p key={index}>
                    {tax.name} ({tax.rate}%): <span>{tax.amount} B</span>
                  </p>
                ))}
                {displayCharges.map((charge, index) => (
                  <p key={index}>
                    {charge.name} ({charge.rate}%):{" "}
                    <span>{charge.amount} B</span>
                  </p>
                ))}
                {displayDiscounts.map((discount, index) => (
                  <p key={index}>
                    {discount.name} ({discount.rate}%):{" "}
                    <span>-{discount.amount} B</span>
                  </p>
                ))}
                <p>
                  Total: <span>{displayGrandTotal} B</span>
                </p>
              </div>
            </div>
            <div className="payment">
              <p>Thank You and See You Again</p>
              {hasCheckedOut && displayPaymentMethod && (
                <p>Paid via: {displayPaymentMethod}</p>
              )}
              <div className="Qr">
                {paymentImage && (
                  <img
                    src={paymentImage}
                    alt="Payment Method"
                    className="payment-image"
                  />
                )}
              </div>
            </div>
            <div className="invoice-buttons">
              {!hasCheckedOut && tableOrders.length > 0 && (
                <button
                  className="invoice-btn checkout-btn"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              )}
              <button className="invoice-btn print-btn" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutCard;