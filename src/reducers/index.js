import ingredientsReducer from "./ingredientsReducer";
import strongsDishesReducer from "./strongsDishesReducer";
import entreesReducer from "./entreesReducer";
import dessertsReducer from "./dessertsReducer";
import drinksReducer from "./drinksReducer";
import invoicesReducer from "./invoicesReducer"
import {combineReducers} from "redux";
export default combineReducers({
    strongsDishes:strongsDishesReducer,
    entrees:entreesReducer,
    ingredients:ingredientsReducer,
    desserts:dessertsReducer,
    drinks:drinksReducer,
    invoices:invoicesReducer
});