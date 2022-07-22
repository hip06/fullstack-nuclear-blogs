import axios from '../axiosConfig'

// API CREATE A COMMENT
export const apiCreateComment = (body, token) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/comment/create-one`,
            method: 'post',
            data: body,
            headers: { 'access-token': token }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API GET COMMENTS BY POSTID
export const apiGetCommentsByPostId = (postId) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/comment/get-all-by-postId?postId=${postId}`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE LIKE COMMENT
export const apiUpdateLikeComment = (data, token) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/comment/update-like`,
            method: 'put',
            headers: { 'access-token': token },
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE DISLIKE COMMENT
export const apiUpdateDislikeComment = (data, token) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/comment/update-dislike`,
            method: 'put',
            headers: { 'access-token': token },
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})