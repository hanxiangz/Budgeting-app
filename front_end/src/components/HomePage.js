import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

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
  const [redirectRoute, setRedirectRoute] = useState(null);

  const handleRedirect = (url) => {
    setRedirectToNewPage(true);
    setRedirectRoute(url);
  };

  if (redirectToNewPage && redirectRoute != null) {
    return <Navigate to= {`${redirectRoute}`} />;
  }

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        data: [1000, 1500, 1200, 1800, 1000],
        backgroundColor: 'transparent',
        borderColor: '#f26c6d',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.5
    }]
  };
  const options = {
    plugins: {
        legend: false
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            min: 0,
            max: 2500,
            ticks: {
                stepSize: 500,
                callback: (value) => value 
            },
            grid: {
                borderDash: [10]
            }
        }
    }
  };

  return (
    <div>

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
          <div style = {{width: '500px', height: '220px', marginLeft: '20px'}}>
            <Line data = {data} options={options}></Line>
          </div>
        </div>
      </div>

      <div class="container mt-4">
        <h2 class="text-center">Categories</h2>
        <br/>
        <div class="d-flex justify-content-center">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-secondary btn-lg" onClick={() => handleRedirect('/transactions/food')}>Food</button>
            <button type="button" class="btn btn-outline-secondary btn-lg" onClick={() => handleRedirect('/transactions/bills')}>Bills</button>
            <button type="button" class="btn btn-outline-secondary btn-lg" onClick={() => handleRedirect('/transactions/transport')}>Transport</button>
            <button type="button" class="btn btn-outline-secondary btn-lg" onClick={() => handleRedirect('/transactions/healthcare')}>Healthcare</button>
            <button type="button" class="btn btn-outline-secondary btn-lg" onClick={() => handleRedirect('//transactions/house')}>House</button>
            <button type="button" class="btn btn-outline-secondary btn-lg" onClick={() => handleRedirect('/transactions/savings')}>Savings</button>
          </div>
        </div>
        <br/>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-success" onClick={() => handleRedirect('/add_transaction')}>+Add New Transaction</button>
        </div>
      </div>

    </div>
  
  )
}

export default HomePage
