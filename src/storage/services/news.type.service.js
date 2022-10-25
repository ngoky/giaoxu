import { request, responseData } from '../http.helper'
const API_POST_PREFIX = '/types'

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
    return request({
        tail,
        param: { limit: 10, page: 1 },
        method: 'GET'
    }).then((response) => {
        return responseData(response, dispatch)
    })
}

const createOrUpdate = async (data, dispatch) => {
    const tail = `${API_POST_PREFIX}`
    return request({
        tail,
        // param: { limit: 10, page: 1 },
        data,
        method: 'post'
    }).then((response) => {
        return responseData(response, dispatch)
    })
}

const fetchDetail = async (id, dispatch) => {
    const tail = `${API_POST_PREFIX}/${id}`
    return await request({
        tail,
        param: id,
        method: 'GET'
    }).then((response) => {
        return responseData(response, dispatch)
    })
}

export const newsTypeService = {
    fetchList,
    createOrUpdate,
    fetchTop,
    fetchDetail,
    fetchTypeTop
}
