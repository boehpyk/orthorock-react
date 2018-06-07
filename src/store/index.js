import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import api from '../middlewares/api'


/* BEGIN redux debugger ON */

const conposeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enchancer = conposeEnchancer(applyMiddleware(thunk, api))

const store = createStore(reducer, enchancer)

/* END redux debugger ON */


/* BEGIN redux debugger OFF */

// const enchancer = applyMiddleware(thunk)
//
// const store = createStore(reducer, enchancer)

/* END redux debugger OFF */

//dev only
window.store = store

export default store