import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {openModal} from "../../helper/modal.helper";
import {setDelete} from "../../actions/modalActions";

export const Ingredient=props=>{ 
    const {id,name,img} = props.info;
    const deleteIngredient=(id)=>{
        props.setDelete(id,'Ingredient'); 
        setTimeout(() => {
            openModal();
        }, 900);
    } 
    
    return(
        <li className="list-group-item" id={id}>
            <div className="row justify-content-between align-items-center">
                <div className="col-md-8 d-flex justify-content-between align-items-center">
                    <p className="text-dark m-0">
                        {name}
                    </p>
                    <img src={img} alt={name} className="responsive-img col-md-3"/>
                </div>
                <div className="col-md-4 d-flex justify-content-end acciones">
                    <Link to={`/admin/edit/ingredient/${id}`} className="btn btn-success mr-2">Edit</Link>
                    <button type="button" className="btn btn-primary ml-2" onClick={()=>deleteIngredient(id)}>Delete</button>
                </div>
            </div>
        </li>
    ) 
}
Ingredient.propTypes = {
    deleteIngredient: PropTypes.func.isRequired,
    modals:PropTypes.string.isRequired,
    productType:PropTypes.string.isRequired,
    idToDelete:PropTypes.string.isRequired,
    info: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired, 
        img:PropTypes.string.isRequired,
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
export default connect(mapStateToProps,mapDispatchToProps)( Ingredient);