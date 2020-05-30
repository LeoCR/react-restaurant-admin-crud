import React from 'react';
import {getInvoices} from "../../actions/invoiceActions";
import $ from 'jquery'; 
import {connect} from "react-redux";
import Invoice from '../../components/view/invoice';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
export class ShowInvoices extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:3,
            invoicesToShow:[{
                    "id_header":1,
                    "date_of_billing":"2019-03-12T02:30:00.000Z",
                    "total":"15.0000",
                    "subtotal":"14.0000",
                    "sales_tax":"10.0000",
                    "product_id":"3ENTR",
                    "product_quantity":2},
                    {
                    "id_header":2,
                    "date_of_billing":"2019-03-12T02:30:00.000Z",
                    "total":"15.0000",
                    "subtotal":"14.0000",
                    "sales_tax":"10.0000",
                    "product_id":"8DESRT",
                    "product_quantity":2
            }],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
    }
    async componentDidMount(){
        await this.props.getInvoices(); 
        const {invoices}= this.props;
        try {
            this.setState({
                totalItems:invoices.length
            });
        } catch (error) {
            console.log('An error occurs '+error);
        }
        var tempTotalPages=Math.ceil(this.state.totalItems/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
        this.setInvoicesItems();
    }
    componentWillReceiveProps(nextProps){
        try {
            if(nextProps.match.params.page!==null){
                const {page}=nextProps.match.params;
                if(isNaN(page)===false){
                    this.setState({
                        currentPage:page 
                    });
                    this.getPage(page); 
                    setTimeout(() => {    
                        document.querySelector("#page-item-"+page).classList.add("active");
                    }, 1200);
                }
            }
        } 
        catch (error) {
            console.log('An error occurs in ShowDesserts.componentWillReceiveProps(),but dont worry about it :) ');
            console.log(error);
        }
    }
    renderInvoices=()=>{
        if(this.state.invoicesToShow.length===0){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                this.state.invoicesToShow.map(headerInvoice=>
                    <Invoice key={headerInvoice.orderCode} info={headerInvoice}/> 
                )
            )
        }
    }
    getNextPage(){ 
        try {
            if(this.state.currentPage<=this.state.totalPagination.length){
                if($('.page-nav').hasClass('active')){
                    $('.page-nav').removeClass('active');
                }
                var tempCurrentPage=this.state.currentPage+1;
                var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
                this.setState({
                    currentPage:tempCurrentPage,
                    firstItemToShow:tempFirstItemToShow
                });
                this.props.history.push("/admin/invoices/"+tempCurrentPage);
            }
        } catch (error) {
            console.log('An error occurs in ShowInvoices,getNextPage()');
            console.log(error);
        }
    }
    getPrevPage(){
        try {
            if(this.state.currentPage>1){
                if($('.page-nav').hasClass('active')){
                    $('.page-nav').removeClass('active');
                }
                var tempCurrentPage=this.state.currentPage-1;
                var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
                this.setState({
                    firstItemToShow:tempFirstItemToShow,
                    currentPage:tempCurrentPage
                });
                this.props.history.push("/admin/invoices/"+tempCurrentPage);
            }
        } catch (error) {
            console.log('An error occurs in ShowInvoices.getPrevPage()');
            console.log(error);
        }
    }
    getPage=(index)=>{
        try {
            var tempFirstItemToShow=(index*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
            if($('.page-nav').hasClass('active')){
                $('.page-nav').removeClass('active');
            }
            setTimeout(() => {
                $('.page-nav:nth-child('+ parseInt(index+1)+')').addClass('active');
                this.setState({
                    currentPage:index,
                    firstItemToShow:tempFirstItemToShow
                });
                this.setInvoicesItems(); 
            }, 300);
        } 
        catch (error) {
            console.log('An error occurs in ShowInvoices.getPage()');
            console.log(error);
        }
    }
    setInvoicesItems= ()=>{
        const {invoices}=this.props;
        var tempInvoicesToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        var _this=this;
        try {
            let index = this.state.firstItemToShow;
            if(maxItemsLenght>invoices.length){
                maxItemsLenght=invoices.length;
            }
            do{ 
                if(invoices[index]!==undefined){
                        tempInvoicesToShow.push(invoices[index]);
                }
                _this.setState({
                    invoicesToShow:tempInvoicesToShow
                })
                index++;
            }
            while(index <maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs in setInvoicesItems');
            console.error(error);
        }
    }
    getPagination=()=>{
        return(
            <React.Fragment>
                <div style={{textAlign:'center'}}>
                    <nav id="pagination-bottom">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getPrevPage()} href="#previous">Previous</a>
                            </li> 
                            {
                                this.state.totalPagination.map((index,key)=> 
                                    <li className="page-item page-nav">
                                        <Link to={`/admin/invoices/${index}`} className="page-link" onClick={()=>this.getPage(index)}>{index}</Link>
                                    </li>
                                )
                            }
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getNextPage()} href="#next">Next</a>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
    render(){
        const {invoices}=this.props;
        if(!invoices){
            return(
                <div>
                    <p>Loading Data From Database ,please Wait...</p>
                </div>
            )
        }
        return(
            <React.Fragment>
                <ul>
                    {this.renderInvoices()}
                </ul>
                {this.getPagination()}
            </React.Fragment>
        )
    }
}
ShowInvoices.propTypes={
    getInvoices:PropTypes.func.isRequired,
    invoices:PropTypes.arrayOf(
        PropTypes.shape({
          order_code: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          date_of_billing: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
}
const mapStateToProps=state=>({
    invoices:state.invoices.invoices
})
export default withRouter(connect(mapStateToProps,{getInvoices})(ShowInvoices));
