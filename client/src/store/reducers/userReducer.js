import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    isLoggedIn: false,
    userData: null,
    token: null,
    isTryLogin: false,
    userIdParam: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                token: action.data?.token || null,
                isLoggedIn: action.data?.err === 0 ? true : false,
                msg: action.data?.msg,
                isTryLogin: !state.isTryLogin
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.data?.token || null,
                isLoggedIn: true,
                isTryLogin: !state.isTryLogin,
                msg: ''
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                isLoggedIn: false,
                userData: null,
                msg: ''
            }
        case actionTypes.GET_ONE:
            return {
                ...state,
                userData: action.data?.response,
            }

        default:
            return state;
    }
}

export default userReducer