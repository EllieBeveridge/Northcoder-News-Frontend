import React, { Component } from 'react';
import * as api from '../api'
import { Link } from 'react-router-dom'
import './AllArticles.css';

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

  upvoteArticle = (article_id) => {
    api.upvoteArticle(article_id)
      .then(article => {
        this.setState({ article })
      })
  }

  downvoteArticle = (article_id) => {
    api.downvoteArticle(article_id)
      .then(article => {
        this.setState({ article })
      })
  }

  render() {
    return (
      <div className="main-articles-list">
        <ul>
          {this.state.articles.map((article, index) => {
            return (
              <li key={index}>
                <div className="votes">{article.votes}
                  <br></br>
                  <button name="upvote" onClick={e => this.upvoteArticle(article._id)}>Yay :)</button>
                  <button name="downvote" onClick={e => this.downvoteArticle(article._id)}>Boo :)</button>
                </div>
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