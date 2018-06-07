import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
        <div className="loader">
            { this.props.text }
        </div>
    );
  }
}

export default Loader;
