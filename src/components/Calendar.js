import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadMonthEvents} from '../AC/months';
import {openModal} from '../AC/modals';
import Slider from 'react-slick'
import moment from 'moment';
import {SHOW_EVENT} from '../constants/modals'

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTHS = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];

const WEEKDAYS_LONG =
    [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];

const FIRST_DAY_OF_WEEK = 1;
// Translate aria-labels
const LABELS = { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' };

class Calendar extends Component {

    static propTypes = {
        currentMonth: PropTypes.instanceOf(Date)
    }

    state = {
        currentMonth: moment().format('YYYY-MM'),
        selectedDay: moment().format('DD'),
        selectedDays: []
    }

    daysIndex = {};

    componentWillMount() {
        this.props.loadMonthEvents(this.state.currentMonth)
    }


    render() {

      return (
        <section className="calendar">
            <h1>Календарь</h1>
            <div className="content flex-content flex-horizontal flex-row-justify">
                <div className="left">
                    { this.getDayPicker() }
                </div>
                <div className="right">
                    <div className="Events">
                        { this.getEvents() }
                    </div>
                </div>
            </div>
        </section>
    );
  }

    changeMonth = date => {
        this.setState({
            currentMonth: moment(date).format('YYYY-MM')
        })
        this.props.loadMonthEvents(moment(date).format('YYYY-MM'));
    }

    getDayPicker() {

        const fetching  = this.props.months.fetching;

        if (fetching) {
            return 'Loading...';
        }
        else {
            const monthevents = this.props.months[this.state.currentMonth];

            const events = monthevents.entities || [];

            return (
                <DayPicker
                    locale="ru"
                    month={ moment(this.state.currentMonth).toDate() }
                    months={ MONTHS }
                    weekdaysLong={ WEEKDAYS_LONG }
                    weekdaysShort={WEEKDAYS_SHORT}
                    firstDayOfWeek={FIRST_DAY_OF_WEEK}
                    labels={LABELS}
                    selectedDays={ this.getSelectedDays(events) }
                    onMonthChange={this.changeMonth}
                    onDayClick={this.handleDayClick}
                />
            )
        }
    }

    getEvents() {
        const fetching  = this.props.months.fetching;
        const monthevents = this.props.months[this.state.currentMonth];

        if (fetching) {
            return 'Loading...';
        }
        else {
            const events = monthevents.entities || [];

            this.getDaysIndex(events);

            if (events.length === 0) {
                return 'В этом месяце семинаров нет';
            }

            const events_settings = {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                vertical: true
            };

            const eventElements = events.map((event) => (
            <div key={event.id}>
                <div className={(event.typeId === '1') ? 'Events-row' : 'Events-row Events-Orthos'}>
                    <div className="Events-date">
                        {moment(event.datebegin).date()}
                    </div>
                    <div className="Events-spacer"></div>
                    <div className="Events-info">
                        <div className="Events-info-content">
                            <div className="Events-info-title">
                                {event.title}
                            </div>
                            <div className="Events-info-lid">
                                {event.lid}
                            </div>
                        </div>
                    </div>
                    <div className="Events-button">
                        <button onClick={ this.showModal } value={ event.id }>Подробнее</button>
                    </div>
                </div>
            </div>))

            return (
                <div className="calendar-slides">
                    <Slider ref={slider => (this.slider = slider)} {...events_settings}>
                        { eventElements }
                    </Slider>
                </div>
            );
        }
    }

    getSelectedDays(events)
    {
        const selectedDays = events.map((event) => {
          return new Date(event.datebegin);
        })
        return selectedDays;
    }

    handleDayClick = (day, { selected }) => {
        // this.setState({
        //     selectedDay: selected ? undefined : moment(day).format('DD'),
        // });
        const selectedDay = selected ? moment(day).format('DD') : undefined;
        if (selectedDay !== undefined) {
            this.slider.slickGoTo(this.daysIndex[selectedDay]);
        }

    }

    getDaysIndex(events)
    {
        let i = 0;
        events.forEach((item) => {
            let day = moment(item.datebegin).format('DD');
            if (this.daysIndex[day] === undefined) {
                this.daysIndex[day] = i;
            }
            i++;
        });
    }

    showModal = (e) => {
        this.props.openModal({
            id: e.currentTarget.value,
            type: SHOW_EVENT
        });
    }

}


export default connect((state) => ({
    months: state.months
}), { loadMonthEvents, openModal })(Calendar);
