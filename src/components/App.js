import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SectionsContainer, Section} from 'react-fullpage';
import Modal from 'react-modal';
import Header from './Header';
import About from './About';
import Seminars from './Seminars';
import Calendar from './Calendar';
import Photo from './Photo';
import Contacts from './Contacts';
import ShowEventModal from './Modal/ShowEventModal';
import ShowGalleryModal from './Modal/ShowGalleryModal';
import ShowSubscribeModal from './Modal/ShowSubscribeModal'
import ShowConfirmModal from './Modal/ShowConfirmModal';
import { hideModal } from '../AC/modals';


const MODAL_COMPONENTS = {
    'SHOW_EVENT': ShowEventModal,
    'SHOW_GALLERY': ShowGalleryModal,
    'SHOW_SUBSCRIBE': ShowSubscribeModal,
    'SHOW_CONFIRM': ShowConfirmModal
    /* other modals */
}

Modal.setAppElement('#root');


class App extends Component {

  render() {

      let options = {
          anchors:              ['Header', 'About', 'Seminars', 'Calendar', 'Photo', 'Contacts'],
          scrollBar:            false,
          navigation:           false,
          verticalAlign:        false,
          sectionPaddingTop:    '0',
          sectionPaddingBottom: '0',
          arrowNavigation:      false
      };

    return (
      <div className="App">
          <SectionsContainer {...options}>
              <Section>
                  <Header />
              </Section>
              <Section>
                  <About />
              </Section>
              <Section>
                  <Seminars />
              </Section>
              <Section>
                  <Calendar />
              </Section>
              <Section>
                  <Photo />
              </Section>
              <Section>
                  <Contacts />
              </Section>
          </SectionsContainer>
          <Modal
                isOpen={this.props.modal.modalType ? true : false }
                contentLabel="Example Modal"
                className="ReactModal"
                overlayClassName="ReactModal-Overlay"
          >
              <div className="ModalContent">
                  <button onClick={ this.closeModal } className="ModalContent-close">x</button>
                  { this.getModal() }
              </div>
          </Modal>
      </div>
    );
  }

  getModal()
  {
      if (!this.props.modal.modalType) {
          return <span /> // after React v15 you can return null here
      }

      const SpecificModal = MODAL_COMPONENTS[this.props.modal.modalType]
      return <SpecificModal {...this.props.modal.modalProps} />
  }

  closeModal = () => {
      this.props.hideModal();
  }
}

// export default App;
export default connect(
    (state) => ({
        modal: state.modals
    }), { hideModal })(App)
