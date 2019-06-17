import React from 'react';
import {connect} from "react-redux";
import {showInvoice,showOrderProducts,editInvoice,getInvoices} from "../../actions/invoiceActions";
import history from '../../history';
class EditInvoice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            invoice:{
                orderCode:'',
                email:'',
                dateOfBilling:'',
                username:''
            }
        };
    }
    componentDidMount=()=>{
        const {orderCode}=this.props.match.params;
        this.props.showInvoice(orderCode);
        this.props.showOrderProducts(orderCode);
    }
    componentWillReceiveProps(nextProps,nextState){
        const {orderCode, email,dateOfBilling,username}=nextProps.invoice[0];
        this.setState({
            invoice:{
                orderCode,
                email,
                dateOfBilling,
                username
            }
        })
    }
    renderOrder=()=>{
        var totalPrice=0;
        if(this.props.orderProducts){
            this.props.orderProducts.forEach(product => {
                totalPrice+=parseFloat(product.total)
            });
            return( 
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity per Product</th>
                                <th>Pricer per Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.orderProducts.map((order)=>
                                        <tr>
                                            <td>{order.productName}</td>
                                            <td>{order.productQuantity}</td>
                                            <td>{order.total}</td>
                                        </tr>
                                )
                            }
                            <tr className='total-row'>
                                <td colSpan="2">
                                    <p style={{color:'#fff'}}>Total :</p>
                                </td>
                                <td>
                                    <p style={{color:'#fff'}}>{totalPrice}</p>
                                </td>
                            </tr>
                        </tbody>        
                    </table>
                </div>
            )
            
        }
        else{
            return(
                <React.Fragment>
                    Loading
                </React.Fragment>
            )
        }
    }
    goBack=(e)=>{
        e.preventDefault();
        history.push('/admin/invoices')
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.invoice[0].username!==this.state.invoice.username){
            this.setState({
                invoice:{
                    username:nextProps.invoice[0].username,
                    email:nextProps.invoice[0].email,
                    orderCode:nextProps.invoice[0].orderCode,
                    dateOfBilling:nextProps.invoice[0].dateOfBilling
                }
            })
        } 
        return true;
    }
    render(){
        var {orderCode,email,dateOfBilling,username,error} = this.state.invoice;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Invoice #{orderCode}</h2>
                            {/* <form onSubmit={(e)=>this.editInvoice(e)} id="form-update-ingredient"> */}
                                <div className="form-group">
                                    <label htmlFor="orderCode" className="lbl-form">Order Code:</label>
                                    <input type="text" defaultValue={orderCode} 
                                     readOnly id="orderCode"
                                     name="orderCode"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="lbl-form">Email</label>
                                    <input type="text" defaultValue={email} 
                                     readOnly id="email"
                                     name="email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateOfBilling" className="lbl-form">Date of Billing</label>
                                    <input type="text" defaultValue={dateOfBilling} 
                                     readOnly
                                     name="dateOfBilling" id="dateOfBilling"/>
                                </div>
                                {this.renderOrder()}
                                <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100" onClick={(e)=>this.goBack(e)}>Back</button>
                                {/* <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Update</button> */}
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>({
    invoice:state.invoices.invoice,
    orderProducts:state.invoices.orderProducts,
    invoices:state.invoices.invoices
})
export default connect(mapStateToProps,{showInvoice,showOrderProducts,editInvoice,getInvoices})(EditInvoice);;