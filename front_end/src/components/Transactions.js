import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Transactions.css";

const Transactions = () => {
  const { category } = useParams();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch(`/transactions/${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Handle successful response; data is the returned json data...not the same as useState data
        setData(data);
        console.log("The data is fetched", data[0].amount);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, [category]);

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
            <thead>
              <tr>
                <th className="table-header-cell">Amount</th>
                <th className="table-header-cell">Date</th>
                <th className="table-header-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-data">${data[0].amount}</td>
                <td className="table-data">{data[0].date}</td>
                <td className="table-data">{data[0].description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
