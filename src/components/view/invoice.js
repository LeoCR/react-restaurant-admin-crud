import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {deleteInvoice} from "../../actions/invoiceActions";
import {connect} from "react-redux";
//import api from "../../api/api";
class Invoice extends Component{ 
    state={
        username:''
    }
    deleteInvoice=()=>{
        const id=this.props.info.id;
        this.props.deleteInvoice(id);
        setTimeout(() => {
            window.location.reload();
        }, 1200);
    }
    componentDidMount(){
        //var _this=this;
        //console.log(this.props);
    }
    render(){
        const {idHeader,dateOfBilling,username,email,orderCode} = this.props.info;
        var date=dateOfBilling.replace('.000Z','');
        return( <React.Fragment>
            <li className="list-group-item" id={idHeader}>
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
                        <Link to={`/admin/edit/invoice/${orderCode}`} className="btn btn-success mr-2">View</Link>
                        {/* <button type="button" className="btn btn-primary ml-2" onClick={this.deleteInvoice}>Delete</button> */}
                    </div>  
                    
                </div>
            </li> 
           </React.Fragment>
        )
    }
}
export default connect(null,{deleteInvoice})( Invoice);