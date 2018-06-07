import {REQUEST, SUCCESS, FAIL} from '../constants/api'

export default store => next => action => {
    const {callAPI, type, ...rest} = action
    if (!callAPI) return next(action)
    next({
        type: type + REQUEST,
        ...rest
    })

    fetch(callAPI)
        .then(res => res.json())
        .then(response => next({...rest, type: type + SUCCESS, response}))
        .catch(error => next({...rest, type: type + FAIL, error}));

}