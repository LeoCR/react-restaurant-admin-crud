import React from 'react';
import {getInvoices} from "../../actions/invoiceActions";
import $ from 'jquery'; 
import {connect} from "react-redux";
import Invoice from '../../components/view/invoice';
//import api from '../../api/api';
class ShowInvoices extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:3,
            invoicesToShow:[{
                    "idHeader":1,
                    "dateOfBilling":"2019-03-12T02:30:00.000Z",
                    "total":"15.0000",
                    "subTotal":"14.0000",
                    "salesTax":"10.0000",
                    "productId":"3ENTR",
                    "productQuantity":2},
                    {
                    "idHeader":2,
                    "dateOfBilling":"2019-03-12T02:30:00.000Z",
                    "total":"15.0000",
                    "subTotal":"14.0000",
                    "salesTax":"10.0000",
                    "productId":"8DESRT",
                    "productQuantity":2
            }],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
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
        this.setInvoicesItems();
        var tempTotalPages=Math.round(this.state.totalItems/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
    }
    getNextPage(){ 
        if($('.page-nav').hasClass('active')){
            $('.page-nav').removeClass('active');
        }
        if(this.state.currentPage<=this.state.totalPagination.length){
            var tempCurrentPage=this.state.currentPage+1;
            var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
            this.setState({
                currentPage:tempCurrentPage,
                firstItemToShow:tempFirstItemToShow
            });
            setTimeout(() => {
                $('.page-nav:nth-child('+ parseInt(this.state.currentPage+1)+')').addClass('active');
                this.setInvoicesItems();
            }, 200);
        }
    }
    getPrevPage(){
        if($('.page-nav').hasClass('active')){
            $('.page-nav').removeClass('active');
        }
        if(this.state.currentPage>1){
            var tempCurrentPage=this.state.currentPage-1;
            var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
            this.setState({
                firstItemToShow:tempFirstItemToShow,
                currentPage:tempCurrentPage
            });
            setTimeout(() => {
                $('.page-nav:nth-child('+ parseInt(this.state.currentPage+1)+')').addClass('active');
                this.setInvoicesItems();
            }, 300); 
        }
    }
    getPage=(e,index)=>{
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
    getPagination=()=>{
        return(
            <React.Fragment>
                <div style={{textAlign:'center'}}>
                    <nav id="pagination-bottom">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getPrevPage()}>Previous</a>
                            </li> 
                            {
                                this.state.totalPagination.map((index,key)=> 
                                    <li className="page-item page-nav">
                                        <a className="page-link" onClick={(e)=>this.getPage(e,index)}>{index}</a>
                                    </li>
                                )
                            }
                            <li className="page-item">
                                <a className="page-link" onClick={()=>this.getNextPage()}>Next</a>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
        )
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
const mapStateToProps=state=>({
    invoices:state.invoices.invoices
})
export default connect(mapStateToProps,{getInvoices})(ShowInvoices);
