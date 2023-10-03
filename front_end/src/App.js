import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddTransaction from "./components/AddTransaction";
import HomePage from "./components/HomePage";
import Transactions from "./components/Transactions";
import Error404 from "./components/Error404";
import Profile from "./components/chatbot/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/add_transaction" element={<AddTransaction />} />
        <Route path="/transactions/:category" element={<Transactions />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default App;
