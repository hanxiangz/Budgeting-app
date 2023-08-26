import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddTransaction from './components/AddTransaction';
import HomePage from './components/HomePage';

const App = () => {

  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/add" element={<AddTransaction/>} />
      </Routes>
  
    </Router>
  
   
  )
}

export default App

