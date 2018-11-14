import { SHOW_STRONGS_DISHES,DELETE_STRONG_DISH,ADD_STRONG_DISH} from "../constants/strongDishTypes"
import axios from 'axios';
export  const getStrongsDishes=()=>async dispatch=>{
    const response = await axios.get('http://www.isplusdesign.co.cr:49652/api/strongs-dish');
    dispatch({
        type:SHOW_STRONGS_DISHES,
        payload:response.data
    })
}
export const deleteStrongDish =id=>async dispatch=>{
    await axios.delete(`http://www.isplusdesign.co.cr:49652/api/strongs-dish/delete/${id}`);
    dispatch({
        type:DELETE_STRONG_DISH,
        payload:id
    })
}
export const addStrongDish=dish=>async dispatch=>{
    const response = await axios.post('http://www.isplusdesign.co.cr:49652/api/strong-dish/add/',dish);
    dispatch({
        type:ADD_STRONG_DISH,
        payload:response.data
    })
}
/*

export const showSTRONG_DISH=id=>async dispatch=>{
    const response=await axios.get(`http://www.isplusdesign.co.cr:49652/STRONG_DISHs/${id}`);
    dispatch({
        type:SHOW_STRONG_DISH,
        payload:response.data
    })
}
export const editSTRONG_DISH=STRONG_DISH=>async dispatch=>{
    const response = await axios.put(`http://www.isplusdesign.co.cr:49652/STRONG_DISHs/${STRONG_DISH.id}`,STRONG_DISH);
    dispatch({
        type:EDIT_STRONG_DISH,
        payload:response.data
    })
} */