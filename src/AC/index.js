import {CHANGE_DATE_RANGE, LOAD_ALL_EVENTS,
    LOAD_EVENT, START, SUCCESS, FAIL} from '../constants'


export function changeDateRange(dateRange) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: { dateRange }
    }
}

export function changeSelection(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: { selected }
    }
}

export function checkAndLoadMonthEvents() {
    return (dispatch, getState) => {
        const {events} = getState()

        if (events.loading || events.loaded) return

        disaptch({
            type: LOAD_ALL_EVENTS,
            callAPI: '/api/article'
        })
    }
}

export function loadArticle(id) {
    return (dispatch, getState) => {
        const article = getState().articles.getIn(['entities', id])

        if (article && (article.text || article.loading)) return

        dispatch({
            type: LOAD_ARTICLE + START,
            payload: { id }
        })

        setTimeout(() => fetch(`/api/article/${id}`)
            .then(res => res.json())
            .then(response => dispatch({
                type: LOAD_ARTICLE + SUCCESS,
                payload: { response, id }
            }))
            .catch(error => dispatch({
                type: LOAD_ARTICLE + FAIL,
                payload: { error, id }
            }))
        , 1000)
    }
}

export function loadArticleComments(articleId) {
    return {
        type: LOAD_ARTICLE_COMMENTS,
        payload: { articleId },
        callAPI: `/api/comment?article=${articleId}`
    }
}

export function checkAndLoadCommentsForPage(page) {
    return (dispatch, getState) => {
        const {comments: {pagination}} = getState()
        if (pagination.getIn([page, 'loading']) || pagination.getIn([page, 'ids'])) return

        dispatch({
            type: LOAD_COMMENTS_FOR_PAGE,
            payload: { page },
            callAPI: `/api/comment?limit=5&offset=${(page - 1) * 5}`
        })
    }
}
