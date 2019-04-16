import React,{Component} from 'react';
import {connect} from "react-redux";
import StrongDish from "../../components/view/strongDish";
import {getStrongsDishes} from "../../actions/strongDishActions";
import $ from 'jquery';
class ShowStrongsDishes extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:4,
            strongsDishesToShow:[
                {
                    category: "fish",
                    description: "Srhimp Salad",
                    id: "10BGD",
                    name: "Srhimp Avocado Roasted Salad",
                    picture: "/img/uploads/shrimp-avocado-roasted-corn-salad.jpg",
                    price: "7.50"
                },
                {
                    category: "Soups",
                    description: "Aztec Soup with Avocado",
                    id: "11BGD",
                    name: "Aztec Soup",
                    picture: "/img/uploads/aztec-soup.jpg",
                    price: "7.50"  
                },
               { 
                    category: "Pasta",
                    description: "Made with stacked layers of pasta alternated with sauces and chicken plus vegetables and cheese, and sometimes topped with melted  ",
                    id: "1BGD",
                    name: "Lasagna of Chicken",
                    picture: "/img/strong-dish/lasagna.png",
                    price: "14.35"
                }
            ],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
    }
    setStrongsDishesItems=()=>{
        const {strongsDishes}=this.props;
        var tempStrongsDishesToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            do{ 
                if(maxItemsLenght>strongsDishes.length){
                    maxItemsLenght=strongsDishes.length;
                }
                if(strongsDishes[index].name!==null  && strongsDishes[index] !==undefined ){
                    tempStrongsDishesToShow.push(strongsDishes[index]);
                }
                this.setState({
                    strongsDishesToShow:tempStrongsDishesToShow
                })
                index++;
            }
            while(index <=maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs no worried about');
            console.log(error);
        }
    }
    async componentDidMount(){
        await this.props.getStrongsDishes();
        console.log(this.props);
        const {strongsDishes}=this.props;
        this.setState({
            totalItems:strongsDishes.length
        });
        this.setStrongDishesItems();
        var tempTotalPages=Math.round(this.state.totalItems/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
    }
    
    renderStrongsDishes=()=>{
        if(this.state.strongsDishesToShow.length===0){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                this.state.strongsDishesToShow.map(strongDish=>
                    <StrongDish key={strongDish.id} info={strongDish}/> 
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
                this.setStrongsDishesItems();
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
                this.setStrongsDishesItems();
            }, 300); 
        }
    }
    getPage=(e,index)=>{
        e.preventDefault();
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
            this.setStrongsDishesItems(); 
        }, 300);
        
    }
    setStrongDishesItems=()=>{
        const {strongsDishes}=this.props;
        var tempStrongsDishesToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            do{ 
                if(maxItemsLenght>strongsDishes.length){
                    maxItemsLenght=strongsDishes.length;
                }
                if(strongsDishes[index].name!==null && strongsDishes[index]!==undefined){
                    tempStrongsDishesToShow.push(strongsDishes[index]);
                }
                this.setState({
                    strongsDishesToShow:tempStrongsDishesToShow
                })
                index++;
            }
            while(index <=maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs');
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
        const {strongsDishes}=this.props;
        if(!strongsDishes){
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
                                this.renderStrongsDishes()
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
    strongsDishes:state.strongsDishes.strongsDishes
})
export default connect(mapStateToProps,{getStrongsDishes})(ShowStrongsDishes);