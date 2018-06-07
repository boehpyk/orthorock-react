import { LOAD_MONTH_EVENTS, REQUEST, SUCCESS } from '../constants/months';

import moment from 'moment';


const initialState = {
    [moment().format('YYYY-MM')]: {
        entities: []
    },
    fetching: true
}

export default function months(state = initialState, action) {
    switch (action.type) {
        case LOAD_MONTH_EVENTS + REQUEST:
            return { ...state, fetching: true }

        case LOAD_MONTH_EVENTS + SUCCESS:
            return { ...state, [action.payload.month]: {
                    ...[action.payload.month], entities: action.response
                },
                fetching: false
            }

        default:
            return state;
    }
}