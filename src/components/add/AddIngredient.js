import React,{Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {addIngredient} from "../../actions/ingredientActions";
class AddIngredient extends Component{
    constructor(props){
        super(props);
        this.state={
            idIngredient:'',
            name:'',
            img:'',
            error:false
        }
        this.nameIngredient=this.nameIngredient.bind(this);
        this.imgIngredient=this.imgIngredient.bind(this);
        this.addNewIngredient=this.addNewIngredient.bind(this);
        this.idIngredient=this.idIngredient.bind(this);
    }
    idIngredient(e){
        this.setState({
            idIngredient:e.target.value
        });
    }
    nameIngredient(e){
        this.setState({
            name:e.target.value
        });
    }
    
    imgIngredient(e){
        this.setState({
            img:e.target.files[0]
        });//console.log(e.target.files[0]);
    }
    addNewIngredient(e){
        const {
            idIngredient ,
            name,
            img
        } =this.state;
        if(name===''||img==''){
            this.setState({
                error:true
            });
            e.preventDefault();
        }
        else{
            this.setState({
                error:false
            });
        }  
    }
    componentDidMount(){
        var totalOfItems=0;var idString;
        axios.get('http://localhost:49652/api/ingredients')
            .then(response => {
                for(var properties in response.data) {
                        ++totalOfItems;
                }
            }).then(()=>{
                idString=totalOfItems+1+'ING';//console.log(idString); 
            })
            .catch(error => {
                console.log(error);
        });
        setTimeout(() => {
            this.setState({
                idIngredient:idString
            });
            console.log('this.state.idIngredient '+this.state.idIngredient);
        }, 300);
        
    }
    render(){
        const {error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Add New Ingredient</h2>
                            <form encType="multipart/form-data" onSubmit={this.addNewIngredient} 
                            method="post" action="/ingredient/add/">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.idIngredient} 
                                    onChange={this.idIngredient} name="idIngredient" style={{display:'none'}}
                                     name="idIngredient"/>
                                    <input type="text" onChange={this.nameIngredient} name="name"
                                     className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" onChange={this.imgIngredient} 
                                    className="form-control-file" 
                                    placeholder="Picture" name="img"/>
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
export default connect(null,{addIngredient})(AddIngredient);