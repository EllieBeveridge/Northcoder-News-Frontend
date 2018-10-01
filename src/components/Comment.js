import React, { Component } from 'react';
//import * as api from '../api'
import PropTypes from 'prop-types';

//This is found in render on the Comments component

class Comment extends Component {
  state = {
    body: '',
    created_by: ''
  }


  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { article_id } = this.props
    const newComment = {
      body: this.state.body,
      created_by: this.props.currentUser._id
    }
    this.props.postNewComment(newComment, article_id)
    this.setState({
      body: ''
    })
  }


  render() {
    if (!this.props.currentUser) {
      return (
        <h3>You must be logged in to post a comment.</h3>
      )
    } else if (this.props.currentUser) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            Body:
         <input type="text" onChange={this.handleChange} value={this.state.body} name="body" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
}

export default Comment;

Comment.propTypes = {
  article_id: PropTypes.string,
  currentUser: PropTypes.object
}