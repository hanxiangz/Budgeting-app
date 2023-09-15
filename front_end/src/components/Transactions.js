import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Transactions = () => {

    const { category } = useParams();
    const [data, setData] = useState([{}])

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
    <div>
        <h1> TRANSACTIONS </h1>
        <h2> &rarr; {category.toUpperCase()} </h2>
        <div className="line"></div>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          {/* <tbody>
            <td>{data[0].amount}</td>
            <td>{data[0].date}</td>
            <td>{data[0].description}</td>
          </tbody> */}
    </table>
      
    </div>
  )
}

export default Transactions
