import React from 'react';
import api from "../../api/api";
import {connect} from "react-redux";
import {addStrongDish,getStrongsDishes} from "../../actions/strongDishActions";
import {deleteIngredientDish,clearIngredientsByDish} from "../../actions/ingredientByDishActions";
import {setDishId,setAddIngredient,setNextIdDishIngredient} from '../../actions/modalActions';
import {openModal} from '../../helper/modal.helper';
import {randomString} from '../../helper/randomString.helper';
import PropTypes from 'prop-types';
export class AddStrongDish extends React.PureComponent{
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
    onAddIngredient=(e)=>{
        e.preventDefault();
        this.props.setAddIngredient();
        setTimeout(() => {
            openModal();
        }, 500);
    }
    id=(e)=>{
        this.setState({
            id:e.target.value
        });
    }
    nameDish=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    descriptionDish=(e)=>{
        this.setState({
            description:e.target.value
        });
    }
    pictureDish=(e)=>{
        if(e.target.files[0]!==null ||e.target.files[0]!==undefined){
            this.setState({
                picture:e.target.files[0],
                pictureName:e.target.files[0].name
            });
        }
    }
    categoryDish=(e)=>{
        this.setState({
            category:e.target.value
        });
    }
    priceDish=(e)=>{
        this.setState({
            price:e.target.value
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ingredientsByDish !== this.state.ingredientsByDish) {
          this.setState({ ingredientsByDish: nextProps.ingredientsByDish });
        }
    }
    addNewStrongDish=(e)=>{ 
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
        var formData = new FormData(),
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
            this.props.addStrongDish(formData);
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
                _this.props.getStrongsDishes();
                _this.props.history.push('/admin/main-courses'); 
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
        var totalOfItems=1, 
        idString='',
        _this=this;
        try {
            _this.props.clearIngredientsByDish();
            var customRandomString=randomString(4); 
            await api.get('/api/strongs-dishes')
                .then(response => {
                    for(var i = 0; i <= response.data.length; ++i){
                            ++totalOfItems;
                    }
                }).then(()=>{
                    idString=totalOfItems+1+'ADDEDBGD_'+customRandomString;//console.log(idString); 
                })
                .catch(error => {
                    console.log(error);
            });
            await api.get('/api/ingredient-to-dish/count/')
            .then((res)=>{
                if(res.data.maxIngredientDishId){
                    var nextIdIngDish=parseInt(res.data.maxIngredientDishId)+1;
                    _this.props.setNextIdDishIngredient(nextIdIngDish)
                }
            })
        } catch (error) {
            console.log('An error occurs in AddStrongDish');
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
                            <h2 className="text-center">Add New Main Course</h2>
                            <form onSubmit={this.addNewStrongDish}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" onChange={this.nameDish} name="name"
                                     className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text"
                                        name="description"
                                     onChange={this.descriptionDish} className="form-control" 
                                    placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" onChange={this.pictureDish} 
                                    className="form-control-file" 
                                    placeholder="Picture" name="picture"/>
                                    {this.state.pictureName && (
                                            <div id="picture_uploaded">
                                                You have uploaded a file named {this.state.pictureName}
                                            </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" onChange={this.categoryDish} 
                                    className="form-control"
                                    name="category"
                                     placeholder="Category" />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" onChange={this.priceDish} 
                                    className="form-control" 
                                    name="price"
                                    placeholder="Price" />
                                </div>
                                {this.state.ingredientsByDish?this.getIngredientsByDishId():''}
                            {error ? 
                            <div className="font-weight-bold alert-danger text-center mt-4">
                                All the fields are required
                            </div>
                            :''
                            }
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Add</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
AddStrongDish.propTypes = {
    clearIngredientsByDish: PropTypes.func.isRequired,
    deleteIngredientDish: PropTypes.func.isRequired,
    setNextIdDishIngredient: PropTypes.func.isRequired,
    setDishId: PropTypes.func.isRequired,
    setAddIngredient: PropTypes.func.isRequired,
    addStrongDish: PropTypes.func.isRequired,
    getStrongsDishes: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    strongsDishes:state.strongsDishes.strongsDishes,
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{clearIngredientsByDish,deleteIngredientDish,setNextIdDishIngredient,setDishId,setAddIngredient,addStrongDish,getStrongsDishes})(AddStrongDish);