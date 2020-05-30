import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {deleteDrink} from "../../actions/drinkActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
export class Drink extends Component{ 
    deleteDrink=()=>{
        const id=this.props.info.id;
        if (!(window.confirm('Are you sure you want to delete this Drink?'))){
            console.log('Dont Delete Drink');
        }
        else{
            this.props.deleteDrink(id);
            setTimeout(() => {
                window.location.reload();
            }, 1200);
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
                        <Link to={`/admin/edit/drink/${id}`} className="btn btn-success mr-2">Edit</Link>
                        <button type="button" className="btn btn-primary ml-2" onClick={this.deleteDrink}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}
Drink.propTypes = {
    deleteDrink: PropTypes.func.isRequired,
    info: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picture:PropTypes.string.isRequired,
    }).isRequired
}
export default connect(null,{deleteDrink})( Drink);