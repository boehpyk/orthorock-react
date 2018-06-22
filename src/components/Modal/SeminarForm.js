import React, { Component } from 'react';
import Loader from '../Utils/Loader';
import Alert from '../Utils/Alert';
import { GLOBAL_URL } from '../../constants/config';


class SeminarForm extends Component {

    state = {
        sending: false,
        response: {
            status: '',
            message: '',
            payload: {}
        },
        name: '',
        nameEng: '',
        city: '',
        email: '',
        phone: '',
        isAgreed: false,
        formValids: {
            email: false,
            phone: false,
            name: false,
            nameEng: false,
            contacts: false,
            isAgreed: false
        },
        formErrors: {},
        formIsValid: false
    }

    enrollURL = `${GLOBAL_URL}/api/events/${this.props.event.id}/enroll/`;

    render() {
        return (
            <div>
                { this.showFormFields() }
            </div>
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
        let phoneValid = this.state.formValids.phone;
        let nameValid = this.state.formValids.name;
        let nameEngValid = this.state.formValids.nameEng;
        let isAgreedValid = this.state.formValids.isAgreed;
        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' неверный формат';
                break;
            case 'phone':
                phoneValid = value.length >= 6;
                fieldValidationErrors.phone = phoneValid ? '': ' слишком короткое';
                break;
            case 'name':
                nameValid = value.length >= 0;
                fieldValidationErrors.name = nameValid ? '': ' слишком короткое';
                break;
            case 'nameEng':
                nameEngValid = value.length >= 0;
                fieldValidationErrors.nameEng = nameEngValid ? '': ' слишком короткое';
                break;
            case 'isAgreed':
                isAgreedValid = value === true;
                fieldValidationErrors.isAgreed = isAgreedValid ? '': ' не отмечено';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            formValids: {
                email: emailValid,
                phone: phoneValid,
                name: nameValid,
                nameEng: nameEngValid,
                isAgreed: isAgreedValid
            }
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({
            formIsValid: (this.state.formValids.email || this.state.formValids.phone) &&
            this.state.formValids.name &&
            this.state.formValids.nameEng &&
            this.state.formValids.isAgreed
        });
    }

    errorClass = (error) => {
        return((error !== undefined && error.length === 0) ? '' : ' has-error');
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            sending: true
        });
        const data = {
            eventId:    this.props.event.id,
            name:       this.state.name,
            nameEng:    this.state.nameEng,
            city:       this.state.city,
            email:      this.state.email,
            phone:      this.state.phone
        };
        const res = await this.sendData(data);
        this.handleResponse(res);
    }

    sendData = async (data) => {

        return fetch(this.enrollURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify(data)
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            return data
        })
        .catch( error => {
            console.log(error);
        });
    }

    handleResponse = data => {
        this.setState({
            sending: false,
            response: data
        });
    }

    showFormFields = () => {

        const loader = (this.state.sending === true) ? <Loader text="Sending" /> : null;
        const alert = (this.state.response.status !== '') ? <Alert data={ this.state.response } hideAlert={ this.hideAlert } /> : null;

        return  (
            <div className={`formWrapper${(this.state.sending === true || this.state.response.status !== '') ? ' alerted' : ''}`}>
                { loader }
                { alert }
                <form formMethod="POST">
                    <div className="form-row">
                        <label>Ваше имя</label>
                        <input type="text" name="name" value={ this.state.name } onChange={ this.handleInputChange } placeholder="Иванов Иван Иванович" className={ this.errorClass(this.state.formErrors.name) } />
                    </div>
                    <div className="form-row">
                        <label>Ваше имя латиницей</label>
                        <input type="text" name="nameEng" value={ this.state.nameEng } onChange={ this.handleInputChange } placeholder="Ivan Ivanov"  className={ this.errorClass(this.state.formErrors.nameEng) } />
                    </div>
                    <div className="form-row">
                        <label>Город, где Вы работаете</label>
                        <input type="text" name="city" value={ this.state.city } onChange={ this.handleInputChange } placeholder="Москва" />
                    </div>
                    <div className="form-row">
                        <label>Email</label>
                        <input type="email" name="email" value={ this.state.email } onChange={ this.handleInputChange }  className={ this.errorClass(this.state.formErrors.email) } />
                    </div>
                    <div className="form-row">
                        <label>Телефон</label>
                        <input type="text" name="phone" value={ this.state.phone } onChange={ this.handleInputChange }  className={ this.errorClass(this.state.formErrors.phone) } />
                    </div>
                    <div className="form-row check-box">
                        <input type="checkbox" name="isAgreed" checked={ this.state.isAgreed } onChange={this.handleInputChange} value="yes"  className={ this.errorClass(this.state.formErrors.isAgreed) }  />
                        <label htmlFor="isAgreed">С текстом <a href="" target="_blank">пользовательского соглашения (договора-оферты)</a> согласен</label>
                    </div>
                    <div className="form-row align-center">
                        <button className="submit" onClick={this.handleSubmit } disabled={ !this.state.formIsValid }>Записаться</button>
                    </div>
                </form>
                <div className="overlay"></div>
            </div>
        )
    }

    hideAlert = () => {
        this.setState({
            response: {
                status: '',
                message: '',
                payload: {}
            },
        });
    }


}

export default SeminarForm;