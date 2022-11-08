import { newsTypeService } from '../services'
import { apiAction } from './index'
import { newsTypeReducer } from 'storage/reducers'

const createOrUpdate = (data) => {
    return (dispatch) => {
        dispatch(apiAction.processing())
        newsTypeService.createOrUpdate(data, dispatch).then((topPosts) => {
            dispatch(
                apiAction.success({
                    data: topPosts,
                    variable: 'typeDetail',
                    workspace: newsTypeReducer.newsTypeWorkspace
                })
            )
        })
    }
}

const deleteType = (id) => {
    return (dispatch) => {
        dispatch(apiAction.processing())
        newsTypeService.deleteType(id, dispatch).then((topPosts) => {
            dispatch(
                apiAction.success({
                    data: topPosts,
                    variable: 'typeDetail',
                    workspace: newsTypeReducer.newsTypeWorkspace
                })
            )
        })
    }
}

function fetchDetail(id) {
    return (dispatch) => {
        dispatch(apiAction.processing())
        newsTypeService.fetchDetail(id, dispatch).then((response) => {
            dispatch(
                apiAction.success({
                    data: response,
                    variable: 'typeDetail',
                    workspace: newsTypeReducer.newsTypeWorkspace
                })
            )
        })
    }
}

const fetchTypes = (param) => {
    return (dispatch) => {
        dispatch(apiAction.processing())
        newsTypeService.fetchList({ param }, dispatch).then((topPosts) => {
            dispatch(
                apiAction.success({
                    data: topPosts,
                    variable: 'types',
                    workspace: newsTypeReducer.newsTypeWorkspace
                })
            )
        })
    }
}

export const newsTypeActions = {
    fetchDetail,
    createOrUpdate,
    deleteType,
    fetchTypes
}
