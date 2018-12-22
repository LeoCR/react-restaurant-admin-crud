import { SHOW_DESSERTS,DELETE_DESSERT,
    ADD_DESSERT, SHOW_DESSERT,
    EDIT_DESSERT
} from "../constants/dessertTypes"
import axios from 'axios';
export  const getDesserts=()=>async dispatch=>{
    const response = await axios.get('http://localhost:49652/api/desserts');
    dispatch({
        type:SHOW_DESSERTS,
        payload:response.data
    })
}
export const deleteDessert =id=>async dispatch=>{
    await axios.delete(`http://localhost:49652/api/dessert/delete/${id}`);
    dispatch({
        type:DELETE_DESSERT,
        payload:id
    })
}
export const addDessert=dessert=>async dispatch=>{
    const response = await axios.post('http://localhost:49652/api/dessert/add/',dessert);
    dispatch({
        type:ADD_DESSERT,
        payload:response.data
    })
}
export const showDessert=id=>async dispatch=>{
    const response=await axios.get(`http://localhost:49652/api/dessert/show/${id}`);
    dispatch({
        type:SHOW_DESSERT,
        payload:response.data
    })
}

export const editDessert=dessert=>async dispatch=>{
    const response = await axios.put(`http://localhost:49652/api/dessert/update/${dessert.idDessert}`,dessert);
    dispatch({
        type:EDIT_DESSERT,
        payload:response.data
    })
}