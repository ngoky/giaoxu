import { postConstants } from "../constants";
import { postService } from "../services";
import { alertActions } from "./";

const fetchTop = () => {
  console.log("Action fetchTop");
  return (dispatch) => {
    console.log(dispatch);
    dispatch({ type: postConstants.FETCH_POST_LOADING });
    postService
      .fetchTop()
      .then(
        (topPosts) => {
          console.log("ko error", topPosts);
          dispatch(success(topPosts));
          // history.push("/");
        },
        (error) => {
          console.log("co error", error);
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      )
      .catch((err) => {
        console.log("Service fetchTop call error", err);
      });
  };

  function success(topPosts) {
    return { type: postConstants.FETCH_POST_SUCCESS, data: topPosts };
  }
  function failure(error) {
    return { type: postConstants.FETCH_POST_FAILURE, error };
  }
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

export const postActions = {
  fetchTop,
  fetchList
};
