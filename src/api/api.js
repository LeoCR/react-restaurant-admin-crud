import axios from 'axios';
export default axios.create({
    baseURL:'https://localhost:49658',
    responseType: 'json'
})