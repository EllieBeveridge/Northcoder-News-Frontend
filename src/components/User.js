import React, { Component } from 'react';
import * as api from '../api'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './User.css'

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
                <div className="container">
                    <div className="row user-pos">
                        <img src={`${user.avatar_url}`} height='85' width='85' alt={`${user._id}`} />
                        <h1>{user.username}</h1>
                    </div>
                </div>
                <div className="container">
                    <h3>A.K.A {user.name}</h3>
                </div>
                <p>Articles posted by {user.username}:</p>
                <div className="container">
                    <ul className="list-group list-group-flush w-100" id="border">
                        {this.props.allArticles
                            .filter(article => article.created_by.username === user.username)
                            .map((article, index) => {
                                return (
                                    <li className="list-group-item w-100 article-list" key={index}>
                                        <span className="user-title w-100"><Link id="user-title-link" to={`/articles/${article._id}`}>{article.title}<br></br>{article.belongs_to}</Link></span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default User;

User.propTypes = {
    match: PropTypes.object.isRequired,
    currentUser: PropTypes.object
}
