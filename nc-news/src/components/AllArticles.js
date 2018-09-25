import React, { Component } from 'react';
import * as api from '../api'
import { Link, Redirect } from 'react-router-dom'
import './AllArticles.css';
import Topic from './Topic'
import Vote from './Vote'
import PropTypes from 'prop-types'
const moment = require('moment');

class AllArticles extends Component {
  state = {
    articles: [],
    err: null,
    newArticle: {}
  }

  componentDidMount() {
    if (this.props.match.params.topic) {
      this.fetchArticlesByTopic(this.props.match.params.topic)
    } else {
      this.fetchAllArticles()
    }
    console.log(this.props)
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
    if (prevProps.match.params.topic !== this.props.match.params.topic) {
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
        this.setState({ newArticle })
      })
      .catch(err => {
        console.log(err, 'is it catching here?')
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
    let sortedArticles = articles.sort((a, b) => b.votes - a.votes)
    return (
      <div>
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