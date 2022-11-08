import { request, responseData } from '../http.helper'
const API_POST_PREFIX = '/posts'
const ADMIN_CTX = '/admin'


const createOrUpdate = async (data, dispatch) => {
    const tail = `${ADMIN_CTX}${API_POST_PREFIX}${data.id ? `/${data.id}` : ''}`
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

const deletePost = async (id, dispatch) => {
    const tail = `${API_POST_PREFIX}/${id}`
    return request({
        tail,
        // param: { limit: 10, page: 1 },
        // data,
        method: 'DELETE',
        auth: true
    }).then((response) => {
        return responseData(response, dispatch)
    })
}

const fetchList = ({ param }, dispatch) => {
    const tail = `${API_POST_PREFIX}`
    return request({ tail, param, method: 'GET', auth: true }).then((response) => {
        // localStorage.setItem("topNews", response);
        return responseData(response, dispatch)
    })
}

const fetchTop = async (param, dispatch) => {
    const tail = `${API_POST_PREFIX}`
    return request({
        tail,
        param: { ...param },
        method: 'GET',
        auth: true
    }).then((response) => {
        // localStorage.setItem("topNews", response);
        return responseData(response, dispatch)
    })
}

const fetchTypeTop = async (dispatch) => {
    const tail = `${API_POST_PREFIX}/fetch-lastest-by-type`
    return await request({
        tail,
        param: { limit: 10, page: 1 },
        method: 'GET'
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

export const postService = {
    createOrUpdate,
    deletePost,
    fetchList,
    fetchTop,
    fetchDetail,
    fetchTypeTop
}
