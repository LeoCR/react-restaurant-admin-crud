import {combineReducers} from "redux";
import ingredientsReducer from "./ingredientsReducer";
import strongsDishesReducer from "./strongsDishesReducer";
import entreesReducer from "./entreesReducer";
import dessertsReducer from "./dessertsReducer";
import drinksReducer from "./drinksReducer";
import invoicesReducer from "./invoicesReducer";
import modalsReducer from "./modalsReducer";
import ingredientByDishReducer from "./ingredientByDishReducer"
export default combineReducers({
    strongsDishes:strongsDishesReducer,
    entrees:entreesReducer,
    ingredients:ingredientsReducer,
    desserts:dessertsReducer,
    drinks:drinksReducer,
    invoices:invoicesReducer,
    modals:modalsReducer,
    ingredientsByDish:ingredientByDishReducer
});