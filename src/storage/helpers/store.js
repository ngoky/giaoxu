import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import {
    alert,
    authentication,
    registration,
    postReducer,
    userReducer,
    newsTypeReducer
} from '../reducers'

const loggerMiddleware = createLogger();
export const store = legacy_createStore(
    combineReducers({
        // form: formReducer,
        alert,
        authentication,
        registration,
        posts: postReducer.posts,
        users: userReducer.users,
        newsType: newsTypeReducer.newsTypes,
    }),
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)
