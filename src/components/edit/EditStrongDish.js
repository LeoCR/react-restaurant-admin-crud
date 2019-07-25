import React,{Component} from 'react';
import {connect} from "react-redux";
import {showStrongDish,editStrongDish,updateStrongDish,getStrongsDishes} from "../../actions/strongDishActions";
import {getIngredientsByDishId,deleteIngredientDish} from "../../actions/ingredientByDishActions";
import {setDishId,setAddIngredient,setNextIdDishIngredient} from '../../actions/modalActions';
import {openModal} from '../../helper/modal.helper';
import api from '../../api/api';
class EditStrongDish extends Component{
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
        }, 500);
    }
    id=(e)=>{
        this.setState({
            id:e.target.value
        });
    }
    componentDidMount=async()=>{
        const {id}=this.props.match.params;
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
            const {id, name,price,description,category,picture}=nextProps.strongDish;
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
        if(e.target.files[0]!==null){
            this.setState({
                picture:e.target.files[0],
                changedPicture:true
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
    editStrongDish=(e)=>{    
        e.preventDefault();
        const {
            id ,
            name,
            description,
            price,
            category,
            picture,
            changedPicture
        } =this.state;
        var formData=new FormData(),
        _this=this;
        if(name===''||price===''||description===''||category===''){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            const infoDish={
                id,
                name,
                price,
                description,
                category,
                picture
            }
            if(changedPicture===false){
                this.props.editStrongDish(infoDish);
            }
            else{
                formData.append('id',id);
                formData.append('name',name);
                formData.append('price',price);
                formData.append('description',description);
                formData.append('picture',picture);
                formData.append('category',category);
                this.props.updateStrongDish(formData);
            }
            if(this.props.ingredientsByDish.length>0 ){
                this.props.ingredientsByDish.forEach(function(ing) {
                    api.post('/api/ingredient-to-dish/add/',ing)
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                });
            }
            this.props.getStrongsDishes();
            setTimeout(() => {
                _this.props.history.push('/admin/strongs-dishes'); 
            }, 900); 
        }
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
        const {name,price,description,category,picture,error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit a Strong Dish</h2>
                            <form encType="multipart/form-data" onSubmit={this.editStrongDish} 
                            id="form-strong-dish-update">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" defaultValue={name} onChange={this.nameDish} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" defaultValue={description} 
                                    onChange={this.descriptionDish} className="form-control" 
                                    placeholder="Description"
                                    name="description" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={picture} 
                                    onChange={this.pictureDish} className="form-control-file"
                                     placeholder="Picture" />
                                     <img src={picture} style={{maxWidth:'400px'}} alt={name}/>
                                <input type="text" defaultValue={picture} className="form-control-file"
                                    readonly="readonly" name="picture" id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" defaultValue={category} 
                                    onChange={this.categoryDish} className="form-control"
                                     placeholder="Category" 
                                     name="category"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={price} 
                                    onChange={this.priceDish} 
                                    className="form-control"
                                     placeholder="Price" 
                                     name="price"
                                     />
                                </div>
                            {this.getIngredientsByDish()}
                            {error ? 
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
const mapStateToProps=state=>({
    strongDish:state.strongsDishes.strongDish,
    strongsDishes:state.strongsDishes.strongsDishes,
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{deleteIngredientDish,setNextIdDishIngredient,setDishId,setAddIngredient,getIngredientsByDishId,showStrongDish,editStrongDish,updateStrongDish,getStrongsDishes})(EditStrongDish);