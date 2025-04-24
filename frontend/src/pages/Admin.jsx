import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
    const [qrCode, setQrCode] = useState(null);
    const [tableNumber, setTableNumber] = useState("");


    const handleGenerateQR = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/qr/${tableNumber}`);
            setQrCode(response.data.qrCodeImage);
        } catch (error) {
            console.error("QR generation error:", error);
        }
    };

    return (
        <div className="admin">
            <h1>Admin Dashboard</h1>
            <div>
                <input
                    type="text"x
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Table Number"
                />
                <button onClick={handleGenerateQR}>Generate QR Code</button>
            </div>
            {qrCode && <img src={qrCode} alt="QR Code" />}
            <h2>Orders</h2>
            
        </div>
    );
};

export default Admin;