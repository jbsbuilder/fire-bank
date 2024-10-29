import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Transfer from './components/Transfer';
import { auth } from './firebaseConfig';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Banking App</h1>
        </header>
        <div className="container">
          <Routes>
            <Route path="/signin" element={user ? <Navigate to="/home" /> : <SignIn />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
            <Route path="/transfer" element={user ? <Transfer /> : <Navigate to="/signin" />} />
            <Route path="/" element={user ? <Navigate to="/home" /> : <SignIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;