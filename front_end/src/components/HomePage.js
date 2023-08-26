import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const HomePage = () => {

  const headingStyle = {
    textAlign: 'center'
  };

  const circleStyle = {
    height: '200px',
    width: '200px',
    backgroundColor: 'red',
    borderRadius: '50%'
  };

  const [redirectToNewPage, setRedirectToNewPage] = useState(false);

  const handleRedirect = () => {
    setRedirectToNewPage(true);
  };

  if (redirectToNewPage) {
    return <Navigate to="/add" />;
  }

  return (
    <div>
      {/* <h1>This is the home page!</h1>
      <li>
        <Link to="/add">Add a transaction</Link>
      </li> */}

      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/#">WiseWallet</a>
          <a class="navbar-brand justify-content-end" href="#">
            <img src="https://png.pngtree.com/png-vector/20190704/ourmid/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg" alt="Logo" style={{width:40}} class="rounded-pill"/>
          </a>
        </div>
      </nav>

      <h1 style={headingStyle}>August 2023</h1>
      
      <div class="row">
        <div class="col-sm-4 p-4 my-4 border d-flex flex-column align-items-center">
            <h2 class="text-center mb-4">Overview</h2>
            <div class="circle d-flex justify-content-center align-items-center" style={circleStyle}>
              <div class="text-center">
                <p class="mb-1">Net Savings</p>
                <h4 class="mb-0">-$101.04</h4>
              </div>
            </div>
        </div>
        <div class="col-sm-8 bg-secondary p-4 my-4 border">
          <h3>Net Savings for the Year</h3>
        </div>
      </div>

      <div class="container mt-4">
        <h2 class="text-center">Categories</h2>
        <br/>
        <div class="d-flex justify-content-center">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-secondary btn-lg">Food</button>
            <button type="button" class="btn btn-outline-secondary btn-lg">Bills</button>
            <button type="button" class="btn btn-outline-secondary btn-lg">Transport</button>
            <button type="button" class="btn btn-outline-secondary btn-lg">Healthcare</button>
            <button type="button" class="btn btn-outline-secondary btn-lg">House</button>
            <button type="button" class="btn btn-outline-secondary btn-lg">Savings</button>
          </div>
        </div>
        <br/>
        <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-success" onClick={handleRedirect}>+Add New Transaction</button>
          </div>
      </div>

    </div>
  
  )
}

export default HomePage
