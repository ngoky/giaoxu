import { apiConstants } from '../constants'

const initState = {
    types: [],
    typeDetail: {}
}

const newsTypeWorkspace = 'newsTypes'

export const newsTypes = (state = initState, action) => {
    if (action.workspace !== newsTypeWorkspace) {
        return { ...state }
    }
    console.log('call posts reducer next')
    let returnData = state
    switch (action.type) {
        case apiConstants.PROGRESSING:
            return {
                ...state,
                isLoading: true
            }
        case apiConstants.COMPLETED:
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
            console.log('Reducer MODIFY_OBJ', action.data)
            returnData[action.variable] = action.data
            return { ...returnData }
        default:
            return state
    }
}

export const newsTypeReducer = { newsTypes, newsTypeWorkspace }
