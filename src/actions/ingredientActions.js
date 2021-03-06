import { SHOW_INGREDIENTS,DELETE_INGREDIENT, ADD_INGREDIENT,SHOW_INGREDIENT,EDIT_INGREDIENT} from "../constants/ingredientTypes";
import api from '../api/api';
export  const getIngredients=()=>async dispatch=>{
    const response = await api.get('/api/ingredients');
    dispatch({
        type:SHOW_INGREDIENTS,
        payload:response.data
    })
}
export const deleteIngredient =id=>async dispatch=>{
    await api.delete(`/api/ingredient/delete/${id}`);
    dispatch({
        type:DELETE_INGREDIENT,
        payload:id
    })
}
export const showIngredient=id=>async dispatch=>{
    const response=await api.get(`/api/ingredient/show/${id}`);
    dispatch({
        type:SHOW_INGREDIENT,
        payload:response.data
    })
}
export const addIngredient=ingredient=>async dispatch=>{
    const response = await api.post('/api/ingredient/add/',ingredient,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    dispatch({
        type:ADD_INGREDIENT,
        payload:response.data
    })
}
export const editIngredient=(ingredient,id)=>async dispatch=>{
    return await api.put('/api/ingredient/update/'+id,ingredient)
    .then((res)=>{
        dispatch({
            type:EDIT_INGREDIENT,
            payload:res.data
        })
    })
    .catch((err)=>{
        console.log('An error occurs in ingredientActions.editIngredient');
        console.log(err);
    });
    
}
export const updateIngredient=(ingredient,id)=>async dispatch=>{
    return await api.put('/api/ingredient/update-img/'+id,ingredient,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{
        dispatch({
            type:EDIT_INGREDIENT,
            payload:res.data
        })
    })
    .catch((err)=>{
        console.log('An error occurs in ingredientActions.updateIngredient');
        console.log(err);
    });
    
}