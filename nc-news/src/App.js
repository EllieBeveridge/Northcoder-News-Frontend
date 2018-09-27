import React, { Component } from 'react';
import './App.css';
import * as api from './api'
import AllArticles from './components/AllArticles'
import Article from './components/Article'
import Comments from './components/Comments'
import Login from './components/Login'
import Logout from './components/Logout'
import User from './components/User'
import Error404 from './components/Error404'
import Media from 'react-media'
import { Link, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {
  state = {
    currentUser: null,
    allArticles: []
  }

  componentDidMount = () => {
    let storage = localStorage.getItem('loggedInUser')
    console.log(storage, 'storage')
    api.retrieveCurrentUser(storage)
      .then(user => {
        this.setState({
          currentUser: user
        })
      })
    api.fetchAllArticles()
      .then(articles => {
        this.setState({
          allArticles: articles
        })
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
    localStorage.setItem('loggedInUser', user)
  }



  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="header-info">
            <div className="top">
              <div className="container">
                <div className="NC-NEWS"><i id="nc-red" className="fas fa-angle-left"></i> NC NEWS <i id="nc-red" className="fas fa-angle-right"></i></div>
              </div>
              <div className="container">
                <div className="col"><Link id="topic-item" to="/">Home</Link></div>
                <div className="col"><Link id="topic-item" to="/topics/cooking">Cooking</Link></div>
                <div className="col"><Link id="topic-item" to="/topics/football">Football</Link></div>
                <div className="col"><Link id="topic-item" to="/topics/coding">Coding</Link></div>
              </div>
            </div>
            <div className="container">
              <div className="col login">
                {!this.state.currentUser ? <Login id="login" setCurrentUser={this.setCurrentUser} setLocalStorage={this.setLocalStorage} currentUser={this.state.currentUser} /> : null}
                {this.state.currentUser && <span id="login">Logged in as {this.state.currentUser.username}</span>} <br></br>
                {this.state.currentUser && <Logout currentUser={this.state.currentUser} logoutCurrentUser={this.logoutCurrentUser} setLocalStorage={this.setLocalStorage} />}
              </div>
            </div>
          </div>

          <Route path="/users/:user_id" render={({ match }) => <User match={match} currentUser={this.state.currentUser} allArticles={this.state.allArticles} />} />
          <Route exact path="/" render={({ match }) => <AllArticles match={match} currentUser={this.state.currentUser} />} />
          <Route path="/topics/:topic" render={({ match }) => <AllArticles match={match} currentUser={this.state.currentUser} />} />
          <Route path="/articles/:article_id" render={({ match }) => <Article match={match} currentUser={this.state.currentUser} />} />
          <Route path="/articles/:article_id/comments" render={({ match }) => <Comments match={match} currentUser={this.state.currentUser} />} />
          <Route exact path="/404" component={Error404} />
        </div>
      </BrowserRouter >
    );
  }

}


export default App;
