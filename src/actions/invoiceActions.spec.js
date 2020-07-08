//import api for read values from database
import api from '../api/api';
//import custom constants
import {GET_INVOICES,SHOW_INVOICE,SHOW_ORDER_PRODUCTS} from "../constants/invoiceTypes";
//import custom actions
import {getInvoices,showInvoice,showOrderProducts} from "./invoiceActions"; 
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
var tempInvoice;
//function for setting the drinks from database
function setInvoices(){
    api.get('/api/invoices').then((res)=>{
        tempInvoice=res.data
    })
}  
describe('Invoice Actions',()=>{
    beforeEach(() => {
        if(previewMode){
            setInvoices(); 
        }
        store.clearActions();
    });
    it('Handle GET_INVOICES',(done) => {           
        if(previewMode){
            store.dispatch(getInvoices()).then(() => { 
                if(tempInvoice===undefined){
                    setInvoices(); 
                }
                let expectedActions = [
                    {
                        type:GET_INVOICES,
                        payload: tempInvoice
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
                done()
            });
        }
        else{
            done()
        }
    });
    it('Handle SHOW_INVOICE',(done)=>{
        let expectedActions=[
            {
                type:SHOW_INVOICE,
                payload:[
                    {
                        "email":"invited_user@gmail.com",
                        "id_header":1,
                        "order_code":"INVC1",
                        "username":"InvitedUser",
                        "date_of_billing":"2019-03-12T02:30:00.000Z"
                    },{
                        "email":"invited_user@gmail.com",
                        "id_header":2,
                        "order_code":"INVC1",
                        "username":"InvitedUser",
                        "date_of_billing":"2019-03-12T02:30:00.000Z"
                    }
                ]
            }
        ];
        if(previewMode){
            store.dispatch(showInvoice('INVC1')).then(() => { 
                expect(store.getActions()).toEqual(expectedActions);
                done();
            });
        }
        else{
            done();
        }
    });
    it('Handle SHOW_ORDER_PRODUCTS',(done)=>{
        let expectedActions=[
            {
                type:SHOW_ORDER_PRODUCTS,
                payload:[
                    {
                        "id_header":1,
                        "total":15,
                        "product_name":"Grilled Salmon Salad",
                        "product_id":"3ENTR",
                        "product_quantity":2,
                        "order_code":"INVC1",
                        "date_of_billing":"2019-03-12T02:30:00.000Z"
                    },{
                        "id_header":2,
                        "total":15,
                        "product_name":"Brownie with Ice Cream",
                        "product_id":"8DESRT",
                        "product_quantity":2,
                        "order_code":"INVC1",
                        "date_of_billing":"2019-03-12T02:30:00.000Z"
                    }
                ]
            }
        ]
        if(previewMode){
            store.dispatch(showOrderProducts('INVC1')).then(() => { 
                expect(store.getActions()).toEqual(expectedActions);
                done();
            });
        }
        else{
            done();
        }
    })
})