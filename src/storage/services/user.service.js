import { user } from "../../utils/user.data";
import { request } from "../http.helper";

const login = async ({ data }) => {
  const tail = "/login";
  return await request({ tail, data, method: "POST" })
    .then(
      ((response) => {
        // localStorage.setItem("topNews", response);
        return response;
      },
      (_) => {
        console.log("eo bi gi", _);
        // localStorage.setItem("topNews", fetchTopDefault());
        return user;
      })
    )
    .catch((error) => {
      console.log("oops", error);
      //localStorage.setItem("topNews", fetchTopDefault());
      return user;
    });
};

const logout = async () => {
  const tail = "/logout";
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
        return user;
      })
    )
    .catch((error) => {
      console.log("oops", error);
      //localStorage.setItem("topNews", fetchTopDefault());
      return user();
    });
};
export const userService = {
  login,
  logout
};
