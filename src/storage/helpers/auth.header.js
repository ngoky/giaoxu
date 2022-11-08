const LOGIN_KEY = 'users/loginUser'
const authHeader = () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem(LOGIN_KEY))
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token }
    } else {
        return {}
    }
}

const auth = () => {
    try {
        return JSON.parse(localStorage.getItem(LOGIN_KEY))
    } catch (_) {
        return null
    }
}

const saveAuthentication = (user) => {
    localStorage.setItem(LOGIN_KEY, user ? JSON.stringify(user) : null)
}

const parseUser = (state) => {
    const {
        users: { loginUser }
    } = state
    return loginUser?.id ? loginUser : null
}

export const userHelper = {
    authHeader,
    auth,
    saveAuthentication,
    parseUser
}
