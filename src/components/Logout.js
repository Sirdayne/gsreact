import React, { Component } from 'react'
import Auth from '../services/Auth'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'

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
        <Button variant="contained" color="primary" onClick={this.logout}>
          Logout
        </Button>
      )
  }
}

export default Logout;
