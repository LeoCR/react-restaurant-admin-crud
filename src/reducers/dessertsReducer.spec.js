import dessertsReducer from "./dessertsReducer";
import { SHOW_DESSERTS,DELETE_DESSERT,ADD_DESSERT,SHOW_DESSERT,EDIT_DESSERT} from "../constants/dessertTypes";
describe('Desserts Reducer', () => {
    const initialState = {
      desserts: [],
      dessert: null 
    };
    it('Handle dessertsReducer initial state', () => {
      expect(
        dessertsReducer(undefined, {})
      ).toEqual({
        desserts:[],
        dessert:null
      })
    });
    it('Handle SHOW_DESSERTS',()=>{ 
      const dessertsList = [{
        "id": "9DESRT",
        "description": "Sweet apples with cinnamon and sweet cream",  
        "name": "Apple Pie", 
        "picture": "/img/uploads/apple_pie.jpg", 
        "price": "5.50"
      }];
      const action = {
        type: SHOW_DESSERTS,
        payload: dessertsList,
      };
      const expectedState = { ...initialState,desserts: dessertsList };
      expect(dessertsReducer(initialState,action)).toEqual(expectedState)
    }) 
    it('Handle DELETE_DESSERT',()=>{
      const tempInitialState = {
        desserts: [
          {
            "id":"1DESRT",
            "name":"Rice with Milk with cinnamon",
            "description":"Sweet rice with cinnamon and sweet cream",
            "picture":"/img/desserts/rice-with-milk.jpg",
            "price":"5.50"
          },
          {
            "id": "9DESRT",
            "description": "Sweet apples with cinnamon and sweet cream",  
            "name": "Apple Pie", 
            "picture": "/img/uploads/apple_pie.jpg", 
            "price": "5.50"
          }
        ],
        dessert: null 
      }; 
      const action = {
        type: DELETE_DESSERT,
        payload:  "9DESRT" 
      }; 
      const expectedState = { ...tempInitialState,desserts: [
        {
          "id":"1DESRT",
          "name":"Rice with Milk with cinnamon",
          "description":"Sweet rice with cinnamon and sweet cream",
          "picture":"/img/desserts/rice-with-milk.jpg",
          "price":"5.50"
        }
      ] };
      expect(dessertsReducer(tempInitialState,action)).toEqual(expectedState)
    })
    it('Handle ADD_DESSERT',()=>{
      var newDessert={
        "id": "9DESRT",
        "description": "Sweet apples with cinnamon and sweet cream",  
        "name": "Apple Pie", 
        "picture": "/img/uploads/apple_pie.jpg", 
        "price": "5.50"
      }; 
      const action = {
        type: ADD_DESSERT,
        payload:  newDessert
      }; 
      const expectedState = { ...initialState,desserts: [newDessert] };
      expect(dessertsReducer(initialState,action)).toEqual(expectedState)
    })
    it('Handle SHOW_DESSERT',()=>{
        var dessert={
          "id":"1DESRT",
          "name":"Rice with Milk with cinnamon",
          "description":"Sweet rice with cinnamon and sweet cream",
          "picture":"/img/desserts/rice-with-milk.jpg",
          "price":"5.50"
        };
        const action = {
          type: SHOW_DESSERT,
          payload:  dessert
        };
        const expectedState = { ...initialState,dessert: dessert };
        expect(dessertsReducer(initialState,action)).toEqual(expectedState)
    });
    it('Handle EDIT_DESSERT',()=>{
        var tempInitialState={desserts:[
          {
            "id":"1DESRT",
            "name":"Rice with Milk with cinnamon",
            "description":"Sweet rice with cinnamon and sweet cream",
            "picture":"/img/desserts/rice-with-milk.jpg",
            "price":"5.50"
          },{
            "id":"2DESRT",
            "name":"Choco Strawberries",
            "description":"Strawberries covered with Chocolate",
            "picture":"/img/desserts/choco-strawberries.jpg",
            "price":"7.50"
          }
        ]};
        const action = {
          type: EDIT_DESSERT,
          payload:  {
            "id":"1DESRT",
            "name":"Rice with Milk with cinnamon",
            "description":"Sweet rice with cinnamon",
            "picture":"/img/desserts/rice-with-milk.jpg",
            "price":"7.50"
          }
        };
        const expectedState = { ...tempInitialState,desserts: [
            {
              "id":"1DESRT",
              "name":"Rice with Milk with cinnamon",
              "description":"Sweet rice with cinnamon",
              "picture":"/img/desserts/rice-with-milk.jpg",
              "price":"7.50"
            },{
              "id":"2DESRT",
              "name":"Choco Strawberries",
              "description":"Strawberries covered with Chocolate",
              "picture":"/img/desserts/choco-strawberries.jpg",
              "price":"7.50"
            }
          ] 
        };
        expect(dessertsReducer(tempInitialState,action)).toEqual(expectedState);
    })
});