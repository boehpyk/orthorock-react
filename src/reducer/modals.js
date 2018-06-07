import { SHOW_MODAL, HIDE_MODAL } from '../constants/modals';

const initialState = {
    modalType: false,
    modalProps: {}
}

export default function modals(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps
            }
        case HIDE_MODAL:
            return initialState
        default:
            return state
    }
}