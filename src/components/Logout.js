import React, { Component } from 'react';
import Auth from '../services/Auth'

class Logout extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout(e) {
    e.preventDefault()
    console.log('log out')
    Auth.logout()
  }
  render() {
    return (
      <div>
        <button onClick={this.logout}>
          Log out
        </button>
      </div>
    )
  }
}

export default Logout;
