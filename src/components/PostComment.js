import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media'


//This is found in render on the Comments component

class PostComment extends Component {
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
            <div className="float-left">Body:</div>
            <div className="float-center">
              <Media query={{ maxWidth: 599 }} ><textarea rows="4" cols="25" onChange={this.handleChange} value={this.state.body} name="body" /></Media>
              <Media query={{ minWidth: 600 }} ><textarea rows="4" cols="65" onChange={this.handleChange} value={this.state.body} name="body" /></Media>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
}

export default PostComment;

PostComment.propTypes = {
  article_id: PropTypes.string,
  currentUser: PropTypes.object
}