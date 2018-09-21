import React, { Component } from 'react';
import * as api from '../api'

class Comment extends Component {
  state = {
    body: '',
    currentUser: this.props.currentUser,
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
      created_by: this.state.currentUser._id
    }
    this.postNewComment(newComment)
    console.log(this.state.currentUser.username, '<<<<Current user', newComment)
    this.setState({
      body: ''
    })
  }

  postNewComment = (newComment) => {
    const { article_id } = this.props
    api.postComment(article_id, newComment)
      .then((newComment) => {
        console.log(newComment, '*** inside .then')
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
          {!this.state.currentUser ? <h3>You must be logged in to post a comment.</h3> : <h3>Post New Comment as {this.state.currentUser.username}</h3>}
          Body:
          <input type="text" onChange={this.handleChange} value={this.state.body} name="body" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Comment;