import { LOAD_GALLERIES, REQUEST, SUCCESS } from '../constants/galleries';

const initialState = {
    entities: [],
    fetching_galleries: false
}

export default function galleries(state = initialState, action) {
    switch (action.type) {
        case LOAD_GALLERIES + REQUEST:
            return { ...state, fetching_galleries: true }

        case LOAD_GALLERIES + SUCCESS:
            return { ...state,
                entities: action.response,
                fetching_galleries: false
            }

        default:
            return state;
    }
}