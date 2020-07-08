import React from 'react';
import {connect} from "react-redux";
import {showEntree,updateEntree,editEntree,getEntrees} from "../../actions/entreeActions";
import {getIngredientsByDishId,deleteIngredientDish} from "../../actions/ingredientByDishActions";
import {setDishId,setAddIngredient,setNextIdDishIngredient} from '../../actions/modalActions';
import {openModal} from '../../helper/modal.helper';
import api from '../../api/api';
import PropTypes from 'prop-types';
export class EditEntree extends React.PureComponent{
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
        if(e){
            e.preventDefault();
        }
        this.props.setAddIngredient();
        setTimeout(() => {
            openModal();
        }, 500);
    }
    id=(e)=>{
        if(e){
            e.preventDefault();
        }
        this.setState({
            name:e.target.value
        });
    }
    componentDidMount=async()=>{
        const {id}=this.props.match.params;
        this.props.getEntrees();
        this.props.showEntree(id);
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
        if(nextProps.entree){
            const {id, name,price,description,category,picture}=nextProps.entree;
            this.setState({
                id,
                name,
                description,
                category,
                picture,
                price
            })
        }
    }
    nameEntree=(e)=>{
        if(e){
            e.preventDefault();
        }
        this.setState({
            name:e.target.value
        });
    }
    descriptionEntree=(e)=>{
        if(e){
            e.preventDefault();
        }
        this.setState({
            description:e.target.value
        });
    }
    pictureEntree=(e)=>{
        if(e){
            e.preventDefault();
        }
        if(e.target.files[0]!==null){
            this.setState({
                picture:e.target.files[0],
                changedPicture:true
            });
        }
    }
    categoryEntree=(e)=>{
        if(e){
            e.preventDefault();
        }
        this.setState({
            category:e.target.value
        });
    }
    priceEntree=(e)=>{
        if(e){
            e.preventDefault();
        }
        this.setState({
            price:e.target.value
        });
    }
    editEntree=(e)=>{
        if(e){
            e.preventDefault();
        }
        var {id ,name,description,price,category,picture,changedPicture} =this.state;
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
            var infoEntree={id,name,price,description,category,picture}
            formData.append('id',id);
            formData.append('name',name);
            formData.append('price',price);
            formData.append('description',description);
            formData.append('picture',picture);
            formData.append('category',category);
            try {
                if(changedPicture===false){
                    this.props.editEntree(infoEntree,id);
                }
                else{
                    this.props.updateEntree(formData,id);
                }
                if(this.props.ingredientsByDish.length>0 ){
                    this.saveIngredients(); 
                }
            } catch (error) {
                console.log('An error occurs in EditEntree.editEntree');
                console.log(error);
            }
            finally{
                setTimeout(() => { 
                    this.props.history.push('/admin/appetizers/');
                },2900);
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
        var {name,price,description,category,picture,error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit Appetizer</h2>
                            <form onSubmit={this.editEntree} id="form-entree-update" >
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" defaultValue={name} 
                                    onChange={(e)=>this.nameEntree(e)} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label style={{width:'100%'}}>Description</label> 
                                    <textarea  value={description} className="form-control"
                                    onChange={(e)=>this.descriptionEntree(e)} ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={picture} 
                                    onChange={(e)=>this.pictureEntree(e)} className="form-control-file"
                                     placeholder="Picture" />
                                    <img src={picture} style={{maxWidth:'400px'}} alt={name}/>
                                    <input type="text" defaultValue={picture} 
                                    className="form-control-file"
                                    readOnly="readOnly" name="picture" 
                                    id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" defaultValue={category} 
                                    onChange={(e)=>this.categoryEntree(e)} className="form-control"
                                     placeholder="Category" 
                                     name="category"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={price} 
                                    onChange={(e)=>this.priceEntree(e)} 
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
EditEntree.propTypes = {
    deleteIngredientDish: PropTypes.func.isRequired,
    setNextIdDishIngredient: PropTypes.func.isRequired,
    setDishId: PropTypes.func.isRequired,
    setAddIngredient: PropTypes.func.isRequired,
    getIngredientsByDishId: PropTypes.func.isRequired,
    showEntree: PropTypes.func.isRequired,
    editEntree: PropTypes.func.isRequired,
    updateEntree: PropTypes.func.isRequired,
    getEntrees: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    entree:state.entrees.entree,
    entrees:state.entrees.entrees,
    ingredientsByDish:state.ingredientsByDish.ingredientsByDish,
    idDish:state.modals.idDish,
    nextIdDishIngredient:state.modals.nextIdDishIngredient
})
export default connect(mapStateToProps,{deleteIngredientDish,setNextIdDishIngredient,
    setDishId,setAddIngredient,getIngredientsByDishId,
    showEntree,updateEntree,editEntree,getEntrees})(EditEntree);