import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {connect} from 'react-redux';
import { hideModal } from '../../AC/modals';

class Alert extends Component {

  render() {

    const resp = this.props.data;
    // console.log(this.props.data);
    //
    //   return (<div></div>);

    const status = resp.status;
    const message = resp.message;
    const errors = (undefined !== resp.errors && resp.errors.length > 0) ? resp.errors : null;

    return (
        <div className={`alert${(status !== 'ok') ? ' alert-danger' : ' alert-success'}`}>
          <div className="alert-wrapper">
            <button onClick={ this.props.hideAlert } className="alert-close">x</button>
            <h4>{ message.title }</h4>
            <div className="msg">{ message.text }</div>
            { this.showErrors(errors) }
            { this.showModalCloseButton(status) }
          </div>
        </div>
    );
  }

  showErrors = (errors) => {
      if (null !== errors) {
          return (
            <ul className="err">{(
                errors.map(item => ReactHtmlParser(`<li>${item}</li>`))
            )}</ul>
          )
      }
  }

    showModalCloseButton = (status) => {
        if (status === 'ok') {
            return <button onClick={ this.closeModal } className="alert-success-button">Закрыть окно</button>
        }
    }

    closeModal = () => {
        this.props.hideModal();
    }

}

// export default Alert;
export default connect(null, { hideModal })(Alert)
