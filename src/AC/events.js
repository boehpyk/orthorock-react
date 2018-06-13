import { LOAD_EVENT } from '../constants/events';
import {GLOBAL_URL} from '../constants/config';

export function loadEventIntoModal(eventId) {

    return (dispatch, getState) => {

        const event = getState().events.events[eventId];

        if (event && event.title) return;

        dispatch({
            type: LOAD_EVENT,
            payload: { eventId },
            callAPI: `${GLOBAL_URL}/api/events/event/${eventId}/`
        })
    }
}