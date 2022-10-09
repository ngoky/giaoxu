import { apiConstants } from "../constants";

const success = (props) => {
    const { message = '', data = null, variable = null } = { ...props }
    return { type: apiConstants.COMPLETED, message, data, variable };
}

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

export const apiAction = {
    success,
    processing,
    failure,
    idle
};

