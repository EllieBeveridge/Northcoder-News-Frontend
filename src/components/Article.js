import React, { Component } from 'react';
import * as api from '../api.js'
import Comments from './Comments'
import Vote from './Vote'
import { Link, Redirect } from 'react-router-dom'
import Media from 'react-media'
import PropTypes from 'prop-types';
import PostComment from './PostComment.js'
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
    if (this.state.err) return <Redirect to={{
      pathname: "/404",
      state: {
        sendBackTo: '/'
      },
      push: true
    }} />
    if (article === undefined) { return null }
    return (
      <div>
        <div className="container">
          <div className="col-sm-"><Vote obj={article} type={"articles"} /> </div>
          <div className="col-xl- article-title">
            <Media query={{ maxWidth: 599 }} >{article && <h1 id="article-title-mobile">{article.title}</h1>}</Media>
            <Media query={{ maxWidth: 599 }} ><span className="created-by-mobile"> Created By: <Link to={`/users/${article.created_by.username}`}>{article.created_by.username}</Link></span></Media>
            <Media query={{ minWidth: 600 }} >{article && <h1>{article.title}</h1>}</Media>
            <Media query={{ minWidth: 600 }} ><span className="created-by"> Created By: <Link to={`/users/${article.created_by.username}`}>{article.created_by.username}</Link></span></Media>
            <div className="article-body">
              {article.body}
            </div>
          </div>
        </div>
        <div className="container">
          <PostComment article_id={article._id} currentUser={this.props.currentUser} postNewComment={this.postNewComment} />
        </div>
        <br></br>
        <div className="comment-count">Comments: {article.comment_count}</div>
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