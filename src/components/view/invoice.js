import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {deleteInvoice} from "../../actions/invoiceActions";
import {connect} from "react-redux";
import api from "../../api/api";
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
        var _this=this;
        console.log(this.props);
        console.log(this.props.info.headerInvoices[0].dateOfBilling);
        api.get('/api/find/id/'+this.props.info.invoicesDetails[0].clientRestaurant)
        .then(res=>{
            _this.setState({
                username:res.data.username
            })
            console.log(res);
        })
        .catch(err=>{
            console.log('An error occurs: ');
            console.log(err);
        })
    }
    render(){
        const {headerInvoices,invoicesDetails} = this.props.info;
        return(
            <li className="list-group-item" id={headerInvoices.idHeader}>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-4 d-flex justify-content-between align-items-center">
                        <p className="text-dark m-0">
                            {headerInvoices[0].dateOfBilling}
                        </p>
                    </div>
                    <span className="badge badge-warning text-dark" style={{padding:"20px"}}> Total: {headerInvoices[0].total}</span>
                    <div className="badge  badge-info" style={{background:'#343a40',padding:'20px'}}>
                        Username: {this.state.username}
                    </div>
                    {/* 
                    <div className="col-md-4 d-flex justify-content-end acciones">
                        <Link to={`/admin/edit/invoice/${id}`} className="btn btn-success mr-2">Edit</Link>
                        <button type="button" className="btn btn-primary ml-2" onClick={this.deleteEntree}>Delete</button>
                    </div> 
                    */}
                </div>
            </li>
        )
    }
}
export default connect(null,{deleteInvoice})( Invoice);