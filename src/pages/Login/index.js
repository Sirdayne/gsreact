import React, { Component } from 'react';
import axios from 'axios'
import Auth from '../../services/Auth'
import { Redirect } from 'react-router-dom'

const endpoint = 'https://api-dev-globalspeller.azurewebsites.net/'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: '',
        password:  '',
        longToken: false
      },
      redirect: false
    }
    this.signIn = this.signIn.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeLong = this.onChangeLong.bind(this)
  }
  signIn(e) {
    e.preventDefault()
    const url = endpoint + 'auth'
    axios.post(url, this.state.form).then(res => {
      if (res && res.data && res.data.token) {
        Auth.saveToken(res.data.token, this.state.form.longToken)
        this.setState({ redirect: true })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  onChangeEmail(e) {
    const value = e.target.value
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        email: value
      }
    }))
  }
  onChangePassword(e) {
    const value = e.target.value
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        password: value
      }
    }))
  }
  onChangeLong(e) {
    const value = e.target.checked
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        longToken: value
      }
    }))
  }
  render() {
    if (this.state.redirect)
      return <Redirect to="/" />
    else
      return (
        <div className="login">
            <input type="email" value={this.state.form.email} onChange={this.onChangeEmail}/>
            <input type="password" value={this.state.form.password} onChange={this.onChangePassword}/>
            <input type="checkbox" value={this.state.form.longToken} onChange={this.onChangeLong}/>
            <button onClick={this.signIn}>Sign in</button>
        </div>
      )
  }
}

export default Login;
