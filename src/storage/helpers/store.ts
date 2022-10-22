import { createLogger } from 'redux-logger'
import {
    alert,
    authentication,
    registration,
    postReducer,
    userReducer
} from '../reducers'
import { configureStore } from '@reduxjs/toolkit'
// import { reducer as formReducer } from 'redux-form/immutable'

const loggerMiddleware = createLogger()
export const store = configureStore({
    reducer: {
        // form: formReducer,
        alert,
        authentication,
        registration,
        posts: postReducer.posts,
        users: userReducer.users
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
