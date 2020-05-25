import { GET_INGREDIENTS_BY_DISH_ID,ADD_INGREDIENT_TO_DISH,UPDATE_INGREDIENT_TO_DISH,
    DELETE_INGREDIENT_TO_DISH,CLEAR_INGREDIENTS_BY_DISH} from "../constants/ingredientToDishTypes";
import ingredientByDishReducer from './ingredientByDishReducer';
describe('IngredientByDish Reducer', () => {
    const initialState={
        ingredientsByDish:[]
    }
    it('Handle IngredientByDishReducer initial state',()=>{
        expect( ingredientByDishReducer(undefined, {})).toEqual(initialState)
    })
    it('Handle GET_INGREDIENTS_BY_DISH_ID',()=>{
        var ingredientsByDish={
            "id_ingredient_dish":1,
            "id_ingredient":"5ING",
            "id_dish":"1BGD",
            "name":"Pasta Lasagna",
            "img":"/img/ingredients/pasta-lasagna.jpg"
        };
        const action = {
            type: GET_INGREDIENTS_BY_DISH_ID,
            payload:  ingredientsByDish
        }; 
        const expectedState = { ...initialState,ingredientsByDish: ingredientsByDish };
        expect(ingredientByDishReducer(initialState,action)).toEqual(expectedState)
    })
    it('Handle DELETE_INGREDIENT_TO_DISH',()=>{
        var tempState={
            ingredientsByDish:[
                {
                    id_ingredient_dish:1,
                    id_ingredient:"5ING",
                    id_dish:"1BGD",
                    name:"Pasta Lasagna",
                    img:"/img/ingredients/pasta-lasagna.jpg"
                },{
                    id_ingredient_dish:2,
                    id_ingredient:"8ING",
                    id_dish:"1BGD",
                    name:"Chicken",
                    img:"/img/ingredients/chicken.jpg"
                },{
                    id_ingredient_dish:3,
                    id_ingredient:"15ING",
                    id_dish:"1BGD",
                    name:"Cheese",
                    img:"/img/ingredients/cheese.jpg"
                },{
                    id_ingredient_dish:4,
                    id_ingredient:"20ING",
                    id_dish:"1BGD",
                    name:"Mushrooms",
                    img:"/img/ingredients/mushrooms.jpg"
                }
            ]
        };
        const action = {
            type: DELETE_INGREDIENT_TO_DISH,
            payload:4
        }; 
        const expectedState = {
            ingredientsByDish: [
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
                }
            ]
        };
        expect(ingredientByDishReducer(tempState,action)).toEqual(expectedState);
    })
    it('Handle ADD_INGREDIENT_TO_DISH',()=>{
        var newIngredientByDish={
            "id_ingredient_dish":1,
            "id_ingredient":"5ING",
            "id_dish":"1BGD",
            "name":"Pasta Lasagna",
            "img":"/img/ingredients/pasta-lasagna.jpg"
        };
        const action = {
            type: ADD_INGREDIENT_TO_DISH,
            payload:newIngredientByDish
        }; 
        const expectedState={
            ingredientsByDish:[newIngredientByDish]
        };
        expect(ingredientByDishReducer(initialState,action)).toEqual(expectedState);
    });
    it('Handle CLEAR_INGREDIENTS_BY_DISH',()=>{
        var tempState={
            ingredientsByDish:[
                {
                    id_ingredient_dish:1,
                    id_ingredient:"5ING",
                    id_dish:"1BGD",
                    name:"Pasta Lasagna",
                    img:"/img/ingredients/pasta-lasagna.jpg"
                },{
                    id_ingredient_dish:2,
                    id_ingredient:"8ING",
                    id_dish:"1BGD",
                    name:"Chicken",
                    img:"/img/ingredients/chicken.jpg"
                }
            ]
        };
        const action={
            type:CLEAR_INGREDIENTS_BY_DISH
        }
        const expectedState={
            ingredientsByDish:[]
        };
        expect(ingredientByDishReducer(tempState,action)).toEqual(expectedState);
    });
    it('Handle UPDATE_INGREDIENT_TO_DISH',()=>{
        var newIngredientByDish={
            "id_ingredient_dish":3,
            "id_ingredient":"5ING",
            "id_dish":"1BGD",
            "name":"Pasta Lasagna",
            "img":"/img/ingredients/pasta-lasagna.jpg"
        };
        var tempState={
            ingredientsByDish:[
                {
                    id_ingredient_dish:1,
                    id_ingredient:"15ING",
                    id_dish:"1BGD",
                    name:"Cheese",
                    img:"/img/ingredients/cheese.jpg"
                },{
                    id_ingredient_dish:2,
                    id_ingredient:"8ING",
                    id_dish:"1BGD",
                    name:"Chicken",
                    img:"/img/ingredients/chicken.jpg"
                }
            ]
        };
        const action={
            type:UPDATE_INGREDIENT_TO_DISH,
            payload:newIngredientByDish
        }
        const expectedState={
            ingredientsByDish:[
                {
                    id_ingredient_dish:1,
                    id_ingredient:"15ING",
                    id_dish:"1BGD",
                    name:"Cheese",
                    img:"/img/ingredients/cheese.jpg"
                },{
                    id_ingredient_dish:2,
                    id_ingredient:"8ING",
                    id_dish:"1BGD",
                    name:"Chicken",
                    img:"/img/ingredients/chicken.jpg"
                },
                newIngredientByDish
            ]
        };
        expect(ingredientByDishReducer(tempState,action)).toEqual(expectedState);
    })
});