import React, { useState } from "react";
import ItemManagementCard from "../ItemManagementCard/ItemManagementCard";
import "./ItemManagementDisplay.css";
import { StoreContext } from "../../context/StoreContextProvider";

const ItemManagementDisplay = () => {
  const { food_list: items, addItem, updateItem, deleteItem, categories, meatOptions } = React.useContext(StoreContext);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemImageFile, setNewItemImageFile] = useState(null);
  const [newItemImagePreview, setNewItemImagePreview] = useState(null);
  const [newItemMeats, setNewItemMeats] = useState([]);
  const [error, setError] = useState(null);

  const closeAlert = () => {
    setShowAlertBox(false);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemCategory("");
    setNewItemDescription("");
    setNewItemImageFile(null);
    setNewItemImagePreview(null);
    setNewItemMeats([]);
    setError(null);
  };

  const handleAddItem = () => {
    setShowAlertBox(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewItemImageFile(file);
      setNewItemImagePreview(imageUrl);
    }
  };

  const handleMeatChange = (meat) => {
    setNewItemMeats((prev) => {
      if (meat === "None") {
        return prev.includes("None") ? [] : ["None"];
      }
      if (prev.includes("None")) {
        return [meat];
      }
      return prev.includes(meat) ? prev.filter((m) => m !== meat) : [...prev, meat];
    });
  };

  const handleAlertBoxSubmit = async (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) {
      setError("Name and price are required");
      return;
    }
    if (isNaN(parseFloat(newItemPrice)) || parseFloat(newItemPrice) <= 0) {
      setError("Price must be a valid number greater than 0");
      return;
    }
    try {
      await addItem({
        name: newItemName,
        price: parseFloat(newItemPrice).toFixed(2),
        description: newItemDescription,
        category: newItemCategory,
        imageFile: newItemImageFile,
        meats: newItemMeats,
      });
      closeAlert();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add item");
    }
  };

  const handleAlertBoxCancel = () => {
    closeAlert();
  };

  const handleEdit = (id) => {
    console.log(`Edit item with ID: ${id}`);
  };

  const handleSave = async (updatedItem) => {
    try {
      await updateItem(updatedItem.id, updatedItem);
      console.log("Item saved:", updatedItem);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save item");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        console.log(`Deleted item with ID: ${id}`);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete item");
      }
    }
  };

  return (
    <div className="item-management-container">
      {error && <p className="error">{error}</p>}
      <div className="table-container">
        <table className="item-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Meat Options</th>
              <th>Description</th>
              <th>Photo</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <ItemManagementCard
                key={item.id}
                index={index + 1}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSave={handleSave}
                showAddButton={index === items.length - 1}
                onAdd={handleAddItem}
                categories={categories}
                meatOptions={meatOptions}
              />
            ))}
          </tbody>
        </table>
      </div>
      {showAlertBox && (
        <div className="custom-alert-box-item">
          <div className="alert-box-content-item">
            <i onClick={closeAlert} className="bi bi-x-lg" />
            <form onSubmit={handleAlertBoxSubmit} className="add-item-form">
              <h2>Add New Item</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="item-name">Item Name *</label>
                  <input
                    id="item-name"
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g., Chicken Curry"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="item-price">Price (B) *</label>
                  <input
                    id="item-price"
                    type="number"
                    step="0.01"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="e.g., 50.00"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="item-category">Category</label>
                  <select
                    id="item-category"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-group-full">
                  <label>Available Meats</label>
                  <div className="meat-checkboxes">
                    {meatOptions.map((meat) => (
                      <label key={meat} className="meat-checkbox">
                        <input
                          type="checkbox"
                          checked={newItemMeats.includes(meat)}
                          onChange={() => handleMeatChange(meat)}
                        />
                        {meat}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group form-group-full">
                  <label htmlFor="item-description">Description</label>
                  <textarea
                    id="item-description"
                    value={newItemDescription}
                    onChange={(e) => setNewItemDescription(e.target.value)}
                    placeholder="e.g., Spicy chicken curry with rice"
                  />
                </div>
                <div className="form-group form-group-full">
                  <label htmlFor="item-image">Photo</label>
                  <div className="photo-upload">
                    {newItemImagePreview ? (
                      <img src={newItemImagePreview} alt="Preview" className="photo-preview" />
                    ) : (
                      <label className="upload-link">
                        <span className="upload-text">Upload Photo</span>
                        <input
                          id="item-image"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          hidden
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-buttons">
                <button type="submit">Add Item</button>
                <button type="button" onClick={ handleAlertBoxCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemManagementDisplay;