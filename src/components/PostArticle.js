import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media'
import './PostArticle.css'

//This is linked from AllArticles

class PostArticle extends Component {

  state = {
    title: '',
    created_by: '',
    body: ''
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newArticle = {
      title: this.state.title,
      created_by: this.props.currentUser.username,
      body: this.state.body
    }
    console.log(newArticle)
    this.props.postNewArticle(newArticle)
    this.setState({
      title: '',
      created_by: this.props.currentUser.username,
      body: ''
    })
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <p className="login-msg">You must be logged in to post an article.</p>
      )
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="post-article">
              <span id="post-as">Post New Article as {this.props.currentUser.username}</span>
              <div className="post-article-title">
                Title: <br></br><input onChange={this.handleChange} value={this.state.title} name="title" />
              </div>
              <div>
                <div className="post-article-body">Body:</div>
                <div>
                  <Media query={{ maxWidth: 599 }} ><textarea rows="4" cols="25" onChange={this.handleChange} value={this.state.body} name="body" /></Media>
                  <Media query={{ minWidth: 600 }} ><textarea rows="4" cols="65" onChange={this.handleChange} value={this.state.body} name="body" /></Media>
                </div>
              </div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      );

    }
  }
}

export default PostArticle;

PostArticle.propTypes = {
  topic: PropTypes.string,
  currentUser: PropTypes.object
}