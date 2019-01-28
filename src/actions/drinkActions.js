import { SHOW_DRINKS,DELETE_DRINK,
    ADD_DRINK, SHOW_DRINK,
    EDIT_DRINK
} from "../constants/drinkTypes"
import axios from 'axios';
export  const getDrinks=()=>async dispatch=>{
    const response = await axios.get('http://localhost:49652/api/drinks');
    dispatch({
        type:SHOW_DRINKS,
        payload:response.data
    })
}
export const deleteDrink =id=>async dispatch=>{
    await axios.delete(`http://localhost:49652/api/drink/delete/${id}`);
    dispatch({
        type:DELETE_DRINK,
        payload:id
    })
}
export const addDrink=drink=>async dispatch=>{
    const response = await axios.post('http://localhost:49652/api/drink/add/',drink);
    dispatch({
        type:ADD_DRINK,
        payload:response.data
    })
}
export const showDrink=id=>async dispatch=>{
    const response=await axios.get(`http://localhost:49652/api/drink/show/${id}`);
    dispatch({
        type:SHOW_DRINK,
        payload:response.data
    })
}

export const editDrink=drink=>async dispatch=>{
    const response = await axios.put(`http://localhost:49652/api/drink/update/${drink.id}`,drink);
    dispatch({
        type:EDIT_DRINK,
        payload:response.data
    })
}