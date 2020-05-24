import { SHOW_ENTREES, DELETE_ENTREE,ADD_ENTREE,SHOW_ENTREE ,EDIT_ENTREE} from "../constants/entreeTypes";
import entreesReducer from './entreesReducer';
describe('Entrees Reducer', () => {
    const initialState = {
        entrees: [],
        entree: null 
    };
    it('Handle entreesReducer initial state', () => {
        expect( entreesReducer(undefined, {})).toEqual(initialState)
    });
    it('Handle SHOW_ENTREES',()=>{ 
        const entreesList = [{
            "id":"7ENTR",
            "name":"Filet Mignon Sandwich",
            "description":"It is very simple, and the filet mignon cut of beef steak is so tender and juicy!.",
            "picture":"/img/entrees/marinated-filet-mignon-steak-sandwich.png",
            "category":"Meat",
            "price":"7.50"
        }];
        const action = {
          type: SHOW_ENTREES,
          payload: entreesList,
        };
        const expectedState = { ...initialState,entrees: entreesList };
        expect(entreesReducer(initialState,action)).toEqual(expectedState)
    })
    it('Handle DELETE_ENTREE',()=>{
        const tempInitialState = {
            entrees: [
                {
                    "id":"1ENTR",
                    "name":"Ceviche",
                    "description":"A little dish with marinated meat such as fish, seafood or both .",
                    "picture":"/img/entrees/ceviche.png",
                    "category":"Sea Food",
                    "price":"7.50"
                },
                {
                    "id":"2ENTR",
                    "name":"Grilled Shrimp Salad",
                    "description":"A bed of romaine lettuce, followed \nby grilled peppers, corn, and shrimp. Then we \nbrighten this salad up with chopped grape tomatoes, a \ndiced avocado, and cucumbers.",
                    "picture":"/img/entrees/grilled-shrimp-salad.png",
                    "category":"Salad",
                    "price":"7.50"
                }
            ],
            entree: null 
        }; 
        const action = {
            type: DELETE_ENTREE,
            payload:  "2ENTR" 
        }; 
        const expectedState = { ...tempInitialState,entrees: [
            {
                "id":"1ENTR",
                "name":"Ceviche",
                "description":"A little dish with marinated meat such as fish, seafood or both .",
                "picture":"/img/entrees/ceviche.png",
                "category":"Sea Food",
                "price":"7.50"
            }
        ]};
        expect(entreesReducer(tempInitialState,action)).toEqual(expectedState)
    }) 
    it('Handle ADD_ENTREE',()=>{
        var newEntree={
            "id":"8ENTR",
            "name":"Ceviche of Shrimp",
            "description":"A little dish with marinated meat such as fish with srhimp .",
            "picture":"/img/entrees/ceviche-of-shrimp.png",
            "category":"Sea Food",
            "price":"9.50"
        }; 
        const action = {
          type: ADD_ENTREE,
          payload:  newEntree
        }; 
        const expectedState = { ...initialState,entrees: [newEntree] };
        expect(entreesReducer(initialState,action)).toEqual(expectedState)
    });
    it('Handle SHOW_ENTREE',()=>{
        var entree={
            "id":"1ENTR",
            "name":"Ceviche",
            "description":"A little dish with marinated meat such as fish, seafood or both .",
            "picture":"/img/entrees/ceviche.png",
            "category":"Sea Food",
            "price":"7.50"
        };
        const action = {
          type: SHOW_ENTREE,
          payload:  entree
        };
        const expectedState = { ...initialState,entree };
        expect(entreesReducer(initialState,action)).toEqual(expectedState)
    });
    it('Handle EDIT_ENTREE',()=>{
        var tempInitialState={entrees:[
            {
                "id":"1ENTR",
                "name":"Ceviche",
                "description":"A little dish with marinated meat such as fish, seafood or both .",
                "picture":"/img/entrees/ceviche.png",
                "category":"Sea Food",
                "price":"7.50"
            },
            {
                "id":"2ENTR",
                "name":"Grilled Shrimp Salad",
                "description":"A bed of romaine lettuce, followed \nby grilled peppers, corn, and shrimp. Then we \nbrighten this salad up with chopped grape tomatoes, a \ndiced avocado, and cucumbers.",
                "picture":"/img/entrees/grilled-shrimp-salad.png",
                "category":"Salad",
                "price":"7.50"
            }
        ]};
        const action = {
          type: EDIT_ENTREE,
          payload: {
                "id":"1ENTR",
                "name":"Ceviche of Shrimp",
                "description":"A little dish with marinated meat such as fish with srhimp.",
                "picture":"/img/entrees/ceviche.png",
                "category":"Sea Food",
                "price":"9.50"
            }
        };
        const expectedState = { ...tempInitialState,entrees: [
            {
                "id":"1ENTR",
                "name":"Ceviche of Shrimp",
                "description":"A little dish with marinated meat such as fish with srhimp.",
                "picture":"/img/entrees/ceviche.png",
                "category":"Sea Food",
                "price":"9.50"
            },
            {
                "id":"2ENTR",
                "name":"Grilled Shrimp Salad",
                "description":"A bed of romaine lettuce, followed \nby grilled peppers, corn, and shrimp. Then we \nbrighten this salad up with chopped grape tomatoes, a \ndiced avocado, and cucumbers.",
                "picture":"/img/entrees/grilled-shrimp-salad.png",
                "category":"Salad",
                "price":"7.50"
            }
          ] 
        };
        expect(entreesReducer(tempInitialState,action)).toEqual(expectedState);
    })
});