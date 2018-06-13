import {LOAD_MONTH_EVENTS} from '../constants/months';
import {GLOBAL_URL} from '../constants/config';

export function loadMonthEvents(month) {
    return (dispatch, getState) => {

        const [y, m] = month.split('-');

        dispatch({
            type: LOAD_MONTH_EVENTS,
            payload: { month },
            callAPI: `${GLOBAL_URL}/api/events/${y}/${m}/`
        })
    }
}