import React, { Component } from 'react';
import * as api from '../api.js'

class Vote extends Component {

  state = {
    obj: null,
    voteCount: 0
  }

  handleVote = (id, direction, type) => {
    this.setState({
      voteCount: direction === 'up' ? 1 : direction === 'down' ? -1 : 0
    })
    api.voteOnComponent(id, direction, type)
  }

  render() {
    return (
      <div>
        <div className="votes">{this.props.obj.votes + this.state.voteCount}
          <br></br>
          <button name='up' onClick={() => this.handleVote(this.props.obj._id, 'up', this.props.type)}>Yay :)</button>
          <button name="down" onClick={() => this.handleVote(this.props.obj._id, 'down', this.props.type)}>Boo :(</button>
        </div>
      </div>
    );
  }
}

export default Vote;