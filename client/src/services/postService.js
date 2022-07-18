import axios from '../axiosConfig'

// API CREATE A POST
export const apiCreatePost = (body, token) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/post/create-post`,
            method: 'post',
            data: body,
            headers: { 'access-token': token }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// API GET ALL POST (PUBLIC)
export const apiGetAllPost = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/post/get-all-post`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API GET A POST (PUBLIC)
export const apiGetPost = (postId) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/post/get-one?postId=${postId}`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})