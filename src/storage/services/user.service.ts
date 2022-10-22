import { stringify } from 'querystring'
import { user } from '../../utils/user.data'
import { request } from '../http.helper'

const login = async (props: any) => {
    const { data }: { data: any } = props
    const tail = '/login'
    return await request({ tail, data, method: 'POST' }:{tail: string, data?: any, method: string })
        .then(
            (response) => {
                // localStorage.setItem("topNews", response);
                return response
            },
            (_) => {
                // localStorage.setItem("topNews", fetchTopDefault());
                return user
            }
        )
        .catch((error) => {
            console.log('oops', error)
            //localStorage.setItem("topNews", fetchTopDefault());
            return user
        })
}

const logout = async () => {
    const tail = '/logout'
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
                return user
            }
        )
        .catch((error) => {
            console.error(error)
            //localStorage.setItem("topNews", fetchTopDefault());
            return user
        })
}
export const userService = {
    login,
    logout
}
