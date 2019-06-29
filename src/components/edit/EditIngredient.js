import React,{Component} from 'react';
import {connect} from "react-redux";
import {showIngredient,editIngredient,updateIngredient,getIngredients} from "../../actions/ingredientActions";
class EditIngredient extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            img:'',
            name:'',
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
        this.props.showIngredient(id);
    }
    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.ingredient){
            const {id, name,img}=nextProps.ingredient;
            this.setState({
                id,
                name,
                img
            }) 
        } 
    }
    nameIngredient=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    imgIngredient=(e)=>{
        if(e.target.files[0]!==null){
            this.setState({
                img:e.target.files[0],
                changedPicture:true
            });
        }
    }
    
    editIngredient=(e)=>{ 
        e.preventDefault();
        const {
            id ,
            name,
            img,
            changedPicture
        } =this.state;
        var formData=new FormData(),
        _this=this;
        if(name===''){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            const infoIngredient={
                id ,
                name,
                img
            }
            if(changedPicture===false){
                console.log('changedPicture===false '+changedPicture);
                console.log(infoIngredient);
                this.props.editIngredient(infoIngredient);
            } 
            else{
                console.log('changedPicture===true '+changedPicture);
                
                formData.append('id',id);
                formData.append('name',name);
                formData.append('img',img);
                this.props.updateIngredient(formData);
            }
            this.props.getIngredients();
            setTimeout(() => {
                _this.props.history.push('/admin/ingredients');
            }, 900);
        }
    }
    render(){
        const {name,img,error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit an Ingredient</h2>
                            <form onSubmit={(e)=>this.editIngredient(e)} id="form-update-ingredient">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" defaultValue={name} onChange={this.nameIngredient} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={img} 
                                    onChange={this.imgIngredient} className="form-control-file"
                                     placeholder="Picture" />
                                    <img src={img} style={{maxWidth:'400px'}} alt={name}/> 
                                    <input type="text" defaultValue={img} className="form-control-file"
                                    readOnly="readonly" name="img" id="picture_hidden" style={{display:"none"}}/>
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
    ingredient:state.ingredients.ingredient,
    ingredients:state.ingredients.ingredients
})
export default connect(mapStateToProps,{showIngredient,editIngredient,updateIngredient,getIngredients})(EditIngredient);