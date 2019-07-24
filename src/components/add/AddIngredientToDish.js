import React from 'react';
import {connect} from 'react-redux';
import {getIngredients} from '../../actions/ingredientActions';
import {addIngredientToDish,updateIngredientToDish} from '../../actions/ingredientByDishActions';
import {setNextIdDishIngredient} from '../../actions/modalActions';
import {closeModal} from '../../helper/modal.helper';
import api from '../../api/api';
class AddIngredientToDish extends React.Component{
    state={
        ingredientsToAdd:[],
        ingredientSelected:'',
        dishSelected:'',
        nextIdDishIngredient:0
    }
    async componentDidMount(){
        await this.props.getIngredients();  
        var _this=this;
        setTimeout(() => {
            _this.setState({
                ingredientsToAdd:_this.props.ingredients,
                dishSelected:_this.props.idDish
            })
        }, 900);
    }
    shouldComponentUpdate(nextProps, nextState){
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
        return true;
    }
    onChangeIngredient=(e)=>{
        e.preventDefault();
        var _this=this;
        var idIngredient=e.target.value;
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
        var _this=this;
        try {
            if(this.state.ingredientSelected!==null){
                closeModal(e);
                if(typeof _this.props.ingredientsByDish!=='undefined'){
                    _this.props.updateIngredientToDish(this.state.ingredientSelected);
                }
                else{
                    _this.props.addIngredientToDish(this.state.ingredientSelected);
                }
                setTimeout(() => {
                    _this.props.getIngredients();
                    _this.props.setNextIdDishIngredient(parseInt(this.state.nextIdDishIngredient)+1);
                }, 1000);
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
                    <form onSubmit={(e)=>this.onSubmit(e)} id="addIngredientForm">
                        <select onChange={(e)=>this.onChangeIngredient(e)}>
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
                        <button type="submit" className="btn btn-success" form="addIngredientForm">Add to Dish</button>
                    </form>
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
const mapStateToProps=state=>({
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    ingredients:state.ingredients.ingredients,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{getIngredients,addIngredientToDish,setNextIdDishIngredient,updateIngredientToDish})(AddIngredientToDish)