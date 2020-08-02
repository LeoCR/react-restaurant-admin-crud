import drinksReducer from "./drinksReducer";
import { SHOW_DRINKS,DELETE_DRINK,ADD_DRINK, SHOW_DRINK, EDIT_DRINK} from "../constants/drinkTypes"
describe('Drinks Reducer', () => {
    const initialState = {
      drinks: [],
      drink: null 
    };
    it('Handle drinksReducer initial state', () => {
        expect( drinksReducer(undefined, {})).toEqual(initialState)
    });
    it('Handle SHOW_DRINKS',()=>{ 
        const drinksList = [{
            "id":"1DRK",
            "name":"Coca Cola",
            "description":"Soft Drink",
            "picture":"/img/drinks/coca-cola.jpg",
            "price":"3.00"
        }];
        const action = {
          type: SHOW_DRINKS,
          payload: drinksList,
        };
        const expectedState = { ...initialState,drinks: drinksList };
        expect(drinksReducer(initialState,action)).toEqual(expectedState)
    })
    it('Handle DELETE_DRINK',()=>{
        const tempInitialState = {
          drinks: [
            {
                "id":"10DRK",
                "name":"Fresh of Oats",
                "description":"Fresh Natural of Oat with Milk or water",
                "picture":"/img/drinks/fresh-natural-of-oats.jpg",
                "price":"4.50"
            },{
                "id":"11DRK",
                "name":"Fresh of Chocolate",
                "description":"Fresh Natural of Chocolate with Milk",
                "picture":"/img/drinks/fresh-natural-of-chocolate.jpg",
                "price":"4.50"
            }
          ],
          drink: null 
        }; 
        const action = {
          type: DELETE_DRINK,
          payload:  "11DRK" 
        }; 
        const expectedState = { ...tempInitialState,drinks: [
            {
                "id":"10DRK",
                "name":"Fresh of Oats",
                "description":"Fresh Natural of Oat with Milk or water",
                "picture":"/img/drinks/fresh-natural-of-oats.jpg",
                "price":"4.50"
            }
        ] };
        expect(drinksReducer(tempInitialState,action)).toEqual(expectedState)
    });
    it('Handle ADD_DRINK',()=>{
        var newDrink={
          "id": "12DRK",
          "description": "National Beer Light",  
          "name": "Imperial Light", 
          "picture": "/img/uploads/imperial_light.jpg", 
          "price": "4.50"
        }; 
        const action = {
          type: ADD_DRINK,
          payload:  newDrink
        }; 
        const expectedState = { ...initialState,drinks: [newDrink] };
        expect(drinksReducer(initialState,action)).toEqual(expectedState)
    }); 
    it('Handle SHOW_DRINK',()=>{
        var drink={
          "id":"1DRK",
          "name":"Coca Cola",
          "description":"Soft Drink",
          "picture":"/img/drinks/coca-cola.jpg",
          "price":"3.00"
        };
        const action = {
          type: SHOW_DRINK,
          payload:  drink
        };
        const expectedState = { ...initialState,drink };
        expect(drinksReducer(initialState,action)).toEqual(expectedState)
    });
    it('Handle EDIT_DRINK',()=>{
        var tempInitialState={drinks:[
            {
                "id":"1DRK",
                "name":"Coca Cola",
                "description":"Soft Drink",
                "picture":"/img/drinks/coca-cola.jpg",
                "price":"3.00"
            },{
                "id":"2DRK",
                "name":"Coca Cola Light",
                "description":"Light Soft Drink",
                "picture":"/img/drinks/coca-cola-light.jpg",
                "price":"4.50"
            }
        ]};
        const action = {
          type: EDIT_DRINK,
          payload:  {
                "id":"2DRK",
                "name":"Coca Cola Zero",
                "description":"Light Soft Drink",
                "picture":"/img/drinks/coca-cola-zero.jpg",
                "price":"3.50"
            }
        };
        const expectedState = { ...tempInitialState,drinks: [
            {
                "id":"1DRK",
                "name":"Coca Cola",
                "description":"Soft Drink",
                "picture":"/img/drinks/coca-cola.jpg",
                "price":"3.00"
            },{
                "id":"2DRK",
                "name":"Coca Cola Zero",
                "description":"Light Soft Drink",
                "picture":"/img/drinks/coca-cola-zero.jpg",
                "price":"3.50"
            }
          ] 
        };
        expect(drinksReducer(tempInitialState,action)).toEqual(expectedState);
    })
});