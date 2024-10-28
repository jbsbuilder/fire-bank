import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Transfer from './components/Transfer';
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Banking App</h1>
        </header>
        <div className="container">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;