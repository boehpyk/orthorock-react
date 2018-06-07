import {LOAD_MONTH_EVENTS} from '../constants/months';

export function loadMonthEvents(month) {
    return (dispatch, getState) => {

        const [y, m] = month.split('-');

        dispatch({
            type: LOAD_MONTH_EVENTS,
            payload: { month },
            callAPI: `http://orthorock.work/api/events/${y}/${m}/`
        })
    }
}