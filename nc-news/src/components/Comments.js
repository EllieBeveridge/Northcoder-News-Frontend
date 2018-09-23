import React, { Component } from 'react';
//import Comment from './Comment'
import Vote from './Vote'
import * as api from '../api'
import PropTypes from 'prop-types';

//This is found in the Article component

class Comments extends Component {
  state = {
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

  deleteComment = (comment_id) => {
    api.deleteComment(comment_id)
  }


  render() {
    if (this.state.comments === undefined) { return null }
    let sortedComments = this.state.comments.sort((a, b) => b.votes - a.votes)
    return (
      <div>
        <ul>
          {sortedComments.map((comment, index) => {
            return <li key={index}>
              <br></br>
              <Vote obj={comment} type={"comments"} />
              <p className="username">{comment.created_by.username}<img src={comment.created_by.avatar_url} height='15' width='15' alt={index} /></p>
              <br></br>
              <p className="body-text">{comment.body}</p>
              {this.props.currentUser === comment.created_by.username && <button name="delete" onClick={() => this.deleteComment(comment._id)}>Delete Comment</button>}
            </li>
          })}
        </ul>
      </div>
    );
  }
}

export default Comments;

Comments.propTypes = {
  match: PropTypes.object,
  currentUser: PropTypes.object,
  article_id: PropTypes.string
}