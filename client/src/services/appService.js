import axios from "../axiosConfig";

// API GET SPECIALIZATION
export const apiGetSpecialization = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/app/get-all-specialization`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API GET ROLE
export const apiGetRole = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/app/get-all-role`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// API GET ROLE
export const apiGetPosition = () => new Promise(async (resolve, reject) => {
    try {
        let response = await axios({
            url: `/api/app/get-all-position`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})