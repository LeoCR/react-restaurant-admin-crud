import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {setDelete} from "../../actions/modalActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {openModal} from "../../helper/modal.helper";
export class Dessert extends Component{ 
    deleteDessert=()=>{
        const id=this.props.info.id;
        setDelete(id,'Dessert'); 
        openModal();
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
                        <Link to={`/admin/edit/dessert/${id}`} className="btn btn-success mr-2">Edit</Link>
                        <button type="button" className="btn btn-primary ml-2" onClick={this.deleteDessert}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}
Dessert.propTypes = {
    deleteDessert: PropTypes.func,
    modals: PropTypes.string,
    productType:PropTypes.string,
    idToDelete:PropTypes.string,
    info: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picture:PropTypes.string.isRequired,
    }).isRequired
}
const mapDispatchToProps = dispatch => {
    return {
        setDelete: (id,type) => dispatch(setDelete(id,type))
    }
}
const mapStateToProps=state=>({
    modals:state.modals.modals,
    productType:state.modals.productType,
    idToDelete:state.modals.idToDelete
})
export default connect(mapStateToProps,mapDispatchToProps)( Dessert);