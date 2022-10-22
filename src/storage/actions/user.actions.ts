import { userReducer } from '../reducers'
import { userConstants } from '../constants'
import { AppDispatch, userHelper } from '../helpers'
import { userService } from '../services'
import { alertActions, apiAction } from '../actions'

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
}

function login(data?: any) {
    console.log('call login')
    return (dispatch: AppDispatch) => {
        dispatch(apiAction.processing({}))
        // const data = { username, password };
        userService.login({ data }).then(
            (data) => {
                dispatch(
                    apiAction.success({
                        message: 'Login succesfully',
                        data,
                        variable: 'loginUser',
                        workspace: userReducer.userWorkSpace
                    })
                )
                userHelper.saveAuthentication(data)
                dispatch(alertActions.success('Login successfully', true))
                // history.push("/");
            },
            (error) => {
                userHelper.saveAuthentication()
                dispatch(apiAction.failure(error.toString()))
                dispatch(alertActions.error(error.toString(), true))
            }
        )
    }
}

function logout() {
    userHelper.saveAuthentication()
    return { type: userConstants.LOGOUT, workspace: userReducer.userWorkSpace }
}

function register(user: any) {
    return (dispatch: AppDispatch) => {
        dispatch(request(user))

        // userService.register(user).then(
        //     (user) => {
        //         dispatch(success())
        //         // history.push("/login");
        //         dispatch(alertActions.success('Registration successful'))
        //     },
        //     (error) => {
        //         dispatch(failure(error.toString()))
        //         dispatch(alertActions.error(error.toString()))
        //     }
        // )
    }

    function request(user: any) {
        return { type: userConstants.REGISTER_REQUEST, user }
    }
    // function success(user) {
    //     return { type: userConstants.REGISTER_SUCCESS, user }
    // }
    // function failure(error) {
    //     return { type: userConstants.REGISTER_FAILURE, error }
    // }
}

function getAll() {
    return (dispatch: AppDispatch) => {
        dispatch(request())

        // userService.getAll().then(
        //     (users) => dispatch(success(users)),
        //     (error) => dispatch(failure(error.toString()))
        // )
    }

    function request() {
        return { type: userConstants.GETALL_REQUEST }
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: any) {
    return (dispatch: AppDispatch) => {
        dispatch(request(id))

        // userService.delete(id).then(
        //     (user) => dispatch(success(id)),
        //     (error) => dispatch(failure(id, error.toString()))
        // )
    }

    function request(id: any) {
        return { type: userConstants.DELETE_REQUEST, id }
    }
}
