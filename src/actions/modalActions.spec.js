import {SET_ADD_INGREDIENT,SET_DISH_ID, SET_DISH_INGREDIENT_ID} from '../constants/modalTypes';
import {setAddIngredient,setDishId,setNextIdDishIngredient} from './modalActions';
// import configureStore to create a mock store where we will dispatch our actions
import configureStore from 'redux-mock-store';
//import thunk middle to make our action asyncronous
import thunk from 'redux-thunk';  
// initialize mockStore which is only the configureStore method which take middleware as its parameters
const mockStore = configureStore([thunk]);
//creating a store with mockStore and redux-thunk as middleware
const store = mockStore({});
describe('Modal Actions',()=>{
    beforeEach(() => {  
        store.clearActions();
    });
    it('Handle SET_ADD_INGREDIENT',()=>{
        var expectedActions={
            type:SET_ADD_INGREDIENT
        };
        store.dispatch(setAddIngredient());
        expect(setAddIngredient()).toEqual(expectedActions); 
    });
    it('Handle SET_DISH_ID',()=>{
        var newDishID='8ADDEDDESRT_SDFASD';
        let expectedActions={
            type:SET_DISH_ID,
            idDish:newDishID
        }
        expect(setDishId(newDishID)).toEqual(expectedActions); 
    });
    it('Handle SET_DISH_INGREDIENT_ID',()=>{
        var newDishIngredientId=68;
        let expectedActions={
            type:SET_DISH_INGREDIENT_ID,
            nextIdDishIngredient:newDishIngredientId
        }
        expect(setNextIdDishIngredient(newDishIngredientId)).toEqual(expectedActions); 
    });
});