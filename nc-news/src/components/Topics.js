import React, { Component } from 'react';

class Topics extends Component {
  state = {
    topics: ['dummy', 'list', 'of', 'topics']
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.topics.map((topic, index) => {
            return <li key={index}>{topic}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Topics;