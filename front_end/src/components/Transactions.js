import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Transactions.css";
import ConfirmationModal from "./ConfirmationModal";
import EditModal from "./EditModal";

const Transactions = () => {
  const { category } = useParams();
  const [data, setData] = useState([{}]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editedItem, setEditedItem] = useState({}); // State to track edited data

  useEffect(() => {
    fetch(`/transactions/${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Handle successful response; data is the returned JSON data...not the same as useState data
        setData(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, [category]);

  const handleDeleteRow = (index) => {
    setItemToDeleteIndex(index);
    setShowConfirmationModal(true);
  };

  const handleEditRow = (item, index) => {
    setItemToEdit(item);
    setEditedItem(item); // Initialize the edited data with the current data
    setShowEditModal(true);
  };

  const confirmDelete = () => {
    if (itemToDeleteIndex !== null) {
      const itemIdToDelete = data[itemToDeleteIndex]._id;
      // Create a copy of the data array
      const newData = [...data];
      // Remove the item at the specified index
      newData.splice(itemToDeleteIndex, 1);
      // Update the state with the new data (remove the selected row)
      setData(newData);

      fetch(`/transactions/${category}/${itemIdToDelete}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((response) => {
          console.log(response.message); // Log the success message from the backend
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
    setShowConfirmationModal(false); // Hide the confirmation modal
  };

  const cancelDelete = () => {
    setItemToDeleteIndex(null);
    setShowConfirmationModal(false); // Hide the confirmation modal
  };

  const confirmEdit = async() => {
    // Update the data with the edited data
    const updatedData = [...data];
    // check to see if the index user wants to edit is in the database
    const indexToEdit = data.findIndex((item) => item._id === itemToEdit._id);
    if (indexToEdit !== -1) {
      updatedData[indexToEdit] = editedItem;
      setData(updatedData);

      // Implement the logic to send the edited data to the server
      const editedItemDate = new Date(editedItem.date);
      const options = { year: "2-digit", month: "short", day: "numeric" };
      const formattedDate = editedItemDate.toLocaleDateString(
        "en-Au",
        options
      );
      
      try {
        const response = await fetch(
          `/transactions/${category}/${itemToEdit._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...editedItem, date:formattedDate}),
          }
        );
        if (response.ok) {
          console.log("edit submitted successfully");
          // After processing, reset the edit state
          setEditedItem({});
          window.location.reload();
        } else {
          console.error("Error submitting edit:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setShowEditModal(false);
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div className="transaction">
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            WiseWallet
          </a>
          <a class="navbar-brand justify-content-end" href="/">
            <img
              src="https://png.pngtree.com/png-vector/20190704/ourmid/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
              alt="Logo"
              style={{ width: 40 }}
              class="rounded-pill"
            />
          </a>
        </div>
      </nav>
      <div className="grey-area">
        <div className="container">
          <div className="header">
            <h1>TRANSACTIONS</h1>
            <h2>&rarr; {category.toUpperCase()}</h2>
          </div>
          <table>
            <thead className="table-header-cell">
              <tr>
                <th style={{ fontWeight: "normal", width: 100 }}>Amount</th>
                <th style={{ fontWeight: "normal", width: 150 }}>Date</th>
                <th style={{ fontWeight: "normal", width: 300 }}>
                  Description
                </th>
                <th style={{ width: 10 }}></th>
                <th style={{ width: 10 }}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="table-data">${item.amount}</td>
                  <td className="table-data">{item.date}</td>
                  <td className="table-data">{item.description}</td>
                  <td>
                    <button onClick={() => handleEditRow(item, index)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteRow(index)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ConfirmationModal
            isOpen={showConfirmationModal}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />

          <EditModal
            isOpen={showEditModal}
            onConfirm={confirmEdit}
            onCancel={cancelEdit}
            editedItem={editedItem}
            onEditItemChange={setEditedItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
