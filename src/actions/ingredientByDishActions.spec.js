//import api for read values from database
import api from '../api/api';
//import custom constants
import { GET_INGREDIENTS_BY_DISH_ID,ADD_INGREDIENT_TO_DISH,UPDATE_INGREDIENT_TO_DISH, DELETE_INGREDIENT_TO_DISH,CLEAR_INGREDIENTS_BY_DISH} from "../constants/ingredientToDishTypes";
//import custom actions
import {clearIngredientsByDish,addIngredientToDish,deleteIngredientDish,getIngredientsByDishId,updateIngredientToDish} from "./ingredientByDishActions";
// import configureStore to create a mock store where we will dispatch our actions
import configureStore from 'redux-mock-store';
//import thunk middle to make our action asyncronous
import thunk from 'redux-thunk'; 
//import previewMode for making test in localhost API
import {previewMode} from "../config/previewMode";
// initialize mockStore which is only the configureStore method which take middleware as its parameters
const mockStore = configureStore([thunk]);
//creating a store with mockStore and redux-thunk as middleware
const store = mockStore({});
//initialize temporal variable for saving all the drinks
var tempIngredient;
//function for setting the drinks from database
async function setIngredients(){
    await api.get('/api/ingredients').then((res)=>{
        tempIngredient=res.data
    })
}  
describe('IngredientByDish Actions', () => { 
    beforeEach(() => {
        setIngredients(); 
        store.clearActions();
    });
    it('Handle action CLEAR_INGREDIENTS_BY_DISH',()=>{
        let expectedActions ={type:CLEAR_INGREDIENTS_BY_DISH};
        expect(clearIngredientsByDish()).toEqual(expectedActions); 
    }) 
    it('Handle action GET_INGREDIENTS_BY_DISH_ID',(done)=>{
        if(previewMode){
            store.dispatch(getIngredientsByDishId('1BGD')).then(() => {
                let expectedActions = [{
                    type:GET_INGREDIENTS_BY_DISH_ID,
                    payload:[{
                        "id_ingredient_dish":1,
                        "id_ingredient":"5ING",
                        "id_dish":"1BGD",
                        "name":"Pasta Lasagna",
                        "img":"/img/ingredients/pasta-lasagna.jpg"
                    },{
                        "id_ingredient_dish":2,
                        "id_ingredient":"8ING",
                        "id_dish":"1BGD",
                        "name":"Chicken",
                        "img":"/img/ingredients/chicken.jpg"
                    },{
                        "id_ingredient_dish":3,
                        "id_ingredient":"15ING",
                        "id_dish":"1BGD",
                        "name":"Cheese",
                        "img":"/img/ingredients/cheese.jpg"
                    },{
                        "id_ingredient_dish":4,
                        "id_ingredient":"20ING",
                        "id_dish":"1BGD",
                        "name":"Mushrooms",
                        "img":"/img/ingredients/mushrooms.jpg"
                    }]
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        }
        else{
            done();
        } 
    })
    it('Handle action ADD_INGREDIENT_TO_DISH',(done)=>{
        if(previewMode){
            var ingredientSelected={
                id_ingredient_dish:66,
                id_ingredient:'11ING',
                id_dish:'3BGD',
                name:'Filet Mignon',
                img:'/img/ingredients/filet-mignon.jpg'
            }; 
            var expectedActions={
                type:ADD_INGREDIENT_TO_DISH,
                payload:ingredientSelected
            };
            var ingredientsByDish=[
                {
                    "id_ingredient_dish":1,
                    "id_ingredient":"5ING",
                    "id_dish":"1BGD",
                    "name":"Pasta Lasagna",
                    "img":"/img/ingredients/pasta-lasagna.jpg"
                },{
                    "id_ingredient_dish":2,
                    "id_ingredient":"8ING",
                    "id_dish":"1BGD",
                    "name":"Chicken",
                    "img":"/img/ingredients/chicken.jpg"
                },{
                    "id_ingredient_dish":3,
                    "id_ingredient":"15ING",
                    "id_dish":"1BGD",
                    "name":"Cheese",
                    "img":"/img/ingredients/cheese.jpg"
                },{
                    "id_ingredient_dish":4,
                    "id_ingredient":"20ING",
                    "id_dish":"1BGD",
                    "name":"Mushrooms",
                    "img":"/img/ingredients/mushrooms.jpg"
                }
            ];
            ingredientsByDish.push(ingredientSelected)
            ingredientsByDish.forEach(function(ing) {
                api.post('/api/ingredient-to-dish/add/',ing)
                .then((res)=>{
                    //console.log(res); 
                    return res;
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
            expect(addIngredientToDish(ingredientSelected)).toEqual(expectedActions);
            done();
        }
        else{
            done()
        }
    });
    it('Handle action UPDATE_INGREDIENT_TO_DISH',()=>{
        var ingredientSelected={
            id_ingredient_dish:66,
            id_ingredient:'11ING',
            id_dish:'3BGD',
            name:'Filet Mignon',
            img:'/img/ingredients/filet-mignon.jpg'
        }; 
        var expectedActions={
            type:UPDATE_INGREDIENT_TO_DISH,
            payload:ingredientSelected
        };
        expect(updateIngredientToDish(ingredientSelected)).toEqual(expectedActions);
    });
    it('Handle action DELETE_INGREDIENT_TO_DISH',(done)=>{
        if(previewMode){
            store.dispatch(deleteIngredientDish(66)).then(() => {
                let expectedActions = [{
                    type:DELETE_INGREDIENT_TO_DISH,
                    payload:66
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        }
        else{
            done();
        } 
    });
});