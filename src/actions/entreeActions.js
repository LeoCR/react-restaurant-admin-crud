import { SHOW_ENTREES,DELETE_ENTREE, ADD_ENTREE,SHOW_ENTREE,EDIT_ENTREE} from "../constants/entreeTypes";
import api from '../api/api';
export  const getEntrees=()=>async dispatch=>{
    const response = await api.get('/api/entrees');
    dispatch({
        type:SHOW_ENTREES,
        payload:response.data
    })
}
export const deleteEntree =id=>async dispatch=>{
    await api.delete(`/api/entree/delete/${id}`);
    dispatch({
        type:DELETE_ENTREE,
        payload:id
    })
}
export const showEntree=id=>async dispatch=>{
    const response=await api.get(`/api/entree/show/${id}`);
    dispatch({
        type:SHOW_ENTREE,
        payload:response.data
    })
}
export const addEntree=entree=>async dispatch=>{
    const response = await api.post('/api/entree/add/',entree,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    dispatch({
        type:ADD_ENTREE,
        payload:response.data
    })
}
export const editEntree=entree=>async dispatch=>{
    const response = await api.put(`/api/entree/update/${entree.id}`,entree);
    dispatch({
        type:EDIT_ENTREE,
        payload:response.data
    })
}
export const updateEntree=entree=>async dispatch=>{
    const response = await api.put(`/api/entree/update-img/${entree.id}`,entree,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    dispatch({
        type:EDIT_ENTREE,
        payload:response.data
    })
}