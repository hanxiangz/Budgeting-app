import React from "react";

const EditModal = ({ isOpen, onConfirm, onCancel, editedItem, onEditItemChange }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h3>Edit Row</h3>
        <label>Amount:</label>
        <input
          type="text"
          value={editedItem.amount}
          onChange={(e) => onEditItemChange({ ...editedItem, amount: e.target.value })}
        />
        <label>Date:</label>
        <input
          type="date" // Use type="date" for a date picker
          value={editedItem.date}
          onChange={(e) => onEditItemChange({ ...editedItem, date: e.target.value })}
        />
        <label>Description:</label>
        <input
          type="text"
          value={editedItem.description}
          onChange={(e) =>
            onEditItemChange({ ...editedItem, description: e.target.value })
          }
        />
        <button onClick={onConfirm}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
