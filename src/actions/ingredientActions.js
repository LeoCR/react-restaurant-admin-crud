import { SHOW_INGREDIENTS,DELETE_INGREDIENT, ADD_INGREDIENT,SHOW_INGREDIENT,EDIT_INGREDIENT,GET_INGREDIENTS_BY_DISH_ID,ADD_INGREDIENT_TO_DISH,DELETE_INGREDIENT_TO_DISH} from "../constants/ingredientTypes";
import api from '../api/api';
export  const getIngredients=()=>async dispatch=>{
    const response = await api.get('/api/ingredients');
    dispatch({
        type:SHOW_INGREDIENTS,
        payload:response.data
    })
}
export  const getIngredientsByDishId=(id)=>async dispatch=>{
    const response = await api.get(`/api/ingredients/${id}`);
    dispatch({
        type:GET_INGREDIENTS_BY_DISH_ID,
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
export const editIngredient=ingredient=>async dispatch=>{
    const response = await api.put(`/api/ingredient/update/${ingredient.id}`,ingredient);
    dispatch({
        type:EDIT_INGREDIENT,
        payload:response.data
    })
}
export const addIngredientToDish=ingredient=>dispatch=>{
    dispatch({
        type:ADD_INGREDIENT_TO_DISH,
        ingredient
    })
}
export const deleteIngredientDish=(idIngredientDish)=>async dispatch=>{
    await api.delete(`/api/ingredient-to-dish/delete/${idIngredientDish}`);
    dispatch({
        type:DELETE_INGREDIENT_TO_DISH,
        payload:idIngredientDish
    })
}
export const updateIngredient=ingredient=>async dispatch=>{
    const response = await api.put(`/api/ingredient/update-img/${ingredient.id}`,ingredient,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    dispatch({
        type:EDIT_INGREDIENT,
        payload:response.data
    })
}