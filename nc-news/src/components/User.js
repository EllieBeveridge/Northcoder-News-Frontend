import React, { Component } from 'react';
import * as api from '../api'

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
            </div>
        );
    }
}

export default User;
