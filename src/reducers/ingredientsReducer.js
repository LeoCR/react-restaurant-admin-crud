import { EDIT_INGREDIENT,SHOW_INGREDIENTS, 
    DELETE_INGREDIENT,ADD_INGREDIENT,
    SHOW_INGREDIENT,GET_INGREDIENTS_BY_DISH_ID ,
    ADD_INGREDIENT_TO_DISH,DELETE_INGREDIENT_TO_DISH} from "../constants/ingredientTypes";
const initialState={
    ingredients:[]
}
export default function ingredientsReducer(state=initialState,action){
    switch (action.type) {
        case SHOW_INGREDIENTS:
            return{
                ...state,
                ingredients:action.payload
            }
        case GET_INGREDIENTS_BY_DISH_ID:
            return{
                ...state,
                ingredientsByDish:action.payload
            }
        case DELETE_INGREDIENT_TO_DISH:
            return{
                ...state,
                ingredientsByDish: state.ingredientsByDish.filter(ing => ing.idIngredientDish !== action.payload)
            }
        case ADD_INGREDIENT_TO_DISH:
            return{
                ...state,
                ingredientsByDish:[
                    ...state.ingredientsByDish,
                    action.ingredient
                ]
            }
        case DELETE_INGREDIENT:
        return{
            ...state,
            ingredients:state.ingredients.filter(ingredient=>ingredient!==action.payload)
        }
        case ADD_INGREDIENT:
            return{
                ...state,
                ingredients:[...state.ingredients,action.payload]
            }
        case SHOW_INGREDIENT:
            return {
                ...state,
                ingredient:action.payload
            }
        case EDIT_INGREDIENT:
            return{
                ...state,
                ingredients:state.ingredients.map(
                    ingredient=>ingredient.id===action.payload.id
                    ?(ingredient=action.payload)
                    :ingredient
                )
        }
        default:
            return state;
    }
}