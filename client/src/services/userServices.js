import axios from '../axiosConfig'


// API GET ONE
export const apiGetOne = (token) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/user/get-one`,
            method: 'get',
            headers: { 'access-token': token }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE
export const apiUpdateUser = (token, data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/user/update`,
            method: 'put',
            headers: { 'access-token': token },
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API GET ALL USER
export const apiGetAllUser = (token) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/user/get-all`,
            method: 'get',
            headers: { 'access-token': token },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE BY ADMIN
export const apiUpdateUserByAdmin = (token, data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/user/update-by-admin`,
            method: 'put',
            headers: { 'access-token': token },
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE BY ADMIN
export const apiDeleteUser = (token, deletedId) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/user/delete?id=${deletedId}`,
            method: 'delete',
            headers: { 'access-token': token },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})