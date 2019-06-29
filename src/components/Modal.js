import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../helper/modal.helper';
import AddIngredientToDish from "./add/AddIngredientToDish"
class Modal extends React.Component{
    render(){
        var ModalContent=<p>Modal Content</p>;
        var titleModal=<h1>Title Modal</h1>;
        if(this.props.modals==='addIngredient'){
            titleModal=<h1>Add Ingredients</h1>;
            ModalContent=<AddIngredientToDish/>;
        }
        return(
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">{titleModal}</div>
                            <button type="button" className="close" 
                                data-dismiss="modal" aria-label="Close" 
                                onClick={(e)=>closeModal(e)}>
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
const mapStateToProps=state=>({
    modals:state.modals.modals,
    idDish:state.modals.idDish
})
export default connect(mapStateToProps)(Modal);