import React from 'react';
import {Link} from "react-router-dom"; 
import {connect} from "react-redux";
import PropTypes from 'prop-types';

export const Invoice =props=>{ 
    const {id_header,date_of_billing,username,email,order_code} = props.info;
    const date=date_of_billing.replace('.000Z','');
    return( <React.Fragment>
        <li className="list-group-item" id={id_header}>
            <div className="row justify-content-between align-items-center">
                <div className="col-md-4 d-flex justify-content-between align-items-center">
                    <p className="text-dark m-0">
                        {date}
                    </p>
                </div>
                <span className="badge badge-warning text-dark" style={{padding:"20px",minWidth:"300px"}}> Username: {username} </span> 
                <div className="badge  badge-info" style={{background:'#343a40',padding:'20px',minWidth:"300px"}}>
                    Email: {email} 
                </div>
                <div className="col-md-4 d-flex justify-content-end acciones">
                    <Link to={`/admin/edit/invoice/${order_code}`} className="btn btn-success mr-2">View</Link>
                </div>  
                
            </div>
        </li> 
        </React.Fragment>
    )
}
Invoice.propTypes = {  
    info: PropTypes.shape({
        id_header: PropTypes.number.isRequired,
        date_of_billing: PropTypes.string.isRequired,
        username: PropTypes.number.isRequired,
        email:PropTypes.string.isRequired,
        order_code:PropTypes.string.isRequired
    }).isRequired
}
export default connect(null)( React.memo(Invoice));