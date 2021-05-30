import React from 'react';
import {connect} from "react-redux";
import {showDrink,editDrink,updateDrink,getDrinks} from "../../actions/drinkActions";
import PropTypes from 'prop-types';
export class EditDrink extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:'',
            picture:'', 
            price:'',
            error:false,
            changedPicture:false
        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    } 
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.getDrinks();
        this.props.showDrink(id);
    }
    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.drink){
            const {id, name,price,description,picture}=nextProps.drink;
            this.setState({
                id,
                name,
                description, 
                picture,
                price
            })
        }
    } 
    pictureDrink=(e)=>{
        if(e){
            e.preventDefault();
        }
        if(e.target.files[0]!==null){
            this.setState({
                picture:e.target.files[0],
                changedPicture:true
            });   
        }
    } 
    editDrink=(e)=>{ 
        e.preventDefault();   
        const { id ,name,description,price,picture,changedPicture} =this.state;
        const formData=new FormData()
        if(name===''||price===''||description===''){
            this.setState({
                error:true
            });
        }
        else{
            this.setState({
                error:false
            });
            const infoDrink={ id, name, price, description,  picture};
            formData.append('id',id);
            formData.append('name',name);
            formData.append('price',price);
            formData.append('description',description);
            formData.append('picture',picture); 
            try {
                if(changedPicture===false){
                    this.props.editDrink(infoDrink,id);
                }
                else{
                    this.props.updateDrink(formData,id);
                }
            } catch (error) {
                console.log('An error occurs in EditDrink.editDrink');
                console.log(error);
            }
            finally{
                setTimeout(() => {
                    this.props.getDrinks();
                    this.props.history.push('/admin/drinks/');
                }, 1200);
            }
        }
    }
    render(){
        var {name,price,description,picture,error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit Drink</h2>
                            <form encType="multipart/form-data" onSubmit={this.editDrink} 
                            id="form-drink-update">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.onChange} className="" style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" defaultValue={name} 
                                    onChange={(e)=>this.onChange(e)} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" defaultValue={description} 
                                    onChange={(e)=>this.onChange(e)} 
                                    className="form-control" 
                                    placeholder="Description"
                                    name="description" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={picture} 
                                    onChange={(e)=>this.pictureDrink(e)} className="form-control-file"
                                     placeholder="Picture" />
                                    <img src={picture} style={{maxWidth:'400px'}} alt={name}/>
                                    <input type="text" defaultValue={picture} className="form-control-file"
                                    readonly="readonly" name="picture" id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={price} 
                                    onChange={(e)=>this.onChange(e)} 
                                    className="form-control"
                                     placeholder="Price" 
                                     name="price"
                                     />
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
EditDrink.propTypes = {
    showDrink: PropTypes.func.isRequired,
    editDrink: PropTypes.func.isRequired,
    updateDrink: PropTypes.func.isRequired,
    getDrinks: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    drink:state.drinks.drink,
    drinks:state.drinks.drinks
})
export default connect(mapStateToProps,{showDrink,editDrink,updateDrink,getDrinks})(EditDrink);