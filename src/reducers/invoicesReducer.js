import {GET_INVOICES,SHOW_INVOICE,EDIT_INVOICE,SHOW_ORDER_PRODUCTS} from "../constants/invoiceTypes";

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
        case EDIT_INVOICE:
                return{
                    ...state,
                    invoices:state.invoices.map(
                        invoice=>invoice.orderCode===action.payload.id
                        ?(invoice=action.payload)
                        :invoice
                    )
        }
        default:
            return state
    }
}