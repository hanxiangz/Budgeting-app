import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddTransaction from './components/AddTransaction';
import HomePage from './components/HomePage';
import Transactions from './components/Transactions';

const App = () => {

  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/add_transaction" element={<AddTransaction/>} />
        <Route path="/transactions/:category" element={<Transactions/>} />
      </Routes>
  
    </Router>
  
   
  )
}

export default App

