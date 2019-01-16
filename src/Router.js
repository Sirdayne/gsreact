import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Login from './pages/Login/index'
import TodoList from './components/TodoList'

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/">TodoList</Link>
          <Link to="/login/">Login</Link>
          <Route path="/" exact component={TodoList} />
          <Route path="/login/" component={Login} />
        </div>
      </Router>
    )
  }
}

export default AppRouter;
