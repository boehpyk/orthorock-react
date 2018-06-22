import {combineReducers} from 'redux';
import months from './months';
import modals from './modals';
import events from './events';
import galleries from './galleries'
import photos from './photos'

export default combineReducers({
    months, modals, events, galleries, photos
})