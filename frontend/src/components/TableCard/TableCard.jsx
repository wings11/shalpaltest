import React, { useState } from "react";
import "./TableCard.css";
// import { assets } from "../../assets/assets";
import axios from "axios";

const TableCard = ({ name, onDelete, onEdit }) => {
  const [showTableDelete, setShowTableDelete] = useState(false);
  const [showTableEdit, setShowTableEdit] = useState(false);
  const [newTableName, setNewTableName] = useState(name);
  const [qrCode, setQrCode] = useState(null);

  const showDelete = () => {
    setShowTableDelete(true);
  };
  const showEdit = () => {
    setShowTableEdit(true);
  };

  const closeAlert = () => {
    setShowTableDelete(false);
    setShowTableEdit(false);
    setQrCode(null); // Reset QR code on close
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(name);
    }
    closeAlert();
  };

  const handleEditConfirm = () => {
    if (onEdit && newTableName.trim() && newTableName !== name) {
      onEdit(name, newTableName.trim());
    }
    closeAlert();
  };

  const handleGenerateQR = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/qr/${newTableName}`
      );
      setQrCode(response.data.qrCodeImage);
    } catch (error) {
      console.error("QR generation error:", error);
    }
  };

  return (
    <div className="tablecard">
      <span className="tablecard-name">{name}</span>
      <img src="https://res.cloudinary.com/dakgb0zrs/image/upload/v1745432894/camp-chair_xqdfxr.svg" alt="logo" />
      <div className="tablecard-details">
        <span onClick={showDelete} className="delete-text">
          Delete
        </span>
        <span onClick={showEdit} className="edit-text">
          Edit
        </span>
      </div>
      {showTableDelete && (
        <div className="alert-overlay-delete">
          <div className="alert-box-delete">
            <i onClick={closeAlert} className="bi bi-x-lg"></i>
            <p>Are you sure you want to delete?</p>
            <div className="alert-buttons">
              <i
                onClick={handleDeleteConfirm}
                className="bi bi-check-circle"
              ></i>
              <i onClick={closeAlert} className="bi bi-x-circle"></i>
            </div>
          </div>
        </div>
      )}
      {showTableEdit && (
        <div className="alert-overlay-edit">
          <div className="alert-box-edit">
            <div className="logotext-edit">
              <h2>SHAL PAL</h2> <span>Tea House</span>
            </div>
            <i onClick={closeAlert} className="bi bi-x-lg"></i>
            <span className="table-number-text">Table Number:</span>
            <input
              type="text"
              className="form-control"
              placeholder="Input Table Number"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
            />
            <hr />
            <span>Table QR:</span>
            <span className="get-Qr" onClick={handleGenerateQR}>
              Generate QR Code
            </span>
            {qrCode && <img src={qrCode} alt="QR Code" className="qr-code-img" />}
            <hr />
            <button onClick={handleEditConfirm}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCard;