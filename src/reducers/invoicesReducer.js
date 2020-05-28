import {GET_INVOICES,SHOW_INVOICE,SHOW_ORDER_PRODUCTS} from "../constants/invoiceTypes";

const initialState={
    invoices:[]
}
export default function invoicesReducer(state=initialState,action){
    switch (action.type) {
        case GET_INVOICES:
            return{
                ...state,
                invoices:action.payload
            }
        case SHOW_INVOICE:
            return{
                ...state,
                invoice:action.payload
            }
        case SHOW_ORDER_PRODUCTS:
            return{
                ...state,
                orderProducts:action.payload
            }     
        default:
            return state
    }
}