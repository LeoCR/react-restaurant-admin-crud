import React,{Component} from 'react';
import {connect} from "react-redux";
import {showStrongDish,editStrongDish,updateStrongDish,getStrongsDishes} from "../../actions/strongDishActions";
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
            changedPicture:false
        }
    }
    id=(e)=>{
        this.setState({
            id:e.target.value
        });
    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.showStrongDish(id);
    }
    componentWillReceiveProps(nextProps,nextState){
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
            this.props.getStrongsDishes();
            setTimeout(() => {
                _this.props.history.push('/admin/strongs-dishes'); 
            }, 900); 
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
    strongsDishes:state.strongsDishes.strongsDishes
})
export default connect(mapStateToProps,{showStrongDish,editStrongDish,updateStrongDish,getStrongsDishes})(EditStrongDish);