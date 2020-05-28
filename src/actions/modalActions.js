import {SET_ADD_INGREDIENT,SET_DISH_ID, SET_DISH_INGREDIENT_ID} from '../constants/modalTypes';

export const setAddIngredient = () => ({ type: SET_ADD_INGREDIENT })
export const setDishId = idDish => ({ 
    type: SET_DISH_ID, 
    idDish 
})
export const setNextIdDishIngredient=(nextIdDishIngredient)=>({
    type:SET_DISH_INGREDIENT_ID,
    nextIdDishIngredient
})