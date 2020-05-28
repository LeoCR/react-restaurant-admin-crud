import {SET_ADD_INGREDIENT,SET_DISH_ID, SET_DISH_INGREDIENT_ID} from '../constants/modalTypes';
import {setAddIngredient,setDishId,setNextIdDishIngredient} from './modalActions'; 
describe('Modal Actions',()=>{
    it('Handle SET_ADD_INGREDIENT',()=>{
        var expectedActions={
            type:SET_ADD_INGREDIENT
        }; 
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