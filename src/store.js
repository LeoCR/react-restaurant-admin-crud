import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [thunk];
const initialState = {
    strongsDishes:[],
    entrees:[],
    ingredients:[],
    desserts:[],
    drinks:[],
    invoices:[],
    ingredientsByDish:[],
    users:[]
};
const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware)
));
export default store;