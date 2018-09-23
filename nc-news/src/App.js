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
          <div className="grid-container">
            <div className="home"><Link to="/">Home</Link></div>
            <br></br>
            <div className="login">
              {!this.state.currentUser ? <Login setCurrentUser={this.setCurrentUser} setLocalStorage={this.setLocalStorage} currentUser={this.state.currentUser} /> : <Logout currentUser={this.state.currentUser} logoutCurrentUser={this.logoutCurrentUser} setLocalStorage={this.setLocalStorage} />}
              {this.state.currentUser && <h3>Logged in as {this.state.currentUser.username}</h3>}
            </div>
            <div className="topics-list">
              <ul className="topics-list">
                <li><Link to="/topics/cooking">Cooking</Link></li>
                <li><Link to="/topics/football">Football</Link></li>
                <li><Link to="/topics/coding">Coding</Link></li>
              </ul>
            </div>
          </div>
          <Route path="/users/:user_id" render={({ match }) => <User match={match} currentUser={this.state.currentUser} />} />
          <div className="articles-list">
            <Route exact path="/" render={({ match }) => <AllArticles match={match} currentUser={this.state.currentUser} />} />
          </div>
          <Route path="/topics/:topic" render={({ match }) => <AllArticles match={match} currentUser={this.state.currentUser} />} />
          <Route path="/articles/:article_id" render={({ match }) => <Article match={match} currentUser={this.state.currentUser} />} />
          <Route path="/articles/:article_id/comments" render={({ match }) => <Comments match={match} currentUser={this.state.currentUser} />} />
          <Route exact path="/404" component={Error404} />
        </div>
      </BrowserRouter >
    );
  }
}

function Error404() {
  return <div>
    <h3>ERROR! 404 NOT FOUND</h3>
    {/* <Link to={props.locations.state.from}><img height='300' width='500' src='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi_jNve5MvdAhWv4IUKHVqxDCAQjRx6BAgBEAU&url=https%3A%2F%2Fwww.lifewire.com%2F404-not-found-error-explained-2622936&psig=AOvVaw2Zm0LcQf5CBV7NDxdxy9jo&ust=1537608651977662' /></Link> */}
  </div>
}


export default App;
