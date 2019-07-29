import { SHOW_USERS,SHOW_USER,EDIT_USER,DELETE_USER } from "../constants/userTypes";
const initialState={
    users:[]
}
export default function usersReducer(state=initialState,action){
    switch (action.type) {
        case SHOW_USERS:
            return{
                ...state,
                users:action.payload
            }
        case SHOW_USER:
            return{
                ...state,
                user:action.payload
            }
        case DELETE_USER:
            return{
                ...state,
                users:state.users.filter(user=>user!==action.payload)
            }
        case EDIT_USER:
            return{
                    ...state,
                    users:state.users.map(
                        user=>user.id===action.payload.id
                        ?(user=action.payload)
                        :user
                    )
            }
        default:
            return state;
    }
}