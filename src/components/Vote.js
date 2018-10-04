import React, { Component } from 'react';
import * as api from '../api.js'
import PropTypes from 'prop-types';
import './Vote.css'

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
      <div >
        <div className="votes">
          <i className="fas fa-angle-up" onClick={() => this.handleVote(this.props.obj._id, 'up', this.props.type)}></i>
          <br></br>
          <span className="badge badge-danger badge-pill" id="badge-pos">{this.props.obj.votes + this.state.voteCount}</span>
          <br></br>
          <i className="fas fa-angle-down" onClick={() => this.handleVote(this.props.obj._id, 'down', this.props.type)}></i>
        </div >
      </div >
    );
  }

}

export default Vote;

Vote.propTypes = {
  obj: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}