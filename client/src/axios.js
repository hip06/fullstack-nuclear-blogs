import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})


instance.interceptors.request.use(async (config) => {
    let token = window.localStorage.getItem('token')
    if (token) {
        config.headers['access-token'] = token
    }
    return config
})



export default instance