//import moxios for testing axios request
import moxios from 'moxios';
//import custom constants
import { SHOW_DESSERTS} from "../constants/dessertTypes";
//import custom actions
import {getDesserts} from "./dessertActions"; 
// import configreStore to create a mock store where we will dispatch our actions
import configureStore from 'redux-mock-store';
//import thunk middle to make our action asyncronous
import thunk from 'redux-thunk'; 
// initialize mockStore which is only the configureStore method which take middlesware as its parameters
const mockStore = configureStore([thunk]);

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
    test('SHOW_DESSERTS', (done) => {  
        moxios.stubRequest('https://localhost:49658/api/desserts', {
          status: 200
        }); 
        /**
        * @see https://github.com/axios/moxios 
        * testing CI
        **/
        store.dispatch(getDesserts()).then(() => {
            let expectedActions = [{
                type:SHOW_DESSERTS,
                payload:[{"id":"1DESRT","name":"Rice with Milk","description":"Sweet rice with cinnamon and sweet cream","picture":"/img/desserts/rice-with-milk.jpg","price":"5.50"},{"id":"2DESRT","name":"Choco Strawberries","description":"Strawberries covered with Chocolate","picture":"/img/desserts/choco-strawberries.jpg","price":"7.50"},{"id":"3DESRT","name":"Ice Cream and Caramel","description":"Chocolate ice cream on the crust","picture":"/img/desserts/ice-cream-and-caramel.jpg","price":"8.50"},{"id":"4DESRT","name":"Hazelnut Flans","description":"Evaporated milk, sweetened condensed milk and liquefied chocolate and hazelnut cream","picture":"/img/desserts/chocolate-and-hazelnut-flans.jpg","price":"4.50"},{"id":"5DESRT","name":"Chocolate pudding","description":"Sugar, flavored with chocolate and vanilla and thickened with a starch","picture":"/img/desserts/chocolate-pudding.jpg","price":"7.50"},{"id":"6DESRT","name":"Coconut Flan","description":"Mix milk and condensed milk and add grated coconut","picture":"/img/desserts/coconut-flan.jpg","price":"7.50"},{"id":"7DESRT","name":"Flan caramel","description":"The sweetened condensed milk and the evaporated milk make a Flan caramel rich .","picture":"/img/desserts/flan-caramel.jpg","price":"7.50"},{"id":"8DESRT","name":"Brownie and Ice Cream","description":"Sweet Ice cream with a brownie","picture":"/img/desserts/brownie-with-ice-cream.jpg","price":"7.50"}]}];
            expect(store.getActions()).toEqual(expectedActions);
            done()
        });
    })
});