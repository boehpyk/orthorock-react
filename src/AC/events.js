import { LOAD_EVENT } from '../constants/events';

export function loadEventIntoModal(eventId) {

    return (dispatch, getState) => {

        const event = getState().events.events[eventId];

        if (event && event.title) return;

        dispatch({
            type: LOAD_EVENT,
            payload: { eventId },
            callAPI: `http://orthorock.work/api/events/event/${eventId}/`
        })
    }
}