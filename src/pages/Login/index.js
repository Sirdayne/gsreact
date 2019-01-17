import React, { Component } from 'react';
import axios from 'axios'
import Auth from '../../services/Auth'

const endpoint = 'https://api-dev-globalspeller.azurewebsites.net/'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        email: '',
        password:  '',
        longToken: false
    }
    this.signIn = this.signIn.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeLong = this.onChangeLong.bind(this)
  }
  signIn(e) {
    e.preventDefault()
    const url = endpoint + 'auth'
    axios.post(url, this.state).then(res => {
      if (res && res.data && res.data.token) {
        Auth.saveToken(res.data.token, this.state.longToken)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value })
  }
  onChangeLong(e) {
    this.setState({ longToken: e.target.checked })
  }
  render() {
    return (
      <div className="login">
          <input type="email" value={this.state.email} onChange={this.onChangeEmail}/>
          <input type="password" value={this.state.password} onChange={this.onChangePassword}/>
          <input type="checkbox" value={this.state.longToken} onChange={this.onChangeLong}/>
          <button onClick={this.signIn}>Sign in</button>
      </div>
    )
  }
}

export default Login;
