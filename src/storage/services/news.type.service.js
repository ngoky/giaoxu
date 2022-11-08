import { request, responseData } from '../http.helper'
const API_POST_PREFIX = '/types'

const fetchList = ({ param = { page: 1, limit: 10 } }, dispatch) => {
    const tail = `${API_POST_PREFIX}`
    return request({ tail, param, method: 'GET', auth: true }).then(
        (response) => {
            // localStorage.setItem("topNews", response);
            return responseData(response, dispatch)
        }
    )
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
    const tail = `${API_POST_PREFIX}${data.id ? `/${data.id}` : ''}`
    return request({
        tail,
        // param: { limit: 10, page: 1 },
        data,
        method: data.id ? 'PATCH' : 'POST',
        auth: true
    }).then((response) => {
        return responseData(response, dispatch)
    })
}

const deleteType = async (id, dispatch) => {
    const tail = `${API_POST_PREFIX}/${id}`
    return request({
        tail,
        // param: { limit: 10, page: 1 },
        // data,
        auth: true,
        method: 'DELETE'
    }).then((response) => {
        return responseData(response, dispatch)
    })
}

const fetchDetail = async (id, dispatch) => {
    const tail = `${API_POST_PREFIX}/${id}`
    return await request({
        tail,
        param: id,
        method: 'GET',
        auth: true
    }).then((response) => {
        return responseData(response, dispatch)
    })
}

export const newsTypeService = {
    fetchList,
    createOrUpdate,
    fetchTop,
    deleteType,
    fetchDetail,
    fetchTypeTop
}
