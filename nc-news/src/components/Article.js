import React, { Component } from 'react';
import * as api from '../api.js'
import Comments from './Comments'
import Vote from './Vote'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Comment from './Comment'

class Article extends Component {
  state = {
    article: '',
    voteChange: 0
  }

  componentDidMount() {
    if (this.props.match.params.article_id) {
      this.getArticleById(this.props.match.params.article_id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.article_id !== this.props.match.params.article_id) {
      this.getArticleById(this.props.match.params.article_id)
    }
  }

  getArticleById = (article_id) => {
    api.fetchArticleById(article_id)
      .then(article => {
        this.setState({ article })
      })
  }

  postNewComment = (newComment, article_id) => {
    api.postComment(newComment, article_id)
      .then((comment) => {
        this.setState({ comment })
      })
      .catch(err => {
        console.log(err)
      })

  }

  render() {
    const article = this.state.article[0]
    if (article === undefined) { return null }
    return (
      <div>
        {article && <h1>{article.title}</h1>}
        <Vote obj={article} type={"articles"} />
        <h3>Created By: <Link to={`/users/${article.created_by.username}`}>{article.created_by.username}</Link></h3>
        <br></br>
        <p>{article.body}</p>
        <br></br>
        <Comment article_id={article._id} currentUser={this.props.currentUser} postNewComment={this.postNewComment} />
        <br></br>
        Comments: {article.comment_count}
        <br></br>
        <Comments article_id={article._id} currentUser={this.props.currentUser} />
      </div >
    );
  }
}

export default Article;

Article.propTypes = {
  match: PropTypes.object,
  currentUser: PropTypes.object
}