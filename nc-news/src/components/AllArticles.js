import React, { Component } from 'react';
import * as api from '../api'
import { Link } from 'react-router-dom'
import './AllArticles.css';
const DB_URL = 'https://ncnewsellieb.herokuapp.com/api'

class AllArticles extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    if (this.props.match.params.topic) {
      this.fetchArticlesByTopic(this.props.match.params.topic);
    } else {
      this.fetchAllArticles();
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.topic !== this.props.match.topic) {
      this.fetchArticlesByTopic(this.props.match.params.topic)
    }
  }


  fetchArticlesByTopic = (topic) => {
    api.fetchArticlesByTopic(topic)
      .then(articles => {
        this.setState({ articles })
      })
  }

  fetchAllArticles = () => {
    api.fetchAllArticles()
      .then(articles => {
        this.setState({ articles })
      })
  }

  render() {
    return (
      <div className="main-articles-list">
        <ul>

          {this.state.articles.map((article, index) => {
            return (
              <li key={index}>
                <div className="title" ><Link to={`/articles/${article._id}`}>{article.title}</Link></div>
                <div className="topic">{article.belongs_to}</div>
                <br></br>
                <p><span>Posted By: at {article.created_at}</span> <span><Link to={`/articles/${article._id}/comments`}>Comments: {article.comment_count}</Link></span></p>
              </li>)
          })}
        </ul>
      </div>
    );
  }
}

export default AllArticles;