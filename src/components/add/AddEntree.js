import React from 'react';
import api from "../../api/api";
import {connect} from "react-redux";
import {addEntree,getEntrees} from "../../actions/entreeActions";
import {deleteIngredientDish,clearIngredientsByDish} from "../../actions/ingredientByDishActions";
import {setDishId,setAddIngredient,setNextIdDishIngredient} from '../../actions/modalActions';
import {openModal} from '../../helper/modal.helper';
import {randomString} from '../../helper/randomString.helper';
import PropTypes from 'prop-types';
export class AddEntree extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:'',
            picture:'',
            pictureName:'',
            category:'',
            price:'',
            error:false,
            ingredientsByDish:[]
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.ingredientsByDish !== prevState.ingredientsByDish) {
          return({ ingredientsByDish: nextProps.ingredientsByDish });
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }  
    onAddIngredient=(e)=>{
        e.preventDefault();
        this.props.setAddIngredient();
        setTimeout(() => {
            openModal(e);
        }, 500);
    }
    pictureDish=(e)=>{
        if(e.target.files[0]!==null ||e.target.files[0]!==undefined){
            this.setState({
                picture:e.target.files[0],
                pictureName:e.target.files[0].name
            });
        }
    } 
    addNewEntree=(e)=>{
        if(e){
            e.preventDefault();
        }
        const {
            id ,
            name,
            description,
            price,
            category,
            picture
        } =this.state;
        const formData = new FormData(),
        _this=this;
        if(name===''||price===''||description===''||category===''||picture===''){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            formData.append('id',id);
            formData.append('name',name);
            formData.append('price',price);
            formData.append('description',description);
            formData.append('picture',picture)
            formData.append('category',category);
            this.props.addEntree(formData);
            if(typeof this.props.ingredientsByDish!=='undefined' && this.props.ingredientsByDish.length > 0){
                setTimeout(() => {
                        _this.props.ingredientsByDish.forEach(function(ing) {
                            api.post('/api/ingredient-to-dish/add/',ing)
                            .then((res)=>{
                                console.log(res);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        });
                },900);
            }
            setTimeout(() => {
                _this.props.getEntrees();
                _this.props.history.push('/admin/appetizers'); 
            }, 1900);
        }  
    }
    deleteIngredientDish=(e,ing)=>{
        e.preventDefault();
        this.props.deleteIngredientDish(ing.id_ingredient_dish);
    }
    getIngredientsByDishId=()=>{
        if(this.state.ingredientsByDish.length>0 ){
            return(
                <React.Fragment>
                    <h1>Ingredients</h1>
                    <button id="add-ingredient" className="btn btn-success" 
                        onClick={(e)=>this.onAddIngredient(e)}>
                            Add Ingredient
                    </button>
                    <div className="ingredients-container">
                        {this.state.ingredientsByDish.map(ing=>
                            <div className="ing-box">
                                <button className="btn btn-delete" onClick={(e)=>this.deleteIngredientDish(e,ing)}>X</button>
                                <h5>{ing.name}</h5>
                                <img src={ing.img} alt={ing.name} style={{maxWidth:'130px',float:'left',margin:'10px',maxHeight:'80px'}}/>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )
        }  
        else{
            return(
                <React.Fragment>
                    <button id="add-ingredient" className="btn btn-success" 
                        onClick={(e)=>this.onAddIngredient(e)}>
                            Add Ingredient
                    </button>
                    <p>No Ingredients</p>       
                </React.Fragment>
            )
        }  
    }
    componentDidMount=async()=>{
        let totalOfItems=1, 
        idString='',
        _this=this;
        const customRandomString=randomString(4);
        try {
            _this.props.clearIngredientsByDish();
            await api.get('/api/entrees')
                .then(response => {
                    for(let i = 0; i <=response.data.length; ++i){
                        ++totalOfItems;
                    }
                }).then(()=>{
                    idString=totalOfItems+1+'ADDEDENTR_'+customRandomString;//console.log(idString); 
                })
                .catch(error => {
                    console.log(error);
            });
            await api.get('/api/ingredient-to-dish/count/')
            .then((res)=>{
                if(res.data.maxIngredientDishId){
                    const nextIdIngDish=parseInt(res.data.maxIngredientDishId)+1;
                    _this.props.setNextIdDishIngredient(nextIdIngDish)
                }
            })
        } catch (error) {
            console.log('An error occurs AddEntree.componentDidMount');
            console.log(error);
        }
        finally{
            setTimeout(() => {
                _this.setState({
                    id:idString
                });
                _this.props.setDishId(idString); 
            }, 300);
        }
    }
    render(){
        const {error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Add New Appetizer</h2>
                            <form onSubmit={this.addNewEntree} >
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.onChange} className="" style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" onChange={this.onChange} name="name"
                                     className="form-control" placeholder="Name" data-testid="name-entree"/>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text"
                                        name="description"
                                     onChange={this.onChange} className="form-control" 
                                    placeholder="Description" data-testid="description-entree"/>
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" onChange={this.pictureDish} 
                                    className="form-control-file" 
                                    placeholder="Picture" name="picture" data-testid="picture-entree"/>
                                    {this.state.pictureName && (
                                    <div id="picture_uploaded">
                                        You have uploaded a file named {this.state.pictureName}
                                    </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" onChange={this.onChange} 
                                    className="form-control"
                                    name="category"
                                     placeholder="Category"  data-testid="category-entree"/>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" onChange={this.onChange} 
                                    className="form-control" 
                                    name="price"
                                    placeholder="Price"  data-testid="price-entree"/>
                                </div>
                                {this.state.ingredientsByDish?this.getIngredientsByDishId():''}
                            {error ? 
                            <div className="font-weight-bold alert-danger text-center mt-4">
                                All the fields are required
                            </div>
                            :''
                            }
                                <button data-testid="btn-submit" type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Add</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
AddEntree.propTypes = {
    clearIngredientsByDish: PropTypes.func.isRequired,
    deleteIngredientDish: PropTypes.func.isRequired,
    setNextIdDishIngredient: PropTypes.func.isRequired,
    setDishId: PropTypes.func.isRequired,
    setAddIngredient: PropTypes.func.isRequired,
    addEntree: PropTypes.func.isRequired,
    getEntrees: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    entrees:state.entrees.entrees,
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{clearIngredientsByDish,deleteIngredientDish,setNextIdDishIngredient,setDishId,setAddIngredient,addEntree,getEntrees})(AddEntree);