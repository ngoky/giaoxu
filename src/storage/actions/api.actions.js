import { apiConstants } from "../constants";
import { } from "../helpers";

const success = (props) => {
  const { message = "", data = null, variable = null } = { ...props };
  return { type: apiConstants.COMPLETED, message, data, variable };
};

const failure = (props) => {
  const { message = '', data = null, variable = null } = { ...props }
  return { type: apiConstants.FAILURE, message, data, variable };
}

const processing = (props) => {
  const { message = '', data = null, variable = null } = { ...props }
  return { type: apiConstants.PROGRESSING, message, data, variable };
}

const idle = (props) => {
  const { message = '', data = null, variable = null } = { ...props }
  return { type: apiConstants.IDLE, message, data, variable };
}

// send for specific key to check in reducer
const sendAction = (props) => {
  console.log('sendAction', props)
  const { message = "", data = null, variable = null, type } = { ...props };
  return { type, message, data, variable };
};

export const apiAction = {
  success,
  processing,
  failure,
  idle,
  sendAction
};
