import React,{Component} from 'react';
import {connect} from "react-redux";
import {showDrink,editDrink} from "../../actions/drinkActions";
class EditDrink extends Component{
    constructor(props){
        super(props);
        this.state={
            idDrink:'',
            name:'',
            description:'',
            picture:'', 
            price:'',
            error:false,
            changedPicture:false
        }
        this.nameDrink=this.nameDrink.bind(this);
        this.descriptionDrink=this.descriptionDrink.bind(this);
        this.pictureDrink=this.pictureDrink.bind(this);
        
        this.priceDrink=this.priceDrink.bind(this);
        this.editStrongDrink=this.editStrongDrink.bind(this);
        this.idDrink=this.idDrink.bind(this);
    }
    idDrink(e){
        this.setState({
            idDrink:e.target.value
        });

    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.showDrink(id);
    }
    componentWillReceiveProps(nextProps,nextState){
        const {idDrink, name,price,description,picture}=nextProps.drink;
        this.setState({
            idDrink,
            name,
            description, 
            picture,
            price
        })
        console.log(nextProps.drink);
    }
    nameDrink(e){
        this.setState({
            name:e.target.value
        });
    }
    descriptionDrink(e){
        this.setState({
            description:e.target.value
        });
    }
    pictureDrink(e){
        this.setState({
            picture:e.target.files[0],
            changedPicture:true
        });  
        document.querySelector("#picture_upload").setAttribute("name","picture");
        document.querySelector("#picture_hidden").removeAttribute("name");
        document.querySelector("#form-drink-update").setAttribute("action","/drink/update/");
        document.querySelector("#form-drink-update").setAttribute("method","post");
    }
    
    priceDrink(e){
        this.setState({
            price:e.target.value
        });
    }
    editStrongDrink(e){    
        const {
            idDrink ,
            name,
            description,
            price,
            picture,
            changedPicture
        } =this.state;
        if(name===''||price===''||description===''){
            this.setState({
                error:true
            });
            e.preventDefault();
        }
        else{
            this.setState({
                error:false
            });
            const infoDrink={
                idDrink,
                name,
                price,
                description,
                picture
            }
            console.log(infoDrink); 
            if(changedPicture===false){
                this.props.editDrink(infoDrink);
                this.props.history.push('/');
            }
        }
    }
    
    render(){
        const {name,price,description,picture,error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit a Drink</h2>
                            <form encType="multipart/form-data" onSubmit={this.editStrongDrink} 
                            id="form-drink-update">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.idDrink} 
                                    onChange={this.idDrink} className="" style={{display:'none'}}
                                     name="idDrink"/>
                                    <input type="text" defaultValue={name} onChange={this.nameDrink} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" defaultValue={description} 
                                    onChange={this.descriptionDrink} className="form-control" 
                                    placeholder="Description"
                                    name="description" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={picture} 
                                    onChange={this.pictureDrink} className="form-control-file"
                                     placeholder="Picture" />
                                <input type="text" defaultValue={picture} className="form-control-file"
                                    readonly="readonly" name="picture" id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={price} 
                                    onChange={this.priceDrink} 
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
    drink:state.drinks.drink
})
export default connect(mapStateToProps,{showDrink,editDrink})(EditDrink);