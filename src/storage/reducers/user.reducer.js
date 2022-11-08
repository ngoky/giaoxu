import { userHelper } from 'storage/helpers/auth.header'
import { apiConstants, userConstants } from '../constants'
let user = userHelper.auth()
const initState = {
    loginUser: user
}

const userWorkSpace = 'users'

function users(state = initState, action) {
    if (action.workspace !== userWorkSpace) {
        return state
    }
    let returnData = state
    switch (action.type) {
        case apiConstants.PROGRESSING:
            return {
                ...state,
                isLoading: true
            }
        case apiConstants.COMPLETED:
            delete returnData[action.variable]
            returnData[action.variable] = { ...action.data }
            return { ...returnData }
        case apiConstants.FAILURE:
            return {
                ...state,
                error: action.error
                // posts: action.data
            }
        case userConstants.LOGOUT:
            return {
                ...state,
                loginUser: null
                // posts: action.data
            }
        default:
            return state
    }
}

export const userReducer = { users, userWorkSpace }
