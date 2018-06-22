import {LOAD_GALLERIES} from '../constants/galleries';
import {GLOBAL_URL} from '../constants/config';

export function loadGalleries() {
    return (dispatch, getState) => {

        dispatch({
            type: LOAD_GALLERIES,
            payload: { },
            callAPI: `${GLOBAL_URL}/api/galleries/`
        })
    }
}
