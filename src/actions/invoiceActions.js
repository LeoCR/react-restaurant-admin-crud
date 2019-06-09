import {GET_INVOICES,DELETE_INVOICE} from "../constants/invoiceTypes";
import api from '../api/api';
export const getInvoices=()=>async dispatch=>{
    const response = await api.get('/api/invoices');
    dispatch({
        type:GET_INVOICES,
        payload:response.data
    })
}
export const deleteInvoice=id=>async dispatch=>{
    await api.delete(`/api/invoices/delete/${id}`)
    dispatch({
        type:DELETE_INVOICE,
        payload:id
    })
}