import { postConstants } from "../constants";

export const post = (state = {}, action) => {
  console.log("calling to reducer", action);
  switch (action.type) {
    case postConstants.FETCH_POST_LOADING:
      return { isLoading: true };
    case postConstants.SUCCESS:
      return {
        items: action.data
      };
    case postConstants.ERROR:
      return {
        error: action.error,
        items: action.data
      };
    case postConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
