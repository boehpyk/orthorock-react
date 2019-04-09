import React, { Component } from 'react';
import Seminar from './Seminar';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {loadFutureEvents} from '../AC/months';
import {futureEventsSelector} from '../selectors';
import Loader from './Utils/Loader';


class Seminars extends Component {

    componentWillMount() {
        this.props.loadFutureEvents(this.props.typeId);
    }

  render() {
        const additionalClassName = (this.props.typeId === '1') ? 'seminars courses' : 'seminars';
    return (
        <section className={additionalClassName}>
            <h1>{ (this.props.typeId === '1') ? 'Офис-курсы' : 'Семинары' }</h1>
            <div className="content">
                { this.getFutureSeminars() }
            </div>
        </section>
    );
  }

  getFutureSeminars = () => {

      const fetching  = this.props.fetching_future;

      if (fetching) {
          return <Loader text="Загрузка" />;
      }
      else {

          const seminars = this.props.futureevents;

          const listItems = seminars.filter(seminar => seminar.typeId === this.props.typeId).map((seminar) => {
                  return (
                      <li key={seminar.id}><Seminar seminar={seminar}/></li>
                  );
          });
          const settings = {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 2,
              slidesToScroll: 1,
              responsive: [
                  {
                      breakpoint: 900,
                      settings: {
                          slidesToShow: 1
                      }
                  }
              ]
          };
          return (
              <div className="Seminars-slider">
                  <Slider {...settings}>
                      {listItems}
                  </Slider>
              </div>
          );
      }

  }
}

// export default Seminars;
export default connect((state) => ({
    futureevents: futureEventsSelector(state),
    fetching_future: state.months.fetching_future
}), { loadFutureEvents })(Seminars);
