import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {openModal} from "../../helper/modal.helper";
import {setDelete} from "../../actions/modalActions";

export const Drink=props=>{
    const {id,name,price,picture} = props.info;
    const deleteDrink=(e,id)=>{ 
        props.setDelete(id,'Drink'); 
        setTimeout(() => {
            openModal(e);
        }, 900);
    } 
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
                    <button type="button" className="btn btn-primary ml-2" onClick={(e)=>deleteDrink(e,id)}>Delete</button>
                </div>
            </div>
        </li>
    ) 
}
Drink.propTypes = {
    deleteDrink: PropTypes.func.isRequired,
    modals:PropTypes.string.isRequired,
    productType:PropTypes.string.isRequired,
    idToDelete:PropTypes.string.isRequired,
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
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Drink));