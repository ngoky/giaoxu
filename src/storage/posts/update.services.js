import { postConstants } from "../constants";

const initState = {
  topNews: []
};

export const post = (props) => {
  const { state = initState, type, variable, data } = { ...props };
  console.log("calling to reducer", data);
  let ddata = state;
  switch (type) {
    case postConstants.FETCH_TOP_POST_INPROGRESS:
    case postConstants.FETCH_TYPE_TOP_POST_INPROGRESS:
      return { isLoading: true };
    case postConstants.FETCH_TOP_POST_COMPLETED:
      ddata[variable] = data;
      return {
        ...ddata
      };
    // case postConstants.SUCCESS:
    //   return {
    //     items: data
    //   };
    case postConstants.FETCH_TOP_POST_FAILURE:
      // temporary all data in error will make as data
      ddata[variable] = data;
      return {
        ...ddata
      };
    // case postConstants.CLEAR:
    //   return {};
    default:
      return state;
  }
};
