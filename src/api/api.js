import axios from 'axios';
import https from 'https';
export default axios.create({
    baseURL:'https://localhost:49658',
    responseType: 'json' 
  })
https.globalAgent.options.rejectUnauthorized = false;