import React, { Component } from 'react';
import * as api from '../api'
import { Link } from 'react-router-dom'
import './AllArticles.css';
import Topic from './Topic'

class AllArticles extends Component {
  state = {
    articles: [],
    // voteChange: 0
    // article: {}
    err: null
  }

  componentDidMount() {
    if (this.props.match.params.topic) {
      this.fetchArticlesByTopic(this.props.match.params.topic)
    } else {
      this.fetchAllArticles()
    }
  }


  // componentDidMount() {
  //   if (this.props.match.params.topic) {
  //     this.fetchArticlesByTopic(this.props.match.params.topic)
  //       .then(({ articles, err }) => {
  //         if (err) return this.setState({ err });
  //         this.setState({ articles })
  //       })
  //     // const { articles, err } = await api.fetchArticles
  //     //   .catch((err) => {
  //     //     this.setState({ err })
  //     //   })
  //   } else {
  //     this.fetchAllArticles()
  //       .then(({ articles, err }) => {
  //         if (err) return this.setState({ err });
  //         this.setState({ articles })
  //       })
  //     // .catch(() => this.props.history.push('/404'));
  //     //redo this one
  //   }
  // }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.topic !== this.props.match.topic) {
      this.fetchArticlesByTopic(this.props.match.params.topic)
    } else if (prevProps !== this.props) {
      this.fetchAllArticles();
    }
  }


  fetchArticlesByTopic = (topic) => {
    api.fetchArticlesByTopic(topic)
      .then(articles => {
        this.setState({ articles })
      })
  }

  fetchAllArticles = () => {
    api.fetchAllArticles()
      .then(articles => {
        this.setState({ articles })
      })
  }

  // upvoteArticle = (article_id) => {
  //   api.upvoteArticle(article_id)
  //     .then(article => {
  //       this.setState({ article })
  //     })
  // }

  // downvoteArticle = (article_id) => {
  //   api.downvoteArticle(article_id)
  //     .then(articles => {
  //       this.setState({ article })
  //     })
  // }

  handleVote = (id, direction) => {
    api.voteOnArticle(id, direction)
      .then(article => {
        this.setState({
          // voteChange: direction === 'up' ? 1 : direction === 'down' ? -1 : 0,
          article
        })
      })
  }

  render() {
    // if (err) return <Redirect to={{
    //   pathname: "/404",
    //   state: {
    //     sendBackTo: '/'
    //   }
    //   //      push: true
    //   // push goes back 2 url addresses to avoid returning back to invalid url.
    // }} />
    if (!this.state.articles) return <p>Loading Articles.....</p>;
    return (
      <div className="main-articles-list">
        {this.props.match.params.topic && <Topic topic={this.props.match.params.topic} currentUser={this.props.currentUser} />}
        <ul>
          {this.state.articles.map((article, index) => {
            return (
              <li key={index}>
                <div className="votes">{article.votes}
                  <br></br>
                  <button name='up' onClick={() => this.handleVote(article._id, 'up')}>Yay :)</button>
                  <button name="down" onClick={() => this.handleVote(article._id, 'down')}>Boo :(</button>
                </div>
                <div className="title" ><Link to={`/articles/${article._id}`}>{article.title}</Link></div>
                <div className="topic">{article.belongs_to}</div>
                <br></br>
                <p><span>Posted By: {article.created_by.username} at {article.created_at}</span> <span><Link to={`/articles/${article._id}/comments`}>Comments: {article.comment_count}</Link></span></p>
              </li>)
          })}
        </ul>
      </div>
    );
  }
}

export default AllArticles;