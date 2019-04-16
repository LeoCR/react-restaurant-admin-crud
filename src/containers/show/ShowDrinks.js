import React from 'react';
import {connect} from "react-redux";
import Drink from "../../components/view/drink";
import {getDrinks} from "../../actions/drinkActions";
import $ from 'jquery';
class ShowDrinks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:4,
            drinksToShow:[
            {   
                description: "Fresh Natural of Oat with Milk or water",
                id: "10DRK",
                name: "Fresh Natural of Oats",
                picture: "/img/drinks/fresh-natural-of-oats.jpg",
                price: "4.50"
            },
            {   
                description: "Fresh Natural of Chocolate with Milk",
                id: "11DRK",
                name: "Fresh Natural of Chocolate",
                picture: "/img/drinks/fresh-natural-of-chocolate.jpg",
                price: "4.50"
            }
            ],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
    }
    async componentDidMount(){
        await this.props.getDrinks();
        console.log(this.props);
        const {drinks}=this.props;
        this.setState({
            totalItems:drinks.length
        });
        this.setDrinksItems();
        var tempTotalPages=Math.round(this.state.totalItems/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
    }
    setDrinksItems=()=>{
        const {drinks}=this.props;
        var tempDrinksToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            do{ 
                if(maxItemsLenght>drinks.length){
                    maxItemsLenght=drinks.length;
                }
                if(drinks[index].name!==null   ){
                    tempDrinksToShow.push(drinks[index]);
                }
                this.setState({
                    drinksToShow:tempDrinksToShow
                })
                index++;
            }
            while(index <=maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs dont worry about');
        }
    }
    renderDrinks=()=>{
        if(this.state.drinksToShow.length===0){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                this.state.drinksToShow.map(drink=>
                    <Drink key={drink.id} info={drink}/> 
                )
            )
        }
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
                this.setDrinksItems();
            },300);
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
                this.DrinksItems();
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
            this.setDrinksItems(); 
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
    render(){
        const {drinks}=this.props;
        if(!drinks){
            return(
                <div>
                   <p>Loading Data From Database ,please Wait...</p> 
                </div>
            )
        }
        return(
            <React.Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ul>
                        {
                                this.renderDrinks()
                            }
                            {
                                this.getPagination()
                            }
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    drinks:state.drinks.drinks
})
export default connect(mapStateToProps,{getDrinks})(ShowDrinks);