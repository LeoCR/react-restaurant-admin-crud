import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {deleteEntree} from "../../actions/entreeActions";
import {connect} from "react-redux";
import api from "../../api/api";
class Entree extends Component{ 
    deleteEntree=async()=>{
        const id=this.props.info.id;
        var _this=this;
        try {
            if (!(window.confirm('Are you sure you want to delete this Appetizer?'))){
                console.log('Dont Delete Appetizer');
            }
            else{
                await api.get('/api/ingredients/'+id)
                .then(async(res)=>{
                    for (let index = 0; index < res.data.length; index++) {
                        if(res.data[index].id_ingredient!=='undefined'){
                            console.log('Deleting id_ingredient_dish: '+res.data[index].id_ingredient_dish);
                            await api.delete('/api/ingredient-to-dish/delete/'+res.data[index].id_ingredient_dish)
                            .then((resp)=>{
                                console.log(resp);
                            })
                        }
                    }
                })
                .then(()=>{
                    _this.props.deleteEntree(id);
                })
                .catch((err)=>{
                    console.log(err);
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            }
            
        } 
        catch (error) {
            console.log('An error occurs in Entree.deleteEntree()');
            console.log(error);
        }
    }
    render(){
        const {id,name,price,picture} = this.props.info;
        return(
            <li className="list-group-item" id={id}>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                        <p className="text-dark m-0">
                            {name}
                        </p>
                        <span className="badge badge-warning text-dark"> $ {price}</span>
                        <img src={picture} alt={name} className="responsive-img col-md-3"/>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end acciones">
                        <Link to={`/admin/edit/appetizer/${id}`} className="btn btn-success mr-2">Edit</Link>
                        <button type="button" className="btn btn-primary ml-2" onClick={this.deleteEntree}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}
export default connect(null,{deleteEntree})( Entree);