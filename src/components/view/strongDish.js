import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {deleteStrongDish} from "../../actions/strongDishActions";
import {connect} from "react-redux";
class StrongDish extends Component{
    
    deleteMainCourse=()=>{
        console.log('Eliminando');
        const id=this.props.info.idStrongDish;
        this.props.deleteStrongDish(id);
        setTimeout(() => {
            window.location.reload();
        }, 1200);
    }
    render(){
        const {idStrongDish,name,price} = this.props.info;
        return(
            <li className="list-group-item" id={idStrongDish}>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                        <p className="text-dark m-0">
                            {name}
                        </p>
                        <span className="badge badge-warning text-dark"> $ {price}</span>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end acciones">
                        <Link to={`/edit/strong-dish/${idStrongDish}`} className="btn btn-success mr-2">Edit</Link>
                        <button type="button" className="btn btn-primary ml-2" onClick={this.deleteMainCourse}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}
export default connect(null,{deleteStrongDish})( StrongDish);