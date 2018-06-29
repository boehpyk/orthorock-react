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

    state = {
        currentImage: 0,
        lightboxIsOpen: false,
    }


    componentDidMount() {
        this.props.loadPhotosIntoModal(this.props.eventId);
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    componentDidUpdate() {
        this.handleWindowSizeChange();
    }

    handleWindowSizeChange = () => {
        const container = document.getElementsByClassName('ReactModal__Content')[0];
        const headerHeight = (this.headerRef !== undefined) ? this.headerRef.offsetHeight : 0;
        const contentHeight = (this.contentRef !== undefined) ? this.contentRef.offsetHeight : 0;
        const containerHeight = (container !== undefined) ? container.clientHeight : 0;

        if (headerHeight > 0 && contentHeight > 0 && containerHeight > 0) {
            this.contentRef.style.height = `${(containerHeight - headerHeight - 20)}px`;
        }
    };



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
                    <div className="ModalContent-header" ref={this.setHeaderRef}>
                        <span className="date">{ moment(event.info.datebegin).format('DD/MM/YY') }</span> { event.info.title }
                    </div>
                    <div className="ModalContent-content" ref={this.setContentRef}>
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

    setHeaderRef = header => {
        this.headerRef = header;
    }
    setContentRef = content => {
        this.contentRef = content;
    }

}

// export default ShowGalleryModal;
export default connect((state) => ({
    photos: state.photos
}), { loadPhotosIntoModal })(ShowGalleryModal);
