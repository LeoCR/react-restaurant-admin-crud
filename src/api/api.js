import axios from 'axios';
export default axios.create({
    baseURL:'https://localhost:49652',
    responseType: 'json'
})