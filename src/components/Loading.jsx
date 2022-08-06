import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading-small" />
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
