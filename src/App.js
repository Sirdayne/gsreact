import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg'
import './App.css';
import Login from './pages/Login/index'

const Index = () => <h2>Home</h2>

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Router>
          <div>
            <Link to="/">Home</Link>
            <Link to="/login/">Login</Link>
            <Route path="/" exact component={Index} />
            <Route path="/login/" component={Login} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
