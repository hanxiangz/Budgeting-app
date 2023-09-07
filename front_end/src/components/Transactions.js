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
        <p>This is the transactions page. See your expenses</p>
      <p>{data[0].amount}</p>
      <p>{data[0].date}</p>
      <p>{data[0].description}</p>
    </div>
  )
}

export default Transactions
