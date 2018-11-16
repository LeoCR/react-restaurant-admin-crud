import strongsDishesReducer from "./strongsDishesReducer";
import entreesReducer from "./entreesReducer";
import {combineReducers} from "redux";
export default combineReducers({
    strongsDishes:strongsDishesReducer,
    entrees:entreesReducer
});