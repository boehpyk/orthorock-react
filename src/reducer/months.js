import { LOAD_MONTH_EVENTS, LOAD_FUTURE_EVENTS, REQUEST, SUCCESS } from '../constants/months';

import moment from 'moment';


const initialState = {
    [moment().format('YYYY-MM')]: {
        entities: []
    },
    fetching: true,
    fetching_future: true
}

export default function months(state = initialState, action) {
    switch (action.type) {
        case LOAD_MONTH_EVENTS + REQUEST:
            return { ...state, fetching: true }

        case LOAD_MONTH_EVENTS + SUCCESS:
            return { ...state, [action.payload.month]: {
                    entities: action.response
                },
                fetching: false
            }

        case LOAD_FUTURE_EVENTS + SUCCESS:
            const response = action.response;
            const monthevents = response.reduce((res, current) => {
                let key = moment(current.datebegin).format('YYYY-MM');
                if (res[key] === undefined) {
                    res[key] = {
                      entities: []
                    };
                }

                return {...res, [key]: {
                        ...res[key],
                        entities: [...res[key].entities, current]
                    }
                }
            }, {
                fetching_future: false
            });

            return {...state, ...monthevents};

        default:
            return state;
    }
}