import { SHOW_ENTREES,DELETE_ENTREE,
    ADD_ENTREE,SHOW_ENTREE,EDIT_ENTREE
} from "../constants/entreeTypes";
import axios from 'axios';
export  const getEntrees=()=>async dispatch=>{
    const response = await axios.get('http://localhost:49652/api/entrees');
    dispatch({
        type:SHOW_ENTREES,
        payload:response.data
    })
}
export const deleteEntree =id=>async dispatch=>{
    await axios.delete(`http://localhost:49652/api/entree/delete/${id}`);
    dispatch({
        type:DELETE_ENTREE,
        payload:id
    })
}
export const showEntree=id=>async dispatch=>{
    const response=await axios.get(`http://localhost:49652/api/entree/show/${id}`);
    dispatch({
        type:SHOW_ENTREE,
        payload:response.data
    })
}
export const addEntree=dish=>async dispatch=>{
    const response = await axios.post('http://localhost:49652/api/entree/add/',dish);
    dispatch({
        type:ADD_ENTREE,
        payload:response.data
    })
}
export const updateEntree=dish=>async dispatch=>{
    const response = await axios.put(`http://localhost:49652/api/entree/update/${dish.id}`,dish);
    dispatch({
        type:EDIT_ENTREE,
        payload:response.data
    })
}