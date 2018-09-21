import React, { Component } from 'react';
import Comment from './Comment'
import * as api from '../api'

class Comments extends Component {
  state = {
    currentUser: this.props.currentUser,
    comments: [],
    voteChange: 0,
    comment: {}
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

  handleVote = (id, direction) => {
    api.voteOnComment(id, direction)
      .then(comment => {
        this.setState({
          comment
          // voteChange: direction === 'up' ? 1 : direction === 'down' ? -1 : 0
        })
      })
  }
  // amend this for comment/comments stuff. also maybe change this so can only upvote /downvote once and can undo.

  render() {
    if (this.state.comments === undefined) { return null }
    return (
      <div>
        <Comment article_id={this.props.article_id} currentUser={this.state.currentUser} />
        <br></br>
        {this.state.comments.map((comment, index) => {
          return <li key={index}>
            <div className="votes">{comment.votes}
              <br></br>
              <button name='up' onClick={() => this.handleVote(comment._id, 'up')}>Yay :)</button>
              <button name="down" onClick={() => this.handleVote(comment._id, 'down')}>Boo :(</button>
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