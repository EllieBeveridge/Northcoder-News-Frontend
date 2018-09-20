import React, { Component } from 'react';
import * as api from '../api'
import { Link } from 'react-router-dom';

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

  render() {
    if (this.state.comments === undefined) { return null }
    return (
      <div>
        {this.state.comments.map((comment, index) => {
          return <li key={index}>
            <Link to={`/api/comments/${comment._id}?vote=up`}>
              <Link to={`/api/comments/${comment._id}?vote=down`}>Downvote</Link>
              {comment.votes}
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