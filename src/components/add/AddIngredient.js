import React from 'react';
import api from "../../api/api";
import {connect} from "react-redux";
import {addIngredient,getIngredients} from "../../actions/ingredientActions";
class AddIngredient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            img:'',
            error:false
        }
    }
    id=(e)=>{
        this.setState({
            id:e.target.value
        });
    }
    nameIngredient=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    imgIngredient=(e)=>{
        if(e.target.files[0]!==null ||e.target.files[0]!==undefined){
            this.setState({
                img:e.target.files[0]
            });
        }
    }
    addNewIngredient=(e)=>{
        e.preventDefault();
        const {
            id ,
            name,
            img
        } =this.state;
        var formData = new FormData(),
        _this=this;
        if(name===''||img===''){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            formData.append('id',id);
            formData.append('name',name);
            formData.append('img',img); 
            this.props.addIngredient(formData);
            setTimeout(() => {
                _this.props.getIngredients();
                _this.props.history.push('/admin/ingredients'); 
            }, 900);
        } 
        
    }
    componentDidMount(){
        var totalOfItems=1;var idString;
        api.get('/api/ingredients')
            .then(response => {
                for(var i = 0; i <= response.data.length; ++i){
                        ++totalOfItems;
                }
            }).then(()=>{
                idString=totalOfItems+1+'ADDING';//console.log(idString); 
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
                            <h2 className="text-center">Add New Ingredient</h2>
                            <form onSubmit={this.addNewIngredient}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} name="id" style={{display:'none'}}
                                    />
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
const mapStateToProps=state=>({
    ingredients:state.ingredients.ingredients
})
export default connect(mapStateToProps,{addIngredient,getIngredients})(AddIngredient);