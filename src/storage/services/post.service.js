import { request, responseData } from '../http.helper'
const API_POST_PREFIX = '/posts'

const fetchList = ({ param }, dispatch) => {
    const tail = `${API_POST_PREFIX}`
    return request({ tail, param, method: 'GET' }).then((response) => {
        // localStorage.setItem("topNews", response);
        return responseData(response, dispatch)
    })
}

const fetchTop = async (dispatch) => {
    const tail = `${API_POST_PREFIX}`
    return request({
        tail,
        param: { limit: 10, page: 1 },
        method: 'GET'
    }).then((response) => {
        // localStorage.setItem("topNews", response);
        return responseData(response, dispatch)
    })
}

const fetchTypeTop = async (dispatch) => {
    const tail = `${API_POST_PREFIX}`
    return await request({
        tail,
        param: { limit: 10, page: 1 },
        method: 'GET'
    }).then((response) => {
        return response
    })
}

const fetchDetail = async (id, dispatch) => {
    const tail = `${API_POST_PREFIX}/:id`
    return await request({
        tail,
        param: id,
        method: 'GET'
    }).then((response) => {
        return responseData(response, dispatch)
    })
}

export const postService = {
    fetchList,
    fetchTop,
    fetchDetail,
    fetchTypeTop
}
