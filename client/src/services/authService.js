import axios from '../axiosConfig'

// API LOGIN
export const apiLogin = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
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
export const apiLoginSuccess = (id) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/auth/login-success`,
            method: 'post',
            data: { id }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API REGISER
export const apiRegister = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/auth/register`,
            method: 'post',
            data,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
