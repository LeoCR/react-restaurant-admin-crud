import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../helper/modal.helper';
import AddIngredientToDish from "./add/AddIngredientToDish"
import PropTypes from 'prop-types';
import Delete from "./delete/delete";
export class Modal extends React.Component{
    render(){
        var ModalContent=<p>Modal Content</p>;
        var titleModal=<h1>Title Modal</h1>;
        if(this.props.modals==='addIngredient'){
            titleModal=<h1>Add Ingredients</h1>;
            ModalContent=<AddIngredientToDish/>;
        }
        else if(this.props.modals==='delete'){
            titleModal=<h1>Are you sure you want to Delete this {this.props.productType}</h1>;
            ModalContent=<Delete/>;
        }
        return(
            <div className="modal" tabIndex="-1" role="dialog" data-testid="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">{titleModal}</div>
                            <button type="button" className="close" 
                                data-dismiss="modal" aria-label="Close" 
                                onClick={()=>closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {ModalContent}
                    </div>
                </div>
            </div>
        )
    }
}
Modal.propTypes = {
    modals: PropTypes.string,
    productType: PropTypes.string,
    idDish: PropTypes.string,
}
const mapStateToProps=state=>({
    modals:state.modals.modals,
    productType:state.modals.productType,
    idDish:state.modals.idDish
})
export default connect(mapStateToProps)(Modal);