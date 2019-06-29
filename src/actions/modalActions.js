import {SET_ADD_INGREDIENT,SET_DISH_ID, SET_DISH_INGREDIENT_ID} from '../constants/modalTypes';
export const setAddIngredient=()=>dispatch=>{
    dispatch({
        type:SET_ADD_INGREDIENT
    })
}
export const setDishId=(idDish)=>dispatch=>{
    dispatch({
        type:SET_DISH_ID,
        idDish
    })
}
export const setNextIdDishIngredient=(nextIdDishIngredient)=>dispatch=>{
    dispatch({
        type:SET_DISH_INGREDIENT_ID,
        nextIdDishIngredient
    })
}