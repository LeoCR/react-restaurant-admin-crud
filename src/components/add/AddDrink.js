import React,{Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {addDrink} from "../../actions/drinkActions";
class AddDrink extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:'',
            picture:'',
            price:'',
            error:false
        }
        this.nameDish=this.nameDish.bind(this);
        this.descriptionDish=this.descriptionDish.bind(this);
        this.pictureDish=this.pictureDish.bind(this);
        this.priceDish=this.priceDish.bind(this);
        this.addNewStrongDish=this.addNewStrongDish.bind(this);
        this.id=this.id.bind(this);
    }
    id(e){
        this.setState({
            id:e.target.value
        });
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
            picture:e.target.files[0]
        });
        console.log(e.target.files[0]);
    }
    priceDish(e){
        this.setState({
            price:e.target.value
        });
    }
    addNewStrongDish(e){
        const {
            id ,
            name,
            description,
            price,
            picture
        } =this.state;
        if(name===''||price===''||description===''||picture===''){
            this.setState({
                error:true
            });
            e.preventDefault();
        }
        else{
            this.setState({
                error:false
            });/*
            const infoDish={
                id,
                name,
                price,
                description,
                picture
            }
            console.log(infoDish);
            this.props.addStrongDish(infoDish);
            this.props.history.push('/');*/
        }  
    }
    componentDidMount(){
        var totalOfItems=0;var idString
        axios.get('http://localhost:49652/api/drinks')
            .then(response => {
                for(var properties in response.data) {
                        ++totalOfItems;
                }
            }).then(()=>{
                idString=totalOfItems+1+'DRK';//console.log(idString); 
            })
            .catch(error => {
                console.log(error);
        });
        setTimeout(() => {
            this.setState({
                id:idString
            });
            console.log('this.state.id '+this.state.id);
        }, 300);
        
    }
    render(){
        const {error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Add New Dish</h2>
                            <form encType="multipart/form-data" onSubmit={this.addNewStrongDish} 
                            method="post" action="/strong-dish/add/">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" onChange={this.nameDish} name="name"
                                     className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text"
                                        name="description"
                                     onChange={this.descriptionDish} className="form-control" 
                                    placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" onChange={this.pictureDish} 
                                    className="form-control-file" 
                                    placeholder="Picture" name="picture"/>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" onChange={this.priceDish} 
                                    className="form-control" 
                                    name="price"
                                    placeholder="Price" />
                                </div>
                            {error ? 
                            <div className="font-weight-bold alert-danger text-center mt-4">
                                All the fields are required
                            </div>
                            :''
                            }
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Add</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null,{addDrink})(AddDrink);