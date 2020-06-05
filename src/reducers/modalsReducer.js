import {SET_ADD_INGREDIENT ,SET_DISH_ID,SET_DISH_INGREDIENT_ID,SET_DELETE_PRODUCT} from "../constants/modalTypes";
const initialState={
    modals:'addIngredient',
    idDish:'1BGD',
    nextIdDishIngredient:0,
    productType:"Main Course",
    idToDelete:'NONE'
}
export default function modalsReducer(state=initialState,action){
    switch (action.type) {
        case SET_ADD_INGREDIENT:
            return{
                ...state,
                modals:'addIngredient'
            }
        case SET_DELETE_PRODUCT:
            return{
                ...state,
                modals:'delete',
                idToDelete:action.idToDelete,
                productType:action.productType
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