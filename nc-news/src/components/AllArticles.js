import React, { Component } from 'react';
import * as api from '../api'
import './AllArticles.css';

class AllArticles extends Component {
  state = {
    articles: ['all', 'articles', 'dummy', 'array', 'list']
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
                <div className="title">{article.title}</div> <div className="topic">{article.belongs_to}</div>
                <div className="postdeets">
                  <p>Posted By: at {article.created_at} Comments: {article.comment_count}</p>
                </div>
              </li>)
          })}
        </ul>
      </div>
    );
  }
}

export default AllArticles;