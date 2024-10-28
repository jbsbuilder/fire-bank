import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Transfer from './components/Transfer';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Banking App</h1>
        </header>
        <div className="container">
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/home" component={Home} />
            <Route path="/transfer" component={Transfer} />
            <Route path="/" exact component={SignIn} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;