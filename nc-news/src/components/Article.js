import React, { Component } from 'react';
import * as api from '../api.js'

class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    this.fetchArticles(this.props.match.params.topic);
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.topic !== this.props.match.topic) {
      this.fetchArticles(this.props.match.params.topic)
    }
  }


  fetchArticles = (topic) => {
    api.fetchArticlesByTopic(topic)
      .then(articles => {
        this.setState({ articles })
      })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.articles.map(article => {
            return <li key={article.title}>{article.title}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Articles;