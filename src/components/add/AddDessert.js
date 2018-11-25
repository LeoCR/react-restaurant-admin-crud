import React,{Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {addDessert} from "../../actions/dessertActions";
class AddDessert extends Component{
    constructor(props){
        super(props);
        this.state={
            idDessert:'',
            name:'',
            description:'',
            picture:'',
            category:'',
            price:'',
            error:false
        }
        this.nameDessert=this.nameDessert.bind(this);
        this.descriptionDessert=this.descriptionDessert.bind(this);
        this.pictureDessert=this.pictureDessert.bind(this);
        this.categoryDessert=this.categoryDessert.bind(this);
        this.priceDessert=this.priceDessert.bind(this);
        this.addNewDessert=this.addNewDessert.bind(this);
        this.idDessert=this.idDessert.bind(this);
    }
    idDessert(e){
        this.setState({
            idDessert:e.target.value
        });
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
            picture:e.target.files[0]
        });
        console.log(e.target.files[0]);
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
    addNewDessert(e){
        const {
            idDessert ,
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
                idDessert,
                name,
                price,
                description,
                category,
                picture
            }
            console.log(infoDish);
            this.props.addDessert(infoDish);
            this.props.history.push('/');*/
        }  
    }
    componentDidMount(){
        var totalOfItems=0;var idString
        axios.get('http://www.isplusdesign.co.cr:49652/api/desserts')
            .then(response => {
                for(var properties in response.data) {
                        ++totalOfItems;
                }
            }).then(()=>{
                idString=totalOfItems+1+'DSSRT';//console.log(idString); 
            })
            .catch(error => {
                console.log(error);
        });
        setTimeout(() => {
            this.setState({
                idDessert:idString
            });
            console.log('this.state.idDessert '+this.state.idDessert);
        }, 300);
    }
    render(){
        const {error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Add New Dessert</h2>
                            <form encType="multipart/form-data" onSubmit={this.addNewDessert} 
                            method="post" action="/dessert/add/">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.idDessert} 
                                    onChange={this.idDessert} className="" style={{display:'none'}}
                                     name="idDessert"/>
                                    <input type="text" onChange={this.nameDessert} name="name"
                                     className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text"
                                        name="description"
                                     onChange={this.descriptionDessert} className="form-control" 
                                    placeholder="Description" />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" onChange={this.pictureDessert} 
                                    className="form-control-file" 
                                    placeholder="Picture" name="picture"/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" onChange={this.categoryDessert} 
                                    className="form-control"
                                    name="category"
                                     placeholder="Category" />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" onChange={this.priceDessert} 
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
export default connect(null,{addDessert})(AddDessert);