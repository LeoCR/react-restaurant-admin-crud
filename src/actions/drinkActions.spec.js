//import api for read values from database
import api from '../api/api';
//import custom constants
import { SHOW_DRINKS,DELETE_DRINK,ADD_DRINK, SHOW_DRINK, EDIT_DRINK} from "../constants/drinkTypes"
//import custom actions
import {getDrinks,addDrink,deleteDrink,showDrink,editDrink} from "./drinkActions"; 
// import configreStore to create a mock store where we will dispatch our actions
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
var tempDrink;
//function for setting the drinks from database
async function setDrinks(){
    await api.get('/api/drinks').then((res)=>{
        tempDrink=res.data
    })
}  
describe('Drinks Actions', () => { 
    beforeEach(() => {
        setDrinks();  
        store.clearActions();
    }); 
    test('Handle action ADD_DRINK', (done) => {  
        if(previewMode){
            var newDrink={
                "id":"12DRK",
                "name":"Imperial",
                "description":"National Beer",
                "picture":'/img/uploads/imperial.jpg',
                "price":"3.50"
            }; 
            var imgDessert = new File(["imperial"], "imperial.jpg", {
                type: "image/jpeg", 
                lastModified:1589761867000
            });
            var formData = new FormData();
            formData.append('id',"12DRK");
            formData.append('name',"Imperial");
            formData.append('price',"3.50");
            formData.append('description',"National Beer"); 
            formData.append('picture',imgDessert); 
    
            store.dispatch(addDrink(formData)).then(() => {
                let expectedActions = [{
                    type:ADD_DRINK,
                    payload:newDrink
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    test('Handle action SHOW_DRINK', (done) => {  
        if(previewMode){ 
            store.dispatch(showDrink("12DRK")).then(() => {
                let expectedActions = [{
                    type:SHOW_DRINK,
                    payload:{
                        "id":"12DRK",
                        "name":"Imperial",
                        "description":"National Beer",
                        "picture":'/img/uploads/imperial.jpg',
                        "price":"3.50"
                    }
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    test('Handle action SHOW_DRINKS', (done) => {  
        if(previewMode){ 
            store.dispatch(getDrinks()).then(() => { 
                let expectedActions = [{    
                    payload:tempDrink,
                    type:SHOW_DRINKS
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    test('Handle action EDIT_DRINK', (done) => {  
        if(previewMode){ 
            const infoDrink={
                id:"1DRK",
                name:"Coca Cola",
                price:"3.00",
                description:"Soft Drink",
                picture:"/img/drinks/coca-cola.jpg"
            }  
            store.dispatch(editDrink(infoDrink,"1DRK")).then(() => {
                let expectedActions = [{
                    type:EDIT_DRINK,
                    payload:infoDrink
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    test('Handle action DELETE_DRINK',(done)=>{
        if(previewMode){ 
            store.dispatch(deleteDrink('12DRK')).then(() => {
                let expectedActions = [{
                    type:DELETE_DRINK,
                    payload:'12DRK'
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