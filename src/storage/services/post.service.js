import { fetchTopDefault, newByType } from "../../utils/news.data";
import { request } from "../http.helper";

const fetchList = ({ param }) => {
  console.log("call to fetchList");
  const tail = "/news";
  request({ tail, param, method: "GET" }).then(
    ((response) => {
      localStorage.setItem("topNews", response);
      return response;
    },
      (_) => {
        console.log("eo bi gi", _);
        localStorage.setItem("topNews", fetchTopDefault());
        // return fetchTopDefault();
      })
  );
};

const fetchTop = async () => {
  console.log("call to fetchTop");
  const tail = "/news";
  return await request({
    tail,
    param: { limit: 10, page: 1 },
    method: "GET"
  })
    .then(
      ((response) => {
        // localStorage.setItem("topNews", response);
        return response;
      },
        (_) => {
          console.log("eo bi gi", _);
          // localStorage.setItem("topNews", fetchTopDefault());
          return fetchTopDefault();
        })
    )
    .catch((error) => {
      console.log("oops", error);
      //localStorage.setItem("topNews", fetchTopDefault());
      return fetchTopDefault();
    });
};


const fetchTypeTop = async () => {
  console.log("call to fetchTop");
  const tail = "/news";
  return await request({
    tail,
    param: { limit: 10, page: 1 },
    method: "GET"
  })
    .then(
      ((response) => {
        return response;
      },
        (_) => {
          //console.log("eo bi gi", _);
          return newByType();
        })
    )
    .catch((error) => {
      return newByType();
    });
};

export const postService = {
  fetchList,
  fetchTop,
  fetchTypeTop
};
