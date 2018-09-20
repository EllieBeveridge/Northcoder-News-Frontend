import React, { Component } from 'react';
import * as api from '../api'

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
    const newArticle = { ...this.state }
    this.postNewArticle(newArticle)
    // .then(console.log)
    this.setState({
      title: '',
      created_by: '',
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
        console.log(err, 'Article not posted. Double check you have input an existing user')
      })

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Post New Article</h3>
          Title:
          <input onChange={this.handleChange} value={this.state.title} name="title" />
          Created By:
          <input type="text" onChange={this.handleChange} value={this.state.created_by} name="created_by" />
          Body:
          <input type="text" onChange={this.handleChange} value={this.state.body} name="body" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );

  }
}

export default Topic;