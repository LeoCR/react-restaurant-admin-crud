import React,{Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {addStrongDish} from "../../actions/strongDishActions";
class AddStrongDish extends Component{
    constructor(props){
        super(props);
        this.state={
            idStrongDish:'',
            name:'',
            description:'',
            picture:'',
            category:'',
            price:'',
            error:false
        }
        this.nameDish=this.nameDish.bind(this);
        this.descriptionDish=this.descriptionDish.bind(this);
        this.pictureDish=this.pictureDish.bind(this);
        this.categoryDish=this.categoryDish.bind(this);
        this.priceDish=this.priceDish.bind(this);
        this.addNewStrongDish=this.addNewStrongDish.bind(this);
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
            picture:e.target.value
        });
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
    addNewStrongDish(e){
        e.preventDefault();
        const {
            idStrongDish ,
            name,
            description,
            price,
            category,
            picture
        } =this.state;
        if(name===''||price===''||description===''||category==''||picture===''){
            this.setState({
                error:true
            })
        }
        else{
            this.setState({
                error:false
            });
            const infoDish={
                idStrongDish,
                name,
                price,
                description,
                category,
                picture
            }
            console.log(infoDish);
            this.props.addStrongDish(infoDish);
            this.props.history.push('/');
        }
    }
    componentDidMount(){
        var totalOfItems=0;var idString
        axios.get('http://www.isplusdesign.co.cr:49652/api/strongs-dish')
            .then(response => {
                for(var properties in response.data) {
                        ++totalOfItems;
                }
            }).then(()=>{
                idString=totalOfItems+1+'SGDH';//console.log(idString); 
            })
            .catch(error => {
                console.log(error);
        });
        setTimeout(() => {
            this.setState({
                idStrongDish:idString
            });
            console.log('this.state.idStrongDish '+this.state.idStrongDish);
        }, 900);
        
    }
    render(){
        const {error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Add New Dish</h2>
                            <form encType="multipart/form-data" onSubmit={this.addNewStrongDish}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" onChange={this.nameDish} className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" onChange={this.descriptionDish} className="form-control" placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" onChange={this.pictureDish} className="form-control-file" placeholder="Picture" />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" onChange={this.categoryDish} className="form-control" placeholder="Category" />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" onChange={this.priceDish} className="form-control" placeholder="Price" />
                                </div>
                            {error ? 
                            <div className="font-weight-bold alert-danger text-center mt-4">
                                All the fields are required
                            </div>
                            :''
                            }
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null,{addStrongDish})(AddStrongDish);