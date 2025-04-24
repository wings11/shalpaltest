import React, { useState } from "react";
import "./ItemManagementCard.css";

const ItemManagementCard = ({ index, item, onDelete, onSave, showAddButton, onAdd, categories, meatOptions }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(item.image);
  const [editedMeats, setEditedMeats] = useState(item.meat_options || []);

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImagePreview(imageUrl);
    }
  };

  const handleMeatChange = (meat) => {
    setEditedMeats((prev) => {
      if (meat === "None") {
        return prev.includes("None") ? [] : ["None"];
      }
      if (prev.includes("None")) {
        return [meat];
      }
      return prev.includes(meat) ? prev.filter((m) => m !== meat) : [...prev, meat];
    });
  };

  const handleSaveClick = () => {
    if (!editedItem.name || !editedItem.price) {
      alert("Name and price are required");
      return;
    }
    if (isNaN(parseFloat(editedItem.price)) || parseFloat(editedItem.price) <= 0) {
      alert("Price must be a valid number greater than 0");
      return;
    }
    onSave({
      ...editedItem,
      price: parseFloat(editedItem.price).toFixed(2),
      imageFile,
      meats: editedMeats,
    });
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(editedItem.image);
  };

  return (
    <tr className="item-row">
      <td>{index}</td>
      <td className="tdname">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedItem.name}
            onChange={handleChange}
            placeholder="Enter Item Name"
            className="input-field"
          />
        ) : (
          editedItem.name
        )}
      </td>
      <td className="tdprice">
        {isEditing ? (
          <input
            type="number"
            step="1"
            name="price"
            value={editedItem.price}
            onChange={handleChange}
            placeholder="Enter Price"
            className="input-field"
          />
        ) : (
          `${parseFloat(editedItem.price).toFixed(2)} B`
        )}
      </td>
      <td className="tdcategory">
        {isEditing ? (
          <select
            name="category"
            value={editedItem.category || ""}
            onChange={handleChange}
            className="select-field"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ) : (
          editedItem.category || "-"
        )}
      </td>
      <td className="tdmeatoptions">
        {isEditing ? (
          <div className="meat-checkboxes">
            {meatOptions.map((meat) => (
              <label key={meat} className="meat-checkbox">
                <input
                  type="checkbox"
                  checked={editedMeats.includes(meat)}
                  onChange={() => handleMeatChange(meat)}
                />
                {meat}
              </label>
            ))}
          </div>
        ) : (
          editedMeats.length ? editedMeats.join(", ") : "-"
        )}
      </td>
      <td className="tddescription">
        {isEditing ? (
          <textarea
            name="description"
            value={editedItem.description || ""}
            onChange={handleChange}
            placeholder="Enter Description"
            className="textarea-field"
          />
        ) : (
          editedItem.description || "-"
        )}
      </td>
      <td className="tdphoto">
        {isEditing ? (
          <label className="upload-btn">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              hidden
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="photo-preview" />
            ) : (
              <span className="upload-text">Upload photo</span>
            )}
          </label>
        ) : (
          editedItem.image ? (
            <img src={`http://localhost:5000${editedItem.image}`} alt="Item" className="photo-preview" />
          ) : (
            "-"
          )
        )}
      </td>
      <td className="actions">
        {isEditing ? (
          <button className="save-btn" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </td>
      <td className="actions">
        <button className="delete-btn" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </td>
      <td className="actions">
        {showAddButton ? (
          <button className="add-btn" onClick={onAdd}>
            <i className="bi bi-plus-circle" /> Add Item
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default ItemManagementCard;