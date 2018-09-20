import React, { Component } from 'react';
import * as api from '../api.js'
import Comments from './Comments'

class Article extends Component {
  state = {
    article: ''
  }

  componentDidMount() {
    if (this.props.match.params.article_id) {
      this.getArticleById(this.props.match.params.article_id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.article_id !== this.props.match.article_id) {
      this.getArticleById(this.props.match.params.article_id)
    }
  }

  getArticleById = (article_id) => {
    api.fetchArticleById(article_id)
      .then(article => {
        this.setState({ article })
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
    const article = this.state.article[0]
    if (article === undefined) { return null }
    return (
      <div>
        {article && <h1>{article.title}</h1>}
        <div className="votes">{article.votes}
          <br></br>
          <button name="upvote" onClick={e => this.upvoteArticle(article._id)}>Yay :)</button>
          <button name="downvote" onClick={e => this.downvoteArticle(article._id)}>Boo :)</button>
        </div>
        <h3>Created By: {article.created_by.username}</h3>
        <br></br>
        <p>{article.body}</p>
        <br></br>
        Comments: {article.comment_count}
        <br></br>
        <Comments article_id={article._id} />
      </div>
    );
  }
}

export default Article;