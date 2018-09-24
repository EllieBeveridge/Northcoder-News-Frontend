import React, { Component } from 'react';
import './App.css';
import * as api from './api'
//import Topics from './components/Topics';
import AllArticles from './components/AllArticles'
import Article from './components/Article'
import Comments from './components/Comments'
import Login from './components/Login'
import Logout from './components/Logout'
import User from './components/User'
import Error404 from './components/Error404'
import { Link, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {
  state = {
    currentUser: null
  }

  componentDidMount = async () => {
    let storage = localStorage.getItem('loggedInUser')
    console.log(storage, 'storage')
    const currentUser = await api.loginUser(storage)
    this.setState({
      currentUser
    })
  }

  setCurrentUser = (username) => {
    api.loginUser(username)
      .then(user => {
        this.setLocalStorage(user.username)
        this.setState({
          currentUser: user
        })
      })
  }

  logoutCurrentUser = () => {
    this.setState({
      currentUser: null
    })
  }

  setLocalStorage = (user) => {
    console.log(user, 'local storage')
    localStorage.setItem('loggedInUser', user)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <Link to="/">Home</Link>
                  <br></br>
                  <div className="login">
                    {!this.state.currentUser ? <Login setCurrentUser={this.setCurrentUser} setLocalStorage={this.setLocalStorage} currentUser={this.state.currentUser} /> : <Logout currentUser={this.state.currentUser} logoutCurrentUser={this.logoutCurrentUser} setLocalStorage={this.setLocalStorage} />}
                    {this.state.currentUser && <h3>Logged in as {this.state.currentUser.username}</h3>}
                  </div>
                </div>
                <div className="col">NC NEWS</div>
                <div className="col">
                  <ul className="topics-list">
                    <p>Topics:</p>
                    <li><Link to="/topics/cooking">Cooking</Link></li>
                    <li><Link to="/topics/football">Football</Link></li>
                    <li><Link to="/topics/coding">Coding</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <Route path="/users/:user_id" render={({ match }) => <User match={match} currentUser={this.state.currentUser} />} />
            <Route exact path="/" render={({ match }) => <AllArticles match={match} currentUser={this.state.currentUser} />} />
            <Route path="/topics/:topic" render={({ match }) => <AllArticles match={match} currentUser={this.state.currentUser} />} />
            <Route path="/articles/:article_id" render={({ match }) => <Article match={match} currentUser={this.state.currentUser} />} />
            <Route path="/articles/:article_id/comments" render={({ match }) => <Comments match={match} currentUser={this.state.currentUser} />} />
            <Route exact path="/404" component={Error404} />
          </div>
        </div>
      </BrowserRouter >
    );
  }

}


export default App;
