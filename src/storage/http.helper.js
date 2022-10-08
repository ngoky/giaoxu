import axios from "axios";

const baseUrl = process.env.REACT_APP_BACK_END_API;
console.log(process.env.REACT_APP_BACK_END_API);
const axiosRequest = async ({ tail, method, param, body }) => {
  return await axios({ url: `${baseUrl}${tail}`, type: method, param, body });
  // .then((result) => {
  //   // console.log(result);
  //   return result;
  // })
  // .error((err) => err);
};
export const request = async ({ tail, method = "GET", param, body }) => {
  return await axiosRequest({ tail, method, param, body });
};
