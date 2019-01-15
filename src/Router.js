import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Login from './pages/Login/index'

const Index = () => <h2>Home</h2>

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login/">Login</Link>
          <Route path="/" exact component={Index} />
          <Route path="/login/" component={Login} />
        </div>
      </Router>
    )
  }
}

export default AppRouter;
