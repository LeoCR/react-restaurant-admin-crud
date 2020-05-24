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
    const response = await api.post('/api/entree/add/',entree);
    dispatch({
        type:ADD_ENTREE,
        payload:response.data
    })
}
export const editEntree=(entree,id)=>async dispatch=>{
    const response = await api.put(`/api/entree/update/${id}`,entree)
    .then((res)=>{
        console.log('Response entreeActions.editEntree()');
        //console.log(res);
        return res;
    })
    .catch((err)=>{
        console.log('An error occurs in entreeActions.editEntree');
        console.log(err);
    });
    dispatch({
        type:EDIT_ENTREE,
        payload:response.data
    })
}
export const updateEntree=(entree,id)=>async dispatch=>{
    const response = await api.put(`/api/entree/update-img/${id}`,entree,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{
        console.log('Response entreeActions.updateEntree()');
        console.log(res);
        return res;
    })
    .catch((err)=>{
        console.log('An error occurs in entreeActions.updateEntree');
        console.log(err);
    });
    dispatch({
        type:EDIT_ENTREE,
        payload:response.data
    })
}