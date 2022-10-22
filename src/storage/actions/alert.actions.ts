import { alertConstants } from '../constants/alert.constants'

export const alertActions = {
    success,
    error,
    clear
}

function success(message: string, show?: boolean) {
    return { type: alertConstants.SUCCESS, message, show }
}

function error(message: string, show?: boolean) {
    return { type: alertConstants.ERROR, message, show }
}

function clear() {
    return { type: alertConstants.CLEAR }
}
