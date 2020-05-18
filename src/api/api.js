import axios from 'axios';
import https from 'https';
import {previewMode} from "../config/previewMode";
export default axios.create({
    baseURL:'https://localhost:49658',
    responseType: 'json' 
  })
if(previewMode){
  https.globalAgent.options.rejectUnauthorized = false;
}
