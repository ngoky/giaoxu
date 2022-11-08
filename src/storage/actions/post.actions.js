import { fetchTopDefault } from "../../utils/news.data";
import { postService } from "../services";
import { alertActions, apiAction } from "./index";
import { postReducer } from "storage/reducers";

const createOrUpdate = (data) => {
    return (dispatch) => {
        dispatch(apiAction.processing())
        postService.createOrUpdate(data, dispatch).then((topPosts) => {
            dispatch(
                apiAction.success({
                    data: topPosts,
                    variable: 'newsDetail',
                    workspace: postReducer.postWorkspace
                })
            )
        })
    }
}

const deletePost = (id) => {
    return (dispatch) => {
        dispatch(apiAction.processing())
        postService.deleteType(id, dispatch).then((topPosts) => {
            dispatch(
                apiAction.success({
                    data: topPosts,
                    variable: 'newsDetail',
                    workspace: postReducer.postWorkspace
                })
            )
        })
    }
}

const fetchTop = (params) => {
    return (dispatch) => {
        dispatch(apiAction.processing())
        postService.fetchTop(params, dispatch).then((topPosts) => {
            dispatch(
                apiAction.success({
                    data: topPosts,
                    variable: 'topNews',
                    workspace: postReducer.postWorkspace
                })
            )
            // dispatch(alertActions.success("Fetch successful", true));
            return topPosts
        })
    }
}

const fetchList = (params) => {
    return (dispatch) => {
        dispatch(apiAction.processing())
        postService.fetchList(params, dispatch).then((topPosts) => {
            dispatch(
                apiAction.success({
                    data: topPosts,
                    variable: 'posts',
                    workspace: postReducer.postWorkspace
                })
            )
            // dispatch(alertActions.success("Fetch successful", true));
            return topPosts
        })
    }
}

function fetchDetail(id) {
  return (dispatch) => {
    dispatch(apiAction.processing());
    postService.fetchDetail(id).then(
      (response) => {
        dispatch(apiAction.success({ data: response, variable: "newDetail", workspace: postReducer.postWorkspace }));
        dispatch(alertActions.success("Fetch successful", true));
        // history.push("/");
      },
      (error) => {
        dispatch(apiAction.failure(error.toString()));
        dispatch(alertActions.failure(error.toString()));
        console.error('Service fetchTop call error', error)
      }
    );
  };
}

const fetchTypeTop = () => {
    return (dispatch) => {
        dispatch(apiAction.processing())
        postService
            .fetchTypeTop(dispatch)
            // .then((x) => x)
            .then(
                (topPosts) => {
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
            )
    }
}

export const postActions = {
    fetchDetail,
    fetchTop,
    deletePost,
    fetchList,
    createOrUpdate,
    fetchTypeTop
}
