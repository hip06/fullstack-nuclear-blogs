import actionTypes from './actionTypes'
import { apiLogin, apiLoginSuccess } from '../../services/authService'

export const login = (dataLogin) => {
    return async (dispatch) => {
        try {
            let response = await apiLogin(dataLogin)
            dispatch({ type: actionTypes.LOGIN, data: response?.data })
        } catch (error) {
            dispatch({ type: actionTypes.LOGIN, data: null })
        }
    }
}
export const loginSuccess = (userId) => {
    return async (dispatch) => {
        try {
            let response = await apiLoginSuccess(userId)
            dispatch({ type: actionTypes.LOGIN_SUCCESS, data: response?.data })
        } catch (error) {
            dispatch({ type: actionTypes.LOGIN_SUCCESS, data: null })
        }
    }
}
export const logout = () => ({
    type: actionTypes.LOGOUT
})