import axiosConfig from '../axios'

// API CREATE A POST
export const apiCreatePost = (body) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/post/create-post`,
            method: 'post',
            data: body,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// API GET ALL POST (PUBLIC)
export const apiGetAllPost = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
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
        let response = await axiosConfig({
            url: `/api/post/get-one?postId=${postId}`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})