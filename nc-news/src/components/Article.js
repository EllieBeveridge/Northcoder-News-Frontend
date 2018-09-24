import React, { Component } from 'react';
import * as api from '../api.js'
import Comments from './Comments'
import Vote from './Vote'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import Comment from './Comment'
import './Article.css'

class Article extends Component {
  state = {
    article: '',
    voteChange: 0,
    err: null
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
      .catch(err => {
        this.setState({ err })
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
    if (this.state.err) return <Redirect to={{
      pathname: "/404",
      state: {
        sendBackTo: '/'
      },
      push: true
    }} />
    return (
      <div>
        <div className="container">
          <div className="col-sm-"><Vote obj={article} type={"articles"} /> </div>
          <div className="col-xl- article-title">{article && <h1>{article.title}</h1>}
          </div>
        </div>
        <h3>Created By: <Link to={`/users/${article.created_by.username}`}>{article.created_by.username}</Link></h3>
        <div className="article-body">
          <span>{article.body}</span>
        </div>

        <Comment article_id={article._id} currentUser={this.props.currentUser} postNewComment={this.postNewComment} />
        <br></br>
        <span className="comment-count">Comments: {article.comment_count}</span>

        <br></br>
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