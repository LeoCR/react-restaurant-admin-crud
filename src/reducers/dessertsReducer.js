import { EDIT_DESSERT,SHOW_DESSERTS, 
    DELETE_DESSERT,ADD_DESSERT,
    SHOW_DESSERT } from "../constants/dessertTypes";
const initialState={
    desserts:[]
}
export default function dessertsReducer(state=initialState,action){
    switch (action.type) {
        case SHOW_DESSERTS:
            return{
                ...state,
                desserts:action.payload
            }
        case DELETE_DESSERT:
        return{
            ...state,
            desserts:state.desserts.filter(dessert=>dessert!==action.payload)
        }
        case ADD_DESSERT:
            return{
                ...state,
                desserts:[...state.desserts,action.payload]
            }
        case SHOW_DESSERT:
            return {
                ...state,
                dessert:action.payload
            }
        case EDIT_DESSERT:
            return{
                ...state,
                desserts:state.desserts.map(
                    dessert=>dessert.id===action.payload.id
                    ?(dessert=action.payload)
                    :dessert
                )
        }
        default:
            return state;
    }
}