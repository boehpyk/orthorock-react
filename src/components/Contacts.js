import React, { Component } from 'react';
import {GLOBAL_URL} from '../constants/config';
import {openModal} from '../AC/modals'
import {SHOW_SUBSCRIBE, SHOW_CONFIRM} from '../constants/modals'
import {connect} from 'react-redux';
import queryString from 'query-string'

class Contacts extends Component {

    state = {
        email: '',
        formValids: {
            email: false,
        },
        formErrors: {},
        formIsValid: false
    }

    enrollURL = `${GLOBAL_URL}/api/subscribe/`;
    confirmData = {};

    componentWillMount() {
        this.confirmData = queryString.parse(window.location.search);

        this.confirmEmail = this.confirmData.email || null;
        this.confirmCode = this.confirmData.confirm || null;
    }

    componentDidMount() {
        if (this.confirmCode && this.confirmEmail) {
            this.handleConfirm();
        }
    }

  render() {
    return (
        <section className="contacts">
            <h1>Контакты</h1>
            <div className="content">
                <div className="left">
                    <span className="head">ПОДПИШИТЕСЬ на нашу рассылку,</span><br />
                    чтобы быть в курсе наших новостей и получать анонсы предстоящих мероприятий
                </div>
                <div className="right">
                    { this.showFormFields() }
                </div>
            </div>
        </section>
    );
  }

    handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;

        this.setState({
                [name]: value
            },
            () => { this.validateField(name, value) }
        );
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.formValids.email;
        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' неверный формат';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            formValids: {
                email: emailValid,
            }
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({
            formIsValid: this.state.formValids.email
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            email:      this.state.email,
        };
        this.props.openModal({
            data: data,
            type: SHOW_SUBSCRIBE
        });
    }

    handleConfirm = async (event) => {
        const data = {
            email:      this.confirmEmail,
            code:      this.confirmCode,
        };
        this.props.openModal({
            data: data,
            type: SHOW_CONFIRM
        });
    }


    showFormFields = () => {

        return  (
                <form formMethod="POST">
                    <div className="form-email">
                        <input type="email" name="email" placeholder="Введите Ваш e-mail" onChange={ this.handleInputChange } />
                    </div>
                    <div className="form-submit">
                        <button onClick={this.handleSubmit} disabled={ !this.state.formIsValid }>Подписаться</button>
                    </div>
                </form>
        )

    }


}

// export default Contacts;
export default connect(null, { openModal })(Contacts);
