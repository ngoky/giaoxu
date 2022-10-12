import { apiConstants, userConstants } from "../constants";
const initState = {
  loginUser: {}
};
export function users(state = initState, action) {
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
  // switch (action.type) {
  //   case userConstants.GETALL_REQUEST:
  //     return {
  //       loading: true
  //     };
  //   case userConstants.GETALL_SUCCESS:
  //     return {
  //       items: action.users
  //     };
  //   case userConstants.GETALL_FAILURE:
  //     return {
  //       error: action.error
  //     };
  //   case userConstants.DELETE_REQUEST:
  //     // add 'deleting:true' property to user being deleted
  //     return {
  //       ...state,
  //       items: state.items.map((user) =>
  //         user.id === action.id ? { ...user, deleting: true } : user
  //       )
  //     };
  //   case userConstants.DELETE_SUCCESS:
  //     // remove deleted user from state
  //     return {
  //       items: state.items.filter((user) => user.id !== action.id)
  //     };
  //   case userConstants.DELETE_FAILURE:
  //     // remove 'deleting:true' property and add 'deleteError:[error]' property to user
  //     return {
  //       ...state,
  //       items: state.items.map((user) => {
  //         if (user.id === action.id) {
  //           // make copy of user without 'deleting:true' property
  //           const { deleting, ...userCopy } = user;
  //           // return copy of user with 'deleteError:[error]' property
  //           return { ...userCopy, deleteError: action.error };
  //         }

  //         return user;
  //       })
  //     };
  //   default:
  //     return state;
  // }
}
