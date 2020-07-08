import { GET_INGREDIENTS_BY_DISH_ID,ADD_INGREDIENT_TO_DISH,UPDATE_INGREDIENT_TO_DISH,
    DELETE_INGREDIENT_TO_DISH,CLEAR_INGREDIENTS_BY_DISH} from "../constants/ingredientToDishTypes";
import api from '../api/api';

export const clearIngredientsByDish = () => ({ type: CLEAR_INGREDIENTS_BY_DISH })
export const getIngredientsByDishId=(id)=>async dispatch=>{
        return await api.get('/api/ingredients/'+id)
        .then((res)=>{
            dispatch({
                type:GET_INGREDIENTS_BY_DISH_ID,
                payload:res.data
            })
        })
        .catch((err)=>{
            console.log('An error occurs in ingredientsByDishActions.getIngredientsByDishId');
            console.log(err);
        })
}
export const addIngredientToDish=(ingredient)=>{
    return{
        type:ADD_INGREDIENT_TO_DISH,
        payload:ingredient
    };
}
export const updateIngredientToDish=(ingredient)=>{
    return{
        type:UPDATE_INGREDIENT_TO_DISH,
        payload:ingredient
    };
}
export const deleteIngredientDish=(idIngredientDish)=>async dispatch=>{
    await api.delete('/api/ingredient-to-dish/delete/'+idIngredientDish)
    .then((res)=>{
        //console.log('Deleted Ingredient');
        //console.log(res);
        return res;
    })
    .catch((err)=>{
        console.log('An error occurs in deleteIngredientDish()');
        console.log(err);
    });
    dispatch({
        type:DELETE_INGREDIENT_TO_DISH,
        payload:idIngredientDish
    })
}
