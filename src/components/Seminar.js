import React, { Component } from 'react'
import {connect} from 'react-redux';
import {openModal} from '../AC/modals';
import moment from 'moment';
import {GLOBAL_URL} from '../constants/config';
import {SHOW_EVENT} from '../constants/modals'

class Seminar extends Component {
    render() {
        const article = this.props.seminar
        const datebegin = moment(article.datebegin)
        const dateend = moment(article.dateend)
        const style = {
            backgroundImage: `url(${GLOBAL_URL}/uplds/${article.id}/sm_${article.image})`,
        }

        return (
            <div className="seminar-item" style={style}>
                <div className="date">{ datebegin.format('DD/MM') }</div>
                <h2>{ article.title }</h2>
                <div className="white-line"></div>
                <div className="more">
                    <div className="more-content">
                        <p>ГДЕ: { article.city }</p>
                        <p>КОГДА: { datebegin.format('HH:mm') } - {dateend.format('HH:mm')}</p>
                        { this.getPrice(article.price) }
                        <p>ОПИСАНИЕ: <span className="description">{ article.lid }</span></p>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button onClick={ this.showModal } value={ article.id }>Подробнее</button>
                </div>
            </div>
        )
    }

    getPrice = (price) => {
        if (parseInt(price, 10) > 0) {
            return (
                <p>СТОИМОСТЬ: {price}</p>
            );
        }
    }

    showModal = (e) => {
        this.props.openModal({
            id: e.currentTarget.value,
            type: SHOW_EVENT
        });
    }

}



// export default Seminar
export default connect(null, { openModal })(Seminar);
