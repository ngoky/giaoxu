import { apiConstants } from '@/constants/api.constants'
import axios from 'axios'
import { alertActions } from './actions'
import { userHelper } from './helpers'

const baseUrl = process.env.REACT_APP_BACK_END_API

const handlerResponse = (apiResponse) => {
    const { status = 500, data = null, message = null } = apiResponse
    const response = {
        status: apiConstants.INTERNAL_PROCESS.INTERNAL_ERROR,
        message: message
    }
    switch (status) {
        case apiConstants.API_RESPONSE_CODE.INTERNAL_ERROR:
            return response
        case apiConstants.API_RESPONSE_CODE.SUCCESS:
        case apiConstants.API_RESPONSE_CODE.CREATED:
            return data
        default:
            return data
    }
}

export const responseData = (dataResponse, dispatch) => {
    const {
        code = apiConstants.INTERNAL_PROCESS.FAILED,
        data = null,
        message = null
    } = dataResponse
    switch (code) {
        case apiConstants.INTERNAL_PROCESS.SUCCESS:
            if (dispatch) {
                dispatch(alertActions.success(message, true))
            }
            return data
        default:
            if (dispatch) {
                dispatch(alertActions.error(message, true))
            }
            return null
    }
}

const axiosRequest = async ({
    tail,
    method,
    param,
    data,
    auth = false,
    headers = { 'content-type': 'application/json' }
}) => {
    if (auth) {
        headers['Authorization'] = `${userHelper.authHeader().Authorization}`
        // headers.appends({ Authentication: `Bearer ${userHelper.auth()}` })
    }

    console.log(headers)
    return axios({
        url: `${baseUrl}${tail}`,
        method,
        param,
        data,
        headers
    })
        .then((result) => {
            return handlerResponse(result)
        })
        .catch((err) => {
            console.error('axios error', err)
            return handlerResponse({
                status: apiConstants.API_RESPONSE_CODE.INTERNAL_ERROR,
                message: err.message
            })
        })
}
export const request = async ({
    tail,
    method = 'GET',
    param = null,
    data = null,
    headers,
    auth = false
}) => {
    return await axiosRequest({ tail, method, param, data, headers, auth })
}
