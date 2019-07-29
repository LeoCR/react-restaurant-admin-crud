import {SHOW_USERS,SHOW_USER,EDIT_USER,ADD_USER,DELETE_USER} from "../constants/userTypes";
import api from '../api/api';
export  const getUsers=()=>async dispatch=>{
    const response = await api.get('/api/users');
    dispatch({
        type:SHOW_USERS,
        payload:response.data
    })
}
export const addUser=user=>async dispatch=>{
    const response = await api.post('/api/user/add/',user);
    dispatch({
        type:ADD_USER,
        payload:response.data
    })
}
export const deleteUser =id=>async dispatch=>{
    await api.delete(`/api/user/delete/${id}`);
    dispatch({
        type:DELETE_USER,
        payload:id
    })
}
export const showUser=id=>async dispatch=>{
    const response=await api.get(`/api/user/show/${id}`);
    dispatch({
        type:SHOW_USER,
        payload:response.data
    })
}
export const editUser=user=>async dispatch=>{
    const response = await api.put(`/api/user/update/${user.id}`,user);
    dispatch({
        type:EDIT_USER,
        payload:response.data
    })
}