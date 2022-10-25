import { userReducer } from 'storage/reducers'
import { userConstants } from '../constants'
import { userHelper } from '../helpers'
import { userService } from '../services'
import { apiAction } from './api.actions'

export const userActions = {
    login,
    logout,
    // register,
    // getAll,
    // delete: _delete
}

function login(props) {
    const { data } = props
    console.log('call login', data)
    return (dispatch) => {
        dispatch(apiAction.processing())
        userService.login(data, dispatch).then(response => {
        console.log('userService login', response)
        userHelper.saveAuthentication(response)
        if (response) {
            // userHelper.saveAuthentication(data)
            dispatch(
                apiAction.success({
                    message: 'Login succesfully',
                    data: response,
                    variable: 'loginUser',
                    workspace: userReducer.userWorkSpace
                })
            )
            // userHelper.saveAuthentication(data)
        }
      })
      
      
        

        // const data = { username, password };
        // userService.login(data).then(
        //     ;(data) => {
        //         dispatch(
        //             apiAction.success({
        //                 message: 'Login succesfully',
        //                 data,
        //                 variable: 'loginUser',
        //                 workspace: userReducer.userWorkSpace
        //             })
        //         )
        //         userHelper.saveAuthentication(data)
        //         // dispatch(alertActions.success('Login successfully', true))
        //         // history.push("/");
        //     },
        //         (error) => {
        //             userHelper.saveAuthentication()
        //             dispatch(apiAction.failure(error.toString()))
        //             // dispatch(alertActions.error(error.toString(), true))
        //         }
        // )
    }
}

function logout() {
    userHelper.saveAuthentication()
    return { type: userConstants.LOGOUT, workspace: userReducer.userWorkSpace }
}

// function register(user) {
//     return (dispatch) => {
//         dispatch(request(user))

//         userService.register(user).then(
//             (user) => {
//                 dispatch(success())
//                 // history.push("/login");
//                 dispatch(alertActions.success('Registration successful'))
//             },
//             (error) => {
//                 dispatch(failure(error.toString()))
//                 dispatch(alertActions.error(error.toString()))
//             }
//         )
//     }

//     function request(user) {
//         return { type: userConstants.REGISTER_REQUEST, user }
//     }
//     function success(user) {
//         return { type: userConstants.REGISTER_SUCCESS, user }
//     }
//     function failure(error) {
//         return { type: userConstants.REGISTER_FAILURE, error }
//     }
// }

// function getAll() {
//     return (dispatch) => {
//         dispatch(request())

//         userService.getAll().then(
//             (users) => dispatch(success(users)),
//             (error) => dispatch(failure(error.toString()))
//         )
//     }

//     function request() {
//         return { type: userConstants.GETALL_REQUEST }
//     }
//     function success(users) {
//         return { type: userConstants.GETALL_SUCCESS, users }
//     }
//     function failure(error) {
//         return { type: userConstants.GETALL_FAILURE, error }
//     }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return (dispatch) => {
//         dispatch(request(id))

//         userService.delete(id).then(
//             (user) => dispatch(success(id)),
//             (error) => dispatch(failure(id, error.toString()))
//         )
//     }

//     function request(id) {
//         return { type: userConstants.DELETE_REQUEST, id }
//     }
//     function success(id) {
//         return { type: userConstants.DELETE_SUCCESS, id }
//     }
//     function failure(id, error) {
//         return { type: userConstants.DELETE_FAILURE, id, error }
//     }
// }
