import { EDIT_DRINK,SHOW_DRINKS, 
    DELETE_DRINK,ADD_DRINK,
    SHOW_DRINK } from "../constants/drinkTypes";
const initialState={
    drinks:[]
}
export default function drinksReducer(state=initialState,action){
    switch (action.type) {
        case SHOW_DRINKS:
            return{
                ...state,
                drinks:action.payload
            }
        case DELETE_DRINK:
        return{
            ...state,
            drinks:state.drinks.filter(drink=>drink!==action.payload)
        }
        case ADD_DRINK:
            return{
                ...state,
                drinks:[...state.drinks,action.payload]
            }
        case SHOW_DRINK:
            return {
                ...state,
                drink:action.payload
            }
        case EDIT_DRINK:
            return{
                ...state,
                drinks:state.drinks.map(
                    drink=>drink.id===action.payload.id
                    ?(drink=action.payload)
                    :drink
                )
        }
        default:
            return state;
    }
}