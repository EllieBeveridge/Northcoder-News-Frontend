import React, { Component } from 'react';
import * as api from '../api'
import { Link } from 'react-router-dom'
import './AllArticles.css';
import Topic from './Topic'
import Vote from './Vote'
import PropTypes from 'prop-types'

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
  }

  fetchAllArticles = () => {
    api.fetchAllArticles()
      .then(articles => {
        this.setState({ articles })
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
    // if (err) return <Redirect to={{
    //   pathname: "/404",
    //   state: {
    //     sendBackTo: '/'
    //   }
    //   //      push: true
    //   // push goes back 2 url addresses to avoid returning back to invalid url.
    // }} />
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
          <ul className="article-list">
            {sortedArticles.map((article, index) => {
              return (
                <div className="row">
                  <li key={index}>
                    <div className="col-sm- vote">
                      <Vote obj={article} type={"articles"} />
                    </div>
                    <div className="col-lg- article">
                      <span className="title"><Link to={`/articles/${article._id}`}>{article.title}</Link></span>
                      <br></br>
                      <p className="user-info">
                        <span className="topic">{article.belongs_to}</span>
                        <br></br>
                        <span><Link to={`/articles/${article._id}/comments`}>Comments: {article.comment_count}</Link></span>
                        <br></br>
                        <span>Posted By: <img src={article.created_by.avatar_url} height='15' width='15' alt={article.created_by.name} />
                          <Link to={`/users/${article.created_by.username}`}>{article.created_by.username}</Link> at {article.created_at}</span>
                      </p>
                    </div>

                  </li>
                </div>
              )
            })}
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