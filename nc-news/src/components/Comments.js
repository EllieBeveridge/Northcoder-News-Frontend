import React, { Component } from 'react';
import * as api from '../api'

class Comments extends Component {
  state = {
    comments: []
  }

  componentDidMount() {
    if (this.props.article_id) {
      this.getAllComments(this.props.article_id);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getAllComments(this.props.article_id)
    }
  }

  getAllComments = (article_id) => {
    api.fetchAllComments(article_id)
      .then(comments => {
        this.setState({ comments })
      })
  }

  upvoteComment = (comment_id) => {
    api.upvoteComment(comment_id)
      .then(comment => {
        this.setState({ comment })
      })
  }

  downvoteComment = (comment_id) => {
    api.downvoteComment(comment_id)
      .then(comment => {
        this.setState({ comment })
      })
  }

  render() {
    if (this.state.comments === undefined) { return null }
    return (
      <div>
        {this.state.comments.map((comment, index) => {
          return <li key={index}>
            <div className="votes">{comment.votes}
              <br></br>
              <button name="upvote" onClick={e => this.upvoteComment(comment._id)}>Yay :)</button>
              <button name="downvote" onClick={e => this.downvoteComment(comment._id)}>Boo :)</button>
            </div>
            <p className="username">{comment.created_by}</p>
            <br></br>
            <p className="body-text">{comment.body}</p>
          </li>
        })}
      </div>
    );
  }
}

export default Comments;