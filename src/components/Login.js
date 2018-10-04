import React, { Component } from 'react';
//import * as api from '../api'
import PropTypes from 'prop-types';
import './Login.css'

class Login extends Component {

  state = {
    username: ''
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const username = { ...this.state }
    this.props.setCurrentUser(username)
    this.setState({
      username: ''
    })
  }


  render() {
    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <p id="login">Login with Username<span>  </span>
            <input onChange={this.handleChange} value={this.state.username} name="username" />
            <button>submit</button></p>
        </form>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setLocalStorage: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}