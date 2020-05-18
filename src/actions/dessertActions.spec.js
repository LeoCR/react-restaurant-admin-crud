//import moxios for testing axios request
import moxios from 'moxios';
//import custom constants
import { SHOW_DESSERTS,DELETE_DESSERT,ADD_DESSERT,SHOW_DESSERT,EDIT_DESSERT} from "../constants/dessertTypes";
//import custom actions
import {getDesserts,addDessert,deleteDessert,showDessert,editDessert} from "./dessertActions"; 
// import configreStore to create a mock store where we will dispatch our actions
import configureStore from 'redux-mock-store';
//import thunk middle to make our action asyncronous
import thunk from 'redux-thunk'; 
//import previewMode for making test in localhost API
import {previewMode} from "../config/previewMode";
// initialize mockStore which is only the configureStore method which take middlesware as its parameters
const mockStore = configureStore([thunk]);
//creating a store with mockStore and redux-thunk as middleware
const store = mockStore({});
    
describe('Desserts Actions', () => { 
    /**
    * @see https://medium.com/javascript-in-plain-english/testing-async-redux-actions-with-jest-3bde5dd88607
    **/
    beforeEach(() => {
        moxios.install();
        store.clearActions();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('ADD_DESSERT', (done) => {  
        if(previewMode){
            moxios.stubRequest('POST','https://localhost:49658/api/dessert/add/', {
                status: 200,
                response:{
                    "id":"9DESRT",
                    "name":"Apple Pie",
                    "description":"Sweet apples with cinnamon and sweet cream",
                    "picture":'/img/uploads/apple_pie.jpg',
                    "price":"5.50"
                }
            }); 
            var imgDessert = new File(["apple_pie"], "apple_pie.jpg", {
                type: "image/jpeg", 
                lastModified:1589761867000
            });
            var formData = new FormData();
            formData.append('id',"9DESRT");
            formData.append('name',"Apple Pie");
            formData.append('price',"5.50");
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
                        price: "5.50"
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
    test('SHOW_DESSERT', (done) => {  
        if(previewMode){
            moxios.stubRequest('https://localhost:49658/api/dessert/show/9DESRT', {
                status: 200 
            });  
            store.dispatch(showDessert("9DESRT")).then(() => {
                let expectedActions = [{
                    type:SHOW_DESSERT,
                    payload:{
                        description: "Sweet apples with cinnamon and sweet cream", 
                        id: "9DESRT", 
                        name: "Apple Pie", 
                        picture: "/img/uploads/apple_pie.jpg", 
                        price: "5.50"
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
    test('SHOW_DESSERTS', (done) => {  
        if(previewMode){
            moxios.stubRequest('https://localhost:49658/api/desserts', {
                status: 200
            });  
            store.dispatch(getDesserts()).then(() => {
                let expectedActions = [{
                    type:SHOW_DESSERTS,
                    payload:[{"id":"1DESRT","name":"Rice with Milk","description":"Sweet rice with cinnamon and sweet cream","picture":"/img/desserts/rice-with-milk.jpg","price":"5.50"},{"id":"2DESRT","name":"Choco Strawberries","description":"Strawberries covered with Chocolate","picture":"/img/desserts/choco-strawberries.jpg","price":"7.50"},{"id":"3DESRT","name":"Ice Cream and Caramel","description":"Chocolate ice cream on the crust","picture":"/img/desserts/ice-cream-and-caramel.jpg","price":"8.50"},{"id":"4DESRT","name":"Hazelnut Flans","description":"Evaporated milk, sweetened condensed milk and liquefied chocolate and hazelnut cream","picture":"/img/desserts/chocolate-and-hazelnut-flans.jpg","price":"4.50"},{"id":"5DESRT","name":"Chocolate pudding","description":"Sugar, flavored with chocolate and vanilla and thickened with a starch","picture":"/img/desserts/chocolate-pudding.jpg","price":"7.50"},{"id":"6DESRT","name":"Coconut Flan","description":"Mix milk and condensed milk and add grated coconut","picture":"/img/desserts/coconut-flan.jpg","price":"7.50"},{"id":"7DESRT","name":"Flan caramel","description":"The sweetened condensed milk and the evaporated milk make a Flan caramel rich .","picture":"/img/desserts/flan-caramel.jpg","price":"7.50"},{"id":"8DESRT","name":"Brownie and Ice Cream","description":"Sweet Ice cream with a brownie","picture":"/img/desserts/brownie-with-ice-cream.jpg","price":"7.50"},
                    {"id":"9DESRT",
                    "name":"Apple Pie",
                    "description":"Sweet apples with cinnamon and sweet cream",
                    "picture":'/img/uploads/apple_pie.jpg',
                    "price":"5.50"}]}];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    });
    test('EDIT_DESSERT', (done) => {  
        if(previewMode){
            moxios.stubRequest('https://localhost:49658/api/desserts', {
                status: 200
            });  
            store.dispatch(getDesserts()).then(() => {
                let expectedActions = [{
                    type:SHOW_DESSERTS,
                    payload:[{"id":"1DESRT","name":"Rice with Milk","description":"Sweet rice with cinnamon and sweet cream","picture":"/img/desserts/rice-with-milk.jpg","price":"5.50"},{"id":"2DESRT","name":"Choco Strawberries","description":"Strawberries covered with Chocolate","picture":"/img/desserts/choco-strawberries.jpg","price":"7.50"},{"id":"3DESRT","name":"Ice Cream and Caramel","description":"Chocolate ice cream on the crust","picture":"/img/desserts/ice-cream-and-caramel.jpg","price":"8.50"},{"id":"4DESRT","name":"Hazelnut Flans","description":"Evaporated milk, sweetened condensed milk and liquefied chocolate and hazelnut cream","picture":"/img/desserts/chocolate-and-hazelnut-flans.jpg","price":"4.50"},{"id":"5DESRT","name":"Chocolate pudding","description":"Sugar, flavored with chocolate and vanilla and thickened with a starch","picture":"/img/desserts/chocolate-pudding.jpg","price":"7.50"},{"id":"6DESRT","name":"Coconut Flan","description":"Mix milk and condensed milk and add grated coconut","picture":"/img/desserts/coconut-flan.jpg","price":"7.50"},{"id":"7DESRT","name":"Flan caramel","description":"The sweetened condensed milk and the evaporated milk make a Flan caramel rich .","picture":"/img/desserts/flan-caramel.jpg","price":"7.50"},{"id":"8DESRT","name":"Brownie and Ice Cream","description":"Sweet Ice cream with a brownie","picture":"/img/desserts/brownie-with-ice-cream.jpg","price":"7.50"},
                    {"id":"9DESRT",
                    "name":"Apple Pie",
                    "description":"Sweet apples with cinnamon and sweet cream",
                    "picture":'/img/uploads/apple_pie.jpg',
                    "price":"5.50"}]}];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        } 
        else{ 
            done(); 
        }
    }); 
    test('DELETE_DESSERT',(done)=>{
        if(previewMode){
            moxios.stubRequest('POST','https://localhost:49658/api/dessert/delete/9DESRT', {
                status: 200,
                response:[{
                    "msg": 'Deleted Successfully -> Dessert Id = 9DESRT'
                }]
            });  
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