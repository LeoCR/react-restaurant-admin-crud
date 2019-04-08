import { createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const initialState = {
    strongsDishes:[],
    entrees:[],
    ingredients:[],
    desserts:[],
    drinks:[]
};
const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
));
export default store;