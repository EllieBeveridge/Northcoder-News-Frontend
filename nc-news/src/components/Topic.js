import React, { Component } from 'react';
import PropTypes from 'prop-types';

//This is linked from AllArticles

class Topic extends Component {

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
        <div>
          <h3>You must be logged in to post an article.</h3>
        </div>
      )
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h3>Post New Article as {this.props.currentUser.username}</h3>
              Title: <input onChange={this.handleChange} value={this.state.title} name="title" />
              Body:
            <input type="text" onChange={this.handleChange} value={this.state.body} name="body" />
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      );

    }
  }
}

export default Topic;

Topic.propTypes = {
  topic: PropTypes.string,
  currentUser: PropTypes.object
}