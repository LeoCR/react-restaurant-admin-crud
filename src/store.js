import { createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
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
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware)/* ,
    window.devToolsExtension ? window.devToolsExtension() : '' */
));
export default store;