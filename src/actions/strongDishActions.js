import { SHOW_STRONGS_DISHES,DELETE_STRONG_DISH,
    ADD_STRONG_DISH, SHOW_STRONG_DISH,
    EDIT_STRONG_DISH
} from "../constants/strongDishTypes"
import axios from 'axios';
export  const getStrongsDishes=()=>async dispatch=>{
    const response = await axios.get('http://localhost:49652/api/strongs-dishes');
    dispatch({
        type:SHOW_STRONGS_DISHES,
        payload:response.data
    })
}
export const deleteStrongDish =id=>async dispatch=>{
    await axios.delete(`http://localhost:49652/api/strongs-dish/delete/${id}`);
    dispatch({
        type:DELETE_STRONG_DISH,
        payload:id
    })
}
export const addStrongDish=dish=>async dispatch=>{
    const response = await axios.post('http://localhost:49652/api/strong-dish/add/',dish);
    dispatch({
        type:ADD_STRONG_DISH,
        payload:response.data
    })
}
export const showStrongDish=id=>async dispatch=>{
    const response=await axios.get(`http://localhost:49652/api/strong-dish/show/${id}`);
    dispatch({
        type:SHOW_STRONG_DISH,
        payload:response.data
    })
}

export const editStrongDish=dish=>async dispatch=>{
    const response = await axios.put(`http://localhost:49652/api/strong-dish/update/${dish.id}`,dish);
    dispatch({
        type:EDIT_STRONG_DISH,
        payload:response.data
    })
}