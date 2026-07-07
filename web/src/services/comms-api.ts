import axios from 'axios'

const commsApi = axios.create({
    baseURL: 'https://dummyjson.com'
})

export default commsApi