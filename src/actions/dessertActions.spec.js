//import api for read values from database
import api from '../api/api';
//import custom constants
import { SHOW_DESSERTS,DELETE_DESSERT,ADD_DESSERT,SHOW_DESSERT,EDIT_DESSERT} from "../constants/dessertTypes";
//import custom actions
import {getDesserts,addDessert,deleteDessert,showDessert,editDessert} from "./dessertActions"; 
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
//initialize temporal variable for saving all the deserts
var tempDessert;
//function for setting the desserts from database
async function setDeseerts(){
    await api.get('/api/desserts').then((res)=>{
        tempDessert=res.data
    })
}    
describe('Desserts Actions', () => { 
    /**
    * @see https://medium.com/javascript-in-plain-english/testing-async-redux-actions-with-jest-3bde5dd88607
    **/
    beforeEach(() => {
        setDeseerts(); 
        store.clearActions();
    }); 
    test('Handle action ADD_DESSERT', (done) => {  
        if(previewMode){ 
            var imgDessert = new File(["apple_pie"], "apple_pie.jpg", {
                type: "image/jpeg", 
                lastModified:1589761867000
            });
            var formData = new FormData();
            formData.append('id',"9DESRT");
            formData.append('name',"Apple Pie");
            formData.append('price',5.5);
            formData.append('description',"Sweet apples with cinnamon and sweet cream"); 
            formData.append('picture',imgDessert);  
            store.dispatch(addDessert(formData)).then(() => {
                let expectedActions = [{
                    type:ADD_DESSERT,
                    payload:{
                        description: "Sweet apples with cinnamon and sweet cream", 
                        id: "9DESRT", 
                        name: "Apple Pie", 
                        picture: "/img/uploads/apple_pie.jpg", 
                        price: 5.5
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
    test('Handle action SHOW_DESSERT', (done) => {  
        if(previewMode){   
            store.dispatch(showDessert("9DESRT")).then(() => {
                let expectedActions = [{
                    type:SHOW_DESSERT,
                    payload:{
                        id: "9DESRT", 
                        description: "Sweet apples with cinnamon and sweet cream",  
                        name: "Apple Pie", 
                        picture: "/img/uploads/apple_pie.jpg", 
                        price:5.5
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
    test('Handle action SHOW_DESSERTS', (done) => {  
        if(previewMode){   
            store.dispatch(getDesserts()).then(() => { 
                let expectedActions = [{    
                    payload:tempDessert,
                    type:SHOW_DESSERTS
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    test('Handle action EDIT_DESSERT', (done) => {  
        if(previewMode){ 
            const infoDessert={
                id:"1DESRT",
                name:"Rice with Milk with cinnamon",
                price:5.5,
                description:"Sweet rice with cinnamon and sweet cream",
                picture:"/img/desserts/rice-with-milk.jpg"
            }  
            store.dispatch(editDessert(infoDessert,"1DESRT")).then(() => {
                let expectedActions = [{
                    type:EDIT_DESSERT,
                    payload:infoDessert
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    test('Handle action DELETE_DESSERT',(done)=>{
        if(previewMode){ 
            store.dispatch(deleteDessert('9DESRT')).then(() => {
                let expectedActions = [{
                    type:DELETE_DESSERT,
                    payload:'9DESRT'
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