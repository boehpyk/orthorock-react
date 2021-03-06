import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {GLOBAL_URL} from '../../constants/config';
import {connect} from 'react-redux';
import Loader from '../Utils/Loader';
import {hideModal} from '../../AC/modals'
import ReactHtmlParser from 'react-html-parser';


class ShowSubscribeModal extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired
    };

    state = {
        sending: false,
        response: {
            status: '',
            message: '',
            payload: {}
        },
        hasError: false
    };

    data = this.props.data || {};
    enrollURL = `${GLOBAL_URL}/api/subscribe/`;

    async componentWillMount() {
        await this.handleLoad();
    }

    // componentDidCatch(error, info) {
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    //     // You can also log the error to an error reporting service
    //     // logErrorToMyService(error, info);
    //     console.log(error, info);
    // }

    render() {
        return (
            <div className="ModalSubscribe-content">
                { this.showContent() }
            </div>
        );
    }

    handleLoad = async (event) => {
        this.setState({
            sending: true
        });
        const data = {
            email:      this.data.email || null,
        };
        const res = await this.sendData(data);

        this.handleResponse(res);
    }

    sendData = async (data) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const options = (process.env.NODE_ENV === 'development') ? {
                method: 'POST',
                mode: 'cors',
                headers: headers,
                body:  JSON.stringify(data)

        } : {
            method: 'POST',
            headers: headers,
            body:  JSON.stringify(data)
        };

        return fetch(this.enrollURL, options)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            return data
        })
        .catch( error => {
            // throw new Error(error);
            return {
                status: 'error',
                message: {
                    title: 'Ошибка связи с сервером'
                }
            };
            // console.log(error);
        });
    }

    handleResponse = data => {
        this.setState({
            sending: false,
            response: data
        });
    }

    showContent = () => {
        const loader = this.state.sending === true;

        if (loader) {
            return <Loader text="Отправка" />
        }
        else {

            const resp = this.state.response;

            const status = resp.status;
            const message = resp.message;
            const errors = (undefined !== resp.errors && resp.errors.length > 0) ? resp.errors : null;

            return (
                <div className={`alert${(status !== 'ok') ? ' alert-danger' : ' alert-success'}`}>
                    <div className="alert-wrapper">
                        <button onClick={ this.closeModal } className="alert-close">x</button>
                        <h4>{ message.title }</h4>
                        <div className="msg">{ message.text }</div>
                        { this.showErrors(errors) }
                        { this.showModalCloseButton(status) }
                    </div>
                </div>
            );
        }
    }

    showErrors = (errors) => {
        if (null !== errors) {
            return (
                <ul className="err">{(
                    errors.map(item => ReactHtmlParser(`<li>${item}</li>`))
                )}</ul>
            )
        }
    };

    showModalCloseButton = (status) => {
        if (status === 'ok') {
            return <button onClick={ this.closeModal } className="alert-success-button">Закрыть окно</button>
        }
    };

    closeModal = () => {
        this.props.hideModal();
    };




}

// export default ShowGalleryModal;
export default connect(null, { hideModal })(ShowSubscribeModal)