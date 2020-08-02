//import api for read values from database
import api from '../api/api';
//import custom constants
import { SHOW_INGREDIENTS,DELETE_INGREDIENT, ADD_INGREDIENT,SHOW_INGREDIENT,EDIT_INGREDIENT} from "../constants/ingredientTypes";
//import custom actions
import {getIngredients,addIngredient,deleteIngredient,showIngredient,editIngredient} from "./ingredientActions"; 
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
describe('Entrees Actions', () => { 
    beforeEach(() => {
        setIngredients(); 
        store.clearActions();
    }); 
    it('Handle action ADD_INGREDIENT', (done) => {  
        if(previewMode){ 
            var imgIngredient = new File(["peach"], "peach.jpg", {
                type: "image/jpeg", 
                lastModified:1589761867000
            });
            var formData = new FormData();
            formData.append('id',"41ING");
            formData.append('name',"Peach");
            formData.append('img',imgIngredient);  
            store.dispatch(addIngredient(formData)).then(() => {
                let expectedActions = [{
                    type:ADD_INGREDIENT,
                    payload:{
                        id: "41ING", 
                        name: "Peach", 
                        img: "/img/uploads/peach.jpg" 
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
    it('Handle action SHOW_INGREDIENT', (done) => {  
        if(previewMode){   
            store.dispatch(showIngredient("41ING")).then(() => {
                let expectedActions = [{
                    type:SHOW_INGREDIENT,
                    payload:{
                        id: "41ING", 
                        name: "Peach", 
                        img: "/img/uploads/peach.jpg" 
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
    it('Handle action SHOW_INGREDIENTS', (done) => {  
        if(previewMode){   
            store.dispatch(getIngredients()).then(() => { 
                let expectedActions = [{    
                    payload:tempIngredient,
                    type:SHOW_INGREDIENTS
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    it('Handle action EDIT_INGREDIENT', (done) => {  
        if(previewMode){ 
            const infoIngredient={
                id:"41ING",
                name:"Red Peach", 
                img:"/img/uploads/peach.jpg"
            }  
            store.dispatch(editIngredient(infoIngredient,"41ING")).then(() => {
                let expectedActions = [{
                    type:EDIT_INGREDIENT,
                    payload:infoIngredient
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    it('Handle action DELETE_INGREDIENT',(done)=>{
        if(previewMode){ 
            store.dispatch(deleteIngredient('41ING')).then(() => {
                let expectedActions = [{
                    type:DELETE_INGREDIENT,
                    payload:'41ING'
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