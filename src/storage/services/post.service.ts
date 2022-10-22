import { fetchTopDefault, newByType, newDetail } from '../../utils/news.data'
import { request } from '../http.helper'

const fetchList = ({ param }: { param: any }) => {
    const tail = '/news'
    request({ tail, param, method: 'GET' }).then(
        (response: any) => {
            localStorage.setItem('topNews', response)
            return response
        },
        (_) => {
            //  localStorage.setItem('topNews', fetchTopDefault())
            return fetchTopDefault()
        }
    )
}

const fetchTop = async () => {
    const tail = '/news'
    return await request({
        tail,
        param: { limit: 10, page: 1 },
        method: 'GET'
    })
        .then(
            (response: any) => {
                // localStorage.setItem("topNews", response);
                return response
            },
            (_) => {
                // localStorage.setItem("topNews", fetchTopDefault());
                return fetchTopDefault()
            }
        )
        .catch((error) => {
            //localStorage.setItem("topNews", fetchTopDefault());
            return fetchTopDefault()
        })
}

const fetchTypeTop = async () => {
    const tail = '/news'
    return await request({
        tail,
        param: { limit: 10, page: 1 },
        method: 'GET'
    })
        .then(
            (response: any) => {
                return response
            },
            (_) => {
                //console.log("eo bi gi", _);
                return newByType()
            }
        )
        .catch(() => {
            return newByType()
        })
}

const fetchDetail = async (id: number) => {
    const tail = '/news/:id'
    return await request({
        tail,
        param: id,
        method: 'GET'
    })
        .then(
            (response: any) => {
                return response
            },
            (_) => {
                //console.log("eo bi gi", _);
                return newDetail(id)
            }
        )
        .catch((error) => {
            return newDetail(id)
        })
}

export const postService = {
    fetchList,
    fetchTop,
    fetchDetail,
    fetchTypeTop
}
