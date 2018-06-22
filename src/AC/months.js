import {LOAD_MONTH_EVENTS, LOAD_FUTURE_EVENTS} from '../constants/months';
import {GLOBAL_URL} from '../constants/config';

export function loadMonthEvents(month) {
    return (dispatch, getState) => {

        const events = getState().months[month];

        if (events && events.entities.length > 0) return;

        const [y, m] = month.split('-');

        dispatch({
            type: LOAD_MONTH_EVENTS,
            payload: { month },
            callAPI: `${GLOBAL_URL}/api/events/${y}/${m}/`
        })
    }
}

export function loadFutureEvents(month) {
    return (dispatch, getState) => {

        dispatch({
            type: LOAD_FUTURE_EVENTS,
            payload: {},
            callAPI: `${GLOBAL_URL}/api/events/future/`
        })
    }
}