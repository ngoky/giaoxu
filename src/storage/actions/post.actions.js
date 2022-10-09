import { fetchTopDefault } from "../../utils/news.data";
import { postConstants } from "../constants";
import { postService } from "../services";
import { alertActions, apiAction } from "./index";

const fetchTop = () => {
  console.log("Action fetchTop");
  return (dispatch) => {
    console.log(dispatch);
    dispatch(apiAction.processing());
    postService
      .fetchTop()
      .then(x => x)
      .then(
        (topPosts) => {
          // console.log("ko error", topPosts);
          dispatch(apiAction.success({ data: topPosts, variable: 'topNews' }));
          dispatch(alertActions.success('Fetch successful'));
          // history.push("/");
        },
        (error) => {
          console.log("co error", error);
          dispatch(alertActions.error(error.toString()));
          dispatch(apiAction.success({ data: fetchTopDefault(), variable: 'topNews' }));
          // dispatch(alertActions.error(error.toString()));
        }
      )
      .catch((err) => {
        console.log("Service fetchTop call error", err);
      });
  };

  // function success(topPosts) {
  //   return { type: postConstants.FETCH_POST_SUCCESS, data: topPosts };
  // }
  // function failure(error) {
  //   return { type: postConstants.FETCH_POST_FAILURE, error };
  // }
};

function fetchList() {
  return (dispatch) => {
    postService.login().then(
      (user) => {
        dispatch(success(user));
        // history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function success(user) {
    return { type: postConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: postConstants.LOGIN_FAILURE, error };
  }
}

const fetchTypeTop = () => {
  console.log("Action fetchTop");
  return (dispatch) => {
    console.log(dispatch);
    dispatch(apiAction.processing());
    postService
      .fetchTypeTop()
      .then(x => x)
      .then(
        (topPosts) => {
          // console.log("ko error", topPosts);
          dispatch(apiAction.success({ data: topPosts, variable: 'typeTopNews' }));
          dispatch(alertActions.success('Fetch successful'));
          // history.push("/");
        },
        (error) => {
          console.log("co error", error);
          dispatch(apiAction.success({ data: fetchTopDefault(), variable: 'typeTopNews' }));
          dispatch(failure(error.toString()));
          // dispatch(alertActions.error(error.toString()));
        }
      )
      .catch((err) => {
        dispatch(failure(err.toString()))
        // console.log("Service fetchTop call error", err);
      });
  };

  function success(topPosts) {
    return { type: postConstants.FETCH_POST_SUCCESS, data: topPosts };
  }
  function failure(error) {
    return { type: postConstants.FETCH_POST_FAILURE, error };
  }
};

export const postActions = {
  fetchTop,
  fetchList,
  fetchTypeTop
};
