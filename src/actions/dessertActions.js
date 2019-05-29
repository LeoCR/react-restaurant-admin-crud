import { SHOW_DESSERTS,DELETE_DESSERT,ADD_DESSERT, SHOW_DESSERT,EDIT_DESSERT} from "../constants/dessertTypes";
import api from '../api/api';
export  const getDesserts=()=>async dispatch=>{
    const response = await api.get('/api/desserts');
    dispatch({
        type:SHOW_DESSERTS,
        payload:response.data
    })
}
export const deleteDessert =id=>async dispatch=>{
    await api.delete(`/api/dessert/delete/${id}`);
    dispatch({
        type:DELETE_DESSERT,
        payload:id
    })
}
export const addDessert=dessert=>async dispatch=>{
    const response = await api.post('/api/dessert/add/',dessert,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    dispatch({
        type:ADD_DESSERT,
        payload:response.data
    })
}
export const showDessert=id=>async dispatch=>{
    const response=await api.get(`/api/dessert/show/${id}`);
    dispatch({
        type:SHOW_DESSERT,
        payload:response.data
    })
}

export const editDessert=dessert=>async dispatch=>{
    const response = await api.put(`/api/dessert/update/${dessert.id}`,dessert);
    dispatch({
        type:EDIT_DESSERT,
        payload:response.data
    })
}
export const updateDessert=dessert=>async dispatch=>{
    const response = await api.put(`/api/dessert/update-img/${dessert.id}`,dessert,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    console.log(response);
    dispatch({
        type:EDIT_DESSERT,
        payload:response.data
    })
}