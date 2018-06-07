import {SHOW_MODAL, HIDE_MODAL} from '../constants/modals';

export function openModal(modal) {
    return (dispatch, getState) => {
        dispatch({
            type: SHOW_MODAL,
            payload: {
                modalType: 'SHOW_EVENT',
                modalProps: {
                    eventId: modal.id
                }
            },
        })
    }
}

export function hideModal() {
    return (dispatch, getState) => {
        dispatch({
            type: HIDE_MODAL,
            payload: {}
        })
    }
}
