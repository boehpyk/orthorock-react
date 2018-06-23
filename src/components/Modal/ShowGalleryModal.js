import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadPhotosIntoModal } from '../../AC/photos';
import {GLOBAL_URL} from '../../constants/config';
import {connect} from 'react-redux';
import moment from 'moment';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Loader from '../Utils/Loader';


class ShowGalleryModal extends Component {

    static propTypes = {
        eventId: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.props.loadPhotosIntoModal(this.props.eventId);
    }

    state = {
        currentImage: 0,
        lightboxIsOpen: false,
    }


    render() {
        return (
            <div>{ this.showPhotos() }</div>
        );
    }

    showPhotos = () => {
        const fetching  = this.props.photos.fetching_photos;
        const event = (this.props.photos.events !== undefined) ? this.props.photos.events[this.props.eventId] : undefined;


        if (fetching || event === undefined) {
            return (
                <div className="ModalContent-content">
                    <Loader text="Загрузка фото" />
                </div>
            );
        }
        else {

            const photosSet = event.photos.map(item => {
                return {
                    src: `${GLOBAL_URL}/uplds/${event.info.id}/gallery/${item.filename}`,
                    caption: item.title,
                    width: item.width,
                    height: item.height
                }
            });

            return (
                <div>
                    <div className="ModalContent-header">
                        <span className="date">{ moment(event.info.datebegin).format('DD/MM/YY') }</span> { event.info.title }
                    </div>
                    <div className="ModalContent-content">
                        <Gallery photos={photosSet} onClick={this.openLightbox} />
                        <Lightbox
                            images={photosSet}
                            isOpen={this.state.lightboxIsOpen}
                            onClickPrev={this.gotoPrevious}
                            onClickNext={this.gotoNext}
                            onClose={this.closeLightbox}
                            currentImage={this.state.currentImage}
                        />
                    </div>
                </div>
            );
        }
    }

    openLightbox = (event, obj) => {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

}

// export default ShowGalleryModal;
export default connect((state) => ({
    photos: state.photos
}), { loadPhotosIntoModal })(ShowGalleryModal);
