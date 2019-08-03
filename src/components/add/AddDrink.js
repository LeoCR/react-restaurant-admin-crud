import React,{Component} from 'react';
import api from "../../api/api";
import {connect} from "react-redux";
import {addDrink,getDrinks} from "../../actions/drinkActions";
class AddDrink extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:'',
            picture:'',
            price:'',
            error:false
        }
    }
    id=(e)=>{
        this.setState({
            id:e.target.value
        });
    }
    nameDish=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    descriptionDish=(e)=>{
        this.setState({
            description:e.target.value
        });
    }
    pictureDrink=(e)=>{
        if(e.target.files[0]!==null ||e.target.files[0]!==undefined){
            this.setState({
                picture:e.target.files[0]
            });
        }
    }
    priceDish=(e)=>{
        this.setState({
            price:e.target.value
        });
    }
    addNewDrink=(e)=>{
        e.preventDefault();
        const {
            id ,
            name,
            description,
            price,
            picture
        } =this.state;
        var formData = new FormData(),
        _this=this;
        if(name===''||price===''||description===''||picture===''||picture===null){
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
            formData.append('price',price);
            formData.append('description',description);
            formData.append('picture',picture)
            this.props.addDrink(formData);
            setTimeout(() => {
                _this.props.getDrinks();
                _this.props.history.push('/admin/drinks'); 
            }, 900);
        }  
    }
    componentDidMount(){
        var totalOfItems=1;var idString
        api.get('/api/drinks')
            .then(response => {
                for(var i = 0; i <= response.data.length; ++i){
                    ++totalOfItems;
                }
            }).then(()=>{
                idString=totalOfItems+1+'ADDDRK';//console.log(idString); 
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
                            <h2 className="text-center">Add New Drink</h2>
                            <form onSubmit={this.addNewDrink}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
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
                                    <input type="file" onChange={this.pictureDrink} 
                                    className="form-control-file" 
                                    placeholder="Picture" name="picture"/>
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
const mapStateToProps=state=>({
    drinks:state.drinks.drinks
})
export default connect(mapStateToProps,{addDrink,getDrinks})(AddDrink);