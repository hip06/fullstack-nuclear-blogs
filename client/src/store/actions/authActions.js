import actionTypes from './actionTypes'
import { apiLogin, apiLoginGoogle } from '../../services/authService'

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
export const loginGoogle = (dataLogin) => {
    return async (dispatch) => {
        try {
            let response = await apiLoginGoogle(dataLogin)
            dispatch({ type: actionTypes.LOGIN, data: response?.data })
        } catch (error) {
            dispatch({ type: actionTypes.LOGIN, data: null })
        }
    }
}
export const logout = () => ({
    type: actionTypes.LOGOUT
})