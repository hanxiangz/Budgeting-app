import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Transactions.css";
import ConfirmationModal from "./ConfirmationModal";
import EditModal from "./EditModal";
import Error404 from "./Error404";

const Transactions = () => {
  const { category } = useParams();
  // Define an array of valid categories
  const validCategories = [
    "food",
    "bills",
    "transport",
    "healthcare",
    "house",
    "savings",
  ];
  // Check if the 'category' parameter is valid
  const isValidCategory = validCategories.includes(category);
  const [data, setData] = useState([]);
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
        console.log("whole list fetched\n", data);
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
    setItemToDeleteIndex(null);
    setShowConfirmationModal(false); // Hide the confirmation modal
  };

  const cancelDelete = () => {
    setItemToDeleteIndex(null);
    setShowConfirmationModal(false); // Hide the confirmation modal
  };

  const confirmEdit = async () => {
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
      const formattedDate = editedItemDate.toLocaleDateString("en-Au", options);

      try {
        const response = await fetch(
          `/transactions/${category}/${itemToEdit._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...editedItem, date: formattedDate }),
          }
        );
        if (response.ok) {
          console.log("edit submitted successfully");
          // After processing, reset the edit state
          setItemToEdit(null);
          setEditedItem({});
          //window.location.reload();
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
    setItemToEdit(null);
    setEditedItem({});
    setShowEditModal(false);
  };

  return (
    // Render the Transactions component when 'category' is valid
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

      {isValidCategory ? (
        <div className="grey-area">
          <div className="container">
            <div className="header">
              <h1>TRANSACTIONS</h1>
              <h2>&rarr; {category.toUpperCase()}</h2>
            </div>

            <table>
              <thead className="table-header-cell">
                <tr style={{ borderBottom: 1 }}>
                  <th style={{ fontWeight: "normal", width: 70 }}>Amount</th>
                  <th
                    style={{
                      fontWeight: "normal",
                      width: 120,
                      textAlign: "center",
                    }}
                  >
                    Date
                  </th>
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
                    <td className="table-data" style={{ textAlign: "center" }}>
                      {item.date}
                    </td>
                    <td
                      className="table-data"
                      style={{
                        maxWidth: 300,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.description}
                    </td>
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
      ) : (
        // Render an error message or a fallback component when 'category' is not valid
        <Error404 />
      )}
    </div>
  );
};

export default Transactions;
