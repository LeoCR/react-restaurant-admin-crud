import { GET_INGREDIENTS_BY_DISH_ID ,ADD_INGREDIENT_TO_DISH,
    DELETE_INGREDIENT_TO_DISH,UPDATE_INGREDIENT_TO_DISH,CLEAR_INGREDIENTS_BY_DISH} from "../constants/ingredientToDishTypes";
const initialState={
    ingredientsByDish:[]
}
export default function(state=initialState,action){
    switch (action.type) {
        case GET_INGREDIENTS_BY_DISH_ID:
            return{
                ...state,
                ingredientsByDish:action.payload
            }
        case DELETE_INGREDIENT_TO_DISH:
            return{
                ...state,
                ingredientsByDish: state.ingredientsByDish.filter(ing => ing.id_ingredient_dish !== action.payload)
            }
        case ADD_INGREDIENT_TO_DISH:
            return{
                ...state,
                ingredientsByDish:[
                    action.payload
                ]
            }
        case CLEAR_INGREDIENTS_BY_DISH:
            return{
                ...state,
                ingredientsByDish:[]
            }
        case UPDATE_INGREDIENT_TO_DISH:
            return{
                ...state,
                ingredientsByDish:[
                    ...state.ingredientsByDish,
                    action.payload
                ]
            }
        default:
            return state;
    }
}