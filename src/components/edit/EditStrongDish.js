import React,{Component} from 'react';
import {connect} from "react-redux";
import {showStrongDish} from "../../actions/strongDishActions";
class EditStrongDish extends Component{
    constructor(props){
        super(props);
        this.state={
            idStrongDish:'',
            name:'',
            description:'',
            picture:'',
            category:'',
            price:'',
            error:true
        }
        this.nameDish=this.nameDish.bind(this);
        this.descriptionDish=this.descriptionDish.bind(this);
        this.pictureDish=this.pictureDish.bind(this);
        this.categoryDish=this.categoryDish.bind(this);
        this.priceDish=this.priceDish.bind(this);
        this.editStrongDish=this.editStrongDish.bind(this);
        this.idStrongDish=this.idStrongDish.bind(this);
    }
    idStrongDish(e){
        this.setState({
            name:e.target.value
        });

    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.showStrongDish(id);
    }
    componentWillReceiveProps(nextProps,nextState){
        const {idStrongDish, name,price,description,category,picture}=nextProps.strongDish;
        this.setState({
            idStrongDish,
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
            //picture:e.target.value
            picture:e.target.files[0]
        });
        const {
            idStrongDish ,
            name,
            description,
            price,
            category,
            picture
        } =this.state;
        
        if(name!==''||price!==''||description!==''||category!==''){
            document.querySelector('#form-update').setAttribute("action", "/strong-dish/update/");
            document.querySelector('#form-update').setAttribute("method", "post");
        }
        
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
            idStrongDish ,
            name,
            description,
            price,
            category,
            picture
        } =this.state;
        if(name===''||price===''||description===''||category===''||picture===''){
            this.setState({
                error:true
            });
            e.preventDefault();
        }
        else{
            this.setState({
                error:false
            });
            /* const infoDish={
                idStrongDish,
                name,
                price,
                description,
                category,
                picture
            }
            console.log(infoDish); */
            //this.props.addStrongDish(infoDish);
            //this.props.history.push('/');
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
                            id="form-update">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.idStrongDish} 
                                    onChange={this.idStrongDish} className="" style={{display:'none'}}
                                     name="idStrongDish"/>
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
                                    <input type="file" defaultValue={picture} 
                                    onChange={this.pictureDish} className="form-control-file"
                                     placeholder="Picture" name="picture"/>
                                <input type="text" defaultValue={picture} 
                                    onChange={this.pictureDish} className="form-control-file"
                                    readonly="readonly" />
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
export default connect(mapStateToProps,{showStrongDish})(EditStrongDish);