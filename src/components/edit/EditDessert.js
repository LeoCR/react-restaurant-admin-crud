import React from 'react';
import {connect} from "react-redux";
import {showDessert,editDessert,updateDessert,getDesserts} from "../../actions/dessertActions";
import {getIngredientsByDishId,deleteIngredientDish} from "../../actions/ingredientByDishActions";
import {setDishId,setAddIngredient,setNextIdDishIngredient} from '../../actions/modalActions';
import {openModal} from '../../helper/modal.helper';
import api from '../../api/api';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
export class EditDessert extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:'',
            picture:'',
            price:'',
            pictureName:'',
            error:false,
            changedPicture:false,
            ingredientsByDish:[],
            isLoadig:true 
        }
    }
    onAddIngredient=(e)=>{
        if(e){
            e.preventDefault();
        }
        this.props.setAddIngredient();
        setTimeout(() => {
            openModal(e);
        }, 500);
    } 
    componentDidMount=async()=>{
        try {
            const _this=this; 
            const {id}=this.props.match.params;
            this.props.getDesserts();
            this.props.showDessert(id);
            this.props.setDishId(id);
            this.props.getIngredientsByDishId(id);
            await api.get('/api/ingredient-to-dish/count/')
            .then((res)=>{
                if(res.data.maxIngredientDishId){
                    const nextIdIngDish=parseInt(res.data.maxIngredientDishId)+1;
                    _this.props.setNextIdDishIngredient(nextIdIngDish)
                }
            })
            setTimeout(() => {
                if(this.props.dessert){
                    const {id, name,price,description,picture}=this.props.dessert;
                    this.setState({
                        id,
                        name,
                        description,
                        picture,
                        price,
                        isLoadig:false
                    })
                }
            }, 350);
        } catch (error) {
            console.log('An error occurs in EditDessert.componentDidMount()');
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.ingredientsByDish !== prevState.ingredientsByDish) {
          return({ ingredientsByDish: nextProps.ingredientsByDish });
        }
    }
    pictureDessert=(e)=>{
        if(e){
            e.preventDefault();
        }
        if(e.target.files[0]!==null){
            this.setState({
                picture:e.target.files[0],
                changedPicture:true,
                pictureName:e.target.files[0].name
            }); 
        } 
    }
    onChange=(e)=>{ 
        this.setState({
            [e.target.name]:e.target.value
        })
    } 
    editDessert=(e)=>{   
        if(e){
            e.preventDefault(); 
        }
        const { id , name, description, price, picture, changedPicture } =this.state;
        const formData=new FormData();
        if(name===''||price===''||description===''){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            const infoDessert={
                id,
                name,
                price,
                description,
                picture
            }
            formData.append('id',id);
            formData.append('name',name);
            formData.append('price',price);
            formData.append('description',description);
            formData.append('picture',picture);
            try {
                if(changedPicture===false){ 
                    this.props.editDessert(infoDessert,id);
                }
                else{
                    this.props.updateDessert(formData,id);
                }
                if(this.props.ingredientsByDish.length>0 ){
                    this.saveIngredients(); 
                }
            } catch (error) {
                console.log('An error occurs in EditDessert.editDessert');
                console.log(error);
            }
            setTimeout(() => { 
                this.props.history.push('/admin/desserts/');
            }, 1900);
        }
    }
    saveIngredients=async()=>{
        this.props.ingredientsByDish.forEach(async(ing) =>{
            await api.post('/api/ingredient-to-dish/add/',ing)
            .then((res)=>{
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
        });
    }
    deleteIngredientDish=(e,ing)=>{
        e.preventDefault();
        this.props.deleteIngredientDish(ing.id_ingredient_dish);
    }
    getIngredientsByDish=()=>{
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
    render(){
        const {name,price,description,picture,error} = this.state;
        return(
            (this.state.isLoadig===true)?<p>Loading Data, Please wait...</p>:<React.Fragment>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center">Edit Dessert</h2>
                                <form onSubmit={this.editDessert} id="form-dessert-update">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" defaultValue={this.state.id} 
                                        onChange={this.onChange} className="" style={{display:'none'}}
                                        name="id"/>
                                        <input type="text" defaultValue={name} onChange={(e)=>this.onChange(e)} 
                                        className="form-control" placeholder="Name"
                                        name="name" data-testid="name-dessert"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text" defaultValue={description} 
                                        onChange={(e)=>this.onChange(e)} className="form-control" 
                                        placeholder="Description"
                                        name="description" data-testid="description-dessert"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Picture</label>
                                        <input type="file" id="picture_upload" data-testid="picture-dessert" 
                                        onChange={(e)=>this.pictureDessert(e)} 
                                        className="form-control-file" placeholder="Picture" />
                                        {
                                                (this.state.changedPicture===false)?<img src={picture} style={{maxWidth:'400px'}} alt={name}/>:''
                                        }
                                        {this.state.pictureName && (
                                                <div id="picture_uploaded">
                                                    You have uploaded a file named {this.state.pictureName}
                                                </div>
                                        )} 
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="text" defaultValue={price}  
                                        onChange={(e)=>this.onChange(e)} 
                                        className="form-control" placeholder="Price" 
                                        name="price"  data-testid="price-dessert"/>
                                    </div>
                                    {this.getIngredientsByDish()}
                                {error ? 
                                <div className="font-weight-bold alert-danger text-center mt-4">
                                    All the fields are required
                                </div>
                                :''
                                }
                                    <button data-testid="btn-submit" type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
EditDessert.propTypes = {
    clearIngredientsByDish: PropTypes.func.isRequired,
    deleteIngredientDish: PropTypes.func.isRequired,
    setNextIdDishIngredient: PropTypes.func.isRequired,
    setDishId: PropTypes.func.isRequired,
    setAddIngredient: PropTypes.func.isRequired,
    getIngredientsByDishId: PropTypes.func.isRequired,
    showDessert: PropTypes.func.isRequired,
    editDessert: PropTypes.func.isRequired,
    updateDessert: PropTypes.func.isRequired,
    getDesserts: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    dessert:state.desserts.dessert,
    desserts:state.desserts.desserts,
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default withRouter(connect(mapStateToProps,{deleteIngredientDish,setNextIdDishIngredient,
    setDishId,setAddIngredient,
    getIngredientsByDishId,showDessert,editDessert,
    updateDessert,getDesserts})(EditDessert));