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
// API LOGIN GOOGLE
export const apiLoginGoogle = (data) => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/auth/login-google`,
            method: 'post',
            data,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})