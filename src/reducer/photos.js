import { LOAD_PHOTOS, REQUEST, SUCCESS } from '../constants/photos';

const initialState = {
    fetching_photos: false,
    events: {}
}

export default function photos(state = initialState, action) {

    switch (action.type) {
        case LOAD_PHOTOS + REQUEST:
            return { ...state, fetching_photos: true }

        case LOAD_PHOTOS + SUCCESS:
            return { ...state, events: {
                ...state.events,
                [action.payload.eventId]: {
                    info: action.response.info,
                    photos: action.response.photos
                }
            },
                fetching_photos: false
            }


        default:
            return state;
    }
}