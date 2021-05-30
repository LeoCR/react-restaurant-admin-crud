import axios from 'axios';
import https from 'https';
import {previewMode} from "../config/previewMode";
export default axios.create({
    baseURL:'//localhost:49658',
    responseType: 'json',
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
}) 
if(previewMode){
  https.globalAgent.options.rejectUnauthorized = false;
} 