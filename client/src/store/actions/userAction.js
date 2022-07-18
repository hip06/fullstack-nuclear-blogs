import actionTypes from './actionTypes'
import { apiGetOne } from '../../services/userServices'

export const getOne = (token) => {
    return async (dispatch) => {
        try {
            let response = await apiGetOne(token)
            if (response?.data?.err === 0) {
                dispatch({ type: actionTypes.GET_ONE, data: response?.data })
            } else {
                dispatch({ type: actionTypes.GET_ONE, data: null })
            }
        } catch (error) {
            dispatch({ type: actionTypes.GET_ONE, data: null })
        }
    }
}