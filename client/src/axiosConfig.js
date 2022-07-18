import axios from 'axios'
import headerRequest from "./services/headerRequest";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

export default instance