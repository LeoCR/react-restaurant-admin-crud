import React from 'react';
import {connect} from 'react-redux';
import {getIngredients} from '../../actions/ingredientActions';
import {addIngredientToDishFromModal,updateIngredientToDish} from '../../actions/ingredientByDishActions';
import {setNextIdDishIngredient} from '../../actions/modalActions';
import {closeModal} from '../../helper/modal.helper';
import api from '../../api/api';
import PropTypes from 'prop-types';
export class AddIngredientToDish extends React.PureComponent{
    state={
        ingredientsToAdd:[],
        ingredientSelected:'',
        dishSelected:'',
        nextIdDishIngredient:0
    }
     componentDidMount=async()=>{
        await this.props.getIngredients();  
        var _this=this;
        setTimeout(() => {
            _this.setState({
                ingredientsToAdd:_this.props.ingredients,
                dishSelected:_this.props.idDish
            })
        }, 900); 
    }
    componentWillReceiveProps(nextProps,nextState) {
        if(nextProps.idDish!==this.state.dishSelected){
            this.setState({
                dishSelected:nextProps.idDish
            })
        }
        if(nextProps.nextIdDishIngredient!==this.state.nextIdDishIngredient){
            this.setState({
                nextIdDishIngredient:nextProps.nextIdDishIngredient
            })
        } 
    }
    onChangeIngredient=(e)=>{
        e.preventDefault();
        var idIngredient=e.target.value; 
        var _this=this;
        if(idIngredient!=='none'){
            api.get('/api/ingredient/show/'+idIngredient)
            .then((res)=>{
                var tempIngredientSelected=res.data
                _this.setState({
                    ingredientSelected:{
                        id_ingredient_dish:this.state.nextIdDishIngredient,
                        id_ingredient:tempIngredientSelected.id,
                        id_dish:this.state.dishSelected,
                        name:tempIngredientSelected.name,
                        img:tempIngredientSelected.img,
                    }
                })
            }) 
        }
    }
    onSubmit=(e)=>{  
        e.preventDefault();
        var selectDish=document.querySelector("#select-add-ingredient-to-dish"); 
        try {
            if(this.state.ingredientSelected!==null&&selectDish.value!=='none'){
                if(typeof this.props.ingredientsByDish!=='undefined'){
                    this.props.updateIngredientToDish(this.state.ingredientSelected);
                }
                else{
                    this.props.addIngredientToDishFromModal(this.state.ingredientSelected);
                } 
                closeModal(e);
                setTimeout(() => {
                    this.props.getIngredients();
                    this.props.setNextIdDishIngredient(parseInt(this.state.nextIdDishIngredient)+1);
                }, 400);
            }
        } catch (error) {
            console.log('An error occurs in AddIngredientToDish.onSubmit()');
            console.log(error);
        }
    }
    render(){
        if(this.state.ingredientsToAdd.length>0){
            return(
                <React.Fragment>
                    <div id="addIngredientForm">
                        <label htmlFor="select-add-ingredient-to-dish" style={{float:'left'}}>Please Select One Ingredient</label>
                        <select onChange={this.onChangeIngredient} id="select-add-ingredient-to-dish">
                                <option id="selected" value="none">Select One Ingredient</option>
                                {this.state.ingredientsToAdd.map(function(item, i){
                                    return <option key={i} value={item.id}>{item.name}</option>
                                })}
                        </select>
                        {
                            this.state.ingredientSelected ? <div id="img-selected">
                                <img src={this.state.ingredientSelected.img} alt={this.state.ingredientSelected.name} style={{maxWidth:'230px',float:'left'}}/>
                            </div> :''
                        }
                        <button onClick={this.onSubmit}  className="btn btn-success" form="addIngredientForm">Add to Dish</button>
                    </div>
                </React.Fragment>
            )
        }
        else{
            return(
                <React.Fragment>
                </React.Fragment>
            )
        }
    }
}
AddIngredientToDish.propTypes = {
    getIngredients: PropTypes.func.isRequired,
    addIngredientToDishFromModal: PropTypes.func.isRequired,
    setNextIdDishIngredient: PropTypes.func.isRequired, 
    updateIngredientToDish: PropTypes.func.isRequired
}
const mapStateToProps=state=>({ 
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    ingredients:state.ingredients.ingredients,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{getIngredients,addIngredientToDishFromModal,setNextIdDishIngredient,updateIngredientToDish})(AddIngredientToDish)