import React, { useState, useEffect } from "react";
import "./TableCardDisplay.css";
import TableCard from "../TableCard/TableCard";
import axios from "axios";

const TableCardDisplay = () => {
  const [tableitems, setTableitems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [error, setError] = useState(null);

  // Fetch tables on mount
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/tables");
        setTableitems(response.data.map((table) => ({
          id: table.id,
          name: table.table_number,
        })));
      } catch (err) {
        console.error("Error fetching tables:", err);
        setError("Failed to load tables");
      }
    };
    fetchTables();
  }, []);

  const handleDelete = async (name) => {
    try {
      const tableToDelete = tableitems.find((table) => table.name === name);
      if (tableToDelete) {
        await axios.delete(`http://localhost:5000/api/admin/tables/${tableToDelete.id}`);
        setTableitems(tableitems.filter((table) => table.id !== tableToDelete.id));
        console.log(`Deleted table: ${name}`);
      } else {
        console.error(`Table with name ${name} not found`);
      }
    } catch (err) {
      console.error("Error deleting table:", err);
      setError("Failed to delete table");
    }
  };

  const handleEdit = async (oldName, newName) => {
    try {
      const tableToEdit = tableitems.find((table) => table.name === oldName);
      if (tableToEdit) {
        await axios.put(`http://localhost:5000/api/admin/tables/${tableToEdit.id}`, {
          table_number: newName,
        });
        setTableitems(
          tableitems.map((table) =>
            table.id === tableToEdit.id ? { ...table, name: newName } : table
          )
        );
        console.log(`Edited table from ${oldName} to ${newName}`);
      }
    } catch (err) {
      console.error("Error editing table:", err);
      setError("Failed to edit table");
    }
  };

  const handleAddTable = async () => {
    if (!newTableName.trim()) {
      console.error("Table name cannot be empty");
      setError("Table name cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/admin/tables", {
        table_number: newTableName.trim(),
      });
      const newTable = {
        id: response.data.id,
        name: response.data.table_number,
      };
      setTableitems((prevItems) => [...prevItems, newTable]);
      console.log(`Added table: ${newTableName}`);
      setNewTableName("");
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding table:", err);
      setError("Failed to add table");
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewTableName("");
    setError(null);
  };

  return (
    <div className="table-card-display">
      {error && <p className="error">{error}</p>}
      <div className="table-card-grid">
        {tableitems.map((tableitem) => (
          <TableCard
            key={tableitem.id}
            name={tableitem.name}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
        <div className="tablecard add-table-card" onClick={openAddModal}>
          <div className="add-table-content">
            <i className="bi bi-plus-circle" />
            <span className="text-add">Add New Table</span>
          </div>
        </div>
        {showAddModal && (
          <div className="alert-overlay-add-table">
            <div className="alert-box-add-table">
              <i onClick={closeAddModal} className="bi bi-x-lg"></i>
              <h3 className="table-number-text">Enter New Table Number</h3>
              <input
                type="text"
                className="alert-box-input-table"
                placeholder="Input Table Number"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
              />
              <div className="alert-box-buttons">
                <button onClick={handleAddTable}>Confirm</button>
                <button onClick={closeAddModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableCardDisplay;