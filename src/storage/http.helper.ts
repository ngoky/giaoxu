import axios, { AxiosRequestConfig } from 'axios'

const baseUrl = process.env.REACT_APP_BACK_END_API
console.log(process.env.REACT_APP_BACK_END_API)
const axiosRequest = async ({
    tail,
    method,
    param,
    body
}: {
    tail: String
    method: string
    param?: any
    body?: any
}) => {
    const config = {
        url: `${baseUrl}${tail}`,
        type: method,
        param,
        body
    } as AxiosRequestConfig

    return await axios({ ...config })
    // .then((result) => {
    //   // console.log(result);
    //   return result;
    // })
    // .error((err) => err);
}
export const request = async ({
    tail,
    method = 'GET',
    param,
    body
}: {
    tail: String
    method?: string
    param?: any
    body?: any
}) => {
    return await axiosRequest({ tail, method, param, body })
}
