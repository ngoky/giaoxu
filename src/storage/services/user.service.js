import { userHelper } from 'storage/helpers'
import { request, responseData } from '../http.helper'

const login = async (data, dispatch) => {
    const tail = '/login'
    return request({ tail, data, method: 'POST' }).then((response) => {
        const data = responseData(response, dispatch)
        userHelper.saveAuthentication(data)
        if (data) {
            const { user, token } = data
            return { ...user, token }
        }

        return data
    })
}

const logout = async () => {
    const tail = '/logout'
    return await request({
        tail,
        param: { limit: 10, page: 1 },
        method: 'GET'
    }).then((response) => {
        const data = responseData(response)
        userHelper.saveAuthentication()
        return data
    })
}
export const userService = {
    login,
    logout
}
