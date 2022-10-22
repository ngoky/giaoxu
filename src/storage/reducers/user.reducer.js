import { apiConstants, userConstants } from "../constants";
const initState = {
  loginUser: {}
};

const userWorkSpace = 'users'

function users(state = initState, action) {
  if (action.workspace !== userWorkSpace) {
    return state
  }
  console.log('call user reducer');
  let returnData = state;
  switch (action.type) {
    case apiConstants.PROGRESSING:
      return {
        ...state,
        isLoading: true
      };
    case apiConstants.COMPLETED:
      returnData[action.variable] = action.data;
      return { ...returnData };
    case apiConstants.FAILURE:
      return {
        ...state,
        error: action.error
        // posts: action.data
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loginUser: {}
        // posts: action.data
      };
    default:
      return state;
  }
}

export const userReducer = { users, userWorkSpace }
