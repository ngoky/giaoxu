import { request } from "../http.helper";

const fetchList = ({ param }) => {
  const tail = "/news";
  return request({ tail, param, method: "GET" });
};

const fetchTop = () => {
  const tail = "/news";
  return request({
    tail,
    param: { limit: 10, page: 1 },
    method: "GET"
  });
};

export default {
  fetchList,
  fetchTop
};
