const LOGIN_KEY = 'userLogin'
const authHeader = () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem(LOGIN_KEY) || '')
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token }
    } else {
        return {}
    }
}

const auth = () => {
    try {
        let user = JSON.parse(localStorage.getItem(LOGIN_KEY) || '')
        // console.log("auth auth.header", user);
        return user
    } catch (_) {
        // console.log("auth auth.header error", error);
        return null
    }
}

const saveAuthentication = (user?: any) => {
    localStorage.setItem(LOGIN_KEY, user ? JSON.stringify(user) : '')
}

const parseUser = (state: any) => {
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
