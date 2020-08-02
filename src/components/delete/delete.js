import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../helper/modal.helper';
import {deleteDessert,getDesserts} from "../../actions/dessertActions";
import {deleteDrink,getDrinks} from "../../actions/drinkActions";
import {deleteEntree,getEntrees} from "../../actions/entreeActions";
import {deleteIngredient,getIngredients} from "../../actions/ingredientActions";
import {deleteStrongDish,getStrongsDishes} from "../../actions/strongDishActions"
import PropTypes from 'prop-types'; 
const Delete = props=>{
    const deleteProduct=()=>{ 
        var id=props.idToDelete;
        if(props.productType==='Dessert'){
            props.deleteDessert(id);
            props.getDesserts();
        }
        else if(props.productType==='Drink'){
            props.deleteDrink(id);
            props.getDrinks()
        } 
        else if(props.productType==='Appetizer'){
            props.deleteEntree(id);
            props.getEntrees();
        }
        else if(props.productType==='Ingredient'){
            props.deleteIngredient(id);
            props.getIngredients();
        }
        else if(props.productType==='Main Course'){
            props.deleteStrongDish(id);
            props.getStrongsDishes();
        }
        try {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log('An error occurs in Delete.deleteProduct()');
        } 
    }
    const dontDelete=(e)=>{
        if(e){
            e.preventDefault()
        }
        closeModal(e);
    } 
    return(
        <React.Fragment>
            <button className="btn btn-primary" onClick={(e)=>{dontDelete(e)}} id="btn-dont-delete">No</button>
            <button className="btn btn-success" onClick={()=>{deleteProduct()}} id="btn-delete">Yes</button>
        </React.Fragment>
    ) 
} 
Delete.propTypes = {
    modals: PropTypes.string,
    idDish: PropTypes.string,
    productType: PropTypes.string,
    idToDelete: PropTypes.string,
    desserts:PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          description: PropTypes.string,
          picture: PropTypes.string,
          price: PropTypes.number
        })
    ),
    drinks:PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          description: PropTypes.string,
          picture: PropTypes.string,
          price: PropTypes.string
        })
    ),
    entrees:PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          description: PropTypes.string,
          picture: PropTypes.string,
          price: PropTypes.number
        })
    ),
    ingredients:PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          img: PropTypes.string
        })
    ),
    strongsDishes:PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            picture: PropTypes.string,
            price: PropTypes.number
        })
    )
}
const mapDispatchToProps = dispatch => {
    return {
        deleteDrink: (id) => dispatch(deleteDrink(id)),
        deleteDessert: (id) => dispatch(deleteDessert(id)),
        deleteEntree:(id)=>dispatch(deleteEntree(id)),
        deleteIngredient:(id)=>dispatch(deleteIngredient(id)),
        deleteStrongDish:(id)=>dispatch(deleteStrongDish(id)),
        getDesserts:()=>dispatch(getDesserts()),
        getDrinks:()=>dispatch(getDrinks()),
        getEntrees:()=>dispatch(getEntrees()),
        getIngredients:()=>dispatch(getIngredients()),
        getStrongsDishes:()=>dispatch(getStrongsDishes())
    }
}
const mapStateToProps=state=>({
    modals:state.modals.modals,
    idDish:state.modals.idDish,
    productType:state.modals.productType,
    idToDelete:state.modals.idToDelete,
    desserts:state.desserts.desserts,
    drinks:state.drinks.drinks,
    entrees:state.entrees.entrees,
    ingredients:state.ingredients.ingredients,
    strongsDishes:state.strongsDishes.strongsDishes
})
export default connect(mapStateToProps,mapDispatchToProps)(Delete);