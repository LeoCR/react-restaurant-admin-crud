import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteUser} from "../../actions/userActions";
import PropTypes from 'prop-types';
class User extends React.Component{ 
    deletingUser=()=>{
        const id=this.props.info.id;
        try {
            if (!(window.confirm('Are you sure you want to delete this User?'))){
                console.log('Dont Delete User');
            }
            else{
                this.props.deleteUser(id);
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            }
        } catch (error) {
            console.log('An error occurs in User.deletingUser()');
            console.error(error);
        }
        setTimeout(() => {
            window.location.reload();
        }, 1200);
    }
    render(){
        const {id,email} = this.props.info;
        return(
            <li className="list-group-item" id={id}>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                        <span className="badge badge-warning text-dark">Email:  {email}</span>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end acciones">
                        <Link to={`/admin/edit/user/${id}`} className="btn btn-success mr-2">Edit</Link>
                        <button type="button" className="btn btn-primary ml-2" onClick={this.deletingUser}>Delete</button>
                    </div>
                </div>
            </li>
        )
    }
}
User.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    info: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired
}
const mapStateToProps=state=>({
    users:state.users.users
})
export default connect(mapStateToProps,{deleteUser})( User);