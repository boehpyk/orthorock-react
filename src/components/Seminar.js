import React, { Component } from 'react'
import moment from 'moment'

class Seminar extends Component {
    render() {
        const article = this.props.seminar
        const datebegin = moment(article.datebegin)
        const dateend = moment(article.dateend)
        const style = {
            background: `url(/uplds/${article.image})`,
        }

        return (
            <div className="seminar-item" style={style}>
                <div className="date">{ datebegin.format('DD/MM') }</div>
                <h2>{ article.title }</h2>
                <div className="white-line"></div>
                <div className="more">
                    <div className="more-content">
                        <p>ГДЕ: { article.place }</p>
                        <p>КОГДА: { datebegin.format('HH:mm') } - {dateend.format('HH:mm')}</p>
                        <p>СТОИМОСТЬ: { article.price }</p>
                        <p>ОПИСАНИЕ: <span className="description">{ article.description }</span></p>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button>Записаться</button>
                </div>
            </div>
        )
    }
}



export default Seminar