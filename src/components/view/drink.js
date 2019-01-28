import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {deleteDrink} from "../../actions/drinkActions";
import {connect} from "react-redux";
class Drink extends Component{ 
    deleteDrink=()=>{
        const id=this.props.info.id;
        this.props.deleteDrink(id);
        setTimeout(() => {
            window.location.reload();
        }, 1200);
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
                        <Link to={`/admin/edit/drink/${id}`} className="btn btn-success mr-2">Edit</Link>
                        <button type="button" className="btn btn-primary ml-2" onClick={this.deleteDrink}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}
export default connect(null,{deleteDrink})( Drink);