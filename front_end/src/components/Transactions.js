import React, { useState, useEffect } from 'react'

const Transactions = () => {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/list").then(
        res => res.json()
        ).then(
        data => {
            setData(data)
            console.log("The data is fetched", data[0].amount)
        }
        )
    }, [])

  return (
    <div>
        <h1> TRANSACTIONS </h1>
        <h2> --{'>'} FOOD </h2>
        <div className="line"></div>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <td>{data[0].amount}</td>
            <td>{data[0].date}</td>
            <td>{data[0].description}</td>
          </tbody>
    </table>
      
    </div>
  )
}

export default Transactions
