import { apiConstants } from "../constants";

const initState = {
  scheduleDetail: null,
  timeSlots: null,
  posts: []
}

export const post = (state = initState, action) => {
  // console.log("calling to reducer", action.type);
  switch (action.type) {
    case apiConstants.PROGRESSING:
      return {
        ...state,
        isLoading: true,
      };
    case apiConstants.COMPLETED:
      console.log('Reducer SUCCESS', action)
      const data = {
        ...state,
        isLoading: false,
        posts: action.data
      };
      data[action.variable] = action.data
      return { ...data };
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
