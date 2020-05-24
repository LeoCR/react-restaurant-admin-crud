//import api for read values from database
import api from '../api/api';
//import custom constants
import { SHOW_ENTREES,DELETE_ENTREE, ADD_ENTREE,SHOW_ENTREE,EDIT_ENTREE} from "../constants/entreeTypes";
//import custom actions
import {getEntrees,addEntree,deleteEntree,showEntree,editEntree} from "./entreeActions"; 
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
var tempEntree;
//function for setting the drinks from database
async function setEntrees(){
    await api.get('/api/entrees').then((res)=>{
        tempEntree=res.data
    })
}  
describe('Entrees Actions', () => { 
    beforeEach(() => {
        setEntrees(); 
        store.clearActions();
    }); 
    it('Handle action ADD_ENTREE', (done) => {  
        if(previewMode){
            var newEntree={
                "id":"8ENTR",
                "name":"Strawberry Salsa",
                "description":"A sweet salsa that is great with pork and chicken dishes.",
                "picture":"/img/uploads/strawberry-salsa.jpg",
                "category":"Meat",
                "price":"7.50"
            }; 
            var imgEntree = new File(["strawberry-salsa"], "strawberry-salsa.jpg", {
                type: "image/jpeg", 
                lastModified:1589761867000
            });
            var formData = new FormData();
            formData.append('id',"8ENTR");
            formData.append('name',"Strawberry Salsa");
            formData.append('price',"7.50");
            formData.append('category',"Meat");
            formData.append('description',"A sweet salsa that is great with pork and chicken dishes."); 
            formData.append('picture',imgEntree); 
    
            store.dispatch(addEntree(formData)).then(() => {
                let expectedActions = [{
                    type:ADD_ENTREE,
                    payload:newEntree
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    it('Handle action SHOW_ENTREE', (done) => {  
        if(previewMode){ 
            store.dispatch(showEntree("8ENTR")).then(() => {
                let expectedActions = [{
                    type:SHOW_ENTREE,
                    payload:{
                        "id":"8ENTR",
                        "name":"Strawberry Salsa",
                        "description":"A sweet salsa that is great with pork and chicken dishes.",
                        "picture":"/img/uploads/strawberry-salsa.jpg",
                        "category":"Meat",
                        "price":"7.50"
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
    it('Handle action SHOW_ENTREES', (done) => {  
        if(previewMode){ 
            store.dispatch(getEntrees()).then(() => { 
                let expectedActions = [{    
                    payload:tempEntree,
                    type:SHOW_ENTREES
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    test('Handle action EDIT_ENTREE', (done) => {  
        if(previewMode){ 
            const infoEntree={
                "id":"1ENTR",
                "name":"Ceviche",
                "description":"A little dish with marinated meat such as fish, seafood or both .",
                "picture":"/img/entrees/ceviche.png",
                "category":"Sea Food",
                "price":"7.50"
            } 
            store.dispatch(editEntree(infoEntree,"1ENTR")).then(() => {
                let expectedActions = [{
                    type:EDIT_ENTREE,
                    payload:infoEntree
                }];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    it('Handle action DELETE_ENTREE',(done)=>{
        if(previewMode){ 
            store.dispatch(deleteEntree('8ENTR')).then(() => {
                let expectedActions = [{
                    type:DELETE_ENTREE,
                    payload:'8ENTR'
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