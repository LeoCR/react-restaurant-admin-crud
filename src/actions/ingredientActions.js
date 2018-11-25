import { SHOW_INGREDIENTS,DELETE_INGREDIENT,
    ADD_INGREDIENT,SHOW_INGREDIENT,EDIT_INGREDIENT
} from "../constants/ingredientTypes";
import axios from 'axios';
export  const getIngredients=()=>async dispatch=>{
    const response = await axios.get('http://www.isplusdesign.co.cr:49652/api/ingredients');
    dispatch({
        type:SHOW_INGREDIENTS,
        payload:response.data
    })
}
export const deleteIngredient =id=>async dispatch=>{
    await axios.delete(`http://www.isplusdesign.co.cr:49652/api/ingredient/delete/${id}`);
    dispatch({
        type:DELETE_INGREDIENT,
        payload:id
    })
}
export const showIngredient=id=>async dispatch=>{
    const response=await axios.get(`http://www.isplusdesign.co.cr:49652/api/ingredient/show/${id}`);
    dispatch({
        type:SHOW_INGREDIENT,
        payload:response.data
    })
}
export const addIngredient=dish=>async dispatch=>{
    const response = await axios.post('http://www.isplusdesign.co.cr:49652/api/ingredient/add/',dish);
    dispatch({
        type:ADD_INGREDIENT,
        payload:response.data
    })
}
export const editIngredient=dish=>async dispatch=>{
    const response = await axios.put(`http://www.isplusdesign.co.cr:49652/api/ingredient/update/${dish.idIngredient}`,dish);
    dispatch({
        type:EDIT_INGREDIENT,
        payload:response.data
    })
}