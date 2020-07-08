import React from 'react';
import {connect} from "react-redux";
import {showStrongDish,editStrongDish,updateStrongDish,getStrongsDishes} from "../../actions/strongDishActions";
import {getIngredientsByDishId,deleteIngredientDish} from "../../actions/ingredientByDishActions";
import {setDishId,setAddIngredient,setNextIdDishIngredient} from '../../actions/modalActions';
import {openModal} from '../../helper/modal.helper';
import api from '../../api/api';
import PropTypes from 'prop-types';
class EditStrongDish extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
                id:'',
                name:'',
                description:'',
                picture:'',
                category:'',
                price:'',
                error:false,
                changedPicture:false,
                ingredientsByDish:[]
        }
    }
    onAddIngredient=(e)=>{
        e.preventDefault();
        this.props.setAddIngredient();
        setTimeout(() => {
            openModal();
        }, 700);
    }
    id=(e)=>{
        this.setState({
            id:e.target.value
        });
    }
    componentDidMount=async()=>{
        var {id}=this.props.match.params;
        this.props.getStrongsDishes();
        this.props.showStrongDish(id);
        this.props.setDishId(id);
        this.props.getIngredientsByDishId(id);
        var _this=this;
        await api.get('/api/ingredient-to-dish/count/')
        .then((res)=>{
            if(res.data.maxIngredientDishId){
                var nextIdIngDish=parseInt(res.data.maxIngredientDishId)+1;
                _this.props.setNextIdDishIngredient(nextIdIngDish)
            }
        })
    }
    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.ingredientsByDish){
            this.setState({
                ingredientsByDish:nextProps.ingredientsByDish
            })
        }
        if(nextProps.strongDish){
            var {id, name,price,description,category,picture}=nextProps.strongDish;
            this.setState({
                id,
                name,
                description,
                category,
                picture,
                price
            })
            console.log(nextProps.strongDish);
        }
    }
    nameDish=(e)=>{
        e.preventDefault();
        this.setState({
            name:e.target.value
        });
    }
    descriptionDish=(e)=>{
        e.preventDefault();
        this.setState({
            description:e.target.value
        });
    }
    pictureDish=(e)=>{
        e.preventDefault();
        if(e.target.files[0]!==null){
            this.setState({
                picture:e.target.files[0],
                changedPicture:true
            });  
        }
    }
    categoryDish=(e)=>{
        e.preventDefault();
        this.setState({
            category:e.target.value
        });
    }
    priceDish=(e)=>{
        e.preventDefault();
        this.setState({
            price:e.target.value
        });
    }
    editStrongDish=(e)=>{   
        if(e){
            e.preventDefault();
        }
        var { id , name, description, price, category, picture, changedPicture } =this.state;
        var formData=new FormData();
        if(name===''||price===''||description===''||category===''){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            var infoDish={
                id:id,
                name:name,
                price:price,
                description:description,
                category:category,
                picture:picture
            }
            formData.append('id',id);
            formData.append('name',name);
            formData.append('price',price);
            formData.append('description',description);
            formData.append('picture',picture);
            formData.append('category',category); 
            try {
                if(changedPicture===false){
                    console.log('infoDish');
                    console.log(infoDish);
                    console.log('id');
                    console.log(id);
                    this.props.editStrongDish(infoDish,id) 
                }
                else{
                     this.props.updateStrongDish(formData,id)
                }
                if(this.props.ingredientsByDish.length>0 ){
                    this.saveIngredients(); 
                }
            } catch (error) {
                console.log('An error occurs in EditStrongDish.editStrongDish');
                console.log(error);
            }
            finally{ 
                setTimeout(() => {
                    this.props.history.push('/admin/main-courses'); 
                }, 3900); 
            }
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
        if(e){
            e.preventDefault();
        }
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
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit a Main Course</h2>
                            <form encType="multipart/form-data" onSubmit={this.editStrongDish} 
                            id="form-strong-dish-update">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" defaultValue={this.state.name} onChange={(e)=>this.nameDish(e)} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" defaultValue={this.state.description} 
                                    onChange={(e)=>this.descriptionDish(e)} className="form-control" 
                                    placeholder="Description"
                                    name="description" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={this.state.picture} 
                                    onChange={(e)=>this.pictureDish(e)} className="form-control-file"
                                     placeholder="Picture" />
                                     <img src={this.state.picture} style={{maxWidth:'400px'}} alt={this.state.name}/>
                                <input type="text" defaultValue={this.state.picture} className="form-control-file"
                                    readonly="readonly" name="picture" id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" defaultValue={this.state.category} 
                                    onChange={(e)=>this.categoryDish(e)} className="form-control"
                                     placeholder="Category" 
                                     name="category"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={this.state.price} 
                                    onChange={(e)=>this.priceDish(e)} 
                                    className="form-control"
                                     placeholder="Price" 
                                     name="price"
                                     />
                                </div>
                            {this.getIngredientsByDish()}
                            {this.state.error ? 
                            <div className="font-weight-bold alert-danger text-center mt-4">
                                All the fields are required
                            </div>
                            :''
                            }
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
EditStrongDish.propTypes = {
    deleteIngredientDish: PropTypes.func.isRequired,
    setNextIdDishIngredient: PropTypes.func.isRequired,
    setDishId: PropTypes.func.isRequired,
    setAddIngredient: PropTypes.func.isRequired,
    getIngredientsByDishId: PropTypes.func.isRequired,
    showStrongDish: PropTypes.func.isRequired,
    editStrongDish: PropTypes.func.isRequired,
    updateStrongDish: PropTypes.func.isRequired,
    getStrongsDishes: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    strongDish:state.strongsDishes.strongDish,
    strongsDishes:state.strongsDishes.strongsDishes,
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{deleteIngredientDish,setNextIdDishIngredient,
    setDishId,setAddIngredient,getIngredientsByDishId,
    showStrongDish,editStrongDish,
    updateStrongDish,getStrongsDishes})(EditStrongDish);