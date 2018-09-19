import React, { Component } from 'react';
import * as api from '../api.js'

class Article extends Component {
  state = {
    article: {}
  }

  componentDidMount() {
    if (this.props.match.params.article_id) {
      this.getArticleById(this.props.match.params.article_id)
    }
  }

  // getArticleById = (article_id) => {
  //   api.fetchArticleById(article_id)
  //     .then(article => {
  //       this.setState({ article })
  //     })
  // }

  render() {
    return (
      <div>
        {this.state.article.name}
      </div>
    );
  }
}

export default Article;