import { fetchTopDefault } from '../../utils/news.data'
import { postService } from '@/storage/services'
import { alertActions, apiAction } from './index'
// @ts-ignore
import { postReducer } from 'storage/reducers'
import { Dispatch } from 'redux'

const fetchTop = () => {
    console.log('Action fetchTop')
    return (dispatch: Dispatch) => {
        console.log(dispatch)
        dispatch(apiAction.processing({}))
        postService
            .fetchTop()
            .then(
                (topPosts: any) => {
                    dispatch(
                        apiAction.success({
                            data: topPosts,
                            variable: 'topNews',
                            workspace: postReducer.postWorkspace
                        })
                    )
                    dispatch(alertActions.success('Fetch successful', true))
                },
                (error: { toString: () => string }) => {
                    dispatch(alertActions.error(error.toString()))
                    dispatch(
                        apiAction.success({
                            data: fetchTopDefault(),
                            variable: 'topNews',
                            workspace: postReducer.postWorkspace
                        })
                    )
                    // dispatch(alertActions.error(error.toString()));
                }
            )
            .catch((err: any) => {
                dispatch(apiAction.failure(err.toString()))
                dispatch(alertActions.error(err.toString()))
            })
    }
}

function fetchDetail(id: any) {
    return (dispatch: Dispatch) => {
        dispatch(apiAction.processing({}))
        postService.fetchDetail(id).then(
            (response: any) => {
                dispatch(
                    apiAction.success({
                        data: response,
                        variable: 'newDetail',
                        workspace: postReducer.postWorkspace
                    })
                )
                dispatch(alertActions.success('Fetch successful', true))
                // history.push("/");
            },
            (error: any) => {
                dispatch(apiAction.failure(error.toString()))
                dispatch(alertActions.error(error.toString()))
                console.log('Service fetchTop call error', error)
            }
        )
    }
}

const fetchTypeTop = () => {
    console.log('Action fetchTop')
    return (dispatch: Dispatch) => {
        console.log(dispatch)
        dispatch(apiAction.processing({}))
        postService
            .fetchTypeTop()
            .then((x: any) => x)
            .then(
                (topPosts: any) => {
                    dispatch(
                        apiAction.success({
                            data: topPosts,
                            variable: 'typeTopNews',
                            workspace: postReducer.postWorkspace
                        })
                    )
                    dispatch(
                        alertActions.success(
                            'Fetch type top list successful',
                            true
                        )
                    )
                    // history.push("/");
                },
                (error: any) => {
                    console.log('co error', error)
                    dispatch(
                        apiAction.success({
                            data: fetchTopDefault(),
                            variable: 'typeTopNews'
                        })
                    )
                    dispatch(alertActions.error(error.toString()))
                }
            )
            .catch((err: { toString: () => any }) => {
                dispatch(apiAction.failure(err.toString()))
            })
    }
}

export const postActions = {
    fetchDetail,
    fetchTop,
    fetchTypeTop
}
