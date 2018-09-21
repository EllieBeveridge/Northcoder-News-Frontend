import React, { Component } from 'react';

const Topics = (props) => {
  return (
    <div>
      <ul>
        {this.props.topics.map((topic, index) => {
          return <li key={index}>{topic}</li>
        })}
      </ul>
    </div>
  );
}

export default Topics;