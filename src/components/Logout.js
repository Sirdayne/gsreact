import React, { Component } from 'react';
import Auth from '../services/Auth'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.logout = this.logout.bind(this)
  }
  logout(e) {
    e.preventDefault()
    Auth.logout()
    this.setState({ redirect: true })
  }
  render() {
    if (this.state.redirect)
      return <Redirect to="/login" />
    else
      return (
        <button onClick={this.logout}>
          Log out
        </button>
      )
  }
}

export default Logout;
