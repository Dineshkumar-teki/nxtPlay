import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showErrMsg: false,
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassowrd = event => {
    this.setState({password: event.target.value})
  }

  togglePasswordView = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  loginCheck = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'
    const userCredentials = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }
    const response = await fetch(loginUrl, options)
    const loginData = await response.json()
    if (response.ok) {
      const formatedData = {
        jwtToken: loginData.jwt_token,
      }
      const {jwtToken} = formatedData
      Cookies.set('jwt-token', jwtToken, {expires: 10})
      const {history} = this.props
      this.setState({
        username: '',
        password: '',
        errorMsg: '',
        showErrMsg: false,
      })
      history.replace('/')
    } else {
      const formatedData = {
        errorMsg: loginData.error_msg,
      }
      const {errorMsg} = formatedData
      this.setState({errorMsg, showErrMsg: true})
    }
  }

  render() {
    const {username, password, showPassword, errorMsg, showErrMsg} = this.state
    const jwtToken = Cookies.get('jwt-token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginRoute">
        <div className="loginFrom">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt=""
          />
          <form onSubmit={this.loginCheck}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.getUsername}
              value={username}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={this.getPassowrd}
              value={password}
            />
            <div>
              <input
                id="togglePasswordView"
                htmlFor="passwordShow"
                type="checkbox"
                onChange={this.togglePasswordView}
              />
              <label htmlFor="togglePasswordView">Show Password</label>
            </div>
            <button type="submit">Login</button>
            {showErrMsg ? <p className="errorMsg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
