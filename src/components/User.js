import React, { Component } from 'react';
import * as api from '../api'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class User extends Component {

    state = {
        user: {}
    }

    componentDidMount = () => {
        if (this.props.match.params.user_id) {
            this.getUser(this.props.match.params.user_id)
        }
    }

    getUser = (username) => {
        api.getUserInfo(username)
            .then(user => {
                this.setState({
                    user
                })
            })
    }

    render() {
        const { user } = this.state
        return (
            <div>
                <img src={`${user.avatar_url}`} alt={`${user._id}`} />
                <h1>{user.username}</h1>
                <h3>A.K.A {user.name}</h3>
                <p>Articles posted by {user.username}:</p>
                {this.props.allArticles
                    .filter(article => article.created_by.username === user.username)
                    .map((article, index) => {
                        return (
                            <li className="article-list" key={index}>
                                <span className="title"><Link id="title-link" to={`/articles/${article._id}`}>{article.title}<br></br>{article.belongs_to}</Link></span>
                            </li>
                        )
                    })

                    // })
                }
            </div>
        );
    }
}

export default User;

User.propTypes = {
    match: PropTypes.object,
    currentUser: PropTypes.object
}
