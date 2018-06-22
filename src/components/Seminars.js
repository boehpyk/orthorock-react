import React, { Component } from 'react';
import Seminar from './Seminar';
import Slider from 'react-slick';
import {connect} from 'react-redux';
import {loadFutureEvents} from '../AC/months';
import {futureEventsSelector} from '../selectors';


class Seminars extends Component {

    componentWillMount() {
        this.props.loadFutureEvents()
    }

  render() {
    return (
        <section className="seminars">
            <h1>Семинары</h1>
            <div className="content">
                { this.getFutureSeminars() }
            </div>
        </section>
    );
  }

  getFutureSeminars = () => {

      const fetching  = this.props.fetching_future;

      if (fetching) {
          return 'Loading...';
      }
      else {

          const seminars = this.props.futureevents;

          const listItems = seminars.map((seminar) => <li key={seminar.id}><Seminar seminar={seminar} /></li>)
          const settings = {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 2,
              slidesToScroll: 1
          };
          return (
              <div>
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
