import React, { Component } from 'react';
import * as api from '../api'

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
    const newComment = {
      body: this.state.body,
      created_by: this.props.currentUser._id
    }
    this.postNewComment(newComment)
    this.setState({
      body: ''
    })
  }

  postNewComment = (newComment) => {
    const { article_id } = this.props
    api.postComment(article_id, newComment)
      .then((newComment) => {
        this.setState({ newComment })
      })
      .catch(err => {
        console.log(err, 'Comment not posted.')
      })

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.props.currentUser ? <h3>Post New Comment as {this.props.currentUser.username}</h3> : <h3>You must be logged in to post a comment.</h3>}
          Body:
          <input type="text" onChange={this.handleChange} value={this.state.body} name="body" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Comment;