import React, { Component } from 'react';

class Alert extends Component {

  render() {

    const status = this.props.data.status;
    const message = this.props.data.message;

    return (
        <div className={`alert${(status !== 'ok') ? ' error' : ' success'}`}>
            { message }
        </div>
    );
  }
}

export default Alert;
