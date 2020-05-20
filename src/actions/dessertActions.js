import { SHOW_DESSERTS,DELETE_DESSERT,ADD_DESSERT, SHOW_DESSERT,EDIT_DESSERT,UPDATE_DESSERT} from "../constants/dessertTypes";
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
export const editDessert=(dessert,id)=>async dispatch=>{
    try {
        const response = await api.put(`/api/dessert/update/${id}`,dessert)
        .then((res)=>{ 
            return res;
        })
        .catch((err)=>{
            console.log('An error occurs in dessertActions.editDessert catch(err)');
            console.log(err);
        }); 
        dispatch({
            type:EDIT_DESSERT,
            payload:response.data
        })
    } catch (error) {
        console.log('An error occurs in dessertActions.editDessert');
        console.log(error);
    }  
}
export const updateDessert=(dessert,id)=>async dispatch=>{
    try {
        const response = await api.put(`/api/dessert/update-img/${id}`,dessert)
        .then((res)=>{
            console.log('Response dessertActions.updateDessert() succesfull');
            console.log(res);
        })
        .catch((err)=>{
            console.log('An error occurs in dessertActions.updateDessert');
            console.log(err);
        });
        dispatch({
            type:UPDATE_DESSERT,
            payload:response.data
        })
    } catch (error) {
        console.log('An error occurs in dessertActions.updateDessert');
        console.log(error);
    }
}