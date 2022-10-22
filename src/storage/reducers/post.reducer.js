import { apiConstants } from '../constants'

const initState = {
    scheduleDetail: null,
    timeSlots: null,
    posts: [],
    newDetail: {}
}

export const post = (state = initState, action) => {
    // console.log("calling to reducer", action.type, state);
    let returnData = state
    switch (action.type) {
        case apiConstants.PROGRESSING:
            return {
                ...state,
                isLoading: true
            }
        case apiConstants.COMPLETED:
            console.log('Reducer SUCCESS', action)
            returnData[action.variable] = action.data
            return { ...returnData }
        case apiConstants.FAILURE:
            return {
                ...state,
                error: action.error
            }
        case apiConstants.CLEAR:
            returnData[action.variable] = {}
            return { ...returnData }
        case apiConstants.MODIFY_OBJ:
            returnData[action.variable] = action.data
            return { ...returnData }
        default:
            return state
    }
}
