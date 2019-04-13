import React,{Component} from 'react';
import {connect} from "react-redux";
import Ingredient from "../../components/view/ingredient";
import {getIngredients} from "../../actions/ingredientActions";
import $ from 'jquery'; 
class ShowIngredients extends Component{
    constructor(props){
        super(props);
        this.state={
            currentPage:1,
            totalItems:0,
            maxItemsPerPage:10,
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
        this.getPrevPage = this.getPrevPage.bind(this);
        this.getNextPage = this.getNextPage.bind(this);
    }
    setIngredientsItems=()=>{
        const {ingredients}=this.props;
        var tempIngredientsToShow=[];
        var maxItemsLenght=parseInt(this.state.maxItemsPerPage*this.state.currentPage);
        try {
            let index = this.state.firstItemToShow;
            if(maxItemsLenght>ingredients.length){
                maxItemsLenght=ingredients.length;
            }
            do{ 
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
            console.log('An error occurs');
            console.error(error);
        }
    }
    async componentDidMount(){
        await this.props.getIngredients(); 
        const {ingredients}= this.props;
        this.setState({
            totalItems:ingredients.length
        });
        this.setIngredientsItems();
        var tempTotalPages=Math.round(this.state.totalItems/this.state.maxItemsPerPage);
        var tempItems=[];
        for (let index = 1; index <= tempTotalPages; index++) {
            tempItems.push(index);
        }
        this.setState({
            totalPagination:tempItems
        });
    } 
    renderIngredients=(ingredients)=>{
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
                this.setIngredientsItems();
            }, 300);
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
                this.setIngredientsItems();
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
        }, 300);
        this.setState({
            currentPage:index,
            firstItemToShow:tempFirstItemToShow
        });
        this.setIngredientsItems(); 
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
                            {this.renderIngredients(ingredients)}
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