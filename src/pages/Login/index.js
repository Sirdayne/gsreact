import React, { Component } from 'react';
import axios from 'axios'
import Auth from '../../services/Auth'
import { Redirect } from 'react-router-dom'
import BASE_URL from '../../services/BASE_URL'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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
    const endpoint = BASE_URL + 'auth'
    axios.post(endpoint, this.state.form).then(res => {
      if (res && res.data && res.data.token) {
        Auth.login(res.data.token, this.state.form.longToken)
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
            <TextField type="email" label="Email" value={this.state.form.email} onChange={this.onChangeEmail}/>
            <TextField type="password" label="Password" value={this.state.form.password} onChange={this.onChangePassword}/>
            <FormControlLabel
              control = {
                <Checkbox checked={this.state.form.longToken} onChange={this.onChangeLong}/>
              }
              label="Remember me?"
            >
            </FormControlLabel>
            <Button variant="contained" color="primary" onClick={this.signIn}>Sign in</Button>
        </div>
      )
  }
}

export default Login;
