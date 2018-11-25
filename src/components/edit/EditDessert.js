import React,{Component} from 'react';
import {connect} from "react-redux";
import {showDessert,editDessert} from "../../actions/dessertActions";
class EditDessert extends Component{
    constructor(props){
        super(props);
        this.state={
            idDessert:'',
            name:'',
            description:'',
            picture:'',
            category:'',
            price:'',
            error:false,
            changedPicture:false
        }
        this.nameDessert=this.nameDessert.bind(this);
        this.descriptionDessert=this.descriptionDessert.bind(this);
        this.pictureDessert=this.pictureDessert.bind(this);
        this.categoryDessert=this.categoryDessert.bind(this);
        this.priceDessert=this.priceDessert.bind(this);
        this.editDessert=this.editDessert.bind(this);
        this.idDessert=this.idDessert.bind(this);
    }
    idDessert(e){
        this.setState({
            idDessert:e.target.value
        });
    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.showDessert(id);
    }
    componentWillReceiveProps(nextProps,nextState){
        const {idDessert, name,price,description,category,picture}=nextProps.dessert;
        this.setState({
            idDessert,
            name,
            description,
            category,
            picture,
            price
        })
        console.log(nextProps.dessert);
    }
    nameDessert(e){
        this.setState({
            name:e.target.value
        });
    }
    descriptionDessert(e){
        this.setState({
            description:e.target.value
        });
    }
    pictureDessert(e){
        this.setState({
            picture:e.target.files[0],
            changedPicture:true
        });  
        document.querySelector("#picture_upload").setAttribute("name","picture");
        document.querySelector("#picture_hidden").removeAttribute("name");
        document.querySelector("#form-dessert-update").setAttribute("action","/dessert/update/");
        document.querySelector("#form-dessert-update").setAttribute("method","post");
    }
    categoryDessert(e){
        this.setState({
            category:e.target.value
        });
    }
    priceDessert(e){
        this.setState({
            price:e.target.value
        });
    }
    editDessert(e){    
        const {
            idDessert ,
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
            const infoDessert={
                idDessert,
                name,
                price,
                description,
                category,
                picture
            }
            console.log(infoDessert); 
            if(changedPicture===false){
                this.props.editDessert(infoDessert);
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
                            <form encType="multipart/form-data" onSubmit={this.editDessert} 
                            id="form-dessert-update">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.idDessert} 
                                    onChange={this.idDessert} className="" style={{display:'none'}}
                                     name="idDessert"/>
                                    <input type="text" defaultValue={name} onChange={this.nameDessert} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" defaultValue={description} 
                                    onChange={this.descriptionDessert} className="form-control" 
                                    placeholder="Description"
                                    name="description" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={picture} 
                                    onChange={this.pictureDessert} className="form-control-file"
                                     placeholder="Picture" />
                                <input type="text" defaultValue={picture} className="form-control-file"
                                    readonly="readonly" name="picture" id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" defaultValue={category} 
                                    onChange={this.categoryDessert} className="form-control"
                                     placeholder="Category" 
                                     name="category"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={price} 
                                    onChange={this.priceDessert} 
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
    dessert:state.desserts.dessert
})
export default connect(mapStateToProps,{showDessert,editDessert})(EditDessert);