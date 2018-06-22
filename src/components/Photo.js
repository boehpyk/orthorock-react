import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadGalleries} from '../AC/galleries';
import {openModal} from '../AC/modals';
import Slider from 'react-slick';
import GalleryItem from './GalleryItem';


class Photo extends Component {

    componentWillMount() {
        this.props.loadGalleries()
    }

  render() {
    return (
        <section className="photo">
            <h1>Фотогалерея</h1>
            <div className="content">
                { this.getGalleries() }
                <div className="find-yourself">
                    <img src="/pctrs/find_yourself.png" border="0" className="img-responsive" alt="Найди себя" />
                </div>
            </div>
        </section>
    );
  }

  getGalleries = () => {
      const fetching  = this.props.galleries.fetching_galleries;
      const galleries = this.props.galleries.entities || [];

      // console.log(galleries.length);

      const settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1
      };


      if (fetching || galleries.length === 0) {
          return 'Loading...';
      }
      else {
          const listItems = galleries.map((gallery) => <li key={gallery.id}><GalleryItem gallery = {gallery} /></li>)
            return (
                    <Slider {...settings}>
                        {listItems}
                    </Slider>
            )
      }
  }
}

// export default Photo;
export default connect((state) => ({
    galleries: state.galleries
}), { loadGalleries, openModal })(Photo);
