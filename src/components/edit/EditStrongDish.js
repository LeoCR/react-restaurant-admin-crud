import React,{Component} from 'react';
import {connect} from "react-redux";
import {showStrongDish,editStrongDish} from "../../actions/strongDishActions";
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
        this.nameDish=this.nameDish.bind(this);
        this.descriptionDish=this.descriptionDish.bind(this);
        this.pictureDish=this.pictureDish.bind(this);
        this.categoryDish=this.categoryDish.bind(this);
        this.priceDish=this.priceDish.bind(this);
        this.editStrongDish=this.editStrongDish.bind(this);
        this.id=this.id.bind(this);
    }
    id(e){
        this.setState({
            id:e.target.value
        });

    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.showStrongDish(id);
    }
    componentWillReceiveProps(nextProps,nextState){
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
    nameDish(e){
        this.setState({
            name:e.target.value
        });
    }
    descriptionDish(e){
        this.setState({
            description:e.target.value
        });
    }
    pictureDish(e){
        this.setState({
            picture:e.target.files[0],
            changedPicture:true
        });  
        document.querySelector("#picture_upload").setAttribute("name","picture");
        document.querySelector("#picture_hidden").removeAttribute("name");
        document.querySelector("#form-strong-dish-update").setAttribute("action","/strong-dish/update/");
        document.querySelector("#form-strong-dish-update").setAttribute("method","post");
    }
    categoryDish(e){
        this.setState({
            category:e.target.value
        });
    }
    priceDish(e){
        this.setState({
            price:e.target.value
        });
    }
    editStrongDish(e){    
        const {
            id ,
            name,
            description,
            price,
            category,
            picture,
            changedPicture
        } =this.state;
        if(name===''||price===''||description===''||category===''){
            this.setState({
                error:true
            });
            e.preventDefault();
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
            console.log(infoDish); 
            if(changedPicture===false){
                this.props.editStrongDish(infoDish);
                this.props.history.push('/');
            }
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
    strongDish:state.strongsDishes.strongDish
})
export default connect(mapStateToProps,{showStrongDish,editStrongDish})(EditStrongDish);