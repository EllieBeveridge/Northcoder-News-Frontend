import React, { Component } from 'react';
import * as api from '../api'
import { Link, Redirect } from 'react-router-dom'
import './AllArticles.css';
import Topic from './Topic'
import Vote from './Vote'
import Dropdown from './Dropdown'
import PropTypes from 'prop-types'
import Media from 'react-media'
const moment = require('moment');

//this is a big file, can we abstract out?

class AllArticles extends Component {
  state = {
    articles: [],
    err: null,
    newArticle: {},
    dropdown: ''
  }

  componentDidMount() {
    if (this.props.match.params.topic) {
      this.fetchArticlesByTopic(this.props.match.params.topic)
    } else {
      this.fetchAllArticles()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.topic !== this.props.match.params.topic) {
      this.fetchArticlesByTopic(this.props.match.params.topic)
    } else if (prevProps !== this.props && this.props.match.params.topic) {
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
      .catch(err => {
        this.setState({
          err
        })
      })
  }

  fetchAllArticles = () => {
    api.fetchAllArticles()
      .then(articles => {
        this.setState({ articles })
      })
      .catch(err => {
        this.setState({
          err
        })
      })
  }

  postNewArticle = (newArticle) => {
    const topic = this.props.match.params.topic
    api.postArticle(topic, newArticle)
      .then((newArticle) => {
        const articles = [...this.state.articles]
        articles.push(newArticle)
        this.setState({ articles })
      })
      .catch(err => {
        console.log(err, 'is it catching here?')
      })

  }

  handleDropdown = (event) => {
    this.setState({
      dropdown: event.target.value
    })
  }

  render() {
    if (this.state.err) return <Redirect to={{
      pathname: "/404",
      state: {
        sendBackTo: '/'
      },
      push: true
    }} />
    const { articles } = this.state
    if (!articles) return <p>Loading Articles.....</p>;
    let sortedArticles;
    if (this.state.dropdown === 'most-recent') {
      sortedArticles = [...articles].sort((a, b) => b.created_at - a.created_at)
    } else sortedArticles = [...articles].sort((a, b) => b.votes - a.votes)

    return (

      <div>
        <Dropdown handleDropdown={this.handleDropdown} />
        <div className="container">
          <div className="row">
            {this.props.match.params.topic && <Topic topic={this.props.match.params.topic} currentUser={this.props.currentUser} postNewArticle={this.postNewArticle} />}
          </div>
        </div>
        <br></br>
        <div className="container">
          <ul className="list-group list-group-flush" id="border">
            <span className="border">
              {sortedArticles.map((article, index) => {
                return (
                  <Media query={{ maxWidth: 599 }}>
                    {matches =>
                      matches ? (
                        // <div className="col">
                        <li className="list-group-item" key={index}>
                          <div className="col- vote" id="vote">
                            <Vote obj={article} type={"articles"} />
                          </div>
                          <div className="col-xl- article">
                            <div className="title-div">
                              <span className="title"><Link id="title-link-mobile" to={`/articles/${article._id}`}>{article.title}</Link></span>
                            </div>
                          </div>
                          <div className="user-info-mobile">
                            Posted By: <img src={article.created_by.avatar_url} height='15' width='15' alt={article.created_by.name} />
                            <Link to={`/users/${article.created_by.username}`}>{article.created_by.username} </Link>
                          </div>
                        </li>
                        // </div>
                      ) : (
                          <li className="list-group-item" id="grad" key={index}>
                            <div className="col-sm- vote">
                              <Vote obj={article} type={"articles"} />
                            </div>
                            <div className="col-lg- article">
                              <div className="title-div">
                                <span className="title"><Link id="title-link" to={`/articles/${article._id}`}>{article.title}</Link></span>
                              </div>
                            </div>
                            <div className="topic">
                              <span className="topic-topic">topic:</span><span className="belongs-to">{article.belongs_to}</span>
                            </div>
                            <div className="user-info">
                              <p>
                                <span className="posted-by">Posted By: <img src={article.created_by.avatar_url} height='15' width='15' alt={article.created_by.name} />
                                  <Link to={`/users/${article.created_by.username}`}>{article.created_by.username} </Link> {moment(article.created_at).fromNow()}</span>
                              </p>
                            </div>
                            <span className="comments"><Link id="comment-count-colour" to={`/articles/${article._id}/comments`}><i id="comment-colour" class="far fa-comments"></i>{article.comment_count}</Link></span>
                          </li>
                        )}</Media>
                )
              })}
            </span>
          </ul>
        </div >
      </div>
    );
  }
}

export default AllArticles;

AllArticles.propTypes = {
  match: PropTypes.object,
  currentUser: PropTypes.object
}