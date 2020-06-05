import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../helper/modal.helper';
import {deleteDessert,getDesserts} from "../../actions/dessertActions";
import {deleteDrink,getDrinks} from "../../actions/drinkActions";
import {deleteEntree,getEntrees} from "../../actions/entreeActions";
import {deleteIngredient,getIngredients} from "../../actions/ingredientActions";
import {deleteStrongDish,getStrongsDishes} from "../../actions/strongDishActions"
import PropTypes from 'prop-types'; 
export class Delete extends React.Component{
    deleteProduct=()=>{ 
        var id=this.props.idToDelete;
        if(this.props.productType==='Dessert'){
            this.props.deleteDessert(id);
            this.props.getDesserts();
        }
        else if(this.props.productType==='Drink'){
            this.props.deleteDrink(id);
            this.props.getDrinks()
        } 
        else if(this.props.productType==='Appetizer'){
            this.props.deleteEntree(id);
            this.props.getEntrees();
        }
        else if(this.props.productType==='Ingredient'){
            this.props.deleteIngredient(id);
            this.props.getIngredients();
        }
        else if(this.props.productType==='Main Course'){
            this.props.deleteStrongDish(id);
            this.props.getStrongsDishes();
        }
        try {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log('An error occurs in Delete.deleteProduct()');
        } 
    }
    dontDelete=(e)=>{
        if(e){
            e.preventDefault()
        }
        closeModal();
    }
    render(){
        return(
            <React.Fragment>
                <button className="btn btn-primary" onClick={(e)=>{this.dontDelete(e)}} id="btn-dont-delete">No</button>
                <button className="btn btn-success" onClick={()=>{this.deleteProduct()}} id="btn-delete">Yes</button>
            </React.Fragment>
        )
    }
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