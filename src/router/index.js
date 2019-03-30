import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Login from '../pages/Login'
import ProgressNotes from '../pages/ProgressNotes'
import TodoList from '../components/TodoList'
import AuthRoute from './AuthRoute'
import NotAuthRoute from './NotAuthRoute'

const ProtectedPage = () => <h2>Protected</h2>

class AppRouter extends Component {
  constructor(props) {
    super(props)
    this.state = { isAuth: false }
  }

  render() {
    return (
      <Router>
        <div className='navigation-links'>
          <Link to='/'>TodoList</Link>
          <Link to='/login/'>Login</Link>
          <Link to='/protected'>Protected</Link>
          <Link to='/progressNotes'>Progress-Notes</Link>
          <AuthRoute path='/' exact component={TodoList} />
          <NotAuthRoute path='/login/' component={Login} />
          <AuthRoute path='/protected' component={ProtectedPage} />
          <AuthRoute path='/progressNotes' component={ProgressNotes} />
        </div>
      </Router>
    )
  }
}

export default AppRouter;
