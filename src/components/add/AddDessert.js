import React,{Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {addDessert} from "../../actions/dessertActions";
class AddDessert extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
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
        this.priceDessert=this.priceDessert.bind(this);
        this.addNewDessert=this.addNewDessert.bind(this);
        this.id=this.id.bind(this);
    }
    id(e){
        this.setState({
            id:e.target.value
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
    
    priceDessert(e){
        this.setState({
            price:e.target.value
        });
    }
    addNewDessert(e){
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
            }); 
            const infoDish={
                id,
                name,
                price,
                description,
                picture
            }
            console.log(infoDish);
            //this.props.addDessert(infoDish);
            //this.props.history.push('/'); 
        }  
    }
    componentDidMount(){
        var totalOfItems=0;var idString
        axios.get('http://localhost:49652/api/desserts')
            .then(response => {
                for(var i = 0; i < response.data.length; ++i){
                    ++totalOfItems;
                }
            }).then(()=>{
                idString=totalOfItems+1+'DESRT';//console.log(idString); 
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
                            <h2 className="text-center">Add New Dessert</h2>
                            <form encType="multipart/form-data" onSubmit={this.addNewDessert} 
                            method="post" action="/api/dessert/add/">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
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