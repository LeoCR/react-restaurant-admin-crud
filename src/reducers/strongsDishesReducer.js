import { SHOW_STRONGS_DISHES, DELETE_STRONG_DISH,ADD_STRONG_DISH } from "../constants/strongDishTypes";
const initialState={
    strongsDishes:[]
}
export default function strongsDishesReducer(state=initialState,action){
    switch (action.type) {
        case SHOW_STRONGS_DISHES:
            return{
                ...state,
                strongsDishes:action.payload
            }
        case DELETE_STRONG_DISH:
        return{
            ...state,
            strongsDishes:state.strongsDishes.filter(strongDish=>strongDish!==action.payload)
        }
        case ADD_STRONG_DISH:
            return{
                ...state,
                strongsDishes:[...state.strongsDishes,action.payload]
            }
        default:
            return state;
    }
}