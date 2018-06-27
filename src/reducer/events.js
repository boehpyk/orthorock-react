import { LOAD_EVENT, REQUEST, SUCCESS } from '../constants/events';
// import {HIDE_MODAL} from "../constants/modals";

const initialState = {
    events: {},
    fetching_modal: false
}

export default function modal(state = initialState, action) {
    switch (action.type) {
        case LOAD_EVENT + REQUEST:
            return { ...state, fetching_modal: true }

        case LOAD_EVENT + SUCCESS:
            return { ...state, events: {
                    ...state.events,
                    [action.payload.eventId]: action.response
                },
                fetching_modal: false
            }
        // case HIDE_MODAL:
        //     return { ...state, fetching_modal: true }


        default:
            return state;
    }
}