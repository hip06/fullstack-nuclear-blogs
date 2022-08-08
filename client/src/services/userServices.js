import axiosConfig from '../axios'


// API GET ONE
export const apiGetOne = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/user/get-one`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API GET ONE BY ID
export const apiGetOneById = (id) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/user/get-one-by-id?id=${id}`,
            method: 'get'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE
export const apiUpdateUser = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/user/update`,
            method: 'put',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API GET ALL USER
export const apiGetAllUser = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/user/get-all`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE BY ADMIN
export const apiUpdateUserByAdmin = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/user/update-by-admin`,
            method: 'put',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API UPDATE BY ADMIN
export const apiDeleteUser = (deletedId) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/user/delete?id=${deletedId}`,
            method: 'delete',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})