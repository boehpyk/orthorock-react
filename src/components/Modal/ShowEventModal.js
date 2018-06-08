import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadEventIntoModal } from '../../AC/events';
import {connect} from 'react-redux';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import Slider from 'react-slick'
import SeminarForm from "./SeminarForm";
import {GLOBAL_URL} from '../../constants/config';

class ShowEventModal extends Component {

    static propTypes = {
        eventId: PropTypes.string.isRequired
    }

    state = {
        show:       'info',
    }

    remoteImageSrc = GLOBAL_URL;


    componentDidMount() {
        this.props.loadEventIntoModal(this.props.eventId);
    }



    render() {

        return (
            <div className="ModalContent-content">{ this.showEvent() }</div>
        );
    }


    showEvent = () => {
        const fetching  = this.props.events.fetching_modal;
        const event = this.props.events.events[this.props.eventId];

        const Slidersettings = {
            dots: false,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };


        if (fetching || event === undefined) {
            return 'Loading...';
        }
        else {
            const imageSrc = `${ this.remoteImageSrc }/uplds/${event.id}/sm_${event.image}`;

            const priceBlock = (parseInt(event.price, 10) > 0) ? (
                <div className="item-row">
                    <label>Стоимость:</label> { event.price }
                </div>
            ) : '';

            return (
                <div>
                    <div className="ModalContent-header">
                        <div className="left">
                            <span className="date">{ moment(event.datebegin).format('DD/MM') }</span> { event.title }
                        </div>
                        <div className="right">
                            <button onClick={ this.handleSlides }>{ this.state.show === 'form' ? 'Подробнее' : 'Записаться'}</button>
                        </div>
                    </div>
                    <div className="ModalContent-content">
                        <Slider ref={slider => (this.slider = slider)} {...Slidersettings}>
                            <div className="ModalContent-info">

                                <img className="main-image" src={ imageSrc } border="0" alt={ event.title } />

                                <div className="item-row">
                                    <label>Где:</label> { event.city } { event.address }
                                </div>
                                <div className="item-row">
                                    <label>Когда:</label> { moment(event.datebegin).format('DD.MM') }, { moment(event.datebegin).format('HH:mm') } - { moment(event.dateend).format('HH:mm') }
                                </div>
                                { priceBlock }
                                <div className="item-row">
                                    <label className="wrapit">Описание:</label> { event.lid }
                                </div>
                                <div className="item-row">
                                    <label className="wrapit">Программа:</label> { ReactHtmlParser(event.main_text) }
                                </div>
                            </div>
                            <div className="ModalContent-form">

                                <SeminarForm event={event} />

                            </div>
                        </Slider>
                    </div>
                </div>
            );
        }
    }

    handleSlides = () => {
        if (this.state.show === 'form') {
            this.setState({
                show: 'info'
            });
            this.slider.slickGoTo(0, false);
        }
        else {
            this.setState({
                show: 'form'
            });
            this.slider.slickGoTo(1, false);
        }
    }

    getButton = () => {
        if (this.state.show === 'form') {
            return (
                <button onClick={ this.showInfo }>Записаться</button>
            )
        }
        else {
            return (
                <button onClick={ this.showForm() }>Подробнее</button>
            )
        }
    }

    showInfo = () => this.setState({
        show: 'info'
    })

    showForm = () => this.setState({
        show: 'form'
    })

}

// const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

// export default ShowEventModal;

export default connect((state) => ({
    events: state.events
}), { loadEventIntoModal })(ShowEventModal);