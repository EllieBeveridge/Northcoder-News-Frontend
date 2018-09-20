import React, { Component } from 'react';
import './App.css';
//import Topics from './components/Topics';
import AllArticles from './components/AllArticles'
import Article from './components/Article'
import Comments from './components/Comments'
import { Link, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {
  state = {
    currentUser: null
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="grid-container">
            <div className="grid-item-home"><Link to="/">Home</Link></div>
            <div className="grid-item2">
              <ul className="topics-list">
                <li><Link to="/topics/cooking">Cooking</Link></li>
                <li><Link to="/topics/football">Football</Link></li>
                <li><Link to="/topics/coding">Coding</Link></li>
              </ul>
            </div>
            <Route exact path="/" render={({ match }) => <AllArticles match={match} currentUser={this.state.currentUser} />} />
            <Route path="/topics/:topic" render={({ match }) => <AllArticles match={match} currentUser={this.state.currentUser} />} />
            <Route path="/articles/:article_id" render={({ match }) => <Article match={match} currentUser={this.state.currentUser} />} />
            <Route path="/articles/:article_id/comments" render={({ match }) => <Comments match={match} currentUser={this.state.currentUser} />} />
            {/* <Route path="/topics" render={({ match }) => <Topics match={match} currentUser={this.state.currentUser} />} /> */}
            {/* <Route path="/topics/:topic" render={({ match }) => <Articles match={match} currentUser={this.state.currentUser} />} />
          <Route path="/topics/:topic" render={({ match }) => <Articles match={match} currentUser={this.state.currentUser} />} /> */}
          </div>
        </div>
      </BrowserRouter >
    );
  }

}

export default App;
