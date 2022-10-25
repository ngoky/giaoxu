import { newsTypeService } from '../services'
import { apiAction } from './index'
import { newsTypeReducer } from 'storage/reducers'

const createOrUpdate = (data) => {
    console.log('createOrUpdate', data)
    return (dispatch) => {
        // console.log(dispatch)
        dispatch(apiAction.processing())
        newsTypeService.createOrUpdate(data, dispatch).then(
            (topPosts) => {
                dispatch(
                    apiAction.success({
                        data: topPosts,
                        variable: 'typeDetail',
                        workspace: newsTypeReducer.newsTypeWorkspace
                    })
                )
                // dispatch(alertActions.success("Fetch successful", true));
                // return topPosts
            }
            // (error) => {
            //   dispatch(alertActions.error(error.toString()));
            //   dispatch(
            //     apiAction.success({ data: fetchTopDefault(), variable: "topNews", workspace: postReducer.postWorkspace })
            //   );
            //   // dispatch(alertActions.error(error.toString()));
            // }
        )
        // .catch((err) => {
        //   dispatch(apiAction.failure(err.toString()));
        //   dispatch(alertActions.failure(err.toString()));
        // });
    }
}

function fetchDetail(id) {
    return (dispatch) => {
        dispatch(apiAction.processing())
        newsTypeService.fetchDetail(id, dispatch).then(
            (response) => {
                dispatch(
                    apiAction.success({
                        data: response,
                        variable: 'typeDetail',
                        workspace: newsTypeReducer.newsTypeWorkspace
                    })
                )
                // dispatch(alertActions.success('Fetch successful', true))
                // history.push("/");
            }
            // (error) => {
            //     dispatch(apiAction.failure(error.toString()))
            //     dispatch(alertActions.failure(error.toString()))
            //     console.log('Service fetchTop call error', error)
            // }
        )
    }
}

const fetchTypes = () => {
    console.log('Action fetchTypes')
    return (dispatch) => {
        dispatch(apiAction.processing())
        newsTypeService.fetchList(dispatch).then(
            (topPosts) => {
                console.log(topPosts)
                dispatch(
                    apiAction.success({
                        data: topPosts,
                        variable: 'types',
                        workspace: newsTypeReducer.newsTypeWorkspace
                    })
                )
                // dispatch(
                //     alertActions.success(
                //         'Fetch type top list successful',
                //         true
                //     )
                // )
                // history.push("/");
            }
            // (error) => {
            //     console.log('co error', error)
            //     dispatch(
            //         apiAction.success({
            //             data: fetchTopDefault(),
            //             variable: 'typeTopNews'
            //         })
            //     )
            //     dispatch(alertActions.error(error.toString()))
            // }
        )
        // .catch((err) => {
        //     dispatch(apiAction.failure(err.toString()))
        // })
    }
}

export const newsTypeActions = {
    fetchDetail,
    createOrUpdate,
    fetchTypes
}
