import {LOAD_PHOTOS} from '../constants/photos';
import {GLOBAL_URL} from '../constants/config';

export function loadPhotosIntoModal(eventId) {
    return (dispatch, getState) => {

        const event = getState().photos.events[eventId];

        if (event && event.photos.length > 0) {
            return;
        }

        dispatch({
            type: LOAD_PHOTOS,
            payload: { eventId },
            callAPI: `${GLOBAL_URL}/api/events/${eventId}/photos/`
        })
    }
}
