import { 
    SHOW_ENTREES, DELETE_ENTREE,
    ADD_ENTREE,
    SHOW_ENTREE ,EDIT_ENTREE} from "../constants/entreeTypes";
const initialState={
    entrees:[],
    entree:null
}
export default function entreesReducer(state=initialState,action){
    switch (action.type) {
        case SHOW_ENTREES:
            return{
                ...state,
                entrees:action.payload
            }
        case DELETE_ENTREE:
        return{
            ...state,
            entrees:state.entrees.filter(entree=>entree.id!==action.payload)
        }
        case ADD_ENTREE:
            return{
                ...state,
                entrees:[...state.entrees,action.payload]
            }
        case SHOW_ENTREE:
            return {
                ...state,
                entree:action.payload
            }
        case EDIT_ENTREE:
            return{
                ...state,
                entrees:state.entrees.map(
                    entree=>entree.id===action.payload.id
                    ?(entree=action.payload)
                    :entree
                )
        }
        default:
            return state;
    }
}