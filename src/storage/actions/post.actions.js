import { fetchTopDefault } from "../../utils/news.data";
import { postService } from "../services";
import { alertActions, apiAction } from "./index";
import { postReducer } from "storage/reducers";

const fetchTop = () => {
  console.log("Action fetchTop");
  return (dispatch) => {
    console.log(dispatch);
    dispatch(apiAction.processing());
    postService
      .fetchTop()
      .then(
        (topPosts) => {
          dispatch(apiAction.success({ data: topPosts, variable: "topNews", workspace: postReducer.postWorkspace }));
          dispatch(alertActions.success("Fetch successful", true));
        },
        (error) => {
          dispatch(alertActions.error(error.toString()));
          dispatch(
            apiAction.success({ data: fetchTopDefault(), variable: "topNews", workspace: postReducer.postWorkspace })
          );
          // dispatch(alertActions.error(error.toString()));
        }
      )
      .catch((err) => {
        dispatch(apiAction.failure(err.toString()));
        dispatch(alertActions.failure(err.toString()));
      });
  };
};

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
        console.log("Service fetchTop call error", error);
      }
    );
  };
}

const fetchTypeTop = () => {
  console.log("Action fetchTop");
  return (dispatch) => {
    console.log(dispatch);
    dispatch(apiAction.processing());
    postService
      .fetchTypeTop()
      .then((x) => x)
      .then(
        (topPosts) => {
          dispatch(
            apiAction.success({ data: topPosts, variable: "typeTopNews", workspace: postReducer.postWorkspace })
          );
          dispatch(
            alertActions.success("Fetch type top list successful", true)
          );
          // history.push("/");
        },
        (error) => {
          console.log("co error", error);
          dispatch(
            apiAction.success({
              data: fetchTopDefault(),
              variable: "typeTopNews"
            })
          );
          dispatch(alertActions.error(error.toString()));
        }
      )
      .catch((err) => {
        dispatch(apiAction.failure(err.toString()));
      });
  };
};

export const postActions = {
  fetchDetail,
  fetchTop,
  fetchTypeTop
};
