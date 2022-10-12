import { apiConstants, postConstants } from "../constants";

const initState = {
  scheduleDetail: null,
  timeSlots: null,
  posts: [],
  typeTopNews: [],
  topNews: []
};

export const post = (state = initState, action) => {
  console.log("calling to reducer", action.type, state);
  let returnData = state;
  switch (action.type) {
    case postConstants.FETCH_TYPE_TOP_POST_REQUEST:
    case postConstants.FETCH_TOP_POST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case postConstants.FETCH_TYPE_TOP_POST_COMPLETED:
      console.log("Reducer SUCCESS", action);
      returnData[action.variable] = action.data;
      return { ...returnData };
    case postConstants.FETCH_TOP_POST_COMPLETED:
      console.log("Reducer SUCCESS", action);
      returnData[action.variable] = action.data;
      return { ...returnData };
    case apiConstants.FAILURE:
      return {
        ...state,
        error: action.error,
        posts: action.data
      };
    // case postConstants.CLEAR:
    //   return {};
    default:
      return state;
  }
};
