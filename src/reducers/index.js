import strongsDishesReducer from "./strongsDishesReducer"
import {combineReducers} from "redux";
export default combineReducers({
    strongsDishes:strongsDishesReducer
});