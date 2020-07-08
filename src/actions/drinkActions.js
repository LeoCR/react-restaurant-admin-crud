import { SHOW_DRINKS,DELETE_DRINK,ADD_DRINK, SHOW_DRINK, EDIT_DRINK} from "../constants/drinkTypes"
import api from '../api/api';
export  const getDrinks=()=>async dispatch=>{
    const response = await api.get('/api/drinks');
    dispatch({
        type:SHOW_DRINKS,
        payload:response.data
    })
}
export const deleteDrink =id=>async dispatch=>{
    await api.delete(`/api/drink/delete/${id}`);
    dispatch({
        type:DELETE_DRINK,
        payload:id
    })
}
export const addDrink=drink=>async dispatch=>{
    const response = await api.post('/api/drink/add/',drink,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    dispatch({
        type:ADD_DRINK,
        payload:response.data
    })
}
export const showDrink=id=>async dispatch=>{
    const response=await api.get(`/api/drink/show/${id}`);
    dispatch({
        type:SHOW_DRINK,
        payload:response.data
    })
}

export const editDrink=(drink,id)=>async dispatch=>{
    return await api.put('/api/drink/update/'+id,drink)
    .then((res)=>{ 
        dispatch({
            type:EDIT_DRINK,
            payload:res.data
        })
    })
    .catch((err)=>{
        console.log('An error occurs in drinkActions.editDrink');
        console.log(err);
    });
}
export const updateDrink=(drink,id)=>async dispatch=>{
    return await api.put('/api/drink/update-img/'+id,drink,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{ 
        dispatch({
            type:EDIT_DRINK,
            payload:res.data
        })
    })
    .catch((err)=>{
        console.log('An error occurs in drinkActions.updateDrink');
        console.log(err);
    });
}