import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Transactions.css";

const Transactions = () => {
  const { category } = useParams();
  const [data, setData] = useState([{}]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);

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
        console.log("The data is fetched", data[0].amount);
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
                <th style={{ fontWeight: "normal" }}>Amount</th>
                <th style={{ fontWeight: "normal" }}>Date</th>
                <th style={{ fontWeight: "normal" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="table-data">${item.amount}</td>
                  <td className="table-data">{item.date}</td>
                  <td className="table-data">{item.description}</td>
                  <td>
                    <button onClick={() => handleDeleteRow(index)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showConfirmationModal && (
            <div className="confirmation-modal">
              <p>Are you sure you want to delete this row?</p>
              <button onClick={confirmDelete}>Confirm</button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
