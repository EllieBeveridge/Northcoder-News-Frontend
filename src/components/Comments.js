import React, { Component } from 'react';
//import Comment from './Comment'
import Vote from './Vote'
import * as api from '../api'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './Comments.css'
import Media from 'react-media'
const moment = require('moment');

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
    const { comments } = this.state
    if (!comments) return <p>Loading Comments.....</p>;
    let sortedComments = this.state.comments.sort((a, b) => b.votes - a.votes)
    return (
      <div className="container">
        <ul className="list-group list-group-flush" id="border">
          {sortedComments.map((comment, index) => {
            return <li className="list-group-item" key={index}>
              <div className="container">
                <div className="col-sm-">
                  <Vote obj={comment} type={"comments"} />
                </div>
                <div className="col-xl- body-text">
                  {comment.body}
                </div>
                <div className="user-deets">
                  Posted By: <img src={comment.created_by.avatar_url} height='15' width='15' alt={comment.created_by.name} />
                  <Link to={`/users/${comment.created_by.username}`} />{comment.created_by.username}
                  <Media query="(min-width: 599px)"><span> {moment(comment.created_at).fromNow()}</span></Media>
                  {this.props.currentUser === comment.created_by.username && <button name="delete" onClick={() => this.deleteComment(comment._id)}>Delete Comment</button>}
                </div>
              </div>

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