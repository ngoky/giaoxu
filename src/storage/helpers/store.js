import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { alert, authentication, registration, post } from "../reducers";

const loggerMiddleware = createLogger();
export const store = legacy_createStore(
  combineReducers({
    alert,
    authentication,
    registration,
    post
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
