import {SET_ADD_INGREDIENT ,SET_DISH_ID,SET_DISH_INGREDIENT_ID} from "../constants/modalTypes";
const initialState={
    modals:'addIngredient',
    idDish:'1BGD',
    nextIdDishIngredient:0
}
export default function modalsReducer(state=initialState,action){
    switch (action.type) {
        case SET_ADD_INGREDIENT:
            return{
                ...state,
                modals:'addIngredient'
            }
        case SET_DISH_ID:
            return{
                ...state,
                idDish:action.idDish
            } 
        case SET_DISH_INGREDIENT_ID:
            return{
                ...state,
                nextIdDishIngredient:action.nextIdDishIngredient
            }
        default:
            return {...state}
    }
}