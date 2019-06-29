import React,{Component} from 'react';
import {connect} from "react-redux";
import {showDessert,editDessert,updateDessert,getDesserts} from "../../actions/dessertActions";
class EditDessert extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:'',
            picture:'',
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
        this.props.showDessert(id);
    }
    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.dessert){
            const {id, name,price,description,picture}=nextProps.dessert;
            this.setState({
                id,
                name,
                description,
                picture,
                price
            })
        }
    }
    nameDessert=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    descriptionDessert=(e)=>{
        this.setState({
            description:e.target.value
        });
    }
    pictureDessert=(e)=>{
        if(e.target.files[0]!==null){
            this.setState({
                picture:e.target.files[0],
                changedPicture:true
            }); 
        } 
    }
    priceDessert=(e)=>{
        this.setState({
            price:e.target.value
        });
    }
    editDessert=(e)=>{   
        e.preventDefault(); 
        const {
            id ,
            name,
            description,
            price,
            picture,
            changedPicture
        } =this.state;
        var formData=new FormData(),
        _this=this;
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
            if(changedPicture===false){
                this.props.editDessert(infoDessert);
            }
            else{
                formData.append('id',id);
                formData.append('name',name);
                formData.append('price',price);
                formData.append('description',description);
                formData.append('picture',picture);
                this.props.updateDessert(formData);
            }
            this.props.getDesserts();
            setTimeout(() => {
                _this.props.history.push('/admin/desserts/');
            }, 900);
        }
    }
    render(){
        const {name,price,description,picture,error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit a Dessert</h2>
                            <form onSubmit={this.editDessert} id="form-dessert-update">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
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
                                    onChange={this.pictureDessert} className="form-control-file" placeholder="Picture" />
                                    <img src={picture} style={{maxWidth:'400px'}} alt={name}/>
                                    <input type="text" defaultValue={picture} className="form-control-file" 
                                    readonly="readonly" name="picture" id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={price}  onChange={this.priceDessert} 
                                     className="form-control" placeholder="Price" name="price" />
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
    dessert:state.desserts.dessert,
    desserts:state.desserts.desserts
})
export default connect(mapStateToProps,{showDessert,editDessert,updateDessert,getDesserts})(EditDessert);