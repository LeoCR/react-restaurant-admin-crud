import {GET_INVOICES} from "../constants/invoiceTypes";

const initialState={
    invoices:[
        {
            "headerInvoices":[
                {
                "idHeader":1,"dateOfBilling":"2019-03-12T02:30:00.000Z","total":"15.0000","subTotal":"14.0000","salesTax":"10.0000","productId":"3ENTR","productQuantity":2},
                {
                "idHeader":2,"dateOfBilling":"2019-03-12T02:30:00.000Z","total":"15.0000","subTotal":"14.0000","salesTax":"10.0000","productId":"8DESRT","productQuantity":2}
            ],
            "invoicesDetails":[
                {
                "idInvoiceDetail":1,"clientRestaurant":1,"headerInvoice":1},
                {
                "idInvoiceDetail":2,"clientRestaurant":1,"headerInvoice":2}
            ]
    }
    ]
}
export default function invoicesReducer(state=initialState,action){
    switch (action.type) {
        case GET_INVOICES:
            return{
                ...state,
                invoices:action.payload
            }
        default:
            return state
    }
}