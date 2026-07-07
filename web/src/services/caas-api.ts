import axios from 'axios'

const caasApi = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
})

export default caasApi