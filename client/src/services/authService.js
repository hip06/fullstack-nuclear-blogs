import axiosConfig from '../axios'

// API LOGIN
export const apiLogin = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/auth/login`,
            method: 'post',
            data,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API LOGIN SUCCESS
export const apiLoginSuccess = (payload) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/auth/login-success`,
            method: 'post',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API REGISER
export const apiRegister = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axiosConfig({
            url: `/api/auth/register`,
            method: 'post',
            data,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
