import React,{Component} from 'react';
import {connect} from "react-redux";
import Ingredient from "../../components/view/ingredient";
import {getIngredients} from "../../actions/ingredientActions";
import $ from 'jquery'; 
import { Link } from 'react-router-dom';
class ShowIngredients extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:5,
            ingredientsToShow:[
                {
                    "id": "17ING",
                    "name": "Salmon",
                    "img": "/img/ingredients/salmon.jpg"
                },
                {
                    "id": "18ING",
                    "name": "Carrot",
                    "img": "/img/ingredients/carrot.jpg"
                },
                {
                    "id": "19ING",
                    "name": "Eggs",
                    "img": "/img/ingredients/eggs.jpg"
                },
                {
                    "id": "1ING",
                    "name": "Tomato",
                    "img": "/img/ingredients/tomato.jpg"
                }
            ],
            firstItemToShow:0,
            totalPagination:[1,2]
        }
    }
    async componentDidMount(){
        await this.props.getIngredients(); 

        const {ingredients}= this.props;
        this.setState({
            totalItems:ingredients.length
        });
        var tempTotalPages=Math.ceil(ingredients.length/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
        this.setIngredientsItems();
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
            console.log('An error occurs in ShowIngredients.componentWillReceiveProps(),but don\'t worry about it :) ');
            console.log(error);
        }
    } 
    renderIngredients=()=>{
        if(this.state.ingredientsToShow.length===0){
            return(
                <div>
                    Loading
                </div>
            )
        }
        else{
            return(
                this.state.ingredientsToShow.map(ingredient=>
                    <Ingredient key={ingredient.id} info={ingredient}/> 
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
                this.props.history.push("/admin/ingredients/"+tempCurrentPage)
            }
        } catch (error) {
            console.log('An error occurs in ShowIngredients.getNextPage(),but don\'t worry about it :) ');
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
                this.props.history.push("/admin/ingredients/"+tempCurrentPage);
            }
        } catch (error) {
            console.log("An error occurs in ShowIngredients.getPrevPage(),but don\'t worry about it :)");
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
                this.setIngredientsItems(); 
            },200);
        } catch (error) {
            console.log('An error occurs in ShowIngredients.getPage() , but don\'t worry about it');
            console.log(error);
        }
    }
    setIngredientsItems=()=>{
        const {ingredients}=this.props;
        var tempIngredientsToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            do{ 
                if(maxItemsLenght>ingredients.length){
                    maxItemsLenght=ingredients.length;
                }
                if(ingredients[index].name!==null   ){
                    tempIngredientsToShow.push(ingredients[index]);
                }
                this.setState({
                    ingredientsToShow:tempIngredientsToShow
                })
                index++;
            }
            while(index <maxItemsLenght);
        } 
        catch (error) {
            console.log('An error occurs ShowIngredients.setIngredientsItems() , but don\'t worried about :)');
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
                                    <li className="page-item page-nav" id={`page-item-${index}`} key={key}>
                                        <Link to={`/admin/ingredients/${index}`} className="page-link" onClick={()=>this.getPage(index)}>{index}</Link>
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
        const {ingredients}=this.props;
        if(!ingredients){
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
                            {this.renderIngredients()}
                        </ul>
                        {this.getPagination()}
                    </div>
                </div> 
            </React.Fragment>
        )
    }
}
const mapStateToProps=state=>({
    ingredients:state.ingredients.ingredients
})
export default connect(mapStateToProps,{getIngredients})(ShowIngredients);