import { alertConstants } from "../constants/alert.constants";

export function alert(state = {}, action: any) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "alert-success",
        snakeType: "success",
        show: Boolean(action.show) || false,
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: "alert-danger",
        snakeType: "error",
        show: Boolean(action.show) || false,
        message: action.message
      };
    case alertConstants.CLEAR:
      return { show: false };
    default:
      return state;
  }
}
