import React from 'react';
import api from "../../api/api";
import {connect} from "react-redux";
import {addDessert,getDesserts} from "../../actions/dessertActions";
import {deleteIngredientDish,clearIngredientsByDish} from "../../actions/ingredientByDishActions";
import {setDishId,setAddIngredient,setNextIdDishIngredient} from '../../actions/modalActions';
import {openModal} from '../../helper/modal.helper';
import {randomString} from '../../helper/randomString.helper';
import PropTypes from 'prop-types';
export class AddDessert extends React.PureComponent{
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
    onAddIngredient=(e)=>{
        e.preventDefault();
        this.props.setAddIngredient();
        setTimeout(() => {
            openModal(e);
        }, 500);
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }  
    pictureDessert=(e)=>{
        if(e.target.files[0]!==null ||e.target.files[0]!==undefined){
            this.setState({
                picture:e.target.files[0],
                pictureName:e.target.files[0].name
            }); 
        }
    }  
    addNewDessert=(e)=>{
        if(e){
            e.preventDefault();
        }
        const {
            id ,
            name,
            description,
            price,
            picture
        } =this.state;
        const formData = new FormData(),
        _this=this;
        if(name===''||price===''||description===''||picture===''){
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
            formData.append('picture',picture);
            this.props.addDessert(formData);
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
                }, 900);
            }
             setTimeout(() => {
                _this.props.getDesserts();
                _this.props.history.push('/admin/desserts'); 
            }, 1900); 
        }  
    }
    deleteIngredientDish=(e,ing)=>{
        e.preventDefault();
        this.props.deleteIngredientDish(ing.id_ingredient_dish);
    }
    getIngredientsByDishId=()=>{
        if(this.state.ingredientsByDish.length>0){
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
        try { 
            _this.props.clearIngredientsByDish();
            const customRandomString=randomString(4);
            await api.get('/api/desserts')
                .then(response => {
                    for(let i = 0; i <= response.data.length; ++i){
                        ++totalOfItems;
                    }
                }).then(()=>{
                    idString=totalOfItems+1+'ADDEDDESRT_'+customRandomString;//console.log(idString); 
                })
                .catch(error => {
                    console.log('An error occurs in AddDessert.componentDidMount() but dont worry about');
            });
            await api.get('/api/ingredient-to-dish/count/')
            .then((res)=>{
                if(res.data.maxIngredientDishId){
                    var nextIdIngDish=parseInt(res.data.maxIngredientDishId)+1;
                    _this.props.setNextIdDishIngredient(nextIdIngDish)
                }
            })
        } catch (error) {
            console.log('An error occurs in AddDessert.componentDidMount');
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
                            <h2 className="text-center">Add New Dessert</h2>
                            <form onSubmit={this.addNewDessert} data-testid="form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.onChange} style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" onChange={this.onChange} name="name" data-testid="name-dessert"
                                     className="form-control name-dessert" placeholder="Name" id="name"/>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text"
                                        name="description" data-testid="description-dessert"
                                     onChange={this.onChange} className="form-control" 
                                    placeholder="Description" id="description"/>
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" onChange={this.pictureDessert} 
                                    className="form-control-file" id="picture" data-testid="picture-dessert"
                                    placeholder="Picture" name="picture"/>
                                            {this.state.pictureName && (
                                            <div id="picture_uploaded">
                                                You have uploaded a file named {this.state.pictureName}
                                            </div>
                                            )}
                                </div>
                                
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" onChange={this.onChange} 
                                    className="form-control" data-testid="price-dessert"
                                    name="price" id="price"
                                    placeholder="Price" />
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
AddDessert.propTypes = {
    clearIngredientsByDish: PropTypes.func.isRequired,
    deleteIngredientDish: PropTypes.func.isRequired,
    setNextIdDishIngredient: PropTypes.func.isRequired,
    setDishId: PropTypes.func.isRequired,
    setAddIngredient: PropTypes.func.isRequired,
    addDessert: PropTypes.func.isRequired,
    getDesserts: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    desserts:state.desserts.desserts,
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{clearIngredientsByDish,deleteIngredientDish,setNextIdDishIngredient,setDishId,setAddIngredient,addDessert,getDesserts})(AddDessert);