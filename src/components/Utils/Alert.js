import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class Alert extends Component {

  render() {

    const resp = this.props.data;
    // console.log(this.props.data);
    //
    //   return (<div></div>);

    const status = resp.status;
    const message = resp.message;
    const errors = (resp.errors.length > 0) ? resp.errors : null;

    return (
        <div className={`alert${(status !== 'ok') ? ' alert-danger' : ' alert-success'}`}>
          <div className="alert-wrapper">
            <button onClick={ this.props.hideAlert } className="alert-close">x</button>
            <h4>{ message.title }</h4>
            <div className="msg">{ message.text }</div>
            <ul className="err">{(
                errors.map(item => ReactHtmlParser(`<li>${item}</li>`))
            )}</ul>
          </div>
        </div>
    );
  }
}

export default Alert;
