import React, { Component } from 'react';
//import * as api from '../api'

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
    this.props.setLocalStorage(username)
    this.setState({
      username: ''
    })
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Login with Username:
          <input onChange={this.handleChange} value={this.state.username} name="username" />
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default Login;