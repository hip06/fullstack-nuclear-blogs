import actionTypes from './actionTypes'
import { apiGetAllPost } from '../../services/postService'

export const getAllPost = () => async (dispatch) => {
    try {
        let response = await apiGetAllPost()
        if (response?.data?.err === 0) {
            dispatch({ type: actionTypes.GET_ALL_POST, data: response?.data.response })
        } else {
            dispatch({ type: actionTypes.GET_ALL_POST, data: [] })
        }
    } catch (error) {
        dispatch({ type: actionTypes.GET_ALL_POST, data: [] })
    }
}
export const detailPost = (data) => ({
    type: actionTypes.DETAIL_POST,
    data
})