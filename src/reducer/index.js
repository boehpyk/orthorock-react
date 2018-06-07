import {combineReducers} from 'redux';
import months from './months';
import modals from './modals';
import events from './events';

export default combineReducers({
    months, modals, events
})