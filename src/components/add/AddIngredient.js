import React from 'react';
import api from "../../api/api";
import {connect} from "react-redux";
import {addIngredient,getIngredients} from "../../actions/ingredientActions";
import {randomString} from '../../helper/randomString.helper';
import PropTypes from 'prop-types';
export class AddIngredient extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            img:'',
            error:false
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
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
        const formData = new FormData(),
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
    componentDidMount=async()=>{
        let totalOfItems=1,
        idString='',
        _this=this;
        const customRandomString=randomString(4);
        try {
            await api.get('/api/ingredients')
                .then(response => {
                    for(let i = 0; i <= response.data.length; ++i){
                            ++totalOfItems;
                    }
                }).then(()=>{
                    idString=totalOfItems+1+'ADDEDING_'+customRandomString;//console.log(idString); 
                })
                .catch(error => {
                    console.log(error);
            });
        } catch (error) {
            console.log('An error occurs in AddIngredient.componentDidMount');
            console.log(error); 
        }
        finally{
            setTimeout(() => {
                _this.setState({
                    id:idString
                });
                console.log('this.state.id '+this.state.id);
            }, 300);
        }
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
                                    onChange={this.onChange} name="id" style={{display:'none'}}
                                    />
                                    <input type="text" onChange={this.onChange} name="name"
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
AddIngredient.propTypes = {
    addIngredient: PropTypes.func.isRequired,
    getIngredients: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    ingredients:state.ingredients.ingredients
})
export default connect(mapStateToProps,{addIngredient,getIngredients})(AddIngredient);