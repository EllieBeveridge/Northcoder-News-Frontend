import React, { Component } from 'react';
//import Comment from './Comment'
import Vote from './Vote'
import * as api from '../api'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './Comments.css'

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
      <div className="container">
        <div className="row">
          <ul>
            {sortedComments.map((comment, index) => {
              return <li key={index}>
                <div className="row">
                  <div className="container">
                    <div className="col-sm-">
                      <Vote obj={comment} type={"comments"} />
                    </div>
                    <div className="col-xl-">
                      <span className="body-text">{comment.body}</span>
                      <br></br>
                      <span className="user-info">Posted By: <img src={comment.created_by.avatar_url} height='15' width='15' alt={comment.created_by.name} />
                        <Link to={`/users/${comment.created_by.username}`}>{comment.created_by.username}</Link> at {comment.created_at}</span>
                      {this.props.currentUser === comment.created_by.username && <button name="delete" onClick={() => this.deleteComment(comment._id)}>Delete Comment</button>}
                    </div>

                  </div>
                </div>
              </li>
            })}
          </ul>
        </div>
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