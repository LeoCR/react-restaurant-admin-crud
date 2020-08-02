import React,{Component} from 'react';
import {connect} from "react-redux";
import StrongDish from "../../components/view/strongDish";
import {getStrongsDishes} from "../../actions/strongDishActions";
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
export class ShowStrongsDishes extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:3,
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
    }
    async componentDidMount(){ 
        await this.props.getStrongsDishes();
        const {strongsDishes}=this.props;
        this.setState({
            totalItems:strongsDishes.length
        }); 
        var tempTotalPages=Math.ceil(strongsDishes.length/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });  
        this.setStrongDishesItems();
    }
    componentWillReceiveProps(nextProps) {
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
            console.log('An error occurs in ShowStrongsDishes.componentWillReceiveProps(),but dont worry about it :) ');
            console.log(error);
        }
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
    getNextPage=()=>{ 
        try {
            if(this.state.currentPage<this.state.totalPagination.length){
                if($('.page-nav').hasClass('active')){
                    $('.page-nav').removeClass('active');
                }
                var tempCurrentPage=parseInt(this.state.currentPage)+1;
                var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
                this.setState({
                    currentPage:tempCurrentPage,
                    firstItemToShow:tempFirstItemToShow
                });
                this.props.history.push("/admin/main-courses/"+tempCurrentPage)
            }
        } catch (error) {
            console.log("An error occurs in ShowStrongsDishes.getNextPage(),but dont worry about it :)");
            console.log(error);
        }
    }
    getPrevPage=()=>{
        try {
            if(this.state.currentPage>1){
                if($('.page-nav').hasClass('active')){
                    $('.page-nav').removeClass('active');
                }
                var tempCurrentPage=parseInt(this.state.currentPage)-1;
                var tempFirstItemToShow=(tempCurrentPage*this.state.maxItemsPerPage)-parseInt(this.state.maxItemsPerPage);
                this.setState({
                    firstItemToShow:tempFirstItemToShow,
                    currentPage:tempCurrentPage
                });
                this.props.history.push("/admin/main-courses/"+tempCurrentPage);
            } 
        } catch (error) {
            console.log("An error occurs in ShowStrongsDishes.getPrevPage(),but dont worry about it :)");
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
                this.setStrongDishesItems(); 
            }, 200);
        } catch (error) {
            console.log('An error occurs in ShowStrongsDishes.getPage() , but dont worry about it');
            console.log(error);
        }
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
                if(strongsDishes[index].name!==null){
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
            console.log('An error occurs in ShowStrongsDishes.setStrongDishesItems(), but dont worried about :)');
            console.log(error);
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
                                    <li className="page-item page-nav" id={`page-item-${index}`} key={key}>
                                        <Link to={`/admin/main-courses/${index}`} className="page-link" onClick={()=>this.getPage(index)}>{index}</Link>
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
                            {this.renderStrongsDishes()}
                            {this.getPagination()}
                        </ul>
                    </div>
                </div> 
            </React.Fragment>
        )
    }
}
ShowStrongsDishes.propTypes={
    getStrongsDishes:PropTypes.func.isRequired,
    strongsDishes:PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
}
const mapStateToProps=state=>({
    strongsDishes:state.strongsDishes.strongsDishes
})
export default withRouter(connect(mapStateToProps,{getStrongsDishes})(ShowStrongsDishes));