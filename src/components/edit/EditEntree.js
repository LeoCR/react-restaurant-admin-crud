import React,{Component} from 'react';
import {connect} from "react-redux";
import {showEntree,updateEntree} from "../../actions/entreeActions";
class EditEntree extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            description:'',
            picture:'',
            category:'',
            price:'',
            error:false,
            changedPicture:false
        }
        this.nameEntree=this.nameEntree.bind(this);
        this.descriptionEntree=this.descriptionEntree.bind(this);
        this.pictureEntree=this.pictureEntree.bind(this);
        this.categoryEntree=this.categoryEntree.bind(this);
        this.priceEntree=this.priceEntree.bind(this);
        this.editEntree=this.editEntree.bind(this);
        this.id=this.id.bind(this);
    }
    id(e){
        this.setState({
            name:e.target.value
        });

    }
    componentDidMount(){
        const {id}=this.props.match.params;
        this.props.showEntree(id);
    }
    componentWillReceiveProps(nextProps,nextState){
        const {id, name,price,description,category,picture}=nextProps.entree;
        this.setState({
            id,
            name,
            description,
            category,
            picture,
            price
        })
        console.log(nextProps.entree);
        
    }
    nameEntree(e){
        this.setState({
            name:e.target.value
        });
    }
    descriptionEntree(e){
        this.setState({
            description:e.target.value
        });
    }
    pictureEntree(e){
        this.setState({
            //picture:e.target.value
            picture:e.target.files[0],
            changedPicture:true
        });
        document.querySelector("#picture_upload").setAttribute("name","picture");
        document.querySelector("#picture_hidden").removeAttribute("name");
        document.querySelector("#form-entree-update").setAttribute("action","/entree/update/");
        document.querySelector("#form-entree-update").setAttribute("method","post")
    }
    categoryEntree(e){
        this.setState({
            category:e.target.value
        });
    }
    priceEntree(e){
        this.setState({
            price:e.target.value
        });
    }
    editEntree(e){
        
        const {
            id ,
            name,
            description,
            price,
            category,
            picture,
            changedPicture
        } =this.state;
        if(name===''||price===''||description===''||category===''){
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
                category,
                picture
            }
            console.log(infoDish); 
            if(changedPicture===false){
                this.props.updateEntree(infoDish);
                this.props.history.push('/');
            }
            
        }
    }
    
    render(){
        const {name,price,description,category,picture,error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Edit an Entree</h2>
                            <form encType="multipart/form-data" onSubmit={this.editEntree} 
                            id="form-entree-update" >
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.id} 
                                    onChange={this.id} className="" style={{display:'none'}}
                                     name="id"/>
                                    <input type="text" defaultValue={name} onChange={this.nameEntree} 
                                    className="form-control" placeholder="Name"
                                    name="name"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" defaultValue={description} 
                                    onChange={this.descriptionEntree} className="form-control" 
                                    placeholder="Description"
                                    name="description" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Picture</label>
                                    <input type="file" id="picture_upload" defaultValue={picture} 
                                    onChange={this.pictureEntree} className="form-control-file"
                                     placeholder="Picture" />
                                <input type="text" defaultValue={picture} className="form-control-file"
                                    readonly="readonly" name="picture" id="picture_hidden" style={{display:"none"}}/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text" defaultValue={category} 
                                    onChange={this.categoryEntree} className="form-control"
                                     placeholder="Category" 
                                     name="category"
                                     />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" defaultValue={price} 
                                    onChange={this.priceEntree} 
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
const mapStateToProps=state=>({
    entree:state.entrees.entree
})
export default connect(mapStateToProps,{showEntree,updateEntree})(EditEntree);