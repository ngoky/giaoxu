import axios from "axios";

const baseUrl = process.env.BACK_END_API;
const axiosRequest = async ({ tail, method, param, body }) => {
  return axios({ url: `${baseUrl}${tail}`, type: method, param, body })
    .then((result) => {
      console.log(result);
      return result;
    })
    .error((err) => err);
};
const request = async ({ tail, method, param, body }) => {
  return axiosRequest({ tail, method, param, body });
};

export default { request };
