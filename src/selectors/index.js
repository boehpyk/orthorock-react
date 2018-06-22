import { createSelector } from 'reselect';
import moment from 'moment'

export const monthsMapSelector = state => state.months;

export const monthsSelector = createSelector(monthsMapSelector, months => Object.values(months));

export const allEventsSelector = createSelector(monthsSelector, (months) => {
    return months.filter((item) => {
        return (typeof item === 'object' && item !== null && item !== undefined)
    }).reduce((res, current) => {
        return [...res, ...current.entities];
    }, []);

})


export const futureEventsSelector = createSelector(allEventsSelector, (events) => {
    return events.filter(event => {
        return moment(event.datebegin).isSameOrAfter(moment());
    });

})



