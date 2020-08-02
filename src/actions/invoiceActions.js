import {GET_INVOICES,SHOW_INVOICE,SHOW_ORDER_PRODUCTS} from "../constants/invoiceTypes";
import api from '../api/api';
export const getInvoices=()=>async dispatch=>{
    const response = await api.get('/api/invoices/');
    dispatch({
        type:GET_INVOICES,
        payload:response.data
    })
}
export const showInvoice=orderCode=>async dispatch=>{
    const response=await api.get(`/api/invoice/show/${orderCode}`);
    dispatch({
        type:SHOW_INVOICE,
        payload:response.data
    })
}
export const showOrderProducts=orderCode=>async dispatch=>{
    const response=await api.get(`/api/invoice/show/products/${orderCode}`);
    dispatch({
        type:SHOW_ORDER_PRODUCTS,
        payload:response.data
    })
}  