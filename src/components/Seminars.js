import React, { Component } from 'react';
import { seminars } from './../fixtures';
import Seminar from './Seminar';
import Slider from 'react-slick';


class Seminars extends Component {
  render() {
    const listItems = seminars.map((seminar) => <li key = {seminar.id}><Seminar seminar = {seminar}/></li>)
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    return (
        <section className="seminars">
            <h1>Семинары</h1>
            <div className="content">
                <div>
                    <Slider {...settings}>
                        {listItems}
                    </Slider>
                </div>
            </div>
        </section>
    );
  }
}

export default Seminars;
