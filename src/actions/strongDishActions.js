import { SHOW_STRONGS_DISHES,DELETE_STRONG_DISH,ADD_STRONG_DISH, SHOW_STRONG_DISH, EDIT_STRONG_DISH} from "../constants/strongDishTypes"
import api from '../api/api';
export  const getStrongsDishes=()=>async dispatch=>{
    return await api.get('/api/strongs-dishes')
    .then((res)=>{
        dispatch({
            type:SHOW_STRONGS_DISHES,
            payload:res.data
        })
    }) 
}
export const deleteStrongDish =id=>async dispatch=>{
    await api.delete('/api/strongs-dish/delete/'+id);
    dispatch({
        type:DELETE_STRONG_DISH,
        payload:id
    })
}
export const addStrongDish=strongDish=>async dispatch=>{
    return await api.post('/api/strong-dish/add/',strongDish,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{
        dispatch({
            type:ADD_STRONG_DISH,
            payload:res.data
        })
    })
    .catch((err)=>{
        console.log('An error occurs in strongDishActions.addStrongDish');
        console.log(err);
    }); 
}
export const showStrongDish=id=>async dispatch=>{
    return await api.get('/api/strong-dish/show/'+id)
    .then((res)=>{
        dispatch({
            type:SHOW_STRONG_DISH,
            payload:res.data
        })
    })
}
export const editStrongDish=(strongDish,id)=>async dispatch=>{
    return await api.put('/api/strong-dish/update/'+id,strongDish)
    .then((res)=>{ 
        dispatch({
            type:EDIT_STRONG_DISH,
            payload:res.data
        })
    })
    .catch((err)=>{
        console.log('An error occurs in strongDishActions.editStrongDish');
        console.log(err);
    });
    
}
export const updateStrongDish=(strongDish,id)=>async dispatch=>{
    return await api.put('/api/strong-dish/update-img/'+id,strongDish,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{ 
        dispatch({
            type:EDIT_STRONG_DISH,
            payload:res.data
        })
    })
    .catch((err)=>{
        console.log('An error occurs in strongDishActions.updateStrongDish');
        console.log(err);
    });
}