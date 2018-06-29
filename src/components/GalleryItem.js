import React, { Component } from 'react';
import moment from 'moment';
import {GLOBAL_URL} from '../constants/config';
import {SHOW_GALLERY} from '../constants/modals'
import {connect} from 'react-redux';
import {openModal} from '../AC/modals';

class GalleryItem extends Component {

    render() {
        const article = this.props.gallery;
        const datebegin = moment(article.datebegin);
        const style = {
            backgroundImage: `url(${GLOBAL_URL}/uplds/${article.id}/gallery/${article.image})`
        }


        return (
            <div className="seminar-item" style={style}>
                <div className="info">
                    <div className="date-title">{ datebegin.format('DD/MM/YY') } { article.title }</div>
                    <button onClick={ this.showModal } value={ article.id }>Смотреть все</button>
                </div>
                <div className="overlay"></div>
            </div>
        )
    }

    showModal = (e) => {
        this.props.openModal({
            id: e.currentTarget.value,
            type: SHOW_GALLERY
        });
    }

}



// export default GalleryItem
export default connect(null, { openModal })(GalleryItem);
