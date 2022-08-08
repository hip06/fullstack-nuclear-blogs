import axiosConfig from '../axios'

// API CREATE A COMMENT
export const apiCreateComment = (body) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/comment/create-one`,
            method: 'post',
            data: body,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API GET COMMENTS BY POSTID
export const apiGetCommentsByPostId = (postId) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/comment/get-all-by-postId?postId=${postId}`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE LIKE COMMENT
export const apiUpdateLikeComment = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/comment/update-like`,
            method: 'put',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE DISLIKE COMMENT
export const apiUpdateDislikeComment = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/comment/update-dislike`,
            method: 'put',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})