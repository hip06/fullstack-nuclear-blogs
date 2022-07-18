import actionTypes from "../actions/actionTypes";
const initState = {
    currentLoggendIn: null,
    isLoggedIn: false,
    userData: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                currentLoggendIn: action.data,
                isLoggedIn: action.data?.err === 0 ? true : false
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentLoggendIn: null,
                isLoggedIn: false,
                userData: null
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