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
      <div className="main-articles-list">
        {this.props.match.params.topic && <Topic topic={this.props.match.params.topic} currentUser={this.props.currentUser} postNewArticle={this.postNewArticle} />}
        <ul className="article-list">
          {sortedArticles.map((article, index) => {
            return (
              <li className="article" key={index}>
                <div className="votes">
                  <Vote obj={article} type={"articles"} />
                </div>
                <div className="title" ><Link to={`/articles/${article._id}`}>{article.title}</Link></div>
                <div className="topic">{article.belongs_to}</div>
                <br></br>
                <div className="user-info">
                  <p><span>Posted By: <img src={article.created_by.avatar_url} height='15' width='15' alt={article.created_by.name} />
                    <Link to={`/users/${article.created_by.username}`}>{article.created_by.username}</Link> at {article.created_at}</span>
                    <span><Link to={`/articles/${article._id}/comments`}>Comments: {article.comment_count}</Link></span></p>
                </div>
              </li>)
          })}
        </ul>
      </div>
    );
  }
}

export default AllArticles;

AllArticles.propTypes = {
  match: PropTypes.object,
  currentUser: PropTypes.object
}