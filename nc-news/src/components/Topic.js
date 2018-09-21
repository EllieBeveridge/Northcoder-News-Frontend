import React, { Component } from 'react';
import * as api from '../api'

class Topic extends Component {

  state = {
    title: '',
    created_by: this.props.currentUser,
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
    const newArticle = { ...this.state }
    this.postNewArticle(newArticle)
    // .then(console.log)
    this.setState({
      title: '',
      created_by: this.state.currentUser,
      body: ''
    })
  }

  postNewArticle = (newArticle) => {
    const topic = this.props.topic
    api.postArticle(topic, newArticle)
      .then((newArticle) => {
        console.log(newArticle, '*** inside .then')
        this.setState({ newArticle })
      })
      .catch(err => {
        console.log(err, 'Article not posted.')
      })

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            {!this.state.created_by ? <h3>You must be logged in to post an article.</h3> : <h3>Post New Article as {this.state.currentUser.username}</h3>}
            Title:
            <input onChange={this.handleChange} value={this.state.title} name="title" />
            Body:
            <input type="text" onChange={this.handleChange} value={this.state.body} name="body" />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );

  }
}

export default Topic;