import {SET_ADD_INGREDIENT,SET_DISH_ID, SET_DISH_INGREDIENT_ID,SET_DELETE_PRODUCT} from '../constants/modalTypes';
import api from '../api/api';
export const setAddIngredient = () => ({ type: SET_ADD_INGREDIENT })
export const setDelete=(idToDelete,productType)=>async dispatch=>{
    if(productType==='Main Course'||productType==='Appetizer'||productType==='Dessert'){
        await api.get('/api/ingredients/'+idToDelete)
        .then(async(res)=>{
            if(res.data.length>0){
                for (let index = 0; index < res.data.length; index++) {
                    if(res.data[index].id_ingredient){
                        console.log('Deleting id_ingredient_dish: '+res.data[index].id_ingredient_dish);
                        await api.delete('/api/ingredient-to-dish/delete/'+res.data[index].id_ingredient_dish)
                        .then((resp)=>{
                            console.log(resp);
                        })
                    }
                }
            } 
        })
    }
    dispatch({
        type:SET_DELETE_PRODUCT,
        idToDelete:idToDelete,
        productType:productType
    })
    
} 
export const setDishId = idDish => ({ 
    type: SET_DISH_ID, 
    idDish 
})
export const setNextIdDishIngredient=(nextIdDishIngredient)=>({
    type:SET_DISH_INGREDIENT_ID,
    nextIdDishIngredient
})