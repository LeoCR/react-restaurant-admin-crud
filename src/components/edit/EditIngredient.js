import React,{Component} from 'react';
import {connect} from "react-redux";
import {showIngredient,editIngredient} from "../../actions/ingredientActions";
class EditIngredient extends Component{
    constructor(props){
        super(props);
        this.state={
            idIngredient:'',
            img:'',
            name:'',
            error:false,
            changedPicture:false
        }
        this.nameIngredient=this.nameIngredient.bind(this);
        this.imgIngredient=this.imgIngredient.bind(this);
        this.idIngredient=this.idIngredient.bind(this);
        this.submitIngredient=this.submitIngredient.bind(this);
    }
    idIngredient(e){
        this.setState({
            idIngredient:e.target.value
        });
    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.showIngredient(id);
    }
    componentWillReceiveProps(nextProps,nextState){
        const {
            idIngredient, 
            name,
            img,
        }=nextProps.ingredient;
        this.setState({
            idIngredient,
            name,
            img
        })
        console.log(nextProps.ingredient);   
    }
    nameIngredient(e){
        this.setState({
            name:e.target.value
        });
    }
    imgIngredient(e){
        this.setState({
            //picture:e.target.value
            img:e.target.files[0],
            changedPicture:true
        });
        document.querySelector("#picture_upload").setAttribute("name","img");
        document.querySelector("#picture_hidden").removeAttribute("name");
        document.querySelector('#form-update-ingredient').setAttribute("action", "/ingredient/update/");
        document.querySelector('#form-update-ingredient').setAttribute("method", "post");  
    }
    
    submitIngredient(e){ 
        const {
            idIngredient ,
            name,
            img,
            changedPicture
        } =this.state;
         e.preventDefault();
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
                idIngredient ,
                name,
                img
            }
            console.log(infoIngredient);
            if(changedPicture===false){
                this.props.editIngredient(infoIngredient);
                this.props.history.push('/');
            } 
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
                            <form encType="multipart/form-data" onSubmit={this.submitIngredient} 
                            id="form-update-ingredient">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.idIngredient} 
                                    onChange={this.idIngredient} style={{display:'none'}}
                                     name="idIngredient"/>
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
    ingredient:state.ingredients.ingredient
})
export default connect(mapStateToProps,{showIngredient,editIngredient})(EditIngredient);