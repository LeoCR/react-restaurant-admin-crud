import React,{Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {addEntree} from "../../actions/entreeActions";
class AddEntree extends Component{
    constructor(props){
        super(props);
        this.state={
            idEntree:'',
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
        this.idEntree=this.idEntree.bind(this);
    }
    idEntree(e){
        this.setState({
            idEntree:e.target.value
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
        const {
            idEntree ,
            name,
            description,
            price,
            category,
            picture
        } =this.state;
        if(name===''||price===''||description===''||category==''||picture===''){
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
                idEntree,
                name,
                price,
                description,
                category,
                picture
            }
            console.log(infoDish);
            this.props.addStrongDish(infoDish);
            this.props.history.push('/');*/
        }  
    }
    componentDidMount(){
        var totalOfItems=0;var idString;
        axios.get('http://localhost:49652/api/entrees')
            .then(response => {
                for(var properties in response.data) {
                        ++totalOfItems;
                }
            }).then(()=>{
                idString=totalOfItems+1+'ENTR';//console.log(idString); 
            })
            .catch(error => {
                console.log(error);
        });
        setTimeout(() => {
            this.setState({
                idEntree:idString
            });
            console.log('this.state.idEntree '+this.state.idEntree);
        }, 300);
        
    }
    render(){
        const {error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Add New Entree</h2>
                            <form encType="multipart/form-data" onSubmit={this.addNewStrongDish} 
                            method="post" action="/entree/add/">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.idEntree} 
                                    onChange={this.idEntree} className="" style={{display:'none'}}
                                     name="idEntree"/>
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
                                    <label>Category</label>
                                    <input type="text" onChange={this.categoryDish} 
                                    className="form-control"
                                    name="category"
                                     placeholder="Category" />
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
export default connect(null,{addEntree})(AddEntree);